package com.backend.garage_management.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.garage_management.model.GarageService;

public interface GarageServiceRepository extends JpaRepository<GarageService, Long> {

    List<GarageService> findByServiceName(String serviceName);

}