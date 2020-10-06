package com.sapo.qlsc.repository;

import com.sapo.qlsc.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    public Page<Product> findAllByStatusNotAndNameContainingIgnoreCaseOrCodeContainingIgnoreCaseOrderByModifiedDateDesc(byte status, String searchByName, String searchByCode, Pageable pageable);

    public Page<Product> findAllByTypeAndStatusNotAndNameContainingIgnoreCaseOrTypeAndStatusNotAndCodeContainingIgnoreCaseOrderByModifiedDateDesc(byte type, byte status, String search, byte type2, byte status2, String search2, Pageable pageable);

    @Query(value = "SELECT code FROM products WHERE code LIKE 'SP%' ORDER BY code DESC LIMIT 1", nativeQuery = true)
    public List<String> getMaxCode();

    public Optional<Product> findByImage(String imageName);

    public Optional<String> findByCode(String code);

    public Optional<Product> findByIdAndType(Long id, Byte type);
}
