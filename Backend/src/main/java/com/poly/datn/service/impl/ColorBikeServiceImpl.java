package com.poly.datn.service.impl;

import com.poly.datn.converter.ColorBikeConverter;
import com.poly.datn.converter.ModelBikeConverter;
import com.poly.datn.dto.ColorBikeDTO;
import com.poly.datn.entity.ColorBike;
import com.poly.datn.exception.CodeExistedException;
import com.poly.datn.exception.commonException.NotFoundException;
import com.poly.datn.repository.ColorBikeRepository;
import com.poly.datn.repository.ModelBikeRepository;
import com.poly.datn.service.ColorBikeService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ColorBikeServiceImpl implements ColorBikeService {
    @Autowired
    ColorBikeRepository colorBikeRepository;
    @Autowired
    ColorBikeConverter colorBikeConverter;
    @Autowired
    ModelBikeConverter modelBikeConverter;
    @Autowired
    ModelBikeRepository modelBikeRepository;
    @Override
    public ColorBikeDTO getColorBikeById(Long id) throws NotFoundException {
        try {
            return colorBikeConverter.convertToDTO(colorBikeRepository.getOne(id));
        }catch (Exception exception){
            throw new NotFoundException("Can't find Brand has Id "+id);
        }
    }

    @Override
    public ColorBikeDTO insertColor(ColorBikeDTO colorBikeDTO) throws CodeExistedException {

       try {
           ColorBike colorBike = new ColorBike();
           colorBike.setCreatedDate(new Date());
           colorBike.setModifiedDate(new Date());
           colorBike.setCode(generateCode());
           colorBike.setStatus((byte) 1);
           colorBike.setName(colorBikeDTO.getName());
           colorBike.setModelBike(modelBikeRepository.getOne(colorBikeDTO.getModelBike().getId()));
           colorBikeRepository.save(colorBike);
           return colorBikeConverter.convertToDTO(colorBike);
       }catch (Exception exception){
           throw new CodeExistedException("Duplicate Code. Try Again");
       }
    }

    @Override
    public ColorBikeDTO updateColor(ColorBikeDTO colorBikeDTO,Long Id) throws Exception {
        try {
            ColorBike colorBike = colorBikeRepository.getOne(colorBikeDTO.getId());
            colorBike.setModifiedDate(new Date());
            colorBike.setStatus((byte) 1);
            colorBike.setName(colorBikeDTO.getName());
            colorBike.setModelBike(modelBikeConverter.convertEntity(colorBikeDTO.getModelBike()));
            colorBikeRepository.save(colorBike);
            return colorBikeConverter.convertToDTO(colorBike);
        }catch (Exception exception){
            throw new CodeExistedException("Duplicate Code. Try Again");
        }
    }

    @Override
    public Page<ColorBikeDTO> page(Pageable pageable, String search) {
        return null;
    }

    @Override
    public boolean delete(long id) {
        return false;
    }

    @Override
    public Boolean deleteColorById(List<Long> arrayID) throws Exception {
        int count = 0;
        if (arrayID.size() > 0) {
            for (Long id : arrayID
            ) {
                count++;
                ColorBike colorBike = colorBikeRepository.getOne(id);
                colorBike.setStatus((byte) 0);
                colorBikeRepository.save(colorBike);
            }
        }
        return count == arrayID.size();
    }

    @Override
    public Map<String, Object> getListColor(int page, int size, String sortBy, String descending, String search) {
        Pageable pageable = null;
        if (sortBy.trim().length() <= 0) {
            pageable = PageRequest.of(page - 1, size, Sort.by("id").descending());
        }
        if (descending.equals("asc")) {
            pageable = PageRequest.of(page - 1, size, Sort.by(sortBy).ascending());
        } else if (descending.equals("desc")) {
            pageable = PageRequest.of(page - 1, size, Sort.by(sortBy).descending());
        }
        Page<ColorBike> colorBikePage = colorBikeRepository.getAllByColor(pageable,search);
        List<ColorBikeDTO> colorBikeDTOS = new ArrayList<>();
        colorBikePage.toList().forEach(colorBike ->colorBikeDTOS.add(colorBikeConverter.convertToDTO(colorBike)) );
        Map<String, Object> map = new HashMap<>();
        map.put("colorBikes", colorBikeDTOS);
        map.put("totalPages", colorBikePage.getTotalPages());
        map.put("totalElements", colorBikePage.getTotalElements());
        map.put("currentPage", page);
        return map;
    }

    @Override
    public String generateCode() {
        Long codeNumber = 0L;
        String newCodeString;
        int index = 0;
        String getMaxCode = null;
        getMaxCode = colorBikeRepository.getMaxCodeColor(index);
        do {
            getMaxCode = colorBikeRepository.getMaxCodeColor(index);
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
        newCodeString = "MM000" + codeNumber.toString();
        return newCodeString;
    }

    @Override
    public List<ColorBikeDTO> getByModelBikeId(Long ModelBikeId) {
        List<ColorBikeDTO> colorBikeDTOS = new ArrayList<>();
        List<ColorBike> colorBikes = colorBikeRepository.getByModelBikeId(ModelBikeId);
        colorBikes.forEach(colorBike -> {
            colorBikeDTOS.add(colorBikeConverter.convertToDTO(colorBike));
        });
        return colorBikeDTOS;
    }
}
