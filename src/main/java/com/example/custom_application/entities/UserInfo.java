package com.example.custom_application.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.*;

@Setter
@Getter
@NoArgsConstructor
@Entity
@Table(name = "userinfo", schema = "public")
public class  UserInfo {
    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "userid", nullable = false)
    private Integer userid;


    @Column(name = "firstname", nullable = false)
    private String firstname;

    @Column(name = "lastname", nullable = false)
    private String lastname;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "phone")
    private String phone;

    @Column(name = "created_at", nullable = true)
    private Date created_at;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "isverified")
    private Boolean isverified;

    @Column(name = "verificationcode")
    private String verificationcode;

    @Column(name = "token_expiration_dt")
    private LocalDateTime token_expiration_dt;

    @JsonIgnore
    public boolean isVerificationCodeExpired() {

        return LocalDateTime.now().isAfter(token_expiration_dt);
    }

}
