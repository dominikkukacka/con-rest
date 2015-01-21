(function ConnectorModelScope(angular, clazz) {
  'use strict';

  var app = angular.module('con-rest');

  app.factory('Connector', function ConnectorScope() {
    function Connector() {
      this.private = {
        workflowId: {
          getSet: null
        },
        source: {
          getSet: null
        },
        destination: {
          getSet: null
        },
        mapper: {
          getSet: null
        }
      };

      this.constructor = function constructor(connector) {
        this.private.workflowId = connector._id;
        this.private.workflowId = connector.workflow;
        this.private.source = connector.source;
        this.private.destination = connector.destination;
        this.private.mapper = connector.mapper;
      };
    }

    return clazz(Connector);
  });
}(window.angular, window.enofjs.clazz));
