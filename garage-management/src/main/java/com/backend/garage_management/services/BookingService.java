package com.backend.garage_management.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.backend.garage_management.model.Booking;
import com.backend.garage_management.repository.BookingRepository;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;

    public BookingService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public Booking getBookingById(Long id) {
        return bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
    }

    public Booking createBooking(Booking booking) {
        booking.setId(null);
        return bookingRepository.save(booking);
    }

    public Booking updateBooking(Long id, Booking booking) {

        Booking existing = getBookingById(id);

        existing.setBookingDate(booking.getBookingDate());
        existing.setServiceDate(booking.getServiceDate());
        existing.setStatus(booking.getStatus());
        existing.setCustomer(booking.getCustomer());
        existing.setVehicle(booking.getVehicle());
        existing.setService(booking.getService());
        existing.setStaff(booking.getStaff());

        return bookingRepository.save(existing);
    }

    public void deleteBooking(Long id) {

        if (!bookingRepository.existsById(id)) {
            throw new RuntimeException("Booking not found");
        }

        bookingRepository.deleteById(id);
    }

}