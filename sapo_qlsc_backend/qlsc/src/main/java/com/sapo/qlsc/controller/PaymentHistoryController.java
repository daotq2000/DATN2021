package com.sapo.qlsc.controller;

import com.sapo.qlsc.dto.MaintenanceCardDTO;
import com.sapo.qlsc.dto.PaymentHistoryDTO;
import com.sapo.qlsc.entity.PaymentHistory;
import com.sapo.qlsc.service.PaymentHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/admin/")
public class PaymentHistoryController {

    @Autowired
    private PaymentHistoryService paymentHistoryService;

    @PostMapping("/paymentHistories")
    public ResponseEntity<MaintenanceCardDTO> insertPaymentHistory(@RequestBody PaymentHistoryDTO paymentHistoryDTO){
        MaintenanceCardDTO maintenanceCardDTO = paymentHistoryService.insertPaymentHistory(paymentHistoryDTO);
        return new ResponseEntity(maintenanceCardDTO, HttpStatus.OK);
    }

}
