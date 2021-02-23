package com.poly.datn.converter;

import com.poly.datn.dto.RequestDetailDTO;
import com.poly.datn.entity.RequestDetail;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class RequestDetailConverter {
    @Autowired
    private ProductConverter productConverter;
    private final ModelMapper modelMapper = new ModelMapper();
    public RequestDetailDTO convertToDTO(RequestDetail requestDetail){
        RequestDetailDTO requestDetailDTO = new RequestDetailDTO();
        requestDetailDTO.setId(requestDetail.getId());
        requestDetailDTO.setCreatedDate(requestDetail.getCreatedDate());
        requestDetailDTO.setModifiedDate(requestDetail.getModifiedDate());
        requestDetailDTO.setQuantity(requestDetail.getQuantity());
        requestDetailDTO.setProduct(productConverter.convertToDTO(requestDetail.getProducts()));
        return requestDetailDTO;
    }
    public RequestDetail convertToEntity(RequestDetailDTO requestDetailDTO){
        return modelMapper.map(requestDetailDTO,RequestDetail.class);
    }
    public RequestDetailDTO convertToAllDependenciesDTO(RequestDetail requestDetail){
        return modelMapper.map(requestDetail,RequestDetailDTO.class);
    }
    public List<RequestDetailDTO> convertToListDTO(List<RequestDetail> list){
        List<RequestDetailDTO> requestDetailDTOS = new ArrayList<>();
        for (RequestDetail requestDetail : list) {
            requestDetailDTOS.add(convertToDTO(requestDetail));
        }
        return requestDetailDTOS;
    }
}
