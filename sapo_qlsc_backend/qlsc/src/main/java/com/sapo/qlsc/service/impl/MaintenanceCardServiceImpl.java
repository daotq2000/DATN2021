package com.sapo.qlsc.service.impl;

import com.sapo.qlsc.converter.MaintenanceCardConverter;
import com.sapo.qlsc.dto.MaintenanceCardDTO;
import com.sapo.qlsc.entity.*;
import com.sapo.qlsc.exception.CodeExistedException;
import com.sapo.qlsc.exception.NotANumberException;
import com.sapo.qlsc.exception.commonException.NotFoundException;
import com.sapo.qlsc.exception.commonException.UnknownException;
import com.sapo.qlsc.exception.customerException.DupplicateFieldException;
import com.sapo.qlsc.exception.maintenanceCardException.NotEnoughProductException;
import com.sapo.qlsc.exception.maintenanceCardException.NotFoundRepairmanException;
import com.sapo.qlsc.model.MaintenanceCardFilter;
import com.sapo.qlsc.repository.CustomerRepository;
import com.sapo.qlsc.repository.MaintenanceCardDetailRepository;
import com.sapo.qlsc.repository.MaintenanceCardRepository;
import com.sapo.qlsc.repository.ProductRepository;
import com.sapo.qlsc.service.MaintenanceCardService;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;

@Service
public class MaintenanceCardServiceImpl implements MaintenanceCardService {
    @Autowired
    private MaintenanceCardConverter maintenanceCardConverter;

    @Autowired
    private MaintenanceCardRepository maintenanceCardRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private MaintenanceCardDetailRepository maintenanceCardDetailRepository;


    @Override
    public MaintenanceCardDTO insertMaintenanceCard(MaintenanceCardDTO maintenanceCardDTO) throws NotEnoughProductException, CodeExistedException {
        MaintenanceCard maintenanceCard = maintenanceCardConverter.convertToEntity(maintenanceCardDTO);
        Date now = new Date();
        maintenanceCard.setCreatedDate(now);
        maintenanceCard.setModifiedDate(now);
        Long total = Long.valueOf(0);
        for (MaintenanceCardDetail maintenanceCardDetail : maintenanceCard.getMaintenanceCardDetails()) {
            maintenanceCardDetail.setCreatedDate(now);
            maintenanceCardDetail.setModifiedDate(now);
            maintenanceCardDetail.setMaintenanceCard(maintenanceCard);
            maintenanceCardDetail.setMaintenanceCardDetailStatusHistories(new ArrayList<>());
            // Giam so luong trong kho: so luong con lai = so luong hien tai - so luong trong phieu sua chua
            Product product = productRepository.findById(maintenanceCardDetail.getProduct().getId()).orElse(null);
            if (product != null && product.getType() == 1) {
                int quantity = product.getQuantity() - maintenanceCardDetail.getQuantity();
                if (quantity >= 0 && maintenanceCardDetail.getQuantity() > 0) {
                    product.setQuantity(product.getQuantity() - maintenanceCardDetail.getQuantity());
                } else {
                    throw new NotEnoughProductException(product.getId().toString());
                }
                total += maintenanceCardDetail.getPrice().longValue() * maintenanceCardDetail.getQuantity();
            } else if (product != null) {
                MaintenanceCardDetailStatusHistory maintenanceCardDetailStatusHistory = new MaintenanceCardDetailStatusHistory();
                maintenanceCardDetailStatusHistory.setCreatedDate(now);
                maintenanceCardDetailStatusHistory.setModifiedDate(now);
                maintenanceCardDetailStatusHistory.setMaintenanceCardDetail(maintenanceCardDetail);
                maintenanceCardDetailStatusHistory.setStatus((byte)0);
                maintenanceCardDetail.getMaintenanceCardDetailStatusHistories().add(maintenanceCardDetailStatusHistory);
                total += maintenanceCardDetail.getPrice().longValue();
            }
            maintenanceCardDetail.setProduct(product);
        }
        maintenanceCard.setPrice(BigDecimal.valueOf(total));

        if (maintenanceCard.getCode() == null) {
            try {
                maintenanceCard.setCode(createNewCode());
            } catch (NotANumberException notANumberExcepton) {
                notANumberExcepton.printStackTrace();
            }
        } else {
            if (maintenanceCard.getCode() != null && maintenanceCard.getCode().length() > 0) {
                int checkCode = maintenanceCardRepository.checkCode(maintenanceCard.getCode(), Long.valueOf(0));
                if (checkCode != 0) throw new CodeExistedException("Code existed");
            }
        }
        MaintenanceCard maintenanceCard1 = maintenanceCardRepository.save(maintenanceCard);
        return maintenanceCardConverter.convertAllToDTO(maintenanceCard1);
    }

    @Override
    public Map<String, Object> searchMaintenanceCard(MaintenanceCardFilter maintenanceCardFilter) {
        int page = maintenanceCardFilter.getPage();
        int size = maintenanceCardFilter.getSize();
        String search = maintenanceCardFilter.getSearch();
        String nameField = maintenanceCardFilter.getNameField();
        String order = maintenanceCardFilter.getOrder();
        byte[] workStatus = maintenanceCardFilter.getWorkStatus();
        byte[] payStatus = maintenanceCardFilter.getPayStatus();
        Pageable paging = PageRequest.of(page - 1, size, Sort.by("modifiedDate").descending());

        if (!nameField.equals("")) {
            paging = PageRequest.of(page - 1, size, Sort.by(nameField));
            if (order.equals("descend")) {
                paging = PageRequest.of(page - 1, size, Sort.by(nameField).descending());
            }
        }
        Page<MaintenanceCard> maintenanceCardPage = maintenanceCardRepository.search(paging, search, workStatus, payStatus);
        List<MaintenanceCardDTO> maintenanceCardDTOList = new ArrayList<>();
        HashMap<String, Object> map = new HashMap<>();
        List<MaintenanceCard> maintenanceCards = maintenanceCardPage.getContent();
        for (MaintenanceCard maintenanceCard : maintenanceCards) {
            maintenanceCardDTOList.add(maintenanceCardConverter.convertToDTO(maintenanceCard));
        }

        map.put("maintenanceCards", maintenanceCardDTOList);
        map.put("currentPage", maintenanceCardPage.getNumber() + 1);
        map.put("totalItems", maintenanceCardPage.getTotalElements());
        map.put("totalPages", maintenanceCardPage.getTotalPages());
        return map;
    }

    @Override
    public MaintenanceCardDTO getMaintenanceCardById(Long id) throws NotFoundException {

        MaintenanceCard maintenanceCard = maintenanceCardRepository.findById(id).orElse(null);
        if (maintenanceCard == null) {
            throw new NotFoundException("Not found maintenance card");
        }
        return maintenanceCardConverter.convertAllToDTO(maintenanceCard);

    }

    @Override
    public MaintenanceCardDTO updateMaintenanceCard(MaintenanceCardDTO maintenanceCardDTO) throws NotEnoughProductException, NotFoundException, CodeExistedException {

        MaintenanceCard maintenanceCardUpdate = maintenanceCardRepository.findById(maintenanceCardDTO.getId()).orElse(null);
        if (maintenanceCardUpdate == null) {
            throw new NotFoundException("Not found maintenance card");
        }
        MaintenanceCard maintenanceCard = maintenanceCardConverter.convertToEntity(maintenanceCardDTO);
        Date now = new Date();
        maintenanceCard.setCreatedDate(maintenanceCardUpdate.getCreatedDate());
        maintenanceCard.setModifiedDate(now);
        Long total = Long.valueOf(0);
        Long[] maintenanceCardDetailId = new Long[10000];
        int dem = 0;
        for (MaintenanceCardDetail maintenanceCardDetail : maintenanceCard.getMaintenanceCardDetails()) {
            maintenanceCardDetailId[dem] = maintenanceCardDetail.getId();
            dem++;
            MaintenanceCardDetail maintenanceCardDetail1Update = null;
            if(maintenanceCardDetail.getId() != null) {
                maintenanceCardDetail1Update = maintenanceCardDetailRepository.findById(maintenanceCardDetail.getId()).orElse(null);
            }
            // neu them moi
            if (maintenanceCardDetail1Update == null) {
                maintenanceCardDetail.setCreatedDate(now);
                maintenanceCardDetail.setModifiedDate(now);
                maintenanceCardDetail.setMaintenanceCard(maintenanceCard);
                Product product = productRepository.findById(maintenanceCardDetail.getProduct().getId()).orElse(null);
                if (product != null && product.getType() == 1) {
                    int quantity = product.getQuantity() - maintenanceCardDetail.getQuantity();
                    if (quantity >= 0 && maintenanceCardDetail.getQuantity() > 0) {
                        product.setQuantity(product.getQuantity() - maintenanceCardDetail.getQuantity());
                    } else {
                        throw new NotEnoughProductException(product.getId().toString());
                    }
                    total += maintenanceCardDetail.getPrice().longValue() * maintenanceCardDetail.getQuantity();
                } else if (product != null) {
                    MaintenanceCardDetailStatusHistory maintenanceCardDetailStatusHistory = new MaintenanceCardDetailStatusHistory();
                    maintenanceCardDetailStatusHistory.setCreatedDate(now);
                    maintenanceCardDetailStatusHistory.setModifiedDate(now);
                    maintenanceCardDetailStatusHistory.setMaintenanceCardDetail(maintenanceCardDetail);
                    maintenanceCardDetailStatusHistory.setStatus((byte) 0);
                    List<MaintenanceCardDetailStatusHistory> maintenanceCardDetailStatusHistories =new ArrayList<>();
                    maintenanceCardDetailStatusHistories.add(maintenanceCardDetailStatusHistory);
                    maintenanceCardDetail.setMaintenanceCardDetailStatusHistories(maintenanceCardDetailStatusHistories);
                    total += maintenanceCardDetail.getPrice().longValue();
                }
                maintenanceCardDetail.setProduct(product);
            }
            // neu da ton tai
            else {
                maintenanceCardDetail.setCreatedDate(maintenanceCardDetail1Update.getCreatedDate());
                maintenanceCardDetail.setModifiedDate(now);
                maintenanceCardDetail.setMaintenanceCard(maintenanceCard);
                Product product = productRepository.findById(maintenanceCardDetail.getProduct().getId()).orElse(null);
                // so luong con lai = so luong trong kho - chenh lech giua phieu sua chua truoc va sau
                if (product != null && product.getType() == 1) {
                    int quantity = product.getQuantity() - (maintenanceCardDetail.getQuantity() - maintenanceCardDetail1Update.getQuantity());
                    if (quantity >= 0 && maintenanceCardDetail.getQuantity() > 0) {
                        product.setQuantity(quantity);
                    } else {
                        throw new NotEnoughProductException(product.getId().toString());
                    }
                    total += maintenanceCardDetail.getPrice().longValue() * maintenanceCardDetail.getQuantity();
                } else if (product != null) {
                    total += maintenanceCardDetail.getPrice().longValue();
                }
            }
        }
        maintenanceCard.setPrice(BigDecimal.valueOf(total));
        for (MaintenanceCardDetail maintenanceCardDetail : maintenanceCardUpdate.getMaintenanceCardDetails()) {
            if (!ArrayUtils.contains(maintenanceCardDetailId, maintenanceCardDetail.getId())) {
                if(maintenanceCardDetail.getIsDelete() == 0){
                    if( !(maintenanceCardDetail.getProduct().getType() ==2 &&  maintenanceCardDetail.getStatus() != 0) ){
                        Product product = productRepository.findById(maintenanceCardDetail.getProduct().getId()).orElse(null);
                        if (product != null && product.getType() == 1) {
                            if (maintenanceCardDetail.getQuantity() > 0) {
                                product.setQuantity(product.getQuantity() + maintenanceCardDetail.getQuantity());
                            } else {
                                throw new NotEnoughProductException(product.getId().toString());
                            }
                        }
                        maintenanceCardDetail.setIsDelete((byte) 1);
                        MaintenanceCardDetailStatusHistory maintenanceCardDetailStatusHistory = new MaintenanceCardDetailStatusHistory();
                        maintenanceCardDetailStatusHistory.setCreatedDate(now);
                        maintenanceCardDetailStatusHistory.setModifiedDate(now);
                        maintenanceCardDetailStatusHistory.setMaintenanceCardDetail(maintenanceCardDetail);
                        maintenanceCardDetailStatusHistory.setStatus((byte) (-1));
                        maintenanceCardDetail.getMaintenanceCardDetailStatusHistories().add(maintenanceCardDetailStatusHistory);

                    }
                }
                maintenanceCard.getMaintenanceCardDetails().add(maintenanceCardDetail);
            }
        }
        if (maintenanceCard.getCode() == null || maintenanceCard.getCode().length() == 0) {
            maintenanceCard.setCode(maintenanceCardUpdate.getCode());
        } else {
            if (maintenanceCardRepository.checkCode(maintenanceCard.getCode(), maintenanceCard.getId()) > 0) {
                throw new CodeExistedException("Code existed");
            }
        }
        maintenanceCard.setCoordinator(maintenanceCardUpdate.getCoordinator());
        maintenanceCard.setCustomer(maintenanceCardUpdate.getCustomer());
        maintenanceCard.setPaymentHistories(maintenanceCardUpdate.getPaymentHistories());
        maintenanceCard.setPayStatus(maintenanceCardUpdate.getPayStatus());
        maintenanceCard.setPlatesNumber(maintenanceCardUpdate.getPlatesNumber());
        if(maintenanceCardUpdate.getRepairman() != null){
            maintenanceCard.setRepairman(maintenanceCardUpdate.getRepairman());
        }
        maintenanceCard.setWorkStatus(maintenanceCardUpdate.getWorkStatus());
        try {
            MaintenanceCard maintenanceCard1 =  maintenanceCardRepository.saveAndFlush(maintenanceCard);
            return maintenanceCardConverter.convertAllToDTO(maintenanceCard1);
        }
        catch (Exception e){
            e.printStackTrace();
            throw new UnknownException();
        }
    }

    @Override
    public MaintenanceCardDTO updateAllStatusMaintenanceCard(Long id) throws NotFoundException, NotFoundRepairmanException {
        Date now = new Date();
        MaintenanceCard maintenanceCard = maintenanceCardRepository.findById(id).orElse(null);
        if(maintenanceCard == null){
            throw  new NotFoundException("Not found maintenance card");
        }
        if(maintenanceCard.getRepairman() != null) {
            byte workStatus = 2;
            maintenanceCard.setWorkStatus(workStatus);
            for(MaintenanceCardDetail maintenanceCardDetail : maintenanceCard.getMaintenanceCardDetails()){
                if(maintenanceCardDetail.getProduct().getType() == 2){
                    maintenanceCardDetail.setStatus(workStatus);
                    MaintenanceCardDetailStatusHistory maintenanceCardDetailStatusHistory = new MaintenanceCardDetailStatusHistory();
                    maintenanceCardDetailStatusHistory.setCreatedDate(now);
                    maintenanceCardDetailStatusHistory.setModifiedDate(now);
                    maintenanceCardDetailStatusHistory.setMaintenanceCardDetail(maintenanceCardDetail);
                    maintenanceCardDetailStatusHistory.setStatus((byte) (maintenanceCardDetail.getStatus()));
                    maintenanceCardDetail.getMaintenanceCardDetailStatusHistories().add(maintenanceCardDetailStatusHistory);
                }
            }
            MaintenanceCard maintenanceCard1 = maintenanceCardRepository.save(maintenanceCard);
            return maintenanceCardConverter.convertAllToDTO(maintenanceCard1);
        }
        else{
            return maintenanceCardConverter.convertAllToDTO(maintenanceCard);
        }
    }

    @Override
    public Map<String, Object> getMaintenanceCardByRepairMan(int PageNum, int PageSize, String sortBy, boolean descending,Long userId,String code) {
        Pageable pageable = null;
        if(descending){
            pageable=  PageRequest.of(PageNum-1,PageSize,Sort.by(sortBy.length() ==0?"id":sortBy).descending());
        }else{
            pageable= PageRequest.of(PageNum-1,PageSize,Sort.by(sortBy.length() ==0?"id":sortBy).ascending());
        }
        Page<MaintenanceCard> maintenanceCardPage = maintenanceCardRepository.getMaintenanceCardByRepairMan(pageable,userId,code);
       List< MaintenanceCardDTO> maintenanceCardDTO = new ArrayList<>();
        Map<String,Object> map = new HashMap<>();
        maintenanceCardPage.toList().forEach(maintenanceCard -> {
            maintenanceCardDTO.add(maintenanceCardConverter.convertToDTO(maintenanceCard));
        });
        map.put("maintenanceCard",maintenanceCardDTO);
        map.put("totalPage",maintenanceCardPage.getTotalPages());
        map.put("totalElement",maintenanceCardPage.getTotalElements());
        map.put("currentPage",PageNum);
        return map;
    }




    public String createNewCode() throws NotANumberException {
        Long codeNumber = 0L;
        String newCodeString;
        int index = 0;
        String getMaxCode = null;
        getMaxCode = maintenanceCardRepository.getMaxCode(index);
        System.out.println(getMaxCode);
        do {
            getMaxCode = maintenanceCardRepository.getMaxCode(index);
            if (getMaxCode == null) {
                getMaxCode = "0";
            } else {
                boolean result = StringUtils.isNumeric(getMaxCode);
                if (!result) {
                    getMaxCode = null;
                    index++;
                } else {
                    getMaxCode = getMaxCode;
                }
            }
        } while (getMaxCode == null);
        codeNumber = Long.parseLong(getMaxCode) + 1;
        newCodeString = "mc00" + codeNumber.toString();
        return newCodeString;
    }
    
    @Override
    public Map<String, Object> getMaintenanceCardByIdCustomer(int pageNumber, int size, Long id) {

        Pageable paging = PageRequest.of(pageNumber - 1, size, Sort.by("modifiedDate").descending());

        Page<MaintenanceCard> maintenanceCardPage = maintenanceCardRepository.getMaintenanceCardByIdCustomer(paging, id);
        List<MaintenanceCardDTO> maintenanceCardDTOS = new ArrayList<>();
        HashMap<String, Object> map = new HashMap<>();
        List<MaintenanceCard> maintenanceCards = maintenanceCardPage.getContent();

        for (MaintenanceCard maintenanceCard : maintenanceCards){
            maintenanceCardDTOS.add(maintenanceCardConverter.convertToDTO(maintenanceCard));
        }

        map.put("customers", maintenanceCardDTOS);
        map.put("currentPage", maintenanceCardPage.getNumber() + 1);
        map.put("totalItems", maintenanceCardPage.getTotalElements());
        map.put("totalPages", maintenanceCardPage.getTotalPages());
        return map;
    }


}
