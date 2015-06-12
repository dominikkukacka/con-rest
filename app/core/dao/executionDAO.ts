module DAO {
  import IInjectorService = ng.auto.IInjectorService;
  import Execution = Models.Execution;

  export class ExecutionDAO extends DAO {
    constructor($injector: IInjectorService) {
      super($injector);
    }

    getById(executionId: string) {
      var deferred = this.$q.defer();
      this.get('/api/executions/' + executionId, null)
        .then((response: any) => {
          deferred.resolve(new Execution(response.data));
        }, deferred.reject);
      return deferred.promise;
    }
  }

  export function executionDAO($injector: IInjectorService) {
    return new ExecutionDAO($injector);
  }
  executionDAO.$inject = ['$injector'];
}
