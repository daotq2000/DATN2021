package com.poly.datn.entity;
import javax.persistence.*;

@Entity
@Table(name = "receipt_depot_detail", catalog = "datn")
public class ReceiptDepotDetail extends BaseEntity {
    @ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JoinColumn(name = "id_receipt_depot")
    private ReceiptDepot receiptDepot;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_product")
    private Product products;
    @Column(name = "quantity")
    private Long quantity;

    public Long getQuantity() {
        return quantity;
    }

    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }

    public ReceiptDepot getReceiptDepot() {
        return this.receiptDepot;
    }

    public void setReceiptDepot(ReceiptDepot receiptDepot) {
        this.receiptDepot = receiptDepot;
    }


    public Product getProducts() {
        return this.products;
    }

    public void setProducts(Product products) {
        this.products = products;
    }

}
