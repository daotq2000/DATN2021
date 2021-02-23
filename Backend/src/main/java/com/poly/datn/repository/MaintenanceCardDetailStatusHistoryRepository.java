package com.poly.datn.repository;

import com.poly.datn.entity.MaintenanceCardDetailStatusHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository

public interface MaintenanceCardDetailStatusHistoryRepository extends JpaRepository<MaintenanceCardDetailStatusHistory,Long> {
    @Modifying
    public void deleteByMaintenanceCardDetailId(Long maintenanceCardDetailId);
}
