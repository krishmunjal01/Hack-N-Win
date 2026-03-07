package com.idis.backend.repository;

import com.idis.backend.model.Alert;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AlertRepository extends JpaRepository<Alert, String> {
    List<Alert> findByBuildingId(String buildingId);
}
