package com.poly.datn.dto;

import com.poly.datn.entity.Product;
import com.poly.datn.entity.Store;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ProductStoreDTO extends BaseDTO{
    private ProductDTO products;
    private StoreDTO store;
    private int quantity;
}
