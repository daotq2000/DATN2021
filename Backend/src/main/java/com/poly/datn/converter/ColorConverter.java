package com.poly.datn.converter;

import com.poly.datn.dto.ColorDTO;
import com.poly.datn.entity.Color;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class ColorConverter {
 public ColorDTO convertToDTO(Color color){
     ModelMapper modelMapper = new ModelMapper();
     return modelMapper.map(color,ColorDTO.class);
 }
 public Color convertEntity(ColorDTO colorDTO){
     ModelMapper modelMapper = new ModelMapper();
     return modelMapper.map(colorDTO,Color.class);
 }
}
