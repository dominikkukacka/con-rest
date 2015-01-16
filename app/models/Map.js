(function MapModelScope(angular, clazz) {
  'use strict';

  var app = angular.module('con-rest');

  app.factory('Map', function MapScope() {
    function Map() {
      this.private = {
        id: {
          get: null
        }
      };

      this.constructor = function constructor(map) {
        this.private.id = map._id;
      };
    }

    return clazz(Map);
  });
}(window.angular, window.enofjs.clazz));
