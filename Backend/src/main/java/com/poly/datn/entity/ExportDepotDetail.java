package com.poly.datn.entity;
import javax.persistence.*;

@Entity
@Table(name = "export_depot_detail", catalog = "datn")
public class ExportDepotDetail extends BaseEntity {
    @ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JoinColumn(name = "id_export_depot")
    private ExportDepot exportDepot;
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

    public ExportDepot getExportDepot() {
        return this.exportDepot;
    }

    public void setExportDepot(ExportDepot exportDepot) {
        this.exportDepot = exportDepot;
    }


    public Product getProducts() {
        return this.products;
    }

    public void setProducts(Product products) {
        this.products = products;
    }
}
