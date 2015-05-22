module WorkflowVMS {
  import WorkflowDAO = DAO.WorkflowDAO;
  import Workflow = Models.Workflow;

  export class WorkflowVM {
    static $inject = ['$scope', 'workflowDAO'];
    workflow: Workflow;

    constructor($scope, workflowDAO: WorkflowDAO) {
      this.workflow = new Workflow({
        _id: $scope.id
      });
      $scope.vm = this;

      workflowDAO.getById(this.workflow._id)
        .then((workflow: Workflow) => {
          this.workflow = workflow;
        });
    }
  }
}
