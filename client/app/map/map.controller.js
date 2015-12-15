'use strict';

angular.module('terminaaliApp')
  .controller('MapCtrl', function ($scope, $http, $filter, uiGmapGoogleMapApi) {
	  var styleArray = [{"elementType":"labels.text","stylers":[{"visibility":"on"}]},{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"color":"#f5f5f2"},{"visibility":"on"}]},{"featureType":"administrative","stylers":[{"visibility":"off"}]},{"featureType":"transit","stylers":[{"visibility":"off"}]},{"featureType":"poi.attraction","stylers":[{"visibility":"off"}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"visibility":"on"}]},{"featureType":"poi.business","stylers":[{"visibility":"off"}]},{"featureType":"poi.medical","stylers":[{"visibility":"off"}]},{"featureType":"poi.place_of_worship","stylers":[{"visibility":"off"}]},{"featureType":"poi.school","stylers":[{"visibility":"off"}]},{"featureType":"poi.sports_complex","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#ffffff"},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"visibility":"simplified"},{"color":"#ffffff"}]},{"featureType":"road.highway","elementType":"labels.icon","stylers":[{"color":"#ffffff"},{"visibility":"off"}]},{"featureType":"road.highway","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","stylers":[{"color":"#ffffff"}]},{"featureType":"road.local","stylers":[{"color":"#ffffff"}]},{"featureType":"poi.park","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"water","stylers":[{"color":"#71c8d4"}]},{"featureType":"landscape","stylers":[{"color":"#e5e8e7"}]},{"featureType":"poi.park","stylers":[{"color":"#8ba129"}]},{"featureType":"road","stylers":[{"color":"#ffffff"}]},{"featureType":"poi.sports_complex","elementType":"geometry","stylers":[{"color":"#c7c7c7"},{"visibility":"off"}]},{"featureType":"water","stylers":[{"color":"#a0d3d3"}]},{"featureType":"poi.park","stylers":[{"color":"#91b65d"}]},{"featureType":"poi.park","stylers":[{"gamma":1.51}]},{"featureType":"road.local","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"poi.government","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"landscape","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"visibility":"simplified"}]},{"featureType":"road.local","stylers":[{"visibility":"simplified"}]},{"featureType":"road"},{"featureType":"road"},{},{"featureType":"road.highway"}];
    $scope.map = { 
      center: { latitude: 60.169198, longitude: 24.952127 },
      zoom: 12,
      options: {
        maxZoom: 20,
        minZoom: 3,
        mapTypeControl: false,
        panControl: false,
        streetViewControl: false,
        zoomControl: false,
        scrollwheel: true,
        styles: styleArray
      }
    };

    $scope.onMarkerClicked = function (m) {
        //this.windowOptions = !this.windowOptions;
        console.log('Marker was clicked');
        console.log(m);
    };
    
    $scope.activity = {};
    $scope.menuVisible = false;
    $scope.submenuVisible = false;

    $scope.toggleMenu = function(e) {
        $scope.menuVisible = !$scope.menuVisible;
        console.log($scope.menuVisible);
        //e.stopPropagation();
    };

    $scope.onClick = function(data) {
      console.log(data);
    }

    $scope.console = function() {
      console.log($scope.activity);
    }

    $scope.toggleSubmenu = function(e) {
        $scope.submenuVisible = !$scope.submenuVisible;
        console.log($scope.submenuVisible);
        //e.stopPropagation();
    };

    $http.get('/api/pins').success(function(pins) {
      $scope.pins = pins;
    });

    // The "then" callback function provides the google.maps object.
    uiGmapGoogleMapApi.then(function(maps) {
      $scope.$watch("activity", function(activity){
        console.log('changed');
        $scope.filteredPins = $filter("filter")($scope.pins, activity);
        console.log($scope.filteredPins);
        if (!$scope.filteredPins){
          return;
        }
      });
    });

});
