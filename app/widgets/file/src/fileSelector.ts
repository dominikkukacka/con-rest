module FileDirectives {
  export function fileSelector(): ng.IDirective {
    return {
      restrict: 'E',
      scope: {
        fileId: '='
      },
      controller: 'FileVM',
      templateUrl: 'fileSelector',
      link: (scope: any) => {
        scope.$watch('vm.selectedFile', (file) => {
          if (!!file) {
            scope.fileId = file._id;
          }
        });
      }
    };
  }
}
