package com.poly.datn.entity;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "depot_products")
public class DepotProduct extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY,cascade=CascadeType.ALL)
    @JoinColumn(name = "product_id",unique = true)
    private Product products;
    @ManyToOne(fetch = FetchType.LAZY,cascade=CascadeType.ALL)
    @JoinColumn(name = "depot_id",unique = true)
    private Depot depot;
    @Column(name = "quantity")
    private Long quantity;

    public Product getProduct() {
        return products;
    }

    public void setProduct(Product products) {
        this.products = products;
    }

    public Depot getDepot() {
        return depot;
    }

    public void setDepot(Depot depot) {
        this.depot = depot;
    }

    public Long getQuantity() {
        return quantity;
    }

    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }



}
