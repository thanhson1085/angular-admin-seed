'use strict';
/**
 * @ngdoc overview
 * @name sbAdminApp
 * @description
 * # sbAdminApp
 *
 * Main module of the application.
 */
angular
.module('sbAdminApp')
.config(function ($translateProvider) {
    $translateProvider.useMissingTranslationHandlerLog();
})
.config(function ($compileProvider, APP_CONFIG) {
    if (!APP_CONFIG.debug_mode) {
        $compileProvider.debugInfoEnabled(false);// disables AngularJS debug info
    }
})
.config(function ($translateProvider, APP_CONFIG) {
    if (APP_CONFIG.debug_mode) {
        $translateProvider.useMissingTranslationHandlerLog();// warns about missing translates
    }

    $translateProvider.useStaticFilesLoader({
        prefix: 'resources/locale-',
        suffix: '.json'
    });

    $translateProvider.preferredLanguage(APP_CONFIG.locales.preferredLocale);
    $translateProvider.useLocalStorage();
})
.config(function (tmhDynamicLocaleProvider) {
    tmhDynamicLocaleProvider.localeLocationPattern('bower_components/angular-i18n/angular-locale_{{locale}}.js');
})
.config(['$stateProvider','$urlRouterProvider','$ocLazyLoadProvider', '$httpProvider',
        function ($stateProvider,$urlRouterProvider,$ocLazyLoadProvider, $httpProvider) {

    $ocLazyLoadProvider.config({
        debug:false,
        events:true,
    });

    $urlRouterProvider.otherwise('/dashboard/home');

    $stateProvider
    .state('login',{
        templateUrl:'views/pages/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'vm',
        url:'/login',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                    {
                        name:'sbAdminApp',
                        files:[
                            'scripts/controllers/login.js',
                            'scripts/services/users.js',
                            'scripts/services/httpi.js',
                            'scripts/services/locale.js',
                            'scripts/directives/locale/locale.js'
                        ]
                    });
            }
        }
    })
    .state('register',{
        templateUrl:'views/pages/register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'vs',
        url:'/register',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                    {
                        name:'sbAdminApp',
                        files:[
                            'scripts/controllers/register.js',
                            'scripts/services/users.js',
                            'scripts/services/httpi.js',
                            'scripts/services/locale.js',
                            'scripts/directives/locale/locale.js'
                        ]
                    });
            }
        }
    })
    .state('thankyou',{
        templateUrl:'views/pages/thankyou.html',
        controller: 'ThankyouCtrl',
        url:'/thankyou',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                    {
                        name:'sbAdminApp',
                        files:[
                            'scripts/controllers/register.js'
                        ]
                    });
            }
        }
    })
    .state('activate',{
        templateUrl:'views/pages/activate.html',
        controller: 'ActivateCtrl',
        url:'/activate',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                    {
                        name:'sbAdminApp',
                        files:[
                            'scripts/controllers/register.js'
                        ]
                    });
            }
        }
    })
    .state('dashboard', {
        url:'/dashboard',
        templateUrl: 'views/dashboard/main.html',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                    {
                        name:'sbAdminApp',
                        files:[
                            'scripts/directives/header/header.js',
                            'scripts/directives/header/header-notification/header-notification.js',
                            'scripts/directives/sidebar/sidebar.js',
                            'scripts/directives/sidebar/sidebar-search/sidebar-search.js',
                            'scripts/services/httpi.js',
                            'scripts/services/locale.js',
                            'scripts/directives/locale/locale.js'
                        ]
                    });
            }
        }
    })
    .state('dashboard.home',{
        url:'/home',
        templateUrl:'views/dashboard/home.html',
        resolve: {
            loadMyFiles:function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name:'sbAdminApp',
                    files:[
                        'scripts/directives/timeline/timeline.js',
                        'scripts/directives/notifications/notifications.js',
                        'scripts/directives/chat/chat.js',
                        'scripts/directives/dashboard/stats/stats.js'
                    ]
                });
            }
        }
    })
    .state('dashboard.user_setting',{
        templateUrl:'views/users/setting.html',
        url:'/users/setting',
    })
    .state('dashboard.user_view',{
        templateUrl:'views/users/view.html',
        controller:'ViewUserCtrl',
        url:'/users/view/:id',
        resolve: {
            loadMyFiles:function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name:'sbAdminApp',
                    files:[
                        'scripts/controllers/users.js',
                        'scripts/services/users.js',
                    ]
                });
            }
        }
    })
    .state('dashboard.users',{
        templateUrl:'views/users/list.html',
        controller:'ListUserCtrl',
        url:'/users/:page/:limit',
        resolve: {
            loadMyFiles:function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name:'sbAdminApp',
                    files:[
                        'scripts/controllers/users.js',
                        'scripts/services/users.js',
                    ]
                });
            }
        }
    });
    $httpProvider.interceptors.push('httpRequestInterceptor');
}])
.run(['$location', '$cookies', '$rootScope', function($location, $cookies, $rootScope){
    // keep user logged in after page refresh
    var user_info = $cookies.get('user_info') || '{}';
    $rootScope.user_info = JSON.parse(user_info);
    $rootScope.$on('$locationChangeStart', function () {
        // redirect to login page if not logged in and trying to access a restricted page
        var restrictedPage = ['/login', '/register', '/thankyou', '/activate'].indexOf($location.path()) > -1;
        var loggedIn = ($rootScope.user_info)? $rootScope.user_info.token: false;
        if (!restrictedPage && !loggedIn){
            $location.path('/login');
        }
    });
    $rootScope.$on('unauthorized', function() {
        $location.path('/login');
    });
}])
.factory('httpRequestInterceptor', function ($rootScope, $cookies, $location) {
    var ret = {
        request: function (config) {
            var user_info = $cookies.get('user_info') || '{}';
            $rootScope.user_info = JSON.parse(user_info);
            config.headers.Authorization = $rootScope.user_info.token;
            return config;
        }
    };
    if ($location.path() !== '' && $location.path() !== '/login') {
        ret.responseError = function(response){
            if (response.status === 401) {
                $rootScope.$broadcast('unauthorized');
            }
            return response;
        };
    }
    return ret;
});
