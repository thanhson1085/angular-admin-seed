'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:RegisterCtrl
 * @description
 * # UserCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
    .controller('RegisterCtrl', function($scope, Users, $cookies, $location, $rootScope) {
        var vs = this;
        vs.register = function login(){
            var userData = {
                username: vs.username,
                password: vs.password,
                firstname: vs.firstname,
                lastname: vs.lastname
            };
            Users.register(userData).then(function(data){
                vs.error = null;
                $location.path('/register/thankyou');
            }).catch(function(){
                vs.error = 'Register Denied!';
            });
        };
    })
    .controller('ActivateCtrl', function(Users, $stateParams, $location) {
        Users.activate($stateParams.token).then(function(){
            $location.path("/dashboard");

        });
    })
    .controller('ThankyouCtrl', function() {
    });
