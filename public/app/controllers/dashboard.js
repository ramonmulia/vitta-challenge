(function() {
  'use strict';

  angular.module('vitta-challange')
    .controller('dashboardController', dashboardController);

  function dashboardController($scope, $http) {
    $http.get('/territories')
      .then(function(results) {
        var mostPaintedArea = results.data.data;
        mostPaintedArea.sort(function(a, b) {
          return b.painted_area - a.painted_area;
        });

        $scope.mostPaintedArea = mostPaintedArea;
      })
  }
})();
