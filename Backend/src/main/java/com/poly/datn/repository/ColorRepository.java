package com.poly.datn.repository;

import com.poly.datn.entity.Color;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ColorRepository extends JpaRepository<Color,Long> {
    @Query("select c from  Color  c where  c.status = 1 and (c.code like %:k% or c.name like %:k% )")
    Page<Color> getAllByColor(Pageable pageable, String k);
    @Query(value = "SELECT CONVERT(SUBSTRING(code, 4), UNSIGNED INTEGER ) AS newcode FROM colors WHERE code LIKE '%MM%' ORDER BY newcode DESC LIMIT 1 offset :index",nativeQuery = true)
    public String getMaxCodeColor(@Param("index") int index);
}
