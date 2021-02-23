package com.poly.datn.validation.anotation;

import com.poly.datn.validation.validator.ProductCodeValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Constraint(validatedBy = ProductCodeValidator.class)
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface ProductCode {
    String message() default "Định dạng mã sản phẩm hàng không hợp lệ";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
