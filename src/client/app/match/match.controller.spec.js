/* jshint -W117, -W030 */
describe('Match: Controller', function() {
  var controller;

  beforeEach(function() {
    module('app.match');
    module('stateMock');
    bard.inject('$controller', '$log', '$rootScope');
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('Match controller', function() {

    beforeEach(function() {
      controller = $controller('MatchController');
      $rootScope.$apply();
    });

    it('should be created successfully', function() {
      expect(controller).to.be.defined;
    });

    describe('after activate', function() {

      it('should have logged "Activated"', function() {
        expect($log.info.logs).to.match(/Activated/);
      });
    });
  });

  describe('CreateMatch controller', function() {

    beforeEach(function() {
      controller = $controller('CreateMatchController');
      $rootScope.$apply();
    });

    it('should be created successfully', function() {
      expect(controller).to.be.defined;
    });

    it('should have default theme', function() {
      expect(controller.match.theme).to.equal('default');
    });

    describe('after activate', function() {

      it('should have logged "Activated"', function() {
        expect($log.info.logs).to.match(/Activated/);
      });

    });

    describe('on create', function() {
      var match = {
        'id': '123asd',
        'theme': 'default',
        'players': ['me']
      };
      beforeEach(function() {
        bard.inject('MatchService', '$q', '$log');
      });

      describe('where create fails', function() {
        var errorMsg = 'something went wrong';
        beforeEach(function() {
          sinon.stub(MatchService, 'create').returns($q.reject(errorMsg));
        });

        it('should log the error', function() {
          controller.create(match);
          $rootScope.$apply();
          expect($log.error.logs).to.match(new RegExp(errorMsg));
        });
      });

      describe('where create succeds', function() {
        beforeEach(function() {
          bard.inject('$state');
          sinon.stub(MatchService, 'create').returns($q.when(match));
          $state.expectTransitionTo('match');
        });

        it('should redirect to match/:id', function() {
          controller.create(match);
          $rootScope.$apply();
          $state.ensureAllTransitionsHappened();
        });

        it('should call the create service', function() {
          controller.create(match);
          expect(MatchService.create).have.been.calledOnce;
          expect(MatchService.create).have.been.calledWith(match);
        });
      });

    });

  });
});