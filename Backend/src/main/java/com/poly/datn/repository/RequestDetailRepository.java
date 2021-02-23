package com.poly.datn.repository;

import com.poly.datn.entity.Request;
import com.poly.datn.entity.RequestDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RequestDetailRepository extends JpaRepository<RequestDetail,Long> {
}
