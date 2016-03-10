'use strict';
angular.module('sbAdminApp').factory('TermRelationships', function($http, httpi, $q, APP_CONFIG) {
    return {
        getByUserId: function(UserId){
            var deferred = $q.defer();
            var url = APP_CONFIG.services.termRelationships.getByUserId;
            httpi({
                method: 'GET',
                url: url,
                data: {UserId: UserId}
            }).success(function(data) {
                deferred.resolve(data);
            }).error(deferred.reject);
            return deferred.promise;
        },
        create: function(data){
            var deferred = $q.defer();
            var url = APP_CONFIG.services.termRelationships.create;
            httpi({
                method: 'POST',
                url: url,
                data: data
            }).success(function(data) {
                deferred.resolve(data);
            }).error(deferred.reject);
            return deferred.promise;
        },
        delete: function(data){
            var deferred = $q.defer();
            var url = APP_CONFIG.services.termRelationships.delete;
            httpi({
                method: 'DELETE',
                url: url,
                data: data,
                headers: {'Content-Type': 'application/json;charset=utf-8'}
            }).success(function(data) {
                deferred.resolve(data);
            }).error(deferred.reject);
            return deferred.promise;
        }
    };
});
