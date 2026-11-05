package com.fashionai.tryon.dto;

import com.fashionai.tryon.model.Gender;
import com.fashionai.tryon.model.Occasion;
import com.fashionai.tryon.model.StyleType;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class RecommendationRequest {
    private Gender gender;
    private Occasion occasion;
    private StyleType style;
    private String weather; // "Nắng ấm", "Mát mẻ", "Se lạnh", "Mưa nhẹ"
    private String preferredColor;
    private BigDecimal maxBudget;
    private Long existingProductId; // Muốn tìm đồ phối cùng sản phẩm này
}

