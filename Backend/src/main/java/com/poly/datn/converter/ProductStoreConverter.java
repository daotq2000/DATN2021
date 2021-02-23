package com.poly.datn.converter;

import com.poly.datn.dto.ExportDepotDTO;
import com.poly.datn.dto.ProductStoreDTO;
import com.poly.datn.entity.ExportDepot;
import com.poly.datn.entity.ProductStore;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

public class ProductStoreConverter {
    @Autowired ProductConverter productConverter;
    public final ModelMapper modelMap =  new ModelMapper();
    public ProductStoreDTO convertToDTO(ProductStore productStore){
        ProductStoreDTO productStoreDTO = new ProductStoreDTO();
        productStoreDTO.setId(productStore.getId());
        productStoreDTO.setQuantity(productStore.getQuantity());
        productStoreDTO.setProducts(productConverter.convertToDTO(productStore.getProducts()));
        productStoreDTO.setCreatedDate(productStore.getCreatedDate());
        productStoreDTO.setModifiedDate(productStore.getModifiedDate());
        return productStoreDTO;
    }
    public ProductStore convertToEntity(ProductStoreDTO productStoreDTO){
        return modelMap.map(productStoreDTO,ProductStore.class);
    }
}
