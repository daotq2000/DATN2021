package com.poly.datn.exception.maintenanceCardException;

public class CouponLargerTotalException extends Exception {
    private String message;
    public CouponLargerTotalException(String message){
        this.message = message;
    }

    @Override
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
