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
.controller('ViewUserCtrl', function($scope, $stateParams, Users, Upload, APP_CONFIG) {
    Users.get($stateParams.id).then(function(data){
        $scope.user = data;
    });

    $scope.upload = function (files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                if (!file.$error) {
                    Upload.upload({
                        url: APP_CONFIG.services.upload.upload,
                        file: file  
                    }).progress(function (evt) {
                        console.log(evt);
                    }).success(function (data, status, headers, config) {
                        $timeout(function() {
                            $scope.log = 'file: ' + config.data.file.name + ', Response: ' + JSON.stringify(data) + '\n' + $scope.log;
                        });
                    });
                }
            }
        }
    };

    $scope.updateUser = function(){
        var userData = {
            id: $scope.user.id,
            firstname: $scope.user.firstname,
            lastname: $scope.user.lastname
        };
        Users.update(userData).then(function(){
            $scope.update_message = 'Updated successfully!';
        });
    };
    $scope.forUnitTest = true;
});
