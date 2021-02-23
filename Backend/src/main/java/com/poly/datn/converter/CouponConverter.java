package com.poly.datn.converter;

import com.poly.datn.dto.CouponDTO;
import com.poly.datn.entity.Coupon;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CouponConverter {

    private final ModelMapper modelMapper = new ModelMapper();
    public CouponDTO convertToDTO(Coupon coupon ){
        CouponDTO couponDTO = new CouponDTO();
        couponDTO.setId(coupon.getId());
        couponDTO.setName(coupon.getName());
        couponDTO.setCode(coupon.getCode());
        couponDTO.setDescription(coupon.getDescription());
        couponDTO.setDiscount(coupon.getDiscount());
        couponDTO.setQuantity(coupon.getQuantity());
        couponDTO.setStatus(coupon.getStatus());
        couponDTO.setExpiredDate(coupon.getExpiredDate());
        couponDTO.setCreatedDate(coupon.getCreatedDate());
        couponDTO.setModifiedDate(coupon.getModifiedDate());
        return couponDTO;
    }
    public Coupon convertToEntity(CouponDTO couponDTO ){
        return modelMapper.map(couponDTO,Coupon.class);
    }

}
