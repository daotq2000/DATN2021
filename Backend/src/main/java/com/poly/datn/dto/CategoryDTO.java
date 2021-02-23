package com.poly.datn.dto;

import com.poly.datn.entity.Product;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;
@Getter
@Setter
@ToString
public class CategoryDTO extends BaseDTO {
    private String code;
    private String name;
    private String description;
    private byte status;
    private List<ProductDTO> products;
}
