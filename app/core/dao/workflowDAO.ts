module DAO {
  import IInjectorService = ng.auto.IInjectorService;
  import Workflow = Models.Workflow;
  import Call = Models.Call;

  export class WorkflowDAO extends DAO {
    constructor($injector: IInjectorService) {
      super($injector);
    }

    getAll(): ng.IPromise<Array<Workflow>> {
      var deferred = this.$q.defer();
      this.get('/api/workflows/', null)
        .then((response: any) => {
          var workflows = [];
          for (var i = 0; i < response.data.length; i++) {
            workflows.push(new Workflow(response.data[i]));
          }
          deferred.resolve(workflows);
        }, deferred.reject);
      return deferred.promise;
    }

    getById(id: string): ng.IPromise<Workflow> {
      var deferred = this.$q.defer();
      this.get('/api/workflows/' + id, null)
        .then((response: any) => {
          deferred.resolve(new Workflow(response.data));
        }, deferred.reject);
      return deferred.promise;
    }

    create(workflow: Workflow): ng.IPromise<string> {
      var deferred = this.$q.defer();
      var callIds: Array<String> = [];
      workflow.calls.forEach((call) => {
        callIds.push(call._id);
      });
      this.post('/api/workflows/', {
        name: workflow.name,
        calls: callIds
      }).then((response: any) => {
        workflow._id = response.data;
        deferred.resolve(workflow);
      }, deferred.reject);
      return deferred.promise;
    }
  }

  var instance = null;

  export function workflowDAO($injector: IInjectorService) {
    return instance = new WorkflowDAO($injector);
  }
  workflowDAO.$inject = ['$injector'];
}
