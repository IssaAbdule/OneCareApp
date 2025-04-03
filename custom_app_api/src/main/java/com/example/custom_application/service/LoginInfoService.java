package com.example.custom_application.service;

import com.example.custom_application.config.PasswordEncryption;
import com.example.custom_application.entities.LoginInfo;
import com.example.custom_application.entities.UserInfo;
import com.example.custom_application.entities.UserSession;
import com.example.custom_application.model.LoginRequest;
import com.example.custom_application.model.Result;
import com.example.custom_application.repository.LoginInfoRepository;
import com.example.custom_application.repository.SessionRepository;
import com.example.custom_application.repository.UserInfoRepository;
import jakarta.transaction.Transactional;
import java.security.SecureRandom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.OptionalInt;
import java.util.Random;

@Service
public class LoginInfoService {

    private final LoginInfoRepository loginInfoRepository;
    private final UserInfoRepository userInfoRepository;
    private final SessionRepository sessionRepository;
    private String key;


    @Autowired
    public LoginInfoService(LoginInfoRepository loginInfoRepository,
                            UserInfoRepository userInfoRepository,
                            SessionRepository sessionRepository) {
        this.loginInfoRepository = loginInfoRepository;
        this.userInfoRepository = userInfoRepository;
        this.sessionRepository = sessionRepository;
    }



    @Transactional
    public Result createLogin(LoginRequest request) {

        Result result = new Result();
        LoginInfo login = new LoginInfo();
        UserInfo user = userInfoRepository.findByEmail(request.getEmail());

        if(user == null) {

            result.setStatus("FAILURE");
            RuntimeException e = new RuntimeException("User not found");
            result.setMessage(e.getMessage());
        } else {
            if (PasswordEncryption.checkPassword(request.getPassword(), user.getPassword())) {
                if(user.getIsverified())
                {
                    UserSession currUserSession = sessionRepository.findByEmail(request.getEmail());
                    if(currUserSession == null) {
                        key = generateRandomString();
                        System.out.println("Before Session was created " + key);
                        UserSession session = new UserSession(request.getEmail(), user.getUserid(), key);
                        sessionRepository.save(session);
                        System.out.println("After Session was Created " + session.getUuid());
                        result.setStatus("SUCCESS");
                        result.setUser(user);
                        result.setMessage("Login successful");

                        System.out.println("Before the final " + key);
                        result.setSession(key);
                    } else {

                        Exception e = new RuntimeException("User already present");
                        result.setStatus("FAILURE");
                        result.setMessage(e.getMessage());
                    }
                } else {
                    result.setStatus("ERROR");
                    result.setMessage("Please Verify you Email");
                }
            } else {
                RuntimeException e = new RuntimeException("Incorrect email or password.");
                result.setStatus("FAILURE!");
                result.setUser(user);
                result.setMessage(e.getMessage());
            }
        }
        return result;
    }

    public Result getAllLogins(){

        /**
         * New Idea with the session locking in mind
         */
        Result result = new Result();

        List<LoginInfo> allLogins = loginInfoRepository.findAll();
        List<UserSession> allSessions = sessionRepository.findAll();

        boolean isAuthorized = false;


        for (UserSession session : allSessions) {
            for (LoginInfo login : allLogins) {
                if (session.getEmail().equalsIgnoreCase(login.getEmail()) &&
                        session.getUuid().equalsIgnoreCase(key)) {

                    isAuthorized = true;
                    break; // Break inner loop once a match is found
                }
            }
            if (isAuthorized) {
                break; // Break outer loop once an authorized session is found
            }
        }

        if (isAuthorized) {
            result.setStatus("SUCCESS");
            result.setMessage("Authorized to access");
            result.setUser(allLogins); // Assuming you want to return all logins if authorized
        } else {
            result.setStatus("ERROR");
            result.setMessage("Not authorized to access");
        }

        return result;


        /**
         * Here
         */







//        List<LoginInfo> listLogins= null;
//        Result result = new Result<>();
//        if(loginInfoRepository.findAll().isEmpty()) {
//            System.out.println("EMPTY");
//        } else {
//            listLogins = loginInfoRepository.findAll();
//        }
//        result.setStatus("SUCCESS");
//        result.setStatus("Authorized to access");
//        result.setUser(listLogins);


//        return result;
    }

    public String generateRandomString() {
        String generatedString =
                "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789$&";
        int length = 12;

        Random random = new SecureRandom();
        StringBuilder randomString = new StringBuilder();
        for (int i = 0; i < length; i++) {
            int index = random.nextInt(generatedString.length());
            randomString.append(generatedString.charAt(index));
        }
        return randomString.toString();
    }

    public Result logout(String uuid){

        Result result = new Result();
        UserSession userSession = sessionRepository.findByUuid(uuid);
        if(userSession != null) {
            UserSession session = new UserSession(userSession.getEmail(), userSession.getUserid(), uuid);
            sessionRepository.delete(session);
            result.setStatus("SUCCESS");
            result.setMessage(session.getEmail() + " Logout successful");
        } else {
            result.setStatus("FAILURE");
            result.setMessage("Wrong Unique User ID");
        }
        return result;
    }
}
