package com.poly.datn.service;

import com.poly.datn.dto.StatisticRepairmanDTO;
import com.poly.datn.dto.TotalMoneyDTO;

import java.math.BigDecimal;
import java.text.ParseException;
import java.util.Date;
import java.util.List;

public interface BusinessInformationService {

    int getTotalCustomer();

    int getTotalMaintenanceCard();

    int getTotalMaintenanceCardSuccess();

    int getTotalMaintenanceCardSuccessNotPay();

    int getTotalMaintenanceCardSuccessPayed();

    int getTotalMaintenanceCards(String startDate, String endDate) throws ParseException;

    BigDecimal getTotalMoney(String startDate, String endDate) throws ParseException;

    BigDecimal getTotalLiabilities(String startDate, String endDate) throws ParseException;

    List<TotalMoneyDTO> getAllTotalMoney(String startDate, String endDate);

    List<StatisticRepairmanDTO> getTopRepairman(Date startDate, Date endDate);

    List<StatisticRepairmanDTO> getTopService(Date startDate, Date endDate);

}
