Feature: Add Connector
  As a Tester
  I want to add a connector to a workflow
  So that I can reuse data from an previous call

  Background:

  Given the widget binds "id" with "w1o2r3k4f5l6o7w8"

  Scenario: Add connector
    Given the server finds the workflow
      And the "workflow" widget is initialized
      And the service has responded
    When I press the "add connector" button
    Then the connector form is displayed
