'use strict';
angular.module('sbAdminApp').factory('Terms', function($http, httpi, $q, APP_CONFIG) {
    return {
        list: function(taxonomy, page, limit){
            var deferred = $q.defer();
            var url = APP_CONFIG.services.terms.list;
            var data = {
                taxonomy: taxonomy,
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
        create: function(data){
            var deferred = $q.defer();
            var url = APP_CONFIG.services.terms.create;
            httpi({
                method: 'POST',
                url: url,
                data: data
            }).success(function(data) {
                deferred.resolve(data);
            }).error(deferred.reject);
            return deferred.promise;
        },
        get: function(id){
            var deferred = $q.defer();
            var url = APP_CONFIG.services.terms.get;
            httpi({
                method: 'GET',
                url: url,
                data: {id: id}
            }).success(function(data) {
                deferred.resolve(data);
            }).error(deferred.reject);
            return deferred.promise;
        },
        getAll: function(taxonomy){
            var deferred = $q.defer();
            var url = APP_CONFIG.services.terms.getAll;
            httpi({
                method: 'GET',
                url: url,
                data: {taxonomy: taxonomy}
            }).success(function(data) {
                deferred.resolve(data);
            }).error(deferred.reject);
            return deferred.promise;
        },
        update: function(data){
            var deferred = $q.defer();
            var url = APP_CONFIG.services.terms.update;
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
