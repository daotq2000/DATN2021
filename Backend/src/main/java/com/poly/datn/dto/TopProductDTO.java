package com.poly.datn.dto;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class TopProductDTO {
    ProductDTO productDTO;
    String total;
}
