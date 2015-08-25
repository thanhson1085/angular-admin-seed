'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # UserCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
.controller('UserCtrl', function($scope,$position, Users, $stateParams) {
    Users.get().then(function(data){
        $scope.users = data;
    });
});
