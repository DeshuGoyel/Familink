@auth
Feature: Forgot Password Page

  Scenario: Page loads correctly
    Given I am on the forgot password page
    Then I should see the email input field
    And I should see the submit button

  Scenario: Submit with valid email
    Given I am on the forgot password page
    When I enter email "test@familink.com"
    And I click the submit button
    Then I should see a success or confirmation message

  Scenario: Submit with empty email
    Given I am on the forgot password page
    When I click the submit button
    Then I should see a validation error

  Scenario: Navigate back to login
    Given I am on the forgot password page
    When I click on "Back to Login" link
    Then I should be on the login page
