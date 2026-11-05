package com.fashionai.tryon.service;

import com.fashionai.tryon.dto.ProductFilterRequest;
import com.fashionai.tryon.model.Category;
import com.fashionai.tryon.model.Gender;
import com.fashionai.tryon.model.Product;
import com.fashionai.tryon.model.StyleType;
import com.fashionai.tryon.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    public List<Product> searchProducts(ProductFilterRequest filter) {
        return productRepository.searchProducts(
                filter.getKeyword(),
                filter.getCategory(),
                filter.getStyle(),
                filter.getGender(),
                filter.getMinPrice(),
                filter.getMaxPrice()
        );
    }

    public List<Product> getByCategory(Category category) {
        return productRepository.findByCategory(category);
    }

    public List<Product> getByStyle(StyleType style) {
        return productRepository.findByStyle(style);
    }

    public List<Product> getByGender(Gender gender) {
        return productRepository.findByGender(gender);
    }

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public Product updateProduct(Long id, Product updatedProduct) {
        return productRepository.findById(id).map(existing -> {
            existing.setName(updatedProduct.getName());
            existing.setDescription(updatedProduct.getDescription());
            existing.setCategory(updatedProduct.getCategory());
            existing.setSubCategory(updatedProduct.getSubCategory());
            existing.setGender(updatedProduct.getGender());
            existing.setStyle(updatedProduct.getStyle());
            existing.setOccasion(updatedProduct.getOccasion());
            existing.setColor(updatedProduct.getColor());
            existing.setColorHex(updatedProduct.getColorHex());
            existing.setSize(updatedProduct.getSize());
            existing.setPrice(updatedProduct.getPrice());
            existing.setImageUrl(updatedProduct.getImageUrl());
            existing.setModelImageUrl(updatedProduct.getModelImageUrl());
            existing.setInStock(updatedProduct.getInStock());
            return productRepository.save(existing);
        }).orElseThrow(() -> new RuntimeException("Sản phẩm không tồn tại với ID: " + id));
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}

