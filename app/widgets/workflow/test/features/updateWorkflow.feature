Feature: Update Workflow
  As a Tester
  I want to update a new Workflow
  So that I can execute the workflow automated

  Background:

  Given the widget binds "id" with "w1o2r3k4f5l6o7w8"
    And the server finds the workflow
  When the "workflow form" widget is initialized
    And the service has responded

  Scenario: Update new Workflow
    Given I provide "Super Cool Workflow" as "name"
      And I add call "o1n2e3"
      And I add call "t1w2o3"
      And the update will be executed
    When I press the "save" button
      And the service has responded
    Then I should navigate to the workflow view with id "w1o2r3k4f5l6o7w8"
