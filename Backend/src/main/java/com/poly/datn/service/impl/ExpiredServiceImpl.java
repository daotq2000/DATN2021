package com.poly.datn.service.impl;

import com.poly.datn.converter.ExpiredConverter;
import com.poly.datn.converter.ProductConverter;
import com.poly.datn.dto.ExpiredDTO;

import com.poly.datn.exception.CodeExistedException;
import com.poly.datn.exception.commonException.NotFoundException;
//import com.poly.datn.repository.ExpiredRepository;
import com.poly.datn.service.ExpiredService;
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
public class ExpiredServiceImpl implements ExpiredService {
//    private ExpiredRepository expiredRepository;
//    private ExpiredConverter expiredConverter;
//    private ProductConverter productConverter;
//    @Autowired
//    public ExpiredServiceImpl(ExpiredRepository expiredRepository, ExpiredConverter expiredConverter, ProductConverter productConverter) {
//        this.expiredRepository = expiredRepository;
//        this.expiredConverter = expiredConverter;
//        this.productConverter = productConverter;
//    }
//
//    @Override
//    public Map<String, Object> getListExpired(int page, int size, String sortBy, String descending,Byte type ) {
//        Pageable pageable = null;
//        if (sortBy.trim().length() <= 0) {
//            pageable = PageRequest.of(page - 1, size, Sort.by("id").descending());
//        }
//        if (descending.equals("asc")) {
//            pageable = PageRequest.of(page - 1, size, Sort.by(sortBy).ascending());
//        } else if (descending.equals("desc")) {
//            pageable = PageRequest.of(page - 1, size, Sort.by(sortBy).descending());
//        }
//        Page<Expired> expiredPage = expiredRepository.getAllByTypeAndStatus(pageable,type);
//        System.out.println(expiredPage.toList().size());
//        List<ExpiredDTO> list = new ArrayList<>();
//        expiredPage.toList().forEach(expired -> list.add(expiredConverter.convertToDTO(expired)));
//        Map<String,Object> map = new HashMap<>();
//        map.put("expires",list);
//        map.put("totalElements",expiredPage.getTotalElements());
//        map.put("totalPages",expiredPage.getTotalPages());
//        map.put("currentPage",page);
//        return map;
//    }
//
//    @Override
//    public ExpiredDTO getExpiredById(Long id) throws NotFoundException {
//        return expiredConverter.convertToDTO(expiredRepository.getOne(id));
//    }
//
//    @Override
//    public ExpiredDTO insertExpired(ExpiredDTO expiredDTO) throws CodeExistedException {
//        try {
//            return expiredConverter.convertToDTO(expiredRepository.save(expiredConverter.convertToEntity(expiredDTO)));
//        }catch (Exception e){
//            throw new CodeExistedException("Code existed");
//        }
//
//    }
//
//    @Override
//    public ExpiredDTO updateExpired(ExpiredDTO expiredDTO, Long id) throws NotFoundException {
//        Expired expired = expiredRepository.getOne(id);
//        expired.setExpiredDate(expiredDTO.getExpiredDate());
//        expired.setQuantity(expiredDTO.getQuantity());
//        expired.setStatus(expiredDTO.getStatus());
//        expired.setType(expiredDTO.getType());
//        expired.setCreatedDate(expiredDTO.getCreatedDate());
//        expired.setModifiedDate(new Date());
//        expired.setProducts(productConverter.convertToEntity(expiredDTO.getProducts()));
//        try {
//          expiredRepository.save(expired);
//          return expiredConverter.convertToDTO(expired);
//        }catch (Exception e){
//            throw new NotFoundException("Not Found Expired with Id "+ id);
//        }
//
//    }
//
//    @Override
//    public Boolean deleteExpiredById(List<Long> arrayID) throws Exception {
//        int count = 0;
//        if (arrayID.size() > 0) {
//            for (Long id : arrayID
//            ) {
//                count++;
//                expiredRepository.deleteById(id);
//            }
//        }
//        return count == arrayID.size();
//    }
}
