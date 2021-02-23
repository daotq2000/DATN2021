package com.poly.datn.dto;

import com.poly.datn.entity.Product;
import com.poly.datn.entity.Supplier;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class SupplierProductDTO extends BaseDTO {
    private Product products;
    private Supplier supplier;
}
