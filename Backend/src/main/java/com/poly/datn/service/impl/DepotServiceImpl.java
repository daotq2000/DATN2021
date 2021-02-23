package com.poly.datn.service.impl;

import com.poly.datn.contraint.CONSTRAINTS;
import com.poly.datn.converter.*;
import com.poly.datn.dto.ProductDTO;
import com.poly.datn.entity.Depot;
import com.poly.datn.entity.DepotProduct;
import com.poly.datn.entity.Product;
import com.poly.datn.exception.CodeExistedException;
import com.poly.datn.exception.commonException.NotFoundException;
import com.poly.datn.repository.DepotProductRepository;
import com.poly.datn.repository.DepotRepository;
import com.poly.datn.repository.ProductRepository;
import com.poly.datn.repository.ProductStoreRepository;
import com.poly.datn.service.DepotService;
import com.poly.datn.dto.DepotDTO;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class DepotServiceImpl implements DepotService {
    private DepotRepository depotRepository;
    private DepotConverter depotConverter;
    private UserConverter userConverter;
    private WardConverter wardConverter;
    private ProductRepository productRepository;
    private ProductConverter productConverter;
    @Autowired
    ProductStoreRepository productStoreRepository;
    @Autowired private
    DepotProductRepository depotProductRepository;
    @Autowired
    public DepotServiceImpl(DepotRepository depotRepository, DepotConverter depotConverter, UserConverter userConverter, WardConverter wardConverter, ProductRepository productRepository, ProductConverter productConverter) {
        this.depotRepository = depotRepository;
        this.depotConverter = depotConverter;
        this.userConverter = userConverter;
        this.wardConverter = wardConverter;
        this.productRepository = productRepository;
        this.productConverter = productConverter;
    }

    @Override
    public Map<String, Object> getListDepot(int page, int size, String sortBy, String descending, String search) {

//        List<Product> listo = productRepository.findAll();
//        Depot depot1 = new Depot();
//        depot1.setId((long)1);
//        for (Product product : listo) {
//            DepotProduct depotProduct = new DepotProduct();
//            depotProduct.setProduct(product);
//            depotProduct.setQuantity((long)product.getQuantity());
//            depotProduct.setModifiedDate(new Date());
//            depotProduct.setModifiedDate(new Date());
//            depotProduct.setDepot(depot1);
//            depotProductRepository.save(depotProduct);
//        }

        Pageable pageable = null;
        if (sortBy.trim().length() <= 0) {
            pageable = PageRequest.of(page - 1, size, Sort.by("id").descending());
        }
        if (descending.equals("asc")) {
            pageable = PageRequest.of(page - 1, size, Sort.by(sortBy).ascending());
        } else if (descending.equals("desc")) {
            pageable = PageRequest.of(page - 1, size, Sort.by(sortBy).descending());
        }
        Page<Depot> depotPage = depotRepository.getListDepot(pageable, search);
        List<DepotDTO> list = new ArrayList<>();
        depotPage.toList().forEach(depot -> list.add(depotConverter.convertToDTO(depot)));
        Map<String, Object> map = new HashMap<>();
        map.put("depots", list);
        map.put("totalPages", depotPage.getTotalPages());
        map.put("totalElements", depotPage.getTotalElements());
        map.put("currentPage", page);
        return map;
    }

    @Override
    public DepotDTO getDepotById(Long id) throws NotFoundException {

        try {
            return depotConverter.getAllDTO(depotRepository.getOne(id));
        }catch (Exception e){
            throw new NotFoundException("Depot Not Found");
        }

    }

    @Override
    public DepotDTO insertDepot(DepotDTO depotDTO,Boolean addAlLProduct) throws CodeExistedException {
        Depot depot = depotConverter.convertToEntity(depotDTO);
        depot.setAddress(depotDTO.getAddress());
        depot.setCode(depotDTO.getCode().length() > 0 ? depot.getCode() : generateCode());
        depot.setName(depotDTO.getName());
        depot.setStatus(depotDTO.getStatus());
        depot.setCreatedDate(new Date());
        depot.setModifiedDate(new Date());
        depot.setUsers(userConverter.convertToEntity(depotDTO.getUsers()));
        depot.setWards(wardConverter.convertToEntity(depotDTO.getWards()));

        if(depotDTO.getDepotProducts() != null){
            for (DepotProduct p:depot.getDepotProducts()
            ) {
                Product product = productRepository.getOne(p.getProduct().getId());
                if(product != null){
                    Product product1 = new Product();
                    product1.setName(p.getProduct().getName());
                    product1.setCode(p.getProduct().getCode());
                    product1.setImage(p.getProduct().getImage());
                    product1.setUnit(p.getProduct().getUnit());
                    product1.setType(CONSTRAINTS.ACCESSORIES);
                    product1.setModifiedDate(new Date());
                    product1.setCreatedDate(new Date());
                    product1.setStatus(CONSTRAINTS.LIVE);
                    product1.setQuantity(0);
                    product1.setDescription(p.getProduct().getDescription());
                    product1.setCostPrice(p.getProduct().getCostPrice());
                    if(product.getManufacturer() != null){
                        product1.setManufacturer(p.getProduct().getManufacturer());
                    }
                    if(product.getCategory() != null){
                        product1.setCategory(p.getProduct().getCategory());
                    }
                    productRepository.save(product1);
                    p.setProduct(product1);
                    p.setDepot(depot);
                    p.setModifiedDate(new Date());
                    p.setCreatedDate(new Date());
                    p.setQuantity(Long.valueOf(0));
                    depotProductRepository.save(p);
                }
            }
            depot.setDepotProducts(depot.getDepotProducts());
        }
        else{
              if(addAlLProduct){
                  List<DepotProduct> depotProducts = new ArrayList<>();
                  List<Product> listProducts = productRepository.findAll();
                  listProducts.forEach(product -> {
                      DepotProduct depotProduct = new DepotProduct();
                      depotProduct.setQuantity(CONSTRAINTS.OUT_STOCK);
                      depotProduct.setDepot(depot);
                      depotProduct.setCreatedDate(new Date());
                      depotProduct.setModifiedDate(new Date());
                      depotProduct.setProduct(product);
                      depotProductRepository.saveAndFlush(depotProduct);
                  });
                  depot.setDepotProducts(depotProducts);
              }
        }
        try {
            depotRepository.save(depot);
            return depotConverter.getAllDTO(depot);
        }catch (Exception e){
           e.printStackTrace();
        }
return null;
    }

    @Override
    public DepotDTO updateDepot(DepotDTO depotDTO, Long id) throws NotFoundException {
        Depot depot = depotRepository.getOne(id);
        depot.setId(depot.getId());
        depot.setAddress(depotDTO.getAddress());
        depot.setCode(depotDTO.getCode());
        depot.setName(depotDTO.getName());
        depot.setStatus(depotDTO.getStatus());
        depot.setCreatedDate(depotDTO.getCreatedDate());
        depot.setModifiedDate(depotDTO.getModifiedDate());
        depot.setUsers(userConverter.convertToEntity(depotDTO.getUsers()));
        depot.setWards(wardConverter.convertToEntity(depotDTO.getWards()));
        try {
            depotRepository.save(depot);
            return depotConverter.getAllDTO(depot);
        } catch (Exception e) {
            throw new NotFoundException("Depot Not Found");
        }

    }

    @Override
    public Boolean deleteDepotById(List<Long> arrayID) throws Exception {
        int count = 0;
        if (arrayID.size() > 0) {
            for (Long id : arrayID
            ) {
                count++;
                depotRepository.deleteDepotById(id);
            }
        }
        return count == arrayID.size();
    }


    @Override
    public String generateCode() {
        Long codeNumber = 0L;
        String newCodeString;
        int index = 0;
        String getMaxCode = null;
        getMaxCode = depotRepository.getMaxCode(index);
        do {
            getMaxCode = depotRepository.getMaxCode(index);
            if (getMaxCode == null) {
                getMaxCode = "0";
            } else {
                boolean result = StringUtils.isNumeric(getMaxCode);
                if (!result) {
                    getMaxCode = null;
                    index++;
                } else {
                    getMaxCode = getMaxCode;
                }
            }
        } while (getMaxCode == null);
        codeNumber = Long.parseLong(getMaxCode) + 1;
        newCodeString = "KHO00" + codeNumber.toString();
        System.out.println(newCodeString);
        return newCodeString;
    }

    @Override
    public Map<String, Object> getListProductByDepotId(int page, int size, String sortBy, String descending, String search) {
        Pageable pageable = null;
        if (sortBy.trim().length() <= 0) {
            pageable = PageRequest.of(page - 1, size, Sort.by("id").descending());
        }
        if (descending.equals("asc")) {
            pageable = PageRequest.of(page - 1, size, Sort.by(sortBy).ascending());
        } else if (descending.equals("desc")) {
            pageable = PageRequest.of(page - 1, size, Sort.by(sortBy).descending());
        }
        Page<Product> productPage = productRepository.getAllProductByDepotID(pageable,search);
        List<ProductDTO> list = new ArrayList<>();
        productPage.toList().forEach(product -> list.add(productConverter.convertToDTO(product)));
        Map<String,Object> map = new HashMap<>();
        map.put("products",list);
        map.put("currentPage",page);
        map.put("totalElement",productPage.getTotalElements());
        map.put("totalPage",productPage.getTotalPages());
        return map;
    }
}
