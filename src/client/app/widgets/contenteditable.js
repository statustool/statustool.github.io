(function () {
  'use strict';

  angular
    .module('app.widgets')
    .directive('contenteditable', contenteditable);

  contenteditable.$inject = [];
  /* @ngInject */
  function contenteditable(dateFilter) {
    var directive = {
    restrict: "A",
    require: "ngModel",
    link: function(scope, element, attrs, ngModel) {

      function read() {
        ngModel.$setViewValue(element.html());
      }

      ngModel.$render = function() {
        element.html(ngModel.$viewValue || "");
      };

      element.bind("blur keyup change", function() {
        scope.$apply(read);
      });
    }
  };
    return directive;


  }

})();
