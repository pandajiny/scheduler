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
  if (location.hostname == "localhost") {
    window.location.pathname = pathname;
  } else {
    window.location.pathname = "scheduler/" + pathname;
  }
};

exports.HOME_PATH = location.hostname == "localhost" ? "index.html" : "";
exports.LOGIN_PATH = "login.html";
exports.SIGNUP_PATH = "signup.html";
},{}],"../scripts/Modules/AuthModules.ts":[function(require,module,exports) {
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
exports.createAuthPostOption = exports.createPostOption = exports.getUser = exports.doSignUp = exports.doSignOut = exports.doLoginWithEmailAndPassword = exports.getAuthHeader = void 0;

var App_1 = require("../App");

function getAuthHeader() {
  var token = localStorage.getItem("jwtToken") || null;

  if (!token) {
    return null;
  }

  return {
    Authorization: "Bearer " + token
  };
}

exports.getAuthHeader = getAuthHeader;

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

function doSignOut() {
  return __awaiter(this, void 0, Promise, function () {
    return __generator(this, function (_a) {
      localStorage.removeItem("jwtToken");
      return [2
      /*return*/
      , {
        ok: true,
        message: "user sign out"
      }];
    });
  });
}

exports.doSignOut = doSignOut;

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
    var url, headers, response, result;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          url = App_1.serverUrl + "auth/user";
          headers = getAuthHeader();

          if (!headers) {
            return [2
            /*return*/
            , null];
          }

          return [4
          /*yield*/
          , fetch(url, {
            headers: headers
          })];

        case 1:
          response = _a.sent();
          return [4
          /*yield*/
          , response.json()];

        case 2:
          result = _a.sent();
          console.log(result);
          return [2
          /*return*/
          , result.email && result.uid ? result : null];
      }
    });
  });
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
},{"../App":"../scripts/App.ts"}],"../scripts/App.ts":[function(require,module,exports) {
"use strict";

var _a, _b;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isLocalMode = exports.isDevMode = exports.serverUrl = exports.$createContainer = exports.keyInputListener = exports.$createInputElement = exports.$createParagraphElement = exports.$createButtonElement = exports.$renderAccountState = void 0;

var paths_1 = require("../constants/paths");

var AuthModules_1 = require("./Modules/AuthModules");

function $renderAccountState(props) {
  var $container = props.$container,
      user = props.user;

  if (user) {
    $renderUserState({
      $container: $container,
      user: user
    });
  } else {
    $renderLoginRequire({
      $container: $container
    });
  }
}

exports.$renderAccountState = $renderAccountState;

function $renderUserState(props) {
  var user = props.user,
      $container = props.$container;
  var email = user.email,
      name = user.name;
  $container.innerHTML = "\n  <div id=\"user-information\">\n    <p id=\"name\">" + name + "</p>\n    <p id=\"email\">" + email + "</p>\n  </div>\n  <div id=\"account-actions\">\n    <a>Profile</a>\n    <a id=\"signout-button\">Sign out</a>\n  </div>\n";
  var $signOutButton = document.getElementById("signout-button");

  var handleSignUpButtonClick = function handleSignUpButtonClick() {
    AuthModules_1.doSignOut().then(function (result) {
      if (result.ok) {
        paths_1.navigateTo(paths_1.LOGIN_PATH);
      }
    });
  };

  $signOutButton.addEventListener("click", handleSignUpButtonClick);
}

function $renderLoginRequire(props) {
  var $container = props.$container;
  $container.innerHTML = "\n    <div id=\"login-require\">\n      <button id=\"login-button\">LOG IN</button>\n    </div>\n";
  var $loginButton = document.getElementById("login-button");

  var handleLoginButtonClick = function handleLoginButtonClick() {
    paths_1.navigateTo(paths_1.LOGIN_PATH);
  };

  $loginButton.addEventListener("click", handleLoginButtonClick);
}

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

function keyInputListener(ev, onSubmit) {
  if (ev.key == "Enter") {
    onSubmit();
  }
}

exports.keyInputListener = keyInputListener;

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
exports.serverUrl = "https://pandajiny.shop";
exports.isDevMode = ((_a = "LOCAL ") === null || _a === void 0 ? void 0 : _a.includes("DEV")) || false;
exports.isLocalMode = ((_b = "LOCAL ") === null || _b === void 0 ? void 0 : _b.toString().includes("LOCAL")) || false;

if (exports.isLocalMode) {
  exports.serverUrl = "http://localhost/";
  console.log("app is local mode server url : " + exports.serverUrl);
} else if (exports.isDevMode) {
  // init dev mode
  console.log("app is dev mode");
  fetch(exports.serverUrl).then(function (res) {
    if (res.ok) {
      console.log("server activated");
    } else {
      console.log("server not responde, using localhost");
      exports.serverUrl = "http://localhost/";
    }
  });
}
},{"../constants/paths":"../constants/paths.ts","./Modules/AuthModules":"../scripts/Modules/AuthModules.ts"}],"../scripts/Modules/TodoModules.ts":[function(require,module,exports) {
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
exports.uncompleteTodos = exports.completeTodos = exports.editTodo = exports.deleteTodoItem = exports.addTodoItem = exports.getTodoItems = void 0;

var App_1 = require("../App");

var AuthModules_1 = require("./AuthModules");

exports.getTodoItems = function () {
  return __awaiter(void 0, void 0, Promise, function () {
    var url, headers, result, todoItems;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          console.log("get todoItems");
          url = App_1.serverUrl + "todo";
          headers = AuthModules_1.getAuthHeader();

          if (!headers) {
            return [2
            /*return*/
            , []];
          }

          return [4
          /*yield*/
          , fetch(url, {
            method: "GET",
            headers: headers
          })];

        case 1:
          result = _a.sent();

          if (!result.ok) {
            return [2
            /*return*/
            , []];
          }

          return [4
          /*yield*/
          , result.json()];

        case 2:
          todoItems = _a.sent();
          console.log(todoItems.length + " todo items updated");
          return [2
          /*return*/
          , todoItems];
      }
    });
  });
};

exports.addTodoItem = function (props) {
  return __awaiter(void 0, void 0, Promise, function () {
    var content, endTime, parentId, url, user, request;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          content = props.content, endTime = props.endTime, parentId = props.parentId;
          console.log("adding todo");
          url = App_1.serverUrl + "todo";
          return [4
          /*yield*/
          , AuthModules_1.getUser()];

        case 1:
          user = _a.sent();

          if (!user) {
            throw new Error("please login first");
          }

          console.log(user);

          if (!user.uid) {
            throw new Error("cannot get user's uid");
          }

          request = {
            content: content,
            parentId: parentId || null,
            isComplete: false,
            owner: user.uid,
            endTime: endTime || null
          };
          return [4
          /*yield*/
          , fetch(url, AuthModules_1.createAuthPostOption(request)).then(function (resp) {
            return __awaiter(void 0, void 0, void 0, function () {
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    return [4
                    /*yield*/
                    , resp.json()];

                  case 1:
                    return [2
                    /*return*/
                    , _a.sent()];
                }
              });
            });
          })];

        case 2:
          return [2
          /*return*/
          , _a.sent()];
      }
    });
  });
};

exports.deleteTodoItem = function (request) {
  return __awaiter(void 0, void 0, void 0, function () {
    var id, url, headers, resp, result;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          id = request.id;
          url = App_1.serverUrl + ("todo/" + id);
          headers = AuthModules_1.getAuthHeader();

          if (!headers) {
            throw "please login first";
          }

          return [4
          /*yield*/
          , fetch(url, {
            method: "DELETE",
            headers: headers
          })];

        case 1:
          resp = _a.sent();
          return [4
          /*yield*/
          , resp.json()];

        case 2:
          result = _a.sent();
          console.log("delete result", result);
          return [2
          /*return*/
          , result];
      }
    });
  });
};

function editTodo(todo) {
  return __awaiter(this, void 0, Promise, function () {
    var url, headers, resp, result;

    var _a;

    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          url = App_1.serverUrl + ("todo/" + todo.id);
          headers = Object.assign({
            "Content-Type": "application/json"
          }, AuthModules_1.getAuthHeader());
          return [4
          /*yield*/
          , fetch(url, {
            headers: headers,
            method: "PUT",
            body: JSON.stringify(todo)
          })];

        case 1:
          resp = _b.sent();
          if (!!resp.ok) return [3
          /*break*/
          , 3];
          _a = {
            ok: false
          };
          return [4
          /*yield*/
          , resp.json().then(function (r) {
            return r.message;
          })];

        case 2:
          return [2
          /*return*/
          , (_a.error_message = _b.sent(), _a)];

        case 3:
          return [4
          /*yield*/
          , resp.json()];

        case 4:
          result = _b.sent();
          console.log("edit todo result", result);
          return [2
          /*return*/
          , result];
      }
    });
  });
}

exports.editTodo = editTodo;

function completeTodos(ids) {
  return __awaiter(this, void 0, Promise, function () {
    var url, headers, resp, _a, result;

    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          url = App_1.serverUrl + "todo/complete";
          headers = Object.assign({
            "Content-Type": "application/json"
          }, AuthModules_1.getAuthHeader());
          return [4
          /*yield*/
          , fetch(url, {
            headers: headers,
            method: "POST",
            body: JSON.stringify(ids)
          })];

        case 1:
          resp = _b.sent();
          if (!!resp.ok) return [3
          /*break*/
          , 3];
          _a = Error.bind;
          return [4
          /*yield*/
          , resp.json()];

        case 2:
          throw new (_a.apply(Error, [void 0, _b.sent()]))();

        case 3:
          return [4
          /*yield*/
          , resp.json()];

        case 4:
          result = _b.sent();
          console.log("complete todos result", result);
          return [2
          /*return*/
          , result];
      }
    });
  });
}

exports.completeTodos = completeTodos;

function uncompleteTodos(ids) {
  return __awaiter(this, void 0, Promise, function () {
    var url, headers, resp, _a, result;

    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          url = App_1.serverUrl + "todo/uncomplete";
          headers = Object.assign({
            "Content-Type": "application/json"
          }, AuthModules_1.getAuthHeader());
          return [4
          /*yield*/
          , fetch(url, {
            headers: headers,
            method: "POST",
            body: JSON.stringify(ids)
          })];

        case 1:
          resp = _b.sent();
          if (!!resp.ok) return [3
          /*break*/
          , 3];
          _a = Error.bind;
          return [4
          /*yield*/
          , resp.json()];

        case 2:
          throw new (_a.apply(Error, [void 0, _b.sent()]))();

        case 3:
          return [4
          /*yield*/
          , resp.json()];

        case 4:
          result = _b.sent();
          console.log("uncomplete todos result", result);
          return [2
          /*return*/
          , result];
      }
    });
  });
}

exports.uncompleteTodos = uncompleteTodos;
},{"../App":"../scripts/App.ts","./AuthModules":"../scripts/Modules/AuthModules.ts"}],"../scripts/Modules/TimeModules.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertStringToTimestamp = exports.convertTimestampToString = void 0;

function convertTimestampToString(timestamp) {
  var date = new Date(timestamp);
  return date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
}

exports.convertTimestampToString = convertTimestampToString;

function convertStringToTimestamp(dateString) {
  var dateArgs = dateString.replace("/", "-").replace("/", "-").replace(".", "-").replace(".", "-").split("-").map(function (t) {
    return parseInt(t);
  });
  return new Date(dateArgs[0], dateArgs[1] - 1, dateArgs[2]).getTime();
}

exports.convertStringToTimestamp = convertStringToTimestamp;
},{}],"../scripts/pages/index.ts":[function(require,module,exports) {
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

var App_1 = require("../App");

var AuthModules_1 = require("../Modules/AuthModules");

var TodoModules_1 = require("../Modules/TodoModules");

require("../../pages/index.html");

var paths_1 = require("../../constants/paths");

var TimeModules_1 = require("../Modules/TimeModules");

initialPage();

function initialPage() {
  return __awaiter(this, void 0, void 0, function () {
    var user, $accountContainer;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [4
          /*yield*/
          , AuthModules_1.getUser()];

        case 1:
          user = _a.sent();

          if (user) {
            $accountContainer = document.getElementById("account-container");
            App_1.$renderAccountState({
              $container: $accountContainer,
              user: user
            });
            $initialAddingForm();
            updateView();
          } else {
            displayWelcomePage();
          }

          return [2
          /*return*/
          ];
      }
    });
  });
}

function updateView() {
  return __awaiter(this, void 0, void 0, function () {
    var todoItems, navItems, navPath;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [4
          /*yield*/
          , TodoModules_1.getTodoItems()];

        case 1:
          todoItems = _a.sent();
          navItems = [{
            title: "All todos",
            pathname: "all"
          }];
          getDateStringListFromTodoItems(todoItems).forEach(function (strDate) {
            navItems.push({
              title: strDate,
              pathname: strDate.replace("/", "").replace("/", "").replace(" ", "").toLowerCase()
            });
          });
          $updateNavList(navItems);
          console.log(navItems);
          navPath = getNavPath();
          document.getElementById("nav-" + navPath).className = "selected";
          $updateTodolist(todoItems, navPath);
          return [2
          /*return*/
          ];
      }
    });
  });
}

function getNavPath() {
  var path = window.location.search.replace("?path=", "");

  if (path == "" || path == "all") {
    return "all";
  } else if (path == "notselected") {
    return "notselected";
  } else {
    return path;
  }
}

function $updateNavList(navItems) {
  var $navList = document.getElementById("nav-list");
  $navList.innerHTML = "";
  navItems.forEach(function (navItem) {
    var $navItem = document.createElement("li");
    $navItem.id = "nav-" + navItem.pathname;
    $navItem.textContent = navItem.title;
    $navItem.addEventListener("click", function () {
      window.location.search = "?path=" + navItem.pathname;
    });
    $navList.appendChild($navItem);
  });
}

function getDateStringListFromTodoItems(todoItems) {
  var dateSet = new Set(todoItems.map(function (todoItem) {
    return todoItem.endTime;
  }));
  var stringDateList = [];
  dateSet.forEach(function (timestamp) {
    if (timestamp == null) {
      stringDateList.push("Not selected");
    } else {
      stringDateList.push(TimeModules_1.convertTimestampToString(timestamp));
    }
  });
  return stringDateList;
}

function $updateTodolist(todoItems, path) {
  return __awaiter(this, void 0, void 0, function () {
    function isWillDisplayed(navPath, endTime) {
      if (navPath == "all") {
        return true;
      }

      if (navPath == "notselected") {
        return endTime == null;
      } else {
        console.log(endTime, navPathToTimestamp(navPath));
        return endTime == navPathToTimestamp(navPath);
      }
    }

    var $todolist;
    return __generator(this, function (_a) {
      $todolist = document.getElementById("todolist");
      $todolist.innerHTML = "";
      todoItems.filter(function (todoItem) {
        return todoItem.parentId == null && isWillDisplayed(path, todoItem.endTime);
      }).forEach(function (todoItem) {
        var $todo = $createTodoItem(todoItem);
        $todolist.appendChild($todo);
      });
      return [2
      /*return*/
      ];
    });
  });
}

function $initialAddingForm() {
  var $addingForm = document.getElementById("add-todo-container");
  var $dateSelect = $addingForm.querySelector("#date-select");
  var $addTodoInput = document.getElementById("add-todo-input");
  $addTodoInput.addEventListener("keypress", handleAddTodoInputKeypress);

  function handleAddTodoInputKeypress(ev) {
    if (ev.key == "Enter") {
      var content = $addTodoInput.value;
      var endTime = $dateSelect.value != "" ? TimeModules_1.convertStringToTimestamp($dateSelect.value) : null;
      TodoModules_1.addTodoItem({
        content: content,
        endTime: endTime
      }).then(function (result) {
        if (result.ok) {
          $addTodoInput.value = "";
          updateView();
        } else {
          throw result.error_message;
        }
      });
    }
  }
}

function $createTodoItem(todo) {
  var $todoItem = document.createElement("div");
  $todoItem.id = "todo-" + todo.id;
  $todoItem.className = "todo";
  $todoItem.innerHTML = "\n    <div id=\"todo-content-container\">\n      <p id=\"date\">\n        " + (todo.endTime ? TimeModules_1.convertTimestampToString(todo.endTime) : "not selected") + "\n      </p>\n      <p id=\"content\">" + todo.content + "</p>\n      <div id=\"content-edit-container\" class=\"unactive\">\n        <p class=\"icon\">\u270E </p>\n        <input id=\"content-edit\" value=\"" + todo.content + "\" placeholder=\"...content here\" />\n      </div>\n    </div>\n    <div id=\"action-buttons\">\n      <button id=\"edit-button\" class=\"text-button\">\u270E</button>\n      <button id=\"done-button\" class=\"text-button\">\u2713</button>\n      <button id=\"delete-button\" class=\"text-button\">\u2716</button>\n    </div>\n  "; // content

  var $content = $todoItem.querySelector("#content");
  var $contentEditContainer = $todoItem.querySelector("#content-edit-container");
  var $contentEdit = $todoItem.querySelector("#content-edit");
  $contentEdit.addEventListener("keypress", function (ev) {
    App_1.keyInputListener(ev, function () {
      todo.content = $contentEdit.value;
      TodoModules_1.editTodo(todo).then(updateView);
    });
  }); // delete button

  var $deleteButton = $todoItem.querySelector("#delete-button");
  $deleteButton.addEventListener("click", function () {
    return handleDeleteButtonClick(todo.id);
  }); // edit button

  var $editButton = $todoItem.querySelector("#edit-button");
  $editButton.addEventListener("click", function () {
    handleEditButtonClick($content, $contentEditContainer);
  });

  function handleDeleteButtonClick(id) {
    TodoModules_1.deleteTodoItem({
      id: id
    }).then(updateView);
  }

  function handleEditButtonClick($content, $contentEditContainer) {
    $contentEditContainer.className = "active";
    $contentEditContainer.style.display = "flex";
    $content.className = "unactive";
  } // function handleDoneButtonClick(id: string) {}


  return $todoItem;
}

function displayWelcomePage() {
  var $introduce = document.getElementById("introduce");
  $introduce.style.display = "flex";
  var $signupButton = document.getElementById("signup-button");
  $signupButton.addEventListener("click", handleSignupButtonClick);
  var $loginButton = document.getElementById("login-button");
  $loginButton.addEventListener("click", handleLoginButtonClick);

  function handleLoginButtonClick() {
    paths_1.navigateTo(paths_1.LOGIN_PATH);
  }

  function handleSignupButtonClick() {
    paths_1.navigateTo(paths_1.SIGNUP_PATH);
  }
}

function navPathToTimestamp(path) {
  console.log(path);

  if (path == "all" || path == "notselected") {
    return 0;
  } else {
    var year = path.slice(0, 4);
    var month = path.slice(4, 6);
    var date = path.slice(6, 8);
    return TimeModules_1.convertStringToTimestamp(year + "/" + month + "/" + date);
  }
}
},{"../App":"../scripts/App.ts","../Modules/AuthModules":"../scripts/Modules/AuthModules.ts","../Modules/TodoModules":"../scripts/Modules/TodoModules.ts","../../pages/index.html":"index.html","../../constants/paths":"../constants/paths.ts","../Modules/TimeModules":"../scripts/Modules/TimeModules.ts"}],"C:/Users/astic/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51798" + '/');

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
},{}],"C:/Users/astic/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"C:/Users/astic/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/bundle-loader.js":[function(require,module,exports) {
var getBundleURL = require('./bundle-url').getBundleURL;

function loadBundlesLazy(bundles) {
  if (!Array.isArray(bundles)) {
    bundles = [bundles];
  }

  var id = bundles[bundles.length - 1];

  try {
    return Promise.resolve(require(id));
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      return new LazyPromise(function (resolve, reject) {
        loadBundles(bundles.slice(0, -1)).then(function () {
          return require(id);
        }).then(resolve, reject);
      });
    }

    throw err;
  }
}

function loadBundles(bundles) {
  return Promise.all(bundles.map(loadBundle));
}

var bundleLoaders = {};

function registerBundleLoader(type, loader) {
  bundleLoaders[type] = loader;
}

module.exports = exports = loadBundlesLazy;
exports.load = loadBundles;
exports.register = registerBundleLoader;
var bundles = {};

function loadBundle(bundle) {
  var id;

  if (Array.isArray(bundle)) {
    id = bundle[1];
    bundle = bundle[0];
  }

  if (bundles[bundle]) {
    return bundles[bundle];
  }

  var type = (bundle.substring(bundle.lastIndexOf('.') + 1, bundle.length) || bundle).toLowerCase();
  var bundleLoader = bundleLoaders[type];

  if (bundleLoader) {
    return bundles[bundle] = bundleLoader(getBundleURL() + bundle).then(function (resolved) {
      if (resolved) {
        module.bundle.register(id, resolved);
      }

      return resolved;
    }).catch(function (e) {
      delete bundles[bundle];
      throw e;
    });
  }
}

function LazyPromise(executor) {
  this.executor = executor;
  this.promise = null;
}

LazyPromise.prototype.then = function (onSuccess, onError) {
  if (this.promise === null) this.promise = new Promise(this.executor);
  return this.promise.then(onSuccess, onError);
};

LazyPromise.prototype.catch = function (onError) {
  if (this.promise === null) this.promise = new Promise(this.executor);
  return this.promise.catch(onError);
};
},{"./bundle-url":"C:/Users/astic/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"C:/Users/astic/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/loaders/browser/html-loader.js":[function(require,module,exports) {
module.exports = function loadHTMLBundle(bundle) {
  return fetch(bundle).then(function (res) {
    return res.text();
  });
};
},{}],0:[function(require,module,exports) {
var b=require("C:/Users/astic/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/bundle-loader.js");b.register("html",require("C:/Users/astic/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/loaders/browser/html-loader.js"));b.load([["index.html","index.html"]]).then(function(){require("../scripts/pages/index.ts");});
},{}]},{},["C:/Users/astic/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js",0], null)
//# sourceMappingURL=/pages.339cc8b7.js.map