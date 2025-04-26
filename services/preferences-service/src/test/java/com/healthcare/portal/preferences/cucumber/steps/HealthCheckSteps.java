package com.healthcare.portal.preferences.cucumber.steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.boot.actuate.health.Status;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.web.server.LocalServerPort;
import static org.junit.jupiter.api.Assertions.*;
import java.util.Map;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ContextConfiguration
public class HealthCheckSteps {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    private ResponseEntity<Map> healthResponse;
    private ResponseEntity<String> endpointResponse;
    private String baseUrl;

    @Given("the preferences service is deployed")
    public void thePreferencesServiceIsDeployed() {
        baseUrl = String.format("http://localhost:%d/api", port);
        assertNotNull(restTemplate);
    }

    @When("I make a health check request to the service")
    public void iMakeAHealthCheckRequestToTheService() {
        healthResponse = restTemplate.getForEntity(baseUrl + "/actuator/health", Map.class);
    }

    @Then("the service should respond with a {int} status code")
    public void theServiceShouldRespondWithStatusCode(int statusCode) {
        assertEquals(statusCode, healthResponse != null ? 
            healthResponse.getStatusCodeValue() : 
            endpointResponse.getStatusCodeValue());
    }

    @And("the response should indicate the service is {string}")
    public void theResponseShouldIndicateTheServiceIs(String status) {
        assertNotNull(healthResponse);
        Map<String, Object> body = healthResponse.getBody();
        assertNotNull(body);
        assertEquals(status, body.get("status"));
    }

    @When("I make a request to {string} endpoint")
    public void iMakeARequestToEndpoint(String endpoint) {
        endpointResponse = restTemplate.getForEntity(baseUrl + endpoint, String.class);
    }

    @And("the response should indicate authentication is required")
    public void theResponseShouldIndicateAuthenticationIsRequired() {
        assertEquals(HttpStatus.UNAUTHORIZED, endpointResponse.getStatusCode());
    }

    @When("I check the MongoDB connection health")
    public void iCheckTheMongoDBConnectionHealth() {
        healthResponse = restTemplate.getForEntity(
            baseUrl + "/actuator/health/mongo", Map.class);
    }

    @Then("the MongoDB connection status should be {string}")
    public void theMongoDBConnectionStatusShouldBe(String status) {
        assertNotNull(healthResponse);
        Map<String, Object> body = healthResponse.getBody();
        assertNotNull(body);
        assertEquals(status, body.get("status"));
    }

    @And("the MongoDB response time should be less than {int} milliseconds")
    public void theMongoDBResponseTimeShouldBeLessThanMilliseconds(int maxTime) {
        assertNotNull(healthResponse);
        Map<String, Object> body = healthResponse.getBody();
        assertNotNull(body);
        Map<String, Object> details = (Map<String, Object>) body.get("details");
        assertNotNull(details);
        assertTrue((Integer) details.get("responseTime") < maxTime);
    }
} 