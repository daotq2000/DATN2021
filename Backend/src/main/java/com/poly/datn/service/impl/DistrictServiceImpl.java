package com.poly.datn.service.impl;

import com.poly.datn.converter.DistrictConverter;
import com.poly.datn.repository.DistrictRepository;
import com.poly.datn.service.DistrictService;
import com.poly.datn.dto.DistrictDTO;
import com.poly.datn.entity.District;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DistrictServiceImpl implements DistrictService {

    private final DistrictRepository districtRepository;

    private final DistrictConverter districtConverter;

    public DistrictServiceImpl(DistrictRepository districtRepository, DistrictConverter districtConverter) {
        this.districtRepository = districtRepository;
        this.districtConverter = districtConverter;
    }

    @Override
    public List<DistrictDTO> getDistricts() {

        List<DistrictDTO> districtDTOS = new ArrayList<>();
        List<District> districts = districtRepository.getDistinct();

        for (District district : districts){
            districtDTOS.add(districtConverter.convertToDTO(district));
        }
        return districtDTOS;
    }
}
