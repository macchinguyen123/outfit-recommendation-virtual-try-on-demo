package com.fashionai.tryon.controller;

import com.fashionai.tryon.model.Outfit;
import com.fashionai.tryon.service.RecommendationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/outfits")
@RequiredArgsConstructor
@Tag(name = "Outfit Collections", description = "Các bộ outfit mẫu được phối sẵn")
public class OutfitController {

    private final RecommendationService recommendationService;

    @GetMapping
    @Operation(summary = "Lấy danh sách tất cả các set phối đồ mẫu")
    public ResponseEntity<List<Outfit>> getAllOutfits() {
        return ResponseEntity.ok(recommendationService.getAllOutfits());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Xem chi tiết một set đồ mẫu")
    public ResponseEntity<Outfit> getOutfitById(@PathVariable Long id) {
        return recommendationService.getOutfitById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}

