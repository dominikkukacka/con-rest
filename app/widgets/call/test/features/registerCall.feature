Feature: Register Call
  As a Tester
  I want to register a new Call
  So that I can add this call to a workflow

  Background:

  When the "call form" widget is initialized

  Scenario: Register new Call
    Given I provide "Awesome Call" as "name"
      And I provide "GET" as "method"
      And I provide "http://www.google.com" as "url"
      And I provide "payload" as "type"
      And the call will be registered with "n1e2w3i4d5"
    When I press the "save" button
      And the service has responded
    Then I should navigate to the call form with id "n1e2w3i4d5"