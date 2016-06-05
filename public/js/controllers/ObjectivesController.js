angular.module('ObjectivesController', [])
    .controller('ObjectivesController', ['$scope', '$http', '$location', '$rootScope', 'TabsService', 'localStorageService', function($scope, $http, $location, $rootScope, TabsService, localStorageService){
        $scope.objectives = [];

        $http.post('api/objectives').success(function(data){
            $scope.objectives = data;
        }).error(function(error){
            console.log(error);
        });

        $scope.$on('saveData', function(event, data){
            localStorageService.set('campaign_objective', TabsService.selectedTab);
            localStorageService.set('campaign_objective_name', $scope.objectives[TabsService.selectedTab - 1].title);
        });

    }]);