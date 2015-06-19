Feature: Connector
  As a Tester
  I want to connect calls in a workflow
  So that I can reuse data from previous calls

  Background:

  Given <Call><Name><Url><Method><Type>
    And <Call><Google><http://google.com><GET><formData>
    And <Call><Yahoo><http://yahoo.com><GET><payLoad>
    And <Workflow><Name><Calls>
    And <Workflow><Search><Google,Yahoo>
    And <Mapper><Name>
    And <Mapper><headAuth>
    And <Map><OfMapper><Place><Source><Destination>
    And <Map><headAuth><header><sourceHeaderAuth><destinationHeaderAuth>
    And <Connector><Workflow><ID><Source><Destination><Mapper>
    And <Connector><Search><GtoY><Google><Yahoo><headAuth>

  Scenario: View connector [Connector] of [Workflow]
    When I view connector "[Connector]" of workflow "[Workflow]"
    Then I expect to see source with id "[Source]"
      And I expect to see destination with id "[Destination]"
      And I expect to see mapper with id "[Mapper]"

    Where:
      | Workflow | Connector  | Source | Destination   | Mapper        |
      | Search   | GtoY       | Google | Yahoo         | headAuth      |
