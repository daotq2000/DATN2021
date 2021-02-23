package com.poly.datn.controller;

import com.poly.datn.dto.ManufactureDTO;
import com.poly.datn.exception.CodeExistedException;
import com.poly.datn.exception.commonException.NotFoundException;
import com.poly.datn.service.ManufacturerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ManufacturerController {
    @Autowired
    ManufacturerService manufacturerService;
    @GetMapping("/admin/manufacturer")
    public ResponseEntity<Map<String, Object>> getAllDepots(@RequestParam(name = "pageNum", defaultValue = "1", required = false) int pageNum,
                                                            @RequestParam(name = "pageSize", defaultValue = "5", required = false) int pageSize,
                                                            @RequestParam(value = "sortBy", defaultValue = "") String sortBy,
                                                            @RequestParam(value = "descending", defaultValue = "") String descending,
                                                            @RequestParam(value = "param", defaultValue = "") String param) {
        return new ResponseEntity<>(manufacturerService.getListManufacturer(pageNum, pageSize, sortBy, descending, param), HttpStatus.OK);
    }
    @GetMapping("/admin/manufacturer/{id}")
    public ResponseEntity<?> getBreadOne(@PathVariable Long id) throws NotFoundException {
        return  new ResponseEntity<>(manufacturerService.getManufacturerById(id),HttpStatus.OK);
    }
    @PostMapping("/admin/manufacturer")
    public ResponseEntity<ManufactureDTO> insertDepots(@RequestBody ManufactureDTO manufactureDTO) throws CodeExistedException {
        return new ResponseEntity<>(manufacturerService.insertManufacturer(manufactureDTO), HttpStatus.OK);
    }

    @PutMapping("/admin/manufacturer/{id}")
    public ResponseEntity<ManufactureDTO> updateDepots(@RequestBody ManufactureDTO manufactureDTO, @PathVariable("id") Long id) throws Exception {
        return new ResponseEntity<>(manufacturerService.updateManufacturer(manufactureDTO,id), HttpStatus.OK);
    }

    @DeleteMapping("/admin/manufacturer/delete")
        public ResponseEntity<HttpStatus> deleteDepots(@RequestParam("listID") List<Long> listID) throws Exception {
        boolean isDelete = manufacturerService.deleteManufacturerById(listID);
        if (isDelete) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

}
