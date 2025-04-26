Feature: Preferences Service Health Check
  As a system administrator
  I want to ensure the preferences service is healthy
  So that users can manage their preferences reliably

  Scenario: Check if preferences service is up and running
    Given the preferences service is deployed
    When I make a health check request to the service
    Then the service should respond with a 200 status code
    And the response should indicate the service is "UP"

  Scenario: Check if preferences service endpoints are accessible
    Given the preferences service is deployed
    When I make a request to "/preferences" endpoint
    Then the service should respond with a 401 status code
    And the response should indicate authentication is required

  Scenario: Check if MongoDB connection is healthy
    Given the preferences service is deployed
    When I check the MongoDB connection health
    Then the MongoDB connection status should be "UP"
    And the MongoDB response time should be less than 1000 milliseconds 