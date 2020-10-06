package com.sapo.qlsc.converter;

import com.sapo.qlsc.dto.MaintenanceCardDTO;
import com.sapo.qlsc.dto.PaymentHistoryDTO;
import com.sapo.qlsc.dto.PaymentMethodDTO;
import com.sapo.qlsc.entity.MaintenanceCard;
import com.sapo.qlsc.entity.PaymentHistory;
import com.sapo.qlsc.entity.PaymentMethod;
import com.sapo.qlsc.repository.PaymentMethodRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class PaymentHistoryConverter {

    @Autowired
    private PaymentMethodRepository paymentMethodRepository;

    public PaymentHistory convertToEntity(PaymentHistoryDTO paymentHistoryDTO){
        ModelMapper modelmapper = new ModelMapper();
        return modelmapper.map(paymentHistoryDTO,PaymentHistory.class);
    }

    public PaymentHistoryDTO convertToDTO(PaymentHistory paymentHistory){
        PaymentHistoryDTO paymentHistoryDTO = new PaymentHistoryDTO();
        paymentHistoryDTO.setMoney(paymentHistory.getMoney());
        paymentHistoryDTO.setId(paymentHistory.getId());
        PaymentMethodDTO paymentMethodDTO = new PaymentMethodDTO();
        PaymentMethod paymentMethod = paymentMethodRepository.findById(paymentHistory.getPaymentMethod().getId()).orElse(null);
        paymentMethodDTO.setId(paymentMethod.getId());
        paymentMethodDTO.setName(paymentMethod.getName());
        System.out.println(paymentMethod.getName());
        paymentHistoryDTO.setPaymentMethod(paymentMethodDTO);
        MaintenanceCardDTO maintenanceCardDTO = new MaintenanceCardDTO();
        MaintenanceCard maintenanceCard = paymentHistory.getMaintenanceCard();
        maintenanceCardDTO.setId(maintenanceCard.getId());
        paymentHistoryDTO.setMaintenanceCard(maintenanceCardDTO);
        paymentHistoryDTO.setCreatedDate(paymentHistory.getCreatedDate());
        return paymentHistoryDTO;
    }

}
