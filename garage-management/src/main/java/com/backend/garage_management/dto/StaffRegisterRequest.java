package com.backend.garage_management.dto;

import lombok.Data;

@Data
public class StaffRegisterRequest {

    private String username;
    private String email;
    private String password;
    private String staffName;
    private String phone;
    private String position;
}