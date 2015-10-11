'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:SettingCtrl
 * @description
 * # SettingCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
.controller('SettingCtrl', function($scope, $cookies, Helper, Options) {
    var appConfig = JSON.parse($cookies.get('appConfig'));
    $scope.userFields = Helper.getOptionValueByKey('userFields', appConfig);

    $scope.userFields.optionValue = JSON.parse($scope.userFields.optionValue);

    $scope.updateUserField = function(){
        var optionData = {
            id: $scope.userFields.id,
            optionKey: 'userFields',
            optionValue: $scope.userFields.optionValue
        };
        Options.update(optionData).then(function(data){
            console.log(data);
        });

    };
    $scope.addUserField = function(){
        var optionValue = {
            name: null,
            label: null,
            type: null
        };
        $scope.userFields.optionValue.push(optionValue);
    };
    $scope.forUnitTest = true;
});
