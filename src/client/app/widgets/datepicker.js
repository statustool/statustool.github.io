(function () {
  'use strict';

  angular
    .module('app.widgets')
    .directive('myDate', myDate);

  myDate.$inject = ['dateFilter'];
  /* @ngInject */
  function myDate(dateFilter) {
    var directive = {
      restrict: 'EAC',
      require: '?ngModel',
      link: function (scope, element, attrs, ngModel) {
        ngModel.$parsers.push(function (viewValue) {
          return dateFilter(viewValue, 'yyyy-MM-dd');
        });
      }
    };
    return directive;


  }

})();
