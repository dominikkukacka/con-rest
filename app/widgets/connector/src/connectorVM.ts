module ConnectorVMS {
  import ConnectorDAO = DAO.ConnectorDAO;
  import Connector = Models.Connector;

  export class ConnectorVM {
    static $inject = ['$scope', 'connectorDAO'];
    connector: Connector = null;

    constructor($scope, connectorDAO: ConnectorDAO) {
      $scope.vm = this;

      connectorDAO.getById($scope.workflowId, $scope.connectorId)
        .then((connector) => {
          this.connector = connector;
        });
    }
  }
}
