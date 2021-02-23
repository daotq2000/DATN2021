package com.poly.datn.service.impl;

import com.poly.datn.converter.StoreConverter;
import com.poly.datn.dto.StoreDTO;
import com.poly.datn.entity.ProductStore;
import com.poly.datn.entity.Store;
import com.poly.datn.exception.CodeExistedException;
import com.poly.datn.exception.commonException.NotFoundException;
import com.poly.datn.repository.StoreRepository;
import com.poly.datn.service.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;
import java.util.logging.Logger;
@Service
@Transactional
public class StoreServiceImpl implements StoreService {
    private final Logger logger = Logger.getLogger(StoreServiceImpl.class.getName());
    @Autowired  private StoreRepository storeRepository;
    @Autowired private StoreConverter storeConverter;
    @Override
    public Map<String, Object> getListStore(int page, int size, String sortBy, String descending, String search) {
        Pageable pageable = null;
        if (sortBy.trim().length() <= 0) {
            pageable = PageRequest.of(page - 1, size, Sort.by("id").descending());
        }
        if (descending.equals("asc")) {
            pageable = PageRequest.of(page - 1, size, Sort.by(sortBy).ascending());
        } else if (descending.equals("desc")) {
            pageable = PageRequest.of(page - 1, size, Sort.by(sortBy).descending());
        }
        Page<Store> storesPage = storeRepository.getAllStore(pageable,search);
        List<StoreDTO> storeDTOS = new ArrayList<>();
        storesPage.toList().forEach(store ->storeDTOS.add(storeConverter.convertToDTO(store)) );
        Map<String, Object> map = new HashMap<>();
        map.put("stores", storeDTOS);
        map.put("totalPages", storesPage.getTotalPages());
        map.put("totalElements", storesPage.getTotalElements());
        map.put("currentPage", page);
        return map;
    }

    @Override
    public StoreDTO getStoreById(Long id) throws NotFoundException {
        return storeConverter.convertToDTO(storeRepository.getOne(id));
    }

    @Override
    public StoreDTO insertStore(StoreDTO storeDTO) throws CodeExistedException {
        Store store = storeConverter.convertToEntity(storeDTO);
        store.setCreatedDate(new Date());
        store.setModifiedDate(new Date());
        try {
            Store store1 = storeRepository.save(store);
            store1.setCode("CH0"+store1.getId());
            Store store2 = storeRepository.save(store1);
            return storeConverter.convertToDTO(store2);

        }catch (Exception e){
            logger.info(e.getMessage());
        }
    return null;
    }

    @Override
    public StoreDTO updateStore(StoreDTO storeDTO, Long id) throws NotFoundException {
        Store store = storeConverter.convertToEntity(storeDTO);
        Store store1 = storeRepository.getOne(id);
        store.setId(store1.getId());
        store.setModifiedDate(new Date());
        store.setCreatedDate(store1.getCreatedDate());
        try {
            storeRepository.save(store);
            return storeConverter.convertToDTO(store);
        }catch (Exception e){
            logger.info(e.getMessage());
        }
        return null;
    }

    @Override
    public Boolean deleteStoreById(List<Long> arrayID) throws Exception {
        int count = 0;
        if (arrayID.size() > 0) {
            for (Long id : arrayID
            ) {
                count++;
                storeRepository.deleteById(id);
            }
        }
        return count == arrayID.size();
    }

    @Override
    public String generateCode() {
        return null;
    }
}
