package com.poly.datn.converter;

import com.poly.datn.dto.SupplierDTO;
import com.poly.datn.entity.Supplier;
import org.springframework.stereotype.Component;

@Component
public class SupplierConverter {
    public SupplierDTO converterToDto(Supplier supplier){
        SupplierDTO supplierDTO = new SupplierDTO();
        supplierDTO.setId(supplier.getId());
        supplierDTO.setCreatedDate(supplier.getCreatedDate());
        supplierDTO.setModifiedDate(supplier.getModifiedDate());
        supplierDTO.setCode(supplier.getCode());
        supplierDTO.setName(supplier.getName());
        supplierDTO.setPhone(supplier.getPhone());
        supplierDTO.setEmail(supplier.getEmail());
        supplierDTO.setAddress(supplier.getAddress());
        supplierDTO.setCompany(supplier.getCompany());
        supplierDTO.setDescription(supplier.getDescription());
        return supplierDTO;
    }
}
