package com.sapo.qlsc.service.impl;

import com.sapo.qlsc.converter.MaintenanceCardConverter;
import com.sapo.qlsc.converter.MaintenanceCardDetailConverter;
import com.sapo.qlsc.dto.MaintenanceCardDTO;
import com.sapo.qlsc.dto.MaintenanceCardDetailDTO;
import com.sapo.qlsc.entity.MaintenanceCard;
import com.sapo.qlsc.entity.MaintenanceCardDetail;
import com.sapo.qlsc.entity.MaintenanceCardDetailStatusHistory;
import com.sapo.qlsc.exception.commonException.NotFoundException;
import com.sapo.qlsc.repository.MaintenanceCardDetailRepository;
import com.sapo.qlsc.service.MaintenanceCardDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class MaintenanceCardDetailServiceImpl implements MaintenanceCardDetailService {

    @Autowired
    private MaintenanceCardDetailRepository maintenanceCardDetailRepository;

    @Autowired
    private MaintenanceCardDetailConverter maintenanceCardDetailConverter;

    @Autowired
    private MaintenanceCardConverter maintenanceCardConverter;

    @Override
    public MaintenanceCardDTO updateStatusMaintenanceCardDetail(Long id) throws NotFoundException {
        Date now = new Date();
        MaintenanceCardDetail maintenanceCardDetail = maintenanceCardDetailRepository.findById(id).orElse(null);
        if(maintenanceCardDetail != null){
            if(maintenanceCardDetail.getStatus() <2 && maintenanceCardDetail.getProduct().getType() == 2){
                maintenanceCardDetail.setStatus((byte) (maintenanceCardDetail.getStatus()+1));
                MaintenanceCardDetailStatusHistory maintenanceCardDetailStatusHistory = new MaintenanceCardDetailStatusHistory();
                maintenanceCardDetailStatusHistory.setCreatedDate(now);
                maintenanceCardDetailStatusHistory.setModifiedDate(now);
                maintenanceCardDetailStatusHistory.setMaintenanceCardDetail(maintenanceCardDetail);
                maintenanceCardDetailStatusHistory.setStatus((byte) (maintenanceCardDetail.getStatus()));
                maintenanceCardDetail.getMaintenanceCardDetailStatusHistories().add(maintenanceCardDetailStatusHistory);
            }
            MaintenanceCard maintenanceCard = maintenanceCardDetail.getMaintenanceCard();
            byte status = 0;
            boolean check = true;
            for(MaintenanceCardDetail maintenanceCardDetail1 : maintenanceCard.getMaintenanceCardDetails()){
                if(maintenanceCardDetail1.getId() != maintenanceCardDetail.getId()){
                    if(maintenanceCardDetail1.getProduct().getType() == 2) {
                        if (maintenanceCardDetail1.getStatus() == 1 || maintenanceCardDetail1.getStatus() == 2) {
                            status = 1;
                        }
                        if (maintenanceCardDetail1.getStatus() != 2) {
                            check = false;
                        }
                    }
                }
            }
            if(check){
                maintenanceCard.setWorkStatus((byte) 2);
            }
            else{
                maintenanceCard.setWorkStatus(status);
            }
            MaintenanceCardDetail maintenanceCardDetail1 = maintenanceCardDetailRepository.save(maintenanceCardDetail);
            MaintenanceCard maintenanceCard1 =  maintenanceCardDetail1.getMaintenanceCard();
            return maintenanceCardConverter.convertAllToDTO(maintenanceCard1);
        }
        else{
            throw new NotFoundException("Not found maintenance card detail");
        }
    }
}
