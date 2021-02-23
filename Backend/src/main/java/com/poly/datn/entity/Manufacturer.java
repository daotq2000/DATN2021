package com.poly.datn.entity;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "manufacturers")
public class Manufacturer extends BaseEntity {


    private String name;
    private String description;
    @OneToMany(mappedBy = "manufacturer",cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    private List<ModelBike> modelBikes;
    @Column(name = "status",columnDefinition = "tinyint(5)")
    private Byte status;
    @Column(name = "code",length = 100,unique = true)
    private String code;

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

    public List<ModelBike> getModelBikes() {
        return modelBikes;
    }

    public void setModelBikes(List<ModelBike> modelBikes) {
        this.modelBikes = modelBikes;
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
}
