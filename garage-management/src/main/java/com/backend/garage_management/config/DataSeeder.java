package com.backend.garage_management.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.backend.garage_management.model.Staff;
import com.backend.garage_management.model.User;
import com.backend.garage_management.repository.StaffRepository;
import com.backend.garage_management.repository.UserRepository;

@Component
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final StaffRepository staffRepository;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(UserRepository userRepository,
                      StaffRepository staffRepository,
                      PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.staffRepository = staffRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {

        if (!userRepository.existsByUsername("admin")) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setEmail("admin@gmail.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole("ADMIN");

            User savedAdmin = userRepository.save(admin);

            Staff staff = new Staff();
            staff.setStaffName("System Admin");
            staff.setPhone("0000000000");
            staff.setPosition("Administrator");
            staff.setUser(savedAdmin);

            staffRepository.save(staff);
        }
    }
}