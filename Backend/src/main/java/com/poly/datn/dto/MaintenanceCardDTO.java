package com.poly.datn.dto;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

public class MaintenanceCardDTO extends BaseDTO  {
    private float originalTime;

    private Date returnDateCustomer;

    private CouponDTO coupon;

    private ColorBikeDTO colorBike;

    private StoreDTO store;

    private String code;

    private String platesNumber;

    private CustomerDTO customer;

    private UserDTO repairman;

    private UserDTO coordinator;

    private String description;

    private boolean returned;

    private BigDecimal price;

    private byte workStatus;

    private byte payStatus;

    private Float totalTime;

    private Date timeStart;

    private Float timeLeft;

    private Date returnDate;

    private boolean isDelete;

    private List<MaintenanceCardDetailDTO> maintenanceCardDetails;

    private List<PaymentHistoryDTO> paymentHistories;

    private List<MaintenanceCardDetailStatusHistoryDTO> maintenanceCardDetailStatusHistories;

    public List<MaintenanceCardDetailStatusHistoryDTO> getMaintenanceCardDetailStatusHistories() {
        return maintenanceCardDetailStatusHistories;
    }

    public void setMaintenanceCardDetailStatusHistories(List<MaintenanceCardDetailStatusHistoryDTO> maintenanceCardDetailStatusHistories) {
        this.maintenanceCardDetailStatusHistories = maintenanceCardDetailStatusHistories;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getPlatesNumber() {
        return platesNumber;
    }

    public void setPlatesNumber(String platesNumber) {
        this.platesNumber = platesNumber;
    }

    public CustomerDTO getCustomer() {
        return customer;
    }

    public void setCustomer(CustomerDTO customer) {
        this.customer = customer;
    }

    public UserDTO getRepairman() {
        return repairman;
    }

    public void setRepairman(UserDTO repairman) {
        this.repairman = repairman;
    }

    public UserDTO getCoordinator() {
        return coordinator;
    }

    public void setCoordinator(UserDTO coordinator) {
        this.coordinator = coordinator;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isReturned() {
        return returned;
    }

    public void setReturned(boolean returned) {
        this.returned = returned;
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

    public List<MaintenanceCardDetailDTO> getMaintenanceCardDetails() {
        return maintenanceCardDetails;
    }

    public void setMaintenanceCardDetails(List<MaintenanceCardDetailDTO> maintenanceCardDetails) {
        this.maintenanceCardDetails = maintenanceCardDetails;
    }

    public List<PaymentHistoryDTO> getPaymentHistories() {
        return paymentHistories;
    }

    public void setPaymentHistories(List<PaymentHistoryDTO> paymentHistories) {
        this.paymentHistories = paymentHistories;
    }

    public MaintenanceCardDTO() {
    }

    public StoreDTO getStore() {
        return store;
    }

    public void setStore(StoreDTO store) {
        this.store = store;
    }

    public CouponDTO getCoupon() {
        return coupon;
    }

    public void setCoupon(CouponDTO coupon) {
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

    public ColorBikeDTO getColorBike() {
        return colorBike;
    }

    public void setColorBike(ColorBikeDTO colorBike) {
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

    public boolean isDelete() {
        return isDelete;
    }

    public void setDelete(boolean delete) {
        isDelete = delete;
    }

    public void setReturnDateCustomer(Date returnDateCustomer) {
        this.returnDateCustomer = returnDateCustomer;
    }
}
