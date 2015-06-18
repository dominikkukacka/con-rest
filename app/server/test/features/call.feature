Feature: Call
  As a Tester
  I want to edit calls
  So that I can preregister calls for workflows

  Background:

  Given <Call><Name><Url><Method><Type>
    And <Call><Google><http://google.com><GET><formData>
    And <Call><Yahoo><http://yahoo.com><GET><payLoad>
    And <Call><Bing><http://bing.com><DELETE><payLoad>

  Scenario: View call [Name]
    When I view call "[Name]"
    Then I expect to see "[Url]" as url
      And I expect to see "[Method]" as method
      And I expect to see "[Type]" as type

    Where:
      | Name    | Url                     | Method  | Type      |
      | Google  | http://google.com       | GET     | formData  |
      | Yahoo   | http://yahoo.com        | GET     | payLoad   |
      | Bing    | http://bing.com         | DELETE  | payLoad   |

  Scenario: View call [Name] from all registered calls
    When I view all calls
      And I inspect call [Position]
    Then I expect to see "[Url]" as url
      And I expect to see "[Method]" as method
      And I expect to see "[Type]" as type

    Where:
      | Name    | Url                     | Method  | Type      | Position  |
      | Google  | http://google.com       | GET     | formData  | 0         |
      | Yahoo   | http://yahoo.com        | GET     | payLoad   | 1         |
      | Bing    | http://bing.com         | DELETE  | payLoad   | 2         |
