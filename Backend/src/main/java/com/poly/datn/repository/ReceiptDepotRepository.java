package com.poly.datn.repository;

import com.poly.datn.entity.ReceiptDepot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReceiptDepotRepository extends JpaRepository<ReceiptDepot,Long> {

}
