package com.backend.garage_management.model;

import java.math.BigDecimal;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "services")
public class GarageService {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false,length = 100)
    private String serviceName;

    @Column(nullable = false,length = 500)
    private String description;

    @Column(nullable = false)
    private BigDecimal price;

}