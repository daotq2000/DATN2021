package com.sapo.qlsc.repository;


import com.sapo.qlsc.entity.MaintenanceCard;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MaintenanceCardRepository extends JpaRepository<MaintenanceCard, Long> {

    @Query(value = "SELECT CONVERT(SUBSTRING(code, 4), UNSIGNED INTEGER ) AS newcode FROM maintenance_cards WHERE code LIKE 'mc00%' ORDER BY newcode DESC LIMIT 1 offset :index", nativeQuery = true)
    String getMaxCode(@Param("index") int index);

    @Query(value = "SELECT count(code) FROM maintenance_cards\n" +
            "where code = :code \n" +
            "and id != :id " +
            ";", nativeQuery = true)
    public int checkCode(@Param("code") String code,@Param("id") Long id);

    @Query("SELECT wc FROM MaintenanceCard wc WHERE wc.code LIKE %?1% " +
            "AND wc.workStatus IN  ?2 " +
            "AND wc.payStatus IN  ?3 ")
    Page<MaintenanceCard> search(Pageable pageable, String keyWork, byte[] workStatus,byte[] payStatus);

    @Query("SELECT m FROM MaintenanceCard  m, Customer c WHERE m.customer.id = c.id AND m.customer.id = :id ")
    Page<MaintenanceCard> getMaintenanceCardByIdCustomer(Pageable pageable, @Param("id") Long id);
    @Query(value = "select m from MaintenanceCard m where m.repairman.id =:userId and m.code like %:code%")
    Page<MaintenanceCard> getMaintenanceCardByRepairMan(Pageable pageable,Long userId,String code);
}
