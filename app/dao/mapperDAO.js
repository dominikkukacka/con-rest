(function mapperDAOScope(angular, clazz) {
    'use strict';

    var app = angular.module('con-rest');

    app.factory('mapperDAO', function mapperDAOScope(DAO) {
        function mapperDAO() {
            this.extend = 'DAO';

            this.public = {
                create: function createMap(name, maps) {
                    return this.private.request('POST', '/api/mappers/', {
                        name: name,
                        maps: maps
                    });
                }
            };
        }

        var MapperDAO = clazz(mapperDAO);
        return new MapperDAO();
    });
}(window.angular, window.enofjs.clazz));
