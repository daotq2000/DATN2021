package com.poly.datn.service;

import com.poly.datn.exception.CodeExistedException;
import com.poly.datn.exception.commonException.NotFoundException;
import com.poly.datn.dto.DepotDTO;


import java.util.List;
import java.util.Map;

public interface DepotService {
    public Map<String,Object> getListDepot(int page, int size, String sortBy, String descending, String search);
    public DepotDTO getDepotById(Long id) throws NotFoundException;
    public DepotDTO insertDepot(DepotDTO depotDTO,Boolean addAlLProduct) throws CodeExistedException;
    public DepotDTO updateDepot(DepotDTO depotDTO,Long id) throws NotFoundException;
    public Boolean deleteDepotById(List<Long> arrayID) throws Exception;
    public String generateCode();
    public Map<String,Object> getListProductByDepotId(int page, int size, String sortBy, String descending, String search);
}
