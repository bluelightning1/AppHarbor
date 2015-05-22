var PlacesController = function ($scope, $http, LinksFactory) {
    setLoading($scope, true);
    $scope.isAuthorized = false;
    $scope.links = [];
    $scope.load = function () {
        LinksFactory.retrieve()
            .success(handleSuccess)
            .error(handleError);
    };

    var handleSuccess = function (data, status) {
        $scope.links = data;
        setLoading($scope,false);
    };

    var handleError = function (data, status) {
        $scope.links = data;
        setLoading($scope, false);
    };


    $scope.gridOptions = {
        data: 'links',
        enableSorting: true,
        enableCellEditOnFocus: true,
        columnDefs: [
            { name: 'Id', visible: false },
            { name: 'Href', enableSorting: false, enableCellEdit: false, visible: false },
            { name: 'DisplayName', cellTemplate: '<div class="leftJustifiedColumn"><a target="_blank" href="{{row.entity.Href}}">{{row.entity.DisplayName}}</a><div>' },
            { name: 'Description', cellTemplate: '<div class="leftJustifiedColumn">{{row.entity.Description}}<div>' },
            {
                visible: $scope.isAuthorized,
                name: 'Edit',
                cellTemplate: '<div class="centeredColumn">' +
                  '<input type="button" class="button" value="Edit" />' +
                  '&nbsp;' +
                  '<input type="button" class="button" value="Delete" />' +
                  '</div>'
            }
        ]
    };
}
PlacesController.$inject = ['$scope', '$http', 'LinksFactory'];