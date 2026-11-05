package com.fashionai.tryon.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "try_on_sessions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TryOnSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sessionCode; // Mã phiên ngẫu nhiên (UUID)

    private Long userId;

    @Column(length = 2000)
    private String personImageUrl; // Ảnh người mẫu hoặc ảnh người dùng upload

    private Long topProductId; // ID của áo (nếu có)
    private String topProductName;

    private Long bottomProductId; // ID của quần/váy (nếu có)
    private String bottomProductName;

    private Long dressProductId; // ID của đầm (nếu thử đầm nguyên set)
    private String dressProductName;

    @Enumerated(EnumType.STRING)
    private TryOnStatus status;

    @Column(length = 2000)
    private String resultImageUrl; // Ảnh kết quả AI render sau khi ghép quần áo lên người

    @Column(length = 1000)
    private String errorMessage;

    private Long executionTimeMs; // Thời gian AI xử lý

    private String aiModelUsed; // e.g. "IDM-VTON", "CatVTON", "VirtualTryOn-Engine-v2"

    private LocalDateTime createdAt;
    private LocalDateTime completedAt;

    @PrePersist
    public void prePersist() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
        if (status == null) {
            status = TryOnStatus.PENDING;
        }
    }
}
