(function() {
    'use strict';

    angular
        .module('app.core', [
            'ngAnimate', 'ngSanitize',
            'blocks.exception', 'blocks.logger', 'blocks.router', 'ui.validate', 'angularFileUpload',
            'ui.router', 'ngplus', 'ui.bootstrap', 'ngCookies', 'angular.filter', 'angularUtils.directives.dirPagination', 'daterangepicker'
        ]);
})();