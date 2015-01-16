(function MapperModelScope(angular, clazz) {
  'use strict';

  var app = angular.module('con-rest');

  app.factory('Mapper', function MapperScope() {
    function Mapper() {
      this.private = {
        id: {
          get: null
        },
        maps: {
          getSet: null
        }
      };

      this.constructor = function constructor(mapper) {
        this.private.id = mapper._id;
        this.private.maps = mapper.maps;
      };
    }

    return clazz(Mapper);
  });
}(window.angular, window.enofjs.clazz));
