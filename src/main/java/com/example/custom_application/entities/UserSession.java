package com.example.custom_application.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "usersession", schema = "public")
public class UserSession {

    @Id
    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "userid", nullable = false)
    private int userid;

    @Column(name = "uuid", nullable = false)
    private String uuid;


}
