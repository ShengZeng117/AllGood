package com.example.allgood.model;

import lombok.*;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Data
@Document(collection = "User")
public class User {
    @Id
    private String userId;
    @Field
    private String password;
    @Field
    private String firstName;
    @Field
    private String lastName;
    @Field
    private String gender;
    @Field
    private String email;
    @Field
    private String contactNumber;

    public User(String password, String firstName, String lastName, String gender, String email, String contactnumber) {
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.email = email;
        this.contactNumber = contactnumber;
    }
}

