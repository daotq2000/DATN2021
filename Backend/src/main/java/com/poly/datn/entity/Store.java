package com.poly.datn.entity;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "stores")
public class Store extends BaseEntity {
    @Column(name = "code",length = 100,nullable = true)
    private String code;
    @Column(name = "name",length = 200,unique = true)
    private String name;
    @Column(name = "phone",length = 11)
    private String phone;
    @Column(name = "address",length = 200)
    private String address;
    @Column(name = "description",columnDefinition = "text(5000)")
    private String description;
    @Column(name = "status")
    private byte status;
    @OneToMany(mappedBy = "store",fetch = FetchType.LAZY)
    private List<ProductStore> productStores;

    @OneToMany(mappedBy = "store",fetch = FetchType.LAZY)
    private List<MaintenanceCard> maintenanceCards;

    @OneToMany(mappedBy = "store",fetch = FetchType.LAZY)
    private List<ExportDepot> exportDepots;

    public List<ProductStore> getProductStores() {
        return productStores;
    }

    public void setProductStores(List<ProductStore> productStores) {
        this.productStores = productStores;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public byte getStatus() {
        return status;
    }

    public void setStatus(byte status) {
        this.status = status;
    }

    public List<ExportDepot> getExportDepots() {
        return exportDepots;
    }

    public void setExportDepots(List<ExportDepot> exportDepots) {
        this.exportDepots = exportDepots;
    }

    public List<MaintenanceCard> getMaintenanceCards() {
        return maintenanceCards;
    }

    public void setMaintenanceCards(List<MaintenanceCard> maintenanceCards) {
        this.maintenanceCards = maintenanceCards;
    }
}
