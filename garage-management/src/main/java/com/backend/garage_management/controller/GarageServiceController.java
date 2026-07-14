package com.backend.garage_management.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.backend.garage_management.model.GarageService;
import com.backend.garage_management.services.GarageServiceService;

@RestController
@RequestMapping("/api/services")
public class GarageServiceController {

    private final GarageServiceService garageServiceService;

    public GarageServiceController(GarageServiceService garageServiceService) {
        this.garageServiceService = garageServiceService;
    }

    @PostMapping
    public GarageService create(@RequestBody GarageService service) {
        return garageServiceService.createService(service);
    }

    @GetMapping
    public List<GarageService> getAll() {
        return garageServiceService.getAllServices();
    }

    @GetMapping("/{id}")
    public GarageService getById(@PathVariable Long id) {
        return garageServiceService.getServiceById(id);
    }

    @PutMapping("/{id}")
    public GarageService update(@PathVariable Long id, @RequestBody GarageService service) {
        return garageServiceService.updateService(id, service);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        garageServiceService.deleteService(id);
    }
}