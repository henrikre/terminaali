'use strict';

angular.module('terminaaliApp')
  .controller('LoginCtrl', function ($scope, $location, Auth) {
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to home
          $location.path('/map');
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };
  });
