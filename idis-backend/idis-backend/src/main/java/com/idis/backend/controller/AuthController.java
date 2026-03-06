package com.idis.backend.controller;

import com.idis.backend.model.User;
import com.idis.backend.model.Otp;
import com.idis.backend.repository.UserRepository;
import com.idis.backend.repository.OtpRepository;
import com.idis.backend.service.EmailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:8080")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OtpRepository otpRepository;

    @Autowired
    private EmailService emailService;

    // 🔥 LOGIN (Generate OTP)
    @PostMapping("/login")
    public String login(@RequestBody User loginRequest) {

        Optional<User> user = userRepository.findByEmail(loginRequest.getEmail());

        if (user.isEmpty()) {
            return "User not found";
        }

        if (!user.get().getPassword().equals(loginRequest.getPassword())) {
            return "Invalid password";
        }

        String otpCode = String.valueOf(100000 + new Random().nextInt(900000));

        Otp otp = new Otp();
        otp.setEmail(loginRequest.getEmail());
        otp.setOtp(otpCode); // ✅ correct setter
        otp.setExpiryTime(LocalDateTime.now().plusMinutes(5)); // ✅ set expiry

        otpRepository.save(otp);
        
        System.out.println("Generated OTP: " + otpCode);
        
        // Send OTP via email
        emailService.sendOtpEmail(loginRequest.getEmail(), otpCode);

        return "OTP sent";
    }

    // 🔥 VERIFY OTP
    @PostMapping("/verify-otp")
    public String verifyOtp(@RequestBody Otp request) {

        Optional<Otp> otp = otpRepository
                .findTopByEmailOrderByExpiryTimeDesc(request.getEmail());

        if (otp.isEmpty()) {
            return "OTP not found";
        }

        if (otp.get().getExpiryTime().isBefore(LocalDateTime.now())) {
            return "OTP expired";
        }

        if (!otp.get().getOtp().equals(request.getOtp())) {
            return "Invalid OTP";
        }

        return "Login successful";
    }

    // 🔥 REGISTER
    @PostMapping("/register")
    public String register(@RequestBody User user) {

        userRepository.save(user);

        return "User registered successfully";
    }

    // 🔥 GET USER BY EMAIL
    @GetMapping("/user/{email}")
    public User getUserByEmail(@PathVariable String email) {

        Optional<User> user = userRepository.findByEmail(email);

        if (user.isEmpty()) {
            return null; // Frontend will handle null response
        }

        return user.get();
    }
}