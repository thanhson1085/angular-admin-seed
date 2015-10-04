'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:InstallCtrl
 * @description
 * # InstallCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
    .controller('InstallCtrl', function(Options, $location) {
        var il = this;
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
