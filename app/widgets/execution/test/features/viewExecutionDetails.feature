Feature: View Execution Details
  As a Tester
  I want to inspect an execution
  So that I can validate if everything went correct

  Scenario: Inspect Execution
    Given parent has execution
      And the widget binds "execution" with "execution"
    When the "execution" widget is initialized
    Then the execution is displayed

  Scenario: Load Execution by ID
    Given the widget binds "workflow id" with "w1o2r3k4f5l6o7w8"
      And the widget binds "execution id" with "e1x2e3c4u5t6i7o8n9"
      And the execution can be found
    When the "execution" widget is initialized
      And the service has responded
    Then the execution is displayed
