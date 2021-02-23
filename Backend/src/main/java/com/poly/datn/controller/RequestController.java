package com.poly.datn.controller;

import com.poly.datn.dto.CouponDTO;
import com.poly.datn.dto.RequestDTO;
import com.poly.datn.exception.CodeExistedException;
import com.poly.datn.exception.commonException.NotFoundException;
import com.poly.datn.service.impl.RequestServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
@RestController
public class RequestController {
    private RequestServiceImpl requestService;
    @Autowired
    public RequestController(RequestServiceImpl requestService) {
        this.requestService = requestService;
    }

    @GetMapping("/requests")
    public ResponseEntity<Map<String, Object>> getAllDepots(@RequestParam(name = "pageNum", defaultValue = "1", required = false) int pageNum,
                                                            @RequestParam(name = "pageSize", defaultValue = "5", required = false) int pageSize,
                                                            @RequestParam(value = "sortBy", defaultValue = "") String sortBy,
                                                            @RequestParam(value = "descending", defaultValue = "") String descending,
                                                            @RequestParam(value = "param", defaultValue = "") String param,
                                                            @RequestParam(value = "status",defaultValue = "") byte[] status) {
        return new ResponseEntity<>(requestService.getListRequest(pageNum, pageSize, sortBy, descending, param,status), HttpStatus.OK);
    }
    @PostMapping("/requests")
    public ResponseEntity<RequestDTO> insertDepots(@RequestBody RequestDTO requestDTO) throws CodeExistedException {
        return new ResponseEntity<>(requestService.insertRequest(requestDTO), HttpStatus.OK);
    }

    @PutMapping("/requests/{id}")
    public ResponseEntity<RequestDTO> updateDepots(@RequestBody RequestDTO requestDTO, @PathVariable("id") Long id) throws NotFoundException {
        return new ResponseEntity<>(requestService.updateRequest(requestDTO, id), HttpStatus.OK);
    }
    @DeleteMapping("requests/delete")
    public ResponseEntity<HttpStatus> deleteDepots(@RequestParam("listID") List<Long> listID) throws Exception {
        boolean isDelete = requestService.deleteRequest(listID);
        if (isDelete) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    @GetMapping("/requests/{id}")
    public ResponseEntity<RequestDTO> getRequestById(@PathVariable("id") Long id) throws CodeExistedException, NotFoundException {
        return new ResponseEntity<>(requestService.getRequestById(id), HttpStatus.OK);
    }
}
