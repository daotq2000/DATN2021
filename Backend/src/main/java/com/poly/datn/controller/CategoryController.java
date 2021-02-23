package com.poly.datn.controller;

import com.poly.datn.dto.CategoryDTO;
import com.poly.datn.exception.CodeExistedException;
import com.poly.datn.exception.commonException.NotFoundException;
import com.poly.datn.exception.userException.DuplicateEmailException;
import com.poly.datn.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.ConstraintViolationException;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("http://localhost:3000")
public class CategoryController {
    @Autowired
    CategoryService categoryService;
    @GetMapping("/admin/category2")
    public ResponseEntity<Page<CategoryDTO>> getAll(@RequestParam(defaultValue = "0") int page,
                                                    @RequestParam(defaultValue = "10") int size,
                                                    @RequestParam(defaultValue = "true") boolean asc,
                                                    @RequestParam(defaultValue = "name") String order,

                                                    @RequestParam(value = "param", defaultValue = "") String search) {

        Page<CategoryDTO> categoryDTOS = categoryService.page( PageRequest.of(page, size, Sort.by(order)),search);
        if(!asc)
            categoryDTOS = categoryService.page( PageRequest.of(page, size, Sort.by(order).descending()),search);
        return new ResponseEntity<Page<CategoryDTO>>(categoryDTOS, HttpStatus.OK);
    }

    @GetMapping("/admin/category")
    public ResponseEntity<Map<String, Object>> getAllDepots(@RequestParam(name = "pageNum", defaultValue = "1", required = false) int pageNum,
                                                            @RequestParam(name = "pageSize", defaultValue = "5", required = false) int pageSize,
                                                            @RequestParam(value = "sortBy", defaultValue = "") String sortBy,
                                                            @RequestParam(value = "descending", defaultValue = "") String descending,
                                                            @RequestParam(value = "param", defaultValue = "") String param) {
        return new ResponseEntity<>(categoryService.getListManufacturer(pageNum, pageSize, sortBy, descending, param), HttpStatus.OK);
    }
    @PostMapping("/admin/category")
    public ResponseEntity<CategoryDTO> insertCategory(@RequestBody CategoryDTO categoryDTO)throws DuplicateEmailException, CodeExistedException, ConstraintViolationException {

        return new ResponseEntity<>(categoryService.insertCategory(categoryDTO), HttpStatus.CREATED);
    }
    @GetMapping("/admin/category/{id}")
    public ResponseEntity<?> getOneCategory(@PathVariable Long id) throws NotFoundException {
        return  new ResponseEntity<>(categoryService.getCategoryById(id),HttpStatus.OK);
    }
    @PutMapping("/admin/category/{id}")
    public ResponseEntity<CategoryDTO> UpdateCategory(@PathVariable Long id,@RequestBody CategoryDTO categoryDTO) throws Exception {

        return new ResponseEntity<>(categoryService.updateCategory(categoryDTO,id), HttpStatus.OK);
    }
    @DeleteMapping("/admin/category/{id}")
    public ResponseEntity<?> delete(@PathVariable long id){
        return new ResponseEntity<>(categoryService.delete(id)?HttpStatus.ACCEPTED:HttpStatus.NOT_ACCEPTABLE);
    }
    @DeleteMapping("/admin/category/delete")
    public ResponseEntity<HttpStatus> deleteDepots(@RequestParam("listID") List<Long> listID) throws Exception {
        boolean isDelete = categoryService.deleteCategory(listID);
        if (isDelete) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

}
