module WorkflowOverviewVMS {
  import WorkflowDAO = DAO.WorkflowDAO;
  import Workflow = Models.Workflow;
  import Session = Models.Session;
  import ILocationService = ng.ILocationService;

  export class WorkflowOverviewVM {
    static $inject = ['$scope', 'workflowDAO', 'session', '$location'];
    workflows: Array<Workflow>;
    session: Session;
    $location: ILocationService;

    constructor($scope, workflowDAO: WorkflowDAO, session: Session, $location: ILocationService) {
      this.session = session;
      this.$location = $location;
      $scope.vm = this;

      workflowDAO.getAll()
        .then((workflows: Array<Workflow>) => {
          this.workflows = workflows;
        });
    }

    select(workflow: Workflow) {
      this.session.workflow = workflow;
      this.$location.path('/workflows/' + workflow._id);
    }
  }
}
