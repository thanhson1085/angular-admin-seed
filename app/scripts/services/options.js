'use strict';
angular.module('sbAdminApp').factory('Options', function(Helper, $http, httpi, $q, APP_CONFIG) {
    return {
        list: function(page, limit){
            var deferred = $q.defer();
            var url = APP_CONFIG.services.options.list;
            var data = {
                page: page,
                limit: limit
            };
            httpi({
                method: 'GET',
                url: url,
                data: data
            }).success(function(data) {
                deferred.resolve(data);
            }).error(deferred.reject);
            return deferred.promise;
        },
        get: function(id){
            var deferred = $q.defer();
            var url = APP_CONFIG.services.options.get;
            httpi({
                method: 'GET',
                url: url,
                data: {
                    id: id
                }
            }).success(function(data) {
                deferred.resolve(data);
            }).error(deferred.reject);
            return deferred.promise;
        },
        install: function(data){
            var deferred = $q.defer();
            var url = APP_CONFIG.services.options.install;
            httpi({
                method: 'POST',
                url: url,
                data: data,
                transformRequest: Helper.transformRequestEncodeURI,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function(data) {
                deferred.resolve(data);
            }).error(deferred.reject);
            return deferred.promise;
        },
        create: function(data){
            var deferred = $q.defer();
            var url = APP_CONFIG.services.options.create;
            httpi({
                method: 'POST',
                url: url,
                data: data,
                transformRequest: Helper.transformRequestEncodeURI,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function(data) {
                deferred.resolve(data);
            }).error(deferred.reject);
            return deferred.promise;
        },
        update: function(data){
            var deferred = $q.defer();
            var url = APP_CONFIG.services.options.update;
            httpi({
                method: 'PUT',
                url: url,
                data: data
            }).success(function(data) {
                deferred.resolve(data);
            }).error(deferred.reject);
            return deferred.promise;
        },
        updateByOptionKey: function(data){
            var deferred = $q.defer();
            var url = APP_CONFIG.services.options.updateByOptionKey;
            httpi({
                method: 'PUT',
                url: url,
                data: data
            }).success(function(data) {
                deferred.resolve(data);
            }).error(deferred.reject);
            return deferred.promise;
        }
    };
});
