package com.healthcare.icd.repository;

import com.healthcare.icd.model.Test;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TestRepository extends JpaRepository<Test, Long> {
} 