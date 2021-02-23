package com.poly.datn.converter;

import com.poly.datn.dto.ServiceDTO;
import com.poly.datn.entity.Service;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ServiceConverter {
    @Autowired
    MaintenanceCardDetailConverter maintenanceCardDetailConverter;
    private ModelMapper modelMapper = new ModelMapper();
    public ServiceDTO convertToDTO(Service service) {
        ServiceDTO serviceDTO = new ServiceDTO();
        serviceDTO.setId(service.getId());
        serviceDTO.setName(service.getName());
        serviceDTO.setCode(service.getCode());
        serviceDTO.setModifiedDate(service.getModifiedDate());
        serviceDTO.setCreatedDate(service.getCreatedDate());
        serviceDTO.setDescription(service.getDescription());
        serviceDTO.setPrice(service.getPrice());
        serviceDTO.setTime(service.getTime());
        serviceDTO.setTimeGuarantee(service.getTimeGuarantee());
        serviceDTO.setStatus(service.getStatus());
//        serviceDTO.setMaintenanceCardDetails(maintenanceCardDetailConverter.convertListMaintenanceCardDetailDTO(service.getMaintenanceCardDetails()));
        return serviceDTO;
    }

    public Service convertToEntity(ServiceDTO serviceDTO) {
       return modelMapper.map(serviceDTO,Service.class);
    }

}
