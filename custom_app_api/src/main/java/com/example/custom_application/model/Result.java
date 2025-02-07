package com.example.custom_application.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;


@Setter
@Getter
@NoArgsConstructor
public class Result<T> {
    private T user;
    private String message;
    private String status;
    private String session;

}
