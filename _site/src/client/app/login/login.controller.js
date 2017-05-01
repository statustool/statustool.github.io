(function() {
    'use strict';

    angular
        .module('app.login')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$state', 'AuthenticationService', 'toastr'];

    function LoginController($state, AuthenticationService,toastr) {
        var vm = this;

        vm.login = login;
        vm.dataLoading = false;

        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        function login() {
            vm.dataLoading = true;
            AuthenticationService.Login(vm.username, vm.password)
                .then(function(response) {
                    if (response.status === 'success') {
                        AuthenticationService.SetCredentials(response);
                        if (response.results[0].roleID === 'MYB_AST') {
                            $state.go('mybAnalyst');
                        } else if (response.results[0].roleID === 'MYB_SUP') {
                            $state.go('mybsup');
                        } else if (response.results[0].roleID === 'MYS') {
                            $state.go('mys');
                        } else if (response.results[0].roleID === 'CUST_SUP') {
                            $state.go('customer');
                        }
                    } else {
                        vm.dataLoading = false;
                        if (response.message === 'no user found') {
                            response.message = 'Enter Correct Username and Password';
                        }
                        toastr.error(response.message);
                    }
                })
                .catch(function(err) {

                });
        }


    }

})();