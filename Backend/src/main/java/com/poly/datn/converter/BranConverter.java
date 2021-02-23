package com.poly.datn.converter;

import com.poly.datn.dto.BrandDTO;
import com.poly.datn.entity.Brand;
import org.springframework.stereotype.Component;

@Component
public class BranConverter {
    public BrandDTO convertToDTO(Brand brand){
        BrandDTO brandDTO = new BrandDTO();
        brandDTO.setId(brand.getId());
        brandDTO.setCreatedDate(brand.getCreatedDate());
        brandDTO.setModifiedDate(brand.getModifiedDate());
        brandDTO.setName(brand.getName());
        brandDTO.setCode(brand.getCode());
        brandDTO.setDescription(brand.getDescription());
        brandDTO.setStatus(brand.getStatus());
        return brandDTO;
    }
    public Brand convertToEntity(BrandDTO brandDTO){
        Brand brand = new Brand();
        brand.setId(brandDTO.getId());
        brand.setCode(brandDTO.getCode());
        brand.setName(brandDTO.getName());
        brand.setDescription(brandDTO.getDescription());
        brand.setStatus(brandDTO.getStatus());
        return brand;
    }
}
