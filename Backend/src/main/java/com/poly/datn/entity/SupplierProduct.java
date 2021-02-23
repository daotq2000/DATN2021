package com.poly.datn.entity;

import javax.persistence.*;

@Table
@Entity(name = "supplier_product")
public class SupplierProduct extends BaseEntity {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product products;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "supplier_id")
    private Supplier supplier;

    public Product getProducts() {
        return products;
    }

    public void setProducts(Product products) {
        this.products = products;
    }

    public Supplier getSupplier() {
        return supplier;
    }

    public void setSupplier(Supplier supplier) {
        this.supplier = supplier;
    }
}
