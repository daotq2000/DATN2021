package com.poly.datn.controller;

import com.poly.datn.dto.PaymentHistoryDTO;
import com.poly.datn.dto.PaymentMethodDTO;
import com.poly.datn.dto.TopService;
import com.poly.datn.entity.MaintenanceCard;
import com.poly.datn.exception.maintenanceCardException.MoneyExceedException;
import com.poly.datn.exception.maintenanceCardException.NotUpdateException;
import com.poly.datn.dto.MaintenanceCardDTO;
import com.poly.datn.exception.CodeExistedException;
import com.poly.datn.exception.commonException.NotFoundException;
import com.poly.datn.exception.maintenanceCardException.NotEnoughProductException;
import com.poly.datn.exception.maintenanceCardException.NotFoundRepairmanException;
import com.poly.datn.model.MaintenanceCardCustomer;
import com.poly.datn.model.MaintenanceCardFilter;
import com.poly.datn.repository.UserRepositoryCustom;
import com.poly.datn.service.MaintenanceCardDetailService;
import com.poly.datn.service.MaintenanceCardService;
import com.poly.datn.service.PaymentHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/admin/")
public class MaintenanceCardController {
    @Autowired
    PaymentHistoryService paymentHistoryService;
    @Autowired
    private MaintenanceCardService maintenanceCardService;
    @Autowired
    UserRepositoryCustom userRepositoryCustom;
    @Autowired
    private MaintenanceCardDetailService maintenanceCardDetailService;
    //goi y nhan vien sua chua
    @GetMapping("/maintenanceCards/total")
    public ResponseEntity<List<Map<String, Object>>> getTotalTimeAndCountMaintenanceCard(@RequestParam(value = "page") int page,
                                                                                         @RequestParam(value = "size") int size) {
        return new ResponseEntity(maintenanceCardService.getTotalTimeAndSumMaintenanceCard(page, size),HttpStatus.OK);
    }

    // Kiem tra quyen: NV dieu phoi
    @PostMapping("maintenanceCards")
    public ResponseEntity<MaintenanceCardDTO> insertMaintenanceCard(@RequestBody MaintenanceCardDTO maintenanceCardDTO) throws Exception {

        MaintenanceCardDTO maintenanceCardDTO1 = maintenanceCardService.insertMaintenanceCard(maintenanceCardDTO);
        return new ResponseEntity(maintenanceCardDTO1, HttpStatus.OK);

    }

    // NV quan li, NV dieu phoi, NV sua chua
    @GetMapping("maintenanceCards")
    public ResponseEntity<Map<String, Object>> searchMaintenanceCard(@ModelAttribute("maintenanceCardFilter") MaintenanceCardFilter maintenanceCardFilter) {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        List<String> roles = authentication.getAuthorities().stream()
                .map(r -> r.getAuthority()).collect(Collectors.toList());
        Map<String, Object> allMaintenanceCard = maintenanceCardService.searchMaintenanceCard(maintenanceCardFilter, authentication.getName(), Integer.parseInt(roles.get(0).split("_")[1]));

//        Thread Thread1 = new Thread(() -> {
//            List<PaymentHistoryDTO> list= new ArrayList<>();
//            PaymentHistoryDTO paymentHistoryDTO= new PaymentHistoryDTO();
//            MaintenanceCardDTO maintenanceCard = new MaintenanceCardDTO();
//            maintenanceCard.setId(Long.valueOf(351));
//            paymentHistoryDTO.setMoney(new BigDecimal(30000));
//            PaymentMethodDTO paymentMethodDTO = new PaymentMethodDTO();
//            paymentMethodDTO.setId((long) 1);
//            paymentHistoryDTO.setPaymentMethod(paymentMethodDTO);
//            paymentHistoryDTO.setMaintenanceCard(maintenanceCard);
//            list.add(paymentHistoryDTO);
//            System.out.println("role: DP");
//            try {
//                paymentHistoryService.insertPaymentHistory(list);
//            } catch (NotFoundException | MoneyExceedException e) {
//                e.printStackTrace();
//            }
//        });
//        Thread1.start();
//        Thread Thread2 = new Thread(() -> {
//            List<PaymentHistoryDTO> list= new ArrayList<>();
//            PaymentHistoryDTO paymentHistoryDTO= new PaymentHistoryDTO();
//            MaintenanceCardDTO maintenanceCard = new MaintenanceCardDTO();
//            maintenanceCard.setId(Long.valueOf(351));
//            paymentHistoryDTO.setMoney(new BigDecimal(30000));
//            PaymentMethodDTO paymentMethodDTO = new PaymentMethodDTO();
//            paymentMethodDTO.setId((long) 1);
//            paymentHistoryDTO.setPaymentMethod(paymentMethodDTO);
//            paymentHistoryDTO.setMaintenanceCard(maintenanceCard);
//            list.add(paymentHistoryDTO);
//            System.out.println("role. QLy");
//            try {
//                paymentHistoryService.insertPaymentHistory(list);
//            } catch (NotFoundException | MoneyExceedException e) {
//                e.printStackTrace();
//            }
//        });
//        Thread2.start();




        return new ResponseEntity(allMaintenanceCard, HttpStatus.OK);
    }

    // NV quan li, NV dieu phoi, NV sua chua
    @GetMapping("maintenanceCards/{id}")
    public ResponseEntity<MaintenanceCardDTO> searchMaintenanceCard(@PathVariable Long id) throws NotFoundException {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        List<String> roles = authentication.getAuthorities().stream()
                .map(r -> r.getAuthority()).collect(Collectors.toList());
        MaintenanceCardDTO maintenanceCardDTO = maintenanceCardService.getMaintenanceCardById(id, authentication.getName(), Integer.parseInt(roles.get(0).split("_")[1]));
        return new ResponseEntity(maintenanceCardDTO, HttpStatus.OK);
    }

    // NV dieu phoi
    @PutMapping("maintenanceCards/{id}")
    public ResponseEntity<MaintenanceCardDTO> updateMaintenanceCard(@RequestBody MaintenanceCardDTO maintenanceCardDTO, @PathVariable Long id) throws Exception {
        maintenanceCardDTO.setId(id);
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        List<String> roles = authentication.getAuthorities().stream()
                .map(r -> r.getAuthority()).collect(Collectors.toList());
        MaintenanceCardDTO maintenanceCardDTO1 = maintenanceCardService.updateMaintenanceCard(maintenanceCardDTO, authentication.getName(), Integer.parseInt(roles.get(0).split("_")[1]));
        return new ResponseEntity(maintenanceCardDTO1, HttpStatus.OK);
    }

    @GetMapping("/maintenanceCards/customer")
    public ResponseEntity<Map<String, Object>> getMaintenanceCardsByIdCustomer(@ModelAttribute("maintenanceCardCustomer") MaintenanceCardCustomer maintenanceCardCustomer) {
        System.out.println(maintenanceCardCustomer);
        Map<String, Object> allMaintenanceCards = maintenanceCardService.getMaintenanceCardByIdCustomer(maintenanceCardCustomer);
        return new ResponseEntity<>(allMaintenanceCards, HttpStatus.OK);

    }

    // Kiem tra quyen : NV sua chua
    @PutMapping("maintenanceCards/workStatus/{id}")
    public ResponseEntity<MaintenanceCardDTO> updateWorkStatusMaintenanceCard(@PathVariable Long id) throws NotFoundException, NotFoundRepairmanException {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        List<String> roles = authentication.getAuthorities().stream()
                .map(r -> r.getAuthority()).collect(Collectors.toList());
        MaintenanceCardDTO maintenanceCardDTO = maintenanceCardService.updateAllStatusMaintenanceCard(id, authentication.getName(), Integer.parseInt(roles.get(0).split("_")[1]));
        return new ResponseEntity(maintenanceCardDTO, HttpStatus.OK);
    }

    // Kiem tra quyen : NV sua chua
    @PutMapping(path = "maintenanceCards/workStatus", consumes = MediaType.ALL_VALUE)
    public ResponseEntity updateMultiAllWorkStatusMaintenanceCard(@RequestBody Long[] ids) throws NotFoundException, NotFoundRepairmanException {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        List<String> roles = authentication.getAuthorities().stream()
                .map(r -> r.getAuthority()).collect(Collectors.toList());
        List<MaintenanceCardDTO> maintenanceCardDTOs = new ArrayList<>();
        int n = ids.length;
        for (int i = 0; i < n; i++) {
            MaintenanceCardDTO maintenanceCardDTO = maintenanceCardService.updateAllStatusMaintenanceCard(ids[i], authentication.getName(), Integer.parseInt(roles.get(0).split("_")[1]));
            maintenanceCardDTOs.add(maintenanceCardDTO);
        }
        return new ResponseEntity(maintenanceCardDTOs, HttpStatus.OK);
    }

    // Kiem tra quyen : NV sua chua
    @PutMapping("maintenanceCardDetails/status/{id}")
    public ResponseEntity<MaintenanceCardDTO> updateStatusMaintenanceCardDetail(@PathVariable Long id) throws NotFoundException, NotFoundRepairmanException {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        MaintenanceCardDTO maintenanceCardDTO = maintenanceCardDetailService.updateStatusMaintenanceCardDetail(id, authentication.getName());
        return new ResponseEntity(maintenanceCardDTO, HttpStatus.OK);
    }

    @DeleteMapping("maintenanceCards/{id}")
    public ResponseEntity<Boolean> deleteMaintenanceCard(@PathVariable Long id) throws NotFoundException, NotFoundRepairmanException, NotEnoughProductException {
        boolean check = maintenanceCardService.deleteMaintenanceCard(id);
        return new ResponseEntity(check, HttpStatus.OK);
    }

    @GetMapping("/maintenanceCards/Plates/{idCustomer}")
    public ResponseEntity<List<String>> getPlatesNumberByCustomerId(@PathVariable("idCustomer") Long idCustomer) {
        return new ResponseEntity<>(maintenanceCardService.getPlatesNumberByCustomerId(idCustomer), HttpStatus.OK);
    }
    @GetMapping("/maintenanceCards/timeLeft/{id}")
    public ResponseEntity<MaintenanceCardDTO> getMinTimeLeft(@PathVariable("id") Long repairManID){
        return new ResponseEntity<>(maintenanceCardService.getMinTimeLeftMaintenanceCard(repairManID),HttpStatus.OK);
    }
    @GetMapping("/maintenanceCards/topservice")
    public ResponseEntity<?> getTopService(){
        return new ResponseEntity<>(maintenanceCardDetailService.getListService(),HttpStatus.OK);
    }
    @GetMapping("/maintenanceCards/topproduct")
    public ResponseEntity<?> getTopProduct(){
        return new ResponseEntity<>(maintenanceCardDetailService.getListTopProduct(),HttpStatus.OK);
    }
}
