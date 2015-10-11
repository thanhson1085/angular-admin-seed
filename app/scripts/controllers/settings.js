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

    console.log($scope.userFields);

    var optionData = {
        id: $scope.userFields.id,
        optionKey: 'userFields',
        optionValue: $scope.userFields.optionValue
    }
    $scope.updateUserField = function(){
        Options.update(optionData).then(function(data){
            console.log(data);
        });

    };
    $scope.forUnitTest = true;
});
