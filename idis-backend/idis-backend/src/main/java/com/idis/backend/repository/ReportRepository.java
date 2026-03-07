package com.idis.backend.repository;

import com.idis.backend.model.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ReportRepository extends JpaRepository<Report, String> {
    Optional<Report> findByTrackingId(String trackingId);
}