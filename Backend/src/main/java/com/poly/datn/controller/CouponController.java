package com.poly.datn.controller;

import com.poly.datn.dto.CouponDTO;
import com.poly.datn.dto.DepotDTO;
import com.poly.datn.exception.CodeExistedException;
import com.poly.datn.exception.commonException.NotFoundException;
import com.poly.datn.service.impl.CouponServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
@RestController
@CrossOrigin(origins = "http://localhost:3000/")
@RequestMapping("/admin/")
public class CouponController {
    private CouponServiceImpl couponService;
    @Autowired
    public CouponController(CouponServiceImpl couponService) {
        this.couponService = couponService;
    }

    @GetMapping("coupons")
    public ResponseEntity<Map<String, Object>> getAllDepots(@RequestParam(name = "pageNum", defaultValue = "1", required = false) int pageNum,
                                                            @RequestParam(name = "pageSize", defaultValue = "5", required = false) int pageSize,
                                                            @RequestParam(value = "sortBy", defaultValue = "") String sortBy,
                                                            @RequestParam(value = "descending", defaultValue = "") String descending,
                                                            @RequestParam(value = "param", defaultValue = "") String param) {
        return new ResponseEntity<>(couponService.getListCoupon(pageNum, pageSize, sortBy, descending, param), HttpStatus.OK);
    }
    @PostMapping("coupons")
    public ResponseEntity<CouponDTO> insertDepots(@RequestBody CouponDTO couponDTO) throws CodeExistedException {
        return new ResponseEntity<>(couponService.insertCoupon(couponDTO), HttpStatus.OK);
    }

    @PutMapping("coupons/{id}")
    public ResponseEntity<CouponDTO> updateDepots(@RequestBody CouponDTO couponDTO, @PathVariable("id") Long id) throws NotFoundException {
        return new ResponseEntity<>(couponService.updateCoupon(couponDTO, id), HttpStatus.OK);
    }

    @DeleteMapping("coupons/delete")
    public ResponseEntity<HttpStatus> deleteDepots(@RequestParam("listID") List<Long> listID) throws Exception {
        boolean isDelete = couponService.deleteCoupon(listID);
        if (isDelete) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    @GetMapping("coupons/{id}")
    public ResponseEntity<CouponDTO> getDepotsById(@PathVariable("id") Long id) throws NotFoundException {
        return new ResponseEntity<>(couponService.getCouponById(id), HttpStatus.OK);
    }
}
