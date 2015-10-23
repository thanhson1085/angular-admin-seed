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
        }
    };
});
