package com.example.icdtests.repository;

import com.example.icdtests.entity.TestResult;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TestResultRepository extends MongoRepository<TestResult, String> {
} 