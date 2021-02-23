package com.poly.datn.service.impl;

import com.poly.datn.converter.BranConverter;
import com.poly.datn.dto.BrandDTO;
import com.poly.datn.dto.ColorDTO;
import com.poly.datn.entity.Brand;
import com.poly.datn.entity.Color;
import com.poly.datn.exception.CodeExistedException;
import com.poly.datn.exception.commonException.NotFoundException;
import com.poly.datn.repository.BranRepository;
import com.poly.datn.service.BrandService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class BranServiceImpl implements BrandService {

    private  BranRepository branRepository;
    private  BranConverter branConverter;
    @Autowired
    private  BranServiceImpl(BranRepository branRepository,BranConverter branConverter){
        this.branRepository = branRepository;
        this.branConverter = branConverter;
    }

    @Override
    public Map<String, Object> getListBrand(int page, int size, String sortBy, String descending, String search) {
        Pageable pageable = null;
        if (sortBy.trim().length() <= 0) {
            pageable = PageRequest.of(page - 1, size, Sort.by("id").descending());
        }
        if (descending.equals("asc")) {
            pageable = PageRequest.of(page - 1, size, Sort.by(sortBy).ascending());
        } else if (descending.equals("desc")) {
            pageable = PageRequest.of(page - 1, size, Sort.by(sortBy).descending());
        }
        Page<Brand> brandsPage = branRepository.getAllByBrand(pageable,search);
        List<BrandDTO> brandDTOS = new ArrayList<>();
        brandsPage.toList().forEach(brand ->brandDTOS.add(branConverter.convertToDTO(brand)) );
        Map<String, Object> map = new HashMap<>();
        map.put("brands", brandDTOS);
        map.put("totalPages", brandsPage.getTotalPages());
        map.put("totalElements", brandsPage.getTotalElements());
        map.put("currentPage", page);
        return map;
    }

    @Override
    public BrandDTO getBrandById(Long id) throws NotFoundException {
       try {
           return branConverter.convertToDTO(branRepository.getOne(id));
       }catch (Exception exception){
           throw new NotFoundException("Can't find Brand has Id "+id);
       }
    }

    @Override
    public BrandDTO insertBrand(BrandDTO brandDTO) throws CodeExistedException {
          Brand brand = new Brand();
          brand.setCreatedDate( new Date());
          brand.setModifiedDate(new Date());
          brand.setStatus((byte) 1);
          brand.setName(brandDTO.getName());
          brand.setCode(generateCode());
          brand.setDescription(brandDTO.getDescription());
          branRepository.save(brand);
          return branConverter.convertToDTO(brand);
    }

    @Override
    public BrandDTO updateBrand(BrandDTO brandDTO) throws Exception {
     try {
         Brand brand = branRepository.getOne(brandDTO.getId());
         brand.setModifiedDate(new Date());
         brand.setName(brandDTO.getName());
         brand.setStatus((byte) 1);
         brand.setDescription(brandDTO.getDescription());
         branRepository.save(brand);
         return branConverter.convertToDTO(brand);
     }
     catch (Exception exception){
       throw   new CodeExistedException("Duplicate Code. Try Again");
    }
    }

    @Override
    public Boolean deleteBrandById(List<Long> arrayID) throws Exception {
        int count = 0;
        if (arrayID.size() > 0) {
            for (Long id : arrayID
            ) {
                count++;
                Brand brand = branRepository.getOne(id);
                brand.setStatus((byte) 0);
                branRepository.save(brand);
            }
        }
        return count == arrayID.size();
    }

    @Override
    public Page<BrandDTO> page(Pageable pageable, String search) {
        Page<Brand> brands = branRepository.getAllByBrand(pageable,search);
        return brands.map(brand -> branConverter.convertToDTO(brand)) ;
    }

    @Override
    public boolean delete(long id) {
      try {
          Brand brand = branRepository.getOne(id);
          brand.setStatus((byte) 0);

          return true;
      }
      catch (Exception exception){
          return false;
      }
    }

    @Override
    public String generateCode() {
        Long codeNumber = 0L;
        String newCodeString;
        int index = 0;
        String getMaxCode = null;
        getMaxCode = branRepository.getMaxCodeBrand(index);
        do {
            getMaxCode = branRepository.getMaxCodeBrand(index);
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
        newCodeString = "NHO00" + codeNumber.toString();
        return newCodeString;
    }
}
