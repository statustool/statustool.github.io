/**
 * Created by hostra on 26/9/16.
 */
(function() {
    'use strict';
    angular
        .module('app')
        .factory('IndividualTrackerUpdateService', IndividualTrackerUpdateService);

    IndividualTrackerUpdateService.$inject = ['$http', 'PAYMENT_API'];

    function IndividualTrackerUpdateService($http, PAYMENT_API) {
        var service = {

        };
        var url = PAYMENT_API;


        return service;

       
    }

})();