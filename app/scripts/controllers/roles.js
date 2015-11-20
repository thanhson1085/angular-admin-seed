'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:SettingCtrl
 * @description
 * # SettingCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
.controller('RoleCtrl', function($scope, $cookies, Helper, Options) {
    var appConfig = JSON.parse($cookies.get('appConfig'));

    $scope.optionTypes = [
        {text: 'text', value: 'text' },
        {text: 'checkbox', value: 'checkbox' },
        {text: 'textarea', value: 'textarea' },
        {text: 'select', value: 'select' },
    ];
    $scope.roles = Helper.getOptionValueByKey('roles', appConfig);
    $scope.roles.optionValue = JSON.parse($scope.roles.optionValue);

    // Starting to delete a user field
    $scope.startDelete = function(key){
        $scope.deleteKey = key;
    };

    // update a user field
    $scope.updateRole = function(){
        var optionData = {
            id: $scope.roles.id,
            optionKey: 'roles',
            optionValue: $scope.roles.optionValue
        };
        Options.update(optionData).then(function(data){
            console.log(data);
        });
    };

    // delete a role
    $scope.deleteRole = function(key){
        $scope.roles.optionValue.splice(key, 1);
        $scope.updateRole();
    };

    // add a new role
    $scope.addRole = function(){
        var optionValue = {
            name: null,
            label: null
        };
        $scope.roles.optionValue.push(optionValue);
    };

    $scope.forUnitTest = true;
});
