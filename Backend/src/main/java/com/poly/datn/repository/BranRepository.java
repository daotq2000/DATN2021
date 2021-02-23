package com.poly.datn.repository;

import com.poly.datn.entity.Brand;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BranRepository extends JpaRepository<Brand,Long> {
    @Query("select b from  Brand  b where  b.status = 1 and (b.name like %:s% or b.code like %:s% or b.description like %:s%)")
    public Page<Brand> getAllByBrand(Pageable pageable,String s);
    @Query(value = "SELECT CONVERT(SUBSTRING(code, 4), UNSIGNED INTEGER ) AS newcode FROM brands WHERE code LIKE '%NH%' ORDER BY newcode DESC LIMIT 1 offset :index",nativeQuery = true)
    public String getMaxCodeBrand(@Param("index") int index);
    boolean existsByName(String s);
}
