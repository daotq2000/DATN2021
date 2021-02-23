package com.poly.datn.service.impl;

import com.poly.datn.converter.SupplierConverter;
import com.poly.datn.dto.ColorDTO;
import com.poly.datn.dto.SupplierDTO;
import com.poly.datn.entity.Color;
import com.poly.datn.entity.Supplier;
import com.poly.datn.exception.CodeExistedException;
import com.poly.datn.exception.commonException.NotFoundException;
import com.poly.datn.repository.SupplierReposiroty;
import com.poly.datn.service.SupplierService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class SupplierImpl implements SupplierService {
    @Autowired
    SupplierConverter supplierConverter;
    @Autowired
    SupplierReposiroty supplierReposiroty;

    @Override
    public SupplierDTO getSupplierById(Long id) throws NotFoundException {
        try {
            return supplierConverter.converterToDto(supplierReposiroty.getOne(id));
        }catch (Exception exception){
            throw new NotFoundException("Can't find Brand has Id "+id);
        }
    }

    @Override
    public SupplierDTO insertSupplier(SupplierDTO supplierDTO) throws CodeExistedException {
     try {
         Supplier supplier = new Supplier();
         supplier.setCreatedDate(new Date());
         supplier.setModifiedDate(new Date());
         supplier.setCode(generateCode());
         supplier.setStatus((byte) 1);
         supplier.setCompany(supplierDTO.getCompany());
         supplier.setName(supplierDTO.getName());
         supplier.setEmail(supplierDTO.getEmail());
         supplier.setPhone(supplierDTO.getPhone());
         supplier.setAddress(supplierDTO.getAddress());
         supplier.setDescription(supplierDTO.getDescription());
         supplierReposiroty.save(supplier);
         return supplierConverter.converterToDto(supplier);

     }
     catch (Exception exception){
         throw new CodeExistedException("Duplicate Code. Try Again");
     }
    }

    @Override
    public SupplierDTO updateSupplier(SupplierDTO supplierDTO) throws Exception {
      try {
          Supplier supplier =supplierReposiroty.getOne(supplierDTO.getId());
          supplier.setModifiedDate(new Date());
          supplier.setCompany(supplierDTO.getCompany());
          supplier.setName(supplierDTO.getName());
          supplier.setEmail(supplierDTO.getEmail());
          supplier.setPhone(supplierDTO.getPhone());
          supplier.setAddress(supplierDTO.getAddress());
          supplier.setDescription(supplierDTO.getDescription());
          supplierReposiroty.save(supplier);
          return supplierConverter.converterToDto(supplier);
      }catch (Exception exception){
          throw new CodeExistedException("Duplicate Code. Try Again");
      }
    }

    @Override
    public Boolean deleteSupplierById(List<Long> arrayID) throws Exception {
        int count = 0;
        if (arrayID.size() > 0) {
            for (Long id : arrayID
            ) {
                count++;
                Supplier supplier = supplierReposiroty.getOne(id);
                supplier.setStatus((byte) 0);
                supplierReposiroty.save(supplier);
            }
        }
        return count == arrayID.size();
    }

    @Override
    public Page<SupplierDTO> page(Pageable pageable, String searh) {
        Page<Supplier> suppliers = supplierReposiroty.getAllBySupplier(searh,pageable);
        return suppliers.map(supplier -> supplierConverter.converterToDto(supplier));
    }

    @Override
    public Map<String, Object> getListSupplier(int page, int size, String sortBy, String descending, String search) {
        Pageable pageable = null;
        if (sortBy.trim().length() <= 0) {
            pageable = PageRequest.of(page - 1, size, Sort.by("id").descending());
        }
        if (descending.equals("asc")) {
            pageable = PageRequest.of(page - 1, size, Sort.by(sortBy).ascending());
        } else if (descending.equals("desc")) {
            pageable = PageRequest.of(page - 1, size, Sort.by(sortBy).descending());
        }
        Page<Supplier> supplierPage = supplierReposiroty.getAllBySupplier(search,pageable);
        List<SupplierDTO> supplierDTOS = new ArrayList<>();
        supplierPage.toList().forEach(supplier ->supplierDTOS.add(supplierConverter.converterToDto(supplier)) );
        Map<String, Object> map = new HashMap<>();
        map.put("suppliers", supplierDTOS);
        map.put("totalPages", supplierPage.getTotalPages());
        map.put("totalElements", supplierPage.getTotalElements());
        map.put("currentPage", page);
        return map;
    }

    @Override
    public boolean delete(long id) {
   try {
       Supplier supplier =supplierReposiroty.getOne(id);
       supplier.setStatus((byte) 0);
       return  true;
   }catch (Exception exception)
   {
       return  false;
   }
    }
    @Override
    public String generateCode() {
        Long codeNumber = 0L;
        String newCodeString;
        int index = 0;
        String getMaxCode = null;
        getMaxCode = supplierReposiroty.getMaxCodeBrand(index);
        do {
            getMaxCode = supplierReposiroty.getMaxCodeBrand(index);
            if (getMaxCode == null) {
                getMaxCode = "0";
            } else {
                boolean result = StringUtils.isNumeric(getMaxCode);
                if (!result) {
                    getMaxCode = null;
                    index++;
                } else {
                    getMaxCode = getMaxCode;
                }
            }
        } while (getMaxCode == null);
        codeNumber = Long.parseLong(getMaxCode) + 1;
        newCodeString = "NPP000" + codeNumber.toString();
        return newCodeString;
    }
}
