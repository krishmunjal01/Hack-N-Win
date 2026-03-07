package com.idis.backend.service;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class SMSService {

    @Value("${twilio.account-sid}")
    private String accountSid;

    @Value("${twilio.auth-token}")
    private String authToken;

    @Value("${twilio.phone-number}")
    private String twilioPhoneNumber;

    private static final String[] OFFICER_PHONE_NUMBERS = {
            "+919996033812",
            "+919319019651",
            "+917302944356",
            "+919518262305"
    };

    public void sendAlertSMS(String alertMessage) {
        try {
            Twilio.init(accountSid, authToken);
            
            int successCount = 0;
            int failureCount = 0;
            
            for (String phoneNumber : OFFICER_PHONE_NUMBERS) {
                try {
                    Message message = Message.creator(
                            new PhoneNumber(phoneNumber),
                            new PhoneNumber(twilioPhoneNumber),
                            alertMessage
                    ).create();
                    
                    System.out.println("✓ SMS sent successfully to: " + phoneNumber + " with SID: " + message.getSid());
                    successCount++;
                } catch (Exception individualError) {
                    System.err.println("✗ SMS to " + phoneNumber + " failed: " + individualError.getMessage());
                    failureCount++;
                    // Continue with next number instead of breaking
                }
            }
            
            System.out.println("\n=== SMS Alert Summary ===");
            System.out.println("Total numbers: " + OFFICER_PHONE_NUMBERS.length);
            System.out.println("Successful: " + successCount);
            System.out.println("Failed: " + failureCount);
            System.out.println("Note: Trial accounts can only send to verified numbers. Visit twilio.com to verify additional numbers.");
            
        } catch (Exception e) {
            System.err.println("Failed to initialize SMS service: " + e.getMessage());
            e.printStackTrace();
        }
    }

    public void sendBroadcastSMS(String title, String message) {
        String alertMessage = "BROADCAST ALERT - " + title + ": " + message;
        sendAlertSMS(alertMessage);
    }
}
