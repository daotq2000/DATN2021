package com.poly.datn.service;

import com.poly.datn.dto.CouponDTO;
import com.poly.datn.entity.Coupon;
import com.poly.datn.exception.CodeExistedException;

import java.util.List;
import java.util.Map;

public interface CouponService {
    public Map<String,Object> getListCoupon(int page, int size, String sortBy, String descending, String search);
    public CouponDTO getCouponById(Long id);
    public CouponDTO insertCoupon(CouponDTO couponDTO) throws CodeExistedException;
    public CouponDTO updateCoupon(CouponDTO couponDTO,Long id);
    public boolean deleteCoupon(List<Long> listID);

}
