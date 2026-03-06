package com.idis.backend.repository;

import com.idis.backend.model.Otp;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface OtpRepository extends JpaRepository<Otp, String> {
    Optional<Otp> findTopByEmailOrderByExpiryTimeDesc(String email);
}