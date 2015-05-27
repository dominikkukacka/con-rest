module WorkflowVMS {
  import WorkflowDAO = DAO.WorkflowDAO;
  import Workflow = Models.Workflow;
  import ILocationService = ng.ILocationService;

  export class WorkflowVM {
    static $inject = ['$scope', 'workflowDAO', '$location'];
    workflow: Workflow = new Workflow();
    $location: ILocationService;
    workflowDAO: WorkflowDAO;

    constructor($scope, workflowDAO: WorkflowDAO, $location: ILocationService) {
      this.$location = $location;
      this.workflowDAO = workflowDAO;
      $scope.vm = this;
      if (!!$scope.id) {
        workflowDAO.getById($scope.id)
          .then((workflow: Workflow) => {
            this.workflow = workflow;
          });
      }
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
