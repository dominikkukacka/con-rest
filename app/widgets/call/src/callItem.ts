module CallDirectives {
  export function callItem(): ng.IDirective {
    return {
      restrict: 'EA',
      scope: {
        id: '@'
      },
      controller: 'CallVM',
      templateUrl: 'callItem'
    };
  }
}
