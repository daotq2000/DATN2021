package com.poly.datn.service.impl;

import com.poly.datn.converter.ServiceConverter;
import com.poly.datn.dto.ServiceDTO;
import com.poly.datn.exception.CodeExistedException;
import com.poly.datn.exception.commonException.NotFoundException;
import com.poly.datn.repository.ServiceRepository;


import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import com.poly.datn.entity.Service;
import javax.transaction.Transactional;
import java.util.*;

@org.springframework.stereotype.Service
@Transactional
public class ServiceImpl implements com.poly.datn.service.Service {
    private ServiceRepository serviceRepository;
    private ServiceConverter serviceConverter;
    @Autowired
    public ServiceImpl(ServiceRepository serviceRepository, ServiceConverter serviceConverter) {
        this.serviceRepository = serviceRepository;
        this.serviceConverter = serviceConverter;
    }

    @Override
    public Map<String, Object> getListService(int page, int size, String sortBy, String descending, String search) {
        Pageable pagination = null;
        if (sortBy.trim().length() <= 0) {
            pagination = PageRequest.of(page - 1, size, Sort.by("id").descending());
        }
        if (descending.equals("asc")) {
            pagination = PageRequest.of(page - 1, size, Sort.by(sortBy).ascending());
        } else if (descending.equals("desc")) {
            pagination = PageRequest.of(page - 1, size, Sort.by(sortBy).descending());
        }
        Page<com.poly.datn.entity.Service> servicePage = serviceRepository.getAllService(pagination,search);
        List<ServiceDTO> serviceDTOList = new ArrayList<>();
        servicePage.toList().forEach(service -> serviceDTOList.add(serviceConverter.convertToDTO(service)));
        Map<String, Object> map = new HashMap<>();
        map.put("services", serviceDTOList);
        map.put("totalPages", servicePage.getTotalPages());
        map.put("totalElements", servicePage.getTotalElements());
        map.put("currentPage", page);
        return map;
    }

    @Override
    public ServiceDTO getServiceById(Long id) throws NotFoundException {
        try {
            return serviceConverter.convertToDTO(serviceRepository.getOne(id));
        }catch (Exception exception){
            throw new NotFoundException("Can't find Service has Id "+id);
        }

    }

    @Override
    public ServiceDTO insertService(ServiceDTO serviceDTO) throws CodeExistedException {
        Service service = serviceConverter.convertToEntity(serviceDTO);
        service.setCreatedDate(new Date());
        service.setModifiedDate(new Date());
        return serviceConverter.convertToDTO(service);
    }

    @Override
    public ServiceDTO updateService(ServiceDTO serviceDTO, Long id) throws Exception {
        Service service = serviceRepository.getOne(id);
        service.setCreatedDate(service.getCreatedDate());
        service.setId(service.getId());
        service.setName(serviceDTO.getName());
        service.setCode(serviceDTO.getCode());
        service.setDescription(serviceDTO.getDescription());
        service.setPrice(serviceDTO.getPrice());
        service.setTime(serviceDTO.getTime());
        service.setTimeGuarantee(serviceDTO.getTimeGuarantee());
        service.setModifiedDate(new Date());
        service.setStatus(serviceDTO.getStatus());
        try {
            serviceRepository.save(service);
            return serviceConverter.convertToDTO(service);
        }catch (Exception e){
            throw new Exception("Cannot Update");
        }

    }
    
    @Override
    public Boolean deleteServiceById(List<Long> arrayID) throws Exception {
        int count = 0;
        if (arrayID.size() > 0) {
            for (Long id : arrayID
            ) {
                count++;
                serviceRepository.deleteDepotById(id);
            }
        }
        return count == arrayID.size();
    }

    @Override
    public String generateCode() {
        Long codeNumber = 0L;
        String newCodeString;
        int index = 0;
        String getMaxCode = null;
        getMaxCode = serviceRepository.getMaxCode(index);
        do {
            getMaxCode = serviceRepository.getMaxCode(index);
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
        newCodeString = "DV00" + codeNumber.toString();
        return newCodeString;
    }
}
