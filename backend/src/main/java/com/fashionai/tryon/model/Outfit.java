package com.fashionai.tryon.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "outfits")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Outfit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name; // e.g. "Minimal Chic Parisian Workwear"

    @Column(length = 1000)
    private String description;

    @Enumerated(EnumType.STRING)
    private Occasion occasion;

    @Enumerated(EnumType.STRING)
    private StyleType style;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    private String season; // "Xuân - Hè", "Thu - Đông", "Quanh năm"

    private Double harmonyScore; // Điểm tương thích màu sắc & form dáng (vd: 96%)

    @Column(length = 1000)
    private String aiStylistAdvice; // Lời khuyên của stylist AI về cách phối phụ kiện, giày

    @Column(length = 1000)
    private String previewImageUrl;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "outfit_products",
        joinColumns = @JoinColumn(name = "outfit_id"),
        inverseJoinColumns = @JoinColumn(name = "product_id")
    )
    @Builder.Default
    private List<Product> products = new ArrayList<>();

    private BigDecimal totalPrice;

    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
    }
}
