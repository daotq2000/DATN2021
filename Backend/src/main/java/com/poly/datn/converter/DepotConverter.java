package com.poly.datn.converter;

import com.poly.datn.entity.Depot;
import com.poly.datn.dto.DepotDTO;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.ui.ModelMap;

@Component
public class DepotConverter {
    @Autowired UserConverter userConverter;
    @Autowired WardConverter wardConverter;
    @Autowired DepotProductConverter depotProductConverter;
    public DepotDTO convertToDTO(Depot depot){
        DepotDTO depotDTO = new DepotDTO();
        depotDTO.setId(depot.getId());
        depotDTO.setAddress(depot.getAddress());
        depotDTO.setCode(depot.getCode());
        depotDTO.setName(depot.getName());
        depotDTO.setStatus(depot.getStatus());
        depotDTO.setUsers(userConverter.convertToDTO(depot.getUsers()));
        depotDTO.setCreatedDate(depot.getCreatedDate());
        depotDTO.setModifiedDate(depot.getModifiedDate());
        depotDTO.setWards(wardConverter.convertToDTO(depot.getWards()));
        return depotDTO;
    }
    public DepotDTO getAllDTO(Depot depot){
        DepotDTO depotDTO = new DepotDTO();
        depotDTO.setId(depot.getId());
        depotDTO.setAddress(depot.getAddress());
        depotDTO.setCode(depot.getCode());
        depotDTO.setName(depot.getName());
        depotDTO.setStatus(depot.getStatus());
        depotDTO.setUsers(userConverter.convertToDTO(depot.getUsers()));
        depotDTO.setCreatedDate(depot.getCreatedDate());
        depotDTO.setModifiedDate(depot.getModifiedDate());
        depotDTO.setWards(wardConverter.convertToDTO(depot.getWards()));
        depotDTO.setDepotProducts(depotProductConverter.convertList(depot.getDepotProducts()));
        return depotDTO;
    }
    public Depot convertToEntity(DepotDTO depotDTO){
        ModelMapper modelMap = new ModelMapper();
        return modelMap.map(depotDTO,Depot.class);
    }
}
