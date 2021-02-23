package com.poly.datn.service;

import com.poly.datn.dto.CategoryDTO;
import com.poly.datn.exception.CodeExistedException;
import com.poly.datn.exception.commonException.NotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Map;

public interface CategoryService {
    public Map<String,Object> getListManufacturer(int page, int size, String sortBy, String descending, String search);
    public CategoryDTO getCategoryById(Long id) throws NotFoundException;
    public CategoryDTO insertCategory(CategoryDTO categoryDTO) throws CodeExistedException;
    public CategoryDTO updateCategory(CategoryDTO categoryDTO,Long id) throws Exception;
    Page<CategoryDTO> page(Pageable pageable, String search);
    public Boolean deleteCategory(List<Long> arrayID) throws Exception;
    boolean delete(long id);
    public String generateCode();
}
