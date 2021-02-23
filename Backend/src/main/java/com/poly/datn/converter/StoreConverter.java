package com.poly.datn.converter;

import com.poly.datn.dto.StoreDTO;
import com.poly.datn.entity.Store;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class StoreConverter {
    private final ModelMapper modelMapper = new ModelMapper();
    public StoreDTO convertToDTO(Store store){
        StoreDTO storeDTO = new StoreDTO();
        storeDTO.setId(store.getId());
        storeDTO.setCode(store.getCode());
        storeDTO.setName(store.getName());
        storeDTO.setAddress(store.getAddress());
        storeDTO.setDescription(store.getDescription());
        storeDTO.setCode(store.getCode());
        storeDTO.setPhone(store.getPhone());
        storeDTO.setCreatedDate(store.getCreatedDate());
        storeDTO.setModifiedDate(store.getModifiedDate());
        storeDTO.setStatus(store.getStatus());
      return storeDTO;
    }
    public Store convertToEntity(StoreDTO storeDTO){
        return modelMapper.map(storeDTO,Store.class);
    }
}
