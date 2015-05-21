module WorkflowOverviewVMS {
  import WorkflowDAO = DAO.WorkflowDAO;
  import Workflow = Models.Workflow;
  import Session = Models.Session;

  export class WorkflowOverviewVM {
    static $inject = ['$scope', 'workflowDAO', 'session'];
    workflows: Array<Workflow>;
    session: Session;

    constructor($scope, workflowDAO: WorkflowDAO, session: Session) {
      this.session = session;
      $scope.vm = this;

      workflowDAO.getAll()
        .then((workflows: Array<Workflow>) => {
          this.workflows = workflows;
        });
    }

    select(workflow: Workflow) {
      this.session.workflow = workflow;
    }
  }
}
