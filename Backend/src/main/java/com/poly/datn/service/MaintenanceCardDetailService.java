package com.poly.datn.service;

import com.poly.datn.dto.TopProductDTO;
import com.poly.datn.dto.TopService;
import com.poly.datn.exception.maintenanceCardException.NotFoundRepairmanException;
import com.poly.datn.dto.MaintenanceCardDTO;
import com.poly.datn.exception.commonException.NotFoundException;

import java.util.List;

public interface MaintenanceCardDetailService {

    public MaintenanceCardDTO updateStatusMaintenanceCardDetail(Long id,String email) throws NotFoundException, NotFoundRepairmanException;
    public List<TopService> getListService();
    public List<TopProductDTO> getListTopProduct();
}
