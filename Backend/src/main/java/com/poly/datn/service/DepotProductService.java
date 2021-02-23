package com.poly.datn.service;

import com.poly.datn.dto.DepotProductDTO;
import com.poly.datn.entity.DepotProduct;

import java.util.List;
import java.util.Map;

public interface DepotProductService {
    public DepotProductDTO insertDepotProduct(DepotProductDTO depotProductDTO);
    public DepotProductDTO updateDepotProduct(DepotProductDTO depotProductDTO,Long id) throws Exception;
    public boolean deleteDepotProduct(Long id);
    public Map<String,Object> getAllDepotProduct(int page, int size, String nameField, String order,Long DepotId);
}
