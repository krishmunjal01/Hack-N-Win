package com.idis.backend.controller;

import com.idis.backend.model.Report;
import com.idis.backend.repository.ReportRepository;
import com.idis.backend.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "http://localhost:8080")
public class ReportController {

    @Autowired
    private ReportRepository reportRepository;

    @Autowired
    private EmailService emailService;

    @PostMapping("/submit")
    public Map<String, Object> submitReport(@RequestBody Report report) {
        try {
            if (report.getTrackingId() == null || report.getTrackingId().isEmpty()) {
                report.setTrackingId("RPT-" + System.currentTimeMillis());
            }
            report.setStatus("submitted");
            report.setDistrict("Nearest District (Auto-assigned)");
            report.setSubmittedAt(LocalDateTime.now());

            Report savedReport = reportRepository.save(report);

            // Send email notification
            emailService.sendReportEmail(
                report.getTrackingId(),
                report.getBuildingName(),
                report.getCategory(),
                report.getDescription(),
                report.getReporterName(),
                report.getReporterPhone()
            );

            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("message", "Report submitted successfully");
            response.put("trackingId", savedReport.getTrackingId());
            return response;
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("status", "error");
            response.put("message", e.getMessage());
            return response;
        }
    }

    @GetMapping("/track/{trackingId}")
    public Map<String, Object> trackReport(@PathVariable String trackingId) {
        try {
            Optional<Report> reportOpt = reportRepository.findByTrackingId(trackingId);
            if (reportOpt.isPresent()) {
                Report report = reportOpt.get();
                Map<String, Object> response = new HashMap<>();
                response.put("status", "found");
                response.put("report", report);
                return response;
            } else {
                Map<String, Object> response = new HashMap<>();
                response.put("status", "not_found");
                response.put("message", "Report not found");
                return response;
            }
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("status", "error");
            response.put("message", e.getMessage());
            return response;
        }
    }
}