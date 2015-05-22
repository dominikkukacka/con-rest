module DAO {
  import IInjectorService = ng.auto.IInjectorService;
  import Connector = Models.Connector;

  export class ConnectorDAO extends DAO {
    constructor($injector: IInjectorService) {
      super($injector);
    }

    getById(workflowId: string, connectorId: string): ng.IPromise<Connector> {
      var deferred = this.$q.defer();
      this.get('/api/workflows/' + workflowId +
        '/connectors/' + connectorId, null)
        .then((response: any) => {
          deferred.resolve(new Connector(response.data));
        }, deferred.reject);
      return deferred.promise;
    }
  }

  var instance = null;

  export function connectorDAO($injector: IInjectorService) {
    return instance = new ConnectorDAO($injector);
  }
  connectorDAO.$inject = ['$injector'];
}
