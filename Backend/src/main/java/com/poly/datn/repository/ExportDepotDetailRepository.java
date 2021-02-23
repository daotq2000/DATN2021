package com.poly.datn.repository;

import com.poly.datn.entity.ExportDepotDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExportDepotDetailRepository extends JpaRepository<ExportDepotDetail,Long> {
}
