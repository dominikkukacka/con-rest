Feature: Add New File
  As a Tester
  I want to add a new file
  So that I can use this in my call

  Background:

  Given the widget binds "file" with "fileModel"
    And the parent has provided a file model
    And the "file form" widget is initialized

  Scenario: Save new File
    Given I provide "file name" as "name"
      And I provide a File as "file"
      And the file is valid
    When I press the "save" button
      And the service has responded
    Then the file id should be set on the parent
