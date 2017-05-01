(function () {
  'use strict';

  angular
    .module('app.layout')
    .directive('htTopNav', htTopNav);

  /* @ngInject */
  function htTopNav() {
    var directive = {
      bindToController: true,
      controller: TopNavController,
      controllerAs: 'vm',
      restrict: 'EA',
      scope: {
        'navline': '='
      },
      templateUrl: 'app/layout/ht-top-nav.html'
    };

    TopNavController.$inject = ['$scope', 'AuthenticationService', '$location'];

    /* @ngInject */
    function TopNavController($scope, AuthenticationService, $location) {
      var vm = this;
      $scope.isCollapsed = true;
      vm.logout = logout;

      function logout() {

        AuthenticationService.Logout(function (response) {
          if (response === true) {
            $location.path('/login');
          }
        });

      }

    }

    return directive;
  }
})();
