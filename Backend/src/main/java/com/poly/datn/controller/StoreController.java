package com.poly.datn.controller;

import com.poly.datn.dto.DepotDTO;
import com.poly.datn.dto.StoreDTO;
import com.poly.datn.exception.CodeExistedException;
import com.poly.datn.exception.commonException.NotFoundException;
import com.poly.datn.service.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
@RestController
@RequestMapping("/admin/")
@CrossOrigin(origins = "http://localhost:3000/")
public class StoreController {

    private StoreService storeService;
    @Autowired
    public StoreController(StoreService storeService) {
        this.storeService = storeService;
    }

    @GetMapping("stores")
    public ResponseEntity<Map<String, Object>> getAllDepots(@RequestParam(name = "pageNum", defaultValue = "1", required = false) int pageNum,
                                                            @RequestParam(name = "pageSize", defaultValue = "5", required = false) int pageSize,
                                                            @RequestParam(value = "sortBy", defaultValue = "") String sortBy,
                                                            @RequestParam(value = "descending", defaultValue = "") String descending,
                                                            @RequestParam(value = "param", defaultValue = "") String param) {
        return new ResponseEntity<>(storeService.getListStore(pageNum, pageSize, sortBy, descending, param), HttpStatus.OK);
    }

    @PostMapping("stores")
    public ResponseEntity<StoreDTO> insertDepots(@RequestBody StoreDTO storeDTO) throws CodeExistedException {

        return new ResponseEntity<>(storeService.insertStore(storeDTO), HttpStatus.OK);
    }

    @PutMapping("stores/{id}")
    public ResponseEntity<StoreDTO> updateDepots(@RequestBody StoreDTO storeDTO, @PathVariable("id") Long id) throws NotFoundException {
        return new ResponseEntity<>(storeService.updateStore(storeDTO, id), HttpStatus.OK);
    }

    @DeleteMapping("stores/delete")
    public ResponseEntity<HttpStatus> deleteDepots(@RequestParam("listID") List<Long> listID) throws Exception {
        boolean isDelete = storeService.deleteStoreById(listID);
        if (isDelete) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @GetMapping("stores/{id}")
    public ResponseEntity<StoreDTO> getDepotsById(@PathVariable("id") Long id) throws NotFoundException {
        return new ResponseEntity<>(storeService.getStoreById(id), HttpStatus.OK);
    }


}
