(function mapperCScope(angular) {
    'use strict';

    var app = angular.module('con-rest');

    app.controller('mapperC', function mapperC($scope, mapperDAO) {
        $scope.name = null;
        $scope.maps = [];

        $scope.addMap = function addMap() {
            $scope.maps.push({
                source: null,
                destination: null
            });
        };

        $scope.removeMap = function removeMap(index) {
            if ($scope.maps.length === 1) {
                return;
            }
            $scope.maps.splice(index, 1);
        };

        $scope.save = function save() {
            mapperDAO.create($scope.name, $scope.maps)
                .then(function cleanScope() {
                    $scope.name = null;
                    $scope.maps = [];
                });
        };
    });
}(window.angular));
