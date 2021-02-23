package com.poly.datn.service;


import com.poly.datn.dto.BrandDTO;
import com.poly.datn.dto.ServiceDTO;
import com.poly.datn.entity.Brand;
import com.poly.datn.exception.CodeExistedException;
import com.poly.datn.exception.commonException.NotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Map;

public interface BrandService {
    public Map<String,Object> getListBrand(int page, int size, String sortBy, String descending, String search);
    public BrandDTO getBrandById(Long id) throws NotFoundException;
    public BrandDTO insertBrand(BrandDTO brandDTO) throws CodeExistedException;
    public BrandDTO updateBrand(BrandDTO brandDTO) throws Exception;
    public Boolean deleteBrandById(List<Long> arrayID) throws Exception;
    Page<BrandDTO> page(Pageable pageable,String searh);
    boolean delete(long id);
    public String generateCode();
}
