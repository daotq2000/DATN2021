package com.poly.datn.service.impl;

import com.poly.datn.converter.MaintenanceCardConverter;
import com.poly.datn.converter.PaymentHistoryConverter;
import com.poly.datn.exception.maintenanceCardException.MoneyExceedException;
import com.poly.datn.repository.MaintenanceCardRepository;
import com.poly.datn.repository.PaymentHistoryRepository;
import com.poly.datn.dto.MaintenanceCardDTO;
import com.poly.datn.dto.PaymentHistoryDTO;
import com.poly.datn.entity.MaintenanceCard;
import com.poly.datn.entity.PaymentHistory;
import com.poly.datn.exception.commonException.NotFoundException;
import com.poly.datn.exception.commonException.UnknownException;
import com.poly.datn.model.MessageModel;
import com.poly.datn.model.PaymentHistoryByIdCustomer;
import com.poly.datn.service.PaymentHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.*;

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

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @Override
    public synchronized MaintenanceCardDTO insertPaymentHistory(List<PaymentHistoryDTO> paymentHistoryDTOs) throws NotFoundException, MoneyExceedException {
        Long total = Long.valueOf(0);
        System.out.println("alo");
//        Long maintenanceCardId = Long.valueOf(0);
//        for (PaymentHistoryDTO paymentHistoryDTO : paymentHistoryDTOs) {
//            if (maintenanceCardId == 0) {
//                maintenanceCardId = paymentHistoryDTO.getMaintenanceCard().getId();
//            }
//            if (maintenanceCardId != paymentHistoryDTO.getMaintenanceCard().getId()) {
//                maintenanceCardId = Long.valueOf(-1);
//            }
//        }
        MaintenanceCard maintenanceCard = maintenanceCardRepository.findById(paymentHistoryDTOs.get(0).getMaintenanceCard().getId()).orElse(null);
        if (maintenanceCard != null) {
            for (PaymentHistory paymentHistory1 : maintenanceCard.getPaymentHistories()) {
                total += paymentHistory1.getMoney().longValue();
                System.out.println(total);
            }
            for (PaymentHistoryDTO paymentHistoryDTO : paymentHistoryDTOs) {
                PaymentHistory paymentHistory = paymentHistoryConverter.convertToEntity(paymentHistoryDTO);
                Date now = new Date();
                paymentHistory.setCreatedDate(now);
                paymentHistory.setModifiedDate(now);
                total += paymentHistory.getMoney().longValue();
                if (maintenanceCard.getPaymentHistories() == null) {
                    List<PaymentHistory> paymentHistories = new ArrayList<>();
                    paymentHistories.add(paymentHistory);
                    maintenanceCard.setPaymentHistories(paymentHistories);
                } else {
                    maintenanceCard.getPaymentHistories().add(paymentHistory);
                }
            }

            System.out.println("tong tien: "+total);
            byte status = 1;
            if (total == maintenanceCard.getPrice().longValue()) {
                maintenanceCard.setPayStatus(status);
            }else if(total > 1 && total < maintenanceCard.getPrice().longValue()){
                System.out.println("pay pay");
                maintenanceCard.setPayStatus((byte)2);
            }
            else if(total > maintenanceCard.getPrice().longValue()){
                throw new UnknownException();
            }
            else if(total > maintenanceCard.getPrice().longValue()){
                throw new MoneyExceedException();
            }
            try {
               maintenanceCardRepository.save(maintenanceCard);
                MessageModel messageModel = new MessageModel();
                messageModel.setType(3);
                messageModel.setMessage(maintenanceCard.getId().toString());
                messageModel.setCode(maintenanceCard.getCode().toString());
                if (maintenanceCard.getRepairman() != null) {
                    simpMessagingTemplate.convertAndSend("/topic/messages/" + maintenanceCard.getRepairman().getId(), messageModel);
                }
                if (maintenanceCard.getCoordinator() != null) {
                    simpMessagingTemplate.convertAndSend("/topic/messages/" + maintenanceCard.getCoordinator().getId(), messageModel);
                }
                return maintenanceCardConverter.convertAllToDTO(maintenanceCard);
            } catch (Exception e) {
                e.printStackTrace();
                throw new UnknownException();
            }

        } else {
            throw new NotFoundException("Not found maintenance card");
        }
    }

    @Override
    public Map<String, Object> getPaymentHistoryByIdCustomer(PaymentHistoryByIdCustomer paymentHistoryByIdCustomer) {

        int pageNumber = paymentHistoryByIdCustomer.getPage();
        int size = paymentHistoryByIdCustomer.getSize();
        String search = paymentHistoryByIdCustomer.getSearch();
        Long[] payMethods = paymentHistoryByIdCustomer.getPayMethods();
        Pageable paging = PageRequest.of(pageNumber - 1, size, Sort.by("modifiedDate").descending());
        Long id = paymentHistoryByIdCustomer.getId();

        Page<PaymentHistory> historyPage = paymentHistoryRepository.getPaymentHistoryByIdCustomer(paging, id, search, payMethods);
        List<PaymentHistoryDTO> paymentHistoryDTOS = new ArrayList<>();
        HashMap<String, Object> map = new HashMap<>();
        List<PaymentHistory> paymentHistories = historyPage.getContent();

        for (PaymentHistory paymentHistory : paymentHistories) {
            paymentHistoryDTOS.add(paymentHistoryConverter.convertPaymentHistoryDTO(paymentHistory));
        }
        map.put("paymentHistories", paymentHistoryDTOS);
        map.put("currentPage", historyPage.getNumber() + 1);
        map.put("totalItems", historyPage.getTotalElements());
        map.put("totalPages", historyPage.getTotalPages());
        return map;
    }
}






