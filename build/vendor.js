'use strict';
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
      (global = global || self, factory(global.IMask = {}));
}(this, (function (exports) {

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
    return module = {exports: {}}, fn(module, module.exports), module.exports;
  }

  var check = function (it) {
    return it && it.Math == Math && it;
  }; 


  var global_1 = 
    check(typeof globalThis === 'object' && globalThis) || check(typeof window === 'object' && window) || check(typeof self === 'object' && self) || check(typeof commonjsGlobal === 'object' && commonjsGlobal) || 
    Function('return this')();

  var fails = function (exec) {
    try {
      return !!exec();
    } catch (error) {
      return true;
    }
  };



  var descriptors = !fails(function () {
    return Object.defineProperty({}, 1, {
      get: function () {
        return 7;
      }
    })[1] != 7;
  });

  var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
  var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; 

  var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({
    1: 2
  }, 1); 

  var f = NASHORN_BUG ? function propertyIsEnumerable(V) {
    var descriptor = getOwnPropertyDescriptor(this, V);
    return !!descriptor && descriptor.enumerable;
  } : nativePropertyIsEnumerable;

  var objectPropertyIsEnumerable = {
    f: f
  };

  var createPropertyDescriptor = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };

  var toString = {}.toString;

  var classofRaw = function (it) {
    return toString.call(it).slice(8, -1);
  };

  var split = ''.split; 

  var indexedObject = fails(function () {
    return !Object('z').propertyIsEnumerable(0);
  }) ? function (it) {
      return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
    } : Object;

  var requireObjectCoercible = function (it) {
    if (it == undefined) {
      throw TypeError('Can\'t call method on ' + it);
    }
    return it;
  };



  var toIndexedObject = function (it) {
    return indexedObject(requireObjectCoercible(it));
  };

  var isObject = function (it) {
    return typeof it === 'object' ? it !== null : typeof it === 'function';
  };



  var toPrimitive = function (input, PREFERRED_STRING) {
    if (!isObject(input)) {
      return input;
    }
    var fn; var val;
    if (PREFERRED_STRING && typeof (fn = input.toString) === 'function' && !isObject(val = fn.call(input))) {
      return val;
    }
    if (typeof (fn = input.valueOf) === 'function' && !isObject(val = fn.call(input))) {
      return val;
    }
    if (!PREFERRED_STRING && typeof (fn = input.toString) === 'function' && !isObject(val = fn.call(input))) {
      return val;
    }
    throw TypeError('Can\'t convert object to primitive value');
  };

  var hasOwnProperty = {}.hasOwnProperty;

  var has = function (it, key) {
    return hasOwnProperty.call(it, key);
  };

  var document$1 = global_1.document; 

  var EXISTS = isObject(document$1) && isObject(document$1.createElement);

  var documentCreateElement = function (it) {
    return EXISTS ? document$1.createElement(it) : {};
  };



  var ie8DomDefine = !descriptors && !fails(function () {
    return Object.defineProperty(documentCreateElement('div'), 'a', {
      get: function () {
        return 7;
      }
    }).a != 7;
  });

  var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; 

  var f$1 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject(O);
    P = toPrimitive(P, true);
    if (ie8DomDefine) {
      try {
        return nativeGetOwnPropertyDescriptor(O, P);
      } catch (error) {
      }
    }
    if (has(O, P)) {
      return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
    }
  };

  var objectGetOwnPropertyDescriptor = {
    f: f$1
  };

  var anObject = function (it) {
    if (!isObject(it)) {
      throw TypeError(String(it) + ' is not an object');
    }

    return it;
  };

  var nativeDefineProperty = Object.defineProperty; 

  var f$2 = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
    anObject(O);
    P = toPrimitive(P, true);
    anObject(Attributes);
    if (ie8DomDefine) {
      try {
        return nativeDefineProperty(O, P, Attributes);
      } catch (error) {
      }
    }
    if ('get' in Attributes || 'set' in Attributes) {
      throw TypeError('Accessors not supported');
    }
    if ('value' in Attributes) {
      O[P] = Attributes.value;
    }
    return O;
  };

  var objectDefineProperty = {
    f: f$2
  };

  var createNonEnumerableProperty = descriptors ? function (object, key, value) {
    return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var setGlobal = function (key, value) {
    try {
      createNonEnumerableProperty(global_1, key, value);
    } catch (error) {
      global_1[key] = value;
    }

    return value;
  };

  var SHARED = '__core-js_shared__';
  var store = global_1[SHARED] || setGlobal(SHARED, {});
  var sharedStore = store;

  var functionToString = Function.toString; 

  if (typeof sharedStore.inspectSource !== 'function') {
    sharedStore.inspectSource = function (it) {
      return functionToString.call(it);
    };
  }

  var inspectSource = sharedStore.inspectSource;

  var WeakMap = global_1.WeakMap;
  var nativeWeakMap = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));

  var shared = createCommonjsModule(function (module) {
    (module.exports = function (key, value) {
      return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
    })('versions', []).push({
      version: '3.6.4',
      mode: 'global',
      copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
    });
  });

  var id = 0;
  var postfix = Math.random();

  var uid = function (key) {
    return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
  };

  var keys = shared('keys');

  var sharedKey = function (key) {
    return keys[key] || (keys[key] = uid(key));
  };

  var hiddenKeys = {};

  var WeakMap$1 = global_1.WeakMap;
  var set; var get; var has$1;

  var enforce = function (it) {
    return has$1(it) ? get(it) : set(it, {});
  };

  var getterFor = function (TYPE) {
    return function (it) {
      var state;

      if (!isObject(it) || (state = get(it)).type !== TYPE) {
        throw TypeError('Incompatible receiver, ' + TYPE + ' required');
      }

      return state;
    };
  };

  if (nativeWeakMap) {
    var store$1 = new WeakMap$1();
    var wmget = store$1.get;
    var wmhas = store$1.has;
    var wmset = store$1.set;

    set = function (it, metadata) {
      wmset.call(store$1, it, metadata);
      return metadata;
    };

    get = function (it) {
      return wmget.call(store$1, it) || {};
    };

    has$1 = function (it) {
      return wmhas.call(store$1, it);
    };
  } else {
    var STATE = sharedKey('state');
    hiddenKeys[STATE] = true;

    set = function (it, metadata) {
      createNonEnumerableProperty(it, STATE, metadata);
      return metadata;
    };

    get = function (it) {
      return has(it, STATE) ? it[STATE] : {};
    };

    has$1 = function (it) {
      return has(it, STATE);
    };
  }

  var internalState = {
    set: set,
    get: get,
    has: has$1,
    enforce: enforce,
    getterFor: getterFor
  };

  var redefine = createCommonjsModule(function (module) {
    var getInternalState = internalState.get;
    var enforceInternalState = internalState.enforce;
    var TEMPLATE = String(String).split('String');
    (module.exports = function (O, key, value, options) {
      var unsafe = options ? !!options.unsafe : false;
      var simple = options ? !!options.enumerable : false;
      var noTargetGet = options ? !!options.noTargetGet : false;

      if (typeof value === 'function') {
        if (typeof key === 'string' && !has(value, 'name')) {
          createNonEnumerableProperty(value, 'name', key);
        }
        enforceInternalState(value).source = TEMPLATE.join(typeof key === 'string' ? key : '');
      }

      if (O === global_1) {
        if (simple) {
          O[key] = value;
        } else {
          setGlobal(key, value);
        }
        return;
      } else if (!unsafe) {
        delete O[key];
      } else if (!noTargetGet && O[key]) {
        simple = true;
      }

      if (simple) {
        O[key] = value;
      } else {
        createNonEnumerableProperty(O, key, value);
      } 
    })(Function.prototype, 'toString', function toString() {
      return typeof this === 'function' && getInternalState(this).source || inspectSource(this);
    });
  });

  var path = global_1;

  var aFunction = function (variable) {
    return typeof variable === 'function' ? variable : undefined;
  };

  var getBuiltIn = function (namespace, method) {
    return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global_1[namespace]) : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
  };

  var ceil = Math.ceil;
  var floor = Math.floor; 

  var toInteger = function (argument) {
    return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
  };

  var min = Math.min; 

  var toLength = function (argument) {
    return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; 
  };

  var max = Math.max;
  var min$1 = Math.min; 

  var toAbsoluteIndex = function (index, length) {
    var integer = toInteger(index);
    return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
  };



  var createMethod = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = toIndexedObject($this);
      var length = toLength(O.length);
      var index = toAbsoluteIndex(fromIndex, length);
      var value; 

      if (IS_INCLUDES && el != el) {
        while (length > index) {
          value = O[index++]; 

          if (value != value) {
            return true;
          } 
        }
      } else {
        for (; length > index; index++) {
          if ((IS_INCLUDES || index in O) && O[index] === el) {
            return IS_INCLUDES || index || 0;
          }
        }
      }
      return !IS_INCLUDES && -1;
    };
  };

  var arrayIncludes = {
    includes: createMethod(true),
    indexOf: createMethod(false)
  };

  var indexOf = arrayIncludes.indexOf;


  var objectKeysInternal = function (object, names) {
    var O = toIndexedObject(object);
    var i = 0;
    var result = [];
    var key;

    for (key in O) {
      !has(hiddenKeys, key) && has(O, key) && result.push(key);
    } 


    while (names.length > i) {
      if (has(O, key = names[i++])) {
        ~indexOf(result, key) || result.push(key);
      }
    }

    return result;
  };

  var enumBugKeys = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf'];

  var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype'); 

  var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return objectKeysInternal(O, hiddenKeys$1);
  };

  var objectGetOwnPropertyNames = {
    f: f$3
  };

  var f$4 = Object.getOwnPropertySymbols;

  var objectGetOwnPropertySymbols = {
    f: f$4
  };



  var ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
    var keys = objectGetOwnPropertyNames.f(anObject(it));
    var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
    return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
  };

  var copyConstructorProperties = function (target, source) {
    var keys = ownKeys(source);
    var defineProperty = objectDefineProperty.f;
    var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (!has(target, key)) {
        defineProperty(target, key, getOwnPropertyDescriptor(source, key));
      }
    }
  };

  var replacement = /#|\.prototype\./;

  var isForced = function (feature, detection) {
    var value = data[normalize(feature)];
    return value == POLYFILL ? true : value == NATIVE ? false : typeof detection === 'function' ? fails(detection) : !!detection;
  };

  var normalize = isForced.normalize = function (string) {
    return String(string).replace(replacement, '.').toLowerCase();
  };

  var data = isForced.data = {};
  var NATIVE = isForced.NATIVE = 'N';
  var POLYFILL = isForced.POLYFILL = 'P';
  var isForced_1 = isForced;

  var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;




  var _export = function (options, source) {
    var TARGET = options.target;
    var GLOBAL = options.global;
    var STATIC = options.stat;
    var FORCED; var target; var key; var targetProperty; var sourceProperty; var descriptor;

    if (GLOBAL) {
      target = global_1;
    } else if (STATIC) {
      target = global_1[TARGET] || setGlobal(TARGET, {});
    } else {
      target = (global_1[TARGET] || {}).prototype;
    }

    if (target) {
      for (key in source) {
        sourceProperty = source[key];

        if (options.noTargetGet) {
          descriptor = getOwnPropertyDescriptor$1(target, key);
          targetProperty = descriptor && descriptor.value;
        } else {
          targetProperty = target[key];
        }

        FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced); 

        if (!FORCED && targetProperty !== undefined) {
          if (typeof sourceProperty === typeof targetProperty) {
            continue;
          }
          copyConstructorProperties(sourceProperty, targetProperty);
        } 


        if (options.sham || targetProperty && targetProperty.sham) {
          createNonEnumerableProperty(sourceProperty, 'sham', true);
        } 


        redefine(target, key, sourceProperty, options);
      }
    }
  };



  var objectKeys = Object.keys || function keys(O) {
    return objectKeysInternal(O, enumBugKeys);
  };



  var toObject = function (argument) {
    return Object(requireObjectCoercible(argument));
  };

  var nativeAssign = Object.assign;
  var defineProperty = Object.defineProperty; 

  var objectAssign = !nativeAssign || fails(function () {
    if (descriptors && nativeAssign({
      b: 1
    }, nativeAssign(defineProperty({}, 'a', {
      enumerable: true,
      get: function () {
        defineProperty(this, 'b', {
          value: 3,
          enumerable: false
        });
      }
    }), {
      b: 2
    })).b !== 1) {
      return true;
    } 

    var A = {};
    var B = {}; 

    var symbol = Symbol();
    var alphabet = 'abcdefghijklmnopqrst';
    A[symbol] = 7;
    alphabet.split('').forEach(function (chr) {
      B[chr] = chr;
    });
    return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join('') != alphabet;
  }) ? function assign(target, source) {
      var T = toObject(target);
      var argumentsLength = arguments.length;
      var index = 1;
      var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
      var propertyIsEnumerable = objectPropertyIsEnumerable.f;

      while (argumentsLength > index) {
        var S = indexedObject(arguments[index++]);
        var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
        var length = keys.length;
        var j = 0;
        var key;

        while (length > j) {
          key = keys[j++];
          if (!descriptors || propertyIsEnumerable.call(S, key)) {
            T[key] = S[key];
          }
        }
      }

      return T;
    } : nativeAssign;



  _export({
    target: 'Object',
    stat: true,
    forced: Object.assign !== objectAssign
  }, {
    assign: objectAssign
  });



  var stringRepeat = ''.repeat || function repeat(count) {
    var str = String(requireObjectCoercible(this));
    var result = '';
    var n = toInteger(count);
    if (n < 0 || n == Infinity) {
      throw RangeError('Wrong number of repetitions');
    }

    for (; n > 0; (n >>>= 1) && (str += str)) {
      if (n & 1) {
        result += str;
      }
    }

    return result;
  };



  var ceil$1 = Math.ceil; 

  var createMethod$1 = function (IS_END) {
    return function ($this, maxLength, fillString) {
      var S = String(requireObjectCoercible($this));
      var stringLength = S.length;
      var fillStr = fillString === undefined ? ' ' : String(fillString);
      var intMaxLength = toLength(maxLength);
      var fillLen; var stringFiller;
      if (intMaxLength <= stringLength || fillStr == '') {
        return S;
      }
      fillLen = intMaxLength - stringLength;
      stringFiller = stringRepeat.call(fillStr, ceil$1(fillLen / fillStr.length));
      if (stringFiller.length > fillLen) {
        stringFiller = stringFiller.slice(0, fillLen);
      }
      return IS_END ? S + stringFiller : stringFiller + S;
    };
  };

  var stringPad = {
    start: createMethod$1(false),
    end: createMethod$1(true)
  };

  var engineUserAgent = getBuiltIn('navigator', 'userAgent') || '';



  var stringPadWebkitBug = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(engineUserAgent);

  var $padEnd = stringPad.end;



  _export({
    target: 'String',
    proto: true,
    forced: stringPadWebkitBug
  }, {
    padEnd: function padEnd(maxLength
    ) {
      return $padEnd(this, maxLength, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  var $padStart = stringPad.start;



  _export({
    target: 'String',
    proto: true,
    forced: stringPadWebkitBug
  }, {
    padStart: function padStart(maxLength
    ) {
      return $padStart(this, maxLength, arguments.length > 1 ? arguments[1] : undefined);
    }
  });



  _export({
    target: 'String',
    proto: true
  }, {
    repeat: stringRepeat
  });



  _export({
    global: true
  }, {
    globalThis: global_1
  });

  function _typeof(obj) {
    '@babel/helpers - typeof';

    if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ('value' in descriptor) {
        descriptor.writable = true;
      }
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) {
      _defineProperties(Constructor.prototype, protoProps);
    }
    if (staticProps) {
      _defineProperties(Constructor, staticProps);
    }
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
      throw new TypeError('Super expression must either be null or a function');
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) {
      _setPrototypeOf(subClass, superClass);
    }
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) {
      return {};
    }
    var target = {};
    var sourceKeys = Object.keys(source);
    var key; var i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) {
        continue;
      }
      target[key] = source[key];
    }

    return target;
  }

  function _objectWithoutProperties(source, excluded) {
    if (source == null) {
      return {};
    }

    var target = _objectWithoutPropertiesLoose(source, excluded);

    var key; var i;

    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) {
          continue;
        }
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) {
          continue;
        }
        target[key] = source[key];
      }
    }

    return target;
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === 'object' || typeof call === 'function')) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) {
        break;
      }
    }

    return object;
  }

  function _get(target, property, receiver) {
    if (typeof Reflect !== 'undefined' && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);

        if (!base) {
          return;
        }
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get(target, property, receiver || target);
  }

  function set$1(target, property, value, receiver) {
    if (typeof Reflect !== 'undefined' && Reflect.set) {
      set$1 = Reflect.set;
    } else {
      set$1 = function set(target, property, value, receiver) {
        var base = _superPropBase(target, property);

        var desc;

        if (base) {
          desc = Object.getOwnPropertyDescriptor(base, property);

          if (desc.set) {
            desc.set.call(receiver, value);
            return true;
          } else if (!desc.writable) {
            return false;
          }
        }

        desc = Object.getOwnPropertyDescriptor(receiver, property);

        if (desc) {
          if (!desc.writable) {
            return false;
          }

          desc.value = value;
          Object.defineProperty(receiver, property, desc);
        } else {
          _defineProperty(receiver, property, value);
        }

        return true;
      };
    }

    return set$1(target, property, value, receiver);
  }

  function _set(target, property, value, receiver, isStrict) {
    var s = set$1(target, property, value, receiver || target);

    if (!s && isStrict) {
      throw new Error('failed to set property');
    }

    return value;
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) {
      return arr;
    }
  }

  function _iterableToArrayLimit(arr, i) {
    if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === '[object Arguments]')) {
      return;
    }

    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) {
          break;
        }
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i['return'] != null) {
          _i['return']();
        }
      } finally {
        if (_d) {
          throw _e;
        }
      }
    }

    return _arr;
  }

  function _nonIterableRest() {
    throw new TypeError('Invalid attempt to destructure non-iterable instance');
  }

  function isString(str) {
    return typeof str === 'string' || str instanceof String;
  }

  var DIRECTION = {
    NONE: 'NONE',
    LEFT: 'LEFT',
    FORCE_LEFT: 'FORCE_LEFT',
    RIGHT: 'RIGHT',
    FORCE_RIGHT: 'FORCE_RIGHT'
  };

  function forceDirection(direction) {
    switch (direction) {
      case DIRECTION.LEFT:
        return DIRECTION.FORCE_LEFT;

      case DIRECTION.RIGHT:
        return DIRECTION.FORCE_RIGHT;

      default:
        return direction;
    }
  }

  function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|[\]/\\])/g, '\\$1');
  } 

  function objectIncludes(b, a) {
    if (a === b) {
      return true;
    }
    var arrA = Array.isArray(a);
    var arrB = Array.isArray(b);
    var i;

    if (arrA && arrB) {
      if (a.length != b.length) {
        return false;
      }

      for (i = 0; i < a.length; i++) {
        if (!objectIncludes(a[i], b[i])) {
          return false;
        }
      }

      return true;
    }

    if (arrA != arrB) {
      return false;
    }

    if (a && b && _typeof(a) === 'object' && _typeof(b) === 'object') {
      var dateA = a instanceof Date;
      var dateB = b instanceof Date;
      if (dateA && dateB) {
        return a.getTime() == b.getTime();
      }
      if (dateA != dateB) {
        return false;
      }
      var regexpA = a instanceof RegExp;
      var regexpB = b instanceof RegExp;
      if (regexpA && regexpB) {
        return a.toString() == b.toString();
      }
      if (regexpA != regexpB) {
        return false;
      }
      var keys = Object.keys(a); 

      for (i = 0; i < keys.length; i++) {
        if (!Object.prototype.hasOwnProperty.call(b, keys[i])) {
          return false;
        }
      }

      for (i = 0; i < keys.length; i++) {
        if (!objectIncludes(b[keys[i]], a[keys[i]])) {
          return false;
        }
      }

      return true;
    } else if (a && b && typeof a === 'function' && typeof b === 'function') {
      return a.toString() === b.toString();
    }

    return false;
  }


  var ActionDetails =
    function () {



      function ActionDetails(value, cursorPos, oldValue, oldSelection) {
        _classCallCheck(this, ActionDetails);

        this.value = value;
        this.cursorPos = cursorPos;
        this.oldValue = oldValue;
        this.oldSelection = oldSelection; 

        while (this.value.slice(0, this.startChangePos) !== this.oldValue.slice(0, this.startChangePos)) {
          --this.oldSelection.start;
        }
      }


      _createClass(ActionDetails, [{
        key: 'startChangePos',
        get: function get() {
          return Math.min(this.cursorPos, this.oldSelection.start);
        }

      }, {
        key: 'insertedCount',
        get: function get() {
          return this.cursorPos - this.startChangePos;
        }

      }, {
        key: 'inserted',
        get: function get() {
          return this.value.substr(this.startChangePos, this.insertedCount);
        }

      }, {
        key: 'removedCount',
        get: function get() {
          return Math.max(this.oldSelection.end - this.startChangePos || 
            this.oldValue.length - this.value.length, 0);
        }

      }, {
        key: 'removed',
        get: function get() {
          return this.oldValue.substr(this.startChangePos, this.removedCount);
        }

      }, {
        key: 'head',
        get: function get() {
          return this.value.substring(0, this.startChangePos);
        }

      }, {
        key: 'tail',
        get: function get() {
          return this.value.substring(this.startChangePos + this.insertedCount);
        }

      }, {
        key: 'removeDirection',
        get: function get() {
          if (!this.removedCount || this.insertedCount) {
            return DIRECTION.NONE;
          } 

          return this.oldSelection.end === this.cursorPos || this.oldSelection.start === this.cursorPos ? DIRECTION.RIGHT : DIRECTION.LEFT;
        }
      }]);

      return ActionDetails;
    }();

  var ChangeDetails =
    function () {



      function ChangeDetails(details) {
        _classCallCheck(this, ChangeDetails);

        Object.assign(this, {
          inserted: '',
          rawInserted: '',
          skip: false,
          tailShift: 0
        }, details);
      }


      _createClass(ChangeDetails, [{
        key: 'aggregate',
        value: function aggregate(details) {
          this.rawInserted += details.rawInserted;
          this.skip = this.skip || details.skip;
          this.inserted += details.inserted;
          this.tailShift += details.tailShift;
          return this;
        }

      }, {
        key: 'offset',
        get: function get() {
          return this.tailShift + this.inserted.length;
        }
      }]);

      return ChangeDetails;
    }();

  var ContinuousTailDetails =
    function () {


      function ContinuousTailDetails() {
        var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var stop = arguments.length > 2 ? arguments[2] : undefined;

        _classCallCheck(this, ContinuousTailDetails);

        this.value = value;
        this.from = from;
        this.stop = stop;
      }

      _createClass(ContinuousTailDetails, [{
        key: 'toString',
        value: function toString() {
          return this.value;
        }
      }, {
        key: 'extend',
        value: function extend(tail) {
          this.value += String(tail);
        }
      }, {
        key: 'appendTo',
        value: function appendTo(masked) {
          return masked.append(this.toString(), {
            tail: true
          }).aggregate(masked._appendPlaceholder());
        }
      }, {
        key: 'shiftBefore',
        value: function shiftBefore(pos) {
          if (this.from >= pos || !this.value.length) {
            return '';
          }
          var shiftChar = this.value[0];
          this.value = this.value.slice(1);
          return shiftChar;
        }
      }, {
        key: 'state',
        get: function get() {
          return {
            value: this.value,
            from: this.from,
            stop: this.stop
          };
        },
        set: function set(state) {
          Object.assign(this, state);
        }
      }]);

      return ContinuousTailDetails;
    }();

  function IMask(el) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return new IMask.InputMask(el, opts);
  }


  var Masked =
    function () {









      function Masked(opts) {
        _classCallCheck(this, Masked);

        this._value = '';

        this._update(Object.assign({}, Masked.DEFAULTS, {}, opts));

        this.isInitialized = true;
      }


      _createClass(Masked, [{
        key: 'updateOptions',
        value: function updateOptions(opts) {
          if (!Object.keys(opts).length) {
            return;
          }
          this.withValueRefresh(this._update.bind(this, opts));
        }

      }, {
        key: '_update',
        value: function _update(opts) {
          Object.assign(this, opts);
        }

      }, {
        key: 'reset',

        value: function reset() {
          this._value = '';
        }

      }, {
        key: 'resolve',

        value: function resolve(value) {
          this.reset();
          this.append(value, {
            input: true
          }, '');
          this.doCommit();
          return this.value;
        }

      }, {
        key: 'nearestInputPos',

        value: function nearestInputPos(cursorPos, direction) {
          return cursorPos;
        }

      }, {
        key: 'extractInput',
        value: function extractInput() {
          var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
          var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
          return this.value.slice(fromPos, toPos);
        }

      }, {
        key: 'extractTail',
        value: function extractTail() {
          var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
          var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
          return new ContinuousTailDetails(this.extractInput(fromPos, toPos), fromPos);
        }

      }, {
        key: 'appendTail',
        value: function appendTail(tail) {
          if (isString(tail)) {
            tail = new ContinuousTailDetails(String(tail));
          }
          return tail.appendTo(this);
        }

      }, {
        key: '_appendCharRaw',
        value: function _appendCharRaw(ch) {
          var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          ch = this.doPrepare(ch, flags);
          if (!ch) {
            return new ChangeDetails();
          }
          this._value += ch;
          return new ChangeDetails({
            inserted: ch,
            rawInserted: ch
          });
        }

      }, {
        key: '_appendChar',
        value: function _appendChar(ch) {
          var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          var checkTail = arguments.length > 2 ? arguments[2] : undefined;
          var consistentState = this.state;

          var details = this._appendCharRaw(ch, flags);

          if (details.inserted) {
            var consistentTail;
            var appended = this.doValidate(flags) !== false;

            if (appended && checkTail != null) {
              var beforeTailState = this.state;

              if (this.overwrite) {
                consistentTail = checkTail.state;
                checkTail.shiftBefore(this.value.length);
              }

              var tailDetails = this.appendTail(checkTail);
              appended = tailDetails.rawInserted === checkTail.toString(); 

              if (appended && tailDetails.inserted) {
                this.state = beforeTailState;
              }
            } 


            if (!appended) {
              details = new ChangeDetails();
              this.state = consistentState;
              if (checkTail && consistentTail) {
                checkTail.state = consistentTail;
              }
            }
          }

          return details;
        }

      }, {
        key: '_appendPlaceholder',
        value: function _appendPlaceholder() {
          return new ChangeDetails();
        }

      }, {
        key: 'append',
        value: function append(str, flags, tail) {
          if (!isString(str)) {
            throw new Error('value should be string');
          }
          var details = new ChangeDetails();
          var checkTail = isString(tail) ? new ContinuousTailDetails(String(tail)) : tail;
          if (flags.tail) {
            flags._beforeTailState = this.state;
          }

          for (var ci = 0; ci < str.length; ++ci) {
            details.aggregate(this._appendChar(str[ci], flags, checkTail));
          } 


          if (checkTail != null) {
            details.tailShift += this.appendTail(checkTail).tailShift; 
          }

          return details;
        }

      }, {
        key: 'remove',
        value: function remove() {
          var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
          var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
          this._value = this.value.slice(0, fromPos) + this.value.slice(toPos);
          return new ChangeDetails();
        }

      }, {
        key: 'withValueRefresh',
        value: function withValueRefresh(fn) {
          if (this._refreshing || !this.isInitialized) {
            return fn();
          }
          this._refreshing = true;
          var rawInput = this.rawInputValue;
          var value = this.value;
          var ret = fn();
          this.rawInputValue = rawInput; 

          if (this.value !== value && value.indexOf(this.value) === 0) {
            this.append(value.slice(this.value.length), {}, '');
          }

          delete this._refreshing;
          return ret;
        }

      }, {
        key: 'runIsolated',
        value: function runIsolated(fn) {
          if (this._isolated || !this.isInitialized) {
            return fn(this);
          }
          this._isolated = true;
          var state = this.state;
          var ret = fn(this);
          this.state = state;
          delete this._isolated;
          return ret;
        }

      }, {
        key: 'doPrepare',
        value: function doPrepare(str) {
          var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          return this.prepare ? this.prepare(str, this, flags) : str;
        }

      }, {
        key: 'doValidate',
        value: function doValidate(flags) {
          return (!this.validate || this.validate(this.value, this, flags)) && (!this.parent || this.parent.doValidate(flags));
        }

      }, {
        key: 'doCommit',
        value: function doCommit() {
          if (this.commit) {
            this.commit(this.value, this);
          }
        }

      }, {
        key: 'doFormat',
        value: function doFormat(value) {
          return this.format ? this.format(value, this) : value;
        }

      }, {
        key: 'doParse',
        value: function doParse(str) {
          return this.parse ? this.parse(str, this) : str;
        }

      }, {
        key: 'splice',
        value: function splice(start, deleteCount, inserted, removeDirection) {
          var tailPos = start + deleteCount;
          var tail = this.extractTail(tailPos);
          var startChangePos = this.nearestInputPos(start, removeDirection);
          var changeDetails = new ChangeDetails({
            tailShift: startChangePos - start 

          }).aggregate(this.remove(startChangePos)).aggregate(this.append(inserted, {
            input: true
          }, tail));
          return changeDetails;
        }
      }, {
        key: 'state',
        get: function get() {
          return {
            _value: this.value
          };
        },
        set: function set(state) {
          this._value = state._value;
        }
      }, {
        key: 'value',
        get: function get() {
          return this._value;
        },
        set: function set(value) {
          this.resolve(value);
        }
      }, {
        key: 'unmaskedValue',
        get: function get() {
          return this.value;
        },
        set: function set(value) {
          this.reset();
          this.append(value, {}, '');
          this.doCommit();
        }

      }, {
        key: 'typedValue',
        get: function get() {
          return this.doParse(this.value);
        },
        set: function set(value) {
          this.value = this.doFormat(value);
        }

      }, {
        key: 'rawInputValue',
        get: function get() {
          return this.extractInput(0, this.value.length, {
            raw: true
          });
        },
        set: function set(value) {
          this.reset();
          this.append(value, {
            raw: true
          }, '');
          this.doCommit();
        }

      }, {
        key: 'isComplete',
        get: function get() {
          return true;
        }
      }]);

      return Masked;
    }();
  Masked.DEFAULTS = {
    format: function format(v) {
      return v;
    },
    parse: function parse(v) {
      return v;
    }
  };
  IMask.Masked = Masked;


  function maskedClass(mask) {
    if (mask == null) {
      throw new Error('mask property should be defined');
    } 


    if (mask instanceof RegExp) {
      return IMask.MaskedRegExp;
    } 

    if (isString(mask)) {
      return IMask.MaskedPattern;
    } 

    if (mask instanceof Date || mask === Date) {
      return IMask.MaskedDate;
    } 

    if (mask instanceof Number || typeof mask === 'number' || mask === Number) {
      return IMask.MaskedNumber;
    } 

    if (Array.isArray(mask) || mask === Array) {
      return IMask.MaskedDynamic;
    } 

    if (IMask.Masked && mask.prototype instanceof IMask.Masked) {
      return mask;
    } 

    if (mask instanceof Function) {
      return IMask.MaskedFunction;
    } 

    if (mask instanceof IMask.Masked) {
      return mask.constructor;
    }
    console.warn('Mask not found for mask', mask); 

    return IMask.Masked;
  }

  function createMask(opts) {
    if (IMask.Masked && opts instanceof IMask.Masked) {
      return opts;
    }
    opts = Object.assign({}, opts);
    var mask = opts.mask; 

    if (IMask.Masked && mask instanceof IMask.Masked) {
      return mask;
    }
    var MaskedClass = maskedClass(mask);
    if (!MaskedClass) {
      throw new Error('Masked class is not found for provided mask, appropriate module needs to be import manually before creating mask.');
    }
    return new MaskedClass(opts);
  }
  IMask.createMask = createMask;

  var DEFAULT_INPUT_DEFINITIONS = {
    '0': /\d/,
    'a': /[\u0041-\u005A\u0061-\u007A\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/,
    '*': /./
  };

  var PatternInputDefinition =
    function () {





      function PatternInputDefinition(opts) {
        _classCallCheck(this, PatternInputDefinition);

        var mask = opts.mask;
        var blockOpts = _objectWithoutProperties(opts, ['mask']);

        this.masked = createMask({
          mask: mask
        });
        Object.assign(this, blockOpts);
      }

      _createClass(PatternInputDefinition, [{
        key: 'reset',
        value: function reset() {
          this._isFilled = false;
          this.masked.reset();
        }
      }, {
        key: 'remove',
        value: function remove() {
          var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
          var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;

          if (fromPos === 0 && toPos >= 1) {
            this._isFilled = false;
            return this.masked.remove(fromPos, toPos);
          }

          return new ChangeDetails();
        }
      }, {
        key: '_appendChar',
        value: function _appendChar(str) {
          var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          if (this._isFilled) {
            return new ChangeDetails();
          }
          var state = this.masked.state; 

          var details = this.masked._appendChar(str, flags);

          if (details.inserted && this.doValidate(flags) === false) {
            details.inserted = details.rawInserted = '';
            this.masked.state = state;
          }

          if (!details.inserted && !this.isOptional && !this.lazy && !flags.input) {
            details.inserted = this.placeholderChar;
          }

          details.skip = !details.inserted && !this.isOptional;
          this._isFilled = Boolean(details.inserted);
          return details;
        }
      }, {
        key: 'append',
        value: function append() {
          var _this$masked;

          return (_this$masked = this.masked).append.apply(_this$masked, arguments);
        }
      }, {
        key: '_appendPlaceholder',
        value: function _appendPlaceholder() {
          var details = new ChangeDetails();
          if (this._isFilled || this.isOptional) {
            return details;
          }
          this._isFilled = true;
          details.inserted = this.placeholderChar;
          return details;
        }
      }, {
        key: 'extractTail',
        value: function extractTail() {
          var _this$masked2;

          return (_this$masked2 = this.masked).extractTail.apply(_this$masked2, arguments);
        }
      }, {
        key: 'appendTail',
        value: function appendTail() {
          var _this$masked3;

          return (_this$masked3 = this.masked).appendTail.apply(_this$masked3, arguments);
        }
      }, {
        key: 'extractInput',
        value: function extractInput() {
          var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
          var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
          var flags = arguments.length > 2 ? arguments[2] : undefined;
          return this.masked.extractInput(fromPos, toPos, flags);
        }
      }, {
        key: 'nearestInputPos',
        value: function nearestInputPos(cursorPos) {
          var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DIRECTION.NONE;
          var minPos = 0;
          var maxPos = this.value.length;
          var boundPos = Math.min(Math.max(cursorPos, minPos), maxPos);

          switch (direction) {
            case DIRECTION.LEFT:
            case DIRECTION.FORCE_LEFT:
              return this.isComplete ? boundPos : minPos;

            case DIRECTION.RIGHT:
            case DIRECTION.FORCE_RIGHT:
              return this.isComplete ? boundPos : maxPos;

            case DIRECTION.NONE:
            default:
              return boundPos;
          }
        }
      }, {
        key: 'doValidate',
        value: function doValidate() {
          var _this$masked4; var _this$parent;

          return (_this$masked4 = this.masked).doValidate.apply(_this$masked4, arguments) && (!this.parent || (_this$parent = this.parent).doValidate.apply(_this$parent, arguments));
        }
      }, {
        key: 'doCommit',
        value: function doCommit() {
          this.masked.doCommit();
        }
      }, {
        key: 'value',
        get: function get() {
          return this.masked.value || (this._isFilled && !this.isOptional ? this.placeholderChar : '');
        }
      }, {
        key: 'unmaskedValue',
        get: function get() {
          return this.masked.unmaskedValue;
        }
      }, {
        key: 'isComplete',
        get: function get() {
          return Boolean(this.masked.value) || this.isOptional;
        }
      }, {
        key: 'state',
        get: function get() {
          return {
            masked: this.masked.state,
            _isFilled: this._isFilled
          };
        },
        set: function set(state) {
          this.masked.state = state.masked;
          this._isFilled = state._isFilled;
        }
      }]);

      return PatternInputDefinition;
    }();

  var PatternFixedDefinition =
    function () {



      function PatternFixedDefinition(opts) {
        _classCallCheck(this, PatternFixedDefinition);

        Object.assign(this, opts);
        this._value = '';
      }

      _createClass(PatternFixedDefinition, [{
        key: 'reset',
        value: function reset() {
          this._isRawInput = false;
          this._value = '';
        }
      }, {
        key: 'remove',
        value: function remove() {
          var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
          var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this._value.length;
          this._value = this._value.slice(0, fromPos) + this._value.slice(toPos);
          if (!this._value) {
            this._isRawInput = false;
          }
          return new ChangeDetails();
        }
      }, {
        key: 'nearestInputPos',
        value: function nearestInputPos(cursorPos) {
          var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DIRECTION.NONE;
          var minPos = 0;
          var maxPos = this._value.length;

          switch (direction) {
            case DIRECTION.LEFT:
            case DIRECTION.FORCE_LEFT:
              return minPos;

            case DIRECTION.NONE:
            case DIRECTION.RIGHT:
            case DIRECTION.FORCE_RIGHT:
            default:
              return maxPos;
          }
        }
      }, {
        key: 'extractInput',
        value: function extractInput() {
          var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
          var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this._value.length;
          var flags = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
          return flags.raw && this._isRawInput && this._value.slice(fromPos, toPos) || '';
        }
      }, {
        key: '_appendChar',
        value: function _appendChar(str) {
          var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          var details = new ChangeDetails();
          if (this._value) {
            return details;
          }
          var appended = this.char === str[0];
          var isResolved = appended && (this.isUnmasking || flags.input || flags.raw) && !flags.tail;
          if (isResolved) {
            details.rawInserted = this.char;
          }
          this._value = details.inserted = this.char;
          this._isRawInput = isResolved && (flags.raw || flags.input);
          return details;
        }
      }, {
        key: '_appendPlaceholder',
        value: function _appendPlaceholder() {
          var details = new ChangeDetails();
          if (this._value) {
            return details;
          }
          this._value = details.inserted = this.char;
          return details;
        }
      }, {
        key: 'extractTail',
        value: function extractTail() {
          var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
          return new ContinuousTailDetails('');
        } 

      }, {
        key: 'appendTail',
        value: function appendTail(tail) {
          if (isString(tail)) {
            tail = new ContinuousTailDetails(String(tail));
          }
          return tail.appendTo(this);
        }
      }, {
        key: 'append',
        value: function append(str, flags, tail) {
          var details = this._appendChar(str, flags);

          if (tail != null) {
            details.tailShift += this.appendTail(tail).tailShift;
          }

          return details;
        }
      }, {
        key: 'doCommit',
        value: function doCommit() { }
      }, {
        key: 'value',
        get: function get() {
          return this._value;
        }
      }, {
        key: 'unmaskedValue',
        get: function get() {
          return this.isUnmasking ? this.value : '';
        }
      }, {
        key: 'isComplete',
        get: function get() {
          return true;
        }
      }, {
        key: 'state',
        get: function get() {
          return {
            _value: this._value,
            _isRawInput: this._isRawInput
          };
        },
        set: function set(state) {
          Object.assign(this, state);
        }
      }]);

      return PatternFixedDefinition;
    }();

  var ChunksTailDetails =
    function () {
      function ChunksTailDetails() {
        var chunks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        _classCallCheck(this, ChunksTailDetails);

        this.chunks = chunks;
        this.from = from;
      }

      _createClass(ChunksTailDetails, [{
        key: 'toString',
        value: function toString() {
          return this.chunks.map(String).join('');
        } 

      }, {
        key: 'extend',
        value: function extend(tailChunk) {
          if (!String(tailChunk)) {
            return;
          }
          if (isString(tailChunk)) {
            tailChunk = new ContinuousTailDetails(String(tailChunk));
          }
          var lastChunk = this.chunks[this.chunks.length - 1];
          var extendLast = lastChunk && ( 
            lastChunk.stop === tailChunk.stop || tailChunk.stop == null) && 
            tailChunk.from === lastChunk.from + lastChunk.toString().length;

          if (tailChunk instanceof ContinuousTailDetails) {
            if (extendLast) {
              lastChunk.extend(tailChunk.toString());
            } else {
              this.chunks.push(tailChunk);
            }
          } else if (tailChunk instanceof ChunksTailDetails) {
            if (tailChunk.stop == null) {
              var firstTailChunk;

              while (tailChunk.chunks.length && tailChunk.chunks[0].stop == null) {
                firstTailChunk = tailChunk.chunks.shift();
                firstTailChunk.from += tailChunk.from;
                this.extend(firstTailChunk);
              }
            } 


            if (tailChunk.toString()) {
              tailChunk.stop = tailChunk.blockIndex;
              this.chunks.push(tailChunk);
            }
          }
        }
      }, {
        key: 'appendTo',
        value: function appendTo(masked) {
          if (!(masked instanceof IMask.MaskedPattern)) {
            var tail = new ContinuousTailDetails(this.toString());
            return tail.appendTo(masked);
          }

          var details = new ChangeDetails();

          for (var ci = 0; ci < this.chunks.length && !details.skip; ++ci) {
            var chunk = this.chunks[ci];

            var lastBlockIter = masked._mapPosToBlock(masked.value.length);

            var stop = chunk.stop;
            var chunkBlock = void 0;

            if (stop != null && ( 
              !lastBlockIter || lastBlockIter.index <= stop)) {
              if (chunk instanceof ChunksTailDetails || 
                masked._stops.indexOf(stop) >= 0) {
                details.aggregate(masked._appendPlaceholder(stop));
              }

              chunkBlock = chunk instanceof ChunksTailDetails && masked._blocks[stop];
            }

            if (chunkBlock) {
              var tailDetails = chunkBlock.appendTail(chunk);
              tailDetails.skip = false; 

              details.aggregate(tailDetails);
              masked._value += tailDetails.inserted; 

              var remainChars = chunk.toString().slice(tailDetails.rawInserted.length);
              if (remainChars) {
                details.aggregate(masked.append(remainChars, {
                  tail: true
                }));
              }
            } else {
              details.aggregate(masked.append(chunk.toString(), {
                tail: true
              }));
            }
          }
          return details;
        }
      }, {
        key: 'shiftBefore',
        value: function shiftBefore(pos) {
          if (this.from >= pos || !this.chunks.length) {
            return '';
          }
          var chunkShiftPos = pos - this.from;
          var ci = 0;

          while (ci < this.chunks.length) {
            var chunk = this.chunks[ci];
            var shiftChar = chunk.shiftBefore(chunkShiftPos);

            if (chunk.toString()) {
              if (!shiftChar) {
                break;
              }
              ++ci;
            } else {
              this.chunks.splice(ci, 1);
            }

            if (shiftChar) {
              return shiftChar;
            }
          }

          return '';
        }
      }, {
        key: 'state',
        get: function get() {
          return {
            chunks: this.chunks.map(function (c) {
              return c.state;
            }),
            from: this.from,
            stop: this.stop,
            blockIndex: this.blockIndex
          };
        },
        set: function set(state) {
          var chunks = state.chunks;
          var props = _objectWithoutProperties(state, ['chunks']);

          Object.assign(this, props);
          this.chunks = chunks.map(function (cstate) {
            var chunk = 'chunks' in cstate ? new ChunksTailDetails() : new ContinuousTailDetails(); 

            chunk.state = cstate;
            return chunk;
          });
        }
      }]);

      return ChunksTailDetails;
    }();


  var MaskedRegExp =
    function (_Masked) {
      _inherits(MaskedRegExp, _Masked);

      function MaskedRegExp() {
        _classCallCheck(this, MaskedRegExp);

        return _possibleConstructorReturn(this, _getPrototypeOf(MaskedRegExp).apply(this, arguments));
      }

      _createClass(MaskedRegExp, [{
        key: '_update',

        value: function _update(opts) {
          if (opts.mask) {
            opts.validate = function (value) {
              return value.search(opts.mask) >= 0;
            };
          }

          _get(_getPrototypeOf(MaskedRegExp.prototype), '_update', this).call(this, opts);
        }
      }]);

      return MaskedRegExp;
    }(Masked);
  IMask.MaskedRegExp = MaskedRegExp;

  var MaskedPattern =
    function (_Masked) {
      _inherits(MaskedPattern, _Masked);




      function MaskedPattern() {
        var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, MaskedPattern);

        opts.definitions = Object.assign({}, DEFAULT_INPUT_DEFINITIONS, opts.definitions);
        return _possibleConstructorReturn(this, _getPrototypeOf(MaskedPattern).call(this, Object.assign({}, MaskedPattern.DEFAULTS, {}, opts)));
      }


      _createClass(MaskedPattern, [{
        key: '_update',
        value: function _update() {
          var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          opts.definitions = Object.assign({}, this.definitions, opts.definitions);

          _get(_getPrototypeOf(MaskedPattern.prototype), '_update', this).call(this, opts);

          this._rebuildMask();
        }

      }, {
        key: '_rebuildMask',
        value: function _rebuildMask() {
          var _this = this;

          var defs = this.definitions;
          this._blocks = [];
          this._stops = [];
          this._maskedBlocks = {};
          var pattern = this.mask;
          if (!pattern || !defs) {
            return;
          }
          var unmaskingBlock = false;
          var optionalBlock = false;

          for (var i = 0; i < pattern.length; ++i) {
            if (this.blocks) {
              var _ret = function () {
                var p = pattern.slice(i);
                var bNames = Object.keys(_this.blocks).filter(function (bName) {
                  return p.indexOf(bName) === 0;
                }); 

                bNames.sort(function (a, b) {
                  return b.length - a.length;
                }); 

                var bName = bNames[0];

                if (bName) {
                  var maskedBlock = createMask(Object.assign({
                    parent: _this,
                    lazy: _this.lazy,
                    placeholderChar: _this.placeholderChar,
                    overwrite: _this.overwrite
                  }, _this.blocks[bName]));

                  if (maskedBlock) {
                    _this._blocks.push(maskedBlock); 


                    if (!_this._maskedBlocks[bName]) {
                      _this._maskedBlocks[bName] = [];
                    }

                    _this._maskedBlocks[bName].push(_this._blocks.length - 1);
                  }

                  i += bName.length - 1;
                  return 'continue';
                }
              }();

              if (_ret === 'continue') {
                continue;
              }
            }

            var char = pattern[i];

            var _isInput = char in defs;

            if (char === MaskedPattern.STOP_CHAR) {
              this._stops.push(this._blocks.length);

              continue;
            }

            if (char === '{' || char === '}') {
              unmaskingBlock = !unmaskingBlock;
              continue;
            }

            if (char === '[' || char === ']') {
              optionalBlock = !optionalBlock;
              continue;
            }

            if (char === MaskedPattern.ESCAPE_CHAR) {
              ++i;
              char = pattern[i];
              if (!char) {
                break;
              }
              _isInput = false;
            }

            var def = _isInput ? new PatternInputDefinition({
              parent: this,
              lazy: this.lazy,
              placeholderChar: this.placeholderChar,
              mask: defs[char],
              isOptional: optionalBlock
            }) : new PatternFixedDefinition({
              char: char,
              isUnmasking: unmaskingBlock
            });

            this._blocks.push(def);
          }
        }

      }, {
        key: 'reset',

        value: function reset() {
          _get(_getPrototypeOf(MaskedPattern.prototype), 'reset', this).call(this);

          this._blocks.forEach(function (b) {
            return b.reset();
          });
        }

      }, {
        key: 'doCommit',

        value: function doCommit() {
          this._blocks.forEach(function (b) {
            return b.doCommit();
          });

          _get(_getPrototypeOf(MaskedPattern.prototype), 'doCommit', this).call(this);
        }

      }, {
        key: 'appendTail',

        value: function appendTail(tail) {
          return _get(_getPrototypeOf(MaskedPattern.prototype), 'appendTail', this).call(this, tail).aggregate(this._appendPlaceholder());
        }

      }, {
        key: '_appendCharRaw',
        value: function _appendCharRaw(ch) {
          var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          ch = this.doPrepare(ch, flags);

          var blockIter = this._mapPosToBlock(this.value.length);

          var details = new ChangeDetails();
          if (!blockIter) {
            return details;
          }

          for (var bi = blockIter.index; ; ++bi) {
            var _block = this._blocks[bi];
            if (!_block) {
              break;
            }

            var blockDetails = _block._appendChar(ch, flags);

            var skip = blockDetails.skip;
            details.aggregate(blockDetails);
            if (skip || blockDetails.rawInserted) {
              break;
            } 
          }

          return details;
        }

      }, {
        key: 'extractTail',
        value: function extractTail() {
          var _this2 = this;

          var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
          var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
          var chunkTail = new ChunksTailDetails();
          if (fromPos === toPos) {
            return chunkTail;
          }

          this._forEachBlocksInRange(fromPos, toPos, function (b, bi, bFromPos, bToPos) {
            var blockChunk = b.extractTail(bFromPos, bToPos);
            blockChunk.stop = _this2._findStopBefore(bi);
            blockChunk.from = _this2._blockStartPos(bi);
            if (blockChunk instanceof ChunksTailDetails) {
              blockChunk.blockIndex = bi;
            }
            chunkTail.extend(blockChunk);
          });

          return chunkTail;
        }

      }, {
        key: 'extractInput',
        value: function extractInput() {
          var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
          var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
          var flags = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
          if (fromPos === toPos) {
            return '';
          }
          var input = '';

          this._forEachBlocksInRange(fromPos, toPos, function (b, _, fromPos, toPos) {
            input += b.extractInput(fromPos, toPos, flags);
          });

          return input;
        }
      }, {
        key: '_findStopBefore',
        value: function _findStopBefore(blockIndex) {
          var stopBefore;

          for (var si = 0; si < this._stops.length; ++si) {
            var stop = this._stops[si];
            if (stop <= blockIndex) {
              stopBefore = stop;
            } else {
              break;
            }
          }

          return stopBefore;
        }

      }, {
        key: '_appendPlaceholder',
        value: function _appendPlaceholder(toBlockIndex) {
          var _this3 = this;

          var details = new ChangeDetails();
          if (this.lazy && toBlockIndex == null) {
            return details;
          }

          var startBlockIter = this._mapPosToBlock(this.value.length);

          if (!startBlockIter) {
            return details;
          }
          var startBlockIndex = startBlockIter.index;
          var endBlockIndex = toBlockIndex != null ? toBlockIndex : this._blocks.length;

          this._blocks.slice(startBlockIndex, endBlockIndex).forEach(function (b) {
            if (!b.lazy || toBlockIndex != null) {
              var args = b._blocks != null ? [b._blocks.length] : [];

              var bDetails = b._appendPlaceholder.apply(b, args);

              _this3._value += bDetails.inserted;
              details.aggregate(bDetails);
            }
          });

          return details;
        }

      }, {
        key: '_mapPosToBlock',
        value: function _mapPosToBlock(pos) {
          var accVal = '';

          for (var bi = 0; bi < this._blocks.length; ++bi) {
            var _block2 = this._blocks[bi];
            var blockStartPos = accVal.length;
            accVal += _block2.value;

            if (pos <= accVal.length) {
              return {
                index: bi,
                offset: pos - blockStartPos
              };
            }
          }
        }

      }, {
        key: '_blockStartPos',
        value: function _blockStartPos(blockIndex) {
          return this._blocks.slice(0, blockIndex).reduce(function (pos, b) {
            return pos += b.value.length;
          }, 0);
        }

      }, {
        key: '_forEachBlocksInRange',
        value: function _forEachBlocksInRange(fromPos) {
          var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
          var fn = arguments.length > 2 ? arguments[2] : undefined;

          var fromBlockIter = this._mapPosToBlock(fromPos);

          if (fromBlockIter) {
            var toBlockIter = this._mapPosToBlock(toPos); 


            var isSameBlock = toBlockIter && fromBlockIter.index === toBlockIter.index;
            var fromBlockStartPos = fromBlockIter.offset;
            var fromBlockEndPos = toBlockIter && isSameBlock ? toBlockIter.offset : this._blocks[fromBlockIter.index].value.length;
            fn(this._blocks[fromBlockIter.index], fromBlockIter.index, fromBlockStartPos, fromBlockEndPos);

            if (toBlockIter && !isSameBlock) {
              for (var bi = fromBlockIter.index + 1; bi < toBlockIter.index; ++bi) {
                fn(this._blocks[bi], bi, 0, this._blocks[bi].value.length);
              } 


              fn(this._blocks[toBlockIter.index], toBlockIter.index, 0, toBlockIter.offset);
            }
          }
        }

      }, {
        key: 'remove',
        value: function remove() {
          var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
          var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;

          var removeDetails = _get(_getPrototypeOf(MaskedPattern.prototype), 'remove', this).call(this, fromPos, toPos);

          this._forEachBlocksInRange(fromPos, toPos, function (b, _, bFromPos, bToPos) {
            removeDetails.aggregate(b.remove(bFromPos, bToPos));
          });

          return removeDetails;
        }

      }, {
        key: 'nearestInputPos',
        value: function nearestInputPos(cursorPos) {
          var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DIRECTION.NONE;
          var beginBlockData = this._mapPosToBlock(cursorPos) || {
            index: 0,
            offset: 0
          };
          var beginBlockOffset = beginBlockData.offset;
          var beginBlockIndex = beginBlockData.index;
          var beginBlock = this._blocks[beginBlockIndex];
          if (!beginBlock) {
            return cursorPos;
          }
          var beginBlockCursorPos = beginBlockOffset; 

          if (beginBlockCursorPos !== 0 && beginBlockCursorPos < beginBlock.value.length) {
            beginBlockCursorPos = beginBlock.nearestInputPos(beginBlockOffset, forceDirection(direction));
          }

          var cursorAtRight = beginBlockCursorPos === beginBlock.value.length;
          var cursorAtLeft = beginBlockCursorPos === 0; 

          if (!cursorAtLeft && !cursorAtRight) {
            return this._blockStartPos(beginBlockIndex) + beginBlockCursorPos;
          }
          var searchBlockIndex = cursorAtRight ? beginBlockIndex + 1 : beginBlockIndex;

          if (direction === DIRECTION.NONE) {
            if (searchBlockIndex > 0) {
              var blockIndexAtLeft = searchBlockIndex - 1;
              var blockAtLeft = this._blocks[blockIndexAtLeft];
              var blockInputPos = blockAtLeft.nearestInputPos(0, DIRECTION.NONE); 

              if (!blockAtLeft.value.length || blockInputPos !== blockAtLeft.value.length) {
                return this._blockStartPos(searchBlockIndex);
              }
            } 


            var firstInputAtRight = searchBlockIndex;

            for (var bi = firstInputAtRight; bi < this._blocks.length; ++bi) {
              var blockAtRight = this._blocks[bi];

              var _blockInputPos = blockAtRight.nearestInputPos(0, DIRECTION.NONE);

              if (!blockAtRight.value.length || _blockInputPos !== blockAtRight.value.length) {
                return this._blockStartPos(bi) + _blockInputPos;
              }
            } 


            for (var _bi = searchBlockIndex - 1; _bi >= 0; --_bi) {
              var _block3 = this._blocks[_bi];

              var _blockInputPos2 = _block3.nearestInputPos(0, DIRECTION.NONE); 


              if (!_block3.value.length || _blockInputPos2 !== _block3.value.length) {
                return this._blockStartPos(_bi) + _block3.value.length;
              }
            }

            return cursorPos;
          }

          if (direction === DIRECTION.LEFT || direction === DIRECTION.FORCE_LEFT) {
            var firstFilledBlockIndexAtRight;

            for (var _bi2 = searchBlockIndex; _bi2 < this._blocks.length; ++_bi2) {
              if (this._blocks[_bi2].value) {
                firstFilledBlockIndexAtRight = _bi2;
                break;
              }
            }

            if (firstFilledBlockIndexAtRight != null) {
              var filledBlock = this._blocks[firstFilledBlockIndexAtRight];

              var _blockInputPos3 = filledBlock.nearestInputPos(0, DIRECTION.RIGHT);

              if (_blockInputPos3 === 0 && filledBlock.unmaskedValue.length) {
                return this._blockStartPos(firstFilledBlockIndexAtRight) + _blockInputPos3;
              }
            } 


            var firstFilledInputBlockIndex = -1;
            var firstEmptyInputBlockIndex; 

            for (var _bi3 = searchBlockIndex - 1; _bi3 >= 0; --_bi3) {
              var _block4 = this._blocks[_bi3];

              var _blockInputPos4 = _block4.nearestInputPos(_block4.value.length, DIRECTION.FORCE_LEFT);

              if (!_block4.value || _blockInputPos4 !== 0) {
                firstEmptyInputBlockIndex = _bi3;
              }

              if (_blockInputPos4 !== 0) {
                if (_blockInputPos4 !== _block4.value.length) {
                  return this._blockStartPos(_bi3) + _blockInputPos4;
                } else {
                  firstFilledInputBlockIndex = _bi3;
                  break;
                }
              }
            }

            if (direction === DIRECTION.LEFT) {
              for (var _bi4 = firstFilledInputBlockIndex + 1; _bi4 <= Math.min(searchBlockIndex, this._blocks.length - 1); ++_bi4) {
                var _block5 = this._blocks[_bi4];

                var _blockInputPos5 = _block5.nearestInputPos(0, DIRECTION.NONE);

                var blockAlignedPos = this._blockStartPos(_bi4) + _blockInputPos5;

                if (blockAlignedPos > cursorPos) {
                  break;
                } 

                if (_blockInputPos5 !== _block5.value.length) {
                  return blockAlignedPos;
                }
              }
            } 


            if (firstFilledInputBlockIndex >= 0) {
              return this._blockStartPos(firstFilledInputBlockIndex) + this._blocks[firstFilledInputBlockIndex].value.length;
            } 


            if (direction === DIRECTION.FORCE_LEFT || this.lazy && !this.extractInput() && !isInput(this._blocks[searchBlockIndex])) {
              return 0;
            }

            if (firstEmptyInputBlockIndex != null) {
              return this._blockStartPos(firstEmptyInputBlockIndex);
            } 


            for (var _bi5 = searchBlockIndex; _bi5 < this._blocks.length; ++_bi5) {
              var _block6 = this._blocks[_bi5];

              var _blockInputPos6 = _block6.nearestInputPos(0, DIRECTION.NONE); 


              if (!_block6.value.length || _blockInputPos6 !== _block6.value.length) {
                return this._blockStartPos(_bi5) + _blockInputPos6;
              }
            }

            return 0;
          }

          if (direction === DIRECTION.RIGHT || direction === DIRECTION.FORCE_RIGHT) {
            var firstInputBlockAlignedIndex;
            var firstInputBlockAlignedPos;

            for (var _bi6 = searchBlockIndex; _bi6 < this._blocks.length; ++_bi6) {
              var _block7 = this._blocks[_bi6];

              var _blockInputPos7 = _block7.nearestInputPos(0, DIRECTION.NONE);

              if (_blockInputPos7 !== _block7.value.length) {
                firstInputBlockAlignedPos = this._blockStartPos(_bi6) + _blockInputPos7;
                firstInputBlockAlignedIndex = _bi6;
                break;
              }
            }

            if (firstInputBlockAlignedIndex != null && firstInputBlockAlignedPos != null) {
              for (var _bi7 = firstInputBlockAlignedIndex; _bi7 < this._blocks.length; ++_bi7) {
                var _block8 = this._blocks[_bi7];

                var _blockInputPos8 = _block8.nearestInputPos(0, DIRECTION.FORCE_RIGHT);

                if (_blockInputPos8 !== _block8.value.length) {
                  return this._blockStartPos(_bi7) + _blockInputPos8;
                }
              }

              return direction === DIRECTION.FORCE_RIGHT ? this.value.length : firstInputBlockAlignedPos;
            }

            for (var _bi8 = Math.min(searchBlockIndex, this._blocks.length - 1); _bi8 >= 0; --_bi8) {
              var _block9 = this._blocks[_bi8];

              var _blockInputPos9 = _block9.nearestInputPos(_block9.value.length, DIRECTION.LEFT);

              if (_blockInputPos9 !== 0) {
                var alignedPos = this._blockStartPos(_bi8) + _blockInputPos9;

                if (alignedPos >= cursorPos) {
                  return alignedPos;
                }
                break;
              }
            }
          }

          return cursorPos;
        }

      }, {
        key: 'maskedBlock',
        value: function maskedBlock(name) {
          return this.maskedBlocks(name)[0];
        }

      }, {
        key: 'maskedBlocks',
        value: function maskedBlocks(name) {
          var _this4 = this;

          var indices = this._maskedBlocks[name];
          if (!indices) {
            return [];
          }
          return indices.map(function (gi) {
            return _this4._blocks[gi];
          });
        }
      }, {
        key: 'state',
        get: function get() {
          return Object.assign({}, _get(_getPrototypeOf(MaskedPattern.prototype), 'state', this), {
            _blocks: this._blocks.map(function (b) {
              return b.state;
            })
          });
        },
        set: function set(state) {
          var _blocks = state._blocks;
          var maskedState = _objectWithoutProperties(state, ['_blocks']);

          this._blocks.forEach(function (b, bi) {
            return b.state = _blocks[bi];
          });

          _set(_getPrototypeOf(MaskedPattern.prototype), 'state', maskedState, this, true);
        }
      }, {
        key: 'isComplete',
        get: function get() {
          return this._blocks.every(function (b) {
            return b.isComplete;
          });
        }
      }, {
        key: 'unmaskedValue',
        get: function get() {
          return this._blocks.reduce(function (str, b) {
            return str += b.unmaskedValue;
          }, '');
        },
        set: function set(unmaskedValue) {
          _set(_getPrototypeOf(MaskedPattern.prototype), 'unmaskedValue', unmaskedValue, this, true);
        }

      }, {
        key: 'value',
        get: function get() {
          return this._blocks.reduce(function (str, b) {
            return str += b.value;
          }, '');
        },
        set: function set(value) {
          _set(_getPrototypeOf(MaskedPattern.prototype), 'value', value, this, true);
        }
      }]);

      return MaskedPattern;
    }(Masked);
  MaskedPattern.DEFAULTS = {
    lazy: true,
    placeholderChar: '_'
  };
  MaskedPattern.STOP_CHAR = '`';
  MaskedPattern.ESCAPE_CHAR = '\\';
  MaskedPattern.InputDefinition = PatternInputDefinition;
  MaskedPattern.FixedDefinition = PatternFixedDefinition;

  function isInput(block) {
    if (!block) {
      return false;
    }
    var value = block.value;
    return !value || block.nearestInputPos(0, DIRECTION.NONE) !== value.length;
  }

  IMask.MaskedPattern = MaskedPattern;


  var MaskedRange =
    function (_MaskedPattern) {
      _inherits(MaskedRange, _MaskedPattern);

      function MaskedRange() {
        _classCallCheck(this, MaskedRange);

        return _possibleConstructorReturn(this, _getPrototypeOf(MaskedRange).apply(this, arguments));
      }

      _createClass(MaskedRange, [{
        key: '_update',

        value: function _update(opts) {
          opts = Object.assign({
            to: this.to || 0,
            from: this.from || 0
          }, opts);
          var maxLength = String(opts.to).length;
          if (opts.maxLength != null) {
            maxLength = Math.max(maxLength, opts.maxLength);
          }
          opts.maxLength = maxLength;
          var fromStr = String(opts.from).padStart(maxLength, '0');
          var toStr = String(opts.to).padStart(maxLength, '0');
          var sameCharsCount = 0;

          while (sameCharsCount < toStr.length && toStr[sameCharsCount] === fromStr[sameCharsCount]) {
            ++sameCharsCount;
          }

          opts.mask = toStr.slice(0, sameCharsCount).replace(/0/g, '\\0') + '0'.repeat(maxLength - sameCharsCount);

          _get(_getPrototypeOf(MaskedRange.prototype), '_update', this).call(this, opts);
        }

      }, {
        key: 'boundaries',
        value: function boundaries(str) {
          var minstr = '';
          var maxstr = '';

          var _ref = str.match(/^(\D*)(\d*)(\D*)/) || [];
          var _ref2 = _slicedToArray(_ref, 3);
          var placeholder = _ref2[1];
          var num = _ref2[2];

          if (num) {
            minstr = '0'.repeat(placeholder.length) + num;
            maxstr = '9'.repeat(placeholder.length) + num;
          }

          minstr = minstr.padEnd(this.maxLength, '0');
          maxstr = maxstr.padEnd(this.maxLength, '9');
          return [minstr, maxstr];
        }

      }, {
        key: 'doPrepare',
        value: function doPrepare(str) {
          var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          str = _get(_getPrototypeOf(MaskedRange.prototype), 'doPrepare', this).call(this, str, flags).replace(/\D/g, '');
          if (!this.autofix) {
            return str;
          }
          var fromStr = String(this.from).padStart(this.maxLength, '0');
          var toStr = String(this.to).padStart(this.maxLength, '0');
          var val = this.value;
          var prepStr = '';

          for (var ci = 0; ci < str.length; ++ci) {
            var nextVal = val + prepStr + str[ci];

            var _this$boundaries = this.boundaries(nextVal);
            var _this$boundaries2 = _slicedToArray(_this$boundaries, 2);
            var minstr = _this$boundaries2[0];
            var maxstr = _this$boundaries2[1];

            if (Number(maxstr) < this.from) {
              prepStr += fromStr[nextVal.length - 1];
            } else if (Number(minstr) > this.to) {
              prepStr += toStr[nextVal.length - 1];
            } else {
              prepStr += str[ci];
            }
          }

          return prepStr;
        }

      }, {
        key: 'doValidate',
        value: function doValidate() {
          var _get2;

          var str = this.value;
          var firstNonZero = str.search(/[^0]/);
          if (firstNonZero === -1 && str.length <= this._matchFrom) {
            return true;
          }

          var _this$boundaries3 = this.boundaries(str);
          var _this$boundaries4 = _slicedToArray(_this$boundaries3, 2);
          var minstr = _this$boundaries4[0];
          var maxstr = _this$boundaries4[1];

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return this.from <= Number(maxstr) && Number(minstr) <= this.to && (_get2 = _get(_getPrototypeOf(MaskedRange.prototype), 'doValidate', this)).call.apply(_get2, [this].concat(args));
        }
      }, {
        key: '_matchFrom',




        get: function get() {
          return this.maxLength - String(this.from).length;
        }
      }, {
        key: 'isComplete',
        get: function get() {
          return _get(_getPrototypeOf(MaskedRange.prototype), 'isComplete', this) && Boolean(this.value);
        }
      }]);

      return MaskedRange;
    }(MaskedPattern);
  IMask.MaskedRange = MaskedRange;


  var MaskedDate =
    function (_MaskedPattern) {
      _inherits(MaskedDate, _MaskedPattern);





      function MaskedDate(opts) {
        _classCallCheck(this, MaskedDate);

        return _possibleConstructorReturn(this, _getPrototypeOf(MaskedDate).call(this, Object.assign({}, MaskedDate.DEFAULTS, {}, opts)));
      }


      _createClass(MaskedDate, [{
        key: '_update',
        value: function _update(opts) {
          if (opts.mask === Date) {
            delete opts.mask;
          }
          if (opts.pattern) {
            opts.mask = opts.pattern;
          }
          var blocks = opts.blocks;
          opts.blocks = Object.assign({}, MaskedDate.GET_DEFAULT_BLOCKS()); 

          if (opts.min) {
            opts.blocks.Y.from = opts.min.getFullYear();
          }
          if (opts.max) {
            opts.blocks.Y.to = opts.max.getFullYear();
          }

          if (opts.min && opts.max && opts.blocks.Y.from === opts.blocks.Y.to) {
            opts.blocks.m.from = opts.min.getMonth() + 1;
            opts.blocks.m.to = opts.max.getMonth() + 1;

            if (opts.blocks.m.from === opts.blocks.m.to) {
              opts.blocks.d.from = opts.min.getDate();
              opts.blocks.d.to = opts.max.getDate();
            }
          }

          Object.assign(opts.blocks, blocks); 

          Object.keys(opts.blocks).forEach(function (bk) {
            var b = opts.blocks[bk];
            if (!('autofix' in b)) {
              b.autofix = opts.autofix;
            }
          });

          _get(_getPrototypeOf(MaskedDate.prototype), '_update', this).call(this, opts);
        }

      }, {
        key: 'doValidate',
        value: function doValidate() {
          var _get2;

          var date = this.date;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return (_get2 = _get(_getPrototypeOf(MaskedDate.prototype), 'doValidate', this)).call.apply(_get2, [this].concat(args)) && (!this.isComplete || this.isDateExist(this.value) && date != null && (this.min == null || this.min <= date) && (this.max == null || date <= this.max));
        }

      }, {
        key: 'isDateExist',
        value: function isDateExist(str) {
          return this.format(this.parse(str, this), this).indexOf(str) >= 0;
        }

      }, {
        key: 'date',
        get: function get() {
          return this.typedValue;
        },
        set: function set(date) {
          this.typedValue = date;
        }

      }, {
        key: 'typedValue',
        get: function get() {
          return this.isComplete ? _get(_getPrototypeOf(MaskedDate.prototype), 'typedValue', this) : null;
        },
        set: function set(value) {
          _set(_getPrototypeOf(MaskedDate.prototype), 'typedValue', value, this, true);
        }
      }]);

      return MaskedDate;
    }(MaskedPattern);
  MaskedDate.DEFAULTS = {
    pattern: 'd{.}`m{.}`Y',
    format: function format(date) {
      var day = String(date.getDate()).padStart(2, '0');
      var month = String(date.getMonth() + 1).padStart(2, '0');
      var year = date.getFullYear();
      return [day, month, year].join('.');
    },
    parse: function parse(str) {
      var _str$split = str.split('.');
      var _str$split2 = _slicedToArray(_str$split, 3);
      var day = _str$split2[0];
      var month = _str$split2[1];
      var year = _str$split2[2];

      return new Date(year, month - 1, day);
    }
  };

  MaskedDate.GET_DEFAULT_BLOCKS = function () {
    return {
      d: {
        mask: MaskedRange,
        from: 1,
        to: 31,
        maxLength: 2
      },
      m: {
        mask: MaskedRange,
        from: 1,
        to: 12,
        maxLength: 2
      },
      Y: {
        mask: MaskedRange,
        from: 1900,
        to: 9999
      }
    };
  };

  IMask.MaskedDate = MaskedDate;

  var MaskElement =
    function () {
      function MaskElement() {
        _classCallCheck(this, MaskElement);
      }

      _createClass(MaskElement, [{
        key: 'select',

        value: function select(start, end) {
          if (start == null || end == null || start === this.selectionStart && end === this.selectionEnd) {
            return;
          }

          try {
            this._unsafeSelect(start, end);
          } catch (e) { }
        }

      }, {
        key: '_unsafeSelect',
        value: function _unsafeSelect(start, end) { }

      }, {
        key: 'bindEvents',

        value: function bindEvents(handlers) { }

      }, {
        key: 'unbindEvents',
        value: function unbindEvents() { }
      }, {
        key: 'selectionStart',




        get: function get() {
          var start;

          try {
            start = this._unsafeSelectionStart;
          } catch (e) { }

          return start != null ? start : this.value.length;
        }

      }, {
        key: 'selectionEnd',
        get: function get() {
          var end;

          try {
            end = this._unsafeSelectionEnd;
          } catch (e) { }

          return end != null ? end : this.value.length;
        }
      }, {
        key: 'isActive',
        get: function get() {
          return false;
        }
      }]);

      return MaskElement;
    }();
  IMask.MaskElement = MaskElement;


  var HTMLMaskElement =
    function (_MaskElement) {
      _inherits(HTMLMaskElement, _MaskElement);



      function HTMLMaskElement(input) {
        var _this;

        _classCallCheck(this, HTMLMaskElement);

        _this = _possibleConstructorReturn(this, _getPrototypeOf(HTMLMaskElement).call(this));
        _this.input = input;
        _this._handlers = {};
        return _this;
      }


      _createClass(HTMLMaskElement, [{
        key: '_unsafeSelect',

        value: function _unsafeSelect(start, end) {
          this.input.setSelectionRange(start, end);
        }

      }, {
        key: 'bindEvents',

        value: function bindEvents(handlers) {
          var _this2 = this;

          Object.keys(handlers).forEach(function (event) {
            return _this2._toggleEventHandler(HTMLMaskElement.EVENTS_MAP[event], handlers[event]);
          });
        }

      }, {
        key: 'unbindEvents',
        value: function unbindEvents() {
          var _this3 = this;

          Object.keys(this._handlers).forEach(function (event) {
            return _this3._toggleEventHandler(event);
          });
        }

      }, {
        key: '_toggleEventHandler',
        value: function _toggleEventHandler(event, handler) {
          if (this._handlers[event]) {
            this.input.removeEventListener(event, this._handlers[event]);
            delete this._handlers[event];
          }

          if (handler) {
            this.input.addEventListener(event, handler);
            this._handlers[event] = handler;
          }
        }
      }, {
        key: 'rootElement',
        get: function get() {
          return this.input.getRootNode ? this.input.getRootNode() : document;
        }

      }, {
        key: 'isActive',
        get: function get() {
          return this.input === this.rootElement.activeElement;
        }

      }, {
        key: '_unsafeSelectionStart',
        get: function get() {
          return this.input.selectionStart;
        }

      }, {
        key: '_unsafeSelectionEnd',
        get: function get() {
          return this.input.selectionEnd;
        }
      }, {
        key: 'value',
        get: function get() {
          return this.input.value;
        },
        set: function set(value) {
          this.input.value = value;
        }
      }]);

      return HTMLMaskElement;
    }(MaskElement);
  HTMLMaskElement.EVENTS_MAP = {
    selectionChange: 'keydown',
    input: 'input',
    drop: 'drop',
    click: 'click',
    focus: 'focus',
    commit: 'blur'
  };
  IMask.HTMLMaskElement = HTMLMaskElement;

  var HTMLContenteditableMaskElement =
    function (_HTMLMaskElement) {
      _inherits(HTMLContenteditableMaskElement, _HTMLMaskElement);

      function HTMLContenteditableMaskElement() {
        _classCallCheck(this, HTMLContenteditableMaskElement);

        return _possibleConstructorReturn(this, _getPrototypeOf(HTMLContenteditableMaskElement).apply(this, arguments));
      }

      _createClass(HTMLContenteditableMaskElement, [{
        key: '_unsafeSelect',

        value: function _unsafeSelect(start, end) {
          if (!this.rootElement.createRange) {
            return;
          }
          var range = this.rootElement.createRange();
          range.setStart(this.input.firstChild || this.input, start);
          range.setEnd(this.input.lastChild || this.input, end);
          var root = this.rootElement;
          var selection = root.getSelection && root.getSelection();

          if (selection) {
            selection.removeAllRanges();
            selection.addRange(range);
          }
        }

      }, {
        key: '_unsafeSelectionStart',

        get: function get() {
          var root = this.rootElement;
          var selection = root.getSelection && root.getSelection();
          return selection && selection.anchorOffset;
        }

      }, {
        key: '_unsafeSelectionEnd',
        get: function get() {
          var root = this.rootElement;
          var selection = root.getSelection && root.getSelection();
          return selection && this._unsafeSelectionStart + String(selection).length;
        }
      }, {
        key: 'value',
        get: function get() {
          return this.input.textContent;
        },
        set: function set(value) {
          this.input.textContent = value;
        }
      }]);

      return HTMLContenteditableMaskElement;
    }(HTMLMaskElement);
  IMask.HTMLContenteditableMaskElement = HTMLContenteditableMaskElement;


  var InputMask =
    function () {


      function InputMask(el, opts) {
        _classCallCheck(this, InputMask);

        this.el = el instanceof MaskElement ? el : el.isContentEditable && el.tagName !== 'INPUT' && el.tagName !== 'TEXTAREA' ? new HTMLContenteditableMaskElement(el) : new HTMLMaskElement(el);
        this.masked = createMask(opts);
        this._listeners = {};
        this._value = '';
        this._unmaskedValue = '';
        this._saveSelection = this._saveSelection.bind(this);
        this._onInput = this._onInput.bind(this);
        this._onChange = this._onChange.bind(this);
        this._onDrop = this._onDrop.bind(this);
        this._onFocus = this._onFocus.bind(this);
        this._onClick = this._onClick.bind(this);
        this.alignCursor = this.alignCursor.bind(this);
        this.alignCursorFriendly = this.alignCursorFriendly.bind(this);

        this._bindEvents(); 


        this.updateValue();

        this._onChange();
      }


      _createClass(InputMask, [{
        key: 'maskEquals',
        value: function maskEquals(mask) {
          return mask == null || mask === this.masked.mask || mask === Date && this.masked instanceof MaskedDate;
        }
      }, {
        key: '_bindEvents',

        value: function _bindEvents() {
          this.el.bindEvents({
            selectionChange: this._saveSelection,
            input: this._onInput,
            drop: this._onDrop,
            click: this._onClick,
            focus: this._onFocus,
            commit: this._onChange
          });
        }

      }, {
        key: '_unbindEvents',
        value: function _unbindEvents() {
          if (this.el) {
            this.el.unbindEvents();
          }
        }

      }, {
        key: '_fireEvent',
        value: function _fireEvent(ev) {
          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }

          var listeners = this._listeners[ev];
          if (!listeners) {
            return;
          }
          listeners.forEach(function (l) {
            return l.apply(void 0, args);
          });
        }

      }, {
        key: '_saveSelection',

        value: function _saveSelection()
 {
          if (this.value !== this.el.value) {
            console.warn('Element value was changed outside of mask. Syncronize mask using `mask.updateValue()` to work properly.'); 
          }

          this._selection = {
            start: this.selectionStart,
            end: this.cursorPos
          };
        }

      }, {
        key: 'updateValue',
        value: function updateValue() {
          this.masked.value = this.el.value;
          this._value = this.masked.value;
        }

      }, {
        key: 'updateControl',
        value: function updateControl() {
          var newUnmaskedValue = this.masked.unmaskedValue;
          var newValue = this.masked.value;
          var isChanged = this.unmaskedValue !== newUnmaskedValue || this.value !== newValue;
          this._unmaskedValue = newUnmaskedValue;
          this._value = newValue;
          if (this.el.value !== newValue) {
            this.el.value = newValue;
          }
          if (isChanged) {
            this._fireChangeEvents();
          }
        }

      }, {
        key: 'updateOptions',
        value: function updateOptions(opts) {
          var mask = opts.mask;
          var restOpts = _objectWithoutProperties(opts, ['mask']);

          var updateMask = !this.maskEquals(mask);
          var updateOpts = !objectIncludes(this.masked, restOpts);
          if (updateMask) {
            this.mask = mask;
          }
          if (updateOpts) {
            this.masked.updateOptions(restOpts);
          }
          if (updateMask || updateOpts) {
            this.updateControl();
          }
        }

      }, {
        key: 'updateCursor',
        value: function updateCursor(cursorPos) {
          if (cursorPos == null) {
            return;
          }
          this.cursorPos = cursorPos; 

          this._delayUpdateCursor(cursorPos);
        }

      }, {
        key: '_delayUpdateCursor',
        value: function _delayUpdateCursor(cursorPos) {
          var _this = this;

          this._abortUpdateCursor();

          this._changingCursorPos = cursorPos;
          this._cursorChanging = setTimeout(function () {
            if (!_this.el) {
              return;
            } 

            _this.cursorPos = _this._changingCursorPos;

            _this._abortUpdateCursor();
          }, 10);
        }

      }, {
        key: '_fireChangeEvents',
        value: function _fireChangeEvents() {
          this._fireEvent('accept', this._inputEvent);

          if (this.masked.isComplete) {
            this._fireEvent('complete', this._inputEvent);
          }
        }

      }, {
        key: '_abortUpdateCursor',
        value: function _abortUpdateCursor() {
          if (this._cursorChanging) {
            clearTimeout(this._cursorChanging);
            delete this._cursorChanging;
          }
        }

      }, {
        key: 'alignCursor',
        value: function alignCursor() {
          this.cursorPos = this.masked.nearestInputPos(this.cursorPos, DIRECTION.LEFT);
        }

      }, {
        key: 'alignCursorFriendly',
        value: function alignCursorFriendly() {
          if (this.selectionStart !== this.cursorPos) {
            return;
          } 

          this.alignCursor();
        }

      }, {
        key: 'on',
        value: function on(ev, handler) {
          if (!this._listeners[ev]) {
            this._listeners[ev] = [];
          }

          this._listeners[ev].push(handler);

          return this;
        }

      }, {
        key: 'off',
        value: function off(ev, handler) {
          if (!this._listeners[ev]) {
            return this;
          }

          if (!handler) {
            delete this._listeners[ev];
            return this;
          }

          var hIndex = this._listeners[ev].indexOf(handler);

          if (hIndex >= 0) {
            this._listeners[ev].splice(hIndex, 1);
          }
          return this;
        }

      }, {
        key: '_onInput',
        value: function _onInput(e) {
          this._inputEvent = e;

          this._abortUpdateCursor(); 


          if (!this._selection) {
            return this.updateValue();
          }
          var details = new ActionDetails( 
              this.el.value, this.cursorPos, 
              this.value, this._selection);
          var oldRawValue = this.masked.rawInputValue;
          var offset = this.masked.splice(details.startChangePos, details.removed.length, details.inserted, details.removeDirection).offset; 

          var removeDirection = oldRawValue === this.masked.rawInputValue ? details.removeDirection : DIRECTION.NONE;
          var cursorPos = this.masked.nearestInputPos(details.startChangePos + offset, removeDirection);
          this.updateControl();
          this.updateCursor(cursorPos);
          delete this._inputEvent;
        }

      }, {
        key: '_onChange',
        value: function _onChange() {
          if (this.value !== this.el.value) {
            this.updateValue();
          }

          this.masked.doCommit();
          this.updateControl();

          this._saveSelection();
        }

      }, {
        key: '_onDrop',
        value: function _onDrop(ev) {
          ev.preventDefault();
          ev.stopPropagation();
        }

      }, {
        key: '_onFocus',
        value: function _onFocus(ev) {
          this.alignCursorFriendly();
        }

      }, {
        key: '_onClick',
        value: function _onClick(ev) {
          this.alignCursorFriendly();
        }

      }, {
        key: 'destroy',
        value: function destroy() {
          this._unbindEvents(); 


          this._listeners.length = 0; 

          delete this.el;
        }
      }, {
        key: 'mask',
        get: function get() {
          return this.masked.mask;
        },
        set: function set(mask) {
          if (this.maskEquals(mask)) {
            return;
          }

          if (!(mask instanceof IMask.Masked) && this.masked.constructor === maskedClass(mask)) {
            this.masked.updateOptions({
              mask: mask
            });
            return;
          }

          var masked = createMask({
            mask: mask
          });
          masked.unmaskedValue = this.masked.unmaskedValue;
          this.masked = masked;
        }

      }, {
        key: 'value',
        get: function get() {
          return this._value;
        },
        set: function set(str) {
          this.masked.value = str;
          this.updateControl();
          this.alignCursor();
        }

      }, {
        key: 'unmaskedValue',
        get: function get() {
          return this._unmaskedValue;
        },
        set: function set(str) {
          this.masked.unmaskedValue = str;
          this.updateControl();
          this.alignCursor();
        }

      }, {
        key: 'typedValue',
        get: function get() {
          return this.masked.typedValue;
        },
        set: function set(val) {
          this.masked.typedValue = val;
          this.updateControl();
          this.alignCursor();
        }
      }, {
        key: 'selectionStart',
        get: function get() {
          return this._cursorChanging ? this._changingCursorPos : this.el.selectionStart;
        }

      }, {
        key: 'cursorPos',
        get: function get() {
          return this._cursorChanging ? this._changingCursorPos : this.el.selectionEnd;
        },
        set: function set(pos) {
          if (!this.el || !this.el.isActive) {
            return;
          }
          this.el.select(pos, pos);

          this._saveSelection();
        }
      }]);

      return InputMask;
    }();
  IMask.InputMask = InputMask;


  var MaskedEnum =
    function (_MaskedPattern) {
      _inherits(MaskedEnum, _MaskedPattern);

      function MaskedEnum() {
        _classCallCheck(this, MaskedEnum);

        return _possibleConstructorReturn(this, _getPrototypeOf(MaskedEnum).apply(this, arguments));
      }

      _createClass(MaskedEnum, [{
        key: '_update',

        value: function _update(opts) {
          if (opts.enum) {
            opts.mask = '*'.repeat(opts.enum[0].length);
          }

          _get(_getPrototypeOf(MaskedEnum.prototype), '_update', this).call(this, opts);
        }

      }, {
        key: 'doValidate',
        value: function doValidate() {
          var _this = this;
          var _get2;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return this.enum.some(function (e) {
            return e.indexOf(_this.unmaskedValue) >= 0;
          }) && (_get2 = _get(_getPrototypeOf(MaskedEnum.prototype), 'doValidate', this)).call.apply(_get2, [this].concat(args));
        }
      }]);

      return MaskedEnum;
    }(MaskedPattern);
  IMask.MaskedEnum = MaskedEnum;

  var MaskedNumber =
    function (_Masked) {
      _inherits(MaskedNumber, _Masked);









      function MaskedNumber(opts) {
        _classCallCheck(this, MaskedNumber);

        return _possibleConstructorReturn(this, _getPrototypeOf(MaskedNumber).call(this, Object.assign({}, MaskedNumber.DEFAULTS, {}, opts)));
      }


      _createClass(MaskedNumber, [{
        key: '_update',
        value: function _update(opts) {
          _get(_getPrototypeOf(MaskedNumber.prototype), '_update', this).call(this, opts);

          this._updateRegExps();
        }

      }, {
        key: '_updateRegExps',
        value: function _updateRegExps() {
          var start = '^' + (this.allowNegative ? '[+|\\-]?' : '');
          var midInput = '(0|([1-9]+\\d*))?';
          var mid = '\\d*';
          var end = (this.scale ? '(' + escapeRegExp(this.radix) + '\\d{0,' + this.scale + '})?' : '') + '$';
          this._numberRegExpInput = new RegExp(start + midInput + end);
          this._numberRegExp = new RegExp(start + mid + end);
          this._mapToRadixRegExp = new RegExp('[' + this.mapToRadix.map(escapeRegExp).join('') + ']', 'g');
          this._thousandsSeparatorRegExp = new RegExp(escapeRegExp(this.thousandsSeparator), 'g');
        }

      }, {
        key: '_removeThousandsSeparators',
        value: function _removeThousandsSeparators(value) {
          return value.replace(this._thousandsSeparatorRegExp, '');
        }

      }, {
        key: '_insertThousandsSeparators',
        value: function _insertThousandsSeparators(value) {
          var parts = value.split(this.radix);
          parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, this.thousandsSeparator);
          return parts.join(this.radix);
        }

      }, {
        key: 'doPrepare',
        value: function doPrepare(str) {
          var _get2;

          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }

          return (_get2 = _get(_getPrototypeOf(MaskedNumber.prototype), 'doPrepare', this)).call.apply(_get2, [this, this._removeThousandsSeparators(str.replace(this._mapToRadixRegExp, this.radix))].concat(args));
        }

      }, {
        key: '_separatorsCount',
        value: function _separatorsCount(to) {
          var extendOnSeparators = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
          var count = 0;

          for (var pos = 0; pos < to; ++pos) {
            if (this._value.indexOf(this.thousandsSeparator, pos) === pos) {
              ++count;
              if (extendOnSeparators) {
                to += this.thousandsSeparator.length;
              }
            }
          }

          return count;
        }

      }, {
        key: '_separatorsCountFromSlice',
        value: function _separatorsCountFromSlice() {
          var slice = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._value;
          return this._separatorsCount(this._removeThousandsSeparators(slice).length, true);
        }

      }, {
        key: 'extractInput',
        value: function extractInput() {
          var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
          var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
          var flags = arguments.length > 2 ? arguments[2] : undefined;

          var _this$_adjustRangeWit = this._adjustRangeWithSeparators(fromPos, toPos);

          var _this$_adjustRangeWit2 = _slicedToArray(_this$_adjustRangeWit, 2);

          fromPos = _this$_adjustRangeWit2[0];
          toPos = _this$_adjustRangeWit2[1];
          return this._removeThousandsSeparators(_get(_getPrototypeOf(MaskedNumber.prototype), 'extractInput', this).call(this, fromPos, toPos, flags));
        }

      }, {
        key: '_appendCharRaw',
        value: function _appendCharRaw(ch) {
          var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          if (!this.thousandsSeparator) {
            return _get(_getPrototypeOf(MaskedNumber.prototype), '_appendCharRaw', this).call(this, ch, flags);
          }
          var prevBeforeTailValue = flags.tail && flags._beforeTailState ? flags._beforeTailState._value : this._value;

          var prevBeforeTailSeparatorsCount = this._separatorsCountFromSlice(prevBeforeTailValue);

          this._value = this._removeThousandsSeparators(this.value);

          var appendDetails = _get(_getPrototypeOf(MaskedNumber.prototype), '_appendCharRaw', this).call(this, ch, flags);

          this._value = this._insertThousandsSeparators(this._value);
          var beforeTailValue = flags.tail && flags._beforeTailState ? flags._beforeTailState._value : this._value;

          var beforeTailSeparatorsCount = this._separatorsCountFromSlice(beforeTailValue);

          appendDetails.tailShift += (beforeTailSeparatorsCount - prevBeforeTailSeparatorsCount) * this.thousandsSeparator.length;
          appendDetails.skip = !appendDetails.rawInserted && ch === this.thousandsSeparator;
          return appendDetails;
        }

      }, {
        key: '_findSeparatorAround',
        value: function _findSeparatorAround(pos) {
          if (this.thousandsSeparator) {
            var searchFrom = pos - this.thousandsSeparator.length + 1;
            var separatorPos = this.value.indexOf(this.thousandsSeparator, searchFrom);
            if (separatorPos <= pos) {
              return separatorPos;
            }
          }

          return -1;
        }
      }, {
        key: '_adjustRangeWithSeparators',
        value: function _adjustRangeWithSeparators(from, to) {
          var separatorAroundFromPos = this._findSeparatorAround(from);

          if (separatorAroundFromPos >= 0) {
            from = separatorAroundFromPos;
          }

          var separatorAroundToPos = this._findSeparatorAround(to);

          if (separatorAroundToPos >= 0) {
            to = separatorAroundToPos + this.thousandsSeparator.length;
          }
          return [from, to];
        }

      }, {
        key: 'remove',
        value: function remove() {
          var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
          var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;

          var _this$_adjustRangeWit3 = this._adjustRangeWithSeparators(fromPos, toPos);

          var _this$_adjustRangeWit4 = _slicedToArray(_this$_adjustRangeWit3, 2);

          fromPos = _this$_adjustRangeWit4[0];
          toPos = _this$_adjustRangeWit4[1];
          var valueBeforePos = this.value.slice(0, fromPos);
          var valueAfterPos = this.value.slice(toPos);

          var prevBeforeTailSeparatorsCount = this._separatorsCount(valueBeforePos.length);

          this._value = this._insertThousandsSeparators(this._removeThousandsSeparators(valueBeforePos + valueAfterPos));

          var beforeTailSeparatorsCount = this._separatorsCountFromSlice(valueBeforePos);

          return new ChangeDetails({
            tailShift: (beforeTailSeparatorsCount - prevBeforeTailSeparatorsCount) * this.thousandsSeparator.length
          });
        }

      }, {
        key: 'nearestInputPos',
        value: function nearestInputPos(cursorPos, direction) {
          if (!this.thousandsSeparator) {
            return cursorPos;
          }

          switch (direction) {
            case DIRECTION.NONE:
            case DIRECTION.LEFT:
            case DIRECTION.FORCE_LEFT:
            {
              var separatorAtLeftPos = this._findSeparatorAround(cursorPos - 1);

              if (separatorAtLeftPos >= 0) {
                var separatorAtLeftEndPos = separatorAtLeftPos + this.thousandsSeparator.length;

                if (cursorPos < separatorAtLeftEndPos || this.value.length <= separatorAtLeftEndPos || direction === DIRECTION.FORCE_LEFT) {
                  return separatorAtLeftPos;
                }
              }

              break;
            }

            case DIRECTION.RIGHT:
            case DIRECTION.FORCE_RIGHT:
            {
              var separatorAtRightPos = this._findSeparatorAround(cursorPos);

              if (separatorAtRightPos >= 0) {
                return separatorAtRightPos + this.thousandsSeparator.length;
              }
            }
          }

          return cursorPos;
        }

      }, {
        key: 'doValidate',
        value: function doValidate(flags) {
          var regexp = flags.input ? this._numberRegExpInput : this._numberRegExp; 

          var valid = regexp.test(this._removeThousandsSeparators(this.value));

          if (valid) {
            var number = this.number;
            valid = valid && !isNaN(number) && ( 
              this.min == null || this.min >= 0 || this.min <= this.number) && ( 
              this.max == null || this.max <= 0 || this.number <= this.max);
          }

          return valid && _get(_getPrototypeOf(MaskedNumber.prototype), 'doValidate', this).call(this, flags);
        }

      }, {
        key: 'doCommit',
        value: function doCommit() {
          if (this.value) {
            var number = this.number;
            var validnum = number; 

            if (this.min != null) {
              validnum = Math.max(validnum, this.min);
            }
            if (this.max != null) {
              validnum = Math.min(validnum, this.max);
            }
            if (validnum !== number) {
              this.unmaskedValue = String(validnum);
            }
            var formatted = this.value;
            if (this.normalizeZeros) {
              formatted = this._normalizeZeros(formatted);
            }
            if (this.padFractionalZeros) {
              formatted = this._padFractionalZeros(formatted);
            }
            this._value = formatted;
          }

          _get(_getPrototypeOf(MaskedNumber.prototype), 'doCommit', this).call(this);
        }

      }, {
        key: '_normalizeZeros',
        value: function _normalizeZeros(value) {
          var parts = this._removeThousandsSeparators(value).split(this.radix); 


          parts[0] = parts[0].replace(/^(\D*)(0*)(\d*)/, function (match, sign, zeros, num) {
            return sign + num;
          }); 

          if (value.length && !/\d$/.test(parts[0])) {
            parts[0] = parts[0] + '0';
          }

          if (parts.length > 1) {
            parts[1] = parts[1].replace(/0*$/, ''); 

            if (!parts[1].length) {
              parts.length = 1;
            } 
          }

          return this._insertThousandsSeparators(parts.join(this.radix));
        }

      }, {
        key: '_padFractionalZeros',
        value: function _padFractionalZeros(value) {
          if (!value) {
            return value;
          }
          var parts = value.split(this.radix);
          if (parts.length < 2) {
            parts.push('');
          }
          parts[1] = parts[1].padEnd(this.scale, '0');
          return parts.join(this.radix);
        }

      }, {
        key: 'unmaskedValue',
        get: function get() {
          return this._removeThousandsSeparators(this._normalizeZeros(this.value)).replace(this.radix, '.');
        },
        set: function set(unmaskedValue) {
          _set(_getPrototypeOf(MaskedNumber.prototype), 'unmaskedValue', unmaskedValue.replace('.', this.radix), this, true);
        }

      }, {
        key: 'typedValue',
        get: function get() {
          return Number(this.unmaskedValue);
        },
        set: function set(n) {
          _set(_getPrototypeOf(MaskedNumber.prototype), 'unmaskedValue', String(n), this, true);
        }

      }, {
        key: 'number',
        get: function get() {
          return this.typedValue;
        },
        set: function set(number) {
          this.typedValue = number;
        }

      }, {
        key: 'allowNegative',
        get: function get() {
          return this.signed || this.min != null && this.min < 0 || this.max != null && this.max < 0;
        }
      }]);

      return MaskedNumber;
    }(Masked);
  MaskedNumber.DEFAULTS = {
    radix: ',',
    thousandsSeparator: '',
    mapToRadix: ['.'],
    scale: 2,
    signed: false,
    normalizeZeros: true,
    padFractionalZeros: false
  };
  IMask.MaskedNumber = MaskedNumber;


  var MaskedFunction =
    function (_Masked) {
      _inherits(MaskedFunction, _Masked);

      function MaskedFunction() {
        _classCallCheck(this, MaskedFunction);

        return _possibleConstructorReturn(this, _getPrototypeOf(MaskedFunction).apply(this, arguments));
      }

      _createClass(MaskedFunction, [{
        key: '_update',

        value: function _update(opts) {
          if (opts.mask) {
            opts.validate = opts.mask;
          }

          _get(_getPrototypeOf(MaskedFunction.prototype), '_update', this).call(this, opts);
        }
      }]);

      return MaskedFunction;
    }(Masked);
  IMask.MaskedFunction = MaskedFunction;

  var MaskedDynamic =
    function (_Masked) {
      _inherits(MaskedDynamic, _Masked);




      function MaskedDynamic(opts) {
        var _this;

        _classCallCheck(this, MaskedDynamic);

        _this = _possibleConstructorReturn(this, _getPrototypeOf(MaskedDynamic).call(this, Object.assign({}, MaskedDynamic.DEFAULTS, {}, opts)));
        _this.currentMask = null;
        return _this;
      }


      _createClass(MaskedDynamic, [{
        key: '_update',
        value: function _update(opts) {
          _get(_getPrototypeOf(MaskedDynamic.prototype), '_update', this).call(this, opts);

          if ('mask' in opts) {
            this.compiledMasks = Array.isArray(opts.mask) ? opts.mask.map(function (m) {
              return createMask(m);
            }) : [];
          }
        }

      }, {
        key: '_appendCharRaw',
        value: function _appendCharRaw() {
          var details = this._applyDispatch.apply(this, arguments);

          if (this.currentMask) {
            var _this$currentMask;

            details.aggregate((_this$currentMask = this.currentMask)._appendChar.apply(_this$currentMask, arguments));
          }

          return details;
        }
      }, {
        key: '_applyDispatch',
        value: function _applyDispatch() {
          var appended = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
          var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          var prevValueBeforeTail = flags.tail && flags._beforeTailState != null ? flags._beforeTailState._value : this.value;
          var inputValue = this.rawInputValue;
          var insertValue = flags.tail && flags._beforeTailState != null ? 
            flags._beforeTailState._rawInputValue : inputValue;
          var tailValue = inputValue.slice(insertValue.length);
          var prevMask = this.currentMask;
          var details = new ChangeDetails();
          var prevMaskState = prevMask && prevMask.state; 

          this.currentMask = this.doDispatch(appended, Object.assign({}, flags)); 

          if (this.currentMask) {
            if (this.currentMask !== prevMask) {
              this.currentMask.reset(); 

              var d = this.currentMask.append(insertValue, {
                raw: true
              });
              details.tailShift = d.inserted.length - prevValueBeforeTail.length;

              if (tailValue) {
                details.tailShift += this.currentMask.append(tailValue, {
                  raw: true,
                  tail: true
                }).tailShift;
              }
            } else {
              this.currentMask.state = prevMaskState;
            }
          }

          return details;
        }
      }, {
        key: '_appendPlaceholder',
        value: function _appendPlaceholder() {
          var details = this._applyDispatch.apply(this, arguments);

          if (this.currentMask) {
            details.aggregate(this.currentMask._appendPlaceholder());
          }

          return details;
        }

      }, {
        key: 'doDispatch',
        value: function doDispatch(appended) {
          var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          return this.dispatch(appended, this, flags);
        }

      }, {
        key: 'doValidate',
        value: function doValidate() {
          var _get2; var _this$currentMask2;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return (_get2 = _get(_getPrototypeOf(MaskedDynamic.prototype), 'doValidate', this)).call.apply(_get2, [this].concat(args)) && (!this.currentMask || (_this$currentMask2 = this.currentMask).doValidate.apply(_this$currentMask2, args));
        }

      }, {
        key: 'reset',
        value: function reset() {
          if (this.currentMask) {
            this.currentMask.reset();
          }
          this.compiledMasks.forEach(function (m) {
            return m.reset();
          });
        }

      }, {
        key: 'remove',

        value: function remove() {
          var details = new ChangeDetails();

          if (this.currentMask) {
            var _this$currentMask3;

            details.aggregate((_this$currentMask3 = this.currentMask).remove.apply(_this$currentMask3, arguments)) 
              .aggregate(this._applyDispatch());
          }

          return details;
        }

      }, {
        key: 'extractInput',

        value: function extractInput() {
          var _this$currentMask4;

          return this.currentMask ? (_this$currentMask4 = this.currentMask).extractInput.apply(_this$currentMask4, arguments) : '';
        }

      }, {
        key: 'extractTail',
        value: function extractTail() {
          var _this$currentMask5; var _get3;

          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          return this.currentMask ? (_this$currentMask5 = this.currentMask).extractTail.apply(_this$currentMask5, args) : (_get3 = _get(_getPrototypeOf(MaskedDynamic.prototype), 'extractTail', this)).call.apply(_get3, [this].concat(args));
        }

      }, {
        key: 'doCommit',
        value: function doCommit() {
          if (this.currentMask) {
            this.currentMask.doCommit();
          }

          _get(_getPrototypeOf(MaskedDynamic.prototype), 'doCommit', this).call(this);
        }

      }, {
        key: 'nearestInputPos',
        value: function nearestInputPos() {
          var _this$currentMask6; var _get4;

          for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
          }

          return this.currentMask ? (_this$currentMask6 = this.currentMask).nearestInputPos.apply(_this$currentMask6, args) : (_get4 = _get(_getPrototypeOf(MaskedDynamic.prototype), 'nearestInputPos', this)).call.apply(_get4, [this].concat(args));
        }
      }, {
        key: 'value',
        get: function get() {
          return this.currentMask ? this.currentMask.value : '';
        },
        set: function set(value) {
          _set(_getPrototypeOf(MaskedDynamic.prototype), 'value', value, this, true);
        }

      }, {
        key: 'unmaskedValue',
        get: function get() {
          return this.currentMask ? this.currentMask.unmaskedValue : '';
        },
        set: function set(unmaskedValue) {
          _set(_getPrototypeOf(MaskedDynamic.prototype), 'unmaskedValue', unmaskedValue, this, true);
        }

      }, {
        key: 'typedValue',
        get: function get() {
          return this.currentMask ? this.currentMask.typedValue : '';
        }, 
        set: function set(value) {
          var unmaskedValue = String(value); 

          if (this.currentMask) {
            this.currentMask.typedValue = value;
            unmaskedValue = this.currentMask.unmaskedValue;
          }

          this.unmaskedValue = unmaskedValue;
        }

      }, {
        key: 'isComplete',
        get: function get() {
          return !!this.currentMask && this.currentMask.isComplete;
        }
      }, {
        key: 'state',
        get: function get() {
          return Object.assign({}, _get(_getPrototypeOf(MaskedDynamic.prototype), 'state', this), {
            _rawInputValue: this.rawInputValue,
            compiledMasks: this.compiledMasks.map(function (m) {
              return m.state;
            }),
            currentMaskRef: this.currentMask,
            currentMask: this.currentMask && this.currentMask.state
          });
        },
        set: function set(state) {
          var compiledMasks = state.compiledMasks;
          var currentMaskRef = state.currentMaskRef;
          var currentMask = state.currentMask;
          var maskedState = _objectWithoutProperties(state, ['compiledMasks', 'currentMaskRef', 'currentMask']);

          this.compiledMasks.forEach(function (m, mi) {
            return m.state = compiledMasks[mi];
          });

          if (currentMaskRef != null) {
            this.currentMask = currentMaskRef;
            this.currentMask.state = currentMask;
          }

          _set(_getPrototypeOf(MaskedDynamic.prototype), 'state', maskedState, this, true);
        }
      }, {
        key: 'overwrite',
        get: function get() {
          return this.currentMask ? this.currentMask.overwrite : _get(_getPrototypeOf(MaskedDynamic.prototype), 'overwrite', this);
        },
        set: function set(overwrite) {
          console.warn('"overwrite" option is not available in dynamic mask, use this option in siblings');
        }
      }]);

      return MaskedDynamic;
    }(Masked);
  MaskedDynamic.DEFAULTS = {
    dispatch: function dispatch(appended, masked, flags) {
      if (!masked.compiledMasks.length) {
        return;
      }
      var inputValue = masked.rawInputValue; 

      var inputs = masked.compiledMasks.map(function (m, index) {
        m.reset();
        m.append(inputValue, {
          raw: true
        });
        m.append(appended, flags);
        var weight = m.rawInputValue.length;
        return {
          weight: weight,
          index: index
        };
      }); 

      inputs.sort(function (i1, i2) {
        return i2.weight - i1.weight;
      });
      return masked.compiledMasks[inputs[0].index];
    }
  };
  IMask.MaskedDynamic = MaskedDynamic;


  var PIPE_TYPE = {
    MASKED: 'value',
    UNMASKED: 'unmaskedValue',
    TYPED: 'typedValue'
  };

  function createPipe(mask) {
    var from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : PIPE_TYPE.MASKED;
    var to = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : PIPE_TYPE.MASKED;
    var masked = createMask(mask);
    return function (value) {
      return masked.runIsolated(function (m) {
        m[from] = value;
        return m[to];
      });
    };
  }

  function pipe(value) {
    for (var _len = arguments.length, pipeArgs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      pipeArgs[_key - 1] = arguments[_key];
    }

    return createPipe.apply(void 0, pipeArgs)(value);
  }
  IMask.PIPE_TYPE = PIPE_TYPE;
  IMask.createPipe = createPipe;
  IMask.pipe = pipe;

  try {
    globalThis.IMask = IMask;
  } catch (e) { }

  exports.HTMLContenteditableMaskElement = HTMLContenteditableMaskElement;
  exports.HTMLMaskElement = HTMLMaskElement;
  exports.InputMask = InputMask;
  exports.MaskElement = MaskElement;
  exports.Masked = Masked;
  exports.MaskedDate = MaskedDate;
  exports.MaskedDynamic = MaskedDynamic;
  exports.MaskedEnum = MaskedEnum;
  exports.MaskedFunction = MaskedFunction;
  exports.MaskedNumber = MaskedNumber;
  exports.MaskedPattern = MaskedPattern;
  exports.MaskedRange = MaskedRange;
  exports.MaskedRegExp = MaskedRegExp;
  exports.PIPE_TYPE = PIPE_TYPE;
  exports.createMask = createMask;
  exports.createPipe = createPipe;
  exports.default = IMask;
  exports.pipe = pipe;

  Object.defineProperty(exports, '__esModule', {value: true});

})));

(function (window) {
  var ua = navigator.userAgent;

  if (window.HTMLPictureElement && ((/ecko/).test(ua) && ua.match(/rv\:(\d+)/) && RegExp.$1 < 45)) {
    addEventListener("resize", (function () {
      var timer;

      var dummySrc = document.createElement("source");

      var fixRespimg = function (img) {
        var source, sizes;
        var picture = img.parentNode;

        if (picture.nodeName.toUpperCase() === "PICTURE") {
          source = dummySrc.cloneNode();

          picture.insertBefore(source, picture.firstElementChild);
          setTimeout(function () {
            picture.removeChild(source);
          });
        } else if (!img._pfLastSize || img.offsetWidth > img._pfLastSize) {
          img._pfLastSize = img.offsetWidth;
          sizes = img.sizes;
          img.sizes += ",100vw";
          setTimeout(function () {
            img.sizes = sizes;
          });
        }
      };

      var findPictureImgs = function () {
        var i;
        var imgs = document.querySelectorAll("picture > img, img[srcset][sizes]");
        for (i = 0; i < imgs.length; i++) {
          fixRespimg(imgs[i]);
        }
      };
      var onResize = function () {
        clearTimeout(timer);
        timer = setTimeout(findPictureImgs, 99);
      };
      var mq = window.matchMedia && matchMedia("(orientation: landscape)");
      var init = function () {
        onResize();

        if (mq && mq.addListener) {
          mq.addListener(onResize);
        }
      };

      dummySrc.srcset = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";

      if (/^[c|i]|d$/.test(document.readyState || "")) {
        init();
      } else {
        document.addEventListener("DOMContentLoaded", init);
      }

      return onResize;
    })());
  }
})(window);


(function (window, document, undefined) {
  "use strict";

  document.createElement("picture");

  var warn, eminpx, alwaysCheckWDescriptor, evalId;
  var pf = {};
  var isSupportTestReady = false;
  var noop = function () { };
  var image = document.createElement("img");
  var getImgAttr = image.getAttribute;
  var setImgAttr = image.setAttribute;
  var removeImgAttr = image.removeAttribute;
  var docElem = document.documentElement;
  var types = {};
  var cfg = {
    algorithm: ""
  };
  var srcAttr = "data-pfsrc";
  var srcsetAttr = srcAttr + "set";
  var ua = navigator.userAgent;
  var supportAbort = (/rident/).test(ua) || ((/ecko/).test(ua) && ua.match(/rv\:(\d+)/) && RegExp.$1 > 35);
  var curSrcProp = "currentSrc";
  var regWDesc = /\s+\+?\d+(e\d+)?w/;
  var regSize = /(\([^)]+\))?\s*(.+)/;
  var setOptions = window.picturefillCFG;
  var baseStyle = "position:absolute;left:0;visibility:hidden;display:block;padding:0;border:none;font-size:1em;width:1em;overflow:hidden;clip:rect(0px, 0px, 0px, 0px)";
  var fsCss = "font-size:100%!important;";
  var isVwDirty = true;

  var cssCache = {};
  var sizeLengthCache = {};
  var DPR = window.devicePixelRatio;
  var units = {
    px: 1,
    "in": 96
  };
  var anchor = document.createElement("a");
  var alreadyRun = false;


  var regexLeadingSpaces = /^[ \t\n\r\u000c]+/,
    regexLeadingCommasOrSpaces = /^[, \t\n\r\u000c]+/,
    regexLeadingNotSpaces = /^[^ \t\n\r\u000c]+/,
    regexTrailingCommas = /[,]+$/,
    regexNonNegativeInteger = /^\d+$/,

    regexFloatingPoint = /^-?(?:[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/;

  var on = function (obj, evt, fn, capture) {
    if (obj.addEventListener) {
      obj.addEventListener(evt, fn, capture || false);
    } else if (obj.attachEvent) {
      obj.attachEvent("on" + evt, fn);
    }
  };


  var memoize = function (fn) {
    var cache = {};
    return function (input) {
      if (!(input in cache)) {
        cache[input] = fn(input);
      }
      return cache[input];
    };
  };


  function isSpace(c) {
    return (c === "\u0020" || 
      c === "\u0009" || 
      c === "\u000A" || 
      c === "\u000C" || 
      c === "\u000D");  
  }

  var evalCSS = (function () {

    var regLength = /^([\d\.]+)(em|vw|px)$/;
    var replace = function () {
      var args = arguments, index = 0, string = args[0];
      while (++index in args) {
        string = string.replace(args[index], args[++index]);
      }
      return string;
    };

    var buildStr = memoize(function (css) {

      return "return " + replace((css || "").toLowerCase(),
        /\band\b/g, "&&",

        /,/g, "||",

        /min-([a-z-\s]+):/g, "e.$1>=",

        /max-([a-z-\s]+):/g, "e.$1<=",

        /calc([^)]+)/g, "($1)",

        /(\d+[\.]*[\d]*)([a-z]+)/g, "($1 * e.$2)",
        /^(?!(e.[a-z]|[0-9\.&=|><\+\-\*\(\)\/])).*/ig, ""
      ) + ";";
    });

    return function (css, length) {
      var parsedLength;
      if (!(css in cssCache)) {
        cssCache[css] = false;
        if (length && (parsedLength = css.match(regLength))) {
          cssCache[css] = parsedLength[1] * units[parsedLength[2]];
        } else {
          try {
            cssCache[css] = new Function("e", buildStr(css))(units);
          } catch (e) { }
        }
      }
      return cssCache[css];
    };
  })();

  var setResolution = function (candidate, sizesattr) {
    if (candidate.w) { 
      candidate.cWidth = pf.calcListLength(sizesattr || "100vw");
      candidate.res = candidate.w / candidate.cWidth;
    } else {
      candidate.res = candidate.d;
    }
    return candidate;
  };

  var picturefill = function (opt) {

    if (!isSupportTestReady) { return; }

    var elements, i, plen;

    var options = opt || {};

    if (options.elements && options.elements.nodeType === 1) {
      if (options.elements.nodeName.toUpperCase() === "IMG") {
        options.elements = [options.elements];
      } else {
        options.context = options.elements;
        options.elements = null;
      }
    }

    elements = options.elements || pf.qsa((options.context || document), (options.reevaluate || options.reselect) ? pf.sel : pf.selShort);

    if ((plen = elements.length)) {

      pf.setupRun(options);
      alreadyRun = true;

      for (i = 0; i < plen; i++) {
        pf.fillImg(elements[i], options);
      }

      pf.teardownRun(options);
    }
  };

  warn = (window.console && console.warn) ?
    function (message) {
      console.warn(message);
    } :
    noop
    ;

  if (!(curSrcProp in image)) {
    curSrcProp = "src";
  }

  types["image/jpeg"] = true;
  types["image/gif"] = true;
  types["image/png"] = true;

  function detectTypeSupport(type, typeUri) {
    var image = new window.Image();
    image.onerror = function () {
      types[type] = false;
      picturefill();
    };
    image.onload = function () {
      types[type] = image.width === 1;
      picturefill();
    };
    image.src = typeUri;
    return "pending";
  }

  types["image/svg+xml"] = document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1");

  function updateMetrics() {

    isVwDirty = false;
    DPR = window.devicePixelRatio;
    cssCache = {};
    sizeLengthCache = {};

    pf.DPR = DPR || 1;

    units.width = Math.max(window.innerWidth || 0, docElem.clientWidth);
    units.height = Math.max(window.innerHeight || 0, docElem.clientHeight);

    units.vw = units.width / 100;
    units.vh = units.height / 100;

    evalId = [units.height, units.width, DPR].join("-");

    units.em = pf.getEmValue();
    units.rem = units.em;
  }

  function chooseLowRes(lowerValue, higherValue, dprValue, isCached) {
    var bonusFactor, tooMuch, bonus, meanDensity;

    if (cfg.algorithm === "saveData") {
      if (lowerValue > 2.7) {
        meanDensity = dprValue + 1;
      } else {
        tooMuch = higherValue - dprValue;
        bonusFactor = Math.pow(lowerValue - 0.6, 1.5);

        bonus = tooMuch * bonusFactor;

        if (isCached) {
          bonus += 0.1 * bonusFactor;
        }

        meanDensity = lowerValue + bonus;
      }
    } else {
      meanDensity = (dprValue > 1) ?
        Math.sqrt(lowerValue * higherValue) :
        lowerValue;
    }

    return meanDensity > dprValue;
  }

  function applyBestCandidate(img) {
    var srcSetCandidates;
    var matchingSet = pf.getSet(img);
    var evaluated = false;
    if (matchingSet !== "pending") {
      evaluated = evalId;
      if (matchingSet) {
        srcSetCandidates = pf.setRes(matchingSet);
        pf.applySetCandidate(srcSetCandidates, img);
      }
    }
    img[pf.ns].evaled = evaluated;
  }

  function ascendingSort(a, b) {
    return a.res - b.res;
  }

  function setSrcToCur(img, src, set) {
    var candidate;
    if (!set && src) {
      set = img[pf.ns].sets;
      set = set && set[set.length - 1];
    }

    candidate = getCandidateForSrc(src, set);

    if (candidate) {
      src = pf.makeUrl(src);
      img[pf.ns].curSrc = src;
      img[pf.ns].curCan = candidate;

      if (!candidate.res) {
        setResolution(candidate, candidate.set.sizes);
      }
    }
    return candidate;
  }

  function getCandidateForSrc(src, set) {
    var i, candidate, candidates;
    if (src && set) {
      candidates = pf.parseSet(set);
      src = pf.makeUrl(src);
      for (i = 0; i < candidates.length; i++) {
        if (src === pf.makeUrl(candidates[i].url)) {
          candidate = candidates[i];
          break;
        }
      }
    }
    return candidate;
  }

  function getAllSourceElements(picture, candidates) {
    var i, len, source, srcset;

    var sources = picture.getElementsByTagName("source");

    for (i = 0, len = sources.length; i < len; i++) {
      source = sources[i];
      source[pf.ns] = true;
      srcset = source.getAttribute("srcset");

      if (srcset) {
        candidates.push({
          srcset: srcset,
          media: source.getAttribute("media"),
          type: source.getAttribute("type"),
          sizes: source.getAttribute("sizes")
        });
      }
    }
  }


  function parseSrcset(input, set) {

    function collectCharacters(regEx) {
      var chars,
        match = regEx.exec(input.substring(pos));
      if (match) {
        chars = match[0];
        pos += chars.length;
        return chars;
      }
    }

    var inputLength = input.length,
      url,
      descriptors,
      currentDescriptor,
      state,
      c,

      pos = 0,

      candidates = [];

    function parseDescriptors() {

      var pError = false,

        w, d, h, i,
        candidate = {},
        desc, lastChar, value, intVal, floatVal;

      for (i = 0; i < descriptors.length; i++) {
        desc = descriptors[i];

        lastChar = desc[desc.length - 1];
        value = desc.substring(0, desc.length - 1);
        intVal = parseInt(value, 10);
        floatVal = parseFloat(value);

        if (regexNonNegativeInteger.test(value) && (lastChar === "w")) {

          if (w || d) { pError = true; }

          if (intVal === 0) { pError = true; } else { w = intVal; }

        } else if (regexFloatingPoint.test(value) && (lastChar === "x")) {

          if (w || d || h) { pError = true; }

          if (floatVal < 0) { pError = true; } else { d = floatVal; }

        } else if (regexNonNegativeInteger.test(value) && (lastChar === "h")) {

          if (h || d) { pError = true; }

          if (intVal === 0) { pError = true; } else { h = intVal; }

        } else { pError = true; }
      } 

      if (!pError) {
        candidate.url = url;

        if (w) { candidate.w = w; }
        if (d) { candidate.d = d; }
        if (h) { candidate.h = h; }
        if (!h && !d && !w) { candidate.d = 1; }
        if (candidate.d === 1) { set.has1x = true; }
        candidate.set = set;

        candidates.push(candidate);
      }
    } 

    function tokenize() {

      collectCharacters(regexLeadingSpaces);

      currentDescriptor = "";

      state = "in descriptor";

      while (true) {

        c = input.charAt(pos);


        if (state === "in descriptor") {

          if (isSpace(c)) {
            if (currentDescriptor) {
              descriptors.push(currentDescriptor);
              currentDescriptor = "";
              state = "after descriptor";
            }

          } else if (c === ",") {
            pos += 1;
            if (currentDescriptor) {
              descriptors.push(currentDescriptor);
            }
            parseDescriptors();
            return;

          } else if (c === "\u0028") {
            currentDescriptor = currentDescriptor + c;
            state = "in parens";

          } else if (c === "") {
            if (currentDescriptor) {
              descriptors.push(currentDescriptor);
            }
            parseDescriptors();
            return;

          } else {
            currentDescriptor = currentDescriptor + c;
          }

        } else if (state === "in parens") {

          if (c === ")") {
            currentDescriptor = currentDescriptor + c;
            state = "in descriptor";

          } else if (c === "") {
            descriptors.push(currentDescriptor);
            parseDescriptors();
            return;

          } else {
            currentDescriptor = currentDescriptor + c;
          }

        } else if (state === "after descriptor") {

          if (isSpace(c)) {

          } else if (c === "") {
            parseDescriptors();
            return;

          } else {
            state = "in descriptor";
            pos -= 1;

          }
        }

        pos += 1;

      } 
    }

    while (true) {
      collectCharacters(regexLeadingCommasOrSpaces);

      if (pos >= inputLength) {
        return candidates; 
      }

      url = collectCharacters(regexLeadingNotSpaces);

      descriptors = [];

      if (url.slice(-1) === ",") {
        url = url.replace(regexTrailingCommas, "");
        parseDescriptors();

      } else {
        tokenize();
      } 

    } 
  }


  function parseSizes(strValue) {

    var regexCssLengthWithUnits = /^(?:[+-]?[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?(?:ch|cm|em|ex|in|mm|pc|pt|px|rem|vh|vmin|vmax|vw)$/i;

    var regexCssCalc = /^calc\((?:[0-9a-z \.\+\-\*\/\(\)]+)\)$/i;

    var i;
    var unparsedSizesList;
    var unparsedSizesListLength;
    var unparsedSize;
    var lastComponentValue;
    var size;


    function parseComponentValues(str) {
      var chrctr;
      var component = "";
      var componentArray = [];
      var listArray = [];
      var parenDepth = 0;
      var pos = 0;
      var inComment = false;

      function pushComponent() {
        if (component) {
          componentArray.push(component);
          component = "";
        }
      }

      function pushComponentArray() {
        if (componentArray[0]) {
          listArray.push(componentArray);
          componentArray = [];
        }
      }

      while (true) {
        chrctr = str.charAt(pos);

        if (chrctr === "") { 
          pushComponent();
          pushComponentArray();
          return listArray;
        } else if (inComment) {
          if ((chrctr === "*") && (str[pos + 1] === "/")) { 
            inComment = false;
            pos += 2;
            pushComponent();
            continue;
          } else {
            pos += 1; 
            continue;
          }
        } else if (isSpace(chrctr)) {
          if ((str.charAt(pos - 1) && isSpace(str.charAt(pos - 1))) || !component) {
            pos += 1;
            continue;
          } else if (parenDepth === 0) {
            pushComponent();
            pos += 1;
            continue;
          } else {
            chrctr = " ";
          }
        } else if (chrctr === "(") {
          parenDepth += 1;
        } else if (chrctr === ")") {
          parenDepth -= 1;
        } else if (chrctr === ",") {
          pushComponent();
          pushComponentArray();
          pos += 1;
          continue;
        } else if ((chrctr === "/") && (str.charAt(pos + 1) === "*")) {
          inComment = true;
          pos += 2;
          continue;
        }

        component = component + chrctr;
        pos += 1;
      }
    }

    function isValidNonNegativeSourceSizeValue(s) {
      if (regexCssLengthWithUnits.test(s) && (parseFloat(s) >= 0)) { return true; }
      if (regexCssCalc.test(s)) { return true; }
      if ((s === "0") || (s === "-0") || (s === "+0")) { return true; }
      return false;
    }


    unparsedSizesList = parseComponentValues(strValue);
    unparsedSizesListLength = unparsedSizesList.length;

    for (i = 0; i < unparsedSizesListLength; i++) {
      unparsedSize = unparsedSizesList[i];



      lastComponentValue = unparsedSize[unparsedSize.length - 1];

      if (isValidNonNegativeSourceSizeValue(lastComponentValue)) {
        size = lastComponentValue;
        unparsedSize.pop();
      } else {
        continue;
      }

      if (unparsedSize.length === 0) {
        return size;
      }

      unparsedSize = unparsedSize.join(" ");
      if (!(pf.matchesMedia(unparsedSize))) {
        continue;
      }

      return size;
    }

    return "100vw";
  }

  pf.ns = ("pf" + new Date().getTime()).substr(0, 9);

  pf.supSrcset = "srcset" in image;
  pf.supSizes = "sizes" in image;
  pf.supPicture = !!window.HTMLPictureElement;

  if (pf.supSrcset && pf.supPicture && !pf.supSizes) {
    (function (image2) {
      image.srcset = "data:,a";
      image2.src = "data:,a";
      pf.supSrcset = image.complete === image2.complete;
      pf.supPicture = pf.supSrcset && pf.supPicture;
    })(document.createElement("img"));
  }

  if (pf.supSrcset && !pf.supSizes) {

    (function () {
      var width2 = "data:image/gif;base64,R0lGODlhAgABAPAAAP///wAAACH5BAAAAAAALAAAAAACAAEAAAICBAoAOw==";
      var width1 = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
      var img = document.createElement("img");
      var test = function () {
        var width = img.width;

        if (width === 2) {
          pf.supSizes = true;
        }

        alwaysCheckWDescriptor = pf.supSrcset && !pf.supSizes;

        isSupportTestReady = true;
        setTimeout(picturefill);
      };

      img.onload = test;
      img.onerror = test;
      img.setAttribute("sizes", "9px");

      img.srcset = width1 + " 1w," + width2 + " 9w";
      img.src = width1;
    })();

  } else {
    isSupportTestReady = true;
  }

  pf.selShort = "picture>img,img[srcset]";
  pf.sel = pf.selShort;
  pf.cfg = cfg;

  pf.DPR = (DPR || 1);
  pf.u = units;

  pf.types = types;

  pf.setSize = noop;


  pf.makeUrl = memoize(function (src) {
    anchor.href = src;
    return anchor.href;
  });

  pf.qsa = function (context, sel) {
    return ("querySelector" in context) ? context.querySelectorAll(sel) : [];
  };

  pf.matchesMedia = function () {
    if (window.matchMedia && (matchMedia("(min-width: 0.1em)") || {}).matches) {
      pf.matchesMedia = function (media) {
        return !media || (matchMedia(media).matches);
      };
    } else {
      pf.matchesMedia = pf.mMQ;
    }

    return pf.matchesMedia.apply(this, arguments);
  };

  pf.mMQ = function (media) {
    return media ? evalCSS(media) : true;
  };

  pf.calcLength = function (sourceSizeValue) {

    var value = evalCSS(sourceSizeValue, true) || false;
    if (value < 0) {
      value = false;
    }

    return value;
  };


  pf.supportsType = function (type) {
    return (type) ? types[type] : true;
  };

  pf.parseSize = memoize(function (sourceSizeStr) {
    var match = (sourceSizeStr || "").match(regSize);
    return {
      media: match && match[1],
      length: match && match[2]
    };
  });

  pf.parseSet = function (set) {
    if (!set.cands) {
      set.cands = parseSrcset(set.srcset, set);
    }
    return set.cands;
  };

  pf.getEmValue = function () {
    var body;
    if (!eminpx && (body = document.body)) {
      var div = document.createElement("div"),
        originalHTMLCSS = docElem.style.cssText,
        originalBodyCSS = body.style.cssText;

      div.style.cssText = baseStyle;

      docElem.style.cssText = fsCss;
      body.style.cssText = fsCss;

      body.appendChild(div);
      eminpx = div.offsetWidth;
      body.removeChild(div);

      eminpx = parseFloat(eminpx, 10);

      docElem.style.cssText = originalHTMLCSS;
      body.style.cssText = originalBodyCSS;

    }
    return eminpx || 16;
  };

  pf.calcListLength = function (sourceSizeListStr) {
    if (!(sourceSizeListStr in sizeLengthCache) || cfg.uT) {
      var winningLength = pf.calcLength(parseSizes(sourceSizeListStr));

      sizeLengthCache[sourceSizeListStr] = !winningLength ? units.width : winningLength;
    }

    return sizeLengthCache[sourceSizeListStr];
  };

  pf.setRes = function (set) {
    var candidates;
    if (set) {

      candidates = pf.parseSet(set);

      for (var i = 0, len = candidates.length; i < len; i++) {
        setResolution(candidates[i], set.sizes);
      }
    }
    return candidates;
  };

  pf.setRes.res = setResolution;

  pf.applySetCandidate = function (candidates, img) {
    if (!candidates.length) { return; }
    var candidate,
      i,
      j,
      length,
      bestCandidate,
      curSrc,
      curCan,
      candidateSrc,
      abortCurSrc;

    var imageData = img[pf.ns];
    var dpr = pf.DPR;

    curSrc = imageData.curSrc || img[curSrcProp];

    curCan = imageData.curCan || setSrcToCur(img, curSrc, candidates[0].set);

    if (curCan && curCan.set === candidates[0].set) {

      abortCurSrc = (supportAbort && !img.complete && curCan.res - 0.1 > dpr);

      if (!abortCurSrc) {
        curCan.cached = true;

        if (curCan.res >= dpr) {
          bestCandidate = curCan;
        }
      }
    }

    if (!bestCandidate) {

      candidates.sort(ascendingSort);

      length = candidates.length;
      bestCandidate = candidates[length - 1];

      for (i = 0; i < length; i++) {
        candidate = candidates[i];
        if (candidate.res >= dpr) {
          j = i - 1;

          if (candidates[j] &&
            (abortCurSrc || curSrc !== pf.makeUrl(candidate.url)) &&
            chooseLowRes(candidates[j].res, candidate.res, dpr, candidates[j].cached)) {

            bestCandidate = candidates[j];

          } else {
            bestCandidate = candidate;
          }
          break;
        }
      }
    }

    if (bestCandidate) {

      candidateSrc = pf.makeUrl(bestCandidate.url);

      imageData.curSrc = candidateSrc;
      imageData.curCan = bestCandidate;

      if (candidateSrc !== curSrc) {
        pf.setSrc(img, bestCandidate);
      }
      pf.setSize(img);
    }
  };

  pf.setSrc = function (img, bestCandidate) {
    var origWidth;
    img.src = bestCandidate.url;

    if (bestCandidate.set.type === "image/svg+xml") {
      origWidth = img.style.width;
      img.style.width = (img.offsetWidth + 1) + "px";

      if (img.offsetWidth + 1) {
        img.style.width = origWidth;
      }
    }
  };

  pf.getSet = function (img) {
    var i, set, supportsType;
    var match = false;
    var sets = img[pf.ns].sets;

    for (i = 0; i < sets.length && !match; i++) {
      set = sets[i];

      if (!set.srcset || !pf.matchesMedia(set.media) || !(supportsType = pf.supportsType(set.type))) {
        continue;
      }

      if (supportsType === "pending") {
        set = supportsType;
      }

      match = set;
      break;
    }

    return match;
  };

  pf.parseSets = function (element, parent, options) {
    var srcsetAttribute, imageSet, isWDescripor, srcsetParsed;

    var hasPicture = parent && parent.nodeName.toUpperCase() === "PICTURE";
    var imageData = element[pf.ns];

    if (imageData.src === undefined || options.src) {
      imageData.src = getImgAttr.call(element, "src");
      if (imageData.src) {
        setImgAttr.call(element, srcAttr, imageData.src);
      } else {
        removeImgAttr.call(element, srcAttr);
      }
    }

    if (imageData.srcset === undefined || options.srcset || !pf.supSrcset || element.srcset) {
      srcsetAttribute = getImgAttr.call(element, "srcset");
      imageData.srcset = srcsetAttribute;
      srcsetParsed = true;
    }

    imageData.sets = [];

    if (hasPicture) {
      imageData.pic = true;
      getAllSourceElements(parent, imageData.sets);
    }

    if (imageData.srcset) {
      imageSet = {
        srcset: imageData.srcset,
        sizes: getImgAttr.call(element, "sizes")
      };

      imageData.sets.push(imageSet);

      isWDescripor = (alwaysCheckWDescriptor || imageData.src) && regWDesc.test(imageData.srcset || "");

      if (!isWDescripor && imageData.src && !getCandidateForSrc(imageData.src, imageSet) && !imageSet.has1x) {
        imageSet.srcset += ", " + imageData.src;
        imageSet.cands.push({
          url: imageData.src,
          d: 1,
          set: imageSet
        });
      }

    } else if (imageData.src) {
      imageData.sets.push({
        srcset: imageData.src,
        sizes: null
      });
    }

    imageData.curCan = null;
    imageData.curSrc = undefined;

    imageData.supported = !(hasPicture || (imageSet && !pf.supSrcset) || (isWDescripor && !pf.supSizes));

    if (srcsetParsed && pf.supSrcset && !imageData.supported) {
      if (srcsetAttribute) {
        setImgAttr.call(element, srcsetAttr, srcsetAttribute);
        element.srcset = "";
      } else {
        removeImgAttr.call(element, srcsetAttr);
      }
    }

    if (imageData.supported && !imageData.srcset && ((!imageData.src && element.src) || element.src !== pf.makeUrl(imageData.src))) {
      if (imageData.src === null) {
        element.removeAttribute("src");
      } else {
        element.src = imageData.src;
      }
    }

    imageData.parsed = true;
  };

  pf.fillImg = function (element, options) {
    var imageData;
    var extreme = options.reselect || options.reevaluate;

    if (!element[pf.ns]) {
      element[pf.ns] = {};
    }

    imageData = element[pf.ns];

    if (!extreme && imageData.evaled === evalId) {
      return;
    }

    if (!imageData.parsed || options.reevaluate) {
      pf.parseSets(element, element.parentNode, options);
    }

    if (!imageData.supported) {
      applyBestCandidate(element);
    } else {
      imageData.evaled = evalId;
    }
  };

  pf.setupRun = function () {
    if (!alreadyRun || isVwDirty || (DPR !== window.devicePixelRatio)) {
      updateMetrics();
    }
  };

  if (pf.supPicture) {
    picturefill = noop;
    pf.fillImg = noop;
  } else {

    (function () {
      var isDomReady;
      var regReady = window.attachEvent ? /d$|^c/ : /d$|^c|^i/;

      var run = function () {
        var readyState = document.readyState || "";

        timerId = setTimeout(run, readyState === "loading" ? 200 : 999);
        if (document.body) {
          pf.fillImgs();
          isDomReady = isDomReady || regReady.test(readyState);
          if (isDomReady) {
            clearTimeout(timerId);
          }

        }
      };

      var timerId = setTimeout(run, document.body ? 9 : 99);

      var debounce = function (func, wait) {
        var timeout, timestamp;
        var later = function () {
          var last = (new Date()) - timestamp;

          if (last < wait) {
            timeout = setTimeout(later, wait - last);
          } else {
            timeout = null;
            func();
          }
        };

        return function () {
          timestamp = new Date();

          if (!timeout) {
            timeout = setTimeout(later, wait);
          }
        };
      };
      var lastClientWidth = docElem.clientHeight;
      var onResize = function () {
        isVwDirty = Math.max(window.innerWidth || 0, docElem.clientWidth) !== units.width || docElem.clientHeight !== lastClientWidth;
        lastClientWidth = docElem.clientHeight;
        if (isVwDirty) {
          pf.fillImgs();
        }
      };

      on(window, "resize", debounce(onResize, 99));
      on(document, "readystatechange", run);
    })();
  }

  pf.picturefill = picturefill;
  pf.fillImgs = picturefill;
  pf.teardownRun = noop;

  picturefill._ = pf;

  window.picturefillCFG = {
    pf: pf,
    push: function (args) {
      var name = args.shift();
      if (typeof pf[name] === "function") {
        pf[name].apply(pf, args);
      } else {
        cfg[name] = args[0];
        if (alreadyRun) {
          pf.fillImgs({ reselect: true });
        }
      }
    }
  };

  while (setOptions && setOptions.length) {
    window.picturefillCFG.push(setOptions.shift());
  }

  window.picturefill = picturefill;

  if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = picturefill;
  } else if (typeof define === "function" && define.amd) {
    define("picturefill", function () { return picturefill; });
  }

  if (!pf.supPicture) {
    types["image/webp"] = detectTypeSupport("image/webp", "data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA==");
  }

})(window, document);

!function (root, factory) {
  "function" == typeof define && define.amd ? 
    define([], function () {
      return root.svg4everybody = factory();
    }) : "object" == typeof module && module.exports ? 
      module.exports = factory() : root.svg4everybody = factory();
}(this, function () {
  function embed(parent, svg, target, use) {
    if (target) {
      var fragment = document.createDocumentFragment(), viewBox = !svg.hasAttribute("viewBox") && target.getAttribute("viewBox");
      viewBox && svg.setAttribute("viewBox", viewBox);
      for (
        var clone = document.importNode ? document.importNode(target, !0) : target.cloneNode(!0), g = document.createElementNS(svg.namespaceURI || "http://www.w3.org/2000/svg", "g"); clone.childNodes.length;) {
        g.appendChild(clone.firstChild);
      }
      if (use) {
        for (var i = 0; use.attributes.length > i; i++) {
          var attr = use.attributes[i];
          "xlink:href" !== attr.name && "href" !== attr.name && g.setAttribute(attr.name, attr.value);
        }
      }
      fragment.appendChild(g), 
        parent.appendChild(fragment);
    }
  }
  function loadreadystatechange(xhr, use) {
    xhr.onreadystatechange = function () {
      if (4 === xhr.readyState) {
        var cachedDocument = xhr._cachedDocument;
        cachedDocument || (cachedDocument = xhr._cachedDocument = document.implementation.createHTMLDocument(""),
          cachedDocument.body.innerHTML = xhr.responseText, 
          cachedDocument.domain !== document.domain && (cachedDocument.domain = document.domain),
          xhr._cachedTarget = {}), 
          xhr._embeds.splice(0).map(function (item) {
            var target = xhr._cachedTarget[item.id];
            target || (target = xhr._cachedTarget[item.id] = cachedDocument.getElementById(item.id)),
              embed(item.parent, item.svg, target, use);
          });
      }
    }, 
      xhr.onreadystatechange();
  }
  function svg4everybody(rawopts) {
    function oninterval() {
      if (numberOfSvgUseElementsToBypass && uses.length - numberOfSvgUseElementsToBypass <= 0) {
        return void requestAnimationFrame(oninterval, 67);
      }
      numberOfSvgUseElementsToBypass = 0;
      for (
        var index = 0; index < uses.length;) {
        var use = uses[index], parent = use.parentNode, svg = getSVGAncestor(parent), src = use.getAttribute("xlink:href") || use.getAttribute("href");
        if (!src && opts.attributeName && (src = use.getAttribute(opts.attributeName)),
          svg && src) {
          if (polyfill) {
            if (!opts.validate || opts.validate(src, svg, use)) {
              parent.removeChild(use);
              var srcSplit = src.split("#"), url = srcSplit.shift(), id = srcSplit.join("#");
              if (url.length) {
                var xhr = requests[url];
                xhr || (xhr = requests[url] = new XMLHttpRequest(), xhr.open("GET", url), xhr.send(),
                  xhr._embeds = []), 
                  xhr._embeds.push({
                    parent: parent,
                    svg: svg,
                    id: id
                  }), 
                  loadreadystatechange(xhr, use);
              } else {
                embed(parent, svg, document.getElementById(id), use);
              }
            } else {
              ++index, ++numberOfSvgUseElementsToBypass;
            }
          }
        } else {
          ++index;
        }
      }
      requestAnimationFrame(oninterval, 67);
    }
    var polyfill, opts = Object(rawopts), newerIEUA = /\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/, webkitUA = /\bAppleWebKit\/(\d+)\b/, olderEdgeUA = /\bEdge\/12\.(\d+)\b/, edgeUA = /\bEdge\/.(\d+)\b/, inIframe = window.top !== window.self;
    polyfill = "polyfill" in opts ? opts.polyfill : newerIEUA.test(navigator.userAgent) || (navigator.userAgent.match(olderEdgeUA) || [])[1] < 10547 || (navigator.userAgent.match(webkitUA) || [])[1] < 537 || edgeUA.test(navigator.userAgent) && inIframe;
    var requests = {}, requestAnimationFrame = window.requestAnimationFrame || setTimeout, uses = document.getElementsByTagName("use"), numberOfSvgUseElementsToBypass = 0;
    polyfill && oninterval();
  }
  function getSVGAncestor(node) {
    for (var svg = node; "svg" !== svg.nodeName.toLowerCase() && (svg = svg.parentNode);) { }
    return svg;
  }
  return svg4everybody;
});

svg4everybody();
