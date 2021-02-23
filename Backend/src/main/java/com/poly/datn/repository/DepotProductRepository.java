package com.poly.datn.repository;

import com.poly.datn.entity.DepotProduct;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DepotProductRepository extends JpaRepository<DepotProduct,Long> {
    @Query(value = "select d from DepotProduct d where d.depot.id = :DepotId")
    public Page<DepotProduct> getAllByDepotId(Pageable pageable, Long DepotId);
    @Query(value = "select d from DepotProduct d where d.products.id =:ProductId and d.depot.id =:DepotId ")
    public DepotProduct getByProductIdAndDepotId(Long ProductId,Long DepotId);
//    public List<DepotProduct> getAllByDepotId(Long DepotId);
}
