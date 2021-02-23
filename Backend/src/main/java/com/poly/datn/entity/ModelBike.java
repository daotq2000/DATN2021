package com.poly.datn.entity;

import lombok.ToString;

import javax.persistence.*;
import java.util.List;
@ToString
@Entity
@Table(name = "model_bikes")
public class ModelBike extends BaseEntity {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "manufacturer_id")
    private Manufacturer manufacturer;
    private String name;
    private String year;
    @OneToMany(mappedBy = "modelBike", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ColorBike> colorBikes;
    @Column(name = "status", columnDefinition = "tinyint(5)")
    private Byte status;

    @Column(name = "code", length = 100, unique = true)
    private String code;

    public Manufacturer getManufacturer() {
        return manufacturer;
    }

    public void setManufacturer(Manufacturer manufacturer) {
        this.manufacturer = manufacturer;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public List<ColorBike> getColorBikes() {
        return colorBikes;
    }

    public void setColorBikes(List<ColorBike> colorBikes) {
        this.colorBikes = colorBikes;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Byte getStatus() {
        return status;
    }

    public void setStatus(Byte status) {
        this.status = status;
    }
}
