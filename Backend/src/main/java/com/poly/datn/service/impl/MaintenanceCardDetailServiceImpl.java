package com.poly.datn.service.impl;

import com.poly.datn.converter.MaintenanceCardConverter;
import com.poly.datn.converter.MaintenanceCardDetailConverter;
import com.poly.datn.converter.ProductConverter;
import com.poly.datn.converter.ServiceConverter;
import com.poly.datn.dto.MaintenanceCardDTO;
import com.poly.datn.dto.TopProductDTO;
import com.poly.datn.dto.TopService;
import com.poly.datn.entity.MaintenanceCard;
import com.poly.datn.entity.MaintenanceCardDetail;
import com.poly.datn.entity.MaintenanceCardDetailStatusHistory;
import com.poly.datn.entity.User;
import com.poly.datn.exception.commonException.NotFoundException;
import com.poly.datn.exception.maintenanceCardException.NotFoundRepairmanException;
import com.poly.datn.model.MessageModel;
import com.poly.datn.repository.*;
import com.poly.datn.service.MaintenanceCardDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;


import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.*;

@Service
public class MaintenanceCardDetailServiceImpl implements MaintenanceCardDetailService {
    @Autowired
    private
    MaintenanceCardRepository maintenanceCardRepository;
    @Autowired
    private MaintenanceCardDetailRepository maintenanceCardDetailRepository;

    @Autowired
    private MaintenanceCardDetailConverter maintenanceCardDetailConverter;

    @Autowired
    private MaintenanceCardConverter maintenanceCardConverter;

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;
    @Autowired
    EntityManager entityManager;
    @Autowired
    ServiceConverter serviceConverter;
    @Autowired
    ServiceRepository getServiceRepository;
    @Autowired
    ProductConverter productConverter;
    @Autowired
    ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;
    private final float timeEmp = 11;
    private final int openStore = 7;
    @Autowired private
    ServiceRepository serviceRepository;
    @Override
    public MaintenanceCardDTO updateStatusMaintenanceCardDetail(Long id, String email) throws NotFoundException, NotFoundRepairmanException {
        System.out.println("update Status");
        System.out.println("maintenance card detail: " + id);
        Date now = new Date();
        MaintenanceCardDetail maintenanceCardDetail = maintenanceCardDetailRepository.findById(id).orElse(null);
        MaintenanceCard mc = maintenanceCardRepository.getOne(maintenanceCardDetail.getMaintenanceCard().getId());
        Date returnDate = new Date();
        MaintenanceCard maintenanceCard = maintenanceCardDetail.getMaintenanceCard();
        if (maintenanceCard.getRepairman() == null || maintenanceCard.getRepairman().getEmail() == email) {
            throw new NotFoundException("Not found maintenance card detail");
        }

        byte status = 1;
        boolean check = true;
        if (maintenanceCardDetail != null && maintenanceCard.getRepairman() != null) {

            if (maintenanceCardDetail.getStatus() < 2) {

                if(maintenanceCardDetail.getStatus() ==1){
                    Optional<com.poly.datn.entity.Service> sv = serviceRepository.findById(maintenanceCardDetail.getService().getId());
                    Float timeFinish = convertToFloatTotalTime(sv.get().getTime());
                    float difference = mc.getTotalTime() - mc.getOriginalTime();
                    if(difference <= 0 ){
                        maintenanceCard.setTotalTime(maintenanceCard.getTotalTime()-timeFinish);

                    }else{
                        maintenanceCard.setTotalTime((maintenanceCard.getTotalTime()-difference)-timeFinish);
                    }

                    maintenanceCard.setTimeLeft(maintenanceCard.getTotalTime());
                    System.out.println("time Total after set: "+maintenanceCard.getTotalTime());
                }
                maintenanceCardDetail.setStatus((byte) (maintenanceCardDetail.getStatus() + 1));
                MaintenanceCardDetailStatusHistory maintenanceCardDetailStatusHistory = new MaintenanceCardDetailStatusHistory();
                maintenanceCardDetailStatusHistory.setCreatedDate(now);
                maintenanceCardDetailStatusHistory.setModifiedDate(now);
                maintenanceCardDetailStatusHistory.setMaintenanceCardDetail(maintenanceCardDetail);
                maintenanceCardDetailStatusHistory.setStatus((byte) (maintenanceCardDetail.getStatus()));
                maintenanceCardDetail.getMaintenanceCardDetailStatusHistories().add(maintenanceCardDetailStatusHistory);
                if (maintenanceCardDetail.getService() != null) {
                    if (maintenanceCardDetail.getStatus() == 1 || maintenanceCardDetail.getStatus() == 2) {
                        status = 1;
                    }
                    if (maintenanceCardDetail.getStatus() != 2) {
                        check = false;
                    }
                }
            }
            if (maintenanceCardDetail.getStatus() == 1) {
                mc.setTimeStart(new Date());
                Date startTime = maintenanceCard.getTimeStart();
                float totalTimeMaintenanceCard = maintenanceCard.getTotalTime();
                String t = String.valueOf(totalTimeMaintenanceCard);
                System.out.println("totalTimeMaintenanceCard" + totalTimeMaintenanceCard);
                int hour = Integer.parseInt(t.substring(0, t.indexOf(".")));
                String minuteString = t.substring((t.indexOf(".") + 1), t.length());
                System.out.println("minuteString" + minuteString);
                int minute = Integer.valueOf(String.valueOf(minuteString));

                float timeLeftOfEmp = timeEmp - ((startTime.getHours()) - 7);


                if (timeLeftOfEmp < 0) {
                    timeLeftOfEmp = 0;
                }
                System.out.println("timeLeftOfEmp" + startTime.getHours());
                if (totalTimeMaintenanceCard <= 11) {
                    System.out.println("totalTimeMaintenanceCard <= 11");
                    String s = totalTimeMaintenanceCard + "";
                    int hourFirst = Integer.parseInt(s.substring(0, s.indexOf(".")));
                    int minuteFirst = Integer.parseInt(s.substring((s.indexOf(".") + 1)));
                    int hoursTotalTime = Integer.parseInt(s.substring(0, s.indexOf(".")));
                    int minuteTotalTime = Integer.parseInt(s.substring((s.indexOf(".") + 1), s.length()));
                    if (minuteTotalTime < 10) {
                        minuteTotalTime = minuteTotalTime * 10;
                    }
                    int sumTime = startTime.getHours() + (hoursTotalTime);

                    if (sumTime >= 7 && sumTime <= 18) {
                        System.out.println("minuteTotalTime: " + minuteTotalTime);
                        System.out.println("sumTime: " + sumTime);
                        System.out.println("case1");
                        if (sumTime >= 12 && startTime.getHours() <12) {
                            hoursTotalTime += 1;
                        }
                        int minuteLeft =  (60 - startTime.getMinutes());
                        System.out.println("minuteLeft"+ minuteLeft);
                        if (minuteTotalTime >= minuteLeft) {
                            hoursTotalTime += 1;
                            System.out.println(60 - startTime.getMinutes());
                            minuteTotalTime = minuteTotalTime - (60 - startTime.getMinutes());
                            System.out.println("1." + hoursTotalTime);
                            System.out.println("2." + minuteTotalTime);
                        }
                        int hourReturn = startTime.getHours() + (hoursTotalTime);
                        int minuteReturn = startTime.getMinutes() + minuteTotalTime;
                        System.out.println("hourReturn: "+hourReturn);
                        System.out.println("minuteReturn: "+minuteReturn);
                        if(hourReturn > 18){
                            int left1 = 19 - startTime.getHours();
                            if(left1 >=0){
                                returnDate.setDate(startTime.getDate()+1);
                                returnDate.setMinutes(minuteTotalTime);
                                returnDate.setHours(7+(hoursTotalTime-left1));

                            }else{
                                returnDate.setDate(startTime.getDate()+1);
                                returnDate.setMinutes(minuteFirst);
                                returnDate.setHours(7+(hourFirst));
                            }
                        }else{

                            if((startTime.getHours()+hourFirst) <= 18 && (startTime.getMinutes()+minuteFirst) <= 60){
                                System.out.println("TH1");
                                returnDate.setDate(startTime.getDate());
                                returnDate.setMinutes(startTime.getMinutes()+minuteFirst);
                                returnDate.setHours(startTime.getHours() + (hourFirst));
                            }else if((startTime.getHours()+hourFirst) <= 18 && (startTime.getMinutes()+minuteFirst) >= 60){
                                System.out.println("TH2");

                                if(startTime.getHours()+hourFirst == 18 && startTime.getMinutes()+minuteFirst >=60){
                                    returnDate.setDate(startTime.getDate()+1);
                                    returnDate.setHours(7+(18-(startTime.getHours()+hourFirst)));
                                    returnDate.setMinutes(minuteFirst);
                                }
                            } else {
                                System.out.println("TH3");
                                returnDate.setDate(startTime.getDate()+1);
                                returnDate.setHours(7+(18-(startTime.getHours()+hourFirst)));
                                returnDate.setMinutes(minuteFirst);
                            }
                            System.out.println("returnDate.getHours(): "+returnDate.getHours());
                            System.out.println("returnDate.getMinutes(): "+returnDate.getMinutes());
                        }

                    } else {
                        //day la truong hop tao phieu luc 18h tro di
                        System.out.println("case2");

                        if (startTime.getHours() - 18 == 0 && (startTime.getMinutes() + minuteTotalTime) > 58) {
                            //tru di so phut hien tai dang sua va chuyen time sang ngay moi
                            System.out.println("18h");
                            returnDate.setDate(startTime.getDate() + 1);
                            returnDate.setHours(7 + (startTime.getHours() - 18) + hoursTotalTime);
                            returnDate.setMinutes(((startTime.getMinutes() + minuteTotalTime) - 60));
                        } else {

                            int hourLeft = 18 - startTime.getHours();
                            int minuteLeft = 60 - startTime.getMinutes();
                            if (hourLeft >= 0) {
                                returnDate.setDate(startTime.getDate() + 1);
                                returnDate.setHours(7 + (hoursTotalTime - hourLeft));
                                if (startTime.getMinutes() + minuteTotalTime < 58) {
                                    if (minuteLeft > 0) {
                                        returnDate.setMinutes(minuteTotalTime - minuteLeft);
                                    } else {
                                        returnDate.setMinutes(0);
                                    }
                                } else {
                                    returnDate.setHours(returnDate.getHours() + 1);
                                    returnDate.setMinutes((startTime.getMinutes() + minuteTotalTime) - 60);
                                }
                            } else {
                                int sumOfTime = openStore + hour;
                                if (sumOfTime >= 12) {
                                    sumOfTime += 1;
                                }
                                returnDate.setHours(sumOfTime);
                                returnDate.setMinutes(0 + (int) minute);
                            }
                        }
                    }
                    System.out.println("-----------1--------------");
                    System.out.println("hoursTotalTime" + hoursTotalTime);
                    System.out.println("minuteTotalTime" + minuteTotalTime);
                    System.out.println("returnDate" + returnDate);
                } else if (totalTimeMaintenanceCard > timeLeftOfEmp && totalTimeMaintenanceCard >= timeEmp) {
                    System.out.println("totalTimeMaintenanceCard > 11");
                    float[] totalTime = totalTimeService(totalTimeMaintenanceCard, timeEmp, timeLeftOfEmp);
                    System.out.println("total Time" + Arrays.toString(totalTime));
                    returnDate.setDate(returnDate.getDate() + ((int) totalTime[0]));
                    String c = String.valueOf(totalTime[1]);
                    int hoursTotalTime = Integer.parseInt(c.substring(0, c.indexOf(".")));
                    int minuteTotalTime = Integer.parseInt(c.substring((c.indexOf(".") + 1), c.length()));
                    if (minuteTotalTime < 10) {
                        minuteTotalTime = minuteTotalTime * 10;
                    }
                    if (7 + hoursTotalTime >= 12) {
                        hoursTotalTime += 1;
                    }
                    returnDate.setHours(7 + hoursTotalTime);
                    returnDate.setMinutes(0 + minuteTotalTime);
                    System.out.println("-----------2--------------");

                    System.out.println("hoursTotalTime" + hoursTotalTime);
                    System.out.println("minuteTotalTime" + minuteTotalTime);
                    System.out.println("returnDate " + returnDate);
                    System.out.println("returnDate " + returnDate.getDay() + "/" + returnDate.getMonth());
                }
                maintenanceCard.setReturnDate(returnDate);
                maintenanceCardRepository.save(mc);

            }

            for (MaintenanceCardDetail maintenanceCardDetail1 : maintenanceCard.getMaintenanceCardDetails()) {
                if (maintenanceCardDetail1.getId() != maintenanceCardDetail.getId()) {
                    if (maintenanceCardDetail1.getService() != null) {
                        if (maintenanceCardDetail1.getStatus() == 1 || maintenanceCardDetail1.getStatus() == 2) {
                            status = 1;
                        }
                        if (maintenanceCardDetail1.getStatus() != 2) {
                            check = false;
                        }
                    }
                }
            }
            if (check) {
                maintenanceCard.setWorkStatus((byte) 2);
            } else {
                maintenanceCard.setWorkStatus(status);
            }

            MaintenanceCardDetail maintenanceCardDetail1 = maintenanceCardDetailRepository.save(maintenanceCardDetail);
            MaintenanceCard maintenanceCard1 = maintenanceCardDetail1.getMaintenanceCard();
            MessageModel messageModel = new MessageModel();
            if (maintenanceCard1.getWorkStatus() == 2 && maintenanceCard1.getPayStatus() == 0) {
                messageModel.setType(2);
                messageModel.setMessage(maintenanceCard.getId().toString());
                for (User user : userRepository.getAllManager()) {
                    simpMessagingTemplate.convertAndSend("/topic/messages/" + user.getId(), messageModel);
                }
            } else {
                messageModel.setType(3);
                messageModel.setMessage(maintenanceCard.getId().toString());
                messageModel.setCode(maintenanceCard.getCode().toString());
                for (User user : userRepository.getAllManager()) {
                    simpMessagingTemplate.convertAndSend("/topic/messages/" + user.getId(), messageModel);
                }
            }

            messageModel.setType(3);
            messageModel.setMessage(maintenanceCard.getId().toString());
            messageModel.setCode(maintenanceCard.getCode().toString());
//            if(maintenanceCard1.getRepairman() != null){
//                simpMessagingTemplate.convertAndSend("/topic/messages/" + maintenanceCard1.getRepairman().getId(), messageModel);
//            }
            if (maintenanceCard1.getCoordinator() != null) {
                simpMessagingTemplate.convertAndSend("/topic/messages/" + maintenanceCard1.getCoordinator().getId(), messageModel);
            }
            if(mc.getWorkStatus() == 2){
                mc.setReturnDate(now);
                maintenanceCardRepository.save(mc);
            }
            System.out.println("ws"+mc.getWorkStatus());
            return maintenanceCardConverter.convertAllToDTO(maintenanceCard1);
        } else if (maintenanceCard.getRepairman() != null) {
            throw new NotFoundException("Not found maintenance card detail");
        } else {
            throw new NotFoundRepairmanException("");
        }

    }

    @Override
    public List<TopService> getListService() {
        List<TopService> topServiceList = new ArrayList<>();
        String sql = "SELECT m.service_id,count(m.service_id) as total FROM maintenance_card_details m  \n" +
                "                where m.is_delete = 0  and service_id is not null\n" +
                "                 group by m.service_id  \n" +
                "                 order by count(m.service_id) desc \n" +
                "                 limit 5";
        Query query = entityManager.createNativeQuery(sql);
        List<Object[]> listObect = query.getResultList();
        for (Object[] objects : listObect) {
            TopService topService = new TopService();
            for (int j = 0; j < 2; j++) {

                if (objects[j] == null)
                    continue;
                switch (j) {
                    case 0:
                        topService.setServiceDTO(serviceConverter.convertToDTO(getServiceRepository.getOne(Long.valueOf(String.valueOf(objects[j])))));
                        break;
                    case 1:
                        topService.setTotal(String.valueOf(objects[j]));
                        break;
                    default:
                        break;
                }

            }
            topServiceList.add(topService);
        }
        return topServiceList;
    }

    @Override
    public List<TopProductDTO> getListTopProduct() {
        List<TopProductDTO> topProductDTOS = new ArrayList<>();
        String sql = "SELECT m.product_id,count(m.product_id) as total FROM maintenance_card_details m where m.is_delete = 0 group by m.product_id order by count(m.product_id) desc limit 5";
        Query query = entityManager.createNativeQuery(sql);
        List<Object[]> listObect = query.getResultList();
        for (Object[] objects : listObect) {
            TopProductDTO productDTO = new TopProductDTO();
            for (int j = 0; j < 2; j++) {

                if (objects[j] == null)
                    continue;
                switch (j) {
                    case 0:
                      productDTO.setProductDTO(productConverter.convertToDTO(productRepository.getOne(Long.valueOf(String.valueOf(objects[j])))));
                        break;
                    case 1:
                       productDTO.setTotal(String.valueOf(objects[j]));
                        break;
                    default:
                        break;
                }

            }
            topProductDTOS.add(productDTO);
        }
        return topProductDTOS;
    }


    public static float[] totalTimeService(float timeService, float timeEmp, float timeLeftEmp) {
        float[] result = new float[2];
        System.out.println("param [" + timeService + "," + timeEmp + "," + timeLeftEmp + "]");
        int i = 1;
        do {
            if (timeLeftEmp > 0) {
                timeService = timeService - timeLeftEmp;
                timeLeftEmp = 0;
            } else {
                timeService = timeService - timeEmp;
                i++;
            }
            System.out.println("timeService" + timeService);
        } while (timeService >= 0 && timeService >= timeEmp);
        result[0] = i;
        String b = String.valueOf(timeService);
        if (b.length() == 3) {
            b = b.substring(0, 3);
        } else if (b.length() > 3) {
            b = b.substring(0, 4);
            System.out.println("b: " + b);
        }
        result[1] = Float.parseFloat(b);
        System.out.println("Days: "+result[0]);
        return result;
    }
    public Float convertToFloatTotalTime(String timeService){
        int hour = Integer.parseInt(timeService.substring(0,timeService.indexOf("-")));
        int minute = Integer.parseInt(timeService.substring(timeService.indexOf("-")+1,timeService.length()));
        String result = hour+"."+minute;
        System.out.println("Time: "+result);
        return new Float(result);
    }
}
