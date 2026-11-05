package com.fashionai.tryon.controller;

import com.fashionai.tryon.dto.TryOnRequestDto;
import com.fashionai.tryon.dto.TryOnResponseDto;
import com.fashionai.tryon.service.TryOnService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/try-on")
@RequiredArgsConstructor
@Tag(name = "Virtual Try-On", description = "Buồng thử đồ ảo AI (Ghép trang phục lên dáng người)")
public class TryOnController {

    private final TryOnService tryOnService;

    @PostMapping
    @Operation(summary = "Gửi yêu cầu thử đồ ảo (kết hợp ảnh người mẫu + sản phẩm quần áo)")
    public ResponseEntity<TryOnResponseDto> executeTryOn(@RequestBody TryOnRequestDto request) {
        return ResponseEntity.ok(tryOnService.processTryOn(request));
    }

    @GetMapping("/sessions/{sessionCode}")
    @Operation(summary = "Xem trạng thái và kết quả của một phiên thử đồ theo mã session")
    public ResponseEntity<TryOnResponseDto> getSession(@PathVariable String sessionCode) {
        return tryOnService.getSession(sessionCode)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/recent")
    @Operation(summary = "Lấy danh sách các lần thử đồ gần nhất")
    public ResponseEntity<List<TryOnResponseDto>> getRecentSessions() {
        return ResponseEntity.ok(tryOnService.getRecentSessions());
    }
}

