module WorkflowExecutionVMS {
  import WorkflowExecution = Models.WorkflowExecution;
  import WorkflowExecutionDAO = DAO.WorkflowExecutionDAO;
  import ILocationService = ng.ILocationService;

  export class WorkflowExecutionVM {
    static $inject = ['$scope', 'workflowExecutionDAO', '$location'];

    workflowExecution: WorkflowExecution;
    workflowExecutionDAO: WorkflowExecutionDAO;
    $location: ILocationService;

    constructor($scope, workflowExecutionDAO: WorkflowExecutionDAO, $location: ILocationService) {
      this.$location = $location;
      $scope.vm = this;
      if (!!$scope.workflowExecution) {
        this.workflowExecution = $scope.workflowExecution;
      } else {
        workflowExecutionDAO.getById($scope.workflowId, $scope.workflowExecutionId)
          .then((workflowExecution: WorkflowExecution) => {
            this.workflowExecution = workflowExecution;
          });
      }
    }

    goToCall(callId: string) {
      this.$location.path('/workflows/' +
        this.workflowExecution.workflow._id + '/calls/' + callId);
    }

    goToExecution(executionId: string) {
      this.$location.path('/workflows/' +
        this.workflowExecution.workflow._id + '/executions/' +
        this.workflowExecution._id + '/call/' + executionId);
    }
  }
}
