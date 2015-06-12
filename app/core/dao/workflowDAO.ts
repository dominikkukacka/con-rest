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

    create(workflow: Workflow): ng.IPromise<Workflow> {
      var deferred = this.$q.defer();
      this.post('/api/workflows/', workflow.toJSON())
        .then((response: any) => {
          workflow._id = response.data;
          deferred.resolve(workflow);
        }, deferred.reject);
      return deferred.promise;
    }

    update(workflow: Workflow): ng.IPromise<Workflow> {
      var deferred = this.$q.defer();
      this.put('/api/workflows/' + workflow._id, workflow.toJSON())
        .then((response: any) => {
          deferred.resolve(workflow);
        }, deferred.reject);
      return deferred.promise;
    }

    save(workflow: Workflow): ng.IPromise<Workflow> {
      if (!!workflow._id) {
        return this.update(workflow);
      } else {
        return this.create(workflow);
      }
    }
  }

  var instance = null;

  export function workflowDAO($injector: IInjectorService) {
    return instance = new WorkflowDAO($injector);
  }
  workflowDAO.$inject = ['$injector'];
}
