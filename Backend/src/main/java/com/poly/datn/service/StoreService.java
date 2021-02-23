package com.poly.datn.service;

import com.poly.datn.dto.StoreDTO;
import com.poly.datn.exception.CodeExistedException;
import com.poly.datn.exception.commonException.NotFoundException;

import java.util.List;
import java.util.Map;

public interface StoreService {
    public Map<String,Object> getListStore(int page, int size, String sortBy, String descending, String search);
    public StoreDTO getStoreById(Long id) throws NotFoundException;
    public StoreDTO insertStore(StoreDTO storeDTO) throws CodeExistedException;
    public StoreDTO updateStore(StoreDTO storeDTO,Long id) throws NotFoundException;
    public Boolean deleteStoreById(List<Long> arrayID) throws Exception;
    public String generateCode();
}
