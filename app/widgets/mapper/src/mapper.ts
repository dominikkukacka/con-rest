/**
 * Created by sschacherl on 22.05.2015.
 */
module MapperDirectives {
  export function mapper(): ng.IDirective {
    return {
      restrict: 'EA',
      scope: {
        id: '@',
        connectorId: '@',
        workflowId: '@'
      },
      controller: 'MapperVM',
      templateUrl: 'mapper'
    };
  }
}
