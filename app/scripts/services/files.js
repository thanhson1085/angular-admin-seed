'use strict';
angular.module('sbAdminApp').factory('Files', function (Upload, $q, APP_CONFIG) {
    return {
        upload: function (files) {
            var deferred = $q.defer();
            var url = APP_CONFIG.services.files.upload;
            files.upload = Upload.upload({
                url: url,
                fields: {
                },
                file: files
            }).success(function (data) {
                deferred.resolve(data);
            }).error(deferred.reject);
            return deferred.promise;
        }
    };
});
