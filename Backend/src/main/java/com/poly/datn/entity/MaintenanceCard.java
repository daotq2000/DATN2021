package com.poly.datn.entity;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "maintenance_cards")
public class MaintenanceCard extends BaseEntity{

    @Column(name = "code", nullable = false,length = 11,unique = true)
    private String code;

    @Column(name = "plates_number", nullable = false,length = 11)
    private String platesNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "color_bike_id")
    private ColorBike colorBike;

    @ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.MERGE)
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "repairman_id")
    private User repairman;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "coordinator_id")
    private User coordinator;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "coupon_id")
    private Coupon coupon;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "store_id")
    private Store store;

    @Column(name = "description", columnDefinition = "text(5000)")
    private String description;

    @Column(name = "price")
    private BigDecimal price;

    @Column(name = "work_status")
    private byte workStatus;

    @Column(name = "pay_status")
    private byte payStatus;

    @Column(name = "model", length = 50)
    private String model;

    @Column(name = "color", length = 50)
    private String color;

    @Column(name = "returned",columnDefinition = "bit default 0")
    private boolean returned;

    @Column(name = "total_time")
    private Float totalTime;

    @Column(name = "time_left")
    private Float timeLeft;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "return_date")
    private Date returnDate;

    @OneToMany(mappedBy = "maintenanceCard", cascade = CascadeType.ALL)
    private List<MaintenanceCardDetail> maintenanceCardDetails;

    @OneToMany(mappedBy = "maintenanceCard", cascade = CascadeType.ALL)
    private List<PaymentHistory> paymentHistories;

    @Column(name = "time_start")
    @Temporal(TemporalType.TIMESTAMP)

    private Date timeStart;

    @Column(name = "original_time")
    private float originalTime;

    @Column(name = "is_delete",columnDefinition = "bit default 0")
    private boolean isDelete;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "return_date_customer", length = 19)
    private Date returnDateCustomer;

    public List<MaintenanceCardDetail> getMaintenanceCardDetails() {
        return maintenanceCardDetails;
    }

    public void setMaintenanceCardDetails(List<MaintenanceCardDetail> maintenanceCardDetails) {
        this.maintenanceCardDetails = maintenanceCardDetails;
    }

    public List<PaymentHistory> getPaymentHistories() {
        return paymentHistories;
    }

    public void setPaymentHistories(List<PaymentHistory> paymentHistories) {
        this.paymentHistories = paymentHistories;
    }

    public String getPlatesNumber() {
        return platesNumber;
    }

    public void setPlatesNumber(String platesNumber) {
        this.platesNumber = platesNumber;
    }


    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public User getRepairman() {
        return repairman;
    }

    public void setRepairman(User repairman) {
        this.repairman = repairman;
    }

    public User getCoordinator() {
        return coordinator;
    }

    public void setCoordinator(User coordinator) {
        this.coordinator = coordinator;
    }

    public boolean isReturned() {
        return returned;
    }

    public void setReturned(boolean returned) {
        this.returned = returned;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public boolean isDelete() {
        return isDelete;
    }

    public void setDelete(boolean delete) {
        isDelete = delete;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public byte getWorkStatus() {
        return workStatus;
    }

    public void setWorkStatus(byte workStatus) {
        this.workStatus = workStatus;
    }

    public byte getPayStatus() {
        return payStatus;
    }

    public void setPayStatus(byte payStatus) {
        this.payStatus = payStatus;
    }

    public Store getStore() {
        return store;
    }

    public void setStore(Store store) {
        this.store = store;
    }

    public Coupon getCoupon() {
        return coupon;
    }

    public void setCoupon(Coupon coupon) {
        this.coupon = coupon;
    }

    public Float getTotalTime() {
        return totalTime;
    }

    public void setTotalTime(Float totalTime) {
        this.totalTime = totalTime;
    }

    public Date getTimeStart() {
        return timeStart;
    }

    public void setTimeStart(Date timeStart) {
        this.timeStart = timeStart;
    }

    public Float getTimeLeft() {
        return timeLeft;
    }

    public void setTimeLeft(Float timeLeft) {
        this.timeLeft = timeLeft;
    }

    public Date getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(Date returnDate) {
        this.returnDate = returnDate;
    }

    public ColorBike getColorBike() {
        return colorBike;
    }

    public void setColorBike(ColorBike colorBike) {
        this.colorBike = colorBike;
    }

    public float getOriginalTime() {
        return originalTime;
    }

    public void setOriginalTime(float originalTime) {
        this.originalTime = originalTime;
    }

    public Date getReturnDateCustomer() {
        return returnDateCustomer;
    }

    public void setReturnDateCustomer(Date returnDateCustomer) {
        this.returnDateCustomer = returnDateCustomer;
    }
}
