@auth
Feature: Login Page

  Background:
    Given I am on the login page

  Scenario: Page loads correctly
    Then I should see the email input field
    And I should see the password input field
    And I should see the login button

  Scenario: Login with valid credentials
    When I enter valid credentials
    And I click the login button
    Then I should be redirected to the dashboard

  Scenario: Login with invalid email
    When I enter email "invalid@test.com" and password "wrongpass123"
    And I click the login button
    Then I should see an error message

  Scenario: Login with empty fields
    When I click the login button
    Then I should see a validation error

  Scenario: Forgot password link is visible
    Then I should see the "Forgot Password" link

  Scenario: Navigate to forgot password page
    When I click on "Forgot Password" link
    Then I should be on the forgot password page
