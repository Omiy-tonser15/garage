package com.backend.garage_management.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.garage_management.model.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

}