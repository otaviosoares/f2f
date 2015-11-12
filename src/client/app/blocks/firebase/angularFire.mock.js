/* jshint -W117, -W030 */
(function() {
  'use strict';
  angular.module('angularFireMock', []);
  angular.module('angularFireMock')
    .run(function() {
      MockFirebase.override();
    });

  window.$MockFirebaseArray = function(ref) {
    return $MockFirebaseArrayData[ref.myName] || [];
  };
  window.$MockFirebaseArrayData = {};
  angular.module('angularFireMock')
    .value('Firebase', window.mockfirebase.MockFirebase)
    .factory('angularFireMockUtils', function() {
      return {
        setFakeData: setFakeData
      };

      function setFakeData(child, data) {
        window.$MockFirebaseArrayData[child] = data;
      }
    })
    .factory('$firebaseArray', function() {
      return window.$MockFirebaseArray;
    });
})();