package com.poly.datn.validation.anotation;

import com.poly.datn.validation.validator.PlatesNumberValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Constraint(validatedBy = PlatesNumberValidator.class)
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface PlatesNumber {
    String message() default "Định dạng biển số xe không hợp lệ";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
