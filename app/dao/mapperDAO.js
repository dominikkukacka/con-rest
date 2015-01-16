(function mapperDAOScope(angular, clazz) {
  'use strict';

  var app = angular.module('con-rest');

  app.factory('mapperDAO', function mapperDAOScope($q, DAO, Mapper) {
    function mapperDAO() {
      this.extend = 'DAO';

      this.public = {
        create: function createMap(name, maps) {
          return this.private.request('POST', '/api/mappers/', {
            name: name,
            maps: maps
          });
        },
        getAll: function getAll() {
          var deferred = $q.defer();
          this.private.request('GET', '/api/mappers/')
            .then(function convert(maps) {
              var modeled = [];
              maps.forEach(function createInstance(map) {
                this.push(new Mapper(map));
              }, modeled);
              deferred.resolve(modeled);
            }, deferred.reject);
          return deferred.promise;
        }
      };
    }

    var MapperDAO = clazz(mapperDAO);
    return new MapperDAO();
  });
}(window.angular, window.enofjs.clazz));
