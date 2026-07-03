package com.backend.garage_management.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "staff")
public class Staff {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false,length = 100)
    private String staffName;

    @Column(nullable = false,length = 20)
    private String phone;

    @Column(nullable = false,length = 100)
    private String position;

    @OneToOne
    @JoinColumn(name="user_id",nullable = false)
    private User user;

}