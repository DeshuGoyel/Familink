@memory-capsules
Feature: Memory Capsules Page

  Background:
    Given I am logged in

  Scenario: Memory Capsules page loads successfully
    When I navigate to "/memory-capsules"
    Then the page should load without errors
    And I should see the page heading

  Scenario: Create new capsule button is visible
    When I navigate to "/memory-capsules"
    Then I should see the create capsule button

  Scenario: Can open create capsule form
    When I navigate to "/memory-capsules"
    And I click the create capsule button
    Then I should see the capsule creation form
