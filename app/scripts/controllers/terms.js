'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:TermCtrl
 * @description
 * # TermCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
.controller('ListTermCtrl', function($scope, $stateParams, Terms, APP_CONFIG) {
    var page = $stateParams.page ? parseInt($stateParams.page) : 1,
        limit = $stateParams.limit ? parseInt($stateParams.limit) : APP_CONFIG.pagination.limit;

    $scope.taxonomy = $stateParams.taxonomy;
    $scope.limit = limit;
    Terms.list($scope.taxonomy, page, limit).then(function(data){
        $scope.terms = data.rows;
        $scope.count = data.count;
    });

    $scope.pageChanged = function() {
        Terms.list(taxonomy, $scope.current_page, limit).then(function(response){
            $scope.terms = response.rows;
        });
    };

    $scope.startDelete = function(termId) {
        $scope.deleteId = termId;
    }
    $scope.deleteTerm = function(termId) {
        Terms.delete(termId).then(function (data) {
            console.log(data)
        });
    }
    $scope.forUnitTest = true;
})
.controller('NewTermCtrl', function($scope, $stateParams, $location, Terms, APP_CONFIG) {
    $scope.taxonomy = $stateParams.taxonomy;

    Terms.getAllByTaxonomy($scope.taxonomy).then(function(data){
        $scope.parents = data;
    });

    $scope.createTerm = function(taxonomy) {
        $scope.term.taxonomy = taxonomy;
        $scope.term.parent = ($scope.parent)?$scope.parent.id:null;
        Terms.create($scope.term).then(function(data){
            $location.path('/dashboard/terms/view/' + data.id);
        });
    };
    $scope.forUnitTest = true;
})
.controller('ViewTermCtrl', function($scope, $stateParams, Terms, APP_CONFIG) {
    var id = $stateParams.id;

    Terms.get(id).then(function(data){
        var taxonomy = data.taxonomy;
        Terms.getAllByTaxonomy(taxonomy).then(function(res){
            $scope.parents = res;
            $scope.getParent = function(parentId){
                var ret = $scope.parents.filter(function(parent, key){
                    return (parent.id === parentId);
                });
                return (ret.length > 0)?ret[0].name:null;
            }
        });
        $scope.term = data;
    });

    $scope.updateTerm = function(){
        Terms.update($scope.term).then(function(res){
            console.log(res);
        });
    };
    $scope.forUnitTest = true;
});
