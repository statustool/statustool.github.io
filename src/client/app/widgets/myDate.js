(function() {
    'use strict';

    angular
        .module('app')
        .filter('jsDate', function() {
            return function(x) {
                return new Date(x);
            };
        });

})();