package com.sapo.qlsc.service;

import com.sapo.qlsc.dto.MaintenanceCardDTO;
import com.sapo.qlsc.dto.PaymentHistoryDTO;
import com.sapo.qlsc.entity.MaintenanceCard;

public interface PaymentHistoryService {

    public MaintenanceCardDTO insertPaymentHistory(PaymentHistoryDTO paymentHistoryDTO);
}
