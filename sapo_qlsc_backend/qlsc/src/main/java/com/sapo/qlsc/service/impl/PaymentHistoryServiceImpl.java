package com.sapo.qlsc.service.impl;

import com.sapo.qlsc.converter.MaintenanceCardConvert;
import com.sapo.qlsc.converter.MaintenanceCardConverter;
import com.sapo.qlsc.converter.PaymentHistoryConverter;
import com.sapo.qlsc.dto.MaintenanceCardDTO;
import com.sapo.qlsc.dto.PaymentHistoryDTO;
import com.sapo.qlsc.entity.MaintenanceCard;
import com.sapo.qlsc.entity.PaymentHistory;
import com.sapo.qlsc.exception.commonException.UnknownException;
import com.sapo.qlsc.repository.MaintenanceCardRepository;
import com.sapo.qlsc.repository.PaymentHistoryRepository;
import com.sapo.qlsc.service.PaymentHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class PaymentHistoryServiceImpl implements PaymentHistoryService {

    @Autowired
    private PaymentHistoryRepository paymentHistoryRepository;

    @Autowired
    private MaintenanceCardRepository maintenanceCardRepository;

    @Autowired
    private MaintenanceCardConverter maintenanceCardConverter;

    @Autowired
    private PaymentHistoryConverter paymentHistoryConverter;

    @Override
    public MaintenanceCardDTO insertPaymentHistory(PaymentHistoryDTO paymentHistoryDTO) {

        PaymentHistory paymentHistory = paymentHistoryConverter.convertToEntity(paymentHistoryDTO);
        Date now = new Date();
        paymentHistory.setCreatedDate(now);
        paymentHistory.setModifiedDate(now);

        Long total = Long.valueOf(0);
        MaintenanceCard maintenanceCard = maintenanceCardRepository.findById(paymentHistoryDTO.getMaintenanceCard().getId()).orElse(null);
        for(PaymentHistory paymentHistory1 : maintenanceCard.getPaymentHistories()){
            total+= paymentHistory1.getMoney().longValue();
        }
        total+= paymentHistory.getMoney().longValue();
        byte status = 1;
        if(total == maintenanceCard.getPrice().longValue()){
            maintenanceCard.setPayStatus(status);
        }
        if(maintenanceCard.getPaymentHistories() == null){
            List<PaymentHistory> paymentHistories = new ArrayList<>();
            paymentHistories.add(paymentHistory);
            maintenanceCard.setPaymentHistories(paymentHistories);
        }
        else {
            maintenanceCard.getPaymentHistories().add(paymentHistory);
        }
        try {
            MaintenanceCard maintenanceCard1 = maintenanceCardRepository.save(maintenanceCard);
            System.out.println("size"+maintenanceCard1.getPaymentHistories().size());
            return maintenanceCardConverter.convertAllToDTO(maintenanceCard1);
        }
        catch (Exception e){
            e.printStackTrace();
            throw new UnknownException();
        }
    }
}
