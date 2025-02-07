package com.example.custom_application.service;


import com.example.custom_application.config.PasswordEncryption;
import com.example.custom_application.entities.LoginInfo;
import com.example.custom_application.entities.ResetPasswordToken;
import com.example.custom_application.entities.UserInfo;
import com.example.custom_application.repository.LoginInfoRepository;
import com.example.custom_application.repository.ResetPasswordTokenRepository;
import com.example.custom_application.repository.UserInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class AuthService {

    @Autowired
    private ResetPasswordTokenRepository tokenRepository;

    @Autowired
    private UserInfoRepository userInfoRepository;

    @Autowired
    private EmailService emailService; // Assume you have this service to send emails
    @Autowired
    private ResetPasswordTokenRepository resetPasswordTokenRepository;
    @Autowired
    private LoginInfoRepository loginInfoRepository;

    public void sendResetPasswordEmail(String email) {
        String token = UUID.randomUUID().toString();
        ResetPasswordToken resetToken = new ResetPasswordToken();
        resetToken.setToken(token);
        resetToken.setEmail(email);
        resetToken.setExpiryDate(LocalDateTime.now().plusHours(1)); // Token valid for 1 hour
        tokenRepository.save(resetToken);

        SimpleMailMessage emailMessage = new SimpleMailMessage();
//
        String baseURL = "http://localhost:4200/reset-password?token=";
        emailMessage.setTo(email);
        emailMessage.setSubject("Reset Password Token");
        emailMessage.setFrom("issa.abdule@gmail.com");
        emailMessage.setText("To confirm your registration, please click here : " +
                baseURL + resetToken.getToken());

        emailService.sendEmail(emailMessage);
    }

    public void resetPassword(String token, String newPassword) {
        ResetPasswordToken resetToken = tokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid token"));

        if (resetToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Token expired");
        }
        // Find the user by email and update the password
        String email = resetToken.getEmail();
        UserInfo user = userInfoRepository.findByEmail(email);
        LoginInfo login = loginInfoRepository.findByEmail(email);

        if(user == null){
            throw new RuntimeException("User not found");
        }
        String hashedPassword = PasswordEncryption.hashPassword(newPassword);
        user.setPassword(hashedPassword); // Assume the password is hashed
        userInfoRepository.save(user);

        login.setPassword(newPassword);
        loginInfoRepository.save(login);

        // Optionally, delete the token after successful reset
        tokenRepository.delete(resetToken);
    }
}

