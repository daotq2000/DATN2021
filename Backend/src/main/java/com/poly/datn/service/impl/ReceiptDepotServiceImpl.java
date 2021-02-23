package com.poly.datn.service.impl;

import com.poly.datn.contraint.CONSTRAINTS;
import com.poly.datn.converter.DepotConverter;
import com.poly.datn.converter.ReceiptDepotConverter;
import com.poly.datn.converter.UserConverter;
import com.poly.datn.dto.CouponDTO;
import com.poly.datn.dto.ReceiptDepotDTO;
import com.poly.datn.entity.DepotProduct;
import com.poly.datn.entity.ReceiptDepot;
import com.poly.datn.entity.ReceiptDepotDetail;
import com.poly.datn.exception.CodeExistedException;
import com.poly.datn.repository.DepotProductRepository;
import com.poly.datn.repository.ProductRepository;
import com.poly.datn.repository.ReceiptDepotDetailRepository;
import com.poly.datn.repository.ReceiptDepotRepository;
import com.poly.datn.service.ReceiptDepotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.util.*;
import java.util.logging.Logger;

@Service
@Transactional
public class ReceiptDepotServiceImpl implements ReceiptDepotService {
    @Autowired private ReceiptDepotRepository receiptDepotRepository;
    @Autowired private ReceiptDepotConverter receiptDepotConverter;
    @Autowired private ReceiptDepotDetailRepository receiptDepotDetailRepository;
    @Autowired private ProductRepository productRepository;
    @Autowired private UserConverter userConverter;
    @Autowired private DepotConverter depotConverter;
    @Autowired private DepotProductRepository depotProductRepository;
    private final Logger logger = Logger.getLogger(ReceiptDepotServiceImpl.class.getName());

    @Autowired
    public ReceiptDepotServiceImpl(ReceiptDepotRepository receiptDepotRepository) {
        this.receiptDepotRepository = receiptDepotRepository;
    }

    @Override
    public Map<String, Object> getListReceiptDepot(int page, int size, String sortBy, String descending) {
        Pageable pageable = null;
        if(sortBy.length() ==0){
            pageable= PageRequest.of(page-1,size, Sort.by("id"));
        }
        if(descending.equals("asc")){
            pageable= PageRequest.of(page-1,size, Sort.by(sortBy).ascending());
        }
        if(descending.equals("desc")){
            pageable= PageRequest.of(page-1,size, Sort.by(sortBy).descending());
        }
        Page<ReceiptDepot> receiptDepots = receiptDepotRepository.findAll(pageable);
        List<ReceiptDepotDTO> list = new ArrayList<>();
        receiptDepots.toList().forEach(receiptDepot -> list.add(receiptDepotConverter.convertToDTO(receiptDepot)));
        Map<String,Object> map = new HashMap<>();
        map.put("receiptDepots",list);
        map.put("totalPages",receiptDepots.getTotalPages());
        map.put("totalElements",receiptDepots.getTotalElements());
        map.put("currentPage",page);
        return map;
    }

    @Override
    public ReceiptDepotDTO getReceiptDepotById(Long id) {
        return receiptDepotConverter.convertToDTO(receiptDepotRepository.getOne(id));
    }

    @Override
    public ReceiptDepotDTO insertReceiptDepot(ReceiptDepotDTO receiptDepotDTO) throws CodeExistedException {
        Long total = 0L;
        try {
            ReceiptDepot receiptDepot = receiptDepotConverter.convertToEntity(receiptDepotDTO);
            List<ReceiptDepotDetail> receiptDepotDetails = receiptDepot.getReceiptDepotDetails();
            for (ReceiptDepotDetail receiptDepotDetail : receiptDepotDetails) {
                DepotProduct depotProduct = depotProductRepository.getByProductIdAndDepotId(receiptDepotDetail.getProducts().getId(),receiptDepot.getDepot().getId());
                if(depotProduct != null){
                    total += depotProduct.getProduct().getPricePerUnit().longValue()* receiptDepotDetail.getQuantity();
                    //calculator total
                    ReceiptDepotDetail receiptDepotDetail1 = new ReceiptDepotDetail();
                    receiptDepotDetail1.setModifiedDate(new Date());
                    receiptDepotDetail1.setCreatedDate(new Date());
                    receiptDepotDetail1.setReceiptDepot(receiptDepot);
                    receiptDepotDetail1.setQuantity(receiptDepotDetail.getQuantity());
                    receiptDepotDetail1.setProducts(receiptDepotDetail.getProducts());
                    receiptDepotDetailRepository.saveAndFlush(receiptDepotDetail1);
                    //update quantity depotProduct
                    depotProduct.setQuantity(receiptDepotDetail.getQuantity()+depotProduct.getProduct().getQuantity());
                    depotProductRepository.saveAndFlush(depotProduct);
                }

            }

            receiptDepot.setStatus(CONSTRAINTS.LIVE);
            receiptDepot.setModifiedDate(new Date());
            receiptDepot.setCreatedDate(new Date());
            receiptDepot.setAmount(BigDecimal.valueOf(total));
            receiptDepotRepository.save(receiptDepot);
            return receiptDepotConverter.convertToDTO(receiptDepot);
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public ReceiptDepotDTO updateReceiptDepot(ReceiptDepotDTO receiptDepotDTO, Long id) {
        ReceiptDepot receiptDepot = receiptDepotRepository.getOne(id);
        receiptDepot.setId(receiptDepot.getId());
        receiptDepot.setAmount(receiptDepotDTO.getAmount());
        receiptDepot.setCode(receiptDepotDTO.getCode());
        receiptDepot.setStatus(receiptDepotDTO.getStatus());
        receiptDepot.setCreatedDate(receiptDepotDTO.getCreatedDate());
        receiptDepot.setModifiedDate(new Date());
        receiptDepot.setDepot(depotConverter.convertToEntity(receiptDepotDTO.getDepot()));
        receiptDepot.setUsers(userConverter.convertToEntity(receiptDepotDTO.getUsers()));

        try {
            receiptDepotRepository.save(receiptDepot);
            return receiptDepotConverter.convertToDTO(receiptDepot);
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }


    @Override
    public boolean deleteReceiptDepot(List<Long> listID) {
        int count = 0;
        for (Long id:listID
             ) {
            count++;
            ReceiptDepot receiptDepot = receiptDepotRepository.getOne(id);
            receiptDepot.setStatus((byte)0);
            receiptDepotRepository.save(receiptDepot);
        }
        return count == listID.size();
    }
}
