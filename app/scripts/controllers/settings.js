'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:SettingCtrl
 * @description
 * # SettingCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
.controller('SettingCtrl', function($scope, $cookies, Helper) {
    var appConfig = JSON.parse($cookies.get('appConfig'));
    $scope.userFields = Helper.getOptionValueByKey('userFields', appConfig);
    $scope.forUnitTest = true;
});
