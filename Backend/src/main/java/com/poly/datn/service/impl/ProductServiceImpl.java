package com.poly.datn.service.impl;

import com.poly.datn.converter.ProductConverter;
import com.poly.datn.repository.ProductRepository;
import com.poly.datn.dto.ProductDTO;
import com.poly.datn.entity.Product;
import com.poly.datn.exception.NotANumberException;
import com.poly.datn.exception.productException.ProductNotFoundException;
import com.poly.datn.service.ProductService;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.*;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductConverter productConverter;

    @Override
    public Page<ProductDTO> getAll(String search, Pageable pageable) {
        Page<Product> products = productRepository.findAllByStatusNotAndNameContainingIgnoreCaseOrStatusNotAndCodeContainingIgnoreCaseOrderByModifiedDateDesc((byte) 0, search, (byte) 0, search, pageable);
        return products.map(product -> productConverter.convertToDTO(product));
    }

    @Override
    public Page<ProductDTO> getAllAccessories(String search, Pageable pageable) {
//        Page<Product> products = productRepository.getProductWithType((byte)1, (byte)0, search, search, pageable);
        Page<Product> products = productRepository.searchProducts(pageable, search);
        return products.map(product -> productConverter.convertToDTO(product));
    }

    @Override
    public Page<ProductDTO> getAllAccessoriesByManufactureIdAndCategoriesId(String search, Pageable pageable, Long manufactureId, Long categoriesId) {
        Page<Product> products = productRepository.searchProductByCategoriesIdAndManufactureId(pageable,search,categoriesId,manufactureId);
        return products.map(product -> productConverter.convertToDTO(product));
    }

    @Override
    public Page<ProductDTO> getAllServices(String search, Pageable pageable) {
//        Page<Product> products = productRepository.getProductWithType((byte)2, (byte)0, search, search, pageable);
        Page<Product> products = productRepository.findAllByTypeAndStatusNotAndNameContainingIgnoreCaseOrTypeAndStatusNotAndCodeContainingIgnoreCaseOrderByModifiedDateDesc((byte) 2, (byte) 0, search, (byte) 2, (byte) 0, search, pageable);
        return products.map(product -> productConverter.convertToDTO(product));
    }

    @Override
    public String createNewCode() throws NotANumberException {
        StringBuilder newCode = new StringBuilder("sp00");
        List<String> fetchedCode = productRepository.getMaxCode();
        String maxCode = fetchedCode.get(0);
        long codeNumber = Long.parseLong(maxCode);
        if(maxCode == null) {
            codeNumber = 1;
        }
        else {
            String codeNumberString = ""; // ""
            do {
                newCode = new StringBuilder("sp00");
                codeNumber++;
                codeNumberString = Long.toString(codeNumber);
                newCode.append(codeNumberString);
            }
            while(this.isCodeExist(newCode.toString()));
        }
        return newCode.toString();

    }

    @Override
    public byte[] getImageByte(HttpServletResponse response, String imageName) throws IOException {
        Optional<Product> productOptional = productRepository.findByImage(imageName);
        if (productOptional == null) {
            throw new IOException("Image not found");
        }
        Product product = productOptional.get();
        String directory = "product-image\\";
        File file = new File(directory + product.getImage());
        byte[] imageBytes = new byte[(int) file.length()];
        if (file.exists()) {
            String contentType = "image/png";
            response.setContentType(contentType);
            OutputStream out = response.getOutputStream();
            FileInputStream in = new FileInputStream(file);
            // copy from in to out
            IOUtils.copy(in, out);
            out.close();
            in.close();
        }
        return imageBytes;
    }

    @Override
    public ProductDTO getOneById(Long id) throws ProductNotFoundException {
        Optional<Product> productOptional = productRepository.findById(id);
        if (productOptional==null) {
            throw new ProductNotFoundException("Product not found with id " + id);
        }
        Product product = productOptional.get();
        if (product.getStatus() == 0) {
            throw new ProductNotFoundException("Product not found with id " + id);
        }
        return productConverter.convertToDTO(product);
    }

    @Override
    public void deleteById(Long id) throws ProductNotFoundException {
        Optional<Product> productOptional = productRepository.findById(id);
        if (productOptional== null) {
            throw new ProductNotFoundException("Product not found with id " + id);
        }
        Product product = productOptional.get();
        product.setStatus((byte) 0);
        productRepository.save(product);
    }

    @Override
    public boolean isCodeExist(String code) {
        Optional<String> codeOptional = productRepository.findByCode(code);
        if (codeOptional.isPresent()) {
            return true;
        }
        return false;
    }

    @Override
    public boolean isCodeExistToUpdate(String code, Long id) {
        Optional<String> codeOptional = productRepository.findCodeByCodeAndIdNot(code, id);
        if (codeOptional.isPresent()) {
            return true;
        }
        return false;
    }

    @Override
    public ProductDTO getOneByIdAndType(Long id, Byte type) throws ProductNotFoundException {
        Optional<Product> productOptional = productRepository.findByIdAndType(id, type);
        if (productOptional== null) {
            throw new ProductNotFoundException("Product not found!");
        }
        Product product = productOptional.get();
        ProductDTO productDTO = productConverter.convertToDTO(product);
        return productDTO;
    }

    @Override
    public boolean isNameExist(String name) {
        Optional<String> nameOptional = productRepository.findNameByName(name);
        if (nameOptional.isPresent()) {
            return true;
        }
        return false;
    }

    @Override
    public boolean isNameExistToUpdate(String name, Long id) {
        Optional<String> nameOptional = productRepository.findNameByNameAndIdNot(name, id);
        if (nameOptional.isPresent()) {
            return true;
        }
        return false;
    }

    @Override
    public void multiDelete(Long[] idArray) {
        productRepository.multipleDelete(idArray);
    }

    @Override
    public ProductDTO save(Product product) throws Exception {
        try {

            Product savedProduct = productRepository.save(product);
            return productConverter.convertToDTO(savedProduct);
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }
}
