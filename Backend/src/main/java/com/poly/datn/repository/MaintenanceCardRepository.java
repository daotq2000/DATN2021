package com.poly.datn.repository;


import com.poly.datn.entity.MaintenanceCard;
import com.poly.datn.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Repository
public interface MaintenanceCardRepository extends JpaRepository<MaintenanceCard, Long> {

    @Query(value = "SELECT CONVERT(SUBSTRING(code, 4), UNSIGNED INTEGER ) AS newcode FROM maintenance_cards WHERE code LIKE 'mc00%' ORDER BY newcode DESC LIMIT 1 offset :index", nativeQuery = true)
    String getMaxCode(@Param("index") int index);

    @Query(value = "SELECT count(code) FROM maintenance_cards\n" +
            "where code = :code \n" +
            "and id != :id " +
            ";", nativeQuery = true)
    public int checkCode(@Param("code") String code, @Param("id") Long id);

    @Query("SELECT distinct wc FROM MaintenanceCard wc, User u WHERE (wc.code LIKE %?1% or wc.platesNumber LIKE %?1% or wc.customer.name LIKE %?1%) AND wc.isDelete = 0  " +
            "AND wc.workStatus IN  ?2 " +
            "AND wc.payStatus IN  ?3 " +
            "AND (wc.repairman = u.id or wc.coordinator = u.id) " +
            "AND (u.email = ?4 or ?5 = 3)")
    Page<MaintenanceCard> search(Pageable pageable, String keyWork, byte[] workStatus, byte[] payStatus, String email, int role);
    @Query("SELECT distinct wc FROM MaintenanceCard wc, User u WHERE (wc.code LIKE %?1% or wc.platesNumber LIKE %?1% or wc.customer.name LIKE %?1%) AND wc.isDelete = 0  " +
            "AND wc.workStatus IN  ?2 " +
            "AND wc.payStatus IN  ?3 ")
    Page<MaintenanceCard> searchAll(Pageable pageable, String keyWork, byte[] workStatus, byte[] payStatus);

    @Query("SELECT distinct wc FROM MaintenanceCard wc, User u WHERE wc.id = :id " +
            "AND (wc.repairman = u.id or wc.coordinator = u.id) " +
            "AND (u.email = :email or :role = 3)")
    MaintenanceCard getMaintenanceCardByIdAndEmail(@Param("id") Long id, @Param("email") String email, @Param("role") int role);

    @Query("SELECT distinct wc FROM MaintenanceCard wc, User u WHERE wc.id = :id " +
            "AND (wc.coordinator = u.id) " +
            "AND u.email = :email and :role = 1")
    MaintenanceCard getMaintenanceCardByIdAndCoordinatorEmail(@Param("id") Long id, @Param("email") String email, @Param("role") int role);

    @Query("SELECT distinct wc FROM MaintenanceCard wc, User u WHERE wc.id = :id " +
            "AND (wc.repairman = u.id) " +
            "AND u.email = :email and :role = 2")
    MaintenanceCard getMaintenanceCardByIdAndRepairmanEmail(@Param("id") Long id, @Param("email") String email, @Param("role") int role);

    @Query("SELECT m FROM MaintenanceCard  m, Customer c WHERE m.customer.id = c.id AND m.customer.id = ?1 AND m.code LIKE %?2% AND m.payStatus IN  ?3 AND m.workStatus IN ?4")
    Page<MaintenanceCard> getMaintenanceCardByIdCustomer(Pageable pageable, Long id, String keyWork, byte[] payStatus, byte[] workStatus);

    @Query(value = "select m from MaintenanceCard m where (m.repairman.id =:userId or m.coordinator =:userId) and m.code like %:code%")
    Page<MaintenanceCard> getMaintenanceCardByRepairMan(Pageable pageable, Long userId, String code);

	@Query(value = "SELECT SUM(money) as totalMoney FROM payment_histories where modified_date BETWEEN ?1 AND ?2", nativeQuery = true)
    BigDecimal getTotalMoney(Date startDate, Date endDate);

    @Query(value = "SELECT (sum(m.price) - (SELECT sum(p.money) FROM payment_histories as p where p.modified_date BETWEEN ?1 AND ?2 )) \n" +
            "FROM maintenance_cards as m \n" +
            "where m.pay_status = 2\n" +
            "and m.modified_date BETWEEN ?1 AND ?2 ;", nativeQuery = true)
    BigDecimal getTotalLiabilities(Date startDate, Date endDate);

    @Query(value = "SELECT COUNT(mc.id) as totalMoney FROM maintenance_cards mc where mc.created_date BETWEEN ?1 AND ?2", nativeQuery = true)
    int getTotalMaintenanceCard(Date startDate, Date endDate);

    @Query(value = "select m from MaintenanceCard m where (m.repairman.id =:userId or m.coordinator =:userId) "
            + "AND (m.workStatus  In :workstatus ) " +
            "AND (m.payStatus  In :paystatus  )")
    Page<MaintenanceCard> filterByWsandPs(Pageable pageable, @Param("userId") Long userId, @Param("workstatus") byte[] workstatus, @Param("paystatus") byte[] paystatus);
    @Query(value = "select distinct m.platesNumber from MaintenanceCard m where m.customer.id =:id")
    public List<String> getPlatesNumberByCustomerId(@Param("id")Long id);
    @Query(value = "select distinct m,count(m.id) from MaintenanceCard m where m.workStatus in ?1")
    public Page<MaintenanceCard> getMaintenanceCardByRepairman(Pageable pageable,byte[] workStatus);
    @Query(value = "Select * from maintenance_cards m\n" +
            "where (m.work_status = 0 or m.work_status = 1) and m.repairman_id =:repairManID " +
            "group by m.id\n " +
            "order by min(m.time_left) asc  " +
            " limit 1 ",nativeQuery = true)
    public MaintenanceCard getMinTimeLeftMaintenanceCard(Long repairManID);
    @Modifying
    @Query(value = "update MaintenanceCard set isDelete = 1 where id=:id")
    public int deleteByMaintenanceCardId(Long id);
}
