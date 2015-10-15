'use strict';
angular.module('sbAdminApp').factory('Usermeta', function($http, httpi, $q, APP_CONFIG) {
    return {
        list: function(page, limit){
            var deferred = $q.defer();
            var url = APP_CONFIG.services.usermeta.list;
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
            var url = APP_CONFIG.services.usermeta.get;
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
        getDataByUserId: function(userId){
            var deferred = $q.defer();
            var url = APP_CONFIG.services.usermeta.getDataByUserId;
            httpi({
                method: 'GET',
                url: url,
                data: {
                    userId: userId
                }
            }).success(function(data) {
                deferred.resolve(data);
            }).error(deferred.reject);
            return deferred.promise;
        },
        create: function(data){
            var deferred = $q.defer();
            var url = APP_CONFIG.services.usermeta.create;
            httpi({
                method: 'POST',
                url: url,
                data: data
            }).success(function(data) {
                deferred.resolve(data);
            }).error(deferred.reject);
            return deferred.promise;
        },
        update: function(data){
            var deferred = $q.defer();
            var url = APP_CONFIG.services.usermeta.update;
            httpi({
                method: 'PUT',
                url: url,
                data: data
            }).success(function(data) {
                deferred.resolve(data);
            }).error(deferred.reject);
            return deferred.promise;
        },
    };
});
