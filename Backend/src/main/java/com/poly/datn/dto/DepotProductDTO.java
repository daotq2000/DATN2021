package com.poly.datn.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class DepotProductDTO extends BaseDTO {
    private ProductDTO product;

    private DepotDTO depot;

    private Long quantity;

}
