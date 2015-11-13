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
      all: all,
      add: add,
      save: save,
      remove: remove,
      getRecord: getRecord
    };

    function all(childName) {
      return $firebaseArray(FirebaseData.child(childName));
    }

    function add(firebaseArray, obj) {
      firebaseArray.$add(obj);
    }

    function save(firebaseArray, obj) {
      firebaseArray.$save(obj);
    }

    function remove(firebaseArray, arg) {
      firebaseArray.$remove(arg);
    }

    function getRecord(firebaseArray, id) {
      return firebaseArray.$getRecord(id);
    }
  }

})();