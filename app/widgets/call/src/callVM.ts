module CallVMS {
  import CallDAO = DAO.CallDAO;
  import Call = Models.Call;

  export class CallVM {
    static $inject = ['$scope', 'callDAO'];
    call: Call;

    constructor($scope, callDAO: CallDAO) {
      $scope.vm = this;
      if (!!$scope.call) {
        this.call = $scope.call;
      } else {
        callDAO.getById($scope.id)
          .then((call) => {
          this.call = call;
        });
      }
    }

    convertToJSON(json: Object): string {
      if (!json) {
        return '-';
      }
      return JSON.stringify(json, null, 4);
    }
  }
}
