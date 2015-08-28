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

    $scope.updateUser = function(){
        var userData = {
            id: $scope.user.id,
            firstname: $scope.user.firstname,
            lastname: $scope.user.lastname
        };
        Users.update(userData).then(function(data){
            console.log(data);
        });
    };
    $scope.forUnitTest = true;
});
