module FileDirectives {
  import Element = ng.IRootElementService;

  export function fileForm(): ng.IDirective {
    return {
      restrict: 'E',
      scope: {
        file: '='
      },
      controller: 'FileVM',
      templateUrl: 'fileForm'
    };
  }
}
