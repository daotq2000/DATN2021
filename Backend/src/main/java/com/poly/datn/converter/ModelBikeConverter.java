package com.poly.datn.converter;



import com.poly.datn.dto.ModelBikeDTO;
import com.poly.datn.entity.ModelBike;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ModelBikeConverter {
    @Autowired
    ManufactorConvert manufactorConvert;
    public ModelBikeDTO convertToDTO (ModelBike modelBike){
        ModelBikeDTO modelBikeDTO = new ModelBikeDTO();
        modelBikeDTO.setId(modelBike.getId());
        modelBikeDTO.setCode(modelBike.getCode());
        modelBikeDTO.setCreatedDate(modelBike.getCreatedDate());
        modelBikeDTO.setModifiedDate(modelBike.getModifiedDate());
        modelBikeDTO.setStatus(modelBike.getStatus());
        if(modelBike.getManufacturer() != null){
            modelBikeDTO.setManufacture(manufactorConvert.convertToDTO(modelBike.getManufacturer()));
        }
        modelBikeDTO.setYear(modelBike.getYear());
        modelBikeDTO.setName(modelBike.getName());
        return  modelBikeDTO;
    }
    public ModelBike convertEntity(ModelBikeDTO modelBikeDTO){
       ModelBike modelBike = new ModelBike();
        modelBike.setId(modelBikeDTO.getId());
        modelBike.setName(modelBikeDTO.getName());
        modelBike.setYear(modelBikeDTO.getYear());
        modelBike.setManufacturer(manufactorConvert.convertEntity(modelBikeDTO.getManufacture()));
        modelBike.setStatus(modelBikeDTO.getStatus());
        modelBike.setCode(modelBikeDTO.getCode());
        modelBike.setModifiedDate(modelBikeDTO.getModifiedDate());
        modelBike.setCreatedDate(modelBikeDTO.getCreatedDate());
      return modelBike;
    }
}
