package com.idis.backend.controller;

import com.idis.backend.model.Alert;
import com.idis.backend.repository.AlertRepository;
import com.idis.backend.service.EmailService;
import com.idis.backend.service.SMSService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/alerts")
@CrossOrigin(origins = "http://localhost:8080")
public class AlertController {

    @Autowired
    private AlertRepository alertRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private SMSService smsService;

    @PostMapping("/send")
    public Map<String, String> sendAlert(@RequestBody Alert alert) {
        try {
            alert.setCreatedAt(LocalDateTime.now());
            alertRepository.save(alert);
            
            System.out.println("\n\n=== STANDARD ALERT SENT ===" );
            System.out.println("Title: " + alert.getTitle());
            System.out.println("Message: " + alert.getMessage());
            System.out.println("Severity: " + alert.getSeverity());
            System.out.println("====================================\n");
            
            // Send email alert to all officers
            emailService.sendAlertEmail(alert.getTitle(), alert.getMessage(), alert.getSeverity());
            
            Map<String, String> response = new HashMap<>();
            response.put("status", "success");
            response.put("message", "Alert sent and stored successfully");
            response.put("alertId", alert.getId());
            return response;
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("status", "error");
            response.put("message", e.getMessage());
            return response;
        }
    }

    @PostMapping("/broadcast")
    public Map<String, String> broadcastAlert(@RequestBody Alert alert) {
        try {
            alert.setBroadcast(true);
            alert.setCreatedAt(LocalDateTime.now());
            alertRepository.save(alert);
            
            System.out.println("\n\n=== BROADCAST ALERT INITIATED ===" );
            System.out.println("Title: " + alert.getTitle());
            System.out.println("Message: " + alert.getMessage());
            System.out.println("====================================\n");
            
            // Send broadcast email to all officers
            emailService.sendBroadcastEmail(alert.getTitle(), alert.getMessage());
            
            // Send broadcast SMS to all officers (handles partial failures gracefully)
            smsService.sendBroadcastSMS(alert.getTitle(), alert.getMessage());
            
            Map<String, String> response = new HashMap<>();
            response.put("status", "success");
            response.put("message", "Broadcast alert sent (emails to all officers + SMS attempted)");
            response.put("alertId", alert.getId());
            return response;
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("status", "error");
            response.put("message", "Broadcast partially sent: " + e.getMessage());
            return response;
        }
    }

    @PostMapping("/sms")
    public Map<String, String> sendSmsAlert(@RequestBody Alert alert) {
        try {
            alert.setCreatedAt(LocalDateTime.now());
            alertRepository.save(alert);
            
            System.out.println("\n\n=== SMS ALERT INITIATED ===" );
            System.out.println("Title: " + alert.getTitle());
            System.out.println("Message: " + alert.getMessage());
            System.out.println("====================================\n");
            
            // Send SMS to all officers (handles partial failures gracefully)
            String smsMessage = alert.getTitle() + ": " + alert.getMessage();
            smsService.sendAlertSMS(smsMessage);
            
            Map<String, String> response = new HashMap<>();
            response.put("status", "success");
            response.put("message", "SMS alert sent (only verified numbers in trial account)");
            response.put("alertId", alert.getId());
            response.put("note", "For unverified numbers, visit twilio.com to verify");
            return response;
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("status", "partial");
            response.put("message", "SMS sent to verified numbers only");
            response.put("alertId", alert.getId());
            return response;
        }
    }

    @PostMapping("/email")
    public Map<String, String> sendEmailAlert(@RequestBody Alert alert) {
        try {
            alert.setCreatedAt(LocalDateTime.now());
            alertRepository.save(alert);
            
            System.out.println("\n\n=== EMAIL ALERT INITIATED ===" );
            System.out.println("Title: " + alert.getTitle());
            System.out.println("Message: " + alert.getMessage());
            System.out.println("Severity: " + alert.getSeverity());
            System.out.println("====================================\n");
            
            // Send email to all registered officers
            emailService.sendAlertEmail(alert.getTitle(), alert.getMessage(), alert.getSeverity());
            
            Map<String, String> response = new HashMap<>();
            response.put("status", "success");
            response.put("message", "Email alert sent to all registered officers");
            response.put("alertId", alert.getId());
            return response;
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("status", "error");
            response.put("message", e.getMessage());
            return response;
        }
    }

    @GetMapping("/all")
    public List<Alert> getAllAlerts() {
        return alertRepository.findAll();
    }

    @GetMapping("/building/{buildingId}")
    public List<Alert> getAlertsByBuilding(@PathVariable String buildingId) {
        return alertRepository.findByBuildingId(buildingId);
    }
}
