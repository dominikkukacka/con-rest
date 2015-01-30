(function mapperCScope(angular) {
  'use strict';

  var app = angular.module('con-rest');

  app.controller('mapperC', function mapperC($scope, mapperDAO) {
    $scope.name = null;
    $scope.maps = [];

    $scope.openPlaces = false;
    $scope.availablePlaces = ['url', 'header', 'data'];

    $scope.addMap = function addMap() {
      $scope.maps.push({
        place: null,
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
          $scope.addMap();
        });
    };

    // Select place
    $scope.selectPlace = function selectPlace(map, place) {
      var index = $scope.maps.indexOf(map);
      $scope.maps[index].place = place;
      $scope.openPlaces = false;
    };

    // Open th dropdown for places.
    $scope.togglePlacesDropdown = function togglePlacesDropdown() {
      $scope.openPlaces = !$scope.openPlaces;
    };
  });
}(window.angular));
