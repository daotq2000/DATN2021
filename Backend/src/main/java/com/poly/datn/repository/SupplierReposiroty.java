package com.poly.datn.repository;

import com.poly.datn.entity.Supplier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SupplierReposiroty extends JpaRepository<Supplier,Long> {
    @Query(value = "SELECT CONVERT(SUBSTRING(code, 4), UNSIGNED INTEGER ) AS newcode FROM supplier WHERE code LIKE '%NPP%' ORDER BY newcode DESC LIMIT 1 offset :index",nativeQuery = true)
    public String getMaxCodeBrand(@Param("index") int index);
@Query("select s from  Supplier  s where s.status = 1 and (s.code like %:k% or s.name like %:k% or s.description like %:k% or s.company like %:k% or  s.phone like %:k% or s.email like %:k% or  s.address like %:k%)")
    public Page<Supplier> getAllBySupplier(String k, Pageable pageable);
    boolean existsByName(String s);
}
