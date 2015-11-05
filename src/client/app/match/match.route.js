(function() {
  'use strict';

  angular
    .module('app.match')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [{
      state: 'match',
      config: {
        url: '/match/:id',
        templateUrl: 'app/match/match.html',
        controller: 'MatchController',
        controllerAs: 'vm',
        title: 'Match',
        settings: {
          nav: 2,
          content: '<i class="fa fa-lock"></i> Match'
        }
      }
    }];
  }
})();