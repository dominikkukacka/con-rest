module MapperDirectives {
  export function mapperForm(): ng.IDirective {
    return {
      restrict: 'E',
      scope: {
        mapper: '='
      },
      controller: 'MapperVM',
      templateUrl: 'mapperForm'
    };
  }
}
