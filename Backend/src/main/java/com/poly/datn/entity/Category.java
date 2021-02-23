package com.poly.datn.entity;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "categories")
public class Category extends BaseEntity {
    @Column(name = "code",length = 100,unique = true)
    private String code;
    @Column(name = "name",length = 200)
    private String name;
    @Column(name = "description",columnDefinition = "text(5000)")
    private String description;
    @Column(name = "status")
    private byte status;
    @OneToMany(fetch = FetchType.LAZY,mappedBy = "category")
    private List<Product> products;
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

    public byte getStatus() {
        return status;
    }

    public void setStatus(byte status) {
        this.status = status;
    }
}
