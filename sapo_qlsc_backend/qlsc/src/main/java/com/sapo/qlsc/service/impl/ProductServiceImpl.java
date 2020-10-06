package com.sapo.qlsc.service.impl;

import com.sapo.qlsc.converter.ProductConverter;
import com.sapo.qlsc.dto.ProductDTO;
import com.sapo.qlsc.entity.Product;
import com.sapo.qlsc.exception.NotANumberException;
import com.sapo.qlsc.exception.productException.ProductNotFoundException;
import com.sapo.qlsc.repository.ProductRepository;
import com.sapo.qlsc.service.ProductService;
import org.apache.commons.lang3.StringUtils;
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
import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductConverter productConverter;

    @Override
    public Page<ProductDTO> getAll(String search, Pageable pageable) {
        Page<Product> products = productRepository.findAllByStatusNotAndNameContainingIgnoreCaseOrCodeContainingIgnoreCaseOrderByModifiedDateDesc((byte)0, search, search, pageable);
        return products.map(product -> productConverter.convertToDTO(product));
    }

    @Override
    public Page<ProductDTO> getAllAccessories(String search, Pageable pageable) {
//        Page<Product> products = productRepository.getProductWithType((byte)1, (byte)0, search, search, pageable);
        Page<Product> products = productRepository.findAllByTypeAndStatusNotAndNameContainingIgnoreCaseOrTypeAndStatusNotAndCodeContainingIgnoreCaseOrderByModifiedDateDesc((byte)1, (byte)0, search, (byte)1, (byte)0, search, pageable);
        return products.map(product -> productConverter.convertToDTO(product));
    }

    @Override
    public Page<ProductDTO> getAllServices(String search, Pageable pageable) {
//        Page<Product> products = productRepository.getProductWithType((byte)2, (byte)0, search, search, pageable);
        Page<Product> products = productRepository.findAllByTypeAndStatusNotAndNameContainingIgnoreCaseOrTypeAndStatusNotAndCodeContainingIgnoreCaseOrderByModifiedDateDesc((byte)2, (byte)0, search, (byte)2, (byte)0, search, pageable);
        return products.map(product -> productConverter.convertToDTO(product));
    }

    @Override
    public String createNewCode() throws NotANumberException {
        StringBuilder code = new StringBuilder("SP");
        List<String> fetchedCode = productRepository.getMaxCode();
        if(fetchedCode.size() == 0) {
            return "SP00001";
        }
        String maxCode = fetchedCode.get(0);
        if(!StringUtils.isNumeric(maxCode.substring(2))) {
            throw new NotANumberException("Code is not a number");
        }
        long codeNumber = Long.parseLong(maxCode.substring(2));
        if(maxCode == null) {
            codeNumber = 1;
        }
        else {
            do {
                code = new StringBuilder("SP");
                codeNumber = codeNumber + 1;
                System.out.println(codeNumber);
                String codeNumberString = Long.toString(codeNumber);
                for(int i = 0; i < 6 - codeNumberString.length(); i++) {
                    code.append("0");
                }
                code.append(codeNumberString);
            }
            while(this.isCodeExist(code.toString()));
        }
        System.out.println(code.toString());
        return code.toString();
    }

    @Override
    public byte[] getImageByte(HttpServletResponse response, String imageName) throws IOException {
        Optional<Product> productOptional = productRepository.findByImage(imageName);
        if(productOptional.isEmpty()) {
            throw new IOException("Image not found");
        }
        Product product = productOptional.get();
        String directory = "product-image\\";
        File file = new File(directory + product.getImage());
        byte[] imageBytes = new byte[(int) file.length()];
        if(file.exists()) {
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
    public ProductDTO getOneById(Long id) throws ProductNotFoundException{
        Optional<Product> productOptional = productRepository.findById(id);
        if(productOptional.isEmpty()) {
            throw new ProductNotFoundException("Product not found with id " + id);
        }
        Product product = productOptional.get();
        if(product.getStatus() == 0) {
            throw new ProductNotFoundException("Product not found with id " + id);
        }
        return productConverter.convertToDTO(product);
    }

    @Override
    public void deleteById(Long id) throws ProductNotFoundException {
        Optional<Product> productOptional = productRepository.findById(id);
        if(productOptional.isEmpty()) {
            throw new ProductNotFoundException("Product not found with id " + id);
        }
        Product product = productOptional.get();
        product.setStatus((byte)0);
        productRepository.save(product);
    }

    @Override
    public boolean isCodeExist(String code) {
        Optional<String> codeOptional = productRepository.findByCode(code);
        if(codeOptional.isPresent()) {
            return true;
        }
        return false;
    }

    @Override
    public ProductDTO getOneByIdAndType(Long id, Byte type) throws ProductNotFoundException {
        Optional<Product> productOptional = productRepository.findByIdAndType(id, type);
        if(productOptional.isEmpty()) {
            throw new ProductNotFoundException("Product not found!");
        }
        Product product = productOptional.get();
        ProductDTO productDTO = productConverter.convertToDTO(product);
        return productDTO;
    }

    @Override
    public ProductDTO save(Product product) {
        Product savedProduct = productRepository.save(product);
        return productConverter.convertToDTO(savedProduct);
    }
}
