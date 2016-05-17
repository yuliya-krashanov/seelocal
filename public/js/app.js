(function(){
    angular.module('seelocal', [], function($interpolateProvider) {
        $interpolateProvider.startSymbol('<%');
        $interpolateProvider.endSymbol('%>');
    })
    .controller('StepsController', function($scope){

    });
}());


