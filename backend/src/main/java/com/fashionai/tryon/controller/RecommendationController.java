package com.fashionai.tryon.controller;

import com.fashionai.tryon.dto.RecommendationRequest;
import com.fashionai.tryon.dto.RecommendationResponse;
import com.fashionai.tryon.service.RecommendationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/recommendations")
@RequiredArgsConstructor
@Tag(name = "Outfit Recommendations", description = "Tư vấn phối đồ thông minh với AI Stylist")
public class RecommendationController {

    private final RecommendationService recommendationService;

    @PostMapping
    @Operation(summary = "Nhận gợi ý phối đồ từ AI theo dịp, thời tiết, phong cách, giới tính")
    public ResponseEntity<RecommendationResponse> getRecommendations(@RequestBody RecommendationRequest request) {
        return ResponseEntity.ok(recommendationService.recommendOutfits(request));
    }
}

