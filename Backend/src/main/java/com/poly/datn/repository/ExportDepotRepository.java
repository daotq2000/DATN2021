package com.poly.datn.repository;

import com.poly.datn.entity.ExportDepot;
import com.poly.datn.entity.Store;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ExportDepotRepository extends JpaRepository<ExportDepot,Long> {
    @Query(value = "select e from ExportDepot e where e.isDelete =false and (e.code like %:keyWord% )")
    public Page<ExportDepot> getAllListExportDepot(Pageable pageable,String keyWord);
    @Query(value = "SELECT max(id) from ExportDepot")
    public int getMaxId();
}
