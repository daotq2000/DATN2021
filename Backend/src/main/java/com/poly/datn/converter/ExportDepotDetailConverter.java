package com.poly.datn.converter;

import com.poly.datn.dto.ExportDepotDetailDTO;
import com.poly.datn.entity.ExportDepotDetail;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ExportDepotDetailConverter {
    public final ModelMapper modelMap =  new ModelMapper();
    public ExportDepotDetailDTO convertToDTO(ExportDepotDetail exportDepotDetail){
    return modelMap.map(exportDepotDetail,ExportDepotDetailDTO.class);
    }
    public ExportDepotDetail convertToEntity(ExportDepotDetailDTO exportDepotDetailDTO){
        return modelMap.map(exportDepotDetailDTO,ExportDepotDetail.class);
    }
    public List<ExportDepotDetailDTO> convertToList(List<ExportDepotDetail> exportDepotDetails){
        List<ExportDepotDetailDTO> list = new ArrayList<>();
        exportDepotDetails.forEach(exportDepotDetail -> list.add(convertToDTO(exportDepotDetail)));
        return list;
    }
}
