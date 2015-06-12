/**
 * Created by sschacherl on 26.05.2015.
 */
module CallDirectives {
  export function callForm(): ng.IDirective {
    return {
      restrict: 'EA',
      scope: {
        id: '@?',
        workflowId: '@?'
      },
      controller: 'CallVM',
      templateUrl: 'callForm'
    };
  }
}
