package com.poly.datn.service;


import com.poly.datn.dto.ColorDTO;
import com.poly.datn.exception.CodeExistedException;
import com.poly.datn.exception.commonException.NotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Map;

public interface ColorService {
    public ColorDTO getColorById(Long id) throws NotFoundException;
    public ColorDTO insertColor(ColorDTO colorDTO) throws CodeExistedException;
    public ColorDTO updateColor(ColorDTO colorDTO) throws Exception;
    Page<ColorDTO> page(Pageable pageable, String search);
    boolean delete(long id);
    public Boolean deleteColorById(List<Long> arrayID) throws Exception;
    public Map<String,Object> getListColor(int page, int size, String sortBy, String descending, String search);
    public String generateCode();
}

