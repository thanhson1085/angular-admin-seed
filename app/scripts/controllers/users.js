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
.controller('ViewUserCtrl', function($scope, $stateParams, Users, Upload, Files, Usermeta, Helper, Terms, TermRelationships) {
    Users.get($stateParams.id).then(function(data){
        $scope.user = data;
    });

    $scope.userFields = Helper.getUserFields();

    $scope.taxonomies = Helper.getTaxonomies();

    Terms.getAll($scope.taxonomies).then(function(data){
        $scope.taxonomies = data;
        $scope.orderedTerms = []
        for (var k in $scope.taxonomies) {
            $scope.taxonomies[k].data = Helper.sortTree($scope.taxonomies[k].data);
        }
        TermRelationships.getByUserId($stateParams.id).then(function(res) {
            res.rows.map(function(item) {
                $scope.userTerm[item.TermId] = true;
                return item.TermId;
            });
        });

    });

    $scope.userTerm = [];
    $scope.updateUserTerm = function(TermId, userTerm) {
        if (userTerm[TermId]) {
            var createData = {
                UserId: $stateParams.id,
                TermId: TermId,
                order: 0
            };
            TermRelationships.create(createData).then(function(data){
                console.log(data);
            });
        } else {
            var deleteData = {
                UserId: $stateParams.id,
                TermId: TermId
            };
            TermRelationships.delete(deleteData).then(function(data){
                console.log(data);
            });
        }
    }

    Usermeta.getDataByUserId($stateParams.id).then(function(data){
        for (var k in $scope.userFields){
            var value = null;
            var id = null;
            for (var i in data) {
                if ($scope.userFields[k].name === data[i].metaKey) {
                    value = data[i].metaValue;
                    id = data[i].id;
                    break;
                }
            }
            $scope.userFields[k].value = value;
            $scope.userFields[k].id = id;
        }
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

    $scope.updateUsermeta = function(uF){
        var data = {
            id: uF.id,
            UserId: $scope.user.id,
            metaKey: uF.name,
            metaValue: uF.value
        };
        Usermeta.create(data).then(function(res){
            console.log(res);
        });

    };

    $scope.updateUser = function(){
        var userData = {
            id: $scope.user.id,
            firstname: $scope.user.firstname,
            lastname: $scope.user.lastname,
            isActivated: $scope.user.isActivated,
            avatar: $scope.avatar
        };
        Users.update(userData).then(function(data){
            $scope.user.avatar = data.avatar;
            $scope.update_message = 'Updated successfully!';
        });
    };
    $scope.forUnitTest = true;
});
