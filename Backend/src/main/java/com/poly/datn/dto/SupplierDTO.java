package com.poly.datn.dto;

import com.poly.datn.entity.SupplierProduct;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;
@ToString
@Getter
@Setter
public class SupplierDTO extends BaseDTO {
    private String code;

    private String name;

    private String phone;

    private String address;

    private String email;

    private String company;

    private String description;

    private byte status;

    private List<SupplierProductDTO> supplierProducts;
}
