package com.poly.datn.converter;

import com.poly.datn.dto.ExportDepotDTO;
import com.poly.datn.entity.ExportDepot;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.ui.ModelMap;
@Component
public class ExportDepotConverter {
    @Autowired UserConverter userConverter;
    @Autowired DepotConverter depotConverter;
    @Autowired StoreConverter storeConverter;
    @Autowired ExportDepotDetailConverter exportDepotDetailConverter;
    public final ModelMapper modelMap =  new ModelMapper();
    public ExportDepotDTO convertToDTO(ExportDepot exportDepot){
        ExportDepotDTO exportDepotDTO = new ExportDepotDTO();
        exportDepotDTO.setId(exportDepot.getId());
        exportDepotDTO.setAmount(exportDepot.getAmount());
        exportDepotDTO.setCode(exportDepot.getCode());
        exportDepotDTO.setStatus(exportDepot.getStatus());
        exportDepotDTO.setCreatedDate(exportDepot.getCreatedDate());
        exportDepotDTO.setModifiedDate(exportDepot.getModifiedDate());
        exportDepotDTO.setUsers(userConverter.convertToDTO(exportDepot.getUsers()));
        exportDepotDTO.setDepot(depotConverter.convertToDTO(exportDepot.getDepot()));
        exportDepotDTO.setStore(storeConverter.convertToDTO(exportDepot.getStore()));
        exportDepotDTO.setExportDepotDetails(exportDepotDetailConverter.convertToList(exportDepot.getExportDepotDetails()));
        return exportDepotDTO;
    }
    public ExportDepot convertToEntity(ExportDepotDTO exportDepotDTO){
        return modelMap.map(exportDepotDTO,ExportDepot.class);
    }
}
