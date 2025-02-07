package com.example.custom_application.service;

import com.example.custom_application.config.PasswordEncryption;
import com.example.custom_application.entities.LoginInfo;
import com.example.custom_application.entities.UserInfo;
import com.example.custom_application.entities.UserSession;
import com.example.custom_application.model.Result;
import com.example.custom_application.repository.LoginInfoRepository;
import com.example.custom_application.repository.SessionRepository;
import com.example.custom_application.repository.UserInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.UUID;

@Service
public class UserInfoService {

    private final UserInfoRepository userInfoRepository;
    private final LoginInfoRepository loginInfoRepository;
    private final EmailService emailService;
    private final SessionRepository sessionRepository;


    @Autowired
    public UserInfoService(UserInfoRepository userInfoRepository,
                           LoginInfoRepository loginInfoRepository, EmailService emailService, SessionRepository sessionRepository) {
        this.userInfoRepository = userInfoRepository;
        this.loginInfoRepository = loginInfoRepository;
        this.emailService = emailService;
        this.sessionRepository = sessionRepository;
    }

    String var = "Let us start from here";
    public List<UserInfo> getAllUsers(){
        List<UserInfo> listUsers = null;
        if(userInfoRepository.findAll().isEmpty()) {
            System.out.println("EMPTY");
        } else {
            listUsers = userInfoRepository.findAll();
        }

        Result result = new Result<>();

        result.setUser(listUsers);

        return listUsers;
    }

    public UserInfo createUser(String firstname, String lastname, String email, String password, String phone) {

        Result result = new Result();

        try{

        } catch (Exception e){
            e.printStackTrace();
        }
        // Check if username is already taken
        if (userInfoRepository.findByEmail(email) != null) {
            throw new RuntimeException("Email is already taken");

        }

        UserInfo user = new UserInfo();
        user.setFirstname(firstname);
        user.setLastname(lastname);
        user.setEmail(email);
        String hashedPassword = PasswordEncryption.hashPassword(password);
        user.setPassword(hashedPassword);
        user.setPhone(phone);
        user.setCreated_at(new Timestamp(System.currentTimeMillis()));
        // Set other user information as needed



        String token = UUID.randomUUID().toString();

        LocalDateTime expirationTime = LocalDateTime.now().plus(20, ChronoUnit.MINUTES);
        user.setVerificationcode(token);
        user.setIsverified(false);
        user.setToken_expiration_dt(expirationTime);

        userInfoRepository.save(user);

        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        String baseURL = "http://localhost:4200/verify/";

//        "http://localhost:8080/api/auth/verify/";
        simpleMailMessage.setTo(user.getEmail());
        simpleMailMessage.setSubject("Complete Registration");
        simpleMailMessage.setFrom("issa.abdule@gmail.com");
        simpleMailMessage.setText("To confirm your registration, please click here : " +
                baseURL + user.getVerificationcode());

        emailService.sendEmail(simpleMailMessage);

        System.out.println("VERIFYING THE HASHED PASSWORD");
//        if(PasswordEncryption.checkPassword(password,hashedPassword)){
//            System.out.println("PASSWORD VERIFIED");
//        }

        // Create login entry
        LoginInfo login = new LoginInfo();
        login.setUserid(user.getUserid());
        login.setEmail(user.getEmail());
        login.setPassword(user.getPassword());
        login.setLogin_timestamp(new Timestamp(System.currentTimeMillis()));


        loginInfoRepository.save(login);

        return user;
    }

    public Result verifyUser(String token) {

        Result result = new Result();
        UserInfo user = userInfoRepository.findByVerificationcode(token);

        if (user == null) {
            result.setStatus("ERROR");
            result.setMessage("Invalid User");

        } else if(user.isVerificationCodeExpired()){
            result.setStatus("ERROR");
            result.setMessage("Expired User");
        } else {
            result.setStatus("SUCCESS");
            result.setMessage("User verified");
            user.setIsverified(true);
            user.setVerificationcode(null); // Clear the token after verification
            userInfoRepository.save(user);
        }


        return result;

    }

//    public UserInfo getUserBySessionToken(String sessionToken) {
//        UserSession session = sessionRepository.findByUuid(sessionToken);
//        if (session != null) {
//            return userInfoRepository.findById((long) session.getUserid()).orElse(null);
//        }
//        return null;
//    }



}
