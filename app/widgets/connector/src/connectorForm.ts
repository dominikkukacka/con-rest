module ConnectorDirectives {
  export function connectorForm(): ng.IDirective {
    return {
      restrict: 'E',
      scope: {
        calls: '=',
        connector: '=',
        workflowId: '@'
      },
      controller: 'ConnectorVM',
      templateUrl: 'connectorForm'
    };
  }
}
