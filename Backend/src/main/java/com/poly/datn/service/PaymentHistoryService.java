package com.poly.datn.service;

import com.poly.datn.exception.maintenanceCardException.MoneyExceedException;
import com.poly.datn.dto.MaintenanceCardDTO;
import com.poly.datn.dto.PaymentHistoryDTO;
import com.poly.datn.model.PaymentHistoryByIdCustomer;
import com.poly.datn.exception.commonException.NotFoundException;

import java.util.List;
import java.util.Map;

public interface PaymentHistoryService {

    public MaintenanceCardDTO insertPaymentHistory(List<PaymentHistoryDTO> paymentHistoryDTOs) throws NotFoundException, MoneyExceedException;

    Map<String, Object> getPaymentHistoryByIdCustomer(PaymentHistoryByIdCustomer paymentHistoryByIdCustomer);
}
