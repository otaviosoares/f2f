(function() {
  'use strict';

  angular
    .module('app.match')
    .controller('CreateMatchController', CreateMatchController)
    .controller('MatchController', MatchController);

  MatchController.$inject = ['logger'];
  /* @ngInject */
  function MatchController(logger) {
    var vm = this;


    activate();

    function activate() {
      logger.info('Activated Match View');
    }
  }

  CreateMatchController.$inject = ['$state', 'logger', 'MatchService'];

  function CreateMatchController($state, logger, MatchService) {
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
      var service = MatchService.create(match)
        .then(function(data) {
          $state.go('match', {
            id: data.id
          });
        })
        .catch(function(err) {
          logger.error(err);
        });
    }

  }

})();