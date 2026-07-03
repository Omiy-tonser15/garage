package com.backend.garage_management.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.backend.garage_management.model.Vehicle;
import com.backend.garage_management.repository.VehicleRepository;

@Service
public class VehicleService {

    private final VehicleRepository vehicleRepository;

    public VehicleService(VehicleRepository vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }

    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }

    public Vehicle getVehicleById(Long id) {
        return vehicleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));
    }

    public Vehicle createVehicle(Vehicle vehicle) {
        vehicle.setId(null);
        return vehicleRepository.save(vehicle);
    }

    public Vehicle updateVehicle(Long id, Vehicle vehicle) {

        Vehicle existing = getVehicleById(id);

        existing.setPlateNumber(vehicle.getPlateNumber());
        existing.setVehicleType(vehicle.getVehicleType());
        existing.setCustomer(vehicle.getCustomer());

        return vehicleRepository.save(existing);
    }

    public void deleteVehicle(Long id) {

        if (!vehicleRepository.existsById(id)) {
            throw new RuntimeException("Vehicle not found");
        }

        vehicleRepository.deleteById(id);
    }

}