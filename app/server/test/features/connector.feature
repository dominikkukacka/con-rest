Feature: Connector
  As a Tester
  I want to connect calls in a workflow
  So that I can reuse data from previous calls

  Background:

  Given <Call><Name><Url><Method><Type>
    And <Call><Google><http://google.com><GET><formData>
    And <Call><Yahoo><http://yahoo.com><GET><payLoad>
    And <Call><Bing><http://bing.com><DELETE><payLoad>
  Given <Workflow><Connector><Source><Destination><Mapper>
    And <Workflow><GtoY><Google><Yahoo><Mapper>

  @pending
  Scenario: View connector [Connector] of [Workflow]
    When I view connector "[Connector]"
    Then I expect to see "[Source]" as source
      And I expect to see "[Destination]" as destination
      And I expect to see "[Mapper]" as mapper

    Where:
      | Workflow | Connector  | Source | Destination   | Mapper        |
      | Search   | GtoY       | Google | Yahoo         | EngineWrapper |
