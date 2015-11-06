/* jshint -W117, -W030 */
describe('Firebase: Service', function() {
  var service;
  beforeEach(function() {
    bard.appModule('app.firebase');
    bard.inject('config', 'FirebaseBaseService', '$rootScope', '$window');
    service = FirebaseBaseService;
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('service init', function() {
    beforeEach(function() {
      sinon.stub($window, 'Firebase');
    });

    afterEach(function() {
      $window.Firebase.restore();
    });

    it('should be create successfully', function() {
      expect(service).to.be.defined;
    });

    it('should create an instance of firebase', function() {
      service.init('test');
      expect(Firebase).have.been.calledOnce;
      expect(Firebase).have.been.calledWith(config.firebaseUrl + 'test');
    });

    it('should keep its state even if called twice', function() {
      service.init('test');
      service.init('again');
      console.log(service.get());
      expect(Firebase).have.been.calledWith(config.firebaseUrl + 'test');
    });

  });
});