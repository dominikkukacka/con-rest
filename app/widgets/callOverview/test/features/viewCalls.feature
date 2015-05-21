Feature: View Calls
  As a Tester
  I want to view calls
  So that I can view the details of an call

  Background:

  Given 10 calls have been registered

  Scenario: Inspecting call [Call]
    Given I search for all calls
    When the "call overview" widget is initialized
      And the service has responded
    Then call [Call] has "[Name]" as name

    Where:
    Call  | Name
    1     | Call1
    2     | Call2
    5     | Call5
    10    | Call10
