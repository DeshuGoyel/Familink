@ai-planner
Feature: AI Planner Page

  Background:
    Given I am logged in

  Scenario: AI Planner page loads successfully
    When I navigate to "/ai-planner"
    Then the page should load without errors
    And I should see the page heading

  Scenario: AI chat input is visible
    When I navigate to "/ai-planner"
    Then I should see the AI input area

  Scenario: Can type a query to AI Planner
    When I navigate to "/ai-planner"
    And I type "What should I include in my will?" in the AI input
    Then I should see the send button enabled
