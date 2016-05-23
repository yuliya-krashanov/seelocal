(function(){
    angular.module('seelocal', ['ngRoute'], function($interpolateProvider) {
        $interpolateProvider.startSymbol('<%');
        $interpolateProvider.endSymbol('%>');
    })
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
            $locationProvider.html5Mode(true);

            $routeProvider
                .when('/step/:step', {
                    templateUrl: 'templates/steps/main.html',
                    controller: 'StepsController'
                })
                .when('/login', {
                    templateUrl: 'templates/auth/login.html',
                    controller: 'LoginController'
                })
                .when('/register', {
                    templateUrl: 'templates/auth/register.html'
                })
                .when('/account', {
                    templateUrl: 'templates/auth/account.html'
                })
                .when('/reset-password', {
                    templateUrl: 'templates/auth/password_reset.html'
                })
                .when('/', {
                    redirectTo: '/step/1'
                })
                .otherwise({
                    redirectTo: '/'
                });
    }])
    .controller('AuthController', ['$scope', '$location', 'AuthService', function($scope, $location, AuthService){
            $scope.userLogged = true;

            AuthService.check().success(function(responce){
                $scope.userLogged  = ( responce == 1 ) ? true : false;
            }).error(function(error){
                console.log(error);
            });

            $scope.logout = function(){
                AuthService.logout()
                    .success(function(responce){
                        $location.path('/login');
                    }).error(function(error){
                        console.log(error);
                    });
            };

        }])
    .controller('LoginController', ['$scope', '$location', 'AuthService', function($scope, $location, AuthService){
            $scope.login = function(user) {
                if ($scope.loginForm.$valid){
                    AuthService.login(user)
                        .success(function (responce) {
                            //AuthService.userLogged = true;
                            $location.path('/step/1');
                        }).error(function (error) {
                            console.log(error);
                        });
                }
            };
    }])
    .controller('StepsController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){
        $scope.step = $routeParams.step;
        $scope.leftMarginPer = 18.7;

        $scope.stepsDesc = [
            'choose the objective of your campaign',
            'enter your campaign demographics',
            'upload your images',
            'choose your budget and timescale',
            'review and pay'
        ];
        $scope.isStepPassed = function(step){
          return step < $scope.step;
        };
        $scope.isStepActive = function(step){
            return step == $scope.step;
        };
    }])
    .controller('TabsController', ['$scope', function($scope){
        $scope.selectedTab = 1;

        $scope.selectTab = function(id){
            $scope.selectedTab = id;
        };

        $scope.isSelectedTab = function(id){
            return $scope.selectedTab === id;
        };
    }])
    .directive('stepContent', ['$route', function($route){
            return {
              restrict: 'E',
              templateUrl:'templates/steps/' + $route.current.params.step + '.html'
            };
        }])
    .controller('ObjectivesController', ['$scope', '$http', function($scope, $http){
        $scope.objectives = [];

        $http.post('api/objectives').success(function(data){
            $scope.objectives = data;
        }).error(function(error){
            console.log(error);
        });
    }])

    .factory('AuthService', ['$http', function($http){
        return {
            //userLogged: false,
            login: function(user){
                return $http.post('api/auth/login', user);
            },
            logout: function(){
                return $http.post('api/auth/logout');
            },
            check: function(){
                return $http.post('api/auth/check');
            },
            register: function(user){
                return $http.post('api/auth/register', user);
            }
        };
    }]);
}());


