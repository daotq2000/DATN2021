package com.sapo.qlsc.exception.userException;

public class DuplicateEmailException extends Exception {
    private String message;

    public DuplicateEmailException(String message) {
        this.message = message;
    }

    @Override
    public String toString() {
        return super.toString();
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
