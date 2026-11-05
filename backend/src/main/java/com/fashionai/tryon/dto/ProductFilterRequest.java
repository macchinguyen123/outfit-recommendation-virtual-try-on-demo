package com.fashionai.tryon.dto;

import com.fashionai.tryon.model.Category;
import com.fashionai.tryon.model.Gender;
import com.fashionai.tryon.model.StyleType;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductFilterRequest {
    private String keyword;
    private Category category;
    private StyleType style;
    private Gender gender;
    private BigDecimal minPrice;
    private BigDecimal maxPrice;
}

