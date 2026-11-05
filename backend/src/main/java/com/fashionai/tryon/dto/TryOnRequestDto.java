package com.fashionai.tryon.dto;

import lombok.Data;

@Data
public class TryOnRequestDto {
    private Long userId;
    private String personImageUrl; // Link ảnh người mẫu hoặc Base64
    private Long topProductId;     // Áo muốn thử
    private Long bottomProductId;  // Quần / váy muốn thử
    private Long dressProductId;   // Đầm nguyên set (nếu có)
    private String qualityMode;    // "STANDARD" hoặc "ULTRA_HD"
}

