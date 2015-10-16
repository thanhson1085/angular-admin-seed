'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:RegisterCtrl
 * @description
 * # UserCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
    .controller('RegisterCtrl', function(Users, $location) {
        var vs = this;
        vs.register = function login(){
            var userData = {
                username: vs.username,
                password: vs.password,
                firstname: vs.firstname,
                lastname: vs.lastname
            };
            Users.register(userData).then(function(){
                vs.error = null;
                $location.path('/thankyou');
            }).catch(function(){
                vs.error = 'Register Denied, Your username is exists!';
            });
        };
    })
    .controller('ActivateCtrl', function(Users, $stateParams, $location, $timeout) {
        Users.activate($stateParams.token).then(function(){
            $timeout(function() {
                $location.path('/dashboard');
            }, 5000);
        });
    })
    .controller('ThankyouCtrl', function() {
    });
