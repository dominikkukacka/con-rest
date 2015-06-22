Feature: Execute Call
  As a Tester
  I want to execute calls
  So that I can view the results

  Background:

  Given <Call><Name><Url><Method><Type>
    And <Call><Google><http://google.com><GET><formData>
    And <Call><Yahoo><http://yahoo.com><GET><payLoad>
    And <Call><Bing><http://bing.com><DELETE><payLoad>

  Scenario: Execute Call [Call]
    When I execute call [Call]
    Then I expect to see number "[Status]" as statusCode

    Where:
      | Call    | Status  |
      | Google  | 200     |
      | Yahoo   | 200     |
      | Bing    | 405     |
