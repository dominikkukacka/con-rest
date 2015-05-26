module ConnectorVMS {
  import ConnectorDAO = DAO.ConnectorDAO;
  import Connector = Models.Connector;
  import ILocationService = ng.ILocationService;

  export class ConnectorVM {
    static $inject = ['$scope', 'connectorDAO', '$location'];
    connector: Connector = null;
    $location: ILocationService;
    workflowId: string;

    constructor($scope, connectorDAO: ConnectorDAO, $location: ILocationService) {
      this.$location = $location;
      this.workflowId = $scope.workflowId;
      $scope.vm = this;

      connectorDAO.getById($scope.workflowId, $scope.connectorId)
        .then((connector) => {
          this.connector = connector;
        });
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
