package com.poly.datn.dto;

import com.poly.datn.entity.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;
import java.util.List;
@ToString
@Getter
@Setter
public class ProductDTO extends BaseDTO {
    private ManufactureDTO manufacture;

    private BrandDTO brands;

    private CategoryDTO category;

    private ColorDTO color;

    private String name;

    private String code;

    private String image;

    private int quantity;

    private String unit;

    private BigDecimal pricePerUnit;

    private String description;

    private BigDecimal costPrice;

    private byte status;

    private byte type;

    private List<MaintenanceCardDetailDTO> maintenanceCardDetailDTOS;

    private List<ExportDepotDetailDTO> exportDepotDetails;

    private List<RequestDetailDTO> requestDetails;

    private List<SupplierProductDTO> supplierProducts;

    private List<DepotProductDTO> depotProducts;

    private List<ProductStoreDTO> productStores;

    private List<ReceiptDepotDetailDTO> receiptDepotDetails;


}
