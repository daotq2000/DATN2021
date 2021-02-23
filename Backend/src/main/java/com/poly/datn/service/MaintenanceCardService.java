package com.poly.datn.service;

import com.poly.datn.entity.MaintenanceCard;
import com.poly.datn.exception.maintenanceCardException.NotEnoughProductException;
import com.poly.datn.exception.maintenanceCardException.NotFoundRepairmanException;
import com.poly.datn.exception.maintenanceCardException.NotUpdateException;
import com.poly.datn.dto.MaintenanceCardDTO;
import com.poly.datn.exception.CodeExistedException;
import com.poly.datn.exception.commonException.NotFoundException;
import com.poly.datn.model.MaintenanceCardCustomer;
import com.poly.datn.model.MaintenanceCardFilter;

import java.util.List;
import java.util.Map;

public interface MaintenanceCardService {

     MaintenanceCardDTO insertMaintenanceCard(MaintenanceCardDTO maintenanceCardDTO) throws Exception;
     Map<String, Object> searchMaintenanceCard(MaintenanceCardFilter maintenanceCardFilter,String email,int role);
     MaintenanceCardDTO getMaintenanceCardById(Long id,String email,int role) throws NotFoundException;
     MaintenanceCardDTO updateMaintenanceCard(MaintenanceCardDTO maintenanceCardDTO,String email,int role) throws Exception;
     Map<String, Object> getMaintenanceCardByIdCustomer(MaintenanceCardCustomer maintenanceCardCustomer);
     MaintenanceCardDTO updateAllStatusMaintenanceCard(Long id,String email,int role) throws NotFoundException, NotFoundRepairmanException;
     boolean deleteMaintenanceCard(Long id) throws NotFoundException, NotFoundRepairmanException, NotEnoughProductException;
     Map<String,Object> getMaintenanceCardByRepairMan(int PageNum, int PageSize, String sortBy, boolean descending,Long userId,String code,byte[] payStatus,byte[] workStatus);
     public List<String> getPlatesNumberByCustomerId(Long id);
     public Map<String,Object> getTotalTimeAndSumMaintenanceCard(int page,int size);
     public MaintenanceCardDTO getMinTimeLeftMaintenanceCard(Long repairManId);
}
