package com.fashionai.tryon.dto;

import com.fashionai.tryon.model.TryOnStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TryOnResponseDto {
    private String sessionCode;
    private TryOnStatus status;
    private String personImageUrl;
    private String resultImageUrl;
    private String topProductName;
    private String bottomProductName;
    private String dressProductName;
    private String aiModelUsed;
    private Long executionTimeMs;
    private String message;
    private LocalDateTime createdAt;
}

