package com.backend.garage_management.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.garage_management.model.Booking;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByCustomerId(Long customerId);

    List<Booking> findByStaffId(Long staffId);

    List<Booking> findByStatus(String status);

}