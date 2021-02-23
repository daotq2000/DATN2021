package com.poly.datn.dto;

import java.math.BigDecimal;

public class MaintenanceCardDetailDTO extends BaseDTO {

    private MaintenanceCardDTO maintenanceCard;
    private ServiceDTO service;
    private ProductDTO product;
    private boolean isFree;
    private byte status;

    private BigDecimal price;

    private int quantity;

    public MaintenanceCardDTO getMaintenanceCard() {
        return maintenanceCard;
    }

    public void setMaintenanceCard(MaintenanceCardDTO maintenanceCard) {
        this.maintenanceCard = maintenanceCard;
    }

    public ProductDTO getProduct() {
        return product;
    }

    public void setProduct(ProductDTO product) {
        this.product = product;
    }

    public byte getStatus() {
        return status;
    }

    public void setStatus(byte status) {
        this.status = status;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public ServiceDTO getService() {
        return service;
    }

    public void setService(ServiceDTO service) {
        this.service = service;
    }

    public boolean isFree() {
        return isFree;
    }

    public void setFree(boolean free) {
        isFree = free;
    }
}
