package com.poly.datn.repository;

import com.poly.datn.entity.Request;
import com.poly.datn.entity.Store;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface StoreRepository extends JpaRepository<Store,Long> {
    @Query(value = "select s from Store s where s.status = 1 and (s.name like %:keyWord% " +
            "or s.code like %:keyWord% or s.description like %:keyWord% or s.address like %:keyWord% " +
            "or s.phone like %:keyWord% )")
    public Page<Store> getAllStore(Pageable pageable,String keyWord);
}
