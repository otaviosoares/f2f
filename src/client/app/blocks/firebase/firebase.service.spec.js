/* jshint -W117, -W030 */
describe('Firebase: Services', function() {
  beforeEach(function() {
    bard.appModule('app.firebase', 'angularFireMock');
    bard.inject('$window', 'config');
  });

  afterEach(function() {});

  //bard.verifyNoOutstandingHttpRequests();

  describe('FirebaseData', function() {
    beforeEach(function() {
      bard.inject();
      sinon.spy(window, 'Firebase');
      bard.inject('FirebaseData');
    });

    afterEach(function() {
      window.Firebase.restore();
    });

    it('should be create successfully', function() {
      expect(FirebaseData).to.be.defined;
    });

    it('should call Firebase constructor with firebaseUrl', function() {
      expect(Firebase).have.been.calledOnce;
      expect(Firebase).have.been.calledWith(config.firebaseUrl);
    });

    it('should create an instance of firebase', function() {
      expect(FirebaseData).to.be.instanceOf(Firebase);
    });

  });

  describe('FirebaseService', function() {
    beforeEach(function() {
      bard.inject('FirebaseService', 'angularFireMockUtils');
    });

    afterEach(function() {});
    it('should be create successfully', function() {
      expect(FirebaseService).to.be.defined;
    });

    it('should create an firebase array', function() {
      var testData = [1, 2, 3];
      angularFireMockUtils.setFakeData('test', testData);
      var firebaseArray = FirebaseService.all('test');
      expect(firebaseArray).to.equal(testData);
    });
  });
});