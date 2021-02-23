package com.poly.datn.repository;

import com.poly.datn.entity.Coupon;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


@Repository
public interface CouponRepository extends JpaRepository<Coupon,Long> {
    @Query("SELECT c from Coupon c where c.status =1 and (c.code like %:keyWord% or c.description like %:keyWord% " +
            "or c.name like %:keyWord% or c.name like %:keyWord% )")
    public Page<Coupon> getAll(Pageable pageable, String keyWord);
}
