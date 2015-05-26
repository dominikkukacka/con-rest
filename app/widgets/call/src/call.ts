module CallDirectives {
  export function call(): ng.IDirective {
    return {
      restrict: 'EA',
      scope: {
        id: '@',
        workflowId: '@'
      },
      controller: 'CallVM',
      templateUrl: 'call'
    };
  }
}
