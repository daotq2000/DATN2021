package com.poly.datn.entity;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "colors")
public class Color extends BaseEntity {
    @Column(name = "code",length = 100,unique = true)
    private String code;
    @Column(name = "name",length = 200)
    private String name;
    @Column(name = "status")
    private byte status;

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

    public byte getStatus() {
        return status;
    }

    public void setStatus(byte status) {
        this.status = status;
    }

}
