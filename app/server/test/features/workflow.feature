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
    And <Workflow><Round><Google,Yahoo,Bing>

  Scenario: View Workflow [Name]
    When I view workflow "[Name]"
    Then I expect to see "[Name]" as name
      And I expect to see ids "[Calls]" as calls

    Where:
      | Name    | Calls             |
      | Search  | Google,Yahoo      |
      | Round   | Google,Yahoo,Bing |

  Scenario: View Workflow [Name] from all registered workflows
    When I view all workflows
      And I inspect workflow [Position]
    Then I expect to see "[Name]" as name
      And I expect to see ids "[Calls]" as calls

    Where:
      | Name    | Calls             | Position  |
      | Search  | Google,Yahoo      | 0         |
      | Round   | Google,Yahoo,Bing | 1         |
