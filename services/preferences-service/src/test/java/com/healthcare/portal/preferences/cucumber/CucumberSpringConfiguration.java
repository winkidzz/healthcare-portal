package com.healthcare.portal.preferences.cucumber;

import io.cucumber.spring.CucumberContextConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import com.healthcare.portal.preferences.PreferencesServiceApplication;

@io.cucumber.spring.CucumberContextConfiguration
@SpringBootTest(
    classes = PreferencesServiceApplication.class,
    webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT
)
public class CucumberSpringConfiguration {
    // Empty class body - just used for configuration
} 