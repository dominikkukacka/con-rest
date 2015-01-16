(function ConnectorModelScope(angular, clazz) {
  'use strict';

  var app = angular.module('con-rest');

  app.factory('Connector', function ConnectorScope() {
    function Connector() {

    }

    return clazz(Connector);
  });
}(window.angular, window.enofjs.clazz));
