module EventDirectives {
  export function fileModel(): ng.IDirective {
    return {
      restrict: 'A',
      scope: {
        fileModel: '='
      },
      link: (scope: any, element: any) => {
        element.bind('change', () =>
          scope.$apply(() =>
            scope.fileModel = element[0].files[0]));
      }
    };
  }
}
