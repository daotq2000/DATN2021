package com.poly.datn.service;

import com.poly.datn.dto.ColorBikeDTO;
import com.poly.datn.exception.CodeExistedException;
import com.poly.datn.exception.commonException.NotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Map;

public interface ColorBikeService {
    public ColorBikeDTO getColorBikeById(Long id) throws NotFoundException;
    public ColorBikeDTO insertColor(ColorBikeDTO colorBikeDTO) throws CodeExistedException;
    public ColorBikeDTO updateColor(ColorBikeDTO colorBikeDTO,Long id) throws Exception;
    Page<ColorBikeDTO> page(Pageable pageable, String search);
    boolean delete(long id);
    public Boolean deleteColorById(List<Long> arrayID) throws Exception;
    public Map<String,Object> getListColor(int page, int size, String sortBy, String descending, String search);
    public String generateCode();
    public List<ColorBikeDTO> getByModelBikeId(Long ModelBikeId);
}
