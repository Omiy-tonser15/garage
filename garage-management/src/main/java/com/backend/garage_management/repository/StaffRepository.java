package com.backend.garage_management.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.garage_management.model.Staff;

public interface StaffRepository extends JpaRepository<Staff, Long> {

}