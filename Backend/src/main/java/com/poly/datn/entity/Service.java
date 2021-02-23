package com.poly.datn.entity;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "services")
public class Service extends BaseEntity {
    @Column(name = "code",length = 100,unique = true)
    private String code;
    @Column(name = "name", length = 200)
    private String name;
    @Column(name = "price")
    private BigDecimal price;
    @Column(name = "time_finish")
    private String time;
    @Column(name = "description",columnDefinition = "text(5000)")
    private String description;
    @Column(name = "time_guarantee")
    private int timeGuarantee;
    @Column(name = "status")
    private Byte status;

    public Byte getStatus() {
        return status;
    }

    public void setStatus(Byte status) {
        this.status = status;
    }

    @OneToMany(fetch = FetchType.LAZY,mappedBy = "service")
    public List<MaintenanceCardDetail> maintenanceCardDetails;

    public List<MaintenanceCardDetail> getMaintenanceCardDetails() {
        return maintenanceCardDetails;
    }

    public void setMaintenanceCardDetails(List<MaintenanceCardDetail> maintenanceCardDetails) {
        this.maintenanceCardDetails = maintenanceCardDetails;
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

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getTimeGuarantee() {
        return timeGuarantee;
    }

    public void setTimeGuarantee(int timeGuarantee) {
        this.timeGuarantee = timeGuarantee;
    }
}
