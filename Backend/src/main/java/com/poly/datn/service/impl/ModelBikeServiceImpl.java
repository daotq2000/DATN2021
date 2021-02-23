package com.poly.datn.service.impl;

import com.poly.datn.converter.ManufactorConvert;
import com.poly.datn.converter.ModelBikeConverter;
import com.poly.datn.dto.ModelBikeDTO;
import com.poly.datn.entity.Color;
import com.poly.datn.entity.ModelBike;
import com.poly.datn.exception.CodeExistedException;
import com.poly.datn.exception.commonException.NotFoundException;
import com.poly.datn.repository.ModelBikeRepository;
import com.poly.datn.service.ModelBikeService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ModelBikeServiceImpl implements ModelBikeService {
    @Autowired
    ModelBikeRepository modelBikeRepository;
    @Autowired
    ModelBikeConverter modelBikeConverter;
    @Autowired
    ManufactorConvert manufactorConvert;
    @Override
    public Map<String, Object> getListModelBikeDTO(int page, int size, String sortBy, String descending, String search) {
        Pageable pageable = null;
        if (sortBy.trim().length() <= 0) {
            pageable = PageRequest.of(page - 1, size, Sort.by("id").descending());
        }
        if (descending.equals("asc")) {
            pageable = PageRequest.of(page - 1, size, Sort.by(sortBy).ascending());
        } else if (descending.equals("desc")) {
            pageable = PageRequest.of(page - 1, size, Sort.by(sortBy).descending());
        }
        Page<ModelBike> modelBikePage = modelBikeRepository.getAll(pageable,search);
        List<ModelBikeDTO> modelBikeDTOS = new ArrayList<>();
        modelBikePage.toList().forEach(modelBike ->modelBikeDTOS.add(modelBikeConverter.convertToDTO(modelBike)) );
        Map<String, Object> map = new HashMap<>();
        map.put("modelBikes", modelBikeDTOS);
        map.put("totalPages", modelBikePage.getTotalPages());
        map.put("totalElements", modelBikePage.getTotalElements());
        map.put("currentPage", page);
        return map;
    }

    @Override
    public ModelBikeDTO getModelBikeDTOById(Long id) throws NotFoundException {
        try {
            return modelBikeConverter.convertToDTO(modelBikeRepository.getOne(id));
        }catch (Exception exception){
            throw new NotFoundException("Can't find Brand has Id "+id);
        }
    }

    @Override
    public ModelBikeDTO insertModelBikeDTO(ModelBikeDTO modelBikeDTO) throws CodeExistedException {
        try {
           ModelBike modelBike = new ModelBike();
           modelBike.setCode(generateCode());
           modelBike.setCreatedDate(new Date());
           modelBike.setModifiedDate(new Date());
           modelBike.setStatus((byte) 1);
           modelBike.setYear(modelBikeDTO.getYear());
           modelBike.setName(modelBikeDTO.getName());
            modelBike.setManufacturer(manufactorConvert.convertEntity(modelBikeDTO.getManufacture()));
           modelBikeRepository.save(modelBike);
           return modelBikeConverter.convertToDTO(modelBike);

        }catch (Exception exception){
            throw new CodeExistedException("Duplicate Code. Try Again");
        }
    }

    @Override
    public ModelBikeDTO updateModelBikeDTO(ModelBikeDTO modelBikeDTO, Long id) throws Exception {
        try {
            ModelBike modelBike = modelBikeRepository.getOne(id);
            modelBike.setModifiedDate(new Date());
            modelBike.setStatus((byte) 1);
            modelBike.setManufacturer(manufactorConvert.convertEntity(modelBikeDTO.getManufacture()));
            modelBike.setName(modelBikeDTO.getName());
            modelBike.setYear(modelBikeDTO.getYear());
            modelBikeRepository.save(modelBike);
            return modelBikeConverter.convertToDTO(modelBike);
        }catch (Exception exception){
            throw new CodeExistedException("Duplicate Code. Try Again");
        }
    }

    @Override
    public Boolean deleteModelBikeDTOById(List<Long> arrayID) throws Exception {
        int count = 0;
        if (arrayID.size() > 0) {
            for (Long id : arrayID
            ) {
                count++;
                ModelBike modelBike = modelBikeRepository.getOne(id);
                modelBike.setStatus((byte) 0);
                modelBikeRepository.save(modelBike);
            }
        }
        return count == arrayID.size();
    }

    @Override
    public Page<ModelBikeDTO> page(Pageable pageable, String s) {
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
        getMaxCode = modelBikeRepository.getMaxCode(index);
        do {
            getMaxCode = modelBikeRepository.getMaxCode(index);
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
        newCodeString = "MX000" + codeNumber.toString();
        return newCodeString;
    }

    @Override
    public List<ModelBikeDTO> getByManufactureId(Long ManufactureId) {
        List<ModelBike> modelBikes = modelBikeRepository.getByManufacturerId(ManufactureId);
        List<ModelBikeDTO> list = new ArrayList<>();
        modelBikes.forEach(modelBike -> {
            list.add(modelBikeConverter.convertToDTO(modelBike));
        });
        return list;
    }

}
