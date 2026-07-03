package com.backend.garage_management.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.backend.garage_management.model.GarageService;
import com.backend.garage_management.repository.GarageServiceRepository;

@Service
public class GarageServiceService {

    private final GarageServiceRepository garageServiceRepository;

    public GarageServiceService(GarageServiceRepository garageServiceRepository) {
        this.garageServiceRepository = garageServiceRepository;
    }

    public List<GarageService> getAllServices() {
        return garageServiceRepository.findAll();
    }

    public GarageService getServiceById(Long id) {
        return garageServiceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Service not found"));
    }

    public GarageService createService(GarageService service) {
        service.setId(null);
        return garageServiceRepository.save(service);
    }

    public GarageService updateService(Long id, GarageService service) {

        GarageService existing = getServiceById(id);

        existing.setServiceName(service.getServiceName());
        existing.setDescription(service.getDescription());
        existing.setPrice(service.getPrice());

        return garageServiceRepository.save(existing);
    }

    public void deleteService(Long id) {

        if (!garageServiceRepository.existsById(id)) {
            throw new RuntimeException("Service not found");
        }

        garageServiceRepository.deleteById(id);
    }

}