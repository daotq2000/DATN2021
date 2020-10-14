package com.sapo.qlsc;

import com.sapo.qlsc.dto.MaintenanceCardDTO;
import com.sapo.qlsc.dto.PaymentHistoryDTO;
import com.sapo.qlsc.dto.PaymentMethodDTO;
import com.sapo.qlsc.dto.UserDTO;
import com.sapo.qlsc.entity.MaintenanceCard;
import com.sapo.qlsc.entity.User;
import com.sapo.qlsc.exception.commonException.NotFoundException;
import com.sapo.qlsc.exception.maintenanceCardException.MoneyExceedException;
import com.sapo.qlsc.repository.MaintenanceCardRepository;
import com.sapo.qlsc.repository.UserRepository;
import com.sapo.qlsc.repository.UserRepositoryCustom;
import com.sapo.qlsc.repository.impl.UserRepositoryCustomImpl;
import com.sapo.qlsc.service.impl.PaymentHistoryServiceImpl;
import com.sapo.qlsc.service.impl.UserServiceImpl;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.json.JSONObject;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.util.Assert;

import javax.persistence.EntityManagerFactory;
import javax.persistence.Query;
import java.math.BigDecimal;
import java.time.Clock;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;


@SpringBootTest
class DemoApplicationTests {

    @Autowired
    private MaintenanceCardRepository userRepositoryCustom;
    @Autowired UserServiceImpl userService;
    @Autowired
    PaymentHistoryServiceImpl paymentHistoryService;

@Test
    public void CheckLogin(){
//    System.out.println(userRepositoryCustom.getMaintenanceCardByPlatesNumber(Long.valueOf(41)));
    Thread Thread1 = new Thread(() -> {
        List<PaymentHistoryDTO> list= new ArrayList<>();
        PaymentHistoryDTO paymentHistoryDTO= new PaymentHistoryDTO();
        MaintenanceCardDTO maintenanceCard = new MaintenanceCardDTO();
        maintenanceCard.setId(Long.valueOf(63));
        paymentHistoryDTO.setMoney(new BigDecimal(1500));
        PaymentMethodDTO paymentMethodDTO = new PaymentMethodDTO();
        paymentMethodDTO.setId((long) 1);
        paymentHistoryDTO.setPaymentMethod(paymentMethodDTO);
        paymentHistoryDTO.setMaintenanceCard(maintenanceCard);
        list.add(paymentHistoryDTO);
        try {
            paymentHistoryService.insertPaymentHistory(list);
        } catch (NotFoundException | MoneyExceedException e) {
            e.printStackTrace();
        }
    });
    Thread1.start();
    Thread Thread2 = new Thread(() -> {
        List<PaymentHistoryDTO> list= new ArrayList<>();
        PaymentHistoryDTO paymentHistoryDTO= new PaymentHistoryDTO();
        MaintenanceCardDTO maintenanceCard = new MaintenanceCardDTO();
        maintenanceCard.setId(Long.valueOf(63));
        paymentHistoryDTO.setMoney(new BigDecimal(1500));
        PaymentMethodDTO paymentMethodDTO = new PaymentMethodDTO();
        paymentMethodDTO.setId((long) 1);
        paymentHistoryDTO.setPaymentMethod(paymentMethodDTO);
        paymentHistoryDTO.setMaintenanceCard(maintenanceCard);
        list.add(paymentHistoryDTO);
        try {
            paymentHistoryService.insertPaymentHistory(list);
        } catch (NotFoundException | MoneyExceedException e) {
            e.printStackTrace();
        }
    });
    Thread2.start();



}
}
