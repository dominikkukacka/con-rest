module DAO {
  import IInjectorService = ng.auto.IInjectorService;
  import WorkflowExecution = Models.WorkflowExecution;
  import IWorkflowExecution = Models.IWorkflowExecution;
  import Execution = Models.Execution;
  import IExecution = Models.IExecution;

  export class WorkflowExecutionDAO extends DAO {
    constructor($injector: IInjectorService) {
      super($injector);
    }

    getByWorkflow(workflowId: string) {
      var deferred = this.$q.defer();
      this.get('/api/workflows/' + workflowId +
        '/executions', null)
        .then((response: any) => {
          var workflowExecutions: Array<WorkflowExecution> = [];
          response.data.forEach((workflowExecution: IWorkflowExecution) => {
            workflowExecutions.push(new WorkflowExecution(workflowExecution));
          });
          deferred.resolve(workflowExecutions);
        }, deferred.reject);
      return deferred.promise;
    }

    getById(workflowId: string, executionId: string) {
      var deferred = this.$q.defer();
      this.get('/api/workflows/' + workflowId +
        '/executions/' + executionId, null)
        .then((response: any) => {
          deferred.resolve(new WorkflowExecution(response.data));
        }, deferred.reject);
      return deferred.promise;
    }
  }

  export function workflowExecutionDAO($injector: IInjectorService) {
    return new WorkflowExecutionDAO($injector);
  }

  workflowExecutionDAO.$inject = ['$injector'];
}
