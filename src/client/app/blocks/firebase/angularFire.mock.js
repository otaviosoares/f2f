/**
 * bardjs - Spec helpers for testing angular v.1.x apps with Mocha, Jasmine or QUnit
 * @authors John Papa,Ward Bell
 * @version v0.1.8
 * @link https://github.com/wardbell/bardjs
 * @license MIT
 */
/*jshint -W079, -W117 */
(function() {
  angular.module('angularFireMock', []);

  angular.module('angularFireMock')
    .value('Firebase', window.mockfirebase.MockFirebase)
    .factory('$firebaseArray', function() {
      return MockFirebaseArray;
    });

  angular.module('angularFireMock')
    .run(function() {
      MockFirebase.override();
    });

  var angularFireMock = {
    addFakeData: addFakeData,
    debugging: angularFireMockDebugging,
    log: angularFireMockLog,
    $flush: $flush
  };

  var global = (function() {
    return this;
  })();
  var clearFakeData = [];
  var debugging = false;
  var firebaseArrayData = {};

  // mocha/jasmine/QUnit fns
  var afterEach = global.afterEach || global.teardown;
  var beforeEach = global.beforeEach || global.setup;
  beforeEach(function angularFireBeforeEach() {});

  afterEach(function angularFireAfterEach() {
    angular.forEach(clearFakeData, function(name) {
      angularFireMock.log('Clear fake data of child ' + name);
      delete global[name];
    });
    clearFakeData.length = 0;
  });

  global.angularFireMock = angular.extend(global.angularFireMock || {}, angularFireMock);

  function MockFirebaseArray(ref) {
    if (!(this instanceof MockFirebaseArray)) {
      return new MockFirebaseArray(ref);
    }
    var self = this;
    this._ref = ref;
    this.$list = firebaseArrayData[this._ref.myName] || [];
    utils.getPublicMethods(self, function(fn, key) {
      self.$list[key] = fn.bind(self);
    });

    return this.$list;
  }

  MockFirebaseArray.prototype = {
    $add: function(data) {
      this.$list.push(data);
    },
    $save: function(data) {
      var obj = this.$getRecord(data.$id);
      var index = this.$list.indexOf(obj);
      this.$list.splice(index, 1, data);
    },
    $remove: function(arg) {
      var index = this.$list.indexOf(arg);
      if (index < 0) {
        index = arg;
      }
      this.$list.splice(index, 1);
    },
    $getRecord: function(id) {
      return this.$list.filter(function(el) {
        return el.$id === id;
      })[0] || null;
    }
  };

  /**
   * Add fake data to fake firebaseArray
   */
  function addFakeData(child, data) {
    angularFireMock.log('Add fake data to child ' + child);
    clearFakeData.push(child);
    firebaseArrayData[child] = data;
  }

  /**
   * get/set angularFireMock debugging flag
   */
  function angularFireMockDebugging(x) {
    if (typeof x !== 'undefined') {
      debugging = !!x;
    }
    return debugging;
  }

  /**
   * Write to console if bard debugging flag is on
   */
  function angularFireMockLog(msg) {
    if (debugging) {
      console.log('---angularFireMock (' + (logCounter += 1) + ') ' + msg);
    }
  }

  function $flush() {

  }

  var utils = {
    getPrototypeMethods: function(inst, iterator, context) {
      var methods = {};
      var objProto = Object.getPrototypeOf({});
      var proto = angular.isFunction(inst) && angular.isObject(inst.prototype) ?
        inst.prototype : Object.getPrototypeOf(inst);
      while (proto && proto !== objProto) {
        for (var key in proto) {
          // we only invoke each key once; if a super is overridden it's skipped here
          if (proto.hasOwnProperty(key) && !methods.hasOwnProperty(key)) {
            methods[key] = true;
            iterator.call(context, proto[key], key, proto);
          }
        }
        proto = Object.getPrototypeOf(proto);
      }
    },

    getPublicMethods: function(inst, iterator, context) {
      utils.getPrototypeMethods(inst, function(m, k) {
        if (typeof(m) === 'function' && k.charAt(0) !== '_') {
          iterator.call(context, m, k);
        }
      });
    }
  };

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
  if (!Function.prototype.bind) {
    Function.prototype.bind = function(oThis) {
      if (typeof this !== 'function') {
        // closest thing possible to the ECMAScript 5
        // internal IsCallable function
        throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
      }

      var aArgs = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP = function() {},
        fBound = function() {
          return fToBind.apply(this instanceof fNOP && oThis ? this : oThis,
            aArgs.concat(Array.prototype.slice.call(arguments)));
        };

      fNOP.prototype = this.prototype;
      fBound.prototype = new fNOP();

      return fBound;
    };
  }
})();