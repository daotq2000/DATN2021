package com.poly.datn.dto;

import com.poly.datn.entity.Depot;
import com.poly.datn.entity.Supplier;
import com.poly.datn.entity.User;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;
import java.util.List;
@Getter
@Setter
@ToString
public class ReceiptDepotDTO extends BaseDTO{
    private DepotDTO depot;
    private UserDTO users;
    private String code;
    private Byte status;
    private BigDecimal amount;
    private List<ReceiptDepotDetailDTO> receiptDepotDetails;
}
