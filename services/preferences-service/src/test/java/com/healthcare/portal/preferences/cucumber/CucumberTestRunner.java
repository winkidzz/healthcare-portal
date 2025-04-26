package com.healthcare.portal.preferences.cucumber;

import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;
import org.junit.runner.RunWith;

@RunWith(Cucumber.class)
@CucumberOptions(
    features = "src/test/resources/features",
    glue = {
        "com.healthcare.portal.preferences.cucumber.steps",
        "com.healthcare.portal.preferences.cucumber"
    },
    plugin = {
        "pretty",
        "html:target/cucumber-reports/cucumber.html",
        "json:target/cucumber-reports/cucumber.json"
    }
)
public class CucumberTestRunner {
} 