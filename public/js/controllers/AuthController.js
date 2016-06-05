angular.module('AuthController', [])
    .controller('AuthController', ['$scope', '$location', 'AuthService', 'localStorageService', function($scope, $location, AuthService, localStorageService){
        $scope.logged = AuthService.checkUserLoggedIn();

        $scope.logout = function(){
            AuthService.logout(function(responce){
                $location.path('/login');
            });
        };

    }]);
