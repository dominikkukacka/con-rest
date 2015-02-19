Feature: Mapper registration
  As a user of conREST
  I want to register a mapper
  So I can use it in a workflow

  Scenario Outline: Registering mappers
    Given I navigate to "mapper"
    When entering the name with "[name]"
    And entering the source with "[source]" on map
    And entering the destination with "[destination]" on map
    And entering the place with "[place]" on map
    And clicking the button with "save" action
    Then the name should be empty

  Where:
  | name          | source        | destination   | place  |
  | Banana        | ban           | ana           | header |
  | ScanReference | ScanReference | ScanReference | data   |
  | Parameter     | ScanReference | Parameter     | url    |