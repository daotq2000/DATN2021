package com.poly.datn.service.impl;

import com.poly.datn.converter.CategoryConverter;
import com.poly.datn.dto.CategoryDTO;
import com.poly.datn.entity.Category;
import com.poly.datn.exception.CodeExistedException;
import com.poly.datn.exception.commonException.NotFoundException;
import com.poly.datn.repository.CategoryRepository;
import com.poly.datn.service.CategoryService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CategoryServiceImpl implements CategoryService {
    private CategoryConverter categoryConverter;
    private CategoryRepository categoryRepository;
    private CategoryServiceImpl(CategoryConverter categoryConverter,CategoryRepository categoryRepository){
        this.categoryRepository = categoryRepository;
        this.categoryConverter = categoryConverter;
    }

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
        Page<Category> categoryPage = categoryRepository.getAllByCategory(pageable,search);
        List<CategoryDTO> categoryDTOS = new ArrayList<>();
        categoryPage.toList().forEach(category ->categoryDTOS.add(categoryConverter.convertToDTO(category)));
        Map<String, Object> map = new HashMap<>();
        map.put("category", categoryDTOS);
        map.put("totalPages", categoryPage.getTotalPages());
        map.put("totalElements", categoryPage.getTotalElements());
        map.put("currentPage", page);
        return map;
    }

    @Override
    public CategoryDTO getCategoryById(Long id) throws NotFoundException {
        try {
            return categoryConverter.convertToDTO(categoryRepository.getOne(id));
        }catch (Exception exception){
            throw new NotFoundException("Can't find Category has Id "+id);
        }
    }

    @Override
    public CategoryDTO insertCategory(CategoryDTO categoryDTO) throws CodeExistedException {
    try {
        Category category  =  new Category();
        category.setCreatedDate(new Date());
        category.setModifiedDate(new Date());
        category.setCode(generateCode());
        category.setStatus((byte)1);
        category.setName(categoryDTO.getName());
        category.setDescription(categoryDTO.getDescription());
        categoryRepository.save(category);

        return categoryConverter.convertToDTO(category);
    } catch (Exception exception){
        throw new CodeExistedException("code");
    }
    }

    @Override
    public CategoryDTO updateCategory(CategoryDTO categoryDTO ,Long id) throws Exception {
     try {
         Category category  = categoryRepository.getOne(id);
         category.setModifiedDate(new Date());
         category.setName(categoryDTO.getName());
         category.setDescription(categoryDTO.getDescription());
         categoryRepository.save(category);
         return categoryConverter.convertToDTO(category);
     }catch (Exception exception){
         throw new CodeExistedException("code");
     }
    }

    @Override
    public Page<CategoryDTO> page(Pageable pageable, String search) {
        Page<Category> categories = categoryRepository.getAllByCategory(pageable,search);
        return categories.map(category -> categoryConverter.convertToDTO(category));
    }

    @Override
    public Boolean deleteCategory(List<Long> arrayID) throws Exception {
        int count = 0;
        if (arrayID.size() > 0) {
            for (Long id : arrayID
            ) {
                count++;
                 Category category = categoryRepository.getOne(id);
                category.setStatus((byte) 0);
                categoryRepository.save(category);
            }
        }
        return count == arrayID.size();
    }

    @Override
    public boolean delete(long id) {
        try {
            Category category = categoryRepository.getOne(id);
            category.setStatus((byte) 0);
            return  true;
        }catch (Exception exception){
            return false;
        }
    }


    @Override
    public String generateCode() {
        Long codeNumber = 0L;
        String newCodeString;
        int index = 0;
        String getMaxCode = null;
        getMaxCode = categoryRepository.getMaxCodeCategory(index);
        do {
            getMaxCode = categoryRepository.getMaxCodeCategory(index);
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
        newCodeString = "CTO00" + codeNumber.toString();
        return newCodeString;
    }

}
