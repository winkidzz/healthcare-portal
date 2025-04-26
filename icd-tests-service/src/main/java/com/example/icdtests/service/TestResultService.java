package com.example.icdtests.service;

import com.example.icdtests.entity.TestResult;
import com.example.icdtests.repository.TestResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.CachePut;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TestResultService {

    @Autowired
    private TestResultRepository testResultRepository;

    @CachePut(value = "testResults", key = "#result.id")
    public TestResult saveTestResult(TestResult result) {
        result.setTimestamp(LocalDateTime.now());
        return testResultRepository.save(result);
    }

    @Cacheable(value = "testResults", key = "#id")
    public TestResult getTestResult(String id) {
        return testResultRepository.findById(id).orElse(null);
    }

    public List<TestResult> getAllTestResults() {
        return testResultRepository.findAll();
    }
} 