/* jshint -W117, -W030 */
describe('match routes', function() {
  describe('state', function() {
    var view = 'app/match/match.html';

    beforeEach(function() {
      module('app.match', bard.fakeToastr);
      bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
    });

    beforeEach(function() {
      $templateCache.put(view, '');
    });

    it('should map state match to url /match/:id ', function() {
      expect($state.href('match', {
        id: 1
      })).to.equal('/match/1');
    });

    it('should map /match route to match View template', function() {
      expect($state.get('match').templateUrl).to.equal(view);
    });

    it('of match should work with $state.go', function() {
      $state.go('match');
      $rootScope.$apply();
      expect($state.is('match'));
    });
  });
});