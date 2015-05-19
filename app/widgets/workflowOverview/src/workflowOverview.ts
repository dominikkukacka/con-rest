module WorkflowOverviewDirectives {
  export function workflowOverview(): ng.IDirective {
    return {
      restrict: 'EA',
      controller: 'WorkflowOverviewVM',
      scope: {},
      templateUrl: 'workflowOverview'
    };
  }
}
