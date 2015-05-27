module CallVMS {
  import CallDAO = DAO.CallDAO;
  import Call = Models.Call;

  export class CallVM {
    static $inject = ['$scope', 'callDAO'];
    call: Call;
    callDAO: CallDAO;
    methods: Array<string> = [
      'GET',
      'POST',
      'PUT',
      'DELETE',
      'PATCH',
      'OPTIONS'
    ];
    types: Array<string> = [
      'payload',
      'formData'
    ];

    constructor($scope, callDAO: CallDAO) {
      this.callDAO = callDAO;
      $scope.vm = this;
      if (!!$scope.call) {
        this.call = $scope.call;
      } else if (!!$scope.id) {
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

    registerCall(): void {
      this.callDAO.create(this.call)
        .then((id) => {
          this.call._id = id;
        });
    }

    updateCall(): void {
      this.callDAO.update(this.call._id, this.call)
        .then((response) => {

        });
    }

    save(): void {
      if(!this.call._id) {
        this.registerCall();
      } else {
        this.updateCall();
      }
    }
  }
}
