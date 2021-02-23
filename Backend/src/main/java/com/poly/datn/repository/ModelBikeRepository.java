package com.poly.datn.repository;

import com.poly.datn.entity.ModelBike;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ModelBikeRepository extends JpaRepository<ModelBike,Long> {
    @Query("select m from  ModelBike  m where  m.status = 1 and (m.name like %:s% or m.code like %:s%)")
    public Page<ModelBike> getAll(Pageable pageable, String s);
    @Query(value = "SELECT CONVERT(SUBSTRING(code, 4), UNSIGNED INTEGER ) AS newcode FROM model_bikes WHERE code LIKE '%MX%' ORDER BY newcode DESC LIMIT 1 offset :index",nativeQuery = true)
    public String getMaxCode(@Param("index") int index);
    boolean existsByName(String s);
    public List<ModelBike> getByManufacturerId(Long ManufacturerId);
}
