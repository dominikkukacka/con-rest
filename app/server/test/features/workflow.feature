Feature: Workflow
  As a Tester
  I want to create a workflow
  So that I can execute an workflow automatically

  Background:

  Given <Call><Name><Url><Method><Type>
    And <Call><Google><http://google.com><GET><formData>
    And <Call><Yahoo><http://yahoo.com><GET><payLoad>
    And <Call><Bing><http://bing.com><DELETE><payLoad>
    And <Workflow><Name><Calls>
    And <Workflow><Search><Google,Yahoo>

  Scenario: View Workflow [Name]
    When I view workflow "[Name]"
    Then I expect to see "[Name]" as name
      And I expect to see ids "[Calls]" as calls

    Where:
      | Name    | Calls         |
      | Search  | Google,Yahoo  |
