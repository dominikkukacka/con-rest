module ConnectorVMS {
  import ConnectorDAO = DAO.ConnectorDAO;
  import Connector = Models.Connector;
  import MapperDAO = DAO.MapperDAO;
  import Call = Models.Call;
  import Mapper = Models.Mapper;
  import ILocationService = ng.ILocationService;

  export class ConnectorVM {
    static $inject = ['$scope', 'connectorDAO', 'mapperDAO', '$location'];
    connector: Connector = null;
    $location: ILocationService;
    workflowId: string;
    calls: Array<Call>;
    mappers: Array<Mapper>;
    connectorDAO: ConnectorDAO;
    mapperDAO: MapperDAO;

    constructor($scope, connectorDAO: ConnectorDAO, mapperDAO: MapperDAO, $location: ILocationService) {
      this.$location = $location;
      this.workflowId = $scope.workflowId;
      this.calls = $scope.calls;
      this.connector = $scope.connector || new Connector();
      this.connectorDAO = connectorDAO;
      this.mapperDAO = mapperDAO;
      $scope.vm = this;

      if (!!$scope.connectorId) {
        connectorDAO.getById($scope.workflowId, $scope.connectorId)
          .then((connector) => {
            this.connector._id = connector._id;
            this.connector.source = connector.source;
            this.connector.destination = connector.destination;
            this.connector.mapper = connector.mapper;
          });
      }
    }

    getMappers() {
      this.mapperDAO.getAll()
        .then((mappers: Array<Mapper>) => {
          this.mappers = mappers;
        });
    }

    save() {
      this.connectorDAO.save(this.workflowId, this.connector);
    }

    goToCall(callId: string) {
      this.$location.path('/workflows/' +
        this.workflowId + '/calls/' + callId);
    }

    goToMapper() {
      this.$location.path('/workflows/' +
        this.workflowId + '/connectors/' + this.connector._id +
        '/mappers/' + this.connector.mapper._id);
    }
  }
}
