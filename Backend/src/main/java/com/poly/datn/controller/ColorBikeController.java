package com.poly.datn.controller;


import com.poly.datn.dto.ColorBikeDTO;
import com.poly.datn.entity.ColorBike;
import com.poly.datn.exception.CodeExistedException;
import com.poly.datn.exception.commonException.NotFoundException;
import com.poly.datn.exception.userException.DuplicateEmailException;
import com.poly.datn.service.ColorBikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.ConstraintViolationException;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ColorBikeController {
    @Autowired
    ColorBikeService colorBikeService;

    @GetMapping("/admin/colorbike")
    public ResponseEntity<Map<String, Object>> getAllDepots(@RequestParam(name = "pageNum", defaultValue = "1", required = false) int pageNum,
                                                            @RequestParam(name = "pageSize", defaultValue = "5", required = false) int pageSize,
                                                            @RequestParam(value = "sortBy", defaultValue = "") String sortBy,
                                                            @RequestParam(value = "descending", defaultValue = "") String descending,
                                                            @RequestParam(value = "param", defaultValue = "") String param) {
        return new ResponseEntity<>(colorBikeService.getListColor(pageNum, pageSize, sortBy, descending, param), HttpStatus.OK);
    }
    @PostMapping("/admin/colorbike")
    public ResponseEntity<ColorBikeDTO> insertColor(@RequestBody ColorBikeDTO colorBikeDTO)throws DuplicateEmailException, CodeExistedException, ConstraintViolationException {
        return new ResponseEntity<>(colorBikeService.insertColor(colorBikeDTO), HttpStatus.OK);
    }
    @GetMapping("/admin/colorbike/{id}")
    public ResponseEntity<?> getOne(@PathVariable Long id) throws NotFoundException {
        return  new ResponseEntity<>(colorBikeService.getColorBikeById(id),HttpStatus.OK);
    }

    @PutMapping("/admin/colorbike/{id}")
    public ResponseEntity<ColorBikeDTO> UpdatetUser(@PathVariable Long id,@RequestBody ColorBikeDTO colorBikeDTO) throws Exception {

        return new ResponseEntity<>(colorBikeService.updateColor(colorBikeDTO,id), HttpStatus.OK);
    }
    @DeleteMapping("/admin/colorbike/{id}")
    public ResponseEntity<?> delete(@PathVariable long id){
        return new ResponseEntity<>(colorBikeService.delete(id)?HttpStatus.ACCEPTED:HttpStatus.NOT_ACCEPTABLE);
    }
    @DeleteMapping("admin/colorbike/delete")
    public ResponseEntity<HttpStatus> deleteDepots(@RequestParam("listID") List<Long> listID) throws Exception {
        boolean isDelete = colorBikeService.deleteColorById(listID);
        if (isDelete) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    @GetMapping("/admin/colorbike/modelBike/{id}")
    public ResponseEntity<List<ColorBikeDTO>> getListColorBikeByModelBikeId(@PathVariable Long id) throws NotFoundException {
        return  new ResponseEntity<>(colorBikeService.getByModelBikeId(id),HttpStatus.OK);
    }
}
