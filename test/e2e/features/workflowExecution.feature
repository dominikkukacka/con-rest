Feature: Workflow Execution
  As a user of conREST
  I want to execute a workflow
  So that I can see the response of that workflow

  Scenario: Execute workflow
    Given I navigate to "workflows"
    When I click "executeWorkflow" action on workflow item #1
    Then the response widget should become available on workflow item #1