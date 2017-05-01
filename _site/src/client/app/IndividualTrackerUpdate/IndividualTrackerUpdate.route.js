(function() {
    'use strict';

    angular
        .module('app.IndividualTrackerUpdate')
        .run(appRun).directive('daterangepicker', daterangepicker);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function daterangepicker() {
        var directive = {
            link: link,
            restrict: 'EA',
            templateUrl: 'app/IndividualTrackerUpdate/IndividualTrackerUpdate.html',
            controller: 'IndividualTrackerUpdateController',
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;
    }

    function getStates() {
        return [{
            state: 'IndividualTrackerUpdate',
            config: {
                url: '/IndividualTrackerUpdate',
                templateUrl: 'app/IndividualTrackerUpdate/IndividualTrackerUpdate.html',
                controller: 'IndividualTrackerUpdateController',
                controllerAs: 'vm',
                title: 'Individual Tracker Update',
                data: {
                    authenticate: false,
                    roles: []
                }
            }
        }];
    }
})();