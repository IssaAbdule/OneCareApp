package com.example.custom_application.service;

import com.example.custom_application.entities.UserSession;
import com.example.custom_application.repository.SessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SessionService {

    private final SessionRepository sessionRepository;

    @Autowired
    public SessionService(SessionRepository sessionRepository) {
        this.sessionRepository = sessionRepository;
    }

    public String getEmailFromSessionToken(String sessionToken) {
        UserSession session = sessionRepository.findByUuid(sessionToken);
        return (session != null) ? session.getEmail() : null;
    }
}
