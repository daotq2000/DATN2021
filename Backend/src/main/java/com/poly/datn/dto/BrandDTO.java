package com.poly.datn.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;
@ToString
@Getter
@Setter
public class BrandDTO extends BaseDTO {
    private String code;
    private String name;
    private String description;
    private List<ProductDTO> products;
    private Byte status;
}
