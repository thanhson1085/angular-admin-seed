'use strict';
angular.module('sbAdminApp').factory('Helper', function ($cookies) {
    return {
        getOptionValueByKey: function (key, options) {
            var ret = options.filter(function(option){
                return (option.optionKey === key);
            });
            return ret[0];
        },
        getUserFields: function () {
            var options = JSON.parse($cookies.get('appConfig'));
            var ret = options.filter(function(option){
                return (option.optionKey === 'userFields');
            });
            return JSON.parse(ret[0].optionValue);
        },
        getTaxonomies: function () {
            var options = JSON.parse($cookies.get('appConfig'));
            var ret = options.filter(function(option){
                return (option.optionKey === 'taxonomies');
            });
            return JSON.parse(ret[0].optionValue);
        },
        getCurrentUserId: function () {
            var userInfo = JSON.parse($cookies.get('user_info'));
            return userInfo.id;
        },
        getTree: function getTree(parent, level) {
            level = level || 0;
            terms.forEach(function (a) {
                if (a.parent === parent) {
                    a.deep = level;
                    orderedTerms.push(a);
                    getTree(a.id, level + 1);
                }
            });
        }
    };
});
