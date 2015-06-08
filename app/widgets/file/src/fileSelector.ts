module FileDirectives {
  export function fileSelector(): ng.IDirective {
    return {
      restrict: 'E',
      scope: {
        fileId: '='
      },
      controller: 'FileVM',
      templateUrl: 'fileSelector'
    };
  }
}
