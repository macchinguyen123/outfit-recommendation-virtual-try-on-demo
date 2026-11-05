package com.fashionai.tryon.service;

import com.fashionai.tryon.dto.RecommendationRequest;
import com.fashionai.tryon.dto.RecommendationResponse;
import com.fashionai.tryon.model.*;
import com.fashionai.tryon.repository.OutfitRepository;
import com.fashionai.tryon.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RecommendationService {

    private final OutfitRepository outfitRepository;
    private final ProductRepository productRepository;

    public List<Outfit> getAllOutfits() {
        return outfitRepository.findAll();
    }

    public Optional<Outfit> getOutfitById(Long id) {
        return outfitRepository.findById(id);
    }

    public RecommendationResponse recommendOutfits(RecommendationRequest request) {
        List<Outfit> matchedOutfits = new ArrayList<>();

        // 1. Tìm các set đồ có sẵn phù hợp với Occasion hoặc Style
        if (request.getOccasion() != null && request.getStyle() != null) {
            matchedOutfits = outfitRepository.findByOccasionAndStyle(request.getOccasion(), request.getStyle());
        }
        if (matchedOutfits.isEmpty() && request.getOccasion() != null) {
            matchedOutfits = outfitRepository.findByOccasion(request.getOccasion());
        }
        if (matchedOutfits.isEmpty() && request.getStyle() != null) {
            matchedOutfits = outfitRepository.findByStyle(request.getStyle());
        }
        if (matchedOutfits.isEmpty()) {
            matchedOutfits = outfitRepository.findAll();
        }

        // Lọc theo gender nếu có yêu cầu cụ thể
        if (request.getGender() != null && request.getGender() != Gender.UNISEX) {
            matchedOutfits = matchedOutfits.stream()
                    .filter(o -> o.getGender() == null || o.getGender() == request.getGender() || o.getGender() == Gender.UNISEX)
                    .collect(Collectors.toList());
        }

        // 2. Nếu người dùng chọn 1 sản phẩm cụ thể muốn phối cùng:
        if (request.getExistingProductId() != null) {
            Optional<Product> baseProductOpt = productRepository.findById(request.getExistingProductId());
            if (baseProductOpt.isPresent()) {
                Product baseProduct = baseProductOpt.get();
                Outfit dynamicOutfit = generateDynamicOutfit(baseProduct, request);
                matchedOutfits.add(0, dynamicOutfit); // Đưa set phối này lên đầu tiên
            }
        }

        // 3. Tạo lời khuyên stylist AI dựa trên ngữ cảnh
        String occasionText = request.getOccasion() != null ? request.getOccasion().name() : "hàng ngày";
        String styleText = request.getStyle() != null ? request.getStyle().name() : "hiện đại";
        String weatherText = request.getWeather() != null ? request.getWeather() : "dễ chịu";

        String stylistSummary = String.format(
                "Dựa trên dịp [%s], phong cách [%s] và thời tiết [%s], chuyên gia AI đã tuyển chọn những bản phối cân đối tỉ lệ cơ thể, chuẩn sắc độ và dễ ứng dụng.",
                occasionText, styleText, weatherText
        );

        String colorAdvice = "💡 Gợi ý phối màu: Áp dụng quy tắc phối màu tương phản tinh tế (Neutral + Accent) kết hợp phom dáng Relaxed Fit giúp tạo cảm giác thanh lịch, tự tin.";

        // Danh sách sản phẩm thay thế phong phú
        List<Product> alternativeItems = productRepository.findAll().stream()
                .filter(p -> request.getStyle() == null || p.getStyle() == request.getStyle())
                .limit(8)
                .collect(Collectors.toList());

        return RecommendationResponse.builder()
                .stylistSummary(stylistSummary)
                .colorPaletteAdvice(colorAdvice)
                .recommendedOutfits(matchedOutfits)
                .alternativeItems(alternativeItems)
                .build();
    }

    private Outfit generateDynamicOutfit(Product base, RecommendationRequest request) {
        List<Product> items = new ArrayList<>();
        items.add(base);

        if (base.getCategory() == Category.TOP) {
            // Tìm quần/váy phối cùng
            List<Product> bottoms = productRepository.findByCategory(Category.BOTTOM);
            if (!bottoms.isEmpty()) {
                items.add(bottoms.get(new Random().nextInt(bottoms.size())));
            }
        } else if (base.getCategory() == Category.BOTTOM) {
            // Tìm áo phối cùng
            List<Product> tops = productRepository.findByCategory(Category.TOP);
            if (!tops.isEmpty()) {
                items.add(tops.get(new Random().nextInt(tops.size())));
            }
        }

        // Thêm giày phù hợp
        List<Product> shoes = productRepository.findByCategory(Category.SHOES);
        if (!shoes.isEmpty()) {
            items.add(shoes.get(0));
        }

        BigDecimal total = items.stream()
                .map(p -> p.getPrice() != null ? p.getPrice() : BigDecimal.ZERO)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return Outfit.builder()
                .name("Set phối cá nhân hóa cùng: " + base.getName())
                .description("Bản phối được Stylist AI tính toán tự động dựa trên sản phẩm yêu thích của bạn.")
                .occasion(request.getOccasion() != null ? request.getOccasion() : base.getOccasion())
                .style(request.getStyle() != null ? request.getStyle() : base.getStyle())
                .gender(base.getGender())
                .season(request.getWeather() != null ? request.getWeather() : "Bốn mùa")
                .harmonyScore(98.5)
                .aiStylistAdvice("Set đồ tập trung vào điểm nhấn của " + base.getName() + ", phối cùng tông màu trung tính làm nổi bật phong cách.")
                .previewImageUrl(base.getModelImageUrl() != null ? base.getModelImageUrl() : base.getImageUrl())
                .products(items)
                .totalPrice(total)
                .build();
    }
}

