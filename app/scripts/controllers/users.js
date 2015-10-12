'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
.controller('ListUserCtrl', function($scope, $stateParams, Users, APP_CONFIG) {
    var page = $stateParams.page ? parseInt($stateParams.page) : 1,
        limit = $stateParams.limit ? parseInt($stateParams.limit) : APP_CONFIG.pagination.limit;

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
.controller('ViewUserCtrl', function($scope, $stateParams, Users, Upload, Files, Usermeta, Helper) {
    Users.get($stateParams.id).then(function(data){
        $scope.user = data;
    });

    $scope.userFields = Helper.getUserFields();

    var userId = Helper.getUserId();
    Usermeta.getDataByUserId(userId).then(function(data){
        console.log(data);
    });

    $scope.upload = function (files) {
        if (files && files.length) {
            Files.upload(files).then(function (data) {
                $scope.avatar = data;
                $scope.updateUser();
            }).catch(function(){
                $scope.update_message = 'Upload failed';
            });
        }
    };

    $scope.updateUser = function(){
        var userData = {
            id: $scope.user.id,
            firstname: $scope.user.firstname,
            lastname: $scope.user.lastname,
            avatar: $scope.avatar
        };
        Users.update(userData).then(function(data){
            $scope.user.avatar = data.avatar;
            $scope.update_message = 'Updated successfully!';
        });
    };
    $scope.forUnitTest = true;
});
