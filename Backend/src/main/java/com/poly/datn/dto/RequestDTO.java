package com.poly.datn.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;
@ToString
@Getter
@Setter
public class RequestDTO extends BaseDTO {
    private UserDTO users;
    private String code;
    private String name;
    private String desciption;
    private Byte status;
    private List<RequestDetailDTO> requestDetails ;
}
