package com.fashionai.tryon.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(length = 1000)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Category category;

    private String subCategory; // Ví dụ: "Áo sơ mi lụa", "Quần jean ống suông", "Blazer dáng rộng"

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Enumerated(EnumType.STRING)
    private StyleType style;

    @Enumerated(EnumType.STRING)
    private Occasion occasion;

    private String color; // "Trắng", "Đen", "Xanh Navy", "Be", "Pastel Pink"

    private String colorHex; // "#FFFFFF", "#1E293B"

    private String size; // "S, M, L, XL"

    private BigDecimal price;

    @Column(length = 1000)
    private String imageUrl; // URL ảnh sản phẩm (chụp riêng - garment)

    @Column(length = 1000)
    private String modelImageUrl; // URL ảnh người mẫu mặc sẵn (dùng cho preview)

    private Double rating;

    private Integer reviewCount;

    private Boolean inStock;

    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
        if (inStock == null) {
            inStock = true;
        }
        if (rating == null) {
            rating = 4.8;
        }
        if (reviewCount == null) {
            reviewCount = 24;
        }
    }
}
