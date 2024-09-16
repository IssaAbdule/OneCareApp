package com.example.custom_application.repository;

import com.example.custom_application.entities.LoginInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoginInfoRepository extends JpaRepository<LoginInfo, Long> {
    LoginInfo findByEmail(String email);

}
