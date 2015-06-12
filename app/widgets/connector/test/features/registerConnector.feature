Feature: Register Connector
  As a Tester
  I want to register a new connector
  So that I can reuse data from a previous call

  Background:

  Given the widget binds "workflowId" with "w1o2r3k4f5l6o7w8"
    And the widget binds "calls" with "calls"
    And the widget binds "connector" with "connector"
    And the workflow has 3 calls bound
    And the workflow provided an empty connector model
    And the "connector form" widget is initialized

  Scenario: Register a new connector
    Given I select call 1 for the source
      And I select call 2 for the destination
      And I select mapper 1
      And the connector will be saved with id "c1o2n3n4e5c6t7o8r9"
    When I press the "save" button
      And the service has responded
    Then the parent connector will be updated with id "c1o2n3n4e5c6t7o8r9"
