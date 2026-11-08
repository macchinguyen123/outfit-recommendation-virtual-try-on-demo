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

/**
 * Nạp dữ liệu mẫu ban đầu theo chuẩn Polyvore Outfits Dataset:
 * https://www.kaggle.com/datasets/nguynmcch/polyvore-outfits-data
 */
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

        // ========================== POLYVORE LOOK 1: URBAN BAGGY ==========================
        Product p1 = Product.builder()
                .name("Heavyweight Boxy Tee Pure White")
                .description("Áo thun cotton định lượng 260gsm, phom boxy vai trễ chuẩn phong cách Streetwear Polyvore.")
                .category(Category.TOP)
                .subCategory("Áo Thun Oversized")
                .gender(Gender.MEN)
                .style(StyleType.STREETWEAR)
                .occasion(Occasion.STREET)
                .color("Trắng")
                .colorHex("#FFFFFF")
                .size("M, L, XL")
                .price(new BigDecimal("450000"))
                .imageUrl("https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80")
                .modelImageUrl("https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1000&q=80")
                .rating(4.9)
                .reviewCount(54)
                .inStock(true)
                .build();

        Product p2 = Product.builder()
                .name("Vintage Light-Wash Baggy Denim")
                .description("Quần jeans ống thụng rộng, wash màu retro mang hơi thở thẩm mỹ Y2K đường phố.")
                .category(Category.BOTTOM)
                .subCategory("Quần Jeans Ống Suông")
                .gender(Gender.MEN)
                .style(StyleType.STREETWEAR)
                .occasion(Occasion.STREET)
                .color("Xanh Denim Nhạt")
                .colorHex("#7FA2C7")
                .size("30, 31, 32")
                .price(new BigDecimal("780000"))
                .imageUrl("https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80")
                .modelImageUrl("https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1000&q=80")
                .rating(4.8)
                .reviewCount(42)
                .inStock(true)
                .build();

        Product p3 = Product.builder()
                .name("Retro Runner Chunky Sneaker Low")
                .description("Giày thể thao đế đệm êm ái, tông xám bạc phối trắng thanh lịch.")
                .category(Category.SHOES)
                .subCategory("Giày Thể Thao")
                .gender(Gender.MEN)
                .style(StyleType.STREETWEAR)
                .occasion(Occasion.STREET)
                .color("Xám Bạc")
                .colorHex("#D1D5DB")
                .size("40, 41, 42")
                .price(new BigDecimal("1250000"))
                .imageUrl("https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80")
                .modelImageUrl("https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80")
                .rating(4.9)
                .reviewCount(88)
                .inStock(true)
                .build();

        // ========================== POLYVORE LOOK 2: GREY SWEATSHIRT ==========================
        Product p4 = Product.builder()
                .name("Washed French Terry Sweatshirt Heather Grey")
                .description("Chất nỉ da cá dày dặn, phom rộng thoải mái, đường may viền tỉ mỉ.")
                .category(Category.TOP)
                .subCategory("Áo Nỉ Chui Đầu")
                .gender(Gender.MEN)
                .style(StyleType.CASUAL)
                .occasion(Occasion.STREET)
                .color("Xám Tiêu")
                .colorHex("#9CA3AF")
                .size("S, M, L")
                .price(new BigDecimal("620000"))
                .imageUrl("https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80")
                .modelImageUrl("https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1000&q=80")
                .rating(4.7)
                .reviewCount(31)
                .inStock(true)
                .build();

        Product p5 = Product.builder()
                .name("Relaxed Straight-Leg Indigo Jeans")
                .description("Vải denim dệt thoi chắc chắn, sắc xanh đậm cổ điển trường tồn.")
                .category(Category.BOTTOM)
                .subCategory("Quần Jeans Indigo")
                .gender(Gender.MEN)
                .style(StyleType.CASUAL)
                .occasion(Occasion.STREET)
                .color("Xanh Indigo")
                .colorHex("#2563EB")
                .size("30, 32")
                .price(new BigDecimal("720000"))
                .imageUrl("https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=600&q=80")
                .modelImageUrl("https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1000&q=80")
                .rating(4.9)
                .reviewCount(64)
                .inStock(true)
                .build();

        // ========================== POLYVORE LOOK 4: TAILORED BLAZER ==========================
        Product p6 = Product.builder()
                .name("Double-Breasted Wool Blazer Beige")
                .description("Thiết kế vai đệm tự nhiên, phom suông phóng khoáng chuẩn phong thái giám đốc thanh lịch.")
                .category(Category.TOP)
                .subCategory("Áo Blazer Dạ")
                .gender(Gender.WOMEN)
                .style(StyleType.FORMAL)
                .occasion(Occasion.WORK)
                .color("Beige Sữa")
                .colorHex("#E6D5B8")
                .size("S, M")
                .price(new BigDecimal("1150000"))
                .imageUrl("https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80")
                .modelImageUrl("https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80")
                .rating(5.0)
                .reviewCount(96)
                .inStock(true)
                .build();

        Product p7 = Product.builder()
                .name("High-Waist Tailored Trousers Noir")
                .description("Cạp cao tôn dáng, đường xếp ly sắc nét tạo hiệu ứng chân dài miên man.")
                .category(Category.BOTTOM)
                .subCategory("Quần Suông Cao Cấp")
                .gender(Gender.WOMEN)
                .style(StyleType.FORMAL)
                .occasion(Occasion.WORK)
                .color("Đen")
                .colorHex("#0F172A")
                .size("S, M, L")
                .price(new BigDecimal("680000"))
                .imageUrl("https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=600&q=80")
                .modelImageUrl("https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80")
                .rating(4.8)
                .reviewCount(47)
                .inStock(true)
                .build();

        List<Product> saved = productRepository.saveAll(Arrays.asList(p1, p2, p3, p4, p5, p6, p7));

        // ========================== OUTFITS ==========================
        Outfit o1 = Outfit.builder()
                .name("Urban Baggy Minimalist (Polyvore #194201)")
                .description("Set đồ đường phố phóng khoáng với áo thun boxy trắng và quần jeans thụng retro.")
                .occasion(Occasion.STREET)
                .style(StyleType.STREETWEAR)
                .gender(Gender.MEN)
                .season("All Season")
                .harmonyScore(98.2)
                .aiStylistAdvice("Phối tỉ lệ áo rộng và quần thụng đem lại cảm giác thoải mái, kết hợp sneaker retro năng động.")
                .previewImageUrl("https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1000&q=80")
                .products(Arrays.asList(saved.get(0), saved.get(1), saved.get(2)))
                .totalPrice(new BigDecimal("2480000"))
                .build();

        Outfit o2 = Outfit.builder()
                .name("Classic Grey Sweatshirt & Denim (Polyvore #194202)")
                .description("Bản phối kinh điển nỉ xám và quần jeans indigo cho những ngày dạo phố năng động.")
                .occasion(Occasion.STREET)
                .style(StyleType.CASUAL)
                .gender(Gender.MEN)
                .season("Thu - Đông")
                .harmonyScore(96.5)
                .aiStylistAdvice("Gợi ý phối cùng giày canvas cổ cao đen tạo sự tương phản nhẹ nhàng.")
                .previewImageUrl("https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1000&q=80")
                .products(Arrays.asList(saved.get(3), saved.get(4)))
                .totalPrice(new BigDecimal("1340000"))
                .build();

        Outfit o3 = Outfit.builder()
                .name("Parisian Tailored Chic (Polyvore #194204)")
                .description("Phong thái quý phái Parisian kết hợp áo Blazer Beige và quần âu xếp ly đen.")
                .occasion(Occasion.WORK)
                .style(StyleType.FORMAL)
                .gender(Gender.WOMEN)
                .season("Thu - Đông")
                .harmonyScore(99.1)
                .aiStylistAdvice("Kết hợp phụ kiện da tối màu và son tone trầm để hoàn thiện khí chất thanh lịch.")
                .previewImageUrl("https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80")
                .products(Arrays.asList(saved.get(5), saved.get(6)))
                .totalPrice(new BigDecimal("1830000"))
                .build();

        outfitRepository.saveAll(Arrays.asList(o1, o2, o3));
    }
}
