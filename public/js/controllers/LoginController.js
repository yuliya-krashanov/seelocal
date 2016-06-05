angular.module('LoginController', [])
    .controller('LoginController', ['$scope', '$location', 'AuthService', function($scope, $location, AuthService){
        $scope.login = function(user) {
            if ($scope.loginForm.$valid){
                AuthService.login(user, function (responce) {
                    $location.path('/step/1');
                });
            }
        };
        if (AuthService.checkUserLoggedIn()){
            $location.path('/step/1');
        }
    }]);