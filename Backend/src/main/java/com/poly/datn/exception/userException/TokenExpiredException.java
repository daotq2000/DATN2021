package com.poly.datn.exception.userException;

public class TokenExpiredException extends Exception {
    String message;

    public TokenExpiredException(String message) {
        super(message);
    }

    @Override
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
