package com.poly.datn.converter;


import com.poly.datn.dto.ManufactureDTO;
import com.poly.datn.entity.Manufacturer;
import org.springframework.stereotype.Component;

@Component
public class ManufactorConvert {
    public ManufactureDTO convertToDTO (Manufacturer manufacturer) {
      ManufactureDTO manufactureDTO = new ManufactureDTO();
      manufactureDTO.setId(manufacturer.getId());
      manufactureDTO.setCreatedDate(manufacturer.getCreatedDate());
      manufactureDTO.setModifiedDate(manufacturer.getModifiedDate());
      manufactureDTO.setDescription(manufacturer.getDescription());
      manufactureDTO.setCode(manufacturer.getCode());
      manufactureDTO.setStatus(manufacturer.getStatus());
      manufactureDTO.setName(manufacturer.getName());
      
      return manufactureDTO;
    }
    public Manufacturer convertEntity(ManufactureDTO manufactureDTO){
        Manufacturer manufacturer = new Manufacturer();
        manufacturer.setId(manufactureDTO.getId());
        manufacturer.setDescription(manufactureDTO.getDescription());
        manufacturer.setModifiedDate(manufactureDTO.getModifiedDate());
        manufacturer.setCreatedDate(manufactureDTO.getModifiedDate());
        manufacturer.setStatus(manufactureDTO.getStatus());
        manufacturer.setName(manufactureDTO.getName());
        manufacturer.setCode(manufactureDTO.getCode());
        return  manufacturer;
    }
}
