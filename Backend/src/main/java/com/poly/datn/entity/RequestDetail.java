package com.poly.datn.entity;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
@Entity
@Table(name = "request_detail", catalog = "datn")
public class RequestDetail extends BaseEntity{
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_product")
    private Product products;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_request")
    private Request request;
    private Long quantity;

    public Product getProducts() {
        return this.products;
    }

    public void setProducts(Product products) {
        this.products = products;
    }


    public Request getRequest() {
        return this.request;
    }

    public void setRequest(Request request) {
        this.request = request;
    }

    @Column(name = "quantity")
    public Long getQuantity() {
        return this.quantity;
    }

    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }

}
