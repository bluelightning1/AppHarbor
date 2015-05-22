var PlacesController = function ($scope, $http) {
    $scope.load = function () {
        $http.get('http://localhost/webapi/api/Links')
       .success(function (data) {
           $scope.links = data;
       })
       .error(function (data) {
           $scope.links = data;
       });
    }
}

PlacesController.$inject = ['$scope', '$http'];