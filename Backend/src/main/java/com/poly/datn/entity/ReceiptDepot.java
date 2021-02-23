package com.poly.datn.entity;
import javax.persistence.*;
import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "receipt_depot", catalog = "datn")
public class ReceiptDepot extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "users_id")
    private User users;
    private String code;
    private Byte status;
    private BigDecimal amount;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "receiptDepot")
    private List<ReceiptDepotDetail> receiptDepotDetails;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "depot_id")
    private Depot depot;


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


    public List<ReceiptDepotDetail> getReceiptDepotDetails() {
        return this.receiptDepotDetails;
    }

    public void setReceiptDepotDetails(List<ReceiptDepotDetail> receiptDepotDetails) {
        this.receiptDepotDetails = receiptDepotDetails;
    }

    public Depot getDepot() {
        return depot;
    }

    public void setDepot(Depot depot) {
        this.depot = depot;
    }
}
