package com.poly.datn.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;
@ToString
@Getter
@Setter
public class ExpiredDTO extends BaseDTO {
    private ProductDTO products;
    private Long quantity;
    private Date expiredDate;
    private Byte type;
    private Byte status;
}
