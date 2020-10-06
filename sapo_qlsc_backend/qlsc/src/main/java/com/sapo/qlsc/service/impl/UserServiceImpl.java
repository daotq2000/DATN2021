package com.sapo.qlsc.service.impl;

import com.sapo.qlsc.converter.UserConverter;
import com.sapo.qlsc.dto.UserDTO;
import com.sapo.qlsc.entity.User;
import com.sapo.qlsc.exception.commonException.NotFoundException;
import com.sapo.qlsc.repository.UserRepository;
import com.sapo.qlsc.repository.UserRepositoryCustom;
import com.sapo.qlsc.service.UserService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;
import java.util.concurrent.atomic.AtomicReference;

@Service
@Transactional
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;
    private UserConverter userConverter;
    private UserRepositoryCustom userRepositoryCustom;
    @Autowired
    public UserServiceImpl(UserRepository userRepository, UserConverter userConverter, UserRepositoryCustom userRepositoryCustom ) {
        this.userRepository = userRepository;
        this.userConverter = userConverter;
        this.userRepositoryCustom = userRepositoryCustom;
    }

    @Override
    public Map<String, Object> getListUser(int page,int size,String sortBy,String descending,String search) {
        search = "%"+search+"%";
        page = page - 1;
        if (sortBy.isEmpty()) {
            sortBy = "totalMaintenanceCard";
        }
        if (descending.isEmpty()) {
            descending = "desc";
        }
        List<Map<String, Object>> map = userRepositoryCustom.getTotalMaintenanceCardUser(page, size, sortBy, descending, search);
        Map<String, Object> hashMap = new HashMap<>();
        hashMap.put("users", map);
        hashMap.put("totalPage", userRepositoryCustom.countTotalElementsUser(search) / size);
        hashMap.put("currentPage", page+1);
        hashMap.put("totalElement", userRepositoryCustom.countTotalElementsUser(search));
        return hashMap;
    }

    @Override
    public Map<String, Object> getAllUser(int pageNumber, int size) {
        Pageable paging = PageRequest.of(pageNumber - 1, size, Sort.by("id").descending());
        Page<User> userPage = userRepository.findAll(paging);
        List<UserDTO> userDTOs = new ArrayList<>();
        HashMap<String, Object> map = new HashMap<>();
        List<User> users = userPage.getContent();
        for (User user : users) {
            userDTOs.add(userConverter.convertToDTO(user));
        }
        map.put("suppliers", userDTOs);
        map.put("currentPage", userPage.getNumber() + 1);
        map.put("totalItems", userPage.getTotalElements());
        map.put("totalPages", userPage.getTotalPages());
        return map;
    }

    @Override
    public HashMap<String, Object> getTotalMaintenanceCardByRepairman(int page, int size,String key) {
        List<Map<String,Object>> map = userRepositoryCustom.getTotalMaintenanceCardByRepairman((page-1)*size, size, "%"+key+"%");
        for (Map m:map) {
            User user = userRepository.getOne((Long) m.get("user"));
            m.put("user",userConverter.convertToDTO(user));
        }
        HashMap<String, Object> mapAll = new HashMap<>();
        int totalElement = userRepositoryCustom.countTotalElements("%"+key+"%");
        mapAll.put("total",totalElement);
        mapAll.put("listUser",map);
        return mapAll;
    }

    @Override
    public UserDTO getUserById(Long id) throws NotFoundException {
        User user = userRepository.getOne(id);
        if(user != null){
            return userConverter.convertToUserDTOGetAllDependencies(user);
        }else{
            throw new NotFoundException("User not found");
        }

    }

    @Override
    public UserDTO insertUser(UserDTO userDTO) {
         BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        //generate password;
        System.out.println("password: "+userDTO.getPassword());
        User user = new User();
        user.setCode(generateCode());
        user.setId(userDTO.getId());
        user.setAddress(userDTO.getAddress());
        user.setStatus(Byte.valueOf(String.valueOf(1)));
        user.setModifiedDate(new Date());
        user.setCreatedDate(new Date());
        user.setPassword(encoder.encode(userDTO.getPassword()));
        user.setPhoneNumber(userDTO.getPhoneNumber());
        user.setEmail(userDTO.getEmail());
        user.setRole(userDTO.getRole());
        user.setFullName(userDTO.getFullName());

        try {

           User user1 =  userRepository.save(user);
            return userConverter.convertToDTO(user1);
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public UserDTO updateUser(UserDTO userDTO, Long id) {
        User user = userRepository.getOne(id);
        user.setCode(userDTO.getCode());
        user.setId(userDTO.getId());
        user.setAddress(userDTO.getAddress());
        user.setStatus(userDTO.getStatus());
        user.setModifiedDate(new Date());
        user.setCreatedDate(user.getCreatedDate());
        user.setPhoneNumber(userDTO.getPhoneNumber());
        user.setEmail(userDTO.getEmail());
        user.setRole(userDTO.getRole());
        user.setFullName(userDTO.getFullName());
        try {
            User user1 = userRepository.save(user);
            return userConverter.convertToDTO(user1);
        }catch (Exception e) {
            return null;
        }
    }

    @Override
    public Boolean deleteUserById(List<Long> arrayID) {
        Integer rs = 0;
        if(arrayID.size() > 0){
            for (Long id:arrayID
                 ) {
                rs += userRepository.updateStatusUser(id);
            }
        }
        if(rs == arrayID.size()){
            return true;
        }
       return false;
    }

    @Override
    public String generateCode() {
        Long codeNumber = 0L;
        String newCodeString;
        int index = 0;
        String getMaxCode = null;
        getMaxCode = userRepository.getMaxCodeUser(index);
        do{
            getMaxCode = userRepository.getMaxCodeUser(index);
            if(getMaxCode == null){
                getMaxCode = "0";
            }else{
                boolean result = StringUtils.isNumeric(getMaxCode);
                if(!result){
                    getMaxCode = null;
                    index++;
                }else {
                    getMaxCode = getMaxCode;
                }
            }
        }while (getMaxCode == null);
        codeNumber = Long.parseLong(getMaxCode) + 1;
        newCodeString = "ND00"+codeNumber.toString();
        return newCodeString;

    }

    @Override
    public Boolean checkLogin(UserDTO userDTO) {

        String username = userDTO.getEmail();
        String password = userDTO.getPassword();
        System.out.println(username+"|"+password);

        User user = userRepository.checkLogin(username,password);
        if(user != null){
            return true;
        }
        return false;
    }

    @Override
    public UserDTO checkUserNameUser(String username) throws NotFoundException {
        User user = userRepository.checkExistEmail(username);
        if(user != null){
            return userConverter.convertToDTO(user);
        }else{
            throw new NotFoundException("Not Found User");
        }

    }

    @Override
    public boolean changePassword(String password, Long userId) {
        Integer u= userRepository.changePassword(password,userId);
        if(u>0){
            return true;
        }
        return false;
    }


}
