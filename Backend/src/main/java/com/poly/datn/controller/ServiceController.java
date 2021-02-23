package com.poly.datn.controller;

import com.poly.datn.dto.DepotDTO;
import com.poly.datn.dto.ServiceDTO;
import com.poly.datn.exception.CodeExistedException;
import com.poly.datn.exception.commonException.NotFoundException;
import com.poly.datn.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin/v2")
public class ServiceController {
    private ServiceImpl service;
    @Autowired
    public ServiceController(ServiceImpl service) {
        this.service = service;
    }
    @GetMapping("/services")
    public ResponseEntity<Map<String,Object>> getListService(@RequestParam(name = "pageNum", defaultValue = "1", required = false) int pageNum,
                                                           @RequestParam(name = "pageSize", defaultValue = "5", required = false) int pageSize,
                                                           @RequestParam(value = "sortBy", defaultValue = "") String sortBy,
                                                           @RequestParam(value = "descending", defaultValue = "") String descending,
                                                           @RequestParam(value = "param", defaultValue = "") String param){
        return new ResponseEntity<>(service.getListService(pageNum, pageSize, sortBy, descending, param), HttpStatus.OK);
    }
    @PostMapping("/services")
    public ResponseEntity<ServiceDTO> insertService(@RequestBody ServiceDTO serviceDTO) throws CodeExistedException {
        return new ResponseEntity<>(service.insertService(serviceDTO),HttpStatus.CREATED);
    }
    @PutMapping("/services/{id}")
    public ResponseEntity<ServiceDTO> updateService(@RequestBody ServiceDTO serviceDTO,@PathVariable("id") Long id) throws Exception {
        return new ResponseEntity<>(service.updateService(serviceDTO,id),HttpStatus.ACCEPTED);
    }
    @DeleteMapping("/services/delete")
    public ResponseEntity<HttpStatus> deleteService(@RequestParam("listID")List<Long> list) throws Exception {
        boolean isDelete = service.deleteServiceById(list);
        if(isDelete){
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        }
        return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
    }
    @GetMapping("/services/{id}")
    public ResponseEntity<ServiceDTO> getServiceById(@PathVariable("id") Long id) throws NotFoundException {
        return new ResponseEntity<>(service.getServiceById(id),HttpStatus.OK);
    }
}
