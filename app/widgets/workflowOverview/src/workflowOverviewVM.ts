module WorkflowOverviewVMS {
  import WorkflowDAO = DAO.WorkflowDAO;
  import Workflow = Models.Workflow;

  export class WorkflowOverviewVM {
    static $inject = ['$scope', 'workflowDAO'];
    workflows: Array<Workflow>;

    constructor($scope, workflowDAO: WorkflowDAO) {
      $scope.vm = this;

      workflowDAO.getAll()
        .then((workflows: Array<Workflow>) => {
          this.workflows = workflows;
        });
    }
  }
}
