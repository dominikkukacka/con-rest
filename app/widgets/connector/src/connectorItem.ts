module ConnectorDirectives {
  export function connectorItem(): ng.IDirective {
    return {
      restrict: 'EA',
      scope: {
        workflowId: '@',
        connectorId: '@'
      },
      controller: 'ConnectorVM',
      templateUrl: 'connectorItem'
    };
  }
}
