package com.sapo.qlsc.controller;

import com.sapo.qlsc.converter.ProductConverter;
import com.sapo.qlsc.dto.ProductDTO;
import com.sapo.qlsc.entity.Product;
import com.sapo.qlsc.exception.CodeExistedException;
import com.sapo.qlsc.exception.NotANumberException;
import com.sapo.qlsc.exception.productException.ProductNotFoundException;
import com.sapo.qlsc.service.ProductService;
import com.sapo.qlsc.upload.Image;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.Optional;

@RestController
@RequestMapping("admin")
@CrossOrigin
public class ProductController {
    @Autowired
    private ProductService productService;

    @Autowired
    private ProductConverter productConverter;

    @GetMapping("product")
    public ResponseEntity<?> getAll(@RequestParam(value = "search", required = false) Optional<String> search, Pageable pageable) {
        Page<ProductDTO> productDTOs = productService.getAll("", pageable);
        if (search.isPresent()) {
            productDTOs = productService.getAll(search.get(), pageable);
        }
        return new ResponseEntity<>(productDTOs, HttpStatus.OK);
    }

    // Type 1
    @GetMapping("accessories")
    public ResponseEntity<?> getAllAccessories(@RequestParam(value = "search", required = false) Optional<String> search, Pageable pageable) {
        Page<ProductDTO> productDTOs = productService.getAllAccessories("", pageable);
        if (search.isPresent()) {
            productDTOs = productService.getAllAccessories(search.get(), pageable);
        }
        return new ResponseEntity<>(productDTOs, HttpStatus.OK);
    }

    // Type 2
    @GetMapping("services")
    public ResponseEntity<?> getAllServices(@RequestParam(value = "search", required = false) Optional<String> search, Pageable pageable) {
        Page<ProductDTO> productDTOs = productService.getAllServices("", pageable);
        if (search.isPresent()) {
            productDTOs = productService.getAllServices(search.get(), pageable);
        }
        return new ResponseEntity<>(productDTOs, HttpStatus.OK);
    }

    @GetMapping("product/{id}")
    public ResponseEntity<?> getOne(@PathVariable("id") String pathId, @RequestParam(value = "type", required = false) Optional<String> typeOptional) throws ProductNotFoundException {
        Long id = Long.parseLong(pathId);
        ProductDTO productDTO = productService.getOneById(id);
        if (typeOptional.isPresent()) {
            Byte type = Byte.parseByte(typeOptional.get());
            productDTO = productService.getOneByIdAndType(id, type);
        }
        return new ResponseEntity<>(productDTO, HttpStatus.OK);
    }

    @PostMapping("product")
    public ResponseEntity<?> create(
            @RequestParam(value = "image", required = false) Optional<MultipartFile> fileOptional,
            @RequestParam("name") String name,
            @RequestParam(value = "quantity", required = false) Optional<String> quantityOptional,
            @RequestParam(value = "unit", required = false) Optional<String> unitOptional,
            @RequestParam(value = "pricePerUnit", required = false) Optional<String> pricePerUnitOptional,
            @RequestParam(value = "code", required = false) Optional<String> codeOptional,
            @RequestParam("description") String description,
            @RequestParam("type") String type) throws Exception {
        Product product = new Product();
        // Upload Image
        if (fileOptional.isPresent()) {
            MultipartFile file = fileOptional.get();
            Image image = new Image(file);
            String directory = "product-image\\";
            try {
                byte[] bytes = file.getBytes();
                String fileType = file.getContentType().substring(6, file.getContentType().length());
                String newFileName = new Date().getTime() + "." + fileType;
                Path path = Paths.get(directory + newFileName);
                Files.write(path, bytes);
                product.setImage(newFileName);
            } catch (Exception e) {
                return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
            }
        }

        // Generate code
        String code;
        if (codeOptional.isEmpty()) {
            code = productService.createNewCode();
        } else {
            code = codeOptional.get();
            if (productService.isCodeExist(code)) {
                throw new CodeExistedException("This code has already been exist");
            }
        }
        product.setCode(code);

        // Get Current date
        Date date = new Date();

        // Get product data
        product.setName(name);
        if (quantityOptional.isPresent()) {
            product.setQuantity(Integer.parseInt(quantityOptional.get()));
        }
        if (unitOptional.isPresent()) {
            product.setUnit(unitOptional.get());
        }
        if (pricePerUnitOptional.isPresent()) {
            product.setPricePerUnit(new BigDecimal(pricePerUnitOptional.get()));
        }
        product.setDescription(description);
        product.setCreatedDate(date);
        product.setModifiedDate(date);
        product.setStatus((byte) 1);
        if (!StringUtils.isNumeric(type)) {
            throw new NotANumberException("Type is invalid");
        }
        product.setType((byte) (Integer.parseInt(type)));

        // Create the product
        try {
            ProductDTO productDTO = productService.save(product);
            return new ResponseEntity<>(productDTO, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value = "product/image/{imageName}", produces = MediaType.IMAGE_PNG_VALUE)
    public @ResponseBody
    ResponseEntity<?> getImage(HttpServletResponse response, @PathVariable("imageName") String imageName) throws IOException {
        byte[] imageBytes = productService.getImageByte(response, imageName);
        return new ResponseEntity<>(imageBytes, HttpStatus.OK);
    }

    @PutMapping("product/{id}")
    public ResponseEntity<?> update(
            @RequestParam(value = "image", required = false) Optional<MultipartFile> fileOptional,
            @RequestParam("name") String name,
            @RequestParam(value = "quantity", required = false) Optional<String> quantityOptional,
            @RequestParam(value = "unit", required = false) Optional<String> unitOptional,
            @RequestParam(value = "pricePerUnit", required = false) Optional<String> pricePerUnitOptional,
            @RequestParam(value = "code", required = false) Optional<String> codeOptional,
            @RequestParam("description") String description,
            @RequestParam(value = "status", required = false) Optional<String> statusOptional,
            @RequestParam("type") String type,
            @PathVariable("id") String pathId) throws Exception {

        // check if path id is numeric and check its existence
        if (!StringUtils.isNumeric(pathId)) {
            throw new NotANumberException("Invalid product id: the id is not a number");
        }
        Long id = Long.parseLong(pathId);
        ProductDTO productDTO = productService.getOneById(id);
        Product product = productConverter.convertToEntity(productDTO);

        // Upload new Image (OPTIONAL)
        if (fileOptional.isPresent()) {
            MultipartFile file = fileOptional.get();
            // Upload image and update product image name
            Image image = new Image(file);
            product.setImage(image.getImageName());
        }

        // Update product info
        if (quantityOptional.isPresent()) {
            String quantity = quantityOptional.get();
            if (!StringUtils.isNumeric(quantity)) {
                throw new NotANumberException("The entered quantity is not a number");
            }
            product.setQuantity((Integer.parseInt(quantity)));
        }
        if (pricePerUnitOptional.isPresent()) {
            if (!StringUtils.isNumeric(pricePerUnitOptional.get())) {
                throw new NotANumberException("The entered price is not a number");
            }
        }
        product.setId(id);
        product.setName(name);
        if (unitOptional.isPresent()) {
            String unit = unitOptional.get();
            product.setUnit(unit);
        }
        if (pricePerUnitOptional.isPresent()) {
            String pricePerUnit = pricePerUnitOptional.get();
            product.setPricePerUnit(new BigDecimal((Integer.parseInt(pricePerUnit))));
        }
        product.setDescription(description);
        if (statusOptional.isPresent()) {
            product.setStatus((byte) Integer.parseInt(statusOptional.get()));
        }
        if (!StringUtils.isNumeric(type)) {
            throw new NotANumberException("Type is invalid");
        }
        product.setType((byte) (Integer.parseInt(type)));

        // Save product info
        try {
            ProductDTO returnedProductDTO = productService.save(product);
            return new ResponseEntity<>(returnedProductDTO, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("product/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") String pathId) throws Exception {
        // check if path id is numeric and check its existence
        if (!StringUtils.isNumeric(pathId)) {
            throw new NotANumberException("Invalid product id: the id is not a number");
        }
        Long id = Long.parseLong(pathId);
        productService.deleteById(id);
        return new ResponseEntity<>("Deleted product with id " + pathId, HttpStatus.OK);
    }
}
