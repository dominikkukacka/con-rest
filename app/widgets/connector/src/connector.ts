module ConnectorDirectives {
  export function connector(): ng.IDirective {
    return {
      restrict: 'E',
      scope: {
        workflowId: '@',
        connectorId: '@'
      },
      controller: 'ConnectorVM',
      templateUrl: 'connector'
    };
  }
}
