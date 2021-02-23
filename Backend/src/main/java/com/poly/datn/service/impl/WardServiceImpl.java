package com.poly.datn.service.impl;

import com.poly.datn.converter.WardConverter;
import com.poly.datn.repository.WardRepository;
import com.poly.datn.dto.WardDTO;
import com.poly.datn.entity.Ward;
import com.poly.datn.service.WardService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class WardServiceImpl implements WardService {

    private final WardRepository wardRepository;

    private final WardConverter wardConverter;

    public WardServiceImpl(WardRepository wardRepository, WardConverter wardConverter) {
        this.wardRepository = wardRepository;
        this.wardConverter = wardConverter;
    }

    @Override
    public List<WardDTO> getWardOfDistrict(String district) {

        List<WardDTO> wardDTOS = new ArrayList<>();
        List<Ward> wards = wardRepository.getWardByDistrict(district);

        for (Ward ward : wards){
            wardDTOS.add(wardConverter.convertToDTO(ward));
        }
        return wardDTOS;
    }
}
