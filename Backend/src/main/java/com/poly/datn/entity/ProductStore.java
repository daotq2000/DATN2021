package com.poly.datn.entity;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "product_store")
public class ProductStore extends BaseEntity {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product products;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "store_id")
    private Store store;

    @Column(name = "quantity")

    private int quantity;

    public Product getProducts() {
        return products;
    }

    public void setProducts(Product products) {
        this.products = products;
    }

    public Store getStore() {
        return store;
    }

    public void setStore(Store store) {
        this.store = store;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
