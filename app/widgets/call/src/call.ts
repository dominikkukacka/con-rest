module CallDirectives {
  export function call(): ng.IDirective {
    return {
      restrict: 'E',
      scope: {
        id: '@',
        workflowId: '@'
      },
      controller: 'CallVM',
      templateUrl: 'call'
    };
  }
}
