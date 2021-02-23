package com.poly.datn.entity;

import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;
@Entity
@Table(name = "users")
public class User extends BaseEntity{

    @Column(name = "code", nullable = false,length = 100,unique = true)
    private String code;

    @Column(name = "email", nullable = false,length = 100,unique = true)
    private String email;

    @Column(name = "password", nullable = false,length = 255)
    private String password;

    @Column(name = "full_name", nullable = false,length = 200)
    private String fullName;

    @Column(name = "phone_number", nullable = false,length = 10)
    private String phoneNumber;

    @Column(name = "address", columnDefinition = "text(5000)")
    private String address;

    @Column(name = "status", nullable = false, columnDefinition = "tinyint default 0")
    private byte status;

    @OneToMany(mappedBy = "repairman",cascade = CascadeType.ALL)
    private List<MaintenanceCard> repairmanMaintenanceCards;

    @OneToMany(mappedBy = "coordinator",cascade = CascadeType.ALL)
    private List<MaintenanceCard> coordinatorMaintenanceCards;

    @Column(name = "role")
    private byte role;

    @OneToMany(mappedBy = "users",fetch = FetchType.LAZY)
    private List<Depot> depots;

    @OneToMany(mappedBy = "users",fetch = FetchType.LAZY)
    private List<ExportDepot> exportDepots;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "users")
    private List<Request> requests;

    @OneToMany(mappedBy = "users",fetch = FetchType.LAZY)
    private List<ReceiptDepot> receiptDepots;

    public byte getRole() {
        return role;
    }

    public void setRole(byte role) {
        this.role = role;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public List<MaintenanceCard> getRepairmanMaintenanceCards() {
        return repairmanMaintenanceCards;
    }

    public void setRepairmanMaintenanceCards(List<MaintenanceCard> repairmanMaintenanceCards) {
        this.repairmanMaintenanceCards = repairmanMaintenanceCards;
    }

    public List<MaintenanceCard> getCoordinatorMaintenanceCards() {
        return coordinatorMaintenanceCards;
    }

    public void setCoordinatorMaintenanceCards(List<MaintenanceCard> coordinatorMaintenanceCards) {
        this.coordinatorMaintenanceCards = coordinatorMaintenanceCards;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public byte getStatus() {
        return status;
    }

    public void setStatus(byte status) {
        this.status = status;
    }



}
