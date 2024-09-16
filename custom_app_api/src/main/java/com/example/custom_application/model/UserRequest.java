package com.example.custom_application.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserRequest implements Serializable {
    private String firstname;
    private String lastname;
    private String email;
    private String password;
    private String phone;

}
