package com.fashionai.tryon.controller;

import com.fashionai.tryon.dto.ProductFilterRequest;
import com.fashionai.tryon.model.Category;
import com.fashionai.tryon.model.Gender;
import com.fashionai.tryon.model.Product;
import com.fashionai.tryon.model.StyleType;
import com.fashionai.tryon.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@Tag(name = "Product Management", description = "APIs quản lý và tìm kiếm danh mục sản phẩm thời trang")
public class ProductController {

    private final ProductService productService;

    @GetMapping
    @Operation(summary = "Lấy toàn bộ sản phẩm hoặc lọc theo nhiều tiêu chí")
    public ResponseEntity<List<Product>> getProducts(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Category category,
            @RequestParam(required = false) StyleType style,
            @RequestParam(required = false) Gender gender,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice
    ) {
        if (keyword != null || category != null || style != null || gender != null || minPrice != null || maxPrice != null) {
            ProductFilterRequest filter = new ProductFilterRequest();
            filter.setKeyword(keyword);
            filter.setCategory(category);
            filter.setStyle(style);
            filter.setGender(gender);
            filter.setMinPrice(minPrice);
            filter.setMaxPrice(maxPrice);
            return ResponseEntity.ok(productService.searchProducts(filter));
        }
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Lấy thông tin chi tiết một sản phẩm theo ID")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        return productService.getProductById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/category/{category}")
    @Operation(summary = "Lấy danh sách sản phẩm theo danh mục (TOP, BOTTOM, DRESS, SHOES...)")
    public ResponseEntity<List<Product>> getByCategory(@PathVariable Category category) {
        return ResponseEntity.ok(productService.getByCategory(category));
    }

    @PostMapping
    @Operation(summary = "Tạo mới một sản phẩm thời trang")
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        return ResponseEntity.ok(productService.createProduct(product));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Cập nhật thông tin sản phẩm")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product product) {
        return ResponseEntity.ok(productService.updateProduct(id, product));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Xóa sản phẩm")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
}

