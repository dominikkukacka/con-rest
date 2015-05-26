module ConRESTVMS {
  import Session = Models.Session;

  export class ConRESTVM {
    static $inject = ['$scope', 'session', '$routeParams'];
    session: Session;
    $routeParams: any;

    constructor($scope, session: Session, $routeParams) {
      this.session = session;
      this.$routeParams = $routeParams;
      $scope.vm = this;
    }
  }
}
