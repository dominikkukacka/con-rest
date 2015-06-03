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

    create(workflowId: string, connector: Connector): ng.IPromise<Connector> {
      var deferred = this.$q.defer();
      this.post('/api/workflows/' + workflowId +
        '/connectors/', connector.toJSON())
        .then((response: any) => {
          connector._id = response.data;
          deferred.resolve(connector);
        }, deferred.reject);
      return deferred.promise;
    }

    update(workflowId: string, connector: Connector): ng.IPromise<Connector> {
      var deferred = this.$q.defer();
      this.put('/api/workflows/' + workflowId +
        '/connectors/' + connector._id, connector.toJSON())
        .then((response: any) => {
          deferred.resolve(connector);
        }, deferred.reject);
      return deferred.promise;
    }

    save(workflowId: string, connector: Connector): ng.IPromise<Connector> {
      if (!!connector._id) {
        return this.update(workflowId, connector);
      } else {
        return this.create(workflowId, connector);
      }
    }
  }

  var instance = null;

  export function connectorDAO($injector: IInjectorService) {
    return instance = new ConnectorDAO($injector);
  }
  connectorDAO.$inject = ['$injector'];
}
