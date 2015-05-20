Feature: View Workflows
  As an Tester
  I want to see the workflows registered
  So that I can use an workflow

  Background:

  Given 10 workflows have been registered
    And workflow 1 contains 2 connectors
    And workflow 1 contains 4 calls
    And workflow 2 contains 1 connector
    And workflow 2 contains 2 calls
    And workflow 3 contains 1 call

  Scenario: Inspecting workflow [Workflow]
    Given the workflows will be received successfully
    When the "workflow overview" widget is initialized
    Then I should see 10 workflows

    Where:
    Workflow  | Connectors  | Calls
    1         | 2           | 4
    2         | 1           | 2
    3         | 0           | 1
