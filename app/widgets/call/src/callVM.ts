module CallVMS {
  import CallDAO = DAO.CallDAO;
  import Call = Models.Call;

  export class CallVM {
    static $inject = ['$scope', 'callDAO'];
    call: Call;

    constructor($scope, callDAO: CallDAO) {
      this.call = new Call({
        _id: $scope.id
      });
      $scope.vm = this;
      callDAO.getById($scope.vm.call._id)
        .then((call) => {
          this.call = call;
        });
    }

    convertToJSON(json: Object): string {
      if (!json) {
        return '-';
      }
      JSON.stringify(json, null, 4);
    }
  }
}
