module CallVMS {
  import CallDAO = DAO.CallDAO;
  import Call = Models.Call;

  export class CallVM {
    static $inject = ['$scope', 'callDAO'];
    aceConfig: Object = {
      theme: 'con-rest',
      mode: 'json'
    };
    call: Call;
    callDAO: CallDAO;
    headers: string;
    data: string;
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
        this.headers = this.convertToString($scope.call.headers);
        this.data = this.convertToString($scope.call.data);
      } else if (!!$scope.id) {
        callDAO.getById($scope.id)
          .then((call) => {
            this.call = call;
            this.headers = this.convertToString(call.headers);
            this.data = this.convertToString(call.data);
        });
      }
    }

    convertToString(json: Object): string {
      if (!json) {
        return '-';
      }
     return JSON.stringify(json, null, 4);
    }

    convertToJSON(str: string): Object {
      try {
        return JSON.parse(str);
      } catch(e) {
        return null;
      }
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
      this.call.headers = this.convertToJSON(this.headers);
      this.call.data = this.convertToJSON(this.data);
      if(!this.call._id) {
        this.registerCall();
      } else {
        this.updateCall();
      }
    }
  }
}
