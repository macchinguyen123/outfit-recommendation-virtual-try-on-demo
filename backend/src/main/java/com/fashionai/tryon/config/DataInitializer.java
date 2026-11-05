package com.fashionai.tryon.config;

import com.fashionai.tryon.model.*;
import com.fashionai.tryon.repository.OutfitRepository;
import com.fashionai.tryon.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final ProductRepository productRepository;
    private final OutfitRepository outfitRepository;

    @Override
    public void run(String... args) {
        if (productRepository.count() > 0) {
            return;
        }

        // ========================== TOPS ==========================
        Product p1 = Product.builder()
                .name("Áo Blazer Cổ Điển Oversized Beige")
                .description("Thiết kế vai đệm tự nhiên, phom suông phóng khoáng mang đậm nét thanh lịch kiểu Pháp. Chất liệu vải dạ text đanh mịn.")
                .category(Category.TOP)
                .subCategory("Áo Blazer")
                .gender(Gender.WOMEN)
                .style(StyleType.FORMAL)
                .occasion(Occasion.WORK)
                .color("Beige")
                .colorHex("#D7C4B7")
                .size("S, M, L")
                .price(new BigDecimal("850000"))
                .imageUrl("https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80")
                .modelImageUrl("https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80")
                .rating(4.9)
                .reviewCount(48)
                .inStock(true)
                .build();

        Product p2 = Product.builder()
                .name("Áo Sơ Mi Lụa Trắng Cổ Đức Basic")
                .description("Chất liệu lụa satin mượt mà, độ rũ mềm mại tạo cảm giác thoải mái suốt ngày dài làm việc.")
                .category(Category.TOP)
                .subCategory("Áo Sơ Mi")
                .gender(Gender.WOMEN)
                .style(StyleType.MINIMALIST)
                .occasion(Occasion.WORK)
                .color("Trắng Tinh Khôi")
                .colorHex("#FFFFFF")
                .size("S, M, L")
                .price(new BigDecimal("420000"))
                .imageUrl("https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80")
                .modelImageUrl("https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80")
                .rating(4.8)
                .reviewCount(35)
                .inStock(true)
                .build();

        Product p3 = Product.builder()
                .name("Áo Thun Graphic Vintage Streetwear Đen")
                .description("Chất liệu 100% cotton định lượng 250gsm dày dặn, hình in lụa phong cách Y2K retro.")
                .category(Category.TOP)
                .subCategory("Áo Thun")
                .gender(Gender.UNISEX)
                .style(StyleType.STREETWEAR)
                .occasion(Occasion.STREET)
                .color("Đen Washed")
                .colorHex("#1A1A1A")
                .size("M, L, XL")
                .price(new BigDecimal("350000"))
                .imageUrl("https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80")
                .modelImageUrl("https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80")
                .rating(4.7)
                .reviewCount(92)
                .inStock(true)
                .build();

        // ========================== BOTTOMS ==========================
        Product p4 = Product.builder()
                .name("Quần Tây Ống Rộng Xếp Ly Đen")
                .description("Cạp cao tôn dáng, đường ly sắc nét tạo hiệu ứng chân dài miên man. Thích hợp đi làm hoặc dự tiệc.")
                .category(Category.BOTTOM)
                .subCategory("Quần Tây")
                .gender(Gender.WOMEN)
                .style(StyleType.FORMAL)
                .occasion(Occasion.WORK)
                .color("Đen")
                .colorHex("#0F172A")
                .size("S, M, L")
                .price(new BigDecimal("550000"))
                .imageUrl("https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=800&q=80")
                .modelImageUrl("https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80")
                .rating(4.9)
                .reviewCount(64)
                .inStock(true)
                .build();

        Product p5 = Product.builder()
                .name("Quần Jeans Xanh Retro Ống Đứng")
                .description("Vải denim dệt thoi bền bỉ, sắc xanh vintage cổ điển phối cực kỳ ăn ý với mọi loại áo.")
                .category(Category.BOTTOM)
                .subCategory("Quần Jeans")
                .gender(Gender.UNISEX)
                .style(StyleType.CASUAL)
                .occasion(Occasion.STREET)
                .color("Xanh Denim")
                .colorHex("#3B82F6")
                .size("29, 30, 31, 32")
                .price(new BigDecimal("620000"))
                .imageUrl("https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80")
                .modelImageUrl("https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80")
                .rating(4.8)
                .reviewCount(53)
                .inStock(true)
                .build();

        // ========================== DRESSES ==========================
        Product p6 = Product.builder()
                .name("Đầm Lụa Midi Dáng Ôm Cổ Yếm Ruby Red")
                .description("Sắc đỏ rượu quý phái cùng thiết kế hở lưng tinh tế, vũ khí tỏa sáng cho mọi đêm tiệc sang trọng.")
                .category(Category.DRESS)
                .subCategory("Đầm Dự Tiệc")
                .gender(Gender.WOMEN)
                .style(StyleType.PARTY)
                .occasion(Occasion.PARTY)
                .color("Đỏ Ruby")
                .colorHex("#991B1B")
                .size("S, M")
                .price(new BigDecimal("1250000"))
                .imageUrl("https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80")
                .modelImageUrl("https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80")
                .rating(5.0)
                .reviewCount(118)
                .inStock(true)
                .build();

        // ========================== SHOES & ACC ==========================
        Product p7 = Product.builder()
                .name("Giày Cao Gót Mũi Nhọn Da Bóng Nude")
                .description("Gót cao 7cm tôn dáng chuẩn mực, lót đệm êm chân suốt cả ngày dài.")
                .category(Category.SHOES)
                .subCategory("Giày Cao Gót")
                .gender(Gender.WOMEN)
                .style(StyleType.FORMAL)
                .occasion(Occasion.WORK)
                .color("Nude")
                .colorHex("#E2C4B1")
                .size("36, 37, 38, 39")
                .price(new BigDecimal("790000"))
                .imageUrl("https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80")
                .modelImageUrl("https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80")
                .rating(4.7)
                .reviewCount(40)
                .inStock(true)
                .build();

        Product p8 = Product.builder()
                .name("Sneakers Chunky Sole Retro White")
                .description("Đế đệm khí êm ái, phong cách đường phố năng động dễ mix đồ hàng ngày.")
                .category(Category.SHOES)
                .subCategory("Giày Thể Thao")
                .gender(Gender.UNISEX)
                .style(StyleType.STREETWEAR)
                .occasion(Occasion.STREET)
                .color("Trắng Bạc")
                .colorHex("#E5E7EB")
                .size("38, 39, 40, 41, 42")
                .price(new BigDecimal("950000"))
                .imageUrl("https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80")
                .modelImageUrl("https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80")
                .rating(4.9)
                .reviewCount(81)
                .inStock(true)
                .build();

        List<Product> savedProducts = productRepository.saveAll(Arrays.asList(p1, p2, p3, p4, p5, p6, p7, p8));

        // ========================== OUTFITS ==========================
        Outfit o1 = Outfit.builder()
                .name("Parisian Chic Workwear")
                .description("Bản phối thanh lịch kết hợp Blazer Beige và Quần Tây xếp ly, chuẩn phong thái nữ giám đốc hiện đại.")
                .occasion(Occasion.WORK)
                .style(StyleType.FORMAL)
                .gender(Gender.WOMEN)
                .season("Thu - Đông")
                .harmonyScore(97.0)
                .aiStylistAdvice("Gợi ý kết hợp cùng túi xách da dáng hộp tone nâu đất và son môi màu đất để tăng khí chất.")
                .previewImageUrl("https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80")
                .products(Arrays.asList(savedProducts.get(0), savedProducts.get(1), savedProducts.get(3), savedProducts.get(6)))
                .totalPrice(new BigDecimal("2610000"))
                .build();

        Outfit o2 = Outfit.builder()
                .name("Urban Cool Streetwear")
                .description("Phóng khoáng, tự tin với áo thun graphic vintage kết hợp cùng quần jeans rách gối và chunky sneakers.")
                .occasion(Occasion.STREET)
                .style(StyleType.STREETWEAR)
                .gender(Gender.UNISEX)
                .season("Xuân - Hè")
                .harmonyScore(94.5)
                .aiStylistAdvice("Phối thêm vòng cổ kim loại bản nhỏ hoặc mũ lưỡi trai để hoàn thiện nét cá tính đường phố.")
                .previewImageUrl("https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80")
                .products(Arrays.asList(savedProducts.get(2), savedProducts.get(4), savedProducts.get(7)))
                .totalPrice(new BigDecimal("1920000"))
                .build();

        outfitRepository.saveAll(Arrays.asList(o1, o2));
    }
}

