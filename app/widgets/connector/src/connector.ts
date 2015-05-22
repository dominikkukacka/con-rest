module ConnectorDirectives {
  export function connector(): ng.IDirective {
    return {
      restrict: 'EA',
      scope: {
        workflowId: '@',
        connectorId: '@'
      },
      controller: 'ConnectorVM',
      templateUrl: 'connector'
    };
  }
}
