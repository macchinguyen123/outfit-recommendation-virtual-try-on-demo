package com.fashionai.tryon.service;

import com.fashionai.tryon.dto.TryOnRequestDto;
import com.fashionai.tryon.dto.TryOnResponseDto;
import com.fashionai.tryon.model.Product;
import com.fashionai.tryon.model.TryOnSession;
import com.fashionai.tryon.model.TryOnStatus;
import com.fashionai.tryon.repository.ProductRepository;
import com.fashionai.tryon.repository.TryOnSessionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class TryOnService {

    private final TryOnSessionRepository tryOnSessionRepository;
    private final ProductRepository productRepository;
    private final AiTryOnServiceAdapter aiServiceAdapter;

    public TryOnResponseDto processTryOn(TryOnRequestDto request) {
        long startTime = System.currentTimeMillis();
        String sessionCode = UUID.randomUUID().toString();

        String defaultModelImage = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80";
        String personImage = (request.getPersonImageUrl() != null && !request.getPersonImageUrl().isBlank())
                ? request.getPersonImageUrl()
                : defaultModelImage;

        Product topProduct = null;
        Product bottomProduct = null;
        Product dressProduct = null;

        if (request.getTopProductId() != null) {
            topProduct = productRepository.findById(request.getTopProductId()).orElse(null);
        }
        if (request.getBottomProductId() != null) {
            bottomProduct = productRepository.findById(request.getBottomProductId()).orElse(null);
        }
        if (request.getDressProductId() != null) {
            dressProduct = productRepository.findById(request.getDressProductId()).orElse(null);
        }

        // Tạo bản ghi phiên thử đồ
        TryOnSession session = TryOnSession.builder()
                .sessionCode(sessionCode)
                .userId(request.getUserId())
                .personImageUrl(personImage)
                .topProductId(topProduct != null ? topProduct.getId() : null)
                .topProductName(topProduct != null ? topProduct.getName() : null)
                .bottomProductId(bottomProduct != null ? bottomProduct.getId() : null)
                .bottomProductName(bottomProduct != null ? bottomProduct.getName() : null)
                .dressProductId(dressProduct != null ? dressProduct.getId() : null)
                .dressProductName(dressProduct != null ? dressProduct.getName() : null)
                .status(TryOnStatus.PROCESSING)
                .aiModelUsed(aiServiceAdapter.getModelProvider())
                .build();

        session = tryOnSessionRepository.save(session);

        try {
            String resultUrl;

            // Kịch bản thử cả bộ (Áo + Quần) theo chiến lược tuần tự CatVTON
            if (topProduct != null && bottomProduct != null) {
                log.info("Thực hiện thử cả bộ Áo + Quần theo kịch bản tuần tự của đề cương nghiên cứu");
                resultUrl = aiServiceAdapter.executeSequentialTryOn(
                        personImage,
                        topProduct.getImageUrl(),
                        bottomProduct.getImageUrl()
                );
            } else if (dressProduct != null) {
                resultUrl = aiServiceAdapter.executeVirtualTryOn(personImage, dressProduct.getImageUrl(), "DRESS");
            } else if (topProduct != null) {
                resultUrl = aiServiceAdapter.executeVirtualTryOn(personImage, topProduct.getImageUrl(), "TOP");
            } else if (bottomProduct != null) {
                resultUrl = aiServiceAdapter.executeVirtualTryOn(personImage, bottomProduct.getImageUrl(), "BOTTOM");
            } else {
                resultUrl = defaultModelImage;
            }

            long duration = System.currentTimeMillis() - startTime;
            session.setStatus(TryOnStatus.COMPLETED);
            session.setResultImageUrl(resultUrl);
            session.setExecutionTimeMs(duration);
            session.setCompletedAt(LocalDateTime.now());
            tryOnSessionRepository.save(session);

            return mapToDto(session, "Thử đồ ảo thành công với độ phân giải cao!");

        } catch (Exception e) {
            log.error("Lỗi trong quá trình thử đồ AI: {}", e.getMessage(), e);
            session.setStatus(TryOnStatus.FAILED);
            session.setErrorMessage(e.getMessage());
            tryOnSessionRepository.save(session);

            return mapToDto(session, "Không thể hoàn thành thử đồ ảo: " + e.getMessage());
        }
    }

    public Optional<TryOnResponseDto> getSession(String sessionCode) {
        return tryOnSessionRepository.findBySessionCode(sessionCode)
                .map(s -> mapToDto(s, "Thông tin phiên thử đồ"));
    }

    public List<TryOnResponseDto> getRecentSessions() {
        return tryOnSessionRepository.findTop20ByOrderByCreatedAtDesc()
                .stream()
                .map(s -> mapToDto(s, "Lịch sử"))
                .collect(Collectors.toList());
    }

    private TryOnResponseDto mapToDto(TryOnSession s, String msg) {
        return TryOnResponseDto.builder()
                .sessionCode(s.getSessionCode())
                .status(s.getStatus())
                .personImageUrl(s.getPersonImageUrl())
                .resultImageUrl(s.getResultImageUrl())
                .topProductName(s.getTopProductName())
                .bottomProductName(s.getBottomProductName())
                .dressProductName(s.getDressProductName())
                .aiModelUsed(s.getAiModelUsed())
                .executionTimeMs(s.getExecutionTimeMs())
                .message(msg)
                .createdAt(s.getCreatedAt())
                .build();
    }
}

