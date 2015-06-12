Feature: View Connector
  As a Tester
  I want to view a connector
  So that I can see the details

  Background:

  Given the widget binds "workflowId" with "w1o2r3k4f5l6o7w8"
    And the widget binds "connectorId" with "c1o2n3n4e5c6t7o8r9"

  Scenario: Connector details received
    Given the server finds the connector
    When the "connector" widget is initialized
      And the service has responded
    Then the connector is displayed
      And the source is displayed
      And the destination is displayed
      And the maps are displayed
