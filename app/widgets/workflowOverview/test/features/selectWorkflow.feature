Feature: Select Workflow
  As a Tester
  I want to select a workflow
  So that I can perform actions on the selected workflow

  Background:

  Given 10 workflows have been registered
    And workflow 1 contains 2 connectors
    And workflow 1 contains 4 calls
    And workflow 5 contains 1 connector
    And workflow 5 contains 2 calls
    And workflow 10 contains 1 call
    And the workflows will be received successfully
    And the "workflow overview" widget is initialized
    And the service has responded

  Scenario: Inspecting workflow [Workflow]
    When I select workflow [Workflow]
    Then the stored session workflow has [Connectors] connectors
      And the stored session workflow has [Calls] calls

    Where:
    Workflow  | Connectors  | Calls
    1         | 2           | 4
    5         | 1           | 2
    10        | 0           | 1
