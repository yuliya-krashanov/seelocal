(function(){
    angular.module('seelocal', ['ngRoute'], function($interpolateProvider) {
        $interpolateProvider.startSymbol('<%');
        $interpolateProvider.endSymbol('%>');
    })
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
        $routeProvider
            .when('/step/:step', {
                templateUrl: ''
            });

        $locationProvider.html5Mode(true);
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
    .controller('ObjectivesController', ['$scope', '$http', function($scope, $http){
        $scope.objectives = [];

        $http.post('/objectives').success(function(data){
            $scope.objectives = data;
        }).error(function(error){
            console.log(error);
        });
    }]);
}());


