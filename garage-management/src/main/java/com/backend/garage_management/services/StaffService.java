package com.backend.garage_management.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.backend.garage_management.model.Staff;
import com.backend.garage_management.repository.StaffRepository;

@Service
public class StaffService {

    private final StaffRepository staffRepository;

    public StaffService(StaffRepository staffRepository) {
        this.staffRepository = staffRepository;
    }

    public List<Staff> getAllStaff() {
        return staffRepository.findAll();
    }

    public Staff getStaffById(Long id) {
        return staffRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Staff not found"));
    }

    public Staff createStaff(Staff staff) {
        staff.setId(null);
        return staffRepository.save(staff);
    }

    public Staff updateStaff(Long id, Staff staff) {

        Staff existing = getStaffById(id);

        existing.setStaffName(staff.getStaffName());
        existing.setPhone(staff.getPhone());
        existing.setUser(staff.getUser());

        return staffRepository.save(existing);
    }

    public void deleteStaff(Long id) {

        if (!staffRepository.existsById(id)) {
            throw new RuntimeException("Staff not found");
        }

        staffRepository.deleteById(id);
    }

}