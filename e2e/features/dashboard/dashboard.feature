@dashboard
Feature: Dashboard Page

  Background:
    Given I am logged in

  Scenario: Dashboard loads successfully
    When I navigate to the dashboard
    Then I should see the dashboard heading
    And the page should load without errors

  Scenario: Navigation menu is visible
    When I navigate to the dashboard
    Then I should see the navigation menu

  Scenario: Can navigate to Assets from dashboard
    When I navigate to the dashboard
    And I click on "Assets" in the navigation
    Then I should be on the assets page

  Scenario: Can navigate to Heirs from dashboard
    When I navigate to the dashboard
    And I click on "Heirs" in the navigation
    Then I should be on the heirs page

  Scenario: Can navigate to Guardians from dashboard
    When I navigate to the dashboard
    And I click on "Guardians" in the navigation
    Then I should be on the guardians page

  Scenario: Can navigate to Settings from dashboard
    When I navigate to the dashboard
    And I click on "Settings" in the navigation
    Then I should be on the settings page

  Scenario: User can logout from dashboard
    When I navigate to the dashboard
    And I click on logout
    Then I should be redirected to the login page
