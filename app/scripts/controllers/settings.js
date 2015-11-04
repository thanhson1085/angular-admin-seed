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

    $scope.optionTypes = [
        {text: 'text', value: 'text' },
        {text: 'checkbox', value: 'checkbox' },
        {text: 'textarea', value: 'textarea' },
        {text: 'select', value: 'select' },
    ];
    $scope.userFields = Helper.getOptionValueByKey('userFields', appConfig);
    $scope.userFields.optionValue = JSON.parse($scope.userFields.optionValue);

    // Starting to delete a user field
    $scope.startDelete = function(key){
    };
    // delete a user field
    $scope.deleteUserField = function(key){
    };

    // update a user field
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

    // add a new user fields
    $scope.addUserField = function(){
        var optionValue = {
            name: null,
            label: null,
            type: null
        };
        $scope.userFields.optionValue.push(optionValue);
    };

    $scope.taxonomies = Helper.getOptionValueByKey('taxonomies', appConfig);
    $scope.taxonomies.optionValue = JSON.parse($scope.taxonomies.optionValue);

    // update a taxonomy
    $scope.updateTaxonomy = function(){
        var optionData = {
            id: $scope.taxonomies.id,
            optionKey: 'taxonomies',
            optionValue: $scope.taxonomies.optionValue
        };
        Options.update(optionData).then(function(data){
            console.log(data);
        });
    };

    // add a new taxonomy
    $scope.addTaxonomy = function(){
        var optionValue = {
            name: null,
            label: null,
            description: null
        };
        $scope.taxonomies.optionValue.push(optionValue);
    };
    $scope.forUnitTest = true;
});
