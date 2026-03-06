package com.idis.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

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
}
