/* global toastr:false, moment:false server:192.168.1.21*/
(function() {
    'use strict';

    angular
        .module('app.core')
        .constant('toastr', toastr)
        .constant('moment', moment)
        .constant('USER_API', 'http://192.168.1.21:8011')
        .constant('PAYMENT_API', 'http://10.0.0.21:8011/');


})();