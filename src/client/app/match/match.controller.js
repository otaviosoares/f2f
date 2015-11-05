(function() {
  'use strict';

  angular
    .module('app.match')
    .controller('CreateMatchController', CreateMatchController)
    .controller('MatchController', MatchController);

  MatchController.$inject = CreateMatchController.$inject = ['logger', 'MatchService'];
  /* @ngInject */
  function MatchController(logger) {
    var vm = this;


    activate();

    function activate() {
      logger.info('Activated Match View');
    }
  }

  function CreateMatchController(logger, MatchService) {
    var vm = this;
    vm.match = {
      theme: 'default'
    };

    vm.create = create;

    activate();

    function activate() {
      logger.info('Activated Match View');
      // todo: choose theme

    }

    function create(match) {
      MatchService.create(match).catch(function(err) {
        logger.error(err);
      });
    }

  }

})();