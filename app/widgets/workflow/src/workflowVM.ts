module WorkflowVMS {
  import WorkflowDAO = DAO.WorkflowDAO;
  import Workflow = Models.Workflow;
  import ILocationService = ng.ILocationService;

  export class WorkflowVM {
    static $inject = ['$scope', 'workflowDAO', '$location'];
    workflow: Workflow;
    $location: ILocationService;

    constructor($scope, workflowDAO: WorkflowDAO, $location: ILocationService) {
      this.workflow = new Workflow({
        _id: $scope.id
      });
      this.$location = $location;
      $scope.vm = this;

      workflowDAO.getById(this.workflow._id)
        .then((workflow: Workflow) => {
          this.workflow = workflow;
        });
    }

    goToConnector(connectorId: string) {
      this.$location.path('/workflows/' + 
        this.workflow._id + '/connectors/' + connectorId);
    }
  }
}
