package com.poly.datn.service;

import com.poly.datn.dto.ServiceDTO;
import com.poly.datn.exception.CodeExistedException;
import com.poly.datn.exception.commonException.NotFoundException;


import java.util.List;
import java.util.Map;

public interface Service {
    public Map<String,Object> getListService(int page, int size, String sortBy, String descending, String search);
    public ServiceDTO getServiceById(Long id) throws NotFoundException;
    public ServiceDTO insertService(ServiceDTO serviceDTO) throws CodeExistedException;
    public ServiceDTO updateService(ServiceDTO serviceDTO,Long id) throws Exception;
    public Boolean deleteServiceById(List<Long> arrayID) throws Exception;
    public String generateCode();

}
