Feature: View Workflow Details
  As a Tester
  I want to view workflow details
  So that I can navigate to associated components

  Background:

  Given the widget binds "id" with "w1o2r3k4f5l6o7w8"

  Scenario: Workflow retrieved
    Given the server finds the workflow
    When the "workflow" widget is initialized
      And the service has responded
    Then the workflow is displayed
