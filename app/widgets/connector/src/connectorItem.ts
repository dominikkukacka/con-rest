module ConnectorDirectives {
  export function connectorItem(): ng.IDirective {
    return {
      restrict: 'EA',
      scope: {
        workflowId: '@',
        connectorId: '@',
        connector: '=',
        editMode: '@'
      },
      controller: 'ConnectorVM',
      templateUrl: 'connectorItem'
    };
  }
}
