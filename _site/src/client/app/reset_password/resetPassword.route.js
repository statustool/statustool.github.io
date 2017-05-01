(function () {
  'use strict';

  angular
    .module('app.resetPassword')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'resetPassword',
        config: {
          url: '/resetPassword',
          templateUrl: 'app/reset_password/resetPassword.html',
          controller: 'ResetPasswordController',
          controllerAs: 'vm',
          title: 'Reset Password',
          access: {
            restricted: false,
            role: 'ANNONYMOUS'
          },
          data: {
            authenticate: false,
            roles: ['ANNONYMOUS', 'ADT']
          }
        }
      }
    ];
  }
})();
