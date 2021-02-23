package com.poly.datn.service;


import com.poly.datn.dto.SupplierDTO;

import com.poly.datn.entity.Supplier;
import com.poly.datn.exception.CodeExistedException;
import com.poly.datn.exception.commonException.NotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Map;

public interface SupplierService {
    public SupplierDTO getSupplierById(Long id) throws NotFoundException;
    public SupplierDTO insertSupplier(SupplierDTO supplierDTO) throws CodeExistedException;
    public SupplierDTO updateSupplier(SupplierDTO supplierDTO) throws Exception;
    public Boolean deleteSupplierById(List<Long> arrayID) throws Exception;
    Page<SupplierDTO> page(Pageable pageable, String searh);
    public Map<String,Object> getListSupplier(int page, int size, String sortBy, String descending, String search);
     boolean delete(long id);
    public String generateCode();
}
