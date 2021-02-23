package com.poly.datn;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.poly.datn.converter.DepotProductConverter;
import com.poly.datn.dto.DepotProductDTO;
import com.poly.datn.entity.*;
import com.poly.datn.repository.*;

import com.poly.datn.service.MaintenanceCardService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;


import java.util.*;

@SpringBootTest
public class test {

    @Autowired   ProductRepository productStoreRepository;

    @Autowired public static DepotProductRepository depotProductRepository;
    public void test111(){

    }

    public static void main(String[] args) {

    }
}
