@heirs
Feature: Heirs Page

  Background:
    Given I am logged in

  Scenario: Heirs page loads successfully
    When I navigate to "/heirs"
    Then the page should load without errors
    And I should see the page heading

  Scenario: Add heir button is visible
    When I navigate to "/heirs"
    Then I should see the add heir button

  Scenario: Can open add heir form
    When I navigate to "/heirs"
    And I click the add heir button
    Then I should see the heir form

  Scenario: Heir form has required fields
    When I navigate to "/heirs"
    And I click the add heir button
    Then I should see heir name field
    And I should see heir email field
    And I should see heir relationship field
