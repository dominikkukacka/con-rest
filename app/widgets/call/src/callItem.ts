module CallDirectives {
  export function callItem(): ng.IDirective {
    return {
      restrict: 'E',
      scope: {
        id: '@',
        call: '='
      },
      controller: 'CallVM',
      templateUrl: 'callItem'
    };
  }
}
