package com.fashionai.tryon.dto;

import com.fashionai.tryon.model.Outfit;
import com.fashionai.tryon.model.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecommendationResponse {
    private String stylistSummary;      // Đánh giá tổng quan từ Stylist AI
    private String colorPaletteAdvice;   // Phân tích bảng màu phối (vd: Bánh xe màu, Pastel tone)
    private List<Outfit> recommendedOutfits; // Các set đồ gợi ý hoàn chỉnh
    private List<Product> alternativeItems; // Các món đồ thay thế phong phú
}

