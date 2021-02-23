package com.poly.datn.dto;

import com.poly.datn.entity.BaseEntity;
import com.poly.datn.entity.ModelBike;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ColorBikeDTO extends BaseEntity {
    private ModelBikeDTO modelBike;
    private String code;
    private String name;
    private byte status;
}
