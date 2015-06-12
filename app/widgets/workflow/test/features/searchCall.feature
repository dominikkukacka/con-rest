Feature: Search Call
  As a Tester
  I want to search for calls
  So that I can add calls easily

  Background:

  When the "workflow form" widget is initialized

  Scenario: Search Call
    Given I provide "call" as "call query"
      And the server can find 3 calls
      And the service has responded
    When I select call 2
    Then call 2 should be added to the workflow
