package com.poly.datn.entity;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "depots", catalog = "datn", uniqueConstraints = @UniqueConstraint(columnNames = "code"))
public class Depot extends BaseEntity {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User users;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ward_code", nullable = false)
    private Ward wards;
    private String name;
    private String code;
    private String address;
    private Byte status;
    @Column(name = "status")
    public Byte getStatus() {
        return status;
    }
    @OneToMany(fetch = FetchType.LAZY,mappedBy = "depot")
    private List<DepotProduct> depotProducts;
    @OneToMany(fetch = FetchType.LAZY,mappedBy = "depot",cascade=CascadeType.ALL)
    private List<ReceiptDepot> receiptDepots;
    @OneToMany(fetch = FetchType.LAZY,mappedBy = "depot")
    private List<ExportDepot> exportDepots;
    public void setStatus(Byte status) {
        this.status = status;
    }

    public User getUsers() {
        return this.users;
    }

    public void setUsers(User users) {
        this.users = users;
    }


    public Ward getWards() {
        return this.wards;
    }

    public void setWards(Ward wards) {
        this.wards = wards;
    }

    @Column(name = "name", length = 200)
    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Column(name = "code", unique = true, nullable = false, length = 45)
    public String getCode() {
        return this.code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    @Column(name = "address", length = 500)
    public String getAddress() {
        return this.address;
    }

    public void setAddress(String address) {
        this.address = address;
    }


    public List<DepotProduct> getDepotProducts() {
        return depotProducts;
    }

    public void setDepotProducts(List<DepotProduct> depotProducts) {
        this.depotProducts = depotProducts;
    }

    public List<ReceiptDepot> getReceiptDepots() {
        return receiptDepots;
    }

    public void setReceiptDepots(List<ReceiptDepot> receiptDepots) {
        this.receiptDepots = receiptDepots;
    }

    public List<ExportDepot> getExportDepots() {
        return exportDepots;
    }

    public void setExportDepots(List<ExportDepot> exportDepots) {
        this.exportDepots = exportDepots;
    }
}
