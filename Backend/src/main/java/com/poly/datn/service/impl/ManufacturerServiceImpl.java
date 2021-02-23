package com.poly.datn.service.impl;





import com.poly.datn.converter.ManufactorConvert;
import com.poly.datn.dto.ManufactureDTO;
import com.poly.datn.entity.Manufacturer;
import com.poly.datn.exception.CodeExistedException;
import com.poly.datn.exception.commonException.NotFoundException;
import com.poly.datn.repository.ManufactureRepository;
import com.poly.datn.service.ManufacturerService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ManufacturerServiceImpl implements ManufacturerService {
    @Autowired
    ManufactureRepository manufactureRepository;
    @Autowired
    ManufactorConvert manufactorConvert;
    @Override
    public Map<String, Object> getListManufacturer(int page, int size, String sortBy, String descending, String search) {
        Pageable pageable = null;
        if (sortBy.trim().length() <= 0) {
            pageable = PageRequest.of(page - 1, size, Sort.by("id").descending());
        }
        if (descending.equals("asc")) {
            pageable = PageRequest.of(page - 1, size, Sort.by(sortBy).ascending());
        } else if (descending.equals("desc")) {
            pageable = PageRequest.of(page - 1, size, Sort.by(sortBy).descending());
        }
        Page<Manufacturer> manufacturerPage = manufactureRepository.getAll(pageable,search);
        List<ManufactureDTO> manufactureDTOS = new ArrayList<>();
        manufacturerPage.toList().forEach(manufacturer ->manufactureDTOS.add(manufactorConvert.convertToDTO(manufacturer)) );
        Map<String, Object> map = new HashMap<>();
        map.put("manufacturer", manufactureDTOS);
        map.put("totalPages", manufacturerPage.getTotalPages());
        map.put("totalElements", manufacturerPage.getTotalElements());
        map.put("currentPage", page);
        return map;
    }

    @Override
    public ManufactureDTO getManufacturerById(Long id) throws NotFoundException {
        try {
            return manufactorConvert.convertToDTO(manufactureRepository.getOne(id));
        }catch (Exception exception){
            throw new NotFoundException("Can't find manufacture has Id "+id);
        }
    }

    @Override
    public ManufactureDTO insertManufacturer(ManufactureDTO manufactureDTO) throws CodeExistedException {
        try {
            Manufacturer manufacturer = new Manufacturer();
            manufacturer.setCode(generateCode());
            manufacturer.setCreatedDate(new Date());
            manufacturer.setModifiedDate(new Date());
            manufacturer.setStatus((byte) 1);
            manufacturer.setName(manufactureDTO.getName());
            manufacturer.setDescription(manufactureDTO.getDescription());
            manufactureRepository.save(manufacturer);
            return manufactorConvert.convertToDTO(manufacturer);
        }catch (Exception exception){
            throw new CodeExistedException("code");
        }
    }

    @Override
    public ManufactureDTO updateManufacturer(ManufactureDTO manufactureDTO,Long id) throws Exception {
        try {
            Manufacturer manufacturer = manufactureRepository.getOne(id);
            manufacturer.setModifiedDate(new Date());
            manufacturer.setStatus((byte) 1);
            manufacturer.setName(manufactureDTO.getName());
            manufacturer.setDescription(manufactureDTO.getDescription());
            manufactureRepository.save(manufacturer);
            return manufactorConvert.convertToDTO(manufacturer);
        }catch (Exception exception){
            throw new CodeExistedException("code");
        }
    }


    @Override
    public Boolean deleteManufacturerById(List<Long> arrayID) throws Exception {
        int count = 0;
        if (arrayID.size() > 0) {
            for (Long id : arrayID
            ) {
                count++;
                Manufacturer manufacturer = manufactureRepository.getOne(id);
                manufacturer.setStatus((byte) 0);
                manufactureRepository.save(manufacturer);
            }
        }
        return count == arrayID.size();
    }

    @Override
    public Page<ManufactureDTO> page(Pageable pageable, String s) {
        return null;
    }

    @Override
    public boolean delete(long id) {
        return false;
    }

    @Override
    public String generateCode() {
        Long codeNumber = 0L;
        String newCodeString;
        int index = 0;
        String getMaxCode = null;
        getMaxCode = manufactureRepository.getMaxCode(index);
        do {
            getMaxCode = manufactureRepository.getMaxCode(index);
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
        newCodeString = "HXO00" + codeNumber.toString();
        return newCodeString;
    }
}
