'use strict';
angular.module('sbAdminApp').factory('Users', function($http, $q, APP_SERVICES) {
    return {
        get: function(){
            var deferred = $q.defer();
            var url = APP_SERVICES.users.list;
            $http.get(url).success(function(data) {
                deferred.resolve(data);
            }).error(deferred.reject);
            return deferred.promise;
        },
        login: function(username, password){
            var deferred = $q.defer();
            var url = APP_SERVICES.users.login;
            $http({
                method: 'POST',
                url: url,
                data: {username: username, password: password},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj){
                        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
                    }
                    return str.join('&');
                },
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function(data){
                // login success
                deferred.resolve(data);
            }).error(function(data){
                // login fails
                deferred.reject(data);
            });
            return deferred.promise;
        }
    };
});
