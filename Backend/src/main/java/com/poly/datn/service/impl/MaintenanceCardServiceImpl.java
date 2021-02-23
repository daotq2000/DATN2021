package com.poly.datn.service.impl;

import com.poly.datn.contraint.CONSTRAINTS;
import com.poly.datn.converter.MaintenanceCardConverter;
import com.poly.datn.converter.UserConverter;
import com.poly.datn.entity.*;
import com.poly.datn.exception.maintenanceCardException.CouponLargerTotalException;
import com.poly.datn.exception.maintenanceCardException.NotEnoughProductException;
import com.poly.datn.exception.maintenanceCardException.NotFoundRepairmanException;

import com.poly.datn.repository.*;
import com.poly.datn.dto.MaintenanceCardDTO;
import com.poly.datn.exception.CodeExistedException;
import com.poly.datn.exception.NotANumberException;
import com.poly.datn.exception.commonException.NotFoundException;
import com.poly.datn.exception.commonException.UnknownException;
import com.poly.datn.model.MaintenanceCardCustomer;
import com.poly.datn.model.MaintenanceCardFilter;
import com.poly.datn.model.MessageModel;
import com.poly.datn.service.MaintenanceCardService;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.*;

@Service
@Transactional
public class MaintenanceCardServiceImpl implements MaintenanceCardService {
    @Autowired
    UserConverter userConverter;
    private MaintenanceCardConverter maintenanceCardConverter;
    private MaintenanceCardRepository maintenanceCardRepository;
    private CustomerRepository customerRepository;
    private ProductRepository productRepository;
    private MaintenanceCardDetailRepository maintenanceCardDetailRepository;
    private SimpMessagingTemplate simpMessagingTemplate;
    private UserRepository userRepository;
    private ServiceRepository serviceRepository;
    private ProductStoreRepository productStoreRepository;
    private CouponRepository couponRepository;
    private UserRepositoryCustom userRepositoryCustom;
    private final float timeEmp = 11;
    private final int openStore = 7;
    private final int close = 19;
    @Autowired
    MaintenanceCardDetailStatusHistoryRepository maintenanceCardDetailStatusHistoryRepository;

    @Autowired
    public MaintenanceCardServiceImpl(MaintenanceCardConverter maintenanceCardConverter, MaintenanceCardRepository maintenanceCardRepository, CustomerRepository customerRepository, ProductRepository productRepository, MaintenanceCardDetailRepository maintenanceCardDetailRepository, SimpMessagingTemplate simpMessagingTemplate, UserRepository userRepository, ServiceRepository serviceRepository, ProductStoreRepository productStoreRepository, CouponRepository couponRepository, UserRepositoryCustom userRepositoryCustom) {
        this.maintenanceCardConverter = maintenanceCardConverter;
        this.maintenanceCardRepository = maintenanceCardRepository;
        this.customerRepository = customerRepository;
        this.productRepository = productRepository;
        this.maintenanceCardDetailRepository = maintenanceCardDetailRepository;
        this.simpMessagingTemplate = simpMessagingTemplate;
        this.userRepository = userRepository;
        this.serviceRepository = serviceRepository;
        this.productStoreRepository = productStoreRepository;
        this.couponRepository = couponRepository;
        this.userRepositoryCustom = userRepositoryCustom;
    }

    @Transactional
    @Override
    public MaintenanceCardDTO insertMaintenanceCard(MaintenanceCardDTO maintenanceCardDTO) throws Exception {

        MaintenanceCard maintenanceCard = maintenanceCardConverter.convertToEntity(maintenanceCardDTO);
        Date returnDate = new Date();
        Product product = null;
        Date now = new Date();
        maintenanceCard.setCreatedDate(now);
        maintenanceCard.setModifiedDate(now);
        Long total = Long.valueOf(0);
        com.poly.datn.entity.Service service = null;
        int hour = 0;
        float minute = 0;
        int i = 0;
        float originalTime = Float.parseFloat("0");
        for (MaintenanceCardDetail maintenanceCardDetail : maintenanceCard.getMaintenanceCardDetails()) {
//            System.out.println("Service lần "+(i++)+"- Giá: "+ maintenanceCardDetail.getService().getPrice());
            String[] time = new String[2];
            if (maintenanceCardDetail.getService() != null) {
                service = serviceRepository.getOne(maintenanceCardDetail.getService().getId());
                time = service.getTime().split("-");
            }
            maintenanceCardDetail.setCreatedDate(now);
            maintenanceCardDetail.setModifiedDate(now);
            maintenanceCardDetail.setMaintenanceCard(maintenanceCard);
            maintenanceCardDetail.setMaintenanceCardDetailStatusHistories(new ArrayList<>());
            User user = userRepository.getOne(maintenanceCardDTO.getRepairman().getId());

            // Giam so luong trong kho: so luong con lai = so luong hien tai - so luong trong phieu sua chua

            if (maintenanceCardDetail.getService() != null) {
                service = serviceRepository.findById((maintenanceCardDetail.getService().getId())).orElse(null);
                if (service.getTime() != null) {
                    hour += Integer.parseInt(time[0]);
                    minute += Integer.parseInt(time[1]);
                    originalTime += convertToFloatTotalTime(service.getTime());
                }

            }

            if (maintenanceCardDetail.getProduct() != null) {
                product = productRepository.getOne(maintenanceCardDetail.getProduct().getId());
                ProductStore productStore = productStoreRepository.getByStoreIdAndProductsId(maintenanceCard.getStore().getId(), maintenanceCardDetail.getProduct().getId());
                if (productStore != null) {
                    int quantityOfProductStore = productStore.getQuantity() - maintenanceCardDetail.getQuantity();
                    if (quantityOfProductStore > 0 && maintenanceCardDetail.getQuantity() > 0) {
                        product.setQuantity(quantityOfProductStore);
                        productStore.setQuantity(quantityOfProductStore);
                        productStoreRepository.save(productStore);
                    } else {
                        throw new NotEnoughProductException("Not enough quantity product with productId: " + product.getQuantity() + " And Store Id: " + productStore.getStore().getId());
                    }
                } else {

                    throw new NotFoundException("Sản phẩm " + product.getName() + " hiện tại không có trong cửa hàng " + maintenanceCard.getStore().getName() + "! Vui lòng thêm sản phẩm vào cửa hàng");
                }

                total += product.getPricePerUnit().longValue() * maintenanceCardDetail.getQuantity();
                System.out.println(" Product total: " + product.getPricePerUnit().longValue() * maintenanceCardDetail.getQuantity());
                MaintenanceCardDetailStatusHistory maintenanceCardDetailStatusHistory = new MaintenanceCardDetailStatusHistory();
                maintenanceCardDetailStatusHistory.setCreatedDate(now);
                maintenanceCardDetailStatusHistory.setModifiedDate(now);
                maintenanceCardDetailStatusHistory.setMaintenanceCardDetail(maintenanceCardDetail);
                maintenanceCardDetailStatusHistory.setStatus(CONSTRAINTS.DELETE);
                maintenanceCardDetail.getMaintenanceCardDetailStatusHistories().add(maintenanceCardDetailStatusHistory);


            }
            System.out.println("service MaintenaceCard: " + maintenanceCardDetail.getService());
            if (maintenanceCardDetail.getService() != null) {
                System.out.println("Service Name: " + service.getName());
//                System.out.println("total Service"+service.getPrice().longValue());
                if (maintenanceCardDetail.getService().getPrice() != null) {
                    total += maintenanceCardDetail.getService().getPrice().longValue();
                    maintenanceCardDetail.setService(service);
                }


            }
            maintenanceCardDetail.setPrice(BigDecimal.valueOf(total));
            if (maintenanceCardDetail.getProduct() != null) {
                maintenanceCardDetail.setProduct(product);
            }

        }
        System.out.println("total:" + total);
        System.out.println("hour: " + hour);
        System.out.println("minutes: " + minute);

        if (minute > 59) {
            int integer = (int) minute / 60;
            float decimal = minute % 60;
            hour += integer;
            minute = decimal;
            System.out.println("total Hour: " + hour);
            System.out.println("total minutes: " + minute);
        }
        //calculate Total Time Service in maintenanceCard;
        float totalTimeMaintenanceCard = (hour + (minute / 100));
        System.out.println("totalTimeMaintenanceCard: " + totalTimeMaintenanceCard);
        maintenanceCard.setTotalTime(totalTimeMaintenanceCard);
        maintenanceCard.setPrice(BigDecimal.valueOf(total));
        maintenanceCard.setCreatedDate(new Date());
        maintenanceCard.setModifiedDate(new Date());
        maintenanceCard.setTimeStart(new Date());

        Date startTime = maintenanceCard.getTimeStart();
        if (maintenanceCard.getCoupon() != null) {
            Coupon coupon = couponRepository.getOne(maintenanceCard.getCoupon().getId());
            if (coupon != null) {
                if (total > coupon.getDiscount().longValue()) {
                    maintenanceCard.setPrice(BigDecimal.valueOf(total - coupon.getDiscount().longValue()));
                    maintenanceCard.setCoupon(coupon);
                } else {
                    throw new CouponLargerTotalException("Amount Money smaller Coupon Discount");
                }
            } else {
                throw new NotFoundException("Coupon with Id: " + maintenanceCard.getCoupon().getId() + " doesn't existed");
            }


        }
        maintenanceCard.setPlatesNumber(maintenanceCard.getPlatesNumber().toLowerCase());

        if (maintenanceCard.getCode() == null || maintenanceCard.getCode().length() == 0) {
            try {
                maintenanceCard.setCode(createNewCode());
            } catch (NotANumberException notANumberExcepton) {
                notANumberExcepton.printStackTrace();
            }
        } else {

            int checkCode = maintenanceCardRepository.checkCode(maintenanceCard.getCode().toLowerCase(), Long.valueOf(0));
            if (checkCode != 0) throw new CodeExistedException("Code existed");
            maintenanceCard.setCode(maintenanceCard.getCode().toLowerCase());

        }
        MaintenanceCard maintenanceCard1 = null;
        if (totalTimeMaintenanceCard > 0) {
            float timeLeftOfEmp = timeEmp - ((startTime.getHours()) - 7);


            if (timeLeftOfEmp < 0) {
                timeLeftOfEmp = 0;
            }
            System.out.println("timeLeftOfEmp" + startTime.getHours());
            if (totalTimeMaintenanceCard <= 11) {
                System.out.println("totalTimeMaintenanceCard <= 11");
                String s = totalTimeMaintenanceCard + "";
                int hourFirst = Integer.parseInt(s.substring(0, s.indexOf(".")));
                int minuteFirst = Integer.parseInt(s.substring((s.indexOf(".") + 1)));
                int hoursTotalTime = Integer.parseInt(s.substring(0, s.indexOf(".")));
                int minuteTotalTime = Integer.parseInt(s.substring((s.indexOf(".") + 1), s.length()));
                if (minuteTotalTime < 10) {
                    minuteTotalTime = minuteTotalTime * 10;
                }
                int sumTime = startTime.getHours() + (hoursTotalTime);

                if (sumTime >= 7 && sumTime <= 18) {
                    System.out.println("minuteTotalTime: " + minuteTotalTime);
                    System.out.println("sumTime: " + sumTime);
                    System.out.println("case1");
                    if (sumTime >= 12 && startTime.getHours() <12) {
                        hoursTotalTime += 1;
                    }
                    int minuteLeft =  (60 - startTime.getMinutes());
                    System.out.println("minuteLeft"+ minuteLeft);
                    if (minuteTotalTime >= minuteLeft) {
                        hoursTotalTime += 1;
                        System.out.println(60 - startTime.getMinutes());
                        minuteTotalTime = minuteTotalTime - (60 - startTime.getMinutes());
                        System.out.println("1." + hoursTotalTime);
                        System.out.println("2." + minuteTotalTime);
                    }
                    int hourReturn = startTime.getHours() + (hoursTotalTime);
                    int minuteReturn = startTime.getMinutes() + minuteTotalTime;
                    System.out.println("hourReturn: "+hourReturn);
                    System.out.println("minuteReturn: "+minuteReturn);
                    if(hourReturn > 18){
                        int left1 = 19 - startTime.getHours();
                        if(left1 >=0){
                            returnDate.setDate(startTime.getDate()+1);
                            returnDate.setMinutes(minuteTotalTime);
                            returnDate.setHours(7+(hoursTotalTime-left1));

                        }else{
                            returnDate.setDate(startTime.getDate()+1);
                            returnDate.setMinutes(minuteFirst);
                            returnDate.setHours(7+(hourFirst));
                        }
                    }else{

                        if((startTime.getHours()+hourFirst) <= 18 && (startTime.getMinutes()+minuteFirst) <= 60){
                            System.out.println("TH1");
                            returnDate.setDate(startTime.getDate());
                            returnDate.setMinutes(startTime.getMinutes()+minuteFirst);
                            returnDate.setHours(startTime.getHours() + (hourFirst));
                        }else if((startTime.getHours()+hourFirst) <= 18 && (startTime.getMinutes()+minuteFirst) >= 60){
                            System.out.println("TH2");

                            if(startTime.getHours()+hourFirst == 18 && startTime.getMinutes()+minuteFirst >=60){
                                returnDate.setDate(startTime.getDate()+1);
                                returnDate.setHours(7+(18-(startTime.getHours()+hourFirst)));
                                returnDate.setMinutes(minuteFirst);
                            }
                        } else {
                            System.out.println("TH3");
                            returnDate.setDate(startTime.getDate()+1);
                            returnDate.setHours(7+(18-(startTime.getHours()+hourFirst)));
                            returnDate.setMinutes(minuteFirst);
                        }
                        System.out.println("returnDate.getHours(): "+returnDate.getHours());
                        System.out.println("returnDate.getMinutes(): "+returnDate.getMinutes());
                    }

                } else {
                    //day la truong hop tao phieu luc 18h tro di
                    System.out.println("case2");

                    if (startTime.getHours() - 18 == 0 && (startTime.getMinutes() + minuteTotalTime) > 58) {
                        //tru di so phut hien tai dang sua va chuyen time sang ngay moi
                        System.out.println("18h");
                        returnDate.setDate(startTime.getDate() + 1);
                        returnDate.setHours(7 + (startTime.getHours() - 18) + hoursTotalTime);
                        returnDate.setMinutes(((startTime.getMinutes() + minuteTotalTime) - 60));
                    } else {

                        int hourLeft = 18 - startTime.getHours();
                        int minuteLeft = 60 - startTime.getMinutes();
                        if (hourLeft >= 0) {
                            returnDate.setDate(startTime.getDate() + 1);
                            returnDate.setHours(7 + (hoursTotalTime - hourLeft));
                            if (startTime.getMinutes() + minuteTotalTime < 58) {
                                if (minuteLeft > 0) {
                                    returnDate.setMinutes(minuteTotalTime - minuteLeft);
                                } else {
                                    returnDate.setMinutes(0);
                                }
                            } else {
                                returnDate.setHours(returnDate.getHours() + 1);
                                returnDate.setMinutes((startTime.getMinutes() + minuteTotalTime) - 60);
                            }
                        } else {
                            int sumOfTime = openStore + hour;
                            if (sumOfTime >= 12) {
                                sumOfTime += 1;
                            }
                            returnDate.setHours(sumOfTime);
                            returnDate.setMinutes(0 + (int) minute);
                        }
                    }
                }
                System.out.println("-----------1--------------");
                System.out.println("hoursTotalTime" + hoursTotalTime);
                System.out.println("minuteTotalTime" + minuteTotalTime);
                System.out.println("returnDate" + returnDate);
            } else if (totalTimeMaintenanceCard > timeLeftOfEmp && totalTimeMaintenanceCard >= timeEmp) {
                System.out.println("totalTimeMaintenanceCard > 11");
                float[] totalTime = totalTimeService(totalTimeMaintenanceCard, timeEmp, timeLeftOfEmp);
                System.out.println("total Time" + Arrays.toString(totalTime));
                returnDate.setDate(returnDate.getDate() + ((int) totalTime[0]));
                String c = String.valueOf(totalTime[1]);
                int hoursTotalTime = Integer.parseInt(c.substring(0, c.indexOf(".")));
                int minuteTotalTime = Integer.parseInt(c.substring((c.indexOf(".") + 1), c.length()));
                if (minuteTotalTime < 10) {
                    minuteTotalTime = minuteTotalTime * 10;
                }
                if (7 + hoursTotalTime >= 12) {
                    hoursTotalTime += 1;
                }
                returnDate.setHours(7 + hoursTotalTime);
                returnDate.setMinutes(0 + minuteTotalTime);
                System.out.println("-----------2--------------");

                System.out.println("hoursTotalTime" + hoursTotalTime);
                System.out.println("minuteTotalTime" + minuteTotalTime);
                System.out.println("returnDate " + returnDate);
                System.out.println("returnDate " + returnDate.getDay() + "/" + returnDate.getMonth());
            }
            maintenanceCard.setReturnDate(returnDate);
        } else {
            maintenanceCard.setReturnDate(null);
        }
        originalTime = Math.round(originalTime * 100);
        maintenanceCard.setTotalTime(totalTimeMaintenanceCard);
        maintenanceCard.setOriginalTime(originalTime / 100);
        maintenanceCard.setTimeLeft(totalTimeMaintenanceCard);
        try {
            maintenanceCard1 = maintenanceCardRepository.save(maintenanceCard);
            if (maintenanceCard1.getRepairman() != null) {
                MessageModel messageModel = new MessageModel();
                messageModel.setType(1);
                messageModel.setMessage(maintenanceCard.getId().toString());
                simpMessagingTemplate.convertAndSend("/topic/messages/" + maintenanceCard1.getRepairman().getId(), messageModel);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return maintenanceCardConverter.convertAllToDTO(maintenanceCard1);
    }

    @Override
    public Map<String, Object> searchMaintenanceCard(MaintenanceCardFilter maintenanceCardFilter, String email, int role) {
        Page<MaintenanceCard> maintenanceCardPage = null;
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
        System.out.println(role);
        if(role ==1 || role ==3){
             maintenanceCardPage = maintenanceCardRepository.searchAll(paging, search, workStatus, payStatus);
        }else{
            maintenanceCardPage = maintenanceCardRepository.search(paging, search, workStatus, payStatus, email, role);
        }
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

    @Transactional
    @Override
    public MaintenanceCardDTO getMaintenanceCardById(Long id, String email, int role) throws NotFoundException {
        MaintenanceCard maintenanceCard = maintenanceCardRepository.getOne(id);

//        MaintenanceCard maintenanceCard = maintenanceCardRepository.getMaintenanceCardByIdAndEmail(id, email, role);
//        System.out.println(maintenanceCard);
        if (maintenanceCard == null) {
            throw new NotFoundException("Not found maintenance card");
        }
        return maintenanceCardConverter.convertAllToDTO(maintenanceCard);

    }

    @Override
    public MaintenanceCardDTO updateMaintenanceCard(MaintenanceCardDTO maintenanceCardDTO, String email, int role) throws Exception {

        System.out.println("returned:" + maintenanceCardDTO.isReturned());
        MaintenanceCard maintenanceCardUpdate = maintenanceCardRepository.getOne(maintenanceCardDTO.getId());
        if (maintenanceCardUpdate == null) {
            throw new NotFoundException("Not found maintenance card");
        }

        boolean finished = true;
        byte status = 0;
        boolean check = true;
        Date returnDate = new Date();
        MaintenanceCard maintenanceCard = maintenanceCardConverter.convertToEntity(maintenanceCardDTO);
        if(maintenanceCard.getRepairman() != null){
            System.out.println("alo,"+maintenanceCardDTO.getRepairman().getId());
            User repair = userRepository.getOne(maintenanceCardDTO.getRepairman().getId());
            maintenanceCard.setRepairman(repair);
        }else{
            maintenanceCard.setRepairman(maintenanceCardUpdate.getRepairman());
        }

        maintenanceCard.setPlatesNumber(maintenanceCardDTO.getPlatesNumber());
        maintenanceCard.setTimeStart(maintenanceCardUpdate.getTimeStart());
        Product product = null;
        Date now = new Date();
        maintenanceCard.setCreatedDate(maintenanceCardUpdate.getCreatedDate());
        maintenanceCard.setModifiedDate(now);
        Long total = Long.valueOf(0);
        Long[] maintenanceCardDetailId = findIdMaintenanceDetailfromDB(maintenanceCardUpdate.getMaintenanceCardDetails());
        List<Byte> statusOfMaintenanceCard = new ArrayList<>();
        maintenanceCard.setReturned(maintenanceCardDTO.isReturned());
        Date startTime = maintenanceCard.getTimeStart();
        if (startTime == null) {
            startTime = new Date();
        }
        int dem = 0;
        int hour = 0;
        float minute = 0;
        float originalTime = Float.parseFloat("0");
        Long[] idMaintenanceCardDetail = new Long[maintenanceCard.getMaintenanceCardDetails().size()];
        List<Byte> countFinish = new ArrayList<>();
        for (MaintenanceCardDetail maintenanceCardDetail : maintenanceCard.getMaintenanceCardDetails()) {


            countFinish.add(maintenanceCardDetail.getStatus());
            String[] time = new String[2];


            MaintenanceCardDetail maintenanceCardDetail1Update = null;
            if (maintenanceCardDetail.getId() != null) {
                maintenanceCardDetail1Update = maintenanceCardDetailRepository.findById(maintenanceCardDetail.getId()).orElse(null);
            }
            // neu them moi
            if (maintenanceCardDetail1Update == null) {
                com.poly.datn.entity.Service service = null;
                if (maintenanceCardDetail.getService() != null) {
                    service = serviceRepository.getOne(maintenanceCardDetail.getService().getId());
                    time = maintenanceCardDetail.getService().getTime().split("-");
                    originalTime += convertToFloatTotalTime(service.getTime());
                }
                maintenanceCardDetail.setCreatedDate(now);
                maintenanceCardDetail.setModifiedDate(now);
                maintenanceCardDetail.setMaintenanceCard(maintenanceCard);


                if (maintenanceCardDetail.getProduct() != null) {
                    product = productRepository.findById(maintenanceCardDetail.getProduct().getId()).orElse(null);
                    ProductStore productStore = productStoreRepository.getByStoreIdAndProductsId(maintenanceCard.getStore().getId(), maintenanceCardDetail.getProduct().getId());
                    int quantityOfProductStore = productStore.getQuantity() - maintenanceCardDetail.getQuantity();
                    if (productStore != null) {
                        if (quantityOfProductStore > 0 && maintenanceCardDetail.getQuantity() > 0) {
                            productStore.setQuantity(quantityOfProductStore);
                            productStoreRepository.save(productStore);
                        } else {
                            throw new NotEnoughProductException("Not enough quantity product with productId: " + product.getQuantity() + " And Store Id: " + productStore.getStore().getId());
                        }
                    } else {
                        throw new Exception("Product: " + product.getId() + " doesn't exist in Product_store:" + maintenanceCard.getStore().getId());
                    }
                    total += product.getPricePerUnit().longValue() * maintenanceCardDetail.getQuantity();
                    check = false;
                    maintenanceCardDetail.setProduct(product);
                }
                if (maintenanceCardDetail.getService() != null) {
                    service = serviceRepository.getOne(maintenanceCardDetail.getService().getId());
                    if(!maintenanceCardDetail.isFree()){
                        total += maintenanceCardDetail.getService().getPrice().longValue();
                    }
                    hour += Integer.parseInt(time[0]);
                    minute += Integer.parseInt(time[1]);

                    MaintenanceCardDetailStatusHistory maintenanceCardDetailStatusHistory = new MaintenanceCardDetailStatusHistory();
                    maintenanceCardDetailStatusHistory.setCreatedDate(now);
                    maintenanceCardDetailStatusHistory.setModifiedDate(now);
                    maintenanceCardDetailStatusHistory.setMaintenanceCardDetail(maintenanceCardDetail);
                    maintenanceCardDetailStatusHistory.setStatus((byte) 0);
                    List<MaintenanceCardDetailStatusHistory> maintenanceCardDetailStatusHistories = new ArrayList<>();
                    maintenanceCardDetailStatusHistories.add(maintenanceCardDetailStatusHistory);

                    maintenanceCardDetail.setMaintenanceCardDetailStatusHistories(maintenanceCardDetailStatusHistories);

                    maintenanceCardDetail.setService(service);
                    maintenanceCardDetail.setStatus((byte) 0);
                    maintenanceCard.setWorkStatus((byte) 0);
                    statusOfMaintenanceCard.add((byte)0);

                }


            }
            // neu da ton tai

            else {

                com.poly.datn.entity.Service service = null;
                idMaintenanceCardDetail[dem] = maintenanceCardDetail.getId();
                dem++;
                if (maintenanceCardDetail.getService() != null) {
                    service = serviceRepository.getOne(maintenanceCardDetail.getService().getId());
                    if (maintenanceCardDetail1Update.getStatus() != 2) {
                        System.out.println("Status == 0 && 1");
                        time = service.getTime().split("-");

                        hour += Integer.parseInt(time[0]);
                        minute += Integer.parseInt(time[1]);
                        originalTime += convertToFloatTotalTime(service.getTime());
                    }
                    if(!maintenanceCardDetail.isFree()){
                        total += service.getPrice().longValue();
                    }
                    statusOfMaintenanceCard.add(maintenanceCardDetail1Update.getStatus());
                    maintenanceCardDetail.setService(service);
                }
                maintenanceCardDetail.setCreatedDate(maintenanceCardDetail1Update.getCreatedDate());
                maintenanceCardDetail.setMaintenanceCard(maintenanceCard);
                maintenanceCardDetail.setFree(maintenanceCardDetail.isFree());
                maintenanceCardDetail.setStatus(maintenanceCardDetail1Update.getStatus());
                if (maintenanceCardDetail.getProduct() != null) {
                    product = productRepository.findById(maintenanceCardDetail.getProduct().getId()).orElse(null);
                    ProductStore productStore = productStoreRepository.getByStoreIdAndProductsId(maintenanceCard.getStore().getId(), maintenanceCardDetail.getProduct().getId());

                    if (maintenanceCardDetail1Update.getQuantity() >= maintenanceCardDetail.getQuantity()) {
                        int difference = maintenanceCardDetail1Update.getQuantity() - maintenanceCardDetail.getQuantity();
                        maintenanceCardDetail.setQuantity(maintenanceCardDetail.getQuantity());
                        productStore.setQuantity(productStore.getQuantity() + difference);
                        productStoreRepository.save(productStore);

                    } else if (maintenanceCardDetail1Update.getQuantity() <= maintenanceCardDetail.getQuantity()) {
                        int quantityOfProductStore = productStore.getQuantity() - maintenanceCardDetail.getQuantity();
                        if (productStore != null) {
                            if (quantityOfProductStore > 0 && maintenanceCardDetail.getQuantity() > 0) {
//                                product.setQuantity(quantityOfProductStore);
                                maintenanceCardDetail.setQuantity(maintenanceCardDetail.getQuantity());
                                productStore.setQuantity(quantityOfProductStore);
                                productStoreRepository.save(productStore);
                            } else {
                                throw new NotEnoughProductException("Not enough quantity product with productId: " + product.getQuantity() + " And Store Id: " + productStore.getStore().getId());
                            }
                        } else {
                            throw new Exception("Product: " + product.getId() + "doesn't exist in Product_store:" + maintenanceCard.getStore().getId());
                        }
                    }
                    total += product.getPricePerUnit().longValue() * maintenanceCardDetail.getQuantity();

                    if (maintenanceCardDetail1Update.getStatus() != 0) {
                        status = 1;
                    }
                    if (maintenanceCardDetail1Update.getStatus() != 2) {
                        check = false;
                    }
                }                // so luong con lai = so luong trong kho - chenh lech giua phieu sua chua truoc va sau
                maintenanceCardDetail.setMaintenanceCardDetailStatusHistories(maintenanceCardDetail1Update.getMaintenanceCardDetailStatusHistories());

            }
        }
        if (minute > 59) {
            int integer = (int) minute / 60;
            float decimal = minute % 60;
            hour += integer;
            minute = decimal;
        }

        float totalTimeMaintenanceCard = (hour + (minute / 100));
        System.out.println("totalTimeMaintenanceCard: " + totalTimeMaintenanceCard);
        if (totalTimeMaintenanceCard > 0) {
            maintenanceCard.setTotalTime(totalTimeMaintenanceCard);
        }
        maintenanceCard.setPrice(BigDecimal.valueOf(total));

        if (maintenanceCard.getCoupon() != null) {

            Coupon coupon = couponRepository.getOne(maintenanceCard.getCoupon().getId());
            coupon.setQuantity(coupon.getQuantity() - 1);
            couponRepository.save(coupon);
            if (coupon != null) {
                if (total > coupon.getDiscount().longValue()) {
                    maintenanceCard.setPrice(BigDecimal.valueOf(total - coupon.getDiscount().longValue()));
                    maintenanceCard.setCoupon(coupon);
                } else {
                    throw new CouponLargerTotalException("Amount Money smaller Coupon Discount");
                }
            } else {
                throw new NotFoundException("Coupon with Id: " + maintenanceCard.getCoupon().getId() + " doesn't existed");
            }
        }
        for (Byte finish : countFinish) {
            if (finish != 2) {
                finished = false;
            }
        }
        if (finished) {
            maintenanceCard.setWorkStatus((byte) 2);
        } else {
            maintenanceCard.setWorkStatus((byte) 1);
        }
        System.out.println("Equals: " + Arrays.toString(maintenanceCardDetailId) + "|" + Arrays.toString(idMaintenanceCardDetail));
        MaintenanceCardDetail maintenanceCardDetailDeleteDB = null;
        List<Long> idUpdate = Arrays.asList(maintenanceCardDetailId);
        List<Long> idCurrent = Arrays.asList(idMaintenanceCardDetail);
        for (Long maintenanceCardDetailUpdate : idUpdate) {
            maintenanceCardDetailDeleteDB = maintenanceCardDetailRepository.getOne(maintenanceCardDetailUpdate);
            if (!idCurrent.contains(maintenanceCardDetailUpdate)) {
                System.out.println("Not Equals: " + maintenanceCardDetailUpdate);

                if (maintenanceCardDetailDeleteDB.getProduct() != null) {
                    product = productRepository.findById(maintenanceCardDetailDeleteDB.getProduct().getId()).orElse(null);
                    if (product != null) {
                        ProductStore productStore = productStoreRepository.getByStoreIdAndProductsId(maintenanceCard.getStore().getId(), maintenanceCardDetailDeleteDB.getProduct().getId());
                        if (productStore != null) {
                            int quantityOfProductStore = productStore.getQuantity() + maintenanceCardDetailDeleteDB.getQuantity();
                            productStore.setQuantity(quantityOfProductStore);
                            productStoreRepository.save(productStore);
                        }
                    }
                }
                if (maintenanceCardDetailDeleteDB.getService() != null) {
                    maintenanceCardDetailStatusHistoryRepository.deleteByMaintenanceCardDetailId(maintenanceCardDetailUpdate);
                    System.out.println("deleted roi");
                }


                maintenanceCardDetailDeleteDB.setIsDelete((byte) 1);
//                maintenanceCardDetailRepository.deleteByIdMaintenanceCardDetail(maintenanceCardDetailUpdate);

            }
        }

        maintenanceCard.setCode(maintenanceCard.getCode().toLowerCase());
        if (maintenanceCard.getCode() == null || maintenanceCard.getCode().length() == 0) {
            maintenanceCard.setCode(maintenanceCardUpdate.getCode());
        } else {
            if (maintenanceCardRepository.checkCode(maintenanceCard.getCode(), maintenanceCard.getId()) > 0) {
                System.out.println(maintenanceCard.getId());
                throw new CodeExistedException("Code existed");
            }
        }
//        }
        Long temp = Long.valueOf(0);
        for (PaymentHistory paymentHistory : maintenanceCardUpdate.getPaymentHistories()) {
            temp += paymentHistory.getMoney().longValue();
        }
        if (temp < total) {
            maintenanceCard.setPayStatus((byte) 0);
        } else {
            maintenanceCard.setPayStatus((byte) 1);
        }
        System.out.println("returned MaintenanceCard: " + maintenanceCardDTO.isReturned());
        maintenanceCard.setCoordinator(maintenanceCardUpdate.getCoordinator());
        maintenanceCard.setCustomer(maintenanceCardUpdate.getCustomer());
        maintenanceCard.setPaymentHistories(maintenanceCardUpdate.getPaymentHistories());

        maintenanceCard.setPlatesNumber(maintenanceCardUpdate.getPlatesNumber().toLowerCase());


        if (totalTimeMaintenanceCard > 0) {
            float timeLeftOfEmp = timeEmp - ((startTime.getHours()) - 7);


            if (timeLeftOfEmp < 0) {
                timeLeftOfEmp = 0;
            }
            System.out.println("timeLeftOfEmp" + startTime.getHours());
            if (totalTimeMaintenanceCard <= 11) {
                System.out.println("totalTimeMaintenanceCard <= 11");
                String s = totalTimeMaintenanceCard + "";
                int hourFirst = Integer.parseInt(s.substring(0, s.indexOf(".")));
                int minuteFirst = Integer.parseInt(s.substring((s.indexOf(".") + 1)));
                int hoursTotalTime = Integer.parseInt(s.substring(0, s.indexOf(".")));
                int minuteTotalTime = Integer.parseInt(s.substring((s.indexOf(".") + 1), s.length()));
                if (minuteTotalTime < 10) {
                    minuteTotalTime = minuteTotalTime * 10;
                }
                int sumTime = startTime.getHours() + (hoursTotalTime);

                if (sumTime >= 7 && sumTime <= 18) {
                    System.out.println("minuteTotalTime: " + minuteTotalTime);
                    System.out.println("sumTime: " + sumTime);
                    System.out.println("case1");
                    if (sumTime >= 12 && startTime.getHours() <12) {
                        hoursTotalTime += 1;
                    }
                    int minuteLeft =  (60 - startTime.getMinutes());
                    System.out.println("minuteLeft"+ minuteLeft);
                    if (minuteTotalTime >= minuteLeft) {
                        hoursTotalTime += 1;
                        System.out.println(60 - startTime.getMinutes());
                        minuteTotalTime = minuteTotalTime - (60 - startTime.getMinutes());
                        System.out.println("1." + hoursTotalTime);
                        System.out.println("2." + minuteTotalTime);
                    }
                    int hourReturn = startTime.getHours() + (hoursTotalTime);
                    int minuteReturn = startTime.getMinutes() + minuteTotalTime;
                    System.out.println("hourReturn: "+hourReturn);
                    System.out.println("minuteReturn: "+minuteReturn);
                    if(hourReturn > 18){
                        int left1 = 19 - startTime.getHours();
                        if(left1 >=0){
                            returnDate.setDate(startTime.getDate()+1);
                            returnDate.setMinutes(minuteTotalTime);
                            returnDate.setHours(7+(hoursTotalTime-left1));

                        }else{
                            returnDate.setDate(startTime.getDate()+1);
                            returnDate.setMinutes(minuteFirst);
                            returnDate.setHours(7+(hourFirst));
                        }
                    }else{

                        if((startTime.getHours()+hourFirst) <= 18 && (startTime.getMinutes()+minuteFirst) <= 60){
                            System.out.println("TH1");
                            returnDate.setDate(startTime.getDate());
                            returnDate.setMinutes(startTime.getMinutes()+minuteFirst);
                            returnDate.setHours(startTime.getHours() + (hourFirst));
                        }else if((startTime.getHours()+hourFirst) <= 18 && (startTime.getMinutes()+minuteFirst) >= 60){
                            System.out.println("TH2");

                            if(startTime.getHours()+hourFirst == 18 && startTime.getMinutes()+minuteFirst >=60){
                                returnDate.setDate(startTime.getDate()+1);
                                returnDate.setHours(7+(18-(startTime.getHours()+hourFirst)));
                                returnDate.setMinutes(minuteFirst);
                            }
                        } else {
                            System.out.println("TH3");
                            returnDate.setDate(startTime.getDate()+1);
                            returnDate.setHours(7+(18-(startTime.getHours()+hourFirst)));
                            returnDate.setMinutes(minuteFirst);
                        }
                        System.out.println("returnDate.getHours(): "+returnDate.getHours());
                        System.out.println("returnDate.getMinutes(): "+returnDate.getMinutes());
                    }

                } else {
                    //day la truong hop tao phieu luc 18h tro di
                    System.out.println("case2");

                    if (startTime.getHours() - 18 == 0 && (startTime.getMinutes() + minuteTotalTime) > 58) {
                        //tru di so phut hien tai dang sua va chuyen time sang ngay moi
                        System.out.println("18h");
                        returnDate.setDate(startTime.getDate() + 1);
                        returnDate.setHours(7 + (startTime.getHours() - 18) + hoursTotalTime);
                        returnDate.setMinutes(((startTime.getMinutes() + minuteTotalTime) - 60));
                    } else {

                        int hourLeft = 18 - startTime.getHours();
                        int minuteLeft = 60 - startTime.getMinutes();
                        if (hourLeft >= 0) {
                            returnDate.setDate(startTime.getDate() + 1);
                            returnDate.setHours(7 + (hoursTotalTime - hourLeft));
                            if (startTime.getMinutes() + minuteTotalTime < 58) {
                                if (minuteLeft > 0) {
                                    returnDate.setMinutes(minuteTotalTime - minuteLeft);
                                } else {
                                    returnDate.setMinutes(0);
                                }
                            } else {
                                returnDate.setHours(returnDate.getHours() + 1);
                                returnDate.setMinutes((startTime.getMinutes() + minuteTotalTime) - 60);
                            }
                        } else {
                            int sumOfTime = openStore + hour;
                            if (sumOfTime >= 12) {
                                sumOfTime += 1;
                            }
                            returnDate.setHours(sumOfTime);
                            returnDate.setMinutes(0 + (int) minute);
                        }
                    }
                }
                System.out.println("-----------1--------------");
                System.out.println("hoursTotalTime" + hoursTotalTime);
                System.out.println("minuteTotalTime" + minuteTotalTime);
                System.out.println("returnDate" + returnDate);
            } else if (totalTimeMaintenanceCard > timeLeftOfEmp && totalTimeMaintenanceCard >= timeEmp) {
                System.out.println("totalTimeMaintenanceCard > 11");
                float[] totalTime = totalTimeService(totalTimeMaintenanceCard, timeEmp, timeLeftOfEmp);
                System.out.println("total Time" + Arrays.toString(totalTime));
                returnDate.setDate(returnDate.getDate() + ((int) totalTime[0]));
                String c = String.valueOf(totalTime[1]);
                int hoursTotalTime = Integer.parseInt(c.substring(0, c.indexOf(".")));
                int minuteTotalTime = Integer.parseInt(c.substring((c.indexOf(".") + 1), c.length()));
                if (minuteTotalTime < 10) {
                    minuteTotalTime = minuteTotalTime * 10;
                }
                if (7 + hoursTotalTime >= 12) {
                    hoursTotalTime += 1;
                }
                returnDate.setHours(7 + hoursTotalTime);
                returnDate.setMinutes(0 + minuteTotalTime);
                System.out.println("-----------2--------------");

                System.out.println("hoursTotalTime" + hoursTotalTime);
                System.out.println("minuteTotalTime" + minuteTotalTime);
                System.out.println("returnDate " + returnDate);
                System.out.println("returnDate " + returnDate.getDay() + "/" + returnDate.getMonth());
            }
            maintenanceCard.setReturnDate(returnDate);
        } else {
            maintenanceCard.setReturnDate(null);
        }
        try {
            int isFinished = checkStatusMaintenanceCard(statusOfMaintenanceCard);
            System.out.println("index: " + isFinished);
            if (isFinished == -1) {
                maintenanceCard.setWorkStatus(CONSTRAINTS.FINISH_WORKING);
                maintenanceCard.setReturnDate(now);
            } else {
                maintenanceCard.setWorkStatus(CONSTRAINTS.WORKING);
            }
            originalTime = Math.round(originalTime * 100);
            maintenanceCard.setOriginalTime(originalTime / 100);
            maintenanceCard.setTotalTime(totalTimeMaintenanceCard);
            maintenanceCard.setPlatesNumber(maintenanceCardDTO.getPlatesNumber());
            maintenanceCard.setTimeLeft(totalTimeMaintenanceCard);
            MaintenanceCard maintenanceCard1 = maintenanceCardRepository.saveAndFlush(maintenanceCard);
            MessageModel messageModel = new MessageModel();
            if (maintenanceCard1.getWorkStatus() == 2 && maintenanceCard1.getPayStatus() == 0) {
                messageModel.setType(2);
                messageModel.setMessage(maintenanceCard.getId().toString());
                for (User user : userRepository.getAllManager()) {
                    simpMessagingTemplate.convertAndSend("/topic/messages/" + user.getId(), messageModel);
                }
            } else {
                messageModel.setType(3);
                messageModel.setMessage(maintenanceCard.getId().toString());
                messageModel.setCode(maintenanceCard.getCode().toString());
                for (User user : userRepository.getAllManager()) {
                    simpMessagingTemplate.convertAndSend("/topic/messages/" + user.getId(), messageModel);
                }
            }
            messageModel.setType(3);
            messageModel.setMessage(maintenanceCard.getId().toString());
            messageModel.setCode(maintenanceCard.getCode().toString());
            if (maintenanceCard1.getRepairman() != null) {
                simpMessagingTemplate.convertAndSend("/topic/messages/" + maintenanceCard1.getRepairman().getId(), messageModel);
            }
            if (maintenanceCard1.getCoordinator() != null) {
                simpMessagingTemplate.convertAndSend("/topic/messages/" + maintenanceCard1.getCoordinator().getId(), messageModel);
            }

            return maintenanceCardConverter.convertAllToDTO(maintenanceCard1);
        } catch (Exception e) {
            e.printStackTrace();
            throw new UnknownException();
        }
    }

    @Transactional
    @Override
    public MaintenanceCardDTO updateAllStatusMaintenanceCard(Long id, String email, int role) throws NotFoundException, NotFoundRepairmanException {
        System.out.println("alo");
        Date now = new Date();

        MaintenanceCard maintenanceCard = maintenanceCardRepository.getOne(id);
        if (maintenanceCard == null) {
            throw new NotFoundException("Not found maintenance card");
        }

        if (maintenanceCard.getRepairman() != null) {

            byte workStatus = 2;
            maintenanceCard.setWorkStatus(workStatus);

            for (MaintenanceCardDetail maintenanceCardDetail : maintenanceCard.getMaintenanceCardDetails()) {
                System.out.println("status: " + maintenanceCardDetail.getStatus());

                if (maintenanceCardDetail.getService() != null) {
                    System.out.println("alo1");
                    if (maintenanceCardDetail.getStatus() != 2) {
                        maintenanceCardDetail.setStatus(workStatus);
                        MaintenanceCardDetailStatusHistory maintenanceCardDetailStatusHistory = new MaintenanceCardDetailStatusHistory();
                        maintenanceCardDetailStatusHistory.setCreatedDate(now);
                        maintenanceCardDetailStatusHistory.setModifiedDate(now);
                        maintenanceCardDetailStatusHistory.setMaintenanceCardDetail(maintenanceCardDetail);
                        maintenanceCardDetailStatusHistory.setStatus((byte) (maintenanceCardDetail.getStatus()));
                        maintenanceCardDetail.getMaintenanceCardDetailStatusHistories().add(maintenanceCardDetailStatusHistory);
                    }
                }


            }
            maintenanceCard.setTotalTime(0F);

            maintenanceCard.setReturnDate(now);
            System.out.println("returned Date: " + maintenanceCard.getReturnDate());
            MaintenanceCard maintenanceCard1 = maintenanceCardRepository.save(maintenanceCard);
            MessageModel messageModel = new MessageModel();
            if (maintenanceCard1.getWorkStatus() == 2 && maintenanceCard1.getPayStatus() == 0) {
                messageModel.setType(2);
                messageModel.setMessage(maintenanceCard.getId().toString());
                for (User user : userRepository.getAllManager()) {
                    simpMessagingTemplate.convertAndSend("/topic/messages/" + user.getId(), messageModel);
                }
            } else {
                messageModel.setType(3);
                messageModel.setMessage(maintenanceCard.getId().toString());
                messageModel.setCode(maintenanceCard.getCode().toString());
                for (User user : userRepository.getAllManager()) {
                    simpMessagingTemplate.convertAndSend("/topic/messages/" + user.getId(), messageModel);
                }
            }
            messageModel.setType(3);
            messageModel.setMessage(maintenanceCard.getId().toString());
            messageModel.setCode(maintenanceCard.getCode().toString());
//            if(maintenanceCard1.getRepairman() != null){
//                simpMessagingTemplate.convertAndSend("/topic/messages/" + maintenanceCard1.getRepairman().getId(), messageModel);
//            }
            if (maintenanceCard1.getCoordinator() != null) {
                simpMessagingTemplate.convertAndSend("/topic/messages/" + maintenanceCard1.getCoordinator().getId(), messageModel);
            }
            return maintenanceCardConverter.convertAllToDTO(maintenanceCard1);
        } else {
            return maintenanceCardConverter.convertAllToDTO(maintenanceCard);
        }
    }

    @Override
    public boolean deleteMaintenanceCard(Long id) throws NotFoundException, NotFoundRepairmanException, NotEnoughProductException {
        MaintenanceCard maintenanceCard = maintenanceCardRepository.findById(id).orElse(null);
        if (maintenanceCard == null) {
            throw new NotFoundException("Not found maintenance card");
        }else {
            maintenanceCard.getMaintenanceCardDetails().forEach(maintenanceCardDetail -> {

                if (maintenanceCardDetail.getProduct() != null) {
                    Long idProduct = maintenanceCardDetail.getProduct().getId();
                    Product product = productRepository.getOne(idProduct);
                    if (product != null && maintenanceCardDetail.getQuantity() > 0) {
                        ProductStore productStore = productStoreRepository.getByStoreIdAndProductsId(maintenanceCard.getStore().getId(), idProduct);
                        product.setQuantity(maintenanceCardDetail.getQuantity() + product.getQuantity());
                        productStore.setQuantity(productStore.getQuantity() + maintenanceCardDetail.getQuantity());
                        productStoreRepository.save(productStore);
                    }

                }
                if (maintenanceCardDetail.getService() != null) {
                    Long serviceId = maintenanceCardDetail.getService().getId();
                    com.poly.datn.entity.Service service = serviceRepository.getOne(serviceId);
                    if (service != null) {
                        maintenanceCardDetailStatusHistoryRepository.deleteByMaintenanceCardDetailId(maintenanceCardDetail.getId());
                    }
                }

            });
            maintenanceCardRepository.deleteByMaintenanceCardId(id);
            System.out.println("Delete Success");
            return true;
        }
    }

    @Override
    public Map<String, Object> getMaintenanceCardByRepairMan(int PageNum, int PageSize, String sortBy, boolean descending, Long userId, String code, byte[] payStatus, byte[] workStatus) {
        Page<MaintenanceCard> page = null;
        System.out.println("workStatus :" + Arrays.toString(workStatus));
        System.out.println("payStatus: " + Arrays.toString(payStatus));
        Pageable pageable = null;
        if (descending) {
            pageable = PageRequest.of(PageNum - 1, PageSize, Sort.by(sortBy.length() == 0 ? "id" : sortBy).descending());
        } else {
            pageable = PageRequest.of(PageNum - 1, PageSize, Sort.by(sortBy.length() == 0 ? "id" : sortBy).ascending());
        }
        if ((payStatus != null && payStatus.length > 0) || (workStatus != null && workStatus.length > 0)) {
            System.out.println("filter");
            page = maintenanceCardRepository.filterByWsandPs(pageable, userId, workStatus, payStatus);
        } else {
            System.out.println("Not filter");
            page = maintenanceCardRepository.getMaintenanceCardByRepairMan(pageable, userId, code);
        }
        List<MaintenanceCardDTO> maintenanceCardDTO = new ArrayList<>();
        Map<String, Object> map = new HashMap<>();
        page.toList().forEach(maintenanceCard -> {
            maintenanceCardDTO.add(maintenanceCardConverter.convertToDTO(maintenanceCard));
        });
        map.put("maintenanceCard", maintenanceCardDTO);
        map.put("totalPage", page.getTotalPages());
        map.put("totalElement", page.getTotalElements());
        map.put("currentPage", PageNum);
        return map;

    }

    @Override
    public List<String> getPlatesNumberByCustomerId(Long id) {
        List<String> listPlates = maintenanceCardRepository.getPlatesNumberByCustomerId(id);
        return listPlates;
    }

    @Override
    public Map<String, Object> getTotalTimeAndSumMaintenanceCard(int page, int size) {
        List<Map<String, Object>> maps = userRepositoryCustom.getTotalTimeAndCountMaintenanceCard(page, size);
        Map<String, Object> map = new HashMap<>();
        List<Map<String, Object>> mapList = new ArrayList<>();
        maps.forEach(stringObjectMap -> {
            User user = userRepository.getOne((Long) stringObjectMap.get("repairman_id"));
            map.put("repairMan", userConverter.convertToDTO(user));
            map.put("sumMaintenanceCard", stringObjectMap.get("sumMaintenanceCard"));
            map.put("totalTime", stringObjectMap.get("totalTime"));
            mapList.add(map);
        });
        Map<String, Object> map1 = new HashMap<>();
        map1.put("repairs", mapList);
        map1.put("currentPage", page);
        return map1;
    }

    @Override
    public MaintenanceCardDTO getMinTimeLeftMaintenanceCard(Long repairManId) {
        MaintenanceCard m = maintenanceCardRepository.getMinTimeLeftMaintenanceCard(repairManId);
        if(m != null){
            return maintenanceCardConverter.convertToDTO(m);
        }
        return null;
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
    public Map<String, Object> getMaintenanceCardByIdCustomer(MaintenanceCardCustomer maintenanceCardCustomer) {

        int page = maintenanceCardCustomer.getPage();
        int size = maintenanceCardCustomer.getSize();
        String search = maintenanceCardCustomer.getSearch();
        Long id = maintenanceCardCustomer.getId();
        String nameField = maintenanceCardCustomer.getNameField();
        String order = maintenanceCardCustomer.getOrder();
        byte[] payStatus = maintenanceCardCustomer.getPayStatus();
        byte[] workStatus = maintenanceCardCustomer.getWorkStatus();
        Pageable paging = PageRequest.of(page - 1, size, Sort.by("modifiedDate").descending());

        if (!nameField.equals("")) {
            paging = PageRequest.of(page - 1, size, Sort.by(nameField));
            if (order.equals("descend")) {
                paging = PageRequest.of(page - 1, size, Sort.by(nameField).descending());
            }
        }

        Page<MaintenanceCard> maintenanceCardPage = maintenanceCardRepository.getMaintenanceCardByIdCustomer(paging, id, search, payStatus, workStatus);

        List<MaintenanceCardDTO> maintenanceCardDTOS = new ArrayList<>();
        HashMap<String, Object> map = new HashMap<>();
        List<MaintenanceCard> maintenanceCards = maintenanceCardPage.getContent();

        for (MaintenanceCard maintenanceCard : maintenanceCards) {
            maintenanceCardDTOS.add(maintenanceCardConverter.convertToDTO(maintenanceCard));
        }

        map.put("customers", maintenanceCardDTOS);
        map.put("currentPage", maintenanceCardPage.getNumber() + 1);
        map.put("totalItems", maintenanceCardPage.getTotalElements());
        map.put("totalPages", maintenanceCardPage.getTotalPages());
        return map;
    }

    public int checkStatusMaintenanceCard(List<Byte> maintenanceCard) {
        System.out.println("statusList: " + maintenanceCard.toString());
        int index = -1;
        for (Byte status : maintenanceCard) {
            if (status != 2) {
                index = 0;
            }
        }
        return index;
    }

    public static float[] totalTimeService(float timeService, float timeEmp, float timeLeftEmp) {
        float[] result = new float[2];
        System.out.println("param [" + timeService + "," + timeEmp + "," + timeLeftEmp + "]");
        int i = 1;
        do {
            if (timeLeftEmp > 0) {
                timeService = timeService - timeLeftEmp;
                timeLeftEmp = 0;
            } else {
                timeService = timeService - timeEmp;
                i++;
            }
            System.out.println("timeService" + timeService);
        } while (timeService >= 0 && timeService >= timeEmp);
        result[0] = i;
        String b = String.valueOf(timeService);
        if (b.length() == 3) {
            b = b.substring(0, 3);
        } else if (b.length() > 3) {
            b = b.substring(0, 4);
            System.out.println("b: " + b);
        }
        result[1] = Float.parseFloat(b);
        System.out.println("Days: " + result[0]);
        return result;
    }

    public Float convertToFloatTotalTime(String timeService) {
        int hour = Integer.parseInt(timeService.substring(0, timeService.indexOf("-")));
        int minute = Integer.parseInt(timeService.substring(timeService.indexOf("-") + 1, timeService.length()));
        String result = hour + "." + minute;
        System.out.println("Time: " + result);
        return Float.parseFloat(result);
    }

    public Long[] findIdMaintenanceDetailfromDB(List<MaintenanceCardDetail> list) {
        Long id[] = new Long[list.size()];
        int dem = 0;
        for (MaintenanceCardDetail maintenanceCardDetail : list) {
            id[dem] = maintenanceCardDetail.getId();
            dem++;
        }
        return id;
    }
}
