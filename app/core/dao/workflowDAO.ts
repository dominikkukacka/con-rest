module DAO {
  import IInjectorService = ng.auto.IInjectorService;

  export class WorkflowDAO extends DAO {
    constructor($injector: IInjectorService) {
      super($injector);
    }

    getAll() {
      return this.get('/api/workflows/', null);
    }
  }
}
