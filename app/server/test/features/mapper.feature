Feature: Mapper
  As a Tester
  I want to map responses to requests
  So that I can reuse information retrieved

  Background:

  Given <Mapper><Name>
    And <Mapper><headAuth>
    And <Mapper><fallbackAuth>
    And <Mapper><bodyAuth>
    And <Map><OfMapper><Place><Source><Destination>
    And <Map><bodyAuth><data><sourceDataAuth><destinationDataAuth>
    And <Map><fallbackAuth><url><sourceUrlAuth><destinationUrlAuth>
    And <Map><headAuth><header><sourceHeaderAuth><destinationHeaderAuth>

  Scenario: View Mapper [Name]
    When I view mapper "[Name]"
      And I inspect the map on position "[MapPosition]"
    Then I expect to see "[Name]" as name
      And I expect the map to have "[Place]" as place
      And I expect the map to have "[Source]" as source
      And I expect the map to have "[Destination]" as destination

    Where:
      | Name          | MapPosition | Place  | Source            | Destination             |
      | bodyAuth      | 0           | data   | sourceDataAuth    | destinationDataAuth     |
      | fallbackAuth  | 0           | url    | sourceUrlAuth     | destinationUrlAuth      |
      | headAuth      | 0           | header | sourceHeaderAuth  | destinationHeaderAuth   |

  Scenario: View Mapper [Name] from all registered mappers
    When I view all mappers
      And I inspect mapper [Position]
      And I inspect the map on position "[MapPosition]"
    Then I expect to see "[Name]" as name
      And I expect the map to have "[Place]" as place
      And I expect the map to have "[Source]" as source
      And I expect the map to have "[Destination]" as destination

    Where:
      | Name          | MapPosition | Place  | Source            | Destination             | Position |
      | bodyAuth      | 0           | data   | sourceDataAuth    | destinationDataAuth     | 0        |
      | fallbackAuth  | 0           | url    | sourceUrlAuth     | destinationUrlAuth      | 1        |
      | headAuth      | 0           | header | sourceHeaderAuth  | destinationHeaderAuth   | 2        |
