package com.sapo.qlsc.repository.impl;

import com.sapo.qlsc.entity.User;
import com.sapo.qlsc.repository.UserRepositoryCustom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
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

    @Override
    public List<Map<String, Object>> getTotalMaintenanceCardByRepairman(int page, int size, String key) {
        String sql = "select count(maintenance_cards.id) as numberMaintenanceCards, users.id as user from users \n" +
                "left join maintenance_cards on users.id = maintenance_cards.repairman_id \n" +
                "where users.role = 2 \n" +
                "and users.status = 1 \n" +
                "and (users.code like :key \n" +
                "or  users.email like :key \n" +
                "or  users.full_name like :key \n" +
                "or  users.phone_number like :key ) \n" +
                "group by users.id " +
                "order by count(maintenance_cards.id) " +
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

        String sql = "select users.id, users.created_date,users.modified_date,users.address,users.code,\n" +
                "users.email,users.full_name,phone_number,users.role,users.status , count(maintenance_cards.id) as totalMaintenanceCard\n" +
                "from users left join maintenance_cards on maintenance_cards.repairman_id  = users.id\n" +
                "where users.status = 1  and (users.code like :search or users.full_name like :search or users.email like :search or users.phone_number like :search)\n" +
                "group by users.id \n" +
                "order by :sortBy :descending " +
                "limit :size offset :page;";
        SqlParameterSource sqlParameterSource = new MapSqlParameterSource()
                .addValue("page", page*size)
                .addValue("size", size)
                .addValue("sortBy", sortBy)
                .addValue("descending", descending)
                .addValue("search", search);
        System.out.println("descending "+descending);
        System.out.println("search "+search);
         jdbcTemplate.queryForList(sql, sqlParameterSource);

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


}
