package com.poly.datn.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@ToString
public class ServiceDTO extends BaseDTO {
    private String code;
    private String name;
    private BigDecimal price;
    private String time;
    private String description;
    private int timeGuarantee;
    private List<MaintenanceCardDetailDTO> maintenanceCardDetails;
    private Byte status;
}
