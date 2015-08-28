'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
.controller('ListUserCtrl', function($scope, $stateParams, Users, APP_SERVICES) {
    var page = $stateParams.page ? parseInt($stateParams.page) : 1,
        limit = $stateParams.limit ? parseInt($stateParams.limit) : APP_SERVICES.limit;

    $scope.limit = limit;
    Users.list(page, limit).then(function(data){
        $scope.users = data.rows;
        $scope.count = data.count;
    });

    $scope.pageChanged = function() {
        Users.list($scope.current_page, limit).then(function(response){
            $scope.users = response.rows;
        });
    };
    $scope.forUnitTest = true;
})
.controller('ViewUserCtrl', function($scope, $stateParams, Users) {
    Users.get($stateParams.id).then(function(data){
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
