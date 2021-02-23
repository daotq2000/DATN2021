package com.poly.datn.repository.impl;

import com.poly.datn.repository.ServiceRepository;
import com.poly.datn.repository.UserRepositoryCustom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class UserRepositoryCustomImpl implements UserRepositoryCustom {

    @Autowired
    private NamedParameterJdbcTemplate jdbcTemplate;
    @Autowired
    ServiceRepository serviceRepository;
    @Override
    public List<Map<String, Object>> getTotalMaintenanceCardByRepairman(int page, int size, String key) {
        String sql = "SELECT u.id as user,(SELECT COUNT(*) FROM maintenance_cards WHERE repairman_id = u.id and work_status != 2) AS numberMaintenanceCards \n" +
                ",(select sum(time_left) from maintenance_cards m WHERE m.repairman_id = u.id and m.work_status != 2 and m.is_delete =0) as timeLeft \n" +
                "                FROM users u LEFT JOIN maintenance_cards mc ON mc.repairman_id = u.id  \n" +
                "                where u.role = 2  \n" +
                "                and u.status = 1  " +
                "and (u.code like :key \n" +
                "or  u.email like :key \n" +
                "or  u.full_name like :key \n" +
                "or  u.phone_number like :key ) \n" +
                "group by u.id " +
                "order by numberMaintenanceCards "+
                "limit :size offset :page";
        SqlParameterSource sqlParameterSource = new MapSqlParameterSource()
                .addValue("size", size)
                .addValue("page", page)
                .addValue("key", key);
        return jdbcTemplate.queryForList(sql, sqlParameterSource);
    }

    @Override
    public int countTotalElements(String key) {
        String sql = "SELECT count(*) as total FROM users where users.status = 1 and users.role = 2 " +
                "and (users.code like :key \n" +
                "or  users.email like :key \n" +
                "or  users.full_name like :key \n" +
                "or  users.phone_number like :key ) \n";
        SqlParameterSource sqlParameterSource = new MapSqlParameterSource()
                .addValue("key", key);
        return jdbcTemplate.queryForObject(sql, sqlParameterSource, (rs, rowNum) -> {
            return rs.getInt("total");
        });

    }

    @Override
    public Map<String, Object> getListUser(int page, int size, String key) {
        return null;
    }

    @Override
    public List<Map<String, Object>> getTotalMaintenanceCardUser(int page, int size, String sortBy, String descending, String search) {

        String sql = "select users.id, users.created_date,users.modified_date,users.address,users.code, " +
                "users.email,users.full_name,phone_number,users.role,users.status , count(maintenance_cards.id) as totalMaintenanceCard " +
                "from users left join maintenance_cards on maintenance_cards.repairman_id  = users.id or   maintenance_cards.coordinator_id = users.id " +
                "where users.status = 1  and (users.code like :search or users.full_name like :search or users.email like :search or users.phone_number like :search) " +
                "group by users.id " +
                "order by "+sortBy+" "+descending +
                "   limit :size offset :page ";
        SqlParameterSource sqlParameterSource = new MapSqlParameterSource()
                .addValue("page", page*size)
                .addValue("size", size)
                .addValue("search", search);
        return  jdbcTemplate.queryForList(sql, sqlParameterSource);

    }

    @Override
    public int countTotalElementsUser(String key) {
        String sql = "SELECT count(*) as total FROM users where users.status = 1 " +
                "and (users.code like :key \n" +
                "or  users.email like :key \n" +
                "or  users.full_name like :key \n" +
                "or  users.phone_number like :key ) \n";
        SqlParameterSource sqlParameterSource = new MapSqlParameterSource()
                .addValue("key", key);
        return jdbcTemplate.queryForObject(sql, sqlParameterSource, (rs, rowNum) -> {
            return rs.getInt("total");
        });
    }

    @Override
    public List<Map<String,Object>>getTotalTimeAndCountMaintenanceCard(int page, int size) {
        String sql = "select distinct maintenance_cards.repairman_id, count(maintenance_cards.id) as sumMaintenanceCard ,sum(maintenance_cards.total_time) as totalTime from maintenance_cards\n" +
                "where maintenance_cards.work_status =1  \n" +
                "group by maintenance_cards.repairman_id\n" +
                "order by totalTime asc limit :size offset :page ; \t\n";
        SqlParameterSource sqlParameterSource = new MapSqlParameterSource()
                .addValue("size",size)
                .addValue("page",page-1);
        return jdbcTemplate.queryForList(sql,sqlParameterSource);

    }
    public  Map<String,Object>  getTopService(){
        String sql = "SELECT m.service_id,count(m.service_id) as total FROM datn.maintenance_card_details m\n" +
                "where m.is_delete = 0\n" +
                "group by m.service_id\n" +
                "order by count(m.service_id) desc\n" +
                "limit 5";

        Map<String,Object> map = new HashMap<>();

        return null;
    }

}
