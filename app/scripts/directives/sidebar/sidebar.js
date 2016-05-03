'use strict';

/**
 * @ngdoc directive
 * @name sdAdminApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */

angular.module('sbAdminApp')
.directive('sidebar',['$location', '$cookies',  function() {
    return {
        templateUrl:'scripts/directives/sidebar/sidebar.html',
        restrict: 'E',
        replace: true,
        scope: {
        },
        controller:function($scope, $cookies, Helper){

            try {
                var appConfig = JSON.parse($cookies.get('appConfig'));
                $scope.taxonomies = Helper.getOptionValueByKey('taxonomies', appConfig);
                $scope.taxonomies.optionValue = JSON.parse($scope.taxonomies.optionValue);
            } catch (e) {
                console.log(e);
            }

            $scope.selectedMenu = 'dashboard';
            $scope.collapseVar = 0;
            $scope.multiCollapseVar = 0;

            $scope.check = function(x){

                if(x==$scope.collapseVar)
                    $scope.collapseVar = 0;
                else
                    $scope.collapseVar = x;
            };

            $scope.multiCheck = function(y){

                if(y==$scope.multiCollapseVar)
                    $scope.multiCollapseVar = 0;
                else
                    $scope.multiCollapseVar = y;
            };
        }
    }
}]);
