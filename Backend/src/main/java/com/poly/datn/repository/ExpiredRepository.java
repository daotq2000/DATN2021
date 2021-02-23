package com.poly.datn.repository;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

//@Repository
//public interface ExpiredRepository extends JpaRepository<Expired,Long> {
//    @Query(value = "SELECT e from Expired e where e.status =1 and e.type =:type")
//    public Page<Expired> getAllByTypeAndStatus(Pageable pageable,@Param("type") byte type);
//}
