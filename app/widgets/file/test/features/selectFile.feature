Feature: Select File
  As a Tester
  I want to select a file to use for my call
  So that I can attach files for rest calls

  Background:

  Given the widget binds "file id" with "fid"

  Scenario: Select File
    Given files have been uploaded before
      And the "file selector" widget is initialized
      And the files are requested
      And the service has responded
    When file on position 2 is selected
    Then the parent file id has been updated
