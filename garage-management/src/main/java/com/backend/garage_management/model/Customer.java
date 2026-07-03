package com.backend.garage_management.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "customers")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false,length = 100)
    private String fullName;

    @Column(nullable = false,length = 20)
    private String phone;

    @OneToOne
    @JoinColumn(name="user_id",nullable = false)
    private User user;

}