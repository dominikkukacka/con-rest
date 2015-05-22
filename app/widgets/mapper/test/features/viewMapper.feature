Feature: View Mapper
  As a Tester
  I want to view a mapper
  So that I can see the details

  Background:

  Given the widget binds "id" with "m1a2p3p4e5r6"

  Scenario: Mapper details received
    Given the server finds the mapper
    When the "mapper" widget is initialized
      And the service has responded
    Then the mapper is displayed