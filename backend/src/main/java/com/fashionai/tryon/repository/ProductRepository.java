package com.fashionai.tryon.repository;

import com.fashionai.tryon.model.Category;
import com.fashionai.tryon.model.Gender;
import com.fashionai.tryon.model.Occasion;
import com.fashionai.tryon.model.Product;
import com.fashionai.tryon.model.StyleType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByCategory(Category category);

    List<Product> findByStyle(StyleType style);

    List<Product> findByOccasion(Occasion occasion);

    List<Product> findByGender(Gender gender);

    @Query("SELECT p FROM Product p WHERE " +
           "(:keyword IS NULL OR LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(p.description) LIKE LOWER(CONCAT('%', :keyword, '%'))) AND " +
           "(:category IS NULL OR p.category = :category) AND " +
           "(:style IS NULL OR p.style = :style) AND " +
           "(:gender IS NULL OR p.gender = :gender OR p.gender = 'UNISEX') AND " +
           "(:minPrice IS NULL OR p.price >= :minPrice) AND " +
           "(:maxPrice IS NULL OR p.price <= :maxPrice)")
    List<Product> searchProducts(
            @Param("keyword") String keyword,
            @Param("category") Category category,
            @Param("style") StyleType style,
            @Param("gender") Gender gender,
            @Param("minPrice") BigDecimal minPrice,
            @Param("maxPrice") BigDecimal maxPrice
    );

    List<Product> findByCategoryAndStyle(Category category, StyleType style);
}

