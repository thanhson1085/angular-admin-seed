'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
.controller('ListUserCtrl', function($scope, Users) {
    Users.get().then(function(data){
        $scope.users = data;
    });

    $scope.forUnitTest = true;
})
.controller('ViewUserCtrl', function($scope, $stateParams, Users) {
    Users.getUserById($stateParams.id).then(function(data){
        $scope.user = data;
    });

    $scope.forUnitTest = true;
});
