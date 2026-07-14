package com.backend.garage_management.services;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.backend.garage_management.dto.LoginRequest;
import com.backend.garage_management.dto.LoginResponse;
import com.backend.garage_management.dto.RegisterRequest;
import com.backend.garage_management.dto.StaffRegisterRequest;
import com.backend.garage_management.model.Customer;
import com.backend.garage_management.model.Staff;
import com.backend.garage_management.model.User;
import com.backend.garage_management.repository.CustomerRepository;
import com.backend.garage_management.repository.StaffRepository;
import com.backend.garage_management.repository.UserRepository;
import com.backend.garage_management.security.JwtService;

@Service
public class AuthenticationService {

    private final UserRepository userRepository;
    private final CustomerRepository customerRepository;
    private final StaffRepository staffRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AuthenticationService(
            UserRepository userRepository,
            CustomerRepository customerRepository,
            StaffRepository staffRepository,
            PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager,
            JwtService jwtService) {

        this.userRepository = userRepository;
        this.customerRepository = customerRepository;
        this.staffRepository = staffRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    @Transactional
    public String register(RegisterRequest request) {

        validateUser(request.getUsername(), request.getEmail());

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole("CUSTOMER");

        User savedUser = userRepository.save(user);

        Customer customer = new Customer();
        customer.setFullName(request.getFullName());
        customer.setPhone(request.getPhone());
        customer.setUser(savedUser);

        customerRepository.save(customer);

        return "Customer registration successful";
    }

    @Transactional
    public String registerStaff(StaffRegisterRequest request) {

        validateUser(request.getUsername(), request.getEmail());

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole("STAFF");

        User savedUser = userRepository.save(user);

        Staff staff = new Staff();
        staff.setStaffName(request.getStaffName());
        staff.setPhone(request.getPhone());
        staff.setPosition(request.getPosition());
        staff.setUser(savedUser);

        staffRepository.save(staff);

        return "Staff registration successful";
    }

    public LoginResponse login(LoginRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("Invalid username"));

        String token = jwtService.generateToken(user.getUsername());

        return new LoginResponse(
                token,
                user.getUsername(),
                user.getRole()
        );
    }

    private void validateUser(String username, String email) {

        if (userRepository.existsByUsername(username)) {
            throw new RuntimeException("Username already exists");
        }

        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("Email already exists");
        }
    }
}