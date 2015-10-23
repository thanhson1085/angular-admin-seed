'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:TermCtrl
 * @description
 * # UserCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
.controller('ListTermCtrl', function($scope, $stateParams, Terms, APP_CONFIG) {
    var page = $stateParams.page ? parseInt($stateParams.page) : 1,
        limit = $stateParams.limit ? parseInt($stateParams.limit) : APP_CONFIG.pagination.limit;

    var taxonomy = $stateParams.taxonomy;
    $scope.limit = limit;
    Terms.list(taxonomy, page, limit).then(function(data){
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
