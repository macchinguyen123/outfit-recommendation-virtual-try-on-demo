package com.fashionai.tryon.repository;

import com.fashionai.tryon.model.TryOnSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TryOnSessionRepository extends JpaRepository<TryOnSession, Long> {
    Optional<TryOnSession> findBySessionCode(String sessionCode);
    List<TryOnSession> findByUserIdOrderByCreatedAtDesc(Long userId);
    List<TryOnSession> findTop20ByOrderByCreatedAtDesc();
}

