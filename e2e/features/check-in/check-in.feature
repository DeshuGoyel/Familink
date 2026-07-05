@checkin
Feature: Check-In Center Page

  Background:
    Given I am logged in

  Scenario: Check-In Center page loads successfully
    When I navigate to "/check-in"
    Then the page should load without errors
    And I should see the page heading

  Scenario: Check-in button or action is available
    When I navigate to "/check-in"
    Then I should see the check-in action button

  Scenario: Check-in status is displayed
    When I navigate to "/check-in"
    Then I should see check-in status information
