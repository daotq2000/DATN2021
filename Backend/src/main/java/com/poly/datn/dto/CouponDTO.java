package com.poly.datn.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@ToString
public class CouponDTO extends BaseDTO{
    private String code;
    private String name;
    private String description;
    private BigDecimal discount;
    private Date expiredDate;
    private int quantity;
    private byte status;
    private List<MaintenanceCardDTO> maintenanceCard;
}
