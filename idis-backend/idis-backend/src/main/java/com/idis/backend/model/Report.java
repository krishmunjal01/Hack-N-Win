package com.idis.backend.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "reports")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String trackingId;
    private String buildingName;
    private String address;
    private String category;
    private String description;
    private boolean anonymous;
    private String reporterName;
    private String reporterPhone;
    private String status;
    private String district;
    private Double latitude;
    private Double longitude;

    private LocalDateTime submittedAt;
}