'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:InstallCtrl
 * @description
 * # InstallCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
    .controller('InstallCtrl', function(Options, $location, $cookies) {
        var il = this;

        var appConfig = $cookies.get('appConfig');
        /// redirect to homepage if your site installed
        if (appConfig){
            $location.path('/');
        }
        il.install = function login(){
            var userData = {
                username: il.username,
                password: il.password,
                firstname: il.firstname,
                lastname: il.lastname
            };
            Options.install(userData).then(function(){
                il.error = null;
                $location.path('/login');
            }).catch(function(){
                il.error = 'Install Denied!';
            });
        };
    });
