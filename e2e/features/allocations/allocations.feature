@allocations
Feature: Allocations Page

  Background:
    Given I am logged in

  Scenario: Allocations page loads successfully
    When I navigate to "/allocations"
    Then the page should load without errors
    And I should see the page heading

  Scenario: Allocation chart or summary is visible
    When I navigate to "/allocations"
    Then I should see the allocations content area
