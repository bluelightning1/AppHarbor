var RegisterController = function ($scope, $location, $http) {
    $scope.registerForm = {
        emailAddress: '',
        password: '',
        confirmPassword: '',
        registrationFailure: false
    };

    $scope.register = function () {
        $http.post('/webapi/api/Account/Register', {
            Email: $scope.registerForm.emailAddress,
            Password: $scope.registerForm.password,
            ConfirmPassword: $scope.registerForm.confirmPassword
        })
   .success(function (data) {
       $scope.registerForm.registrationFailure = false;
   })
   .error(function (response) {
       if (response != undefined && response.ModelState != undefined) {
           if (response.ModelState['model.Password'] != undefined) {
               alert(response.ModelState['model.Password']);
           }
           if (response.ModelState[''] != undefined) {
               alert(response.ModelState['']);
           }
          
       }
       if (response.ExceptionMessage != undefined) {
           alert(response.ExceptionMessage);
       }
       $scope.registerForm.registrationFailure = true;
   });
        //var result = RegistrationFactory($scope.registerForm.emailAddress, $scope.registerForm.password, $scope.registerForm.confirmPassword);
        //result.then(function (result) {
        //    if (result.success) {
        //        $location.path('/routeOne');
        //    } else {
        //        $scope.registerForm.registrationFailure = true;
        //    }
        //});
    }
}

RegisterController.$inject = ['$scope', '$location', '$http'];