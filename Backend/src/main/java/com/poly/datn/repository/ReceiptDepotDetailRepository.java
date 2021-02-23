package com.poly.datn.repository;

import com.poly.datn.entity.ReceiptDepot;
import com.poly.datn.entity.ReceiptDepotDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReceiptDepotDetailRepository extends JpaRepository<ReceiptDepotDetail,Long> {
}
