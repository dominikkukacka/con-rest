(function connectorDAOModelScope(angular, clazz) {
  'use strict';

  var app = angular.module('con-rest');

  app.factory('connectorDAO', function connectorDAOScope($http, Connector, DAO) {
    function connectorDAO() {
      this.extend = 'DAO';

      this.public = {
        create: function create(workflowId, map) {
          return this.private.request('POST',
            '/api/workflows/' + workflowId + '/connectors/', {
              map: map.getId()
            });
        }
      }
    }

    var ConnectorDAO = clazz(connectorDAO);
    return new ConnectorDAO();
  });
}(window.angular, window.enofjs.clazz));
