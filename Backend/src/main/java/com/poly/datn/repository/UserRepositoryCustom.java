package com.poly.datn.repository;

import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Map;

public interface UserRepositoryCustom {

    public List<Map<String,Object>> getTotalMaintenanceCardByRepairman(int page, int size,String key);
    public int countTotalElements(String key);
    public Map<String,Object> getListUser(int page,int size,String key);
    public  List<Map<String, Object>> getTotalMaintenanceCardUser(int page,int size,String sortBy,String descending,String search);
    public int countTotalElementsUser(String key);
    public List<Map<String,Object>> getTotalTimeAndCountMaintenanceCard(int page,int size);
}
