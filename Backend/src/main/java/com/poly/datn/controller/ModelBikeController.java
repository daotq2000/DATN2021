package com.poly.datn.controller;


import com.poly.datn.dto.ModelBikeDTO;
import com.poly.datn.exception.CodeExistedException;
import com.poly.datn.exception.commonException.NotFoundException;
import com.poly.datn.service.ModelBikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ModelBikeController {
    @Autowired
    ModelBikeService modelBikeService;
    @GetMapping("/admin/modelbike")
    public ResponseEntity<Map<String, Object>> getAllDepots(@RequestParam(name = "pageNum", defaultValue = "1", required = false) int pageNum,
                                                            @RequestParam(name = "pageSize", defaultValue = "5", required = false) int pageSize,
                                                            @RequestParam(value = "sortBy", defaultValue = "") String sortBy,
                                                            @RequestParam(value = "descending", defaultValue = "") String descending,
                                                            @RequestParam(value = "param", defaultValue = "") String param) {
        return new ResponseEntity<>(modelBikeService.getListModelBikeDTO(pageNum, pageSize, sortBy, descending, param), HttpStatus.OK);
    }
    @GetMapping("/admin/modelbike/{id}")
    public ResponseEntity<?> getBreadOne(@PathVariable Long id) throws NotFoundException {
        return  new ResponseEntity<>(modelBikeService.getModelBikeDTOById(id),HttpStatus.OK);
    }
    @PostMapping("/admin/modelbike")
    public ResponseEntity<ModelBikeDTO> insertDepots(@RequestBody ModelBikeDTO modelBikeDTO) throws CodeExistedException {
        return new ResponseEntity<>(modelBikeService.insertModelBikeDTO(modelBikeDTO), HttpStatus.OK);
    }

    @PutMapping("/admin/modelbike/{id}")
    public ResponseEntity<ModelBikeDTO> updateDepots(@RequestBody ModelBikeDTO modelBikeDTO, @PathVariable("id") Long id) throws Exception {

        return new ResponseEntity<>(modelBikeService.updateModelBikeDTO(modelBikeDTO,id), HttpStatus.OK);
    }

    @DeleteMapping("/admin/modelbike/delete")
    public ResponseEntity<HttpStatus> deleteDepots(@RequestParam("listID") List<Long> listID) throws Exception {
        boolean isDelete = modelBikeService.deleteModelBikeDTOById(listID);
        if (isDelete) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    @GetMapping("/admin/modelbike/manufactor/{id}")
    public ResponseEntity<List<ModelBikeDTO>> getListByManufactureId( @PathVariable("id") Long id) throws Exception {
        return new ResponseEntity<>(modelBikeService.getByManufactureId(id), HttpStatus.OK);
    }
}
