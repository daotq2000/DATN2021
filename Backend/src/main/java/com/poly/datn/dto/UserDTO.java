package com.poly.datn.dto;

import com.poly.datn.entity.Depot;
import com.poly.datn.entity.ExportDepot;
import com.poly.datn.entity.ReceiptDepot;
import com.poly.datn.entity.Request;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class UserDTO extends BaseDTO{

    private String code;
    private String email;

    private String password;

    private String fullName;

    private String phoneNumber;

    private String address;

    private byte status;

    private byte role;

    private List<MaintenanceCardDTO> repairmanMaintenanceCards;

    private List<MaintenanceCardDTO> coordinatorMaintenanceCards;

    private List<DepotDTO> depots;

    private List<ExportDepotDTO> exportDepots;

    private List<RequestDTO> requests;

    private List<ReceiptDepotDTO> receiptDepots;


}
