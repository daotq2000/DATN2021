package com.poly.datn.service;

import com.poly.datn.ulti.PasswordPoJo;
import com.poly.datn.dto.UserDTO;
import com.poly.datn.exception.CodeExistedException;
import com.poly.datn.exception.commonException.NotFoundException;
import com.poly.datn.exception.userException.DuplicateEmailException;

import java.util.HashMap;

import java.util.List;
import java.util.Map;

public interface UserService {
    public Map<String,Object> getListUser(int page, int size, String sortBy, String descending, String search);
    public Map<String,Object> getAllUser(int pageNumber, int size);
    public HashMap<String, Object> getTotalMaintenanceCardByRepairman(int page, int size, String key);
    public UserDTO getUserById(Long id) throws NotFoundException;
    public UserDTO insertUser(UserDTO userDTO) throws DuplicateEmailException, CodeExistedException;
    public UserDTO updateUser(UserDTO userDTO,Long id) throws CodeExistedException;
    public Boolean deleteUserById(List<Long> arrayID) throws Exception;
    public String generateCode();
    public Boolean checkLogin(UserDTO userDTO);
    public UserDTO checkUserNameUser(String username) throws NotFoundException;
    public UserDTO changePassword(PasswordPoJo passwordPoJo) throws NotFoundException;
}
