module WorkflowVMS {
  import CallDAO = DAO.CallDAO;
  import WorkflowDAO = DAO.WorkflowDAO;
  import WorkflowExecutionDAO = DAO.WorkflowExecutionDAO;
  import Workflow = Models.Workflow;
  import Call = Models.Call;
  import WorkflowExecution = Models.WorkflowExecution;
  import ILocationService = ng.ILocationService;

  export class WorkflowVM {
    static $inject = ['$scope', 'workflowDAO', 'callDAO', 'workflowExecutionDAO', '$location'];
    workflow: Workflow;
    $location: ILocationService;
    workflowDAO: WorkflowDAO;
    callDAO: CallDAO;
    workflowExecutionDAO: WorkflowExecutionDAO;

    callQuery: string;
    selectedCall: Call;

    constructor($scope, workflowDAO: WorkflowDAO, callDAO: CallDAO, workflowExecutionDAO: WorkflowExecutionDAO,
      $location: ILocationService) {
      this.$location = $location;
      this.workflowDAO = workflowDAO;
      this.workflowExecutionDAO = workflowExecutionDAO;
      this.callDAO = callDAO;
      $scope.vm = this;
      if (!!$scope.id) {
        workflowDAO.getById($scope.id)
          .then((workflow: Workflow) => {
            this.workflow = workflow;
          });
      } else {
        this.workflow = new Workflow();
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

    execute() {
      this.workflowExecutionDAO.executeWorkflow(this.workflow._id)
        .then((workflowExecution: WorkflowExecution) => {
          this.$location.path('/workflows/' +
            this.workflow._id + '/executions/' + workflowExecution._id);
        });
    }

    save() {
      this.workflowDAO.save(this.workflow)
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
