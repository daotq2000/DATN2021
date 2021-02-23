package com.poly.datn.service;

import com.poly.datn.dto.ExportDepotDTO;
import com.poly.datn.exception.CodeExistedException;
import com.poly.datn.exception.commonException.NotFoundException;

import java.util.List;
import java.util.Map;

public interface ExportDepotService {
    public Map<String,Object> getListExportDepot(int page, int size, String sortBy, String descending, String search);
    public ExportDepotDTO getExportDepotById(Long id) throws NotFoundException;
    public ExportDepotDTO insertExportDepot(ExportDepotDTO exportDepotDTO) throws CodeExistedException;
    public ExportDepotDTO updateExportDepot(ExportDepotDTO exportDepotDTO,Long id) throws NotFoundException;
    public Boolean deleteExportDepotById(List<Long> arrayID) throws Exception;
    public String generateCode();
}
