package com.poly.datn.entity;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "wards")
public class Ward {

    @Column(name = "name", length = 50)
    public String name;
    @Id
    @Column(name = "code_ward", length = 50)
    public String code;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "code_district")
    public District district;

    @OneToMany(mappedBy = "ward",cascade = CascadeType.ALL)
    public List<Customer> customers;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "wards")
    private List<Depot> depots;

    public List<Depot> getDepots() {
        return depots;
    }

    public void setDepots(List<Depot> depots) {
        this.depots = depots;
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

    public District getDistrict() {
        return district;
    }

    public void setDistrict(District district) {
        this.district = district;
    }

    public List<Customer> getCustomers() {
        return customers;
    }

    public void setCustomers(List<Customer> customers) {
        this.customers = customers;
    }
}
