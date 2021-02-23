package com.poly.datn.repository;

import com.poly.datn.entity.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category,Long> {
    @Query("select c from Category c where c.status=1 and (c.name like %:s% or c.code like %:s% or c.description like %:s%)")
    Page<Category> getAllByCategory(Pageable pageable , String s);
    @Query(value = "SELECT CONVERT(SUBSTRING(code, 4), UNSIGNED INTEGER ) AS newcode FROM categories WHERE code LIKE '%CT%' ORDER BY newcode DESC LIMIT 1 offset :index",nativeQuery = true)
    public String getMaxCodeCategory(@Param("index") int index);
}
