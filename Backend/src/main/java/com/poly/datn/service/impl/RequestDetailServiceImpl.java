package com.poly.datn.service.impl;

import com.poly.datn.converter.RequestDetailConverter;
import com.poly.datn.dto.ReceiptDepotDTO;
import com.poly.datn.dto.RequestDetailDTO;
import com.poly.datn.entity.RequestDetail;
import com.poly.datn.repository.RequestDetailRepository;
import com.poly.datn.service.RequestDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;
@Service
@Transactional
public class RequestDetailServiceImpl implements RequestDetailService {
    @Autowired  private RequestDetailConverter requestDetailConverter;
    private RequestDetailRepository requestDetailRepository;

    @Autowired
    public RequestDetailServiceImpl(RequestDetailRepository requestDetailRepository) {
        this.requestDetailRepository = requestDetailRepository;
    }

    @Override
    public RequestDetailDTO insertRequestDetail(RequestDetailDTO requestDetailDTO) {
        RequestDetail requestDetail = requestDetailConverter.convertToEntity(requestDetailDTO);
        try {
            requestDetail.setCreatedDate(new Date());
            requestDetail.setModifiedDate(new Date());
            requestDetailRepository.save(requestDetail);
            return requestDetailConverter.convertToDTO(requestDetail);
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public RequestDetailDTO updateRequestDetail(RequestDetailDTO requestDetailDTO, Long id) {
        RequestDetail requestDetail = requestDetailConverter.convertToEntity(requestDetailDTO);
        RequestDetail requestDetail1 = requestDetailRepository.getOne(id);
        try {
            requestDetail.setId(requestDetail1.getId());
            requestDetail.setModifiedDate(new Date());
            requestDetailRepository.save(requestDetail);
            return requestDetailConverter.convertToDTO(requestDetail);
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public boolean deleteRequestDetail(List<Long> listID) {
        int count = 0;
        for (Long aLong : listID) {
            count++;
            requestDetailRepository.deleteById(aLong);
        }
        return count == listID.size();
    }
}
