package com.poly.datn.entity;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "export_depot", catalog = "datn")
public class ExportDepot extends BaseEntity {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User users;
    private String code;
    private Byte status;
    private BigDecimal amount;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "depot_id")
    private Depot depot;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "store_id")
    private Store store;

    @Column(name = "is_delete")
    private boolean isDelete;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "exportDepot",cascade = CascadeType.ALL)
    private List<ExportDepotDetail> exportDepotDetails ;


    public User getUsers() {
        return this.users;
    }

    public void setUsers(User users) {
        this.users = users;
    }

    @Column(name = "code", length = 100,unique = true)
    public String getCode() {
        return this.code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    @Column(name = "status")
    public Byte getStatus() {
        return this.status;
    }

    public void setStatus(Byte status) {
        this.status = status;
    }

    @Column(name = "amount")
    public BigDecimal getAmount() {
        return this.amount;
    }




    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }
    public List<ExportDepotDetail> getExportDepotDetails() {
        return this.exportDepotDetails;
    }

    public void setExportDepotDetails(List<ExportDepotDetail> exportDepotDetails) {
        this.exportDepotDetails = exportDepotDetails;
    }

    public Depot getDepot() {
        return depot;
    }

    public void setDepot(Depot depot) {
        this.depot = depot;
    }

    public Store getStore() {
        return store;
    }

    public void setStore(Store store) {
        this.store = store;
    }

    public boolean isDelete() {
        return isDelete;
    }

    public void setDelete(boolean delete) {
        isDelete = delete;
    }
}
