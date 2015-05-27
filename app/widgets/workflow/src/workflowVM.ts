module WorkflowVMS {
  import CallDAO = DAO.CallDAO;
  import WorkflowDAO = DAO.WorkflowDAO;
  import Workflow = Models.Workflow;
  import Call = Models.Call;
  import ILocationService = ng.ILocationService;

  export class WorkflowVM {
    static $inject = ['$scope', 'workflowDAO', 'callDAO', '$location'];
    workflow: Workflow = new Workflow();
    $location: ILocationService;
    workflowDAO: WorkflowDAO;
    callDAO: CallDAO;

    callQuery: string;
    selectedCall: Call;

    constructor($scope, workflowDAO: WorkflowDAO, callDAO: CallDAO, $location: ILocationService) {
      this.$location = $location;
      this.workflowDAO = workflowDAO;
      this.callDAO = callDAO;
      $scope.vm = this;
      if (!!$scope.id) {
        workflowDAO.getById($scope.id)
          .then((workflow: Workflow) => {
          this.workflow = workflow;
        });
      }
    }

    addCall() {
      this.workflow.calls.push(this.selectedCall);
      this.selectedCall = null;
      this.callQuery = null;
    }

    removeCall(call: Call) {
      var index = this.workflow.calls.indexOf(call);
      this.workflow.calls.splice(index, 1);
    }

    searchCall() {
      return this.callDAO.search(this.callQuery);
    }

    save() {
      this.workflowDAO.create(this.workflow)
        .then(() => {
        this.$location.path('/workflows/' + this.workflow._id);
      });
    }

    goToCall(callId: string) {
      this.$location.path('/workflows/' +
        this.workflow._id + '/calls/' + callId);
    }

    goToConnector(connectorId: string) {
      this.$location.path('/workflows/' +
        this.workflow._id + '/connectors/' + connectorId);
    }
  }
}
