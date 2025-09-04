@home
Feature: Home Page
  As a user visiting the gadget shop website
  I want to see the home page load correctly
  So that I can browse and shop for products

  Background:
    Given I am on the home page

  @smoke @critical
  Scenario: Home page loads successfully
    When the page finishes loading
    Then I should see the main content
    And I should see the header
    And I should not see any error messages

  @smoke @products
  Scenario: Product grid is displayed
    When the page finishes loading
    Then I should see the product grid
    And I should see at least one product card
    And each product card should have a title

  @regression @navigation
  Scenario: Page navigation elements are present
    When the page finishes loading
    Then I should see the navigation menu
    And I should see the footer

  @regression @products
  Scenario: First product information is accessible
    When the page finishes loading
    And I can see product cards
    Then I should be able to get the first product information
    And the first product should have a title
    And the first product should have a price or "N/A"
