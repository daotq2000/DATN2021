package com.poly.datn.repository;

import com.poly.datn.entity.ReceiptDepot;
import com.poly.datn.entity.Request;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public interface RequestRepository extends JpaRepository<Request,Long> {
    @Query(value = "select r from Request r where r.status in :status and (r.name like  %:keyWord% or r.code like  %:keyWord% or r.desciption like  %:keyWord% ) ")
    public Page<Request> getAllRequest(Pageable pageable,byte[] status, String keyWord);

}
