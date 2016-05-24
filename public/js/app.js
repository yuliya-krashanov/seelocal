(function(){
    angular.module('seelocal', ['ngRoute', 'LocalStorageModule'], function($interpolateProvider) {
        $interpolateProvider.startSymbol('<%');
        $interpolateProvider.endSymbol('%>');
    })
    .config(['$routeProvider', '$locationProvider', 'localStorageServiceProvider', function($routeProvider, $locationProvider, localStorageServiceProvider){
            $locationProvider.html5Mode(true);

            $routeProvider
                .when('/step/:step', {
                    templateUrl: function(params){
                        return 'templates/steps/' + params.step + '.html';
                    },
                    controller: 'StepsController'
                })
                .when('/login', {
                    templateUrl: 'templates/auth/login.html',
                    controller: 'LoginController'
                })
                .when('/register', {
                    templateUrl: 'templates/auth/register.html',
                    controller: 'RegisterController'
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


            localStorageServiceProvider
                .setPrefix('seelocal');

    }])
    .controller('AuthController', ['$scope', '$location', 'AuthService', 'localStorageService', function($scope, $location, AuthService, localStorageService){
            $scope.logged = AuthService.checkUserLoggedIn();

            $scope.logout = function(){
                AuthService.logout(function(responce){
                    $location.path('/login');
                });
            };

        }])
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
    }])
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
    .controller('StepsController', ['$scope', '$http', '$location', '$routeParams', 'localStorageService', 'AuthService', function($scope, $http, $location, $routeParams, localStorageService, AuthService){
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

        if (!AuthService.checkUserLoggedIn()){
            $location.path('/login');
        }
    }])
    .controller('TabsController', ['$scope', 'TabsService', function($scope, TabsService){
        $scope.selectedTab = TabsService.getSelectedTab();
            console.log($scope.selectedTab);
        $scope.selectTab = function(id){
            $scope.selectedTab = id;
        };

        $scope.isSelectedTab = function(id){
            return $scope.selectedTab === id;
        };
    }])
    /*.directive('stepContent', ['$route', function($route){
            return {
              restrict: 'E',
              templateUrl:'templates/steps/' + $route.current.params.step + '.html'
            };
        }])*/
    .controller('ObjectivesController', ['$scope', '$http', 'SharedProperties', 'localStorageService', function($scope, $http, SharedProperties, localStorageService){
        $scope.objectives = [];

        $http.post('api/objectives').success(function(data){
            $scope.objectives = data;
        }).error(function(error){
            console.log(error);
        });
    }])

    .controller('DemographicsController', ['$scope', '$http', 'localStorageService', function($scope, $http, localStorageService){
        $scope.locations = localStorageService.get('campaign_locations') || [{}];
        $scope.selectedInterests = localStorageService.get('campaign_interests') || [{}];
        $scope.interests = [];

        $http.post('api/interests').success(function(responce){  $scope.interests = responce; }).error();

        $scope.addLocation = function(){
          $scope.locations.push({});
        };

        $scope.removeLocation = function(key){
            console.log($scope.locations);
            $scope.locations.splice(key, 1);

        };
    }])
    .service('SharedProperties', function(){


         var properties = {
             selectedTab: 1
         };
         return {
             getProperty: function(property){
                 return properties[property];
             },
             setProperty: function(property, value){
                 properties[property] = value;
             }
         };
    })
    .service('TabsService', ['$route', 'localStorageService', function($route, localStorageService){

            if ($route.current.params.step == 1)
                var selectedTab = localStorageService.get('campaign_objective') || 1;
            else{
                var selectedTab = ($route.current.params.tab) ? +$route.current.params.tab : 1;
            }

            return {
                getSelectedTab: function(){
                    return selectedTab;
                },
                setSelectedTab: function(value){
                    selectedTab = value;
                }
            }
        }])
    .factory('AuthService', ['$http', 'localStorageService', function($http, localStorageService){
        return {
            checkUserLoggedIn: function(){
                return (localStorageService.get('token')) ? true: false;
            },
            login: function(user, success){
                return $http.post('api/auth/login', user).success(function(responce){
                    localStorageService.set('token', responce.remember_token);
                    success(responce);
                    console.log(responce);
                }).error(function(error){
                    console.log(error);
                });
            },
            logout: function(success){
                return $http.post('api/auth/logout').success(function(responce){
                    localStorageService.remove('token');
                    success(responce);
                }).error(function(error){
                    console.log(error);
                });
            },
            register: function(user, success){
                return $http.post('api/auth/register', user).success(function(responce){
                    localStorageService.set('token', responce.remember_token);
                    success(responce);
                }).error(function(error){
                    console.log(error);
                });
            }
        };
    }])


    .factory('StepsService', ['$http', 'localStorageService', function($http, localStorageService){
         return {

         }
    }]);
}());


