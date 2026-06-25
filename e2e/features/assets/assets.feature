@assets
Feature: Assets Page

  Background:
    Given I am logged in

  Scenario: Assets page loads successfully
    When I navigate to "/assets"
    Then the page should load without errors
    And I should see the page heading

  Scenario: Add new asset button is visible
    When I navigate to "/assets"
    Then I should see the add asset button

  Scenario: Can open add asset form
    When I navigate to "/assets"
    And I click the add asset button
    Then I should see the asset form

  Scenario: Asset form has required fields
    When I navigate to "/assets"
    And I click the add asset button
    Then I should see asset name field
    And I should see asset type field
    And I should see asset value field
