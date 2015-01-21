(function connectorDAOModelScope(angular, clazz) {
  'use strict';

  var app = angular.module('con-rest');

  app.factory('connectorDAO', function connectorDAOScope($http, Connector, DAO) {
    function connectorDAO() {
      this.extend = 'DAO';

      this.public = {
        create: function create(connector) {
          return this.private.request('POST',
            '/api/workflows/' + connector.getWorkflowId() + '/connectors/', {
              mapper: connector.getMapper().getId(),
              source: connector.getSource(),
              destination: connector.getDestination()
            });
        },
        get: function get(id, workflowId) {
          return this.private.request('GET',
            '/api/workflows/' + workflowId + '/connectors/' + id);
        }
      }
    }

    var ConnectorDAO = clazz(connectorDAO);
    return new ConnectorDAO();
  });
}(window.angular, window.enofjs.clazz));
