package com.poly.datn.converter;

import com.poly.datn.dto.CategoryDTO;
import com.poly.datn.entity.Category;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class CategoryConverter {
    public CategoryDTO convertToDTO(Category category){
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(category, CategoryDTO.class);
    }
    public Category convertToEntity(CategoryConverter categoryDTO){
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(categoryDTO,Category.class);
    }
}
