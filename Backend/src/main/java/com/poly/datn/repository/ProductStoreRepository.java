package com.poly.datn.repository;

import com.poly.datn.entity.ProductStore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductStoreRepository extends JpaRepository<ProductStore,Long> {
    @Query("select distinct p from ProductStore p where p.store.id =:StoreId and p.products.id=:ProductsId ")
    public ProductStore getByStoreIdAndProductsId(Long StoreId,Long ProductsId);
}
