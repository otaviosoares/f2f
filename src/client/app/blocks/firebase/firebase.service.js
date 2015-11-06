(function() {
  'use strict';

  angular
    .module('app.firebase')
    .service('FirebaseBaseService', FirebaseBaseService);

  function FirebaseBaseService($window, config) {
    var _ref = null;
    this.init = function(modelName) {
      _ref = new $window.Firebase(config.firebaseUrl + modelName);
    };
    this.get = function(argument) {
      return _ref;
    };
    this.push = function(obj) {
      _ref.push(obj);
    };
  }

})();