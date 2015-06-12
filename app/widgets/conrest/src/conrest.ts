module ConRESTDirectives {
  export function conRest(): ng.IDirective {
    return {
      restrict: 'EA',
      scope: {},
      controller: 'ConRESTVM',
      templateUrl: 'conrest'
    };
  }
}
