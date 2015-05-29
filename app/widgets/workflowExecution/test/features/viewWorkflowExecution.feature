Feature: View Workflow Execution
  As a Tester
  I want to view the result of an workflow execution
  So that I can inspect what happened during the execution

  Scenario: Inspect results after execution
    Given the parent provides workflow execution
      And the widget binds "workflow execution" with "workflowExecution"
    When the "workflow execution" widget is initialized
    Then the workflow execution is displayed

  Scenario: Workflow execution retrieved
    Given the widget binds "workflow execution id" with "w1e2x3i4d5"
      And the widget binds "workflow id" with "w1o2r3k4f5l6o7w8"
      And the server finds the workflow execution
    When the "workflow execution" widget is initialized
      And the service has responded
    Then the workflow execution is displayed
