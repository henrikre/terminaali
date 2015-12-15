'use strict';

angular.module('terminaaliApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/map', {
        templateUrl: 'app/map/map.html',
        controller: 'MapCtrl'
      });
  });
