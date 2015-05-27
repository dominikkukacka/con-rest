/**
 * Created by sschacherl on 26.05.2015.
 */
module CallDirectives {
  export function callRegister(): ng.IDirective {
    return {
      restrict: 'EA',
      scope: {
        id: '@?',
      },
      controller: 'CallVM',
      templateUrl: 'callRegister'
    };
  }
}