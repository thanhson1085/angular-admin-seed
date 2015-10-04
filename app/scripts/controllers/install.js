'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:InstallCtrl
 * @description
 * # InstallCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
    .controller('InstallCtrl', function(Options) {
        var il = this;
        il.register = function login(){
            var userData = {
                username: il.username,
                password: il.password,
                firstname: il.firstname,
                lastname: il.lastname
            };
            Options.install(userData).then(function(data){
                vs.error = null;
                $location.path('/login');
            }).catch(function(){
                vs.error = 'Install Denied!';
            });
        };
    });
