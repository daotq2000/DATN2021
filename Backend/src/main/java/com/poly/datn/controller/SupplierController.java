package com.poly.datn.controller;
import com.poly.datn.dto.SupplierDTO;
import com.poly.datn.exception.CodeExistedException;
import com.poly.datn.exception.commonException.NotFoundException;
import com.poly.datn.exception.userException.DuplicateEmailException;
import com.poly.datn.repository.SupplierReposiroty;
import com.poly.datn.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.ConstraintViolationException;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("http://localhost:3000")
public class SupplierController {
    @Autowired
    SupplierReposiroty supplierReposiroty;
    @Autowired
    SupplierService supplierService;

    @GetMapping("/admin/supplier")
    public ResponseEntity<Map<String, Object>> getAllDepots(@RequestParam(name = "pageNum", defaultValue = "1", required = false) int pageNum,
                                                            @RequestParam(name = "pageSize", defaultValue = "5", required = false) int pageSize,
                                                            @RequestParam(value = "sortBy", defaultValue = "") String sortBy,
                                                            @RequestParam(value = "descending", defaultValue = "") String descending,
                                                            @RequestParam(value = "param", defaultValue = "") String param) {
        return new ResponseEntity<>(supplierService.getListSupplier(pageNum, pageSize, sortBy, descending, param), HttpStatus.OK);
    }
    @GetMapping("/admin/supplier/{id}")
    public ResponseEntity<SupplierDTO> getDepotsById(@PathVariable("id") Long id) throws NotFoundException {
        return new ResponseEntity<>(supplierService.getSupplierById(id), HttpStatus.OK);
    }

    @PostMapping("/admin/supplier")
    public ResponseEntity<SupplierDTO> insertSupplier(@RequestBody SupplierDTO supplierDTO)throws DuplicateEmailException, CodeExistedException, ConstraintViolationException {

        return new ResponseEntity<>(supplierService.insertSupplier(supplierDTO), HttpStatus.OK);
    }
    @PutMapping("/admin/supplier")
    public ResponseEntity<SupplierDTO> updateSupplier(@RequestBody SupplierDTO supplierDTO) throws Exception {

        return new ResponseEntity<>(supplierService.updateSupplier(supplierDTO), HttpStatus.OK);
    }
    @DeleteMapping("/admin/supplier/{id}")
    public ResponseEntity<?>delete(@PathVariable long id){

        return new ResponseEntity<>(supplierService.delete(id)? HttpStatus.ACCEPTED:HttpStatus.NOT_ACCEPTABLE);
    }
    @DeleteMapping("admin/supplier/delete")
    public ResponseEntity<HttpStatus> deleteDepots(@RequestParam("listID") List<Long> listID) throws Exception {
        System.out.println(listID.size());
        boolean isDelete = supplierService.deleteSupplierById(listID);
        if (isDelete) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

}
