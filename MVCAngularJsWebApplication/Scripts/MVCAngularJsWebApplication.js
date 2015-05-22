var mvcAngularJsWebApplication = angular.module('mvcAngularJsWebApplication', ['ngRoute', 'ui.grid']);

mvcAngularJsWebApplication.factory('LoginFactory', LoginFactory);
mvcAngularJsWebApplication.factory('LinksFactory', LinksFactory);
mvcAngularJsWebApplication.factory('RegistrationFactory', RegistrationFactory);
mvcAngularJsWebApplication.controller('PlacesController', PlacesController);
mvcAngularJsWebApplication.controller('MainController', MainController);
mvcAngularJsWebApplication.controller('AboutController', AboutController);
mvcAngularJsWebApplication.controller('ContactController', ContactController);
mvcAngularJsWebApplication.controller('AccountController', AccountController);

var configFunction = function ($routeProvider, $httpProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'Home/Main',
            controller: MainController
        })
        // route for the about page
        .when('/about', {
            templateUrl: 'About',
            controller: AboutController
        })
        // route for the contact page
        .when('/contact', {
            templateUrl: 'Contact',
            controller: ContactController
        })
            // route for the contact page
        .when('/links', {
            templateUrl: 'Places',
            controller: PlacesController
        })
        .when('/login', {
            templateUrl: 'Account/Login',
            controller: AccountController
        });

    $httpProvider.interceptors.push(['$q', '$location', function ($q, $location) {
        return {
            response: function (response) {
                if (response.status === 401) {
                    console.log("Response 401");
                }
                return response || $q.when(response);
            },
            responseError: function (rejection) {
                if (rejection.status === 401) {
                    console.log("Response Error 401", rejection);
                    $location.path('/login').search('returnUrl', $location.path());
                    alert("Response Error 401");

                }
                return $q.reject(rejection);
            }
        };
    }]);
}
configFunction.$inject = ['$routeProvider', '$httpProvider'];
mvcAngularJsWebApplication.config(configFunction);

var opts = {
    lines: 11, // The number of lines to draw
    length: 17, // The length of each line
    width: 16, // The line thickness
    radius: 0, // The radius of the inner circle
    corners: 1, // Corner roundness (0..1)
    rotate: 0, // The rotation offset
    direction: 1, // 1: clockwise, -1: counterclockwise
    color: '#F5DEB3',//'rgba(0, 0, 0, 0.0980392)',// '#428bca', //'#000', // #rgb or #rrggbb or array of colors
    speed: 2.2, // Rounds per second
    trail: 60, // Afterglow percentage
    shadow: true, // Whether to render a shadow
    hwaccel: false, // Whether to use hardware acceleration
    className: 'spinner', // The CSS class to assign to the spinner
    zIndex: 2e9, // The z-index (defaults to 2000000000)
    top: '50%', // Top position relative to parent
    left: '50%' // Left position relative to parent
};

function setLoading($scope, b) {
    var targetw = document.getElementById('ajax-spinnerContainer');
    if (!$scope.spinner) {
        var target = document.getElementById('ajax-spinner');
        $scope.spinner = new Spinner(opts);
    }
    if (b === true) {
        targetw.style.display = 'block';
        $scope.spinner.spin(target);
    }
    else {
        $scope.spinner.stop();
        targetw.style.display = 'none';
    }
};
