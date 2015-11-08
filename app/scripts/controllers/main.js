'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
.controller('MainCtrl', function($scope, $stateParams, Users, APP_CONFIG) {
    Users.list(1, 10).then(function(data){
        $scope.users = data.rows;
        $scope.count = data.count;
    });

    $scope.forUnitTest = true;
})
