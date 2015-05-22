/**
 * Created by sschacherl on 22.05.2015.
 */
module MapperDirectives {
  export function mapperItem(): ng.IDirective {
    return {
      restrict: 'EA',
      scope: {
        id: '@'
      },
      controller: 'MapperVM',
      templateUrl: 'mapperItem'
    };
  }
}