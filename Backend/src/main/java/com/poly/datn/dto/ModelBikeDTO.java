package com.poly.datn.dto;


import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ModelBikeDTO extends BaseDTO {
    private ManufactureDTO manufacture;
    private String name;
    private String year;
    private String code;
    private Byte status;
    List<ColorBikeDTO> colorBikes;
}
