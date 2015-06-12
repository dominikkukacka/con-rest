module CallOverviewVMS {
  import CallDAO = DAO.CallDAO;
  import Call = Models.Call;

  export class CallOverviewVM {
    static $inject = ['$scope', 'callDAO'];

    calls: Array<Call> = [];
    constructor($scope, callDAO: CallDAO) {
      $scope.vm = this;

      callDAO.getAll()
        .then((calls: Array<Call>) => {
          this.calls = calls;
        });
    }
  }
}
