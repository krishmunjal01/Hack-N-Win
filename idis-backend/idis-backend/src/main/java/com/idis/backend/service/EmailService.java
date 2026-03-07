package com.idis.backend.service;

import com.idis.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private UserRepository userRepository;

    // Hardcoded default officers to ensure they always get alerts
    private static final String[] DEFAULT_OFFICER_EMAILS = {
            "akshatdubey1102@gmail.com",
            "krishang.kaushik12k@gmail.com",
            "krishmunjal126@gmail.com",
            "bhavyabhugra28@gmail.com"
    };

    public void sendOtpEmail(String toEmail, String otp) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(toEmail);
            message.setFrom("hangingshorts@gmail.com");
            message.setSubject("IDIS - OTP Verification Code");
            message.setText("Your OTP verification code is: " + otp + "\n\n"
                    + "This code will expire in 5 minutes.\n\n"
                    + "National Integrated Disaster Intelligence System (IDIS)");

            mailSender.send(message);
            System.out.println("OTP email sent successfully to: " + toEmail);
        } catch (Exception e) {
            System.err.println("Failed to send OTP email: " + e.getMessage());
            e.printStackTrace();
        }
    }

    public void sendAlertEmail(String title, String message, String severity) {
        try {
            // Collect all emails: default officers + dynamically registered officers
            Set<String> allOfficerEmails = new HashSet<>();
            
            // Add default hardcoded officers
            for (String email : DEFAULT_OFFICER_EMAILS) {
                allOfficerEmails.add(email);
            }
            
            // Add any newly registered officers from database
            List<?> allUsers = userRepository.findAll();
            int totalUsers = allUsers.size();
            
            System.out.println("\n=== Email Alert Processing ===");
            System.out.println("Total users in database: " + totalUsers);
            System.out.println("Default officers: " + DEFAULT_OFFICER_EMAILS.length);
            
            for (Object obj : allUsers) {
                com.idis.backend.model.User user = (com.idis.backend.model.User) obj;
                System.out.println("Checking user: " + user.getUsername() + " | Role: " + user.getRole() + " | Email: " + user.getEmail());
                
                // Add any user with "officer" role to the email list
                if (user.getRole() != null && user.getRole().toLowerCase().contains("officer") && user.getEmail() != null) {
                    allOfficerEmails.add(user.getEmail());
                    System.out.println("  ✓ Added officer to alert list");
                }
            }
            
            System.out.println("\n=== Sending Alerts to Officers ===");
            System.out.println("Total unique officers to notify: " + allOfficerEmails.size());
            
            int emailCount = 0;
            for (String email : allOfficerEmails) {
                try {
                    SimpleMailMessage mail = new SimpleMailMessage();
                    mail.setTo(email);
                    mail.setFrom("hangingshorts@gmail.com");
                    mail.setSubject("IDIS - Emergency Alert: " + title + " [" + severity + "]");
                    mail.setText("EMERGENCY ALERT\n\n"
                            + "Title: " + title + "\n"
                            + "Severity: " + severity + "\n"
                            + "Message: " + message + "\n\n"
                            + "Please take appropriate action immediately.\n\n"
                            + "National Integrated Disaster Intelligence System (IDIS)");

                    mailSender.send(mail);
                    System.out.println("✓ Alert email sent to: " + email);
                    emailCount++;
                } catch (Exception emailError) {
                    System.err.println("✗ Failed to send to " + email + ": " + emailError.getMessage());
                }
            }
            
            System.out.println("\n=== Email Alert Summary ===");
            System.out.println("Successfully sent: " + emailCount + " emails");
            System.out.println("Total recipients: " + allOfficerEmails.size());
            
        } catch (Exception e) {
            System.err.println("Failed to send alert email: " + e.getMessage());
            e.printStackTrace();
        }
    }

    public void sendBroadcastEmail(String title, String message) {
        sendAlertEmail(title, message, "BROADCAST");
    }

    public void sendReportEmail(String trackingId, String buildingName, String category, String description, String reporterName, String reporterPhone) {
        try {
            // Send to specific email and nearest officer
            String[] recipients = {"bhavyabhugra28@gmail.com", "akshatdubey1102@gmail.com"}; // Add nearest officer logic later

            for (String email : recipients) {
                try {
                    SimpleMailMessage mail = new SimpleMailMessage();
                    mail.setTo(email);
                    mail.setFrom("hangingshorts@gmail.com");
                    mail.setSubject("IDIS - New Citizen Report: " + buildingName);
                    mail.setText("NEW CITIZEN REPORT\n\n"
                            + "Tracking ID: " + trackingId + "\n"
                            + "Building: " + buildingName + "\n"
                            + "Category: " + category + "\n"
                            + "Description: " + description + "\n"
                            + "Reporter: " + (reporterName.isEmpty() ? "Anonymous" : reporterName) + "\n"
                            + "Phone: " + (reporterPhone.isEmpty() ? "Not provided" : reporterPhone) + "\n\n"
                            + "Please investigate this report immediately.\n\n"
                            + "National Integrated Disaster Intelligence System (IDIS)");

                    mailSender.send(mail);
                    System.out.println("✓ Report email sent to: " + email);
                } catch (Exception emailError) {
                    System.err.println("✗ Failed to send report to " + email + ": " + emailError.getMessage());
                }
            }
        } catch (Exception e) {
            System.err.println("Failed to send report email: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
