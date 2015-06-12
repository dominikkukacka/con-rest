Feature: View Call
  As a Tester
  I want to a single call
  So that I can see the details of a call

  Background:

  Given the widget binds "id" with "c1a2l3l3i4d5"

  Scenario: Call retrieved
    Given the server finds the call
    When the "call" widget is initialized
      And the service has responded
    Then the call is displayed
