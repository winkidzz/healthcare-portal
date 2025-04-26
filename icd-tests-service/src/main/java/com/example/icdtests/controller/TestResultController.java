package com.example.icdtests.controller;

import com.example.icdtests.entity.TestResult;
import com.example.icdtests.service.TestResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/test-results")
public class TestResultController {

    @Autowired
    private TestResultService testResultService;

    @PostMapping
    public ResponseEntity<TestResult> saveTestResult(@RequestBody TestResult testResult) {
        return ResponseEntity.ok(testResultService.saveTestResult(testResult));
    }

    @GetMapping("/{id}")
    public ResponseEntity<TestResult> getTestResult(@PathVariable String id) {
        TestResult result = testResultService.getTestResult(id);
        if (result != null) {
            return ResponseEntity.ok(result);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping
    public ResponseEntity<List<TestResult>> getAllTestResults() {
        return ResponseEntity.ok(testResultService.getAllTestResults());
    }
} 