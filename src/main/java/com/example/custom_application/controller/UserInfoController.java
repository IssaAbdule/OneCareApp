package com.example.custom_application.controller;

import com.example.custom_application.entities.UserInfo;
import com.example.custom_application.model.Result;
import com.example.custom_application.repository.UserInfoRepository;
import com.example.custom_application.service.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api")
public class UserInfoController {

    private final UserInfoService userInfoService;

    @Autowired
    public UserInfoController(UserInfoService userInfoService,
                              UserInfoRepository userInfoRepository) {
        this.userInfoService = userInfoService;
    }


    @GetMapping("/users")
    public List<UserInfo> getAllUsers(){
        return userInfoService.getAllUsers();
    }

    @PostMapping("/signup")
    public ResponseEntity<UserInfo> signUp(@RequestBody Map<String, String> request) {
        String firstname = request.get("firstname");
        String lastname = request.get("lastname");
        String email = request.get("email");
        String password = request.get("password");
        String phone = request.get("phone");

        UserInfo newUser = userInfoService.createUser(firstname,lastname,email, password, phone);

        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    @GetMapping("/verify/{token}")
    public Result verifyUser(@PathVariable("token") String token) {
        return userInfoService.verifyUser(token);
    }



}
