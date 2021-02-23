package com.poly.datn.entity;

import lombok.ToString;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "products")
public class Product extends BaseEntity {

    @Column(name = "name", nullable = false, length = 100, unique = true)
    private String name;

    @Column(name = "code", nullable = false, length = 11, unique = true)
    private String code;

    @Column(name = "image", length = 255)
    private String image;

    @Column(name = "quantity", columnDefinition = "int default 0")
    private int quantity;

    @Column(name = "unit", length = 100)
    private String unit;

    @Column(name = "price_per_unit")
    private BigDecimal pricePerUnit;

    @Column(name = "description", columnDefinition = "text(5000)")
    private String description;

    @Column(name = "status", nullable = false)
    private byte status;

    @Column(name = "type")
    private byte type;
    @Column(name = "cost_price")
    private BigDecimal costPrice;

    public BigDecimal getCostPrice() {
        return costPrice;
    }

    public void setCostPrice(BigDecimal costPrice) {
        this.costPrice = costPrice;
    }

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private List<MaintenanceCardDetail> maintenanceCardDetails;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "products")
    private List<ExportDepotDetail> exportDepotDetails;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "manufacture_id")
    private Manufacturer manufacturer;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "products")
    private List<RequestDetail> requestDetails;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "products")
    private List<SupplierProduct> supplierProducts;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "products", cascade = CascadeType.ALL)
    private List<DepotProduct> depotProducts;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;


    @OneToMany(fetch = FetchType.LAZY, mappedBy = "products")
    private List<ProductStore> productStores;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "products", cascade = CascadeType.ALL)
    private List<ReceiptDepotDetail> receiptDepotDetails;


    public List<ProductStore> getProductStores() {
        return productStores;
    }

    public void setProductStores(List<ProductStore> productStores) {
        this.productStores = productStores;
    }


    public List<ExportDepotDetail> getExportDepotDetails() {
        return exportDepotDetails;
    }

    public void setExportDepotDetails(List<ExportDepotDetail> exportDepotDetails) {
        this.exportDepotDetails = exportDepotDetails;
    }

    public List<RequestDetail> getRequestDetails() {
        return requestDetails;
    }

    public void setRequestDetails(List<RequestDetail> requestDetails) {
        this.requestDetails = requestDetails;
    }

    public List<ReceiptDepotDetail> getReceiptDepotDetails() {
        return receiptDepotDetails;
    }

    public void setReceiptDepotDetails(List<ReceiptDepotDetail> receiptDepotDetails) {
        this.receiptDepotDetails = receiptDepotDetails;
    }

    public List<MaintenanceCardDetail> getMaintenanceCardDetails() {
        return maintenanceCardDetails;
    }

    public void setMaintenanceCardDetails(List<MaintenanceCardDetail> maintenanceCardDetails) {
        this.maintenanceCardDetails = maintenanceCardDetails;
    }


    public byte getType() {
        return type;
    }

    public void setType(byte type) {
        this.type = type;
    }

    public byte getStatus() {
        return status;
    }

    public void setStatus(byte status) {
        this.status = status;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public BigDecimal getPricePerUnit() {
        return pricePerUnit;
    }

    public void setPricePerUnit(BigDecimal pricePerUnit) {
        this.pricePerUnit = pricePerUnit;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<SupplierProduct> getSupplierProducts() {
        return supplierProducts;
    }

    public void setSupplierProducts(List<SupplierProduct> supplierProducts) {
        this.supplierProducts = supplierProducts;
    }

    public List<DepotProduct> getDepotProducts() {
        return depotProducts;
    }

    public void setDepotProducts(List<DepotProduct> depotProducts) {
        this.depotProducts = depotProducts;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }


    public Manufacturer getManufacturer() {
        return manufacturer;
    }

    public void setManufacturer(Manufacturer manufacturer) {
        this.manufacturer = manufacturer;
    }
}
