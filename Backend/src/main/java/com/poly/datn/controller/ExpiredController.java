package com.poly.datn.controller;

import com.poly.datn.dto.DepotDTO;
import com.poly.datn.dto.ExpiredDTO;

import com.poly.datn.exception.CodeExistedException;
import com.poly.datn.exception.commonException.NotFoundException;
import com.poly.datn.service.impl.ExpiredServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
//@RestController
//public class ExpiredController {
//    private ExpiredServiceImpl expiredService;
//
//    @Autowired
//    public ExpiredController(ExpiredServiceImpl expiredService) {
//        this.expiredService = expiredService;
//    }
//
//    @GetMapping("/expires")
//    public ResponseEntity<Map<String, Object>> getAllDepots(@RequestParam(name = "pageNum", defaultValue = "1", required = false) int pageNum,
//                                                            @RequestParam(name = "pageSize", defaultValue = "5", required = false) int pageSize,
//                                                            @RequestParam(value = "sortBy", defaultValue = "") String sortBy,
//                                                            @RequestParam(value = "descending", defaultValue = "") String descending,
//                                                            @RequestParam(value = "type", defaultValue = "1") Byte type) {
//        return new ResponseEntity<>(expiredService.getListExpired(pageNum, pageSize, sortBy, descending, type), HttpStatus.OK);
//    }
//
//    @PostMapping("/expires")
//    public ResponseEntity<ExpiredDTO> insertExpired(@RequestBody ExpiredDTO expiredDTO) throws CodeExistedException {
//        return new ResponseEntity<>(expiredService.insertExpired(expiredDTO),HttpStatus.CREATED);
//    }
//    @PutMapping("/expires/{id}")
//    public ResponseEntity<ExpiredDTO> updateExpired(@RequestBody ExpiredDTO expiredDTO,@PathVariable("id") Long id) throws  NotFoundException {
//        return new ResponseEntity<>(expiredService.updateExpired(expiredDTO,id),HttpStatus.ACCEPTED);
//    }
//    @GetMapping("/expires/{id}")
//    public ResponseEntity<ExpiredDTO> getExpiresByID(@PathVariable("id")Long id) throws NotFoundException {
//        return new ResponseEntity<>(expiredService.getExpiredById(id),HttpStatus.OK);
//    }
//    @DeleteMapping("/expires/delete")
//    public ResponseEntity<HttpStatus> deleteListExpires(@RequestParam("listID")List<Long> listID) throws Exception {
//        boolean isDelete = expiredService.deleteExpiredById(listID);
//        if(isDelete){
//            return new ResponseEntity<>(HttpStatus.ACCEPTED);
//        }
//        return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
//    }
//}