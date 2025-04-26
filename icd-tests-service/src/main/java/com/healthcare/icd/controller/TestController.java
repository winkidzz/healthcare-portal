package com.healthcare.icd.controller;

import com.healthcare.icd.model.Test;
import com.healthcare.icd.repository.TestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tests")
@CrossOrigin(origins = "http://localhost:3000")
public class TestController {

    @Autowired
    private TestRepository testRepository;

    @GetMapping
    public List<Test> getAllTests() {
        return testRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Test> createTest(@RequestBody Test test) {
        test.setDate(java.time.LocalDate.now());
        test.setStatus("pending");
        Test savedTest = testRepository.save(test);
        return ResponseEntity.ok(savedTest);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Test> getTestById(@PathVariable Long id) {
        return testRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Test> updateTest(@PathVariable Long id, @RequestBody Test test) {
        return testRepository.findById(id)
                .map(existingTest -> {
                    existingTest.setName(test.getName());
                    existingTest.setStatus(test.getStatus());
                    return ResponseEntity.ok(testRepository.save(existingTest));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTest(@PathVariable Long id) {
        return testRepository.findById(id)
                .map(test -> {
                    testRepository.delete(test);
                    return ResponseEntity.ok().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
} 