package com.poly.datn.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class RequestDetailDTO extends BaseDTO{
    private ProductDTO product;
    private RequestDTO request;
    private Long quantity;
}
