package com.poly.datn.converter;

import com.poly.datn.dto.ColorBikeDTO;
import com.poly.datn.entity.ColorBike;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ColorBikeConverter {
    @Autowired ManufactorConvert manufactorConvert;
    @Autowired
    ModelBikeConverter modelBikeConverter;
    public ColorBikeDTO convertToDTO (ColorBike colorBike){
        ColorBikeDTO colorBikeDTO = new ColorBikeDTO();
        colorBikeDTO.setId(colorBike.getId());
        colorBikeDTO.setCreatedDate(colorBike.getCreatedDate());
        colorBikeDTO.setModifiedDate(colorBike.getCreatedDate());
        colorBikeDTO.setCode(colorBike.getCode());
        if(colorBike.getModelBike() != null){
            colorBikeDTO.setModelBike(modelBikeConverter.convertToDTO(colorBike.getModelBike()));
        }
        colorBikeDTO.setName(colorBike.getName());
        return  colorBikeDTO;
    }
    public ColorBike convertEntity(ColorBikeDTO colorBikeDTO){
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(colorBikeDTO,ColorBike.class);
    }
}
