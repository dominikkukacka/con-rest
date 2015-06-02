module ExecutionVMS {
  import WorkflowExecutionDAO = DAO.WorkflowExecutionDAO;
  import ExecutionDAO = DAO.ExecutionDAO;
  import Execution = Models.Execution;

  export class ExecutionVM {
    static $inject = ['$scope', 'executionDAO'];

    execution: Execution;

    constructor($scope, executionDAO: ExecutionDAO) {
      this.execution = $scope.execution;
      $scope.vm = this;

      if(!!$scope.executionId) {
        executionDAO.getById($scope.executionId)
          .then((execution: Execution) => {
            this.execution = execution;
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
