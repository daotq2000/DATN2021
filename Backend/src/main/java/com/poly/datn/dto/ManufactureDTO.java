package com.poly.datn.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ManufactureDTO extends BaseDTO{
    private String name;
    private String description;
    private String code;
    private Byte status;
    List<ModelBikeDTO> modelBikes;
}
