'use strict';
angular.module('sbAdminApp').factory('Helper', function () {
    return {
        getOptionValueByKey: function (key, options) {
            var ret = options.filter(function(option){
                return (option.optionKey === key);
            });
            return ret[0];
        }
    };
});
