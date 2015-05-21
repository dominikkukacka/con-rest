module CallDirectives {
  export function call(): ng.IDirective {
    return {
      restrict: 'EA',
      scope: {
        id: '@'
      },
      controller: 'CallVM',
      templateUrl: 'call'
    };
  }
}
