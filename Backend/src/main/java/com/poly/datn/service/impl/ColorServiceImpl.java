package com.poly.datn.service.impl;

import com.poly.datn.converter.ColorConverter;
import com.poly.datn.dto.ColorDTO;
import com.poly.datn.dto.StoreDTO;
import com.poly.datn.entity.Color;
import com.poly.datn.entity.Store;
import com.poly.datn.exception.CodeExistedException;
import com.poly.datn.exception.commonException.NotFoundException;
import com.poly.datn.repository.ColorRepository;
import com.poly.datn.service.ColorService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ColorServiceImpl implements ColorService {
    private ColorConverter colorConverter;
    private ColorRepository colorRepository;
    @Autowired
    private  ColorServiceImpl(ColorConverter colorConverter, ColorRepository colorRepository){
        this.colorConverter = colorConverter;
        this.colorRepository = colorRepository;
    }
    @Override
    public ColorDTO getColorById(Long id) throws NotFoundException {
        try {
            return colorConverter.convertToDTO(colorRepository.getOne(id));
        }catch (Exception exception){
            throw new NotFoundException("Can't find Brand has Id "+id);
        }
    }

    @Override
    public ColorDTO insertColor(ColorDTO colorDTO) throws CodeExistedException {
        Color color = new Color();
        color.setModifiedDate(new Date());
        color.setCreatedDate(new Date());
        color.setStatus((byte) 1);
        color.setCode(generateCode());
        color.setName(colorDTO.getName());
        colorRepository.save(color);
        return colorConverter.convertToDTO(color);
    }

    @Override
    public ColorDTO updateColor(ColorDTO colorDTO) throws Exception {
        Color color = colorRepository.getOne(colorDTO.getId());
        color.setModifiedDate(new Date());
        color.setName(colorDTO.getName());
        colorRepository.save(color);
        return colorConverter.convertToDTO(color);
    }


    @Override
    public Page<ColorDTO> page(Pageable pageable, String search) {
        Page<Color> colors = colorRepository.getAllByColor(pageable,search);
        return colors.map(color -> colorConverter.convertToDTO(color));
    }

    @Override
    public boolean delete(long id) {
    try {
        Color color = colorRepository.getOne(id);
        color.setStatus((byte) 0);
        return  true;
    }catch (Exception exception){
        return  false;
    }
    }

    @Override
    public Boolean deleteColorById(List<Long> arrayID) throws Exception {
        int count = 0;
        if (arrayID.size() > 0) {
            for (Long id : arrayID
            ) {
                count++;
                Color color = colorRepository.getOne(id);
                color.setStatus((byte) 0);
                colorRepository.save(color);
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
        Page<Color> colorsPage = colorRepository.getAllByColor(pageable,search);
        List<ColorDTO> colorDTOS = new ArrayList<>();
        colorsPage.toList().forEach(color ->colorDTOS.add(colorConverter.convertToDTO(color)) );
        Map<String, Object> map = new HashMap<>();
        map.put("colors", colorDTOS);
        map.put("totalPages", colorsPage.getTotalPages());
        map.put("totalElements", colorsPage.getTotalElements());
        map.put("currentPage", page);
        return map;
    }

    @Override
    public String generateCode() {
        Long codeNumber = 0L;
        String newCodeString;
        int index = 0;
        String getMaxCode = null;
        getMaxCode = colorRepository.getMaxCodeColor(index);
        do {
            getMaxCode = colorRepository.getMaxCodeColor(index);
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
