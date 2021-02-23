package com.poly.datn.controller;

import com.poly.datn.dto.ColorDTO;
import com.poly.datn.entity.Color;
import com.poly.datn.exception.CodeExistedException;
import com.poly.datn.exception.commonException.NotFoundException;
import com.poly.datn.exception.userException.DuplicateEmailException;
import com.poly.datn.service.ColorService;
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
@CrossOrigin(origins = "http://localhost:3000")
public class ColorController {
    @Autowired
    ColorService colorService;

    @GetMapping("/admin/color")
    public ResponseEntity<Map<String, Object>> getAllDepots(@RequestParam(name = "pageNum", defaultValue = "1", required = false) int pageNum,
                                                            @RequestParam(name = "pageSize", defaultValue = "5", required = false) int pageSize,
                                                            @RequestParam(value = "sortBy", defaultValue = "") String sortBy,
                                                            @RequestParam(value = "descending", defaultValue = "") String descending,
                                                            @RequestParam(value = "param", defaultValue = "") String param) {
        return new ResponseEntity<>(colorService.getListColor(pageNum, pageSize, sortBy, descending, param), HttpStatus.OK);
    }
    @PostMapping("/admin/color")
    public ResponseEntity<ColorDTO> insertColor(@RequestBody ColorDTO colorDTO)throws DuplicateEmailException, CodeExistedException, ConstraintViolationException {

        return new ResponseEntity<>(colorService.insertColor(colorDTO), HttpStatus.OK);
    }
    @GetMapping("/admin/color/{id}")
    public ResponseEntity<?> getOne(@PathVariable Long id) throws NotFoundException {
        return  new ResponseEntity<>(colorService.getColorById(id),HttpStatus.OK);
    }
    @PutMapping("/admin/color")
    public ResponseEntity<ColorDTO> UpdatetUser(@RequestBody ColorDTO colorDTO) throws Exception {

        return new ResponseEntity<>(colorService.updateColor(colorDTO), HttpStatus.OK);
    }
    @DeleteMapping("/admin/color/{id}")
    public ResponseEntity<?> delete(@PathVariable long id){
        return new ResponseEntity<>(colorService.delete(id)?HttpStatus.ACCEPTED:HttpStatus.NOT_ACCEPTABLE);
    }
    @DeleteMapping("admin/color/delete")
    public ResponseEntity<HttpStatus> deleteDepots(@RequestParam("listID") List<Long> listID) throws Exception {
        boolean isDelete = colorService.deleteColorById(listID);
        if (isDelete) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

}
