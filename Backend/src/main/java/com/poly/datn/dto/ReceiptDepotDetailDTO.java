package com.poly.datn.dto;

import com.poly.datn.entity.Product;
import com.poly.datn.entity.ReceiptDepot;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ReceiptDepotDetailDTO extends BaseDTO {
    private ReceiptDepot receiptDepot;
    private Product products;
    private Long quantity;
}
