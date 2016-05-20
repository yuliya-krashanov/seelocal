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
                .otherwise({
                    redirectTo: '/'
                });
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
    .directive('stepContent', ['$location', function($location){
            return {
                restrict: 'E',
                templateUrl: function(elem,attr){
                    console.log($location);
                    return 'templates/steps/' + attr.step + '.html';
                }
            };
        }])
    .controller('ObjectivesController', ['$scope', '$http', function($scope, $http){
        $scope.objectives = [];

        $http.post('api/objectives').success(function(data){
            $scope.objectives = data;
        }).error(function(error){
            console.log(error);
        });
    }]);
}());


