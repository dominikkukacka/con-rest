Feature: Call
  As a Tester
  I want to edit calls
  So that I can preregister calls for workflows

  Background:

  Given <Call><Name><Url><Method><Type>
    And <Call><Google><http://google.com><GET><formData>

  Scenario: View registered calls
    When I view call "[Name]"
    Then I expect to see "[Url]" as url
      And I expect to see "[Method]" as method
      And I expect to see "[Type]" as type

    Where:
      | Name    | Url                     | Method  | Type      |
      | Google  | http://google.com       | GET     | formData  |
