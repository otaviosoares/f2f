/* jshint -W117, -W030 */
describe('DashboardController', function() {
  var controller;
  var people = mockData.getMockPeople();

  beforeEach(function() {
    bard.appModule('app.dashboard');
    bard.inject('$controller', '$log', '$rootScope');
  });

  beforeEach(function() {
    //sinon.stub(dataservice, 'getPeople').returns($q.when(people));
    controller = $controller('DashboardController');
    $rootScope.$apply();
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('Dashboard controller', function() {
    it('should be created successfully', function() {
      expect(controller).to.be.defined;
    });

    describe('after activate', function() {});
  });
});