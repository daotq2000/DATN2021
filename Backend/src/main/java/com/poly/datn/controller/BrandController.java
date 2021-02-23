package com.poly.datn.controller;

import com.poly.datn.dto.BrandDTO;
import com.poly.datn.dto.UserDTO;
import com.poly.datn.entity.Brand;
import com.poly.datn.exception.CodeExistedException;
import com.poly.datn.exception.commonException.NotFoundException;
import com.poly.datn.exception.userException.DuplicateEmailException;
import com.poly.datn.repository.BranRepository;
import com.poly.datn.service.BrandService;
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
public class BrandController {
    @Autowired
    BrandService brandService;
    @GetMapping("/admin/brand")
    public ResponseEntity<Map<String, Object>> getAllDepots(@RequestParam(name = "pageNum", defaultValue = "1", required = false) int pageNum,
                                                            @RequestParam(name = "pageSize", defaultValue = "5", required = false) int pageSize,
                                                            @RequestParam(value = "sortBy", defaultValue = "") String sortBy,
                                                            @RequestParam(value = "descending", defaultValue = "") String descending,
                                                            @RequestParam(value = "param", defaultValue = "") String param) {
        return new ResponseEntity<>(brandService.getListBrand(pageNum, pageSize, sortBy, descending, param), HttpStatus.OK);
    }
    @PostMapping("/admin/brand")
    public ResponseEntity<BrandDTO> insertUser(@RequestBody BrandDTO brandDTO)throws DuplicateEmailException, CodeExistedException, ConstraintViolationException {

        return new ResponseEntity<>(brandService.insertBrand(brandDTO), HttpStatus.OK);
    }
    @GetMapping("/admin/brand/{id}")
    public ResponseEntity<?> getBreadOne(@PathVariable Long id) throws NotFoundException {
        return  new ResponseEntity<>(brandService.getBrandById(id),HttpStatus.OK);
    }
    @PutMapping("/admin/brand")
    public ResponseEntity<BrandDTO> UpdatetUser(@RequestBody BrandDTO brandDTO) throws Exception {

        return new ResponseEntity<>(brandService.updateBrand(brandDTO), HttpStatus.OK);
    }
    @DeleteMapping("admin/brand/delete")
    public ResponseEntity<HttpStatus> deleteDepots(@RequestParam("listID") List<Long> listID) throws Exception {
        boolean isDelete = brandService.deleteBrandById(listID);
        if (isDelete) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
