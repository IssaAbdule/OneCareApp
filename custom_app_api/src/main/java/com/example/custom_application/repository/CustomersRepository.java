package com.example.custom_application.repository;

import com.example.custom_application.entities.Customers;
import com.example.custom_application.entities.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomersRepository extends JpaRepository<Customers, Integer> {
    List<Customers> findByUserInfo_Userid(int userid);
    boolean existsBySsn(String ssn);
    // Custom query method to find customers by SSN
    List<Customers> findBySsn(String ssn);
}
