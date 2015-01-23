Feature: Call registration
  As a user of conREST
  I want to register a new rest call
  So that I can test this rest call in a workflow

  Scenario: Registering google.com
    Given I navigate to "registerCall"
    When entering the name with "Google"
      And entering the url with "http://google.com"
      And entering the method with "GET"
      And entering the type with "formData"
      And clicking the "SUBMIT" button
    Then the form header should become "Edit API Call"
