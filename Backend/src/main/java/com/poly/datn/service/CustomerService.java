package com.poly.datn.service;

import com.poly.datn.dto.CustomerDTO;
import com.poly.datn.model.CustomerFilter;
import com.poly.datn.model.SearchCustomer;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

public interface CustomerService {

    CustomerDTO addCustomer(CustomerDTO customerDTO) throws ParseException;
    Map<String, Object> searchCustomer(SearchCustomer searchCustomer);
    CustomerDTO updateCustomer(CustomerDTO customerDTO, Long idCustomer);
    void deleteCustomer(Long idCustomer);
    void updateMultipleStatusCustomer(List<Long> ids);
    CustomerDTO getById(Long idCustomer);
    Map<String, Object> filterPayStatusOfCustomer(CustomerFilter customerFilter);
    boolean checkPhoneNumber(String phoneNumber);
}
