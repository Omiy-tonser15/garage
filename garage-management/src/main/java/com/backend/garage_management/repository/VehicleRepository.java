package com.backend.garage_management.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.garage_management.model.Vehicle;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {

    List<Vehicle> findByCustomerId(Long customerId);

    List<Vehicle> findByPlateNumber(String plateNumber);

}