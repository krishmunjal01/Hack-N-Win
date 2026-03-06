package com.idis.backend.config;

import com.idis.backend.model.User;
import com.idis.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {
        System.out.println("\n========== Initializing Database Users ==========");
        
        // Clear existing users for fresh start
        userRepository.deleteAll();
        System.out.println("✅ Database cleared.");
        
        // 1. National Administrator
        User admin = new User();
        admin.setUsername("Krish");
        admin.setName("Krish Munjal");
        admin.setEmail("krishmunjal126@gmail.com");
        admin.setPassword("krishmunjal@25");
        admin.setRole("national_admin");
        admin.setState(null);
        admin.setDistrict(null);
        userRepository.save(admin);
        System.out.println("✅ National Administrator created");
        System.out.println("   Username: Krish | Email: krishmunjal126@gmail.com");
        
        // 2. State Administrator
        User stateAdmin = new User();
        stateAdmin.setUsername("Akshat");
        stateAdmin.setName("Akshat Dubey");
        stateAdmin.setEmail("akshatdubey1102@gmail.com");
        stateAdmin.setPassword("akshatdubey@25");
        stateAdmin.setRole("state_officer");
        stateAdmin.setState("Maharashtra");
        stateAdmin.setDistrict(null);
        userRepository.save(stateAdmin);
        System.out.println("✅ State Administrator created");
        System.out.println("   Username: Akshat | Email: akshatdubey1102@gmail.com");
        
        // 3. District Administrator
        User districtAdmin = new User();
        districtAdmin.setUsername("Krishang");
        districtAdmin.setName("Krishang Kaushik");
        districtAdmin.setEmail("krishang.kaushik12k@gmail.com");
        districtAdmin.setPassword("krishangkaushik@25");
        districtAdmin.setRole("district_officer");
        districtAdmin.setState("Maharashtra");
        districtAdmin.setDistrict("Mumbai");
        userRepository.save(districtAdmin);
        System.out.println("✅ District Administrator created");
        System.out.println("   Username: Krishang | Email: krishang.kaushik12k@gmail.com");
        
        // 4. Officer (Building Authority)
        User officer = new User();
        officer.setUsername("bhavya");
        officer.setName("Bhavya Bhugra");
        officer.setEmail("bhavyabhugra28@gmail.com");
        officer.setPassword("bhavyabhugra@25");
        officer.setRole("building_authority");
        officer.setState("Maharashtra");
        officer.setDistrict(null);
        userRepository.save(officer);
        System.out.println("✅ Officer created");
        System.out.println("   Username: bhavya | Email: bhavyabhugra28@gmail.com");
        
        System.out.println("\n✅ All users initialized successfully!");
        System.out.println("Registration page is active - new users can register and will be stored.\n");
    }
}
