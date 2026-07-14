package com.backend.garage_management.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.backend.garage_management.dto.LoginRequest;
import com.backend.garage_management.dto.LoginResponse;
import com.backend.garage_management.dto.RegisterRequest;
import com.backend.garage_management.dto.StaffRegisterRequest;
import com.backend.garage_management.services.AuthenticationService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationService authenticationService;

    public AuthController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(
            @RequestBody RegisterRequest request) {

        return ResponseEntity.ok(
                authenticationService.register(request)
        );
    }

    @PostMapping("/register-staff")
    public ResponseEntity<String> registerStaff(
            @RequestBody StaffRegisterRequest request) {

        return ResponseEntity.ok(
                authenticationService.registerStaff(request)
        );
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @RequestBody LoginRequest request) {

        return ResponseEntity.ok(
                authenticationService.login(request)
        );
    }
}