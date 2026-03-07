package com.idis.backend.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "alerts")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Alert {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String title;
    private String message;
    private String severity;
    private String sender;
    private boolean broadcast;
    private String buildingId;

    private LocalDateTime createdAt;
}
