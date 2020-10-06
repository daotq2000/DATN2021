package com.sapo.qlsc.controller;

import com.sapo.qlsc.dto.MaintenanceCardDTO;
import com.sapo.qlsc.dto.MaintenanceCardDetailDTO;
import com.sapo.qlsc.entity.MaintenanceCardDetail;
import com.sapo.qlsc.exception.CodeExistedException;
import com.sapo.qlsc.exception.commonException.NotFoundException;
import com.sapo.qlsc.exception.maintenanceCardException.NotEnoughProductException;
import com.sapo.qlsc.exception.maintenanceCardException.NotFoundRepairmanException;
import com.sapo.qlsc.model.MaintenanceCardFilter;
import com.sapo.qlsc.service.MaintenanceCardDetailService;
import com.sapo.qlsc.service.MaintenanceCardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/admin/")
public class MaintenanceCardController {

    @Autowired
    private MaintenanceCardService maintenanceCardService;

    @Autowired
    private MaintenanceCardDetailService maintenanceCardDetailService;
    // Kiem tra quyen: NV dieu phoi
    @PostMapping("maintenanceCards")
    public ResponseEntity<MaintenanceCardDTO> insertMaintenanceCard(@RequestBody MaintenanceCardDTO maintenanceCardDTO) throws NotEnoughProductException, CodeExistedException {

        MaintenanceCardDTO maintenanceCardDTO1 = maintenanceCardService.insertMaintenanceCard(maintenanceCardDTO);
        return new ResponseEntity(maintenanceCardDTO1, HttpStatus.OK);

    }

    // NV quan li, NV dieu phoi, NV sua chua
    @GetMapping(path="maintenanceCards")
    public ResponseEntity<Map<String,Object>> searchMaintenanceCard(@ModelAttribute("maintenanceCardFilter") MaintenanceCardFilter maintenanceCardFilter){
        System.out.println(maintenanceCardFilter);
        Map<String,Object> allMaintenanceCard = maintenanceCardService.searchMaintenanceCard(maintenanceCardFilter);
        return new ResponseEntity(allMaintenanceCard, HttpStatus.OK);
    }

    // NV quan li, NV dieu phoi, NV sua chua
    @GetMapping(path="maintenanceCards/{id}")
    public ResponseEntity<MaintenanceCardDTO> searchMaintenanceCard(@PathVariable Long id) throws NotFoundException {
        MaintenanceCardDTO maintenanceCardDTO = maintenanceCardService.getMaintenanceCardById(id);
        return new ResponseEntity(maintenanceCardDTO, HttpStatus.OK);
    }

    // NV dieu phoi
    @PutMapping("maintenanceCards/{id}")
    public ResponseEntity<MaintenanceCardDTO> updateMaintenanceCard(@RequestBody MaintenanceCardDTO maintenanceCardDTO,@PathVariable Long id) throws NotEnoughProductException, NotFoundException, CodeExistedException {
        maintenanceCardDTO.setId(id);
        MaintenanceCardDTO maintenanceCardDTO1 = maintenanceCardService.updateMaintenanceCard(maintenanceCardDTO);
        return new ResponseEntity(maintenanceCardDTO1, HttpStatus.OK);
    }
    @GetMapping(path="/maintenanceCardsByCustomer/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> getMaintenanceCardsByIdCustomer(
            @RequestParam(name = "page", required = false, defaultValue = "1") Integer pageNumber,
            @RequestParam(name = "size", required = false, defaultValue = "5") Integer size,
            @PathVariable("id") Long id){
        Map<String,Object> allMaintenanceCards = maintenanceCardService.getMaintenanceCardByIdCustomer(pageNumber,size,id);
        return new ResponseEntity<>(allMaintenanceCards, HttpStatus.OK);

    }

    // Kiem tra quyen : NV sua chua
    @PutMapping("maintenanceCards/workStatus/{id}")
    public ResponseEntity<MaintenanceCardDTO> updateWorkStatusMaintenanceCard(@PathVariable Long id) throws NotFoundException, NotFoundRepairmanException {
        MaintenanceCardDTO maintenanceCardDTO = maintenanceCardService.updateAllStatusMaintenanceCard(id);
        return new ResponseEntity(maintenanceCardDTO, HttpStatus.OK);
    }

    // Kiem tra quyen : NV sua chua
    @PutMapping(value = "maintenanceCards/workStatus",consumes = MediaType.ALL_VALUE)
    public ResponseEntity updateMultiAllWorkStatusMaintenanceCard(@RequestBody  Long[] ids) throws NotFoundException, NotFoundRepairmanException {
        List<MaintenanceCardDTO> maintenanceCardDTOs = new ArrayList<>();
        int n = ids.length;
        for(int i=0;i<n;i++) {
            MaintenanceCardDTO maintenanceCardDTO = maintenanceCardService.updateAllStatusMaintenanceCard(ids[i]);
            maintenanceCardDTOs.add(maintenanceCardDTO);
        }
        return new ResponseEntity(maintenanceCardDTOs, HttpStatus.OK);
    }

    // Kiem tra quyen : NV sua chua
    @PutMapping("maintenanceCardDetails/status/{id}")
    public ResponseEntity<MaintenanceCardDTO> updateStatusMaintenanceCardDetail(@PathVariable Long id) throws NotFoundException, NotFoundRepairmanException {
        MaintenanceCardDTO maintenanceCardDTO = maintenanceCardDetailService.updateStatusMaintenanceCardDetail(id);
        return new ResponseEntity(maintenanceCardDTO, HttpStatus.OK);
    }
}