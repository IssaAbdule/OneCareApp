package com.example.custom_application.controller;


import com.example.custom_application.entities.Customers;
import com.example.custom_application.entities.UserInfo;
import com.example.custom_application.service.CustomersService;
import com.example.custom_application.service.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
public class CustomersController {

    private final CustomersService customersService;
    private final SessionService sessionService;

    @Autowired
    public CustomersController(CustomersService customersService,
                               SessionService sessionService) {
        this.customersService = customersService;
        this.sessionService = sessionService;
    }

    @PostMapping("/register")
    public ResponseEntity<Customers> registerCustomer(
            @RequestBody Customers customer,
            @RequestHeader("Authorization") String sessionToken) {

        // Retrieve user email from session token
        String email = sessionService.getEmailFromSessionToken(sessionToken);

        if (email == null) {
            return ResponseEntity.status(401).body(null); // Unauthorized
        }

        Customers registeredCustomer = customersService.registerCustomer(customer, email);
        return ResponseEntity.ok(registeredCustomer);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Customers>> getAllCustomers(@RequestHeader("Authorization") String sessionToken) {
        // Retrieve user email from session token
        String email = sessionService.getEmailFromSessionToken(sessionToken);

        if (email == null) {
            return ResponseEntity.status(401).build(); // Unauthorized
        }

        // Fetch user information using email
        UserInfo user = customersService.findUserByEmail(email);
        if (user == null) {
            return ResponseEntity.status(404).build(); // User not found
        }

        // Retrieve customers by the logged-in user's ID
        List<Customers> customers = customersService.getAllCustomersByUser(user.getUserid());
        return ResponseEntity.ok(customers);
    }

    @GetMapping("/check-ssn/{ssn}")
    public ResponseEntity<Boolean> checkSsnExists(@PathVariable String ssn) {
        boolean exists = customersService.checkSsnExists(ssn);
        return ResponseEntity.ok(exists);
    }

    // Endpoint to search customers by SSN
    @GetMapping("/search")
    public List<Customers> searchBySsn(@RequestParam String ssn) {
        return customersService.findBySsn(ssn);
    }

    // Edit endpoint
    @PutMapping("/{id}")
    public ResponseEntity<Customers> updateCustomer(@PathVariable int id, @RequestBody Customers updatedCustomer) {
        Customers customer = customersService.updateCustomer(id, updatedCustomer);
        return ResponseEntity.ok(customer);
    }

    // Delete endpoint
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable int id) {
        customersService.deleteCustomer(id);
        return ResponseEntity.noContent().build();
    }

    // Other endpoints for update, delete, etc.
}

