(function mapperDAOScope(angular, clazz) {
    'use strict';

    var app = angular.module('con-rest');

    app.factory('mapperDAO', function mapperDAOScope() {
        function mapperDAO() {

        }

        var MapperDAO = clazz(mapperDAO);
        return new MapperDAO();
    });
}(window.angular, window.enofjs.clazz));
