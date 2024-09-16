package com.example.custom_application.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "logininfo", schema = "public")
public class LoginInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "loginid")
    private Integer loginid;

    @OneToOne
    @JoinColumn(name = "userid", nullable = false, insertable = false, updatable = false)
    private UserInfo userInfo;


    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "userid")
    private Integer userid;

    @Column(name = "login_timestamp")
    private Timestamp login_timestamp;

//    @Column(name = "sessionid")
//    private String sessionid;


    @Override
    public String toString() {
        return "LoginInfo{" +
                "loginid=" + loginid +
                ", userInfo=" + userInfo +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", userid=" + userid + '\'' +
                ", login_timestamp='" + login_timestamp + '\'' +
                '}';
    }
}
