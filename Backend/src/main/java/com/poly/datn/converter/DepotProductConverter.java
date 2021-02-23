package com.poly.datn.converter;

import com.poly.datn.dto.DepotProductDTO;
import com.poly.datn.entity.DepotProduct;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class DepotProductConverter {
    @Autowired ProductConverter productConverter;
public DepotProductDTO convertToDTO(DepotProduct depotProduct){

//    ModelMapper modelMapper = new ModelMapper();
    DepotProductDTO depotProduct1 = new DepotProductDTO();
    depotProduct1.setId(depotProduct.getId());
    depotProduct.setModifiedDate(depotProduct.getModifiedDate());
    depotProduct.setCreatedDate(depotProduct.getModifiedDate());
    depotProduct.setQuantity(depotProduct1.getQuantity());
    depotProduct1.setProduct(productConverter.convertToDTO(depotProduct.getProduct()));
     return depotProduct1;
}
    public DepotProduct convertToEntity(DepotProductDTO depotProductDTO){
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(depotProductDTO,DepotProduct.class);
    }
    public List<DepotProductDTO> convertList(List<DepotProduct> list){
    List<DepotProductDTO> depotProductDTOS = new ArrayList<>();
    list.forEach(depotProduct -> depotProductDTOS.add(convertToDTO(depotProduct)));
    return depotProductDTOS;
    }
}
