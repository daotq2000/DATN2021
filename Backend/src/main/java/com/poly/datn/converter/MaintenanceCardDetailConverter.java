package com.poly.datn.converter;

import com.poly.datn.dto.MaintenanceCardDetailDTO;
import com.poly.datn.entity.MaintenanceCardDetail;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class MaintenanceCardDetailConverter {

    public MaintenanceCardDetailDTO convertToDTO(MaintenanceCardDetail maintenanceCardDetail){
        MaintenanceCardDetailDTO maintenanceCardDetailDTO = new MaintenanceCardDetailDTO();
        maintenanceCardDetailDTO.setId(maintenanceCardDetail.getId());
        maintenanceCardDetailDTO.setStatus(maintenanceCardDetail.getStatus());
        maintenanceCardDetailDTO.setFree(maintenanceCardDetail.isFree());
        return maintenanceCardDetailDTO;
    }
    public List<MaintenanceCardDetailDTO> convertListMaintenanceCardDetailDTO(List<MaintenanceCardDetail> maintenanceCardDetails){
        List<MaintenanceCardDetailDTO> list = new ArrayList<>();
        maintenanceCardDetails.forEach(maintenanceCardDetail -> list.add(convertToDTO(maintenanceCardDetail)));
        return list;
    }
}
