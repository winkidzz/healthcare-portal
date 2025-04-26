package com.example.icdtests;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories
public class IcdTestsApplication {

    public static void main(String[] args) {
        SpringApplication.run(IcdTestsApplication.class, args);
    }
} 