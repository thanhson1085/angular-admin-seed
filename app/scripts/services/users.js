'use strict';
angular.module('sbAdminApp').factory('Users', function($http, $q, APP_SERVICES) {
    return {
        get: function(page, limit){
            var deferred = $q.defer();
            var url = APP_SERVICES.users.list + '?page=' + page + '&limit=' + limit;
            $http.get(url).success(function(data) {
                deferred.resolve(data.users);
            }).error(deferred.reject);
            return deferred.promise;
        }
    };
});
