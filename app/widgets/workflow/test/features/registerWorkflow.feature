Feature: Register Workflow
  As a Tester
  I want to register a new Workflow
  So that I can execute the workflow automated

  Background:

  When the "workflow form" widget is initialized

  Scenario: Register new Workflow
    Given I provide "Super Cool Workflow" as "name"
      And I add call "o1n2e3"
      And I add call "t1w2o3"
      And the workflow will be registered with "n1e2w3i4d5"
    When I press the "save" button
      And the service has responded
    Then I should navigate to the workflow view with id "n1e2w3i4d5"
