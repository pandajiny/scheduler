// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../constants/paths.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SIGNUP_PATH = exports.LOGIN_PATH = exports.HOME_PATH = exports.navigateTo = void 0;

exports.navigateTo = function (pathname) {
  var _a;

  if ((_a = "development") === null || _a === void 0 ? void 0 : _a.includes("LOCAL")) {
    window.location.pathname = pathname;
  } else {
    window.location.pathname = "scheduler/" + pathname;
  }
};

exports.HOME_PATH = "index.html";
exports.LOGIN_PATH = "login.html";
exports.SIGNUP_PATH = "signup.html";
},{}],"../scripts/App.ts":[function(require,module,exports) {
"use strict";

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

var _a;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.serverUrl = exports.$createContainer = exports.$createInputElement = exports.$createParagraphElement = exports.$createButtonElement = exports.renderUserState = exports.renderNavigator = exports.renderTopbanner = void 0;

var paths_1 = require("../constants/paths");

var AuthModule_1 = require("./AuthModule");

exports.renderTopbanner = function () {};

exports.renderNavigator = function (navItems) {
  var $navigator = document.getElementById("navigator");
  $navigator.innerHTML = "";
  navItems.map(function (navItem) {
    var $navItem = document.createElement("a");
    $navItem.id = "nav-item";
    $navItem.appendChild(document.createTextNode(navItem.title));
    $navItem.addEventListener("click", function () {
      return paths_1.navigateTo(navItem.pathname);
    });
    $navigator.appendChild($navItem);
  });
};

function renderUserState() {
  return __awaiter(this, void 0, Promise, function () {
    var $userState, user, $loginRequire, $loginButton, $user, $signoutButton;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          $userState = document.getElementById("user-state");
          $userState.innerHTML = "";
          return [4
          /*yield*/
          , AuthModule_1.getUser()];

        case 1:
          user = _a.sent();
          console.log("got user state", user);

          if (!user) {
            $loginRequire = document.createElement("div");
            $loginRequire.appendChild(document.createTextNode("please login first"));
            $userState.appendChild($loginRequire);
            $loginButton = document.createElement("button");
            $loginButton.appendChild(document.createTextNode("LOGIN"));
            $loginButton.addEventListener("click", function () {
              paths_1.navigateTo(paths_1.LOGIN_PATH);
            });
            $userState.appendChild($loginButton);
            return [2
            /*return*/
            , null];
          } else {
            $user = document.createElement("p");
            $user.appendChild(document.createTextNode("Welcome " + user.email));
            $userState.appendChild($user);
            $signoutButton = document.createElement("button");
            $signoutButton.className = "text-button";
            $signoutButton.appendChild(document.createTextNode("SIGNOUT?"));
            $signoutButton.addEventListener("click", function () {
              AuthModule_1.doSignOut().then(function () {
                window.location.reload();
              });
            });
            $userState.appendChild($signoutButton);
            return [2
            /*return*/
            , user];
          }

          return [2
          /*return*/
          ];
      }
    });
  });
}

exports.renderUserState = renderUserState;

function $createButtonElement(props) {
  var id = props.id,
      className = props.className,
      onClick = props.onClick,
      content = props.content;
  var $button = document.createElement("button");

  if (id) {
    $button.id = id;
  }

  if (className) {
    $button.className = className;
  }

  if (onClick) {
    $button.addEventListener("click", onClick);
  }

  $button.appendChild(document.createTextNode(content));
  return $button;
}

exports.$createButtonElement = $createButtonElement;

function $createParagraphElement(props) {
  var className = props.className,
      text = props.text,
      type = props.type;
  var $element = document.createElement(type);

  if (className) {
    $element.className = className;
  }

  $element.appendChild(document.createTextNode(text));
  return $element;
}

exports.$createParagraphElement = $createParagraphElement;

function $createInputElement(props) {
  var id = props.id,
      className = props.className,
      placeholder = props.placeholder,
      value = props.value,
      onSubmit = props.onSubmit;
  var $input = document.createElement("input");

  if (id) {
    $input.id = id;
  }

  if (className) {
    $input.className = className;
  }

  if (placeholder) {
    $input.placeholder = placeholder;
  }

  if (value) {
    $input.value = value;
  }

  if (onSubmit) {
    $input.addEventListener("keypress", function (ev) {
      if (ev.key == "Enter") {
        onSubmit($input.value).then(function () {
          $input.value = "";
        });
      }
    });
  }

  return $input;
}

exports.$createInputElement = $createInputElement;

function $createContainer(props) {
  var $elements = props.$elements,
      className = props.className,
      id = props.id;
  var $container = document.createElement("div");

  if (id) {
    $container.id = id;
  }

  if (className) {
    $container.className = className;
  }

  if ($elements) {
    $elements.map(function ($element) {
      $container.appendChild($element);
    });
  }

  return $container;
}

exports.$createContainer = $createContainer;
exports.serverUrl = ((_a = "development") === null || _a === void 0 ? void 0 : _a.includes("LOCAL")) ? "http://localhost/" : "https://pandajiny.shop/" || "SERVER_URL not found";
},{"../constants/paths":"../constants/paths.ts","./AuthModule":"../scripts/AuthModule.ts"}],"../scripts/AuthModule.ts":[function(require,module,exports) {
"use strict";

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAuthPostOption = exports.createPostOption = exports.getAuthHeader = exports.getProfile = exports.getUser = exports.doSignUp = exports.doSignOut = exports.doLoginWithEmailAndPassword = void 0;

var App_1 = require("./App");

function doLoginWithEmailAndPassword(request) {
  return __awaiter(this, void 0, void 0, function () {
    var url, response, result, result;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          url = App_1.serverUrl + "auth/login";
          return [4
          /*yield*/
          , fetch(url, exports.createPostOption(request))];

        case 1:
          response = _a.sent();
          if (!response.ok) return [3
          /*break*/
          , 3];
          return [4
          /*yield*/
          , response.json()];

        case 2:
          result = _a.sent();
          localStorage.setItem("jwtToken", result.access_token);
          return [3
          /*break*/
          , 5];

        case 3:
          return [4
          /*yield*/
          , response.json()];

        case 4:
          result = _a.sent();
          throw result.message;

        case 5:
          return [2
          /*return*/
          ];
      }
    });
  });
}

exports.doLoginWithEmailAndPassword = doLoginWithEmailAndPassword;

exports.doSignOut = function () {
  return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
      localStorage.removeItem("jwtToken");
      return [2
      /*return*/
      ];
    });
  });
};

exports.doSignUp = function (request) {
  return __awaiter(void 0, void 0, Promise, function () {
    var url, response, result;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          url = App_1.serverUrl + "auth/signup";
          return [4
          /*yield*/
          , fetch(url, exports.createPostOption(request))];

        case 1:
          response = _a.sent();

          if (!response.ok) {
            throw new Error("signup-failed");
          }

          return [4
          /*yield*/
          , response.json()];

        case 2:
          result = _a.sent();
          localStorage.setItem("jwtToken", result.access_token);
          console.log("signup done");
          return [2
          /*return*/
          , {
            ok: true,
            message: "signup ok"
          }];
      }
    });
  });
};

exports.getUser = function () {
  return __awaiter(void 0, void 0, Promise, function () {
    var url, response, result;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          url = App_1.serverUrl + "auth/user";
          return [4
          /*yield*/
          , fetch(url, {
            headers: exports.getAuthHeader()
          })];

        case 1:
          response = _a.sent();
          return [4
          /*yield*/
          , response.json()];

        case 2:
          result = _a.sent();
          return [2
          /*return*/
          , result.email && result.uid ? result : null];
      }
    });
  });
};

exports.getProfile = function () {
  return __awaiter(void 0, void 0, void 0, function () {
    var url;
    return __generator(this, function (_a) {
      url = App_1.serverUrl + "profile";
      fetch(url, {
        headers: exports.getAuthHeader()
      }).then(function (resp) {
        resp.json().then(function (data) {
          console.log(data);
        });
      });
      return [2
      /*return*/
      ];
    });
  });
};

exports.getAuthHeader = function () {
  var token = localStorage.getItem("jwtToken");
  return {
    Authorization: "Bearer " + token
  };
};

exports.createPostOption = function (body) {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  };
};

exports.createAuthPostOption = function (body) {
  var token = localStorage.getItem("jwtToken");
  return {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  };
};
},{"./App":"../scripts/App.ts"}],"../scripts/pages/login.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var paths_1 = require("../../constants/paths");

var AuthModule_1 = require("../AuthModule"); // renderNavigator([{ title: "go home", pathname: HOME_PATH }]);


var $email = document.getElementById("email-input");
var $password = document.getElementById("password-input");
var $loginButton = document.getElementById("login-button");
$loginButton.addEventListener("click", function () {
  var email = $email.value;
  var password = $password.value; // validation

  if (isFormatted(email, password)) {
    AuthModule_1.doLoginWithEmailAndPassword({
      email: email,
      password: password
    }).catch(function (err) {
      $message.textContent = err;
      throw err;
    }).then(function () {
      console.log("login passed, will redirect to home"); // navigateTo(HOME_PATH);
    });
  } else {
    $message.textContent = "Please fill blanks";
    console.error("user not filled input");
  }
});
var $signupButton = document.getElementById("signup-button");
$signupButton.addEventListener("click", function () {
  return paths_1.navigateTo(paths_1.SIGNUP_PATH);
});
var $message = document.getElementById("login-message");

function isFormatted(email, _password) {
  return email != "" && _password != "";
}
},{"../../constants/paths":"../constants/paths.ts","../AuthModule":"../scripts/AuthModule.ts"}],"C:/Users/astic/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52180" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/astic/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","../scripts/pages/login.ts"], null)
//# sourceMappingURL=/login.810be02e.js.map