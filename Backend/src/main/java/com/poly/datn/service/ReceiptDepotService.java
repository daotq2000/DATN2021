package com.poly.datn.service;

import com.poly.datn.dto.CouponDTO;
import com.poly.datn.dto.ReceiptDepotDTO;
import com.poly.datn.exception.CodeExistedException;

import java.util.List;
import java.util.Map;

public interface ReceiptDepotService {
    public Map<String,Object> getListReceiptDepot(int page, int size, String sortBy, String descending);
    public ReceiptDepotDTO getReceiptDepotById(Long id);
    public ReceiptDepotDTO insertReceiptDepot(ReceiptDepotDTO receiptDepotDTO) throws CodeExistedException;
    public ReceiptDepotDTO updateReceiptDepot(ReceiptDepotDTO receiptDepotDTO,Long id);
    public boolean deleteReceiptDepot(List<Long> listID);
}
