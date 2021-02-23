package com.poly.datn.controller;

import com.poly.datn.exception.CodeExistedException;
import com.poly.datn.exception.commonException.NotFoundException;
import com.poly.datn.dto.DepotDTO;
import com.poly.datn.service.impl.DepotServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin")
public class DepotController {
    private DepotServiceImpl depotService;

    @Autowired
    public DepotController(DepotServiceImpl depotService) {
        this.depotService = depotService;
    }

    @GetMapping("/depots")
    public ResponseEntity<Map<String, Object>> getAllDepots(@RequestParam(name = "pageNum", defaultValue = "1", required = false) int pageNum,
                                                            @RequestParam(name = "pageSize", defaultValue = "5", required = false) int pageSize,
                                                            @RequestParam(value = "sortBy", defaultValue = "") String sortBy,
                                                            @RequestParam(value = "descending", defaultValue = "") String descending,
                                                            @RequestParam(value = "param", defaultValue = "") String param) {
        return new ResponseEntity<>(depotService.getListDepot(pageNum, pageSize, sortBy, descending, param), HttpStatus.OK);
    }

    @PostMapping("/depots")
    public ResponseEntity<DepotDTO> insertDepots(@RequestBody DepotDTO depotDTO,@RequestParam(value = "addAlL",defaultValue = "false") Boolean addAlLProduct) throws CodeExistedException {
        System.out.println("addAlLProduct: "+addAlLProduct);
        return new ResponseEntity<>(depotService.insertDepot(depotDTO,addAlLProduct), HttpStatus.OK);
    }

    @PutMapping("/depots/{id}")
    public ResponseEntity<DepotDTO> updateDepots(@RequestBody DepotDTO depotDTO, @PathVariable("id") Long id) throws NotFoundException {
        return new ResponseEntity<>(depotService.updateDepot(depotDTO, id), HttpStatus.OK);
    }

    @DeleteMapping("depots/delete")
    public ResponseEntity<HttpStatus> deleteDepots(@RequestParam("listID") List<Long> listID) throws Exception {
        boolean isDelete = depotService.deleteDepotById(listID);
        if (isDelete) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/depots/{id}")
    public ResponseEntity<DepotDTO> getDepotsById(@PathVariable("id") Long id) throws NotFoundException {
        return new ResponseEntity<>(depotService.getDepotById(id), HttpStatus.OK);
    }

    @GetMapping("/depots/products")
    public ResponseEntity<Map<String, Object>> getAllProductByDepotId(@RequestParam(name = "pageNum", defaultValue = "1", required = false) int pageNum,
                                                                      @RequestParam(name = "pageSize", defaultValue = "5", required = false) int pageSize,
                                                                      @RequestParam(value = "sortBy", defaultValue = "") String sortBy,
                                                                      @RequestParam(value = "descending", defaultValue = "") String descending,
                                                                      @RequestParam(value = "param", defaultValue = "") String param                                                                       ) {
        return new ResponseEntity<>(depotService.getListProductByDepotId(pageNum, pageSize, sortBy, descending, param), HttpStatus.OK);
    }

}
