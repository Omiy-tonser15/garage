package com.backend.garage_management.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "vehicles")
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false,unique = true,length = 30)
    private String plateNumber;

    @Column(nullable = false,length = 50)
    private String vehicleType;

    @ManyToOne
    @JoinColumn(name="customer_id",nullable = false)
    private Customer customer;

}