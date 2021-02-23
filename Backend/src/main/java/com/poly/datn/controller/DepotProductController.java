package com.poly.datn.controller;

import com.poly.datn.dto.DepotDTO;
import com.poly.datn.dto.DepotProductDTO;
import com.poly.datn.exception.CodeExistedException;
import com.poly.datn.exception.commonException.NotFoundException;
import com.poly.datn.service.DepotProductService;
import com.poly.datn.service.impl.DepotProductServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class DepotProductController {
    private DepotProductService depotProductService;

    @Autowired
    public DepotProductController(DepotProductService depotProductService) {
        this.depotProductService = depotProductService;
    }

    @GetMapping("/depotProducts/{id}")
    public ResponseEntity<Map<String, Object>> getAllDepots(@RequestParam(name = "pageNum", defaultValue = "1", required = false) int pageNum,
                                                            @RequestParam(name = "pageSize", defaultValue = "5", required = false) int pageSize,
                                                            @RequestParam(value = "sortBy", defaultValue = "") String sortBy,
                                                            @RequestParam(value = "descending", defaultValue = "") String descending,
                                                            @PathVariable("id") Long id) {
        return new ResponseEntity<>(depotProductService.getAllDepotProduct(pageNum, pageSize, sortBy, descending, id), HttpStatus.OK);
    }

    @PostMapping("/depotProducts")
    public ResponseEntity<DepotProductDTO> insertDepots(@RequestBody DepotProductDTO depotProductDTO, @RequestParam(value = "addAlL", defaultValue = "false") Boolean addAlLProduct) throws CodeExistedException {

        return new ResponseEntity<>(depotProductService.insertDepotProduct(depotProductDTO), HttpStatus.OK);
    }

    @PutMapping("/depotProducts/{id}")
    public ResponseEntity<DepotProductDTO> updateDepots(@RequestBody DepotProductDTO depotProductDTO, @PathVariable("id") Long id) throws Exception {
        return new ResponseEntity<>(depotProductService.updateDepotProduct(depotProductDTO, id), HttpStatus.OK);
    }

    @DeleteMapping("depotProducts/{id}")
    public ResponseEntity<HttpStatus> deleteDepots(@PathVariable("id") Long id) throws Exception {
        boolean isDelete = depotProductService.deleteDepotProduct(id);
        if (isDelete) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }


}
