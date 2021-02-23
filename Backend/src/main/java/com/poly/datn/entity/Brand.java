package com.poly.datn.entity;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "brands")
public class Brand  extends  BaseEntity{
    @Column(name = "code",nullable = false,length = 100)
    private String code;
    @Column(name = "name",nullable = false,length = 200)
    private String name;
    @Column(name = "description",columnDefinition = "text(5000)")
    private String description;
//    @OneToMany(fetch = FetchType.LAZY, mappedBy = "brands")
//    private List<Product> products;

    @Column(name = "status",columnDefinition = "tinyint(5)")
    private Byte status;

    public Byte getStatus() {
        return status;
    }

    public void setStatus(Byte status) {
        this.status = status;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

//    public List<Product> getProducts() {
//        return products;
//    }
//
//    public void setProducts(List<Product> products) {
//        this.products = products;
//    }
}
