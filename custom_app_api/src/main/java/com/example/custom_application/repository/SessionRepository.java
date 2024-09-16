package com.example.custom_application.repository;

import com.example.custom_application.entities.UserSession;
import org.apache.catalina.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SessionRepository extends JpaRepository<UserSession, String> {

    UserSession findByUuid(String uuid);
    UserSession findByEmail(String email);

}
