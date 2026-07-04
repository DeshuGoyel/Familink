@settings
Feature: Settings Page

  Background:
    Given I am logged in

  Scenario: Settings page loads successfully
    When I navigate to "/settings"
    Then the page should load without errors
    And I should see the page heading

  Scenario: Profile settings section is visible
    When I navigate to "/settings"
    Then I should see the profile section

  Scenario: Security settings section is visible
    When I navigate to "/settings"
    Then I should see the security section

  Scenario: Can update display name
    When I navigate to "/settings"
    And I update the display name to "Test User"
    And I save the settings
    Then I should see a success message

  Scenario: Notification preferences are visible
    When I navigate to "/settings"
    Then I should see notification settings
