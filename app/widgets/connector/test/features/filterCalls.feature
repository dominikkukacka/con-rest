Feature: Filter Calls
  As a Tester
  I want to filter calls during selection of source and destination
  So that I can't select a wrong source or destination

  Background:

  Given the widget binds "workflowId" with "w1o2r3k4f5l6o7w8"
    And the widget binds "calls" with "calls"
    And the widget binds "connector" with "connector"
    And the workflow has 3 calls bound
    And the workflow provided an empty connector model
    And the "connector form" widget is initialized

  Scenario: Filter destinations
    Given I select call [Select] for the source
    When I search for destinations
    Then I see destinations from call [From] onwards

    Where:
      Select  | From
      1       | 2
      2       | 3

  Scenario: Default filter desintations
    When I search for destinations
    Then I see destinations from call 2 onwards

  Scenario: Filter Sources select destination [Select]
    Given I select call [Select] for the destination
    When I search for sources
    Then I see sources till call [To]

    Where:
      Select  | To
      3       | 2
      2       | 1

  Scenario: Default filter sources
    When I search for sources
    Then I see sources till call 2
