package com.fashionai.tryon.repository;

import com.fashionai.tryon.model.Gender;
import com.fashionai.tryon.model.Occasion;
import com.fashionai.tryon.model.Outfit;
import com.fashionai.tryon.model.StyleType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OutfitRepository extends JpaRepository<Outfit, Long> {
    List<Outfit> findByOccasion(Occasion occasion);
    List<Outfit> findByStyle(StyleType style);
    List<Outfit> findByGender(Gender gender);
    List<Outfit> findByOccasionAndStyle(Occasion occasion, StyleType style);
}

