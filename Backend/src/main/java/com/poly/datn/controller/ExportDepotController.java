package com.poly.datn.controller;

import com.poly.datn.dto.ExportDepotDTO;
import com.poly.datn.exception.CodeExistedException;
import com.poly.datn.exception.commonException.NotFoundException;
import com.poly.datn.service.ExportDepotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
@RestController
@RequestMapping("/admin")
public class ExportDepotController {
    private ExportDepotService exportDepotService;
    @Autowired
    public ExportDepotController(ExportDepotService exportDepotService) {
        this.exportDepotService = exportDepotService;
    }

    @GetMapping("/exportDepots")
    public ResponseEntity<Map<String, Object>> getAllExportDepots(@RequestParam(name = "pageNum", defaultValue = "1", required = false) int pageNum,
                                                            @RequestParam(name = "pageSize", defaultValue = "5", required = false) int pageSize,
                                                            @RequestParam(value = "sortBy", defaultValue = "") String sortBy,
                                                            @RequestParam(value = "descending", defaultValue = "") String descending,
                                                            @RequestParam(value = "param", defaultValue = "") String param) {
        return new ResponseEntity<>(exportDepotService.getListExportDepot(pageNum, pageSize, sortBy, descending, param), HttpStatus.OK);
    }

    @PostMapping("/exportDepots")
    public ResponseEntity<ExportDepotDTO> insertExportDepots(@RequestBody ExportDepotDTO ExportDepotDTO) throws CodeExistedException {
         
        return new ResponseEntity<>(exportDepotService.insertExportDepot(ExportDepotDTO), HttpStatus.OK);
    }

    @PutMapping("/exportDepots/{id}")
    public ResponseEntity<ExportDepotDTO> updateExportDepots(@RequestBody ExportDepotDTO ExportDepotDTO, @PathVariable("id") Long id) throws NotFoundException {
        return new ResponseEntity<>(exportDepotService.updateExportDepot(ExportDepotDTO, id), HttpStatus.OK);
    }

    @DeleteMapping("exportDepots/delete")
    public ResponseEntity<HttpStatus> deleteExportDepots(@RequestParam("listID") List<Long> listID) throws Exception {
        boolean isDelete = exportDepotService.deleteExportDepotById(listID);
        if (isDelete) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/exportDepots/{id}")
    public ResponseEntity<ExportDepotDTO> getExportDepotsById(@PathVariable("id") Long id) throws NotFoundException {
        return new ResponseEntity<>(exportDepotService.getExportDepotById(id), HttpStatus.OK);
    }


}
