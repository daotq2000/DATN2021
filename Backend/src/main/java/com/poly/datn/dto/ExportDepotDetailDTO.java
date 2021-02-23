package com.poly.datn.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ExportDepotDetailDTO extends BaseDTO {
    private ExportDepotDTO exportDepot;
    private ProductDTO products;
    private Long quantity;

}
