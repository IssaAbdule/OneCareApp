package com.example.custom_application.controller;

import com.example.custom_application.model.ResetPasswordRequest;
import com.example.custom_application.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/reset-password-request")
    public ResponseEntity<Map<String, String>> resetPasswordRequest(@RequestBody ResetPasswordRequest request) {
        authService.sendResetPasswordEmail(request.getEmail());
        Map<String, String> response = new HashMap<>();
        response.put("message", "Reset password email sent");
        return ResponseEntity.ok(response);
    }



    @PostMapping("/reset-password")
    public ResponseEntity<Map<String, String>> resetPassword(
            @RequestParam String token,
            @RequestBody String newPassword) {
        if (newPassword.startsWith("{")) {
            newPassword = newPassword.replaceAll("^\\{\"newPassword\":\"", "").replaceAll("\"\\}$", "");
        }
        try {
            authService.resetPassword(token, newPassword);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Password has been reset successfully");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
}

