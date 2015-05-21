module CallOverviewDirectives {
  export function callOverview(): ng.IDirective {
    return {
      restrict: 'EA',
      scope: {},
      controller: 'CallOverviewVM',
      templateUrl: 'callOverview'
    };
  }
}
