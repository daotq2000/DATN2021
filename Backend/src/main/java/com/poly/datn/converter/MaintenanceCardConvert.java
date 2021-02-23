package com.poly.datn.converter;

import com.poly.datn.dto.MaintenanceCardDTO;
import com.poly.datn.entity.MaintenanceCard;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class MaintenanceCardConvert {
@Autowired private  StoreConverter storeConverter;
@Autowired private ColorBikeConverter colorBikeConverter;
    public MaintenanceCardDTO convertToDTO(MaintenanceCard maintenanceCard){

        MaintenanceCardDTO maintenanceCardDTO = new MaintenanceCardDTO();
        maintenanceCardDTO.setId(maintenanceCard.getId());
        maintenanceCardDTO.setCode(maintenanceCard.getCode());
        maintenanceCardDTO.setCreatedDate(maintenanceCard.getCreatedDate());
        maintenanceCardDTO.setModifiedDate(maintenanceCard.getModifiedDate());
        maintenanceCardDTO.setPlatesNumber(maintenanceCard.getPlatesNumber());
        maintenanceCardDTO.setDescription(maintenanceCard.getDescription());
        maintenanceCardDTO.setReturned(maintenanceCard.isReturned());
        maintenanceCardDTO.setPrice(maintenanceCard.getPrice());
        maintenanceCardDTO.setWorkStatus(maintenanceCard.getWorkStatus());
        maintenanceCardDTO.setPayStatus(maintenanceCard.getPayStatus());
        maintenanceCardDTO.setDelete(maintenanceCard.isDelete());
        maintenanceCardDTO.setReturnDateCustomer(maintenanceCard.getReturnDateCustomer());
        if(maintenanceCard.getStore() != null){
            maintenanceCardDTO.setStore(storeConverter.convertToDTO(maintenanceCard.getStore()));
        }
        if(maintenanceCard.getColorBike() != null){
             maintenanceCardDTO.setColorBike(colorBikeConverter.convertToDTO(maintenanceCard.getColorBike()));
        }
        maintenanceCardDTO.setTotalTime(maintenanceCard.getTotalTime());
        maintenanceCardDTO.setTimeStart(maintenanceCard.getTimeStart());
        maintenanceCardDTO.setTimeLeft(maintenanceCard.getTimeLeft());
        maintenanceCardDTO.setReturnDate(maintenanceCard.getReturnDate());
        return maintenanceCardDTO;
    }

}
