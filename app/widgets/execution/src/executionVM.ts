module ExecutionVMS {
  import WorkflowExecutionDAO = DAO.WorkflowExecutionDAO;
  import Execution = Models.Execution;

  export class ExecutionVM {
    static $inject = ['$scope'];

    execution: Execution;

    constructor($scope) {
      this.execution = $scope.execution;
      $scope.vm = this;
    }

    convertToJSON(json: Object): string {
      if (!json) {
        return '-';
      }
      return JSON.stringify(json, null, 4);
    }
  }
}
