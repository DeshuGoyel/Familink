@smoke
Feature: Smoke Test Suite - Familink Critical Flows

  Scenario: Landing page loads successfully
    Given I open the Familink app
    Then I should see the landing page title

  Scenario: User can navigate to Login page
    Given I open the Familink app
    When I click on "Sign in" link
    Then I should be on the login page

  Scenario: User can login with valid credentials
    Given I am on the login page
    When I enter valid credentials
    And I click the login button
    Then I should be redirected to the dashboard

  Scenario: Dashboard loads with key sections
    Given I am logged in
    When I navigate to the dashboard
    Then I should see the dashboard heading
    And I should see the navigation menu

  Scenario: Assets page is accessible
    Given I am logged in
    When I navigate to "/assets"
    Then the page should load without errors

  Scenario: Heirs page is accessible
    Given I am logged in
    When I navigate to "/heirs"
    Then the page should load without errors

  Scenario: Guardians page is accessible
    Given I am logged in
    When I navigate to "/guardians"
    Then the page should load without errors

  Scenario: Allocations page is accessible
    Given I am logged in
    When I navigate to "/allocations"
    Then the page should load without errors

  Scenario: Settings page is accessible
    Given I am logged in
    When I navigate to "/settings"
    Then the page should load without errors

  Scenario: Memory Capsules page is accessible
    Given I am logged in
    When I navigate to "/memory-capsules"
    Then the page should load without errors

  Scenario: Check-In Center page is accessible
    Given I am logged in
    When I navigate to "/check-in"
    Then the page should load without errors

  Scenario: AI Planner page is accessible
    Given I am logged in
    When I navigate to "/ai-planner"
    Then the page should load without errors
