Feature: Register Mapper
  As a Tester
  I want to register a new mapper
  So that I can use this in my connector

  Background:

  Given the widget binds "mapper" with "mapper"
    And the parent provides a mapper model
    And the "mapper form" widget is initialized

  Scenario: Register a new mapper
    Given I provide "name" as "mapper name"
      And I provide a map on position 1 with "data" as "place"
      And I provide a map on position 1 with "foo.bar" as "source"
      And I provide a map on position 1 with "foo.baz" as "destination"
      And the mapper will be saved successfully
    When I press the "save" button
      And the service has responded
    Then I expect an id on the mapper model
