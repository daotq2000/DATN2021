package com.poly.datn.entity;

import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
@Entity
@Table(name = "request", catalog = "datn")
public class Request extends BaseEntity {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User users;
    private String code;
    private String name;
    private String desciption;
    private Byte status;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "request")
    private List<RequestDetail> requestDetails ;
    public User getUsers() {
        return this.users;
    }
    public void setUsers(User users) {
        this.users = users;
    }
    @Column(name = "code", length = 100,unique = true)
    public String getCode() {
        return this.code;
    }
    public void setCode(String code) {
        this.code = code;
    }
    @Column(name = "name", length = 500)
    public String getName() {
        return this.name;
    }
    public void setName(String name) {
        this.name = name;
    }
    @Column(name = "desciption", length = 5000)
    public String getDesciption() {
        return this.desciption;
    }
    public void setDesciption(String desciption) {
        this.desciption = desciption;
    }
    @Column(name = "status")
    public Byte getStatus() {
        return status;
    }
    public void setStatus(Byte status) {
        this.status = status;
    }
    public List<RequestDetail> getRequestDetails() {
        return requestDetails;
    }
    public void setRequestDetails(List<RequestDetail> requestDetails) {
        this.requestDetails = requestDetails;
    }
}
