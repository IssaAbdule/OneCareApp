package com.example.custom_application.entities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "confirmationtoken", schema = "public")
public class ConfirmationToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tokenid")
    private Integer tokenid;

    @Column(name = "confirmationtoken")
    private String confirmationToken;

    @Column(name = "createddate")
    private Timestamp crateddate;

    @OneToOne
    @JoinColumn(name = "userid", nullable = false, insertable = false, updatable = false)
    private UserInfo userInfo;

    public ConfirmationToken(UserInfo user) {
        this.userInfo = user;
    }
}
