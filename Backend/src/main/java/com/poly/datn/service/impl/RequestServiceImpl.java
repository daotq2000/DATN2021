package com.poly.datn.service.impl;

import com.poly.datn.contraint.CONSTRAINTS;
import com.poly.datn.converter.RequestConverter;
import com.poly.datn.dto.RequestDTO;
import com.poly.datn.entity.Product;
import com.poly.datn.entity.Request;
import com.poly.datn.entity.RequestDetail;
import com.poly.datn.exception.CodeExistedException;
import com.poly.datn.exception.commonException.NotFoundException;
import com.poly.datn.repository.ProductRepository;
import com.poly.datn.repository.RequestDetailRepository;
import com.poly.datn.repository.RequestRepository;
import com.poly.datn.service.RequestDetailService;
import com.poly.datn.service.RequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;

@Service
@Transactional
public class RequestServiceImpl implements RequestService {
    @Autowired
    private RequestRepository requestRepository;
    @Autowired
    private RequestConverter requestConverter;
    @Autowired
    RequestDetailRepository requestDetailRepository;
    @Autowired
    ProductRepository productRepository;
    @Override
    public Map<String, Object> getListRequest(int page, int size, String sortBy, String descending, String search,byte[] status) {
        byte[] st = null;
        if(status.length <= 0){
            st = new byte[]{1, 2, 3, 4};
        }else{
            st = status;
        }
        Pageable pageable = null;
        if (sortBy.trim().length() <= 0) {
            pageable = PageRequest.of(page - 1, size, Sort.by("id").descending());
        }
        if (descending.equals("asc")) {
            pageable = PageRequest.of(page - 1, size, Sort.by(sortBy).ascending());
        } else if (descending.equals("desc")) {
            pageable = PageRequest.of(page - 1, size, Sort.by(sortBy).descending());
        }
        Page<Request> requests = requestRepository.getAllRequest(pageable,st,search);
        List<RequestDTO> requestDTOS = new ArrayList<>();
        requests.forEach(request -> requestDTOS.add(requestConverter.convertToDTO(request)));
        Map<String,Object> result = new HashMap<>();
        result.put("depots", requestDTOS);
        result.put("totalPages", requests.getTotalPages());
        result.put("totalElements", requests.getTotalElements());
        result.put("currentPage", page);
        return result;
    }

    @Override
    public RequestDTO getRequestById(Long id) throws NotFoundException {
        return requestConverter.convertToAllDependenciesDTO(requestRepository.getOne(id));
    }

    @Override
    public RequestDTO insertRequest(RequestDTO requestDTO) throws CodeExistedException {
        Request request = requestConverter.convertToEntity(requestDTO);
        try {
           request.setCreatedDate(new Date());
           request.setModifiedDate(new Date());
           if(request.getRequestDetails().size() >0){
               for (RequestDetail r:request.getRequestDetails()
               ) {
                   r.setRequest(request);
                   Product product = productRepository.getOne(r.getProducts().getId());
                   r.setProducts(product);
                   r.setQuantity(r.getQuantity());
                   r.setModifiedDate(new Date());
                   r.setCreatedDate(new Date());
                   requestDetailRepository.save(r);
               }
               request.setRequestDetails(request.getRequestDetails());
           }

           requestRepository.save(request);
            return requestConverter.convertToAllDependenciesDTO(request);
        }catch (Exception e){
        e.printStackTrace();
        }
        return null;
    }

    @Override
    public RequestDTO updateRequest(RequestDTO requestDTO, Long id) throws NotFoundException {
        Request request = requestRepository.getOne(id);
        Request rq = requestConverter.convertToEntity(requestDTO);
        try {
            rq.setId(request.getId());
            request.setModifiedDate(new Date());
            requestRepository.save(request);
            return requestConverter.convertToAllDependenciesDTO(request);
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public Boolean deleteRequest(List<Long> arrayID) throws Exception {
        int count = 0;
        for (Long id:arrayID
             ) {
            Request request = requestRepository.getOne(id);
            request.setStatus(CONSTRAINTS.DELETE);
            requestRepository.save(request);
           count++;
        }
        return count == arrayID.size();
    }

    @Override
    public String generateCode() {
        return null;
    }
}
