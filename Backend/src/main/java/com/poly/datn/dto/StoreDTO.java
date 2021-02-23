package com.poly.datn.dto;

import com.poly.datn.entity.ExportDepot;
import com.poly.datn.entity.ProductStore;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;
@Getter
@Setter
@ToString
public class StoreDTO extends BaseDTO {
    private String code;

    private String name;

    private String phone;

    private String address;

    private String description;

    private byte status;

    private List<ProductStoreDTO> productStores;

    private List<ExportDepotDTO> exportDepots;
}
