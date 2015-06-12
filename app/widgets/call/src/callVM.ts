module CallVMS {
  import CallDAO = DAO.CallDAO;
  import Call = Models.Call;
  import File = Models.File;
  import aceConfig = Modules.aceConfig;
  import IAceConfig = Modules.IAceConfig;
  import ILocationService = ng.ILocationService;

  export class CallVM {
    static $inject = ['$scope', 'callDAO', '$location'];
    $location: ILocationService;
    aceConfig: IAceConfig = aceConfig;
    call: Call;
    callDAO: CallDAO;
    data: string;
    headers: string;
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

    constructor($scope, callDAO: CallDAO, $location: ILocationService) {
      this.$location = $location;
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
      } else {
        this.call = new Call();
      }
    }

    addFile() {
      this.call.files.push({
        boundaryName: '',
        file: new File()
      });
    }

    removeFile(file) {
      var index = this.call.files.indexOf(file);
      this.call.files.splice(index, 1);
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

    save(): void {
      this.call.headers = this.convertToJSON(this.headers);
      this.call.data = this.convertToJSON(this.data);
      this.callDAO.save(this.call)
        .then(() => {
          this.$location.path('/calls/' + this.call._id);
      });
    }
  }
}
