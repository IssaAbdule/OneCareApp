package com.example.custom_application.repository;

import com.example.custom_application.entities.UserInfo;
import org.apache.catalina.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserInfoRepository extends JpaRepository<UserInfo, Long> {

    UserInfo findByEmail(String email);

    UserInfo findByVerificationcode(String verificationcode);




}
