package com.poly.datn.entity;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "color_bikes")
public class ColorBike extends BaseEntity {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "moder_bike_id")
    private ModelBike modelBike;
    @Column(name = "status",columnDefinition = "tinyint(5)")
    private Byte status;
    @Column(name = "code",length = 100,unique = true)
    private String code;
    private String name;

    @OneToMany(mappedBy = "colorBike",fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    private List<MaintenanceCard> maintenanceCards;

    public Byte getStatus() {
        return status;
    }

    public void setStatus(Byte status) {
        this.status = status;
    }

    public ModelBike getModelBike() {
        return modelBike;
    }

    public void setModelBike(ModelBike modelBike) {
        this.modelBike = modelBike;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public List<MaintenanceCard> getMaintenanceCards() {
        return maintenanceCards;
    }

    public void setMaintenanceCards(List<MaintenanceCard> maintenanceCards) {
        this.maintenanceCards = maintenanceCards;
    }
}
