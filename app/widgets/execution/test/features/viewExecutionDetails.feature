Feature: View Execution Details
  As a Tester
  I want to inspect an execution
  So that I can validate if everything went correct

  Background:

  Given the widget binds "execution" with "execution"

  Scenario: Inspect Execution
    Given parent has execution
    When the "execution" widget is initialized
    Then the execution is displayed
