package com.poly.datn.controller;

import com.poly.datn.dto.DepotDTO;
import com.poly.datn.dto.ReceiptDepotDTO;
import com.poly.datn.exception.CodeExistedException;
import com.poly.datn.exception.commonException.NotFoundException;
import com.poly.datn.service.ReceiptDepotService;
import com.poly.datn.service.impl.ReceiptDepotServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
@RestController
public class ReceiptDepotController {

   private ReceiptDepotService receiptDepotService;
    @Autowired
    public ReceiptDepotController(ReceiptDepotService receiptDepotService) {
        this.receiptDepotService = receiptDepotService;
    }

    @GetMapping("/receipt")
    public ResponseEntity<Map<String, Object>> getAllDepots(@RequestParam(name = "pageNum", defaultValue = "1", required = false) int pageNum,
                                                            @RequestParam(name = "pageSize", defaultValue = "5", required = false) int pageSize,
                                                            @RequestParam(value = "sortBy", defaultValue = "") String sortBy,
                                                            @RequestParam(value = "descending", defaultValue = "") String descending) {
        return new ResponseEntity<>(receiptDepotService.getListReceiptDepot(pageNum, pageSize, sortBy, descending), HttpStatus.OK);
    }

    @PostMapping("/receipt")
    public ResponseEntity<ReceiptDepotDTO> insertDepots(@RequestBody ReceiptDepotDTO receiptDepotDTO) throws CodeExistedException {
        return new ResponseEntity<>(receiptDepotService.insertReceiptDepot(receiptDepotDTO), HttpStatus.OK);
    }

    @PutMapping("/receipt/{id}")
    public ResponseEntity<ReceiptDepotDTO> updateDepots(@RequestBody ReceiptDepotDTO receiptDepotDTO, @PathVariable("id") Long id) throws NotFoundException {
        return new ResponseEntity<>(receiptDepotService.updateReceiptDepot(receiptDepotDTO, id), HttpStatus.OK);
    }

    @DeleteMapping("receipt/delete")
    public ResponseEntity<HttpStatus> deleteDepots(@RequestParam("listID") List<Long> listID) throws Exception {
        boolean isDelete = receiptDepotService.deleteReceiptDepot(listID);
        if (isDelete) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/receipt/{id}")
    public ResponseEntity<ReceiptDepotDTO> getDepotsById(@PathVariable("id") Long id) throws NotFoundException {
        return new ResponseEntity<>(receiptDepotService.getReceiptDepotById(id), HttpStatus.OK);
    }


}
