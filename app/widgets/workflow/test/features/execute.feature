Feature: Execute Workflow
  As a Tester
  I want to execute an workflow
  So that I can see the result of the connected rest calls

  Background:

  Given the widget binds "id" with "w1o2r3k4f5l6o7w8"
    And the server finds the workflow
  When the "workflow" widget is initialized
    And the service has responded

  Scenario: Execute Workflow
    Given the execution will be successful
    When I press the "execute" button
      And the service has responded
    Then I should navigate to the execution view with id "e1x2e3c4u5t6i7o8n9"
