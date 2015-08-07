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
      $scope.next_page = parseInt($stateParams.page) + 1;
      $scope.pre_page = (parseInt($stateParams.page) > 1)?parseInt($stateParams.page) - 1: 1;
      $scope.limit = $stateParams.limit;
      Users.get($stateParams.page, $stateParams.limit).then(function(data){
          $scope.users = data;
      });
  });
