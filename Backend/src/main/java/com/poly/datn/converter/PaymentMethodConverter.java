package com.poly.datn.converter;

import com.poly.datn.entity.PaymentMethod;
import com.poly.datn.dto.PaymentMethodDTO;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class PaymentMethodConverter {

    public PaymentMethodDTO convertToDTO(PaymentMethod paymentMethod){
        ModelMapper modelMapper = new ModelMapper();
        PaymentMethodDTO paymentMethodDTO = modelMapper.map(paymentMethod, PaymentMethodDTO.class);
        return paymentMethodDTO;
    }

}
