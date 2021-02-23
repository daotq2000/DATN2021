package com.poly.datn.entity;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "coupons")
public class Coupon extends BaseEntity {
    @Column(name = "code",length = 100)
    private String code;
    @Column(name = "name",length = 200)
    private String name;
    @Column(name = "description",columnDefinition = "text(5000)")
    private String description;
    @Column(name = "discount")
    private BigDecimal discount;
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "expire_date")
    private Date expiredDate;
    @Column(name = "quantity")
    private int quantity;
    @Column(name = "status")
    private byte status;
    @OneToMany(fetch = FetchType.LAZY,mappedBy = "coupon")
    private List<MaintenanceCard> maintenanceCards;

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getDiscount() {
        return discount;
    }

    public void setDiscount(BigDecimal discount) {
        this.discount = discount;
    }

    public Date getExpiredDate() {
        return expiredDate;
    }

    public void setExpiredDate(Date expiredDate) {
        this.expiredDate = expiredDate;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public byte getStatus() {
        return status;
    }

    public void setStatus(byte status) {
        this.status = status;
    }

    public List<MaintenanceCard> getMaintenanceCards() {
        return maintenanceCards;
    }

    public void setMaintenanceCards(List<MaintenanceCard> maintenanceCards) {
        this.maintenanceCards = maintenanceCards;
    }
}
