package com.poly.datn.converter;

import com.poly.datn.dto.ReceiptDepotDTO;
import com.poly.datn.entity.ReceiptDepot;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ReceiptDepotConverter {
    @Autowired UserConverter userConverter;
    @Autowired DepotConverter depotConverter;
    public ReceiptDepotDTO convertToDTO(ReceiptDepot receiptDepot){
        ReceiptDepotDTO receiptDepotDTO = new ReceiptDepotDTO();
        receiptDepotDTO.setId(receiptDepot.getId());
        receiptDepotDTO.setAmount(receiptDepot.getAmount());
        receiptDepotDTO.setCode(receiptDepot.getCode());
        receiptDepotDTO.setStatus(receiptDepot.getStatus());
        receiptDepotDTO.setCreatedDate(receiptDepot.getCreatedDate());
        receiptDepotDTO.setModifiedDate(receiptDepot.getModifiedDate());
        receiptDepotDTO.setUsers(userConverter.convertToDTO(receiptDepot.getUsers()));
        receiptDepotDTO.setDepot(depotConverter.convertToDTO(receiptDepot.getDepot()));
        return receiptDepotDTO;
    }
    public ReceiptDepot convertToEntity(ReceiptDepotDTO receiptDepotDTO){
        ModelMapper modelMapper = new ModelMapper();
        return  modelMapper.map(receiptDepotDTO,ReceiptDepot.class);

    }
}
