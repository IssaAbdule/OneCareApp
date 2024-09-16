package com.example.custom_application.controller;

import com.example.custom_application.entities.LoginInfo;
import com.example.custom_application.model.LoginRequest;
import com.example.custom_application.model.Result;
import com.example.custom_application.service.LoginInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class LoginInfoController {

    private final LoginInfoService loginInfoService;

    @Autowired
    public LoginInfoController(LoginInfoService loginInfoService) {
        this.loginInfoService = loginInfoService;
    }

    @GetMapping("/logins")
    public Result getAllLogins(){
        return loginInfoService.getAllLogins();
    }

    @PostMapping("/userlogin")
    public Result createLogin(@RequestBody LoginRequest request) {
        // Update the student record here.
        System.out.println("TESTING TO SEE IF IT HITS HERE");
//        String password = request.getPassword();
//        authenticationService.authenticate(password)
        return loginInfoService.createLogin(request);
    }

    @DeleteMapping("/userlogout/{uuid}")
    public Result logout(@PathVariable String uuid) {
        return loginInfoService.logout(uuid);
    }



}
