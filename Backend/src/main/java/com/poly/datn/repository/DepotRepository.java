package com.poly.datn.repository;

import com.poly.datn.entity.Depot;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface DepotRepository extends JpaRepository<Depot,Long> {
    @Query(value = "select d from Depot d where d.status =1 and (d.name like %:keyWord% or d.address like %:keyWord% or d.code like %:keyWord%)")
    public Page<Depot> getListDepot(Pageable pageable,String keyWord);
    @Modifying
    @Query(value = "UPDATE Depot d set d.status = 0 where d.id=:id")
    public int deleteDepotById(@Param("id") Long id);
    @Query(value = "SELECT CONVERT(SUBSTRING(code, 4), UNSIGNED INTEGER ) AS newcode FROM depots WHERE code LIKE '%KHO%' ORDER BY newcode DESC LIMIT 1 offset :index",nativeQuery = true)
    public String getMaxCode(int index);
}
