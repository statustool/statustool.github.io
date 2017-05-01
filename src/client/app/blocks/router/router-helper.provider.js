/* Help configure the state-base ui.router */
(function () {
  'use strict';

  angular
    .module('blocks.router')
    .provider('routerHelper', routerHelperProvider);

  routerHelperProvider.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
  /* @ngInject */
  function routerHelperProvider($locationProvider, $stateProvider, $urlRouterProvider) {
    /* jshint validthis:true */
    var config = {
      docTitle: undefined,
      resolveAlways: {}
    };

    if (!(window.history && window.history.pushState)) {
      window.location.hash = '/';
    }

    $locationProvider.html5Mode(true);

    this.configure = function (cfg) {
      angular.extend(config, cfg);
    };

    this.$get = RouterHelper;
    RouterHelper.$inject = ['$location', '$rootScope', '$state', 'logger', 'AuthenticationService', '$cookieStore'];
    /* @ngInject */
    function RouterHelper($location, $rootScope, $state, logger, AuthenticationService, $cookieStore) {
      var handlingStateChangeError = false;
      var hasOtherwise = false;
      var stateCounts = {
        errors: 0,
        changes: 0
      };

      var service = {
        configureStates: configureStates,
        getStates: getStates,
        stateCounts: stateCounts,
        handleRoutingAuthorize: handleRoutingAuthorize
      };

      init();

      return service;

      ///////////////


      function configureStates(states, otherwisePath) {

        states.forEach(function (state) {
          state.config.resolve =
            angular.extend(state.config.resolve || {}, config.resolveAlways);
          $stateProvider.state(state.state, state.config);
        });
        if (otherwisePath && !hasOtherwise) {
          hasOtherwise = true;
          $urlRouterProvider.otherwise(otherwisePath);
        }
      }

      function handleRoutingErrors() {
        // Route cancellation:
        // On routing error, go to the dashboard.
        // Provide an exit clause if it tries to do it twice.
        $rootScope.$on('$stateChangeError',
          function (event, toState, toParams, fromState, fromParams, error) {
            if (handlingStateChangeError) {
              return;
            }

            stateCounts.errors++;
            handlingStateChangeError = true;
            var destination = (toState &&
                (toState.title || toState.name || toState.loadedTemplateUrl)) ||
              'unknown target';
            var msg = 'Error routing to ' + destination + '. ' +
              (error.data || '') + '. <br/>' + (error.statusText || '') +
              ': ' + (error.status || '');
            logger.warning(msg, [toState]);
            $location.path('/');
          }
        );
      }


      function handleRoutingAuthorize() {
        // Route cancellation:
        // On routing error, go to the login.
        // Provide an exit clause if it tries to do it twice.
        $rootScope.$on('$stateChangeStart',
          function (event, toState, toParams, fromState, fromParams, error) {


            // $rootScope.globals = $cookieStore.get('globals') || {};


            // if (toState.data !== undefined && toState.data.authenticate && !AuthenticationService.isAuthenticated(toState.data)) {
            //   // User isn’t authenticated
            //   $state.transitionTo('login');
            //   event.preventDefault();
            // }


          }
        );
      }

      function init() {
        handleRoutingErrors();
        updateDocTitle();
        handleRoutingAuthorize();
      }

      function getStates() {
        return $state.get();
      }

      function updateDocTitle() {
        $rootScope.$on('$stateChangeSuccess',
          function (event, toState, toParams, fromState, fromParams) {
            stateCounts.changes++;
            handlingStateChangeError = false;
            var title = config.docTitle + ' ' + (toState.title || '');
            $rootScope.title = title; // data bind to <title>
            // if (toState.params && toState.params.autoActivateChild) {
            //   $state.go(toState.params.autoActivateChild);
            // }
            // var currentUser = $rootScope.globals.currentUser;

            // if (currentUser === undefined) {

            //   if (!toState.url.includes('/register') && !toState.url.includes('/resetPassword')) {
            //     $state.go('login');
            //   }
            // } else if (toState.url === '/') {
            //   if (currentUser.roleID === 'MYB_AST') {
            //     $state.go('mybAnalyst');
            //   } else if (currentUser.roleID === 'MYB_SUP') {
            //     $state.go('mybsup');
            //   } else if (currentUser.roleID === 'MYS') {
            //     $state.go('mys');
            //   } else if (currentUser.roleID === 'CUST_SUP') {
            //     $state.go('welcome');
            //   }
            // }

            document.body.scrollTop = 0 ;
            document.documentElement.scrollTop = 0;
            $rootScope.previousState = fromState.name;
            $rootScope.currentState = toState.name;
          }
        );
      }
    }
  }
})();
