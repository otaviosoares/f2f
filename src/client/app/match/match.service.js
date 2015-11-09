(function() {
  'use strict';

  angular
    .module('app.match')
    .factory('MatchService', MatchService);

  MatchService.$inject = ['logger', 'FirebaseBaseService'];
  /* @ngInject */
  function MatchService(logger, FirebaseBaseService) {
    var service = {
      create: create
    };
    FirebaseBaseService.init('match');

    return service;

    function create(obj) {
      FirebaseBaseService.save(obj);
    }
  }
})();