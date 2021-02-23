package com.poly.datn.service.impl;

import com.poly.datn.contraint.CONSTRAINTS;
import com.poly.datn.converter.ExportDepotConverter;
import com.poly.datn.dto.ExportDepotDTO;
import com.poly.datn.entity.*;
import com.poly.datn.exception.CodeExistedException;
import com.poly.datn.exception.commonException.NotFoundException;
import com.poly.datn.exception.maintenanceCardException.NotEnoughProductException;
import com.poly.datn.repository.*;
import com.poly.datn.service.ExportDepotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.util.*;
import java.util.logging.Logger;

@Service
@Transactional
public class ExportDeportServiceImpl implements ExportDepotService {
    private final Logger logger = Logger.getLogger(ExportDeportServiceImpl.class.getName());

    @Autowired
    private ExportDepotConverter exportDepotConverter;
    @Autowired
    private ExportDepotRepository exportDepotRepository;
    @Autowired
    private ExportDepotDetailRepository exportDepotDetailRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ProductStoreRepository productStoreRepository;
    @Autowired private
    DepotProductRepository depotProductRepository;

    @Override
    public Map<String, Object> getListExportDepot(int page, int size, String sortBy, String descending, String search) {
        Pageable pageable = null;
        if (sortBy.trim().length() <= 0) {
            pageable = PageRequest.of(page - 1, size, Sort.by("id").descending());
        }
        if (descending.equals("asc")) {
            pageable = PageRequest.of(page - 1, size, Sort.by(sortBy).ascending());
        } else if (descending.equals("desc")) {
            pageable = PageRequest.of(page - 1, size, Sort.by(sortBy).descending());
        }
        Page<ExportDepot> exportDepotPage = exportDepotRepository.getAllListExportDepot(pageable, search);
        List<ExportDepotDTO> exportDepotDTOS = new ArrayList<>();
        for (ExportDepot exportDepot : exportDepotPage.toList()) {
            exportDepotDTOS.add(exportDepotConverter.convertToDTO(exportDepot));
        }
        Map<String, Object> map = new HashMap<>();
        map.put("exportDepots", exportDepotDTOS);
        map.put("totalPages", exportDepotPage.getTotalPages());
        map.put("totalElements", exportDepotPage.getTotalElements());
        map.put("currentPage", page);
        return map;
    }

    @Override
    public ExportDepotDTO getExportDepotById(Long id) throws NotFoundException {
        return exportDepotConverter.convertToDTO(exportDepotRepository.getOne(id));
    }

    @Override
    public ExportDepotDTO insertExportDepot(ExportDepotDTO exportDepotDTO) throws CodeExistedException {
        Long amount = 0L;
        ExportDepot exportDepot = exportDepotConverter.convertToEntity(exportDepotDTO);
        exportDepot.setCreatedDate(new Date());
        exportDepot.setModifiedDate(new Date());
        exportDepot.setExportDepotDetails(exportDepot.getExportDepotDetails());
        try {

            exportDepotRepository.save(exportDepot);
            List<ExportDepotDetail> exportDepotDetails = exportDepot.getExportDepotDetails();
            if (!exportDepotDetails.isEmpty()) {
                //add exportDetails
                for (ExportDepotDetail exportDepotDetail : exportDepot.getExportDepotDetails()) {
                    DepotProduct depotProduct = depotProductRepository.getByProductIdAndDepotId(exportDepotDetail.getProducts().getId(),exportDepot.getDepot().getId());
                    if(depotProduct != null){
                        ExportDepotDetail exportDepotDetail1 = new ExportDepotDetail();
                        exportDepotDetail1.setCreatedDate(new Date());
                        exportDepotDetail1.setModifiedDate(new Date());
                        logger.info(String.valueOf(depotProduct.getQuantity())+"|"+exportDepotDetail.getQuantity());
                        if(depotProduct.getQuantity() > 0 && depotProduct.getQuantity() >= exportDepotDetail.getQuantity()){
                            exportDepotDetail1.setQuantity(exportDepotDetail.getQuantity());
                        }else{
                            throw new NotEnoughProductException("Not enough quantity of Product Depot");
                        }
                        //update quantity of Depot_Product
                        depotProduct.setQuantity(depotProduct.getQuantity()-exportDepotDetail.getQuantity());
                        depotProductRepository.save(depotProduct);

                        exportDepotDetail1.setProducts(exportDepotDetail.getProducts());
                        exportDepotDetail1.setExportDepot(exportDepot);
                        exportDepotDetailRepository.save(exportDepotDetail1);
                        //calculator amount of export_depot
                        amount += exportDepotDetail.getProducts().getPricePerUnit().longValue() * exportDepotDetail.getQuantity();
                        // add product to product_store
                        ProductStore productStore = productStoreRepository.getByStoreIdAndProductsId(exportDepot.getStore().getId(),exportDepotDetail.getProducts().getId());
                        if(productStore != null){
                            productStore.setProducts(exportDepotDetail.getProducts());
                            productStore.setStore(exportDepot.getStore());
                            productStore.setCreatedDate(new Date());
                            productStore.setModifiedDate(new Date());
                            int quantityOfProductStore = Integer.parseInt(String.valueOf(exportDepotDetail.getQuantity()))+productStore.getQuantity();
                            productStore.setQuantity(quantityOfProductStore);
                        }else{
                            productStore.setProducts(exportDepotDetail.getProducts());
                            productStore.setStore(exportDepot.getStore());
                            productStore.setCreatedDate(new Date());
                            productStore.setModifiedDate(new Date());
                            productStore.setQuantity(Integer.parseInt(String.valueOf(exportDepotDetail.getQuantity())));
                        }
                        productStoreRepository.save(productStore);
                        //update quantity of Product
                        long idProduct = exportDepotDetail.getProducts().getId();
                        Product product = productRepository.getOne(idProduct);
                        product.setQuantity(Integer.parseInt(String.valueOf(productStore.getQuantity())));
                        productRepository.save(product);

                    }

                }
                //update total In Phieu Xuat
                exportDepot.setAmount(BigDecimal.valueOf(amount));
            }

            return exportDepotConverter.convertToDTO(exportDepot);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public ExportDepotDTO updateExportDepot(ExportDepotDTO exportDepotDTO, Long id) throws NotFoundException {
        ExportDepot exportDepot = exportDepotRepository.getOne(id);
        ExportDepot exportDepot1 = exportDepotConverter.convertToEntity(exportDepotDTO);
        exportDepot1.setId(exportDepot.getId());
        exportDepot1.setModifiedDate(new Date());
        try {
            exportDepotRepository.save(exportDepot1);
            return exportDepotConverter.convertToDTO(exportDepot);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public Boolean deleteExportDepotById(List<Long> arrayID) throws Exception {
        int count = 0;
        if (arrayID.size() > 0) {
            for (Long id : arrayID
            ) {

                ExportDepot exportDepot = exportDepotRepository.getOne(id);
                exportDepot.setStatus(CONSTRAINTS.DELETE);
                exportDepotRepository.save(exportDepot);
                count++;
            }
        }
        return count == arrayID.size();
    }

    @Override
    public String generateCode() {
        return null;
    }
}
