'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:LoginCtrl
 * @description
 * # UserCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
    .controller('LoginCtrl', function($scope, Users, $cookies, $state, $rootScope) {
        var vm = this;
        // logout before login
        $rootScope.user_info = {};
        $cookies.remove('user_info');
        $cookies.remove('appConfig');
        vm.login = function login(){
            Users.login(vm.username, vm.password).then(function(data){
                $rootScope.user_info = data;
                console.log($rootScope.user_info);
                $cookies.put('user_info', JSON.stringify(data));
                vm.error = null;
                $state.go('dashboard.user_view', {id: $rootScope.user_info.id});
            }).catch(function(){
                vm.error = 'Access Denied!';
            });
        };
    });
