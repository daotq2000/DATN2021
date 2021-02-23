package com.poly.datn.repository;

import com.poly.datn.entity.Manufacturer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ManufactureRepository extends JpaRepository<Manufacturer,Long> {
    @Query("select m from  Manufacturer  m where  m.status = 1 and (m.name like %:s% or m.code like %:s% or m.description like %:s%)")
    public Page<Manufacturer> getAll(Pageable pageable, String s);
    @Query(value = "SELECT CONVERT(SUBSTRING(code, 4), UNSIGNED INTEGER ) AS newcode FROM manufacturers WHERE code LIKE '%HX%' ORDER BY newcode DESC LIMIT 1 offset :index",nativeQuery = true)
    public String getMaxCode(@Param("index") int index);
    boolean existsByName(String s);
}
