package com.poly.datn.service;

import com.poly.datn.dto.ManufactureDTO;
import com.poly.datn.exception.CodeExistedException;
import com.poly.datn.exception.commonException.NotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Map;

public interface ManufacturerService {
    public Map<String,Object> getListManufacturer(int page, int size, String sortBy, String descending, String search);
    public ManufactureDTO getManufacturerById(Long id) throws NotFoundException;
    public ManufactureDTO insertManufacturer(ManufactureDTO manufactureDTO) throws CodeExistedException;
    public ManufactureDTO updateManufacturer(ManufactureDTO manufactureDTO,Long id) throws Exception;
    public Boolean deleteManufacturerById(List<Long> arrayID) throws Exception;
    Page<ManufactureDTO> page(Pageable pageable, String s);
    boolean delete(long id);
    public String generateCode();
}
