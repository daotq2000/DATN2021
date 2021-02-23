package com.poly.datn.repository;

import com.poly.datn.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    public Page<Product> findAllByStatusNotAndNameContainingIgnoreCaseOrStatusNotAndCodeContainingIgnoreCaseOrderByModifiedDateDesc(byte status1, String searchByName, byte status2, String searchByCode, Pageable pageable);

    public Page<Product> findAllByTypeAndStatusNotAndNameContainingIgnoreCaseOrTypeAndStatusNotAndCodeContainingIgnoreCaseOrderByModifiedDateDesc(byte type, byte status, String search, byte type2, byte status2, String search2, Pageable pageable);

    @Query(value = "select p from Product p where p.status =1 and (p.code like %:search% or p.name like %:search% or p.category.name like %:search% or p.manufacturer.name like %:search%)")
    public Page<Product> searchProducts(Pageable pageable,String search);
    @Query(value = "select p from Product p where p.status =1 and (p.code like %:search% or p.name like %:search% ) and p.manufacturer.id =:manufactureId and p.category.id =:categoriesId")
    public Page<Product> searchProductByCategoriesIdAndManufactureId(Pageable pageable,String search,Long categoriesId,Long manufactureId);

    @Query(value = "SELECT MAX(CONVERT(SUBSTRING(code, 4), UNSIGNED INTEGER)) as maxcode FROM products WHERE code LIKE 'sp%' LIMIT 1", nativeQuery = true)
    public List<String> getMaxCode();

    public Optional<Product> findByImage(String imageName);

    public Optional<String> findByCode(String code);

    public Optional<Product> findByIdAndType(Long id, Byte type);

    public Optional<String> findNameByName(String name);

    public Optional<String> findNameByNameAndIdNot(String name, Long id);

    public Optional<String> findCodeByCodeAndIdNot(String code, Long id);

    @Modifying
    @Transactional
    @Query("UPDATE Product SET status = 0 WHERE id IN :idArray")
    public void multipleDelete(@Param("idArray") Long[] idArray);
    @Query("SELECT p from Product p where p.status = 1 and (p.name like %:keyWord% or p.code like %:keyWord% or p.description like %:keyWord%)" )
    public Page<Product> getAllProductByDepotID(Pageable pageable,String keyWord);

}
