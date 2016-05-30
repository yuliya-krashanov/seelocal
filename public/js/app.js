(function(){
    angular.module('seelocal', ['ngRoute', 'ngMessages', 'LocalStorageModule', 'flow'], function($interpolateProvider) {
        $interpolateProvider.startSymbol('<%');
        $interpolateProvider.endSymbol('%>');
    })
    .config(['$routeProvider', '$locationProvider', 'localStorageServiceProvider', 'flowFactoryProvider', function($routeProvider, $locationProvider, localStorageServiceProvider, flowFactoryProvider){
            $locationProvider.html5Mode(true);

            $routeProvider
                .when('/step/:step', {
                    templateUrl: function(params){
                       // if(params.step < 1 && params.step > 5)
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

            flowFactoryProvider.defaults = {
              target: '../images/temp'
            };

    }])

    .run(['AuthService', '$rootScope', '$templateCache', function(AuthService, $rootScope, $templateCache){
        AuthService.checkServerLogin();
        $rootScope.$on('$viewContentLoaded', function() {
            $templateCache.removeAll();
        });

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
    .controller('StepsController', ['$scope', '$http', '$location', '$rootScope', '$routeParams', 'StepsService', 'localStorageService', 'AuthService', function($scope, $http, $location, $rootScope, $routeParams, StepsService, localStorageService, AuthService){
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
          return localStorageService.get('step_' + step + '_passed') ? true : false;
        };
        $scope.isStepActive = function(step){
            return step == $scope.step;
        };

        $scope.saveData = function(step){
            $rootScope.$broadcast('saveData', step);
            $location.path('step/' + step);
        };

        if (!AuthService.checkUserLoggedIn()){
            $location.path('/login');
        }
    }])
    .controller('TabsController', ['$scope', 'TabsService', '$rootScope', function($scope, TabsService, $rootScope){
        $scope.selectedTab = TabsService.constructSelectedTab();

        $scope.selectTab = function(id){
            TabsService.setSelectedTab(id);
            $scope.selectedTab = id;
        };

        $scope.isSelectedTab = function(id){
            return $scope.selectedTab === id;
        };
    }])
    .directive('navigationTop', ['$route', function($route){
            return {
              restrict: 'E',
              templateUrl:'templates/steps/navigation-top.html'
            };
        }])
    .directive('navigationBottom', ['$route', function($route){
            return {
                restrict: 'E',
                templateUrl:'templates/steps/navigation-bottom.html'
            };
        }])
    .controller('ObjectivesController', ['$scope', '$http', '$location', '$rootScope', 'TabsService', 'localStorageService', function($scope, $http, $location, $rootScope, TabsService, localStorageService){
            $scope.objectives = [];

            $http.post('api/objectives').success(function(data){
                $scope.objectives = data;
            }).error(function(error){
                console.log(error);
            });

            $scope.$on('saveData', function(event, data){
                localStorageService.set('campaign_objective', TabsService.selectedTab);
            });

        }])
    .controller('UploadingController', ['$scope', '$http', 'localStorageService', function($scope, $http, localStorageService){
        angular.element(document).ready(function () {
            autosize(jQuery('textarea'));
        });
    }])
    .controller('DatesController', ['$scope', '$http', 'localStorageService', function($scope, $http, localStorageService){
        $scope.periods = [ '2 Weeks', '1 Month', '3 Months' ];

        $scope.selectedPeriod = localStorageService.get('campaign_period') || 0;

        $scope.showedDatesFields = false;

        var startDate = localStorageService.get('campaign_start_date') || null;

        if (startDate == null){
            $scope.startDate = new Date();
            $scope.startDate.setDate($scope.startDate.getDate() + 7);
        }else{
            $scope.startDate = new Date(localStorageService.get('campaign_start_date'));
        }

        $scope.changeDatesFields = function(){
            $scope.showedDatesFields = ($scope.showedDatesFields) ? false: true;
        };

        $scope.setPeriod = function(key){
            $scope.selectedPeriod = key;
            $scope.setEndDate();
        };
        $scope.isSelectedPeriod = function(key){
            return $scope.selectedPeriod === key;
        };

        $scope.setEndDate = function(){
            if (!$scope.startDate) { $scope.endDate = null; return; }
            $scope.endDate = new Date($scope.startDate);
            switch( $scope.selectedPeriod ){
                case 0: $scope.endDate.setDate($scope.startDate.getDate() + 14);
                    break;
                case 1: $scope.endDate.setMonth($scope.startDate.getMonth() + 1);
                    break;
                case 2: $scope.endDate.setMonth($scope.startDate.getMonth() + 3);
                    break;
                default: $scope.endDate = new Date();
                    break;
            }
        };

        $scope.setStartDate = function(){
            if (!$scope.endDate) { $scope.startDate = null; return; }
            $scope.startDate = new Date($scope.endDate);
            switch( $scope.selectedPeriod ){
                case 0: $scope.startDate.setDate($scope.endDate.getDate() - 14);
                    break;
                case 1: $scope.startDate.setMonth($scope.endDate.getMonth() - 1);
                    break;
                case 2: $scope.startDate.setMonth($scope.endDate.getMonth() - 3);
                    break;
                default: $scope.startDate = new Date();
                    break;
            }
        };

        $scope.setEndDate();

        $http.post('api/plans').success(function(responce){
            $scope.plans = responce;
            console.log($scope.plans);
        }).error(function(error){
            console.log(error);
        });

        $scope.selectedPlan = localStorageService.get('campaign_plan') || false;

        $scope.selectPlan = function(name){
            $scope.selectedPlan = name;
        };
        $scope.isSelectedPlan = function(name){
            return $scope.selectedPlan == name;
        }


        $scope.$on('saveData', function(){

        });
    }])

    .controller('OverviewController', ['$scope', '$http', 'localStorageService', function($scope, $http, localStorageService){
        $scope.overview = [{
                title: 'Campaign Name',
                value: localStorageService.get('campaign_name') || '',
                location: '/step/2?tab=1'
            },
            {
                title: 'Campaign cost',
                value: localStorageService.get('campaign_cost') || '',
                location: '/step/4'
            },
            {
                title: 'Timeframe',
                value: localStorageService.get('campaign_period') || '',
                location: '/step/4'
            },
            {
                title: 'Objective',
                value: localStorageService.get('campaign_objective') || '',
                location: '/step/1'
            },
            {
                title: 'Phone number',
                value: localStorageService.get('campaign_phone') || '',
                location: '/step/2?tab=1'
            },
            {
                title: 'Promotion',
                value: localStorageService.get('campaign_promotion') || '',
                location: '/step/3?tab=5'
            }
        ];

        $scope.targeting = {
            locations: localStorageService.get('campaign_locations') || '',
            gender: localStorageService.get('campaign_gender') || '',
            age: localStorageService.get('campaign_age') || '',
            interests: localStorageService.get('campaign_interests') || '',
            keywords: localStorageService.get('campaign_keywords') || '',
            websites: localStorageService.get('campaign_websites') || ''
        };
    }])

    .filter('excerptLimitTo', function(){
            return function(input, limit){
                if (input.length <= limit) return input;
                return input.slice(0, limit) + '...';
            }
        })
    .controller('DemographicsController', ['$scope', '$http', 'localStorageService', function($scope, $http, localStorageService){
        $scope.name = localStorageService.get('campaign_name') || '';
        $scope.phone = localStorageService.get('campaign_phone') || '';
        $scope.age = localStorageService.get('campaign_age') || '';
        $scope.gender = localStorageService.get('campaign_gender') || '';
        $scope.languages = localStorageService.get('campaign_languages') || '';
        $scope.locations = localStorageService.get('campaign_locations') || [{}];
        $scope.selectedInterests = localStorageService.get('campaign_interests') || [];
        $scope.interests = [];
        $scope.keywords = localStorageService.get('campaign_keywords') || [{},{},{},{}];
        $scope.websites = localStorageService.get('campaign_websites') || [{},{},{},{}];
        var keywordsLength = $scope.keywords.length;
        var websitesLength = $scope.websites.length;

        if(keywordsLength < 4) {
            for (var i = 4 - keywordsLength; i > 0; i--) {
                $scope.keywords.push({});
            }
        }
        if(websitesLength < 4) {
            for (var i = 4 - websitesLength; i > 0; i--) {
                $scope.websites.push({});
            }
        }
        $scope.addKeyword = function(){
            $scope.keywords.push({});
        };
        $scope.addWebsite = function(){
            $scope.websites.push({});
        };

        $http.post('api/interests').success(function(responce){  $scope.interests = responce; }).error(function(error){
            console.log(error);
        });

        $scope.selectInterest = function(key){
            $scope.selectedInterests.push( $scope.interests[key] );
            $scope.interests.splice(key, 1);
        };
        $scope.unselectInterest = function(key){
            $scope.interests.push( $scope.selectedInterests[key] );
            $scope.selectedInterests.splice(key, 1);
        };

        $scope.selectAllInterests = function(){
            $scope.interests.forEach(function(item){
                $scope.selectedInterests.push( item );
            });
            $scope.interests.splice(0);
        };

        $scope.addLocation = function(){
          $scope.locations.push({});
        };

        $scope.removeLocation = function(key){
            $scope.locations.splice(key, 1);
        };
        function clearArrayFromEmptyObjs(arr){
            console.log(arr);
            return arr.filter(function(obj){

                return obj.hasOwnProperty();
            });
        }
        $scope.$on('saveData', function(){
            localStorageService.set('campaign_name',  $scope.name);
            localStorageService.set('campaign_phone',  $scope.phone);
            localStorageService.set('campaign_locations', $scope.locations);
            localStorageService.set('campaign_age', $scope.age);
            localStorageService.set('campaign_gender', $scope.gender);
            localStorageService.set('campaign_languages', $scope.languages);
            localStorageService.set('campaign_interests',  $scope.selectedInterests);
            localStorageService.set('campaign_keywords',  $scope.keywords);
            localStorageService.set('campaign_websites',  $scope.websites);
        })
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
            return {
                selectedTab: '',
                constructSelectedTab: function(){
                    if ($route.current.params.step == 1){
                        this.selectedTab = localStorageService.get('campaign_objective') || 1;
                    }
                    else{
                        this.selectedTab = ($route.current.params.tab) ? +$route.current.params.tab : 1;
                    }
                    return this.selectedTab;
                },
                setSelectedTab: function(value){
                    this.selectedTab = value;
                }
            }
        }])
    .factory('AuthService', ['$http', 'localStorageService', function($http, localStorageService){

        return {
            checkServerLogin: function(){
                $http.post('api/auth/check').success(function(data){
                    if (data.remember_token)
                        localStorageService.set('token', data.remember_token);
                    else
                        localStorageService.remove('token');

                }).error(function(error){
                    console.log(error);
                });
            },
            checkUserLoggedIn: function(){
                return localStorageService.get('token') ? true : false;
            },
            login: function(user, success){
                return $http.post('api/auth/login', user).success(function(responce){
                    localStorageService.set('token', responce.remember_token);
                    success(responce);
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


    .factory('StepsService', ['$http', '$rootScope', 'localStorageService', function($http, $rootScope, localStorageService){
             return {
                calledStep: '',
                prepForSaveData: function(step){
                    this.calledStep = step;
                    console.log(step);
                    this.saveData();
                },
                saveData: function(){
                    $rootScope.$broadcast('saveData');
                }
             }
        }]);
}());


