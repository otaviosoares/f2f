(function() {
  'use strict';

  angular
    .module('app.match')
    .factory('MatchService', MatchService);

  MatchService.$inject = ['logger', 'FirebaseData'];
  /* @ngInject */
  function MatchService(logger, FirebaseData) {
    var service = {
      create: create
    };
    //FirebaseBaseService.init('match');

    return service;

    function create(obj) {
      //FirebaseBaseService.save(obj);
    }
  }
})();