(function () {
  'use strict';

  angular
    .module('app.resetPassword')
    .controller('ResetPasswordController', ResetPasswordController);

  ResetPasswordController.$inject = ['$state', 'AuthenticationService', 'toastr'];

  function ResetPasswordController($state, AuthenticationService, toastr) {
    var vm = this;

    vm.forgetPassword = forgetPassword;
    vm.dataLoading = false;

    (function initController() {
      // reset login status
      AuthenticationService.ClearCredentials();
    })();

    function forgetPassword() {
      vm.dataLoading = true;
      AuthenticationService.forgetPassword(vm.emailID)
        .then(function (response) {
            debugger
          if (response.status === 'success') {
            toastr.success('Password sent to your registered email ID')
          } else {
             debugger
            vm.dataLoading = false;
            toastr.error('No Such User Found , Please Enter Registered Email');
          }
        });
    }


  }

})();
