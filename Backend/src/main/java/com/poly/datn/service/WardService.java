package com.poly.datn.service;

import com.poly.datn.dto.WardDTO;

import java.util.List;

public interface WardService {

    List<WardDTO> getWardOfDistrict(String district);
}
