package com.poly.datn.service;

import com.poly.datn.dto.ReceiptDepotDTO;
import com.poly.datn.dto.RequestDetailDTO;

import java.util.List;

public interface RequestDetailService {
    public RequestDetailDTO insertRequestDetail(RequestDetailDTO requestDetailDTO);
    public RequestDetailDTO updateRequestDetail(RequestDetailDTO requestDetailDTO,Long id);
    public boolean deleteRequestDetail(List<Long> listID);
}
