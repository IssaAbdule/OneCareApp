package com.example.custom_application.repository;

import com.example.custom_application.entities.ResetPasswordToken;
import com.example.custom_application.entities.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.*;

public interface ResetPasswordTokenRepository extends JpaRepository<ResetPasswordToken, Long> {
    Optional<ResetPasswordToken> findByToken(String token);


}

