package com.poly.datn.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;
import java.util.List;
@Getter
@Setter
@ToString
public class ExportDepotDTO extends BaseDTO {
    private UserDTO users;
    private String code;
    private Byte status;
    private StoreDTO store;
    private BigDecimal amount;
    private DepotDTO depot;
    private List<ExportDepotDetailDTO> exportDepotDetails ;

}
