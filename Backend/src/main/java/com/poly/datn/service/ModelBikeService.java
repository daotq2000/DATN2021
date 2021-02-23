package com.poly.datn.service;

import com.poly.datn.dto.ModelBikeDTO;
import com.poly.datn.entity.ModelBike;
import com.poly.datn.exception.CodeExistedException;
import com.poly.datn.exception.commonException.NotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Map;

public interface ModelBikeService {
    public Map<String,Object> getListModelBikeDTO(int page, int size, String sortBy, String descending, String search);
    public ModelBikeDTO getModelBikeDTOById(Long id) throws NotFoundException;
    public ModelBikeDTO insertModelBikeDTO(ModelBikeDTO modelBikeDTO) throws CodeExistedException;
    public ModelBikeDTO updateModelBikeDTO(ModelBikeDTO modelBikeDTO,Long id) throws Exception;
    public Boolean deleteModelBikeDTOById(List<Long> arrayID) throws Exception;
    Page<ModelBikeDTO> page(Pageable pageable, String s);
    boolean delete(long id);
    public String generateCode();
    public List<ModelBikeDTO> getByManufactureId(Long ManufactureId);
}
