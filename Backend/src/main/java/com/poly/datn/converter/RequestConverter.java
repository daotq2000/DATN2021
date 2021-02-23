package com.poly.datn.converter;

import com.poly.datn.dto.RequestDTO;
import com.poly.datn.entity.Request;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class RequestConverter {
private final ModelMapper modelMapper = new ModelMapper();
@Autowired UserConverter userConverter;
@Autowired RequestDetailConverter requestDetailConverter;
public RequestDTO convertToAllDependenciesDTO(Request request){
    RequestDTO requestDTO = new RequestDTO();
    requestDTO.setId(request.getId());
    requestDTO.setName(request.getName());
    requestDTO.setCode(request.getCode());
    request.setStatus(request.getStatus());
    requestDTO.setCreatedDate(request.getCreatedDate());
    requestDTO.setModifiedDate(request.getModifiedDate());
    requestDTO.setDesciption(request.getDesciption());
    requestDTO.setUsers(userConverter.convertToDTO(request.getUsers()));
    requestDTO.setRequestDetails(requestDetailConverter.convertToListDTO(request.getRequestDetails()));
    return requestDTO;
}
public Request convertToEntity(RequestDTO requestDTO){
    return modelMapper.map(requestDTO,Request.class);
}
public RequestDTO convertToDTO(Request request){
    RequestDTO requestDTO = new RequestDTO();
    requestDTO.setId(request.getId());
    requestDTO.setName(request.getName());
    requestDTO.setCode(request.getCode());
    request.setStatus(request.getStatus());
    requestDTO.setCreatedDate(request.getCreatedDate());
    requestDTO.setModifiedDate(request.getModifiedDate());
    requestDTO.setDesciption(request.getDesciption());
    requestDTO.setUsers(userConverter.convertToDTO(request.getUsers()));
    return requestDTO;
}

}
