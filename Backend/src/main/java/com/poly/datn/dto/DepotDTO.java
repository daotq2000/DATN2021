package com.poly.datn.dto;

import com.poly.datn.entity.DepotProduct;
import com.poly.datn.entity.ExportDepot;
import com.poly.datn.entity.ReceiptDepot;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;
@Getter
@Setter
@ToString
public class DepotDTO extends BaseDTO{
    private UserDTO users;
    private WardDTO wards;
    private String name;
    private String code;
    private String address;
    private Byte status;
    private List<DepotProductDTO> depotProducts;
    private List<ReceiptDepotDTO> receiptDepots;
    private List<ExportDepotDTO> exportDepots;
}
