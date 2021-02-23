package com.poly.datn.service.impl;

import com.poly.datn.converter.CouponConverter;
import com.poly.datn.dto.CouponDTO;
import com.poly.datn.entity.Coupon;
import com.poly.datn.entity.Product;
import com.poly.datn.exception.CodeExistedException;
import com.poly.datn.repository.CouponRepository;
import com.poly.datn.repository.ProductRepository;
import com.poly.datn.service.CouponService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;
@Service
@Transactional
public class CouponServiceImpl implements CouponService {
   @Autowired private CouponRepository couponRepository;
    @Autowired private CouponConverter couponConverter;
    @Autowired private ProductRepository productRepository;

    @Override
    public Map<String, Object> getListCoupon(int page, int size, String sortBy, String descending, String search) {
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
        Page<Coupon> page1 = couponRepository.getAll(pageable,search);
        List<CouponDTO> couponDTOS = new ArrayList<>();
        page1.toList().forEach(coupon -> couponDTOS.add(couponConverter.convertToDTO(coupon)));
        Map<String,Object> map = new HashMap<>();
        map.put("coupons",couponDTOS);
        map.put("totalElements",page1.getTotalElements());
        map.put("totalPages",page1.getTotalPages());
        map.put("currentPage",page);



        return map;
    }

    @Override
    public CouponDTO getCouponById(Long id) {
        return couponConverter.convertToDTO(couponRepository.getOne(id));
    }

    @Override
    public CouponDTO insertCoupon(CouponDTO couponDTO) throws CodeExistedException {
        Coupon coupon = couponConverter.convertToEntity(couponDTO);
        coupon.setCreatedDate(new Date());
        coupon.setModifiedDate(new Date());
        try {
            Coupon coupon1 =couponRepository.save(coupon);
            coupon1.setCode("VC"+coupon1.getId());
            couponRepository.saveAndFlush(coupon1);
            return couponConverter.convertToDTO(coupon);
        }catch (Exception e){
            e.printStackTrace();
            throw new CodeExistedException("Code Exist");

        }

    }

    @Override
    public CouponDTO updateCoupon(CouponDTO couponDTO, Long id) {
        Coupon coupon = couponRepository.getOne(id);
        coupon.setId(id);
        coupon.setCode(couponDTO.getCode());
        coupon.setDescription(couponDTO.getDescription());
        coupon.setDiscount(couponDTO.getDiscount());
        coupon.setName(couponDTO.getName());
        coupon.setExpiredDate(couponDTO.getExpiredDate());
        coupon.setModifiedDate(new Date());
        coupon.setQuantity(couponDTO.getQuantity());
        coupon.setStatus(couponDTO.getStatus());
        try {
            couponRepository.save(coupon);
        }catch (Exception exception){
            exception.printStackTrace();
        }
        return couponConverter.convertToDTO(coupon);
    }

    @Override
    public boolean deleteCoupon(List<Long> listID) {
        int rs = 0;
        for (Long id : listID) {
            rs++;
            Coupon coupon = couponRepository.getOne(id);
            coupon.setStatus((byte) 0);
            couponRepository.save(coupon);
        }
        return rs==listID.size();
    }
}
