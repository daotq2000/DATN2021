package com.poly.datn.converter;

import com.poly.datn.dto.BrandDTO;
import com.poly.datn.dto.CategoryDTO;
import com.poly.datn.dto.ColorDTO;
import com.poly.datn.dto.ProductDTO;
import com.poly.datn.entity.Brand;
import com.poly.datn.entity.Category;
import com.poly.datn.entity.Product;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ProductConverter {
    @Autowired BranConverter branConverter;
    @Autowired ColorConverter colorConverter;
    @Autowired CategoryConverter categoryConverter;
    @Autowired ManufactorConvert manufactorConvert;
    private final ModelMapper modelmapper = new ModelMapper();
    public ProductDTO convertToDTO(Product product) {
        ProductDTO productDTO = new ProductDTO();
        productDTO.setId(product.getId());
        productDTO.setName(product.getName());
        productDTO.setCode(product.getCode());
        productDTO.setUnit(product.getUnit());
        productDTO.setPricePerUnit(product.getPricePerUnit());
        productDTO.setQuantity(product.getQuantity());
        productDTO.setDescription(product.getDescription());
        productDTO.setImage(product.getImage());
        productDTO.setCreatedDate(product.getCreatedDate());
        productDTO.setModifiedDate(product.getModifiedDate());
        productDTO.setStatus(product.getStatus());
        productDTO.setType(product.getType());

        if(product.getManufacturer() != null){
            productDTO.setManufacture(manufactorConvert.convertToDTO(product.getManufacturer()));
        }
        if(product.getCategory() != null){
            productDTO.setCategory(categoryConverter.convertToDTO(product.getCategory()));
        }
        productDTO.setCostPrice(product.getCostPrice());

        return productDTO;
    }

    public Product convertToEntity(ProductDTO productDTO) {
        return modelmapper.map(productDTO, Product.class);
    }
}
