@guardians
Feature: Guardians Page

  Background:
    Given I am logged in

  Scenario: Guardians page loads successfully
    When I navigate to "/guardians"
    Then the page should load without errors
    And I should see the page heading

  Scenario: Add guardian button is visible
    When I navigate to "/guardians"
    Then I should see the add guardian button

  Scenario: Can open add guardian form
    When I navigate to "/guardians"
    And I click the add guardian button
    Then I should see the guardian form

  Scenario: Guardian form has required fields
    When I navigate to "/guardians"
    And I click the add guardian button
    Then I should see guardian name field
    And I should see guardian email field
