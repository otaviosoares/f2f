(function() {
  'use strict';

  angular
    .module('app.match')
    .factory('MatchService', MatchService);

  MatchService.$inject = ['logger'];
  /* @ngInject */
  function MatchService(logger) {
    var service = {
      create: create
    };

    return service;

    function create() {
      logger.info('q isso jovem');
      return 's';
    }
  }

})();