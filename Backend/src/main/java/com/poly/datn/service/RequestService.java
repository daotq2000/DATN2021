package com.poly.datn.service;

import com.poly.datn.dto.DepotDTO;
import com.poly.datn.dto.RequestDTO;
import com.poly.datn.exception.CodeExistedException;
import com.poly.datn.exception.commonException.NotFoundException;

import java.util.List;
import java.util.Map;

public interface RequestService {
    public Map<String,Object> getListRequest(int page, int size, String sortBy, String descending, String search,byte[] status);
    public RequestDTO getRequestById(Long id) throws NotFoundException;
    public RequestDTO insertRequest(RequestDTO requestDTO) throws CodeExistedException;
    public RequestDTO updateRequest(RequestDTO requestDTO,Long id) throws NotFoundException;
    public Boolean  deleteRequest(List<Long> arrayID) throws Exception;
    public String  generateCode();
}
