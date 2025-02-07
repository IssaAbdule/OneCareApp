package com.example.custom_application.service;

import com.example.custom_application.entities.Customers;
import com.example.custom_application.entities.UserInfo;
import com.example.custom_application.repository.CustomersRepository;
import com.example.custom_application.repository.UserInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomersService {

    private final CustomersRepository customersRepository;
    private final UserInfoRepository userInfoRepository;

    @Autowired
    public CustomersService(CustomersRepository customersRepository, UserInfoRepository userInfoRepository) {
        this.customersRepository = customersRepository;
        this.userInfoRepository = userInfoRepository;
    }

    public Customers registerCustomer(Customers customer, String email) {
        if (customer.getDob() == null) {
            throw new IllegalArgumentException("Date of Birth cannot be null.");
        }

        // Retrieve the user based on the email
        UserInfo user = userInfoRepository.findByEmail(email);

        if (user == null) {
            throw new RuntimeException("User not found");
        }

        // Set the UserInfo entity in the Customers entity
        customer.setUserInfo(user);
        return customersRepository.save(customer);
    }

    public UserInfo findUserByEmail(String email) {
        return userInfoRepository.findByEmail(email);
    }


    public List<Customers> getAllCustomersByUser(int userid) {
        return customersRepository.findByUserInfo_Userid(userid);
    }

    public boolean checkSsnExists(String ssn) {
        return customersRepository.existsBySsn(ssn);
    }

    // Method to find customers by SSN
    public List<Customers> findBySsn(String ssn) {
        return customersRepository.findBySsn(ssn);
    }

    public Customers updateCustomer(int id, Customers updatedCustomer) {
        return customersRepository.findById(id).map(customer -> {
            customer.setFirstname(updatedCustomer.getFirstname());
            customer.setLastname(updatedCustomer.getLastname());
            customer.setSsn(updatedCustomer.getSsn());
            customer.setEmail(updatedCustomer.getEmail());

            // Handle dob, ensure it's not null if required
            if (updatedCustomer.getDob() != null) {
                customer.setDob(updatedCustomer.getDob());
            } else {
                throw new IllegalArgumentException("Date of Birth cannot be null.");
            }
            customer.setGender(updatedCustomer.getGender());
            customer.setPhone(updatedCustomer.getPhone());
            return customersRepository.save(customer);
        }).orElseThrow(() -> new RuntimeException("Customer not found with id " + id));
    }
    public void deleteCustomer(int id) {
        customersRepository.deleteById(id);
    }

    // Other methods, like update, delete, etc.
}
