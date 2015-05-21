module ConRESTVMS {
  import Session = Models.Session;

  export class ConRESTVM {
    static $inject = ['$scope', 'session'];
    session: Session;

    constructor($scope, session: Session) {
      this.session = session;
      $scope.vm = this;
    }
  }
}
