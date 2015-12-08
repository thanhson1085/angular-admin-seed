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
        getOptionId: function (key) {
            var options = JSON.parse($cookies.get('appConfig'));
            var ret = options.filter(function(option){
                return (option.optionKey === key);
            });
            return parseInt(ret[0].id);
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
        sortTree: function(array) {
            var temp = {},
                result = [];
            function getTree(parent, level) {
                temp[parent] && temp[parent].forEach(function (a) {
                    array[a].deep = level;
                    result.push(array[a]);
                    getTree(array[a].id, level + 1);
                });
            }

            array.forEach(function (a, i) {
                temp[a.parent] = temp[a.parent] || [];
                temp[a.parent].push(i);
            });
            getTree(null, 0);
            return result;
        },
        transformRequestEncodeURI: function(obj) {
            var str = [];
            for(var p in obj){
                str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
            }
            return str.join('&');
        }
    };
});
