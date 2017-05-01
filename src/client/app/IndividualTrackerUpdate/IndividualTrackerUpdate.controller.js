(function() {
    'use strict';

    angular
        .module('app.IndividualTrackerUpdate')
        .controller('IndividualTrackerUpdateController', IndividualTrackerUpdateController);


    IndividualTrackerUpdateController.$inject = ['IndividualTrackerUpdateService', 'toastr', '$rootScope'];

    function IndividualTrackerUpdateController(IndividualTrackerUpdateService, toastr, $rootScope) {
               
    }
})();