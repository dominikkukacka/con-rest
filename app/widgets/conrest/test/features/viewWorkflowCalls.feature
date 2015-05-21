Feature: View Workflow Calls
  As a Tester
  I want to view calls belonging to a workflow
  So that I can inspect a workflow more detailed

  Background:

  Given 10 workflows have been registered
    And workflow 1 contains 2 connectors
    And workflow 1 contains 4 calls
    And workflow 5 contains 1 connector
    And workflow 5 contains 2 calls
    And workflow 10 contains 1 call
    And the workflows will be received successfully
    And the "con rest" widget is initialized
    And the service has responded

  Scenario: Inspecting calls of workflow [Workflow]
    Given 10 calls have been registered
      And I search for all calls
    When I click on workflow [Workflow]
      And the service has responded
    Then I see the widget "call overview"

    Where:
    Workflow  | Connectors  | Calls
    1         | 2           | 4
    5         | 1           | 2
    10        | 0           | 1
