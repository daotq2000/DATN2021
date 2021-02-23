package com.poly.datn.service.impl;

import com.poly.datn.converter.DepotConverter;
import com.poly.datn.converter.DepotProductConverter;
import com.poly.datn.converter.ProductConverter;
import com.poly.datn.dto.DepotProductDTO;
import com.poly.datn.entity.DepotProduct;
import com.poly.datn.repository.DepotProductRepository;
import com.poly.datn.service.DepotProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@Service
@Transactional
public class DepotProductServiceImpl implements DepotProductService {
    private DepotProductRepository depotProductRepository;
    private DepotProductConverter depotProductConverter;
    private ProductConverter productConverter;
    private DepotConverter depotConverter;
    @Autowired
    public DepotProductServiceImpl(DepotProductRepository depotProductRepository, DepotProductConverter depotProductConverter, ProductConverter productConverter, DepotConverter depotConverter) {
        this.depotProductRepository = depotProductRepository;
        this.depotProductConverter = depotProductConverter;
        this.productConverter = productConverter;
        this.depotConverter = depotConverter;
    }

    @Override
    public DepotProductDTO insertDepotProduct(DepotProductDTO depotProductDTO) {

        return depotProductConverter.convertToDTO(depotProductRepository.save(depotProductConverter.convertToEntity(depotProductDTO)));
    }

    @Override
    public DepotProductDTO updateDepotProduct(DepotProductDTO depotProductDTO,Long id) throws Exception {
        DepotProduct depotProduct = depotProductRepository.getOne(id);
        depotProduct.setModifiedDate(new Date());
        depotProduct.setQuantity(depotProductDTO.getQuantity());
        depotProduct.setProduct(productConverter.convertToEntity(depotProductDTO.getProduct()));
        depotProduct.setDepot(depotConverter.convertToEntity(depotProductDTO.getDepot()));
        depotProduct.setId(depotProduct.getId());
        try {
            depotProductRepository.save(depotProduct);
            return depotProductConverter.convertToDTO(depotProduct);
        }catch (Exception e){
            throw new Exception("Could not update Depot Product with id "+id);
        }

    }

    @Override
    public boolean deleteDepotProduct(Long id) {
        depotProductRepository.deleteById(id);
        return true;
    }

    @Override
    public Map<String,Object> getAllDepotProduct(int page, int size, String nameField, String order,Long DepotId) {
        Pageable pageable = null;
        if (nameField.trim().length() <= 0) {
            pageable = PageRequest.of(page - 1, size, Sort.by("id").descending());
        }
        if (order.equals("asc")) {
            pageable = PageRequest.of(page - 1, size, Sort.by(order).ascending());
        } else if (order.equals("desc")) {
            pageable = PageRequest.of(page - 1, size, Sort.by(order).descending());
        }
        Page<DepotProduct> depotProducts = depotProductRepository.getAllByDepotId(pageable,DepotId);
        List<DepotProductDTO> depotProductDTOS = new ArrayList<>();
        depotProducts.toList().forEach(depotProduct -> {
            depotProductDTOS.add(depotProductConverter.convertToDTO(depotProduct));
        });
        Map<String,Object> map = new HashMap<>();
        map.put("depots", depotProductDTOS);
        map.put("totalPages", depotProducts.getTotalPages());
        map.put("totalElements", depotProducts.getTotalElements());
        map.put("currentPage", page);
        return map;
    }
}
