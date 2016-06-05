angular.module('RegisterController', [])
    .controller('RegisterController', ['$scope', '$location', 'AuthService', function($scope, $location, AuthService){
        $scope.register = function(user) {
            if ($scope.registerForm.$valid){
                AuthService.register(user, function (responce) {
                    $location.path('/step/1');
                });
            }
        };
        if (AuthService.checkUserLoggedIn()){
            $location.path('/step/1');
        }
    }])
