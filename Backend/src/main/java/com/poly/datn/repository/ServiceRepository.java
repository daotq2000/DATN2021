package com.poly.datn.repository;

import com.poly.datn.entity.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceRepository extends JpaRepository<Service,Long> {
    @Query("select s from Service s where s.status =1 and (s.code like %:keyWord% " +
            " or s.name like %:keyWord% or s.description like %:keyWord%  )")
    public Page<Service> getAllService(Pageable pageable, String keyWord);
    @Modifying
    @Query(value = "UPDATE Service s set s.status = 0 where s.id=:id")
    public int deleteDepotById(@Param("id") Long id);
    @Query(value = "SELECT CONVERT(SUBSTRING(code, 4), UNSIGNED INTEGER ) AS newcode FROM depots WHERE code LIKE '%DV%' ORDER BY newcode DESC LIMIT 1 offset =:index",nativeQuery = true)
    public String getMaxCode(@Param("index") int index);

}
