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
      bard.inject('FirebaseService');
    });

    it('should be create successfully', function() {
      expect(FirebaseService).to.be.defined;
    });

    describe('$firebaseArray', function() {
      var firebaseArray;
      beforeEach(function() {
        firebaseArray = FirebaseService.all('test');
      });
      it('should be initialized with an empty array', function() {
        expect(firebaseArray).to.be.empty;
      });

      it('should create an firebase array with data', function() {
        var testData = [1, 2, 3];
        angularFireMock.addFakeData('withdata', testData);
        var fireBaseWithData = FirebaseService.all('withdata');
        expect(fireBaseWithData).to.equal(testData);
      });

      it('should add a new object to array', function() {
        FirebaseService.add(firebaseArray, 'mock');
        expect(firebaseArray).to.have.length(1);
        expect(firebaseArray[0]).to.equal('mock');
      });

      it('should save changes to an existing object', function() {
        FirebaseService.add(firebaseArray, {
          $id: 'test',
          name: 'Test 1'
        });
        var obj = angular.copy(FirebaseService.getRecord(firebaseArray, 'test'));
        obj.name = 'Changed it';
        FirebaseService.save(firebaseArray, obj);
        expect(firebaseArray[0].name).to.equal(obj.name);
      });

      describe('getting records', function() {
        var newObj = {
          $id: 'mock-1',
          name: 'test'
        };
        beforeEach(function() {
          FirebaseService.add(firebaseArray, newObj);
        });
        it('should get an object from the array', function() {
          var obj = FirebaseService.getRecord(firebaseArray, newObj.$id);
          expect(obj).to.equal(newObj);
        });

        it('should get null if the id doesnt exist in array', function() {
          var obj = FirebaseService.getRecord(firebaseArray, 'non-existent-id');
          expect(obj).to.equal(null);
        });
      });
      describe('removing items', function() {
        beforeEach(function() {
          FirebaseService.add(firebaseArray, 'item 1');
          FirebaseService.add(firebaseArray, 'item 2');
          FirebaseService.add(firebaseArray, 'item 3');
        });

        it('should remove providing the object', function() {
          FirebaseService.remove(firebaseArray, 'item 1');
          expect(firebaseArray).to.have.length(2);
          expect(firebaseArray[0]).to.equal('item 2');
        });

        it('should remove providing the key', function() {
          FirebaseService.remove(firebaseArray, 0);
          FirebaseService.remove(firebaseArray, 0);
          expect(firebaseArray).to.have.length(1);
          expect(firebaseArray[0]).to.equal('item 3');
        });
      });
    });
  });
});