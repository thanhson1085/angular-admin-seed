'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
.controller('UserCtrl', function($scope,$position, Users) {
    Users.get().then(function(data){
        $scope.users = data;
    });

    $scope.forUnitTest = true;
});
