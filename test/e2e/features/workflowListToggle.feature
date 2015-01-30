Feature: Workflow List Toggle
  As a rest api tester
  I want to toggle an workflow open
  So that I can perform actions on the workflow

  Background:

    Given I navigate to "workflows"
      And clicking the button with "addWorkflow" action
    When entering the name with "Hello" on workflow
      And clicking the button with "save" action
    Given I navigate to "workflowList"

  Scenario: Toggle list open
    Given I have at least 1 workflow item in the list
    When I click on workflow item #1
    Then I should see the details of workflow #1
