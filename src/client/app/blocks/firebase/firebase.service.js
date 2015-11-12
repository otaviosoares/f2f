(function() {
  'use strict';

  angular
    .module('app.firebase')
    .factory('FirebaseData', FirebaseData)
    .factory('FirebaseService', FirebaseService);

  function FirebaseData($window, config) {
    var _ref = new $window.Firebase(config.firebaseUrl);
    return _ref;
  }

  function FirebaseService(FirebaseData, $firebaseArray) {
    return {
      all: all
    };

    function all(childName) {
      return $firebaseArray(FirebaseData.child(childName));
    }
  }

})();