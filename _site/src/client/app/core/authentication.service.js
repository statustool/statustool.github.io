(function() {
    'use strict';

    angular
        .module('app')
        .factory('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$http', '$cookieStore', '$rootScope', '$timeout',  '$window', 'USER_API'];

    function AuthenticationService($http, $cookieStore, $rootScope, $timeout, $window, USER_API) {
        var service = {};
        var url = USER_API;
        service.Login = Login;
        service.Logout = Logout;
        service.SetCredentials = SetCredentials;
        service.ClearCredentials = ClearCredentials;
        service.isAuthenticated = isAuthenticated;
        service.isUserLoggedIn = isUserLoggedIn;
        service.forgetPassword = forgetPassword;

        return service;

        function Login(username, password) {
            return $http({
                method: 'post',
                url: url + 'api/users/authentication',
                data: {
                    userName: username,
                    pwd: password
                }
            }).then(function successCallback(response) {
                return response.data;
            }).catch(function(error) {
                return { status: 'fail', message: 'Error in Connection' };
            });
        }

        function Logout(callback) {

            ClearCredentials(); // jshint ignore:line
            var response = true;
            callback(response);
        }

        function SetCredentials(user) {
            $rootScope.globals = {
                currentUser: {
                    userName: user.results[0].userName,
                    roleID: user.results[0].roleID,
                    token: user.token
                }
            };
            $window.sessionStorage.token = user.token;
            $cookieStore.put('globals', $rootScope.globals);
        }

        function isAuthenticated(data) {

            $rootScope.globals = $cookieStore.get('globals') || {};
            if ($rootScope.globals.currentUser === undefined ||
                data.roles.indexOf($rootScope.globals.currentUser.roleID) === -1) {
                return false;
            } else {
                return true;
            }
        }

        function isUserLoggedIn() {
            $rootScope.globals = $cookieStore.get('globals') || {};
            if ($rootScope.globals.currentUser) {
                return $rootScope.globals.currentUser;
            } else {
                return false;
            }
        }

        function ClearCredentials() {

            $rootScope.globals = {};
            $cookieStore.remove('globals');
            delete $window.sessionStorage.token;
        }

        function forgetPassword(emailID) {
            return $http({
                method: 'POST',
                url: USER_API + 'api/users/forgotPassword',
                data: {
                    'emailID': emailID
                }

            }).then(function successCallback(response) {
                return response.data;
            }, function errorCallback(response) {
                return response.data;
            });




        }

    }
})();