package com.sapo.qlsc.service;

import com.sapo.qlsc.dto.MaintenanceCardDTO;
import com.sapo.qlsc.entity.MaintenanceCard;
import com.sapo.qlsc.exception.CodeExistedException;
import com.sapo.qlsc.exception.commonException.NotFoundException;
import com.sapo.qlsc.exception.maintenanceCardException.NotEnoughProductException;
import com.sapo.qlsc.exception.maintenanceCardException.NotFoundRepairmanException;
import com.sapo.qlsc.model.MaintenanceCardFilter;

import java.util.List;
import java.util.Map;

public interface MaintenanceCardService {

     MaintenanceCardDTO insertMaintenanceCard(MaintenanceCardDTO maintenanceCardDTO) throws NotEnoughProductException, CodeExistedException;
     Map<String, Object> searchMaintenanceCard(MaintenanceCardFilter maintenanceCardFilter);
     public MaintenanceCardDTO getMaintenanceCardById(Long id) throws NotFoundException;
     MaintenanceCardDTO updateMaintenanceCard(MaintenanceCardDTO maintenanceCardDTO) throws NotEnoughProductException, NotFoundException, CodeExistedException;
     Map<String, Object> getMaintenanceCardByIdCustomer(int pageNumber, int size, Long id);
     MaintenanceCardDTO updateAllStatusMaintenanceCard(Long id) throws NotFoundException, NotFoundRepairmanException;
     Map<String,Object> getMaintenanceCardByRepairMan(int PageNum, int PageSize, String sortBy, boolean descending,Long userId,String code);
}
