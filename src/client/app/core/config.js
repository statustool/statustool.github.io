(function() {
    'use strict';

    var core = angular.module('app.core');

    core.config(toastrConfig);

    toastrConfig.$inject = ['toastr'];
    /* @ngInject */
    function toastrConfig(toastr) {
        toastr.options.timeOut = 4000;
        toastr.options.positionClass = 'toast-bottom-right';
    }

    var config = {
        appErrorPrefix: '[StatusTrackerTool Error] ',
        appTitle: 'StatusTrackerTool'
    };

    core.value('config', config);

    core.config(configure);

    configure.$inject = ['$logProvider', 'routerHelperProvider', 'exceptionHandlerProvider'];
    /* @ngInject */
    function configure($logProvider, routerHelperProvider, exceptionHandlerProvider) {
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }
        exceptionHandlerProvider.configure(config.appErrorPrefix);
        routerHelperProvider.configure({
            docTitle: config.appTitle + ': '
        });
    }

    core.config(httpConfig);
    httpConfig.$inject = ['$httpProvider'];

    function httpConfig($httpProvider) {

        $httpProvider.interceptors.push(function($q, $rootScope, $location) {
            return {
                'request': function(config) {
                    config.headers = config.headers || {};

                    if ($rootScope.globals !== undefined && $rootScope.globals.hasOwnProperty('currentUser')) {
                        config.headers.token = $rootScope.globals.currentUser.token;
                    }


                    return config || $q.when(config);
                },
                'responseError': function(response) {

                    if (response.status === 401 || response.status === 403) {
                        $location.path('/login');
                    }
                    return $q.reject(response);
                }
            };
        });

    }


})();