parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"ooTL":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.SIGNUP_PATH=exports.LOGIN_PATH=exports.HOME_PATH=exports.navigateTo=void 0,exports.navigateTo=function(o){"localhost"==location.hostname?window.location.pathname=o:window.location.pathname="scheduler/"+o},exports.HOME_PATH="localhost"==location.hostname?"index.html":"",exports.LOGIN_PATH="login.html",exports.SIGNUP_PATH="signup.html";
},{}],"Zmr0":[function(require,module,exports) {
"use strict";var e,t;Object.defineProperty(exports,"__esModule",{value:!0}),exports.isLocalMode=exports.isDevMode=exports.serverUrl=exports.$createContainer=exports.keyInputListener=exports.$createInputElement=exports.$createParagraphElement=exports.$createButtonElement=exports.$renderAccountState=void 0;var n=require("../constants/paths"),o=require("./Modules/AuthModules");function r(e){var t=e.$container,n=e.user;n?i({$container:t,user:n}):a({$container:t})}function i(e){var t=e.user,r=e.$container,i=t.email,a=t.name;r.innerHTML='\n  <div id="user-information">\n    <p id="name">'+a+'</p>\n    <p id="email">'+i+'</p>\n  </div>\n  <div id="account-actions">\n    <a>Profile</a>\n    <a id="signout-button">Sign out</a>\n  </div>\n';document.getElementById("signout-button").addEventListener("click",function(){o.doSignOut().then(function(e){e.ok&&n.navigateTo(n.LOGIN_PATH)})})}function a(e){e.$container.innerHTML='\n    <div id="login-require">\n      <button id="login-button">LOG IN</button>\n    </div>\n';document.getElementById("login-button").addEventListener("click",function(){n.navigateTo(n.LOGIN_PATH)})}function s(e){var t=e.id,n=e.className,o=e.onClick,r=e.content,i=document.createElement("button");return t&&(i.id=t),n&&(i.className=n),o&&i.addEventListener("click",o),i.appendChild(document.createTextNode(r)),i}function c(e){var t=e.className,n=e.text,o=e.type,r=document.createElement(o);return t&&(r.className=t),r.appendChild(document.createTextNode(n)),r}function l(e){var t=e.id,n=e.className,o=e.placeholder,r=e.value,i=e.onSubmit,a=document.createElement("input");return t&&(a.id=t),n&&(a.className=n),o&&(a.placeholder=o),r&&(a.value=r),i&&a.addEventListener("keypress",function(e){"Enter"==e.key&&i(a.value).then(function(){a.value=""})}),a}function d(e,t){"Enter"==e.key&&t()}function u(e){var t=e.$elements,n=e.className,o=e.id,r=document.createElement("div");return o&&(r.id=o),n&&(r.className=n),t&&t.map(function(e){r.appendChild(e)}),r}exports.$renderAccountState=r,exports.$createButtonElement=s,exports.$createParagraphElement=c,exports.$createInputElement=l,exports.keyInputListener=d,exports.$createContainer=u,exports.serverUrl="https://pandajiny.shop/",exports.isDevMode=(null===(e="production")||void 0===e?void 0:e.includes("DEV"))||!1,exports.isLocalMode=(null===(t="production")||void 0===t?void 0:t.toString().includes("LOCAL"))||!1,exports.isLocalMode?(exports.serverUrl="http://localhost/",console.log("app is local mode server url : "+exports.serverUrl)):exports.isDevMode&&(console.log("app is dev mode"),fetch(exports.serverUrl).then(function(e){e.ok?console.log("server activated"):(console.log("server not responde, using localhost"),exports.serverUrl="http://localhost/")}));
},{"../constants/paths":"ooTL","./Modules/AuthModules":"SFuy"}],"SFuy":[function(require,module,exports) {
"use strict";var e=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(o,s){function i(e){try{u(r.next(e))}catch(t){s(t)}}function a(e){try{u(r.throw(e))}catch(t){s(t)}}function u(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n(function(e){e(t)})).then(i,a)}u((r=r.apply(e,t||[])).next())})},t=this&&this.__generator||function(e,t){var n,r,o,s,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return s={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function a(s){return function(a){return function(s){if(n)throw new TypeError("Generator is already executing.");for(;i;)try{if(n=1,r&&(o=2&s[0]?r.return:s[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,s[1])).done)return o;switch(r=0,o&&(s=[2&s[0],o.value]),s[0]){case 0:case 1:o=s;break;case 4:return i.label++,{value:s[1],done:!1};case 5:i.label++,r=s[1],s=[0];continue;case 7:s=i.ops.pop(),i.trys.pop();continue;default:if(!(o=(o=i.trys).length>0&&o[o.length-1])&&(6===s[0]||2===s[0])){i=0;continue}if(3===s[0]&&(!o||s[1]>o[0]&&s[1]<o[3])){i.label=s[1];break}if(6===s[0]&&i.label<o[1]){i.label=o[1],o=s;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(s);break}o[2]&&i.ops.pop(),i.trys.pop();continue}s=t.call(e,i)}catch(a){s=[6,a],r=0}finally{n=o=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,a])}}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.createAuthPostOption=exports.createPostOption=exports.getUser=exports.doSignUp=exports.doSignOut=exports.doLoginWithEmailAndPassword=exports.getAuthHeader=void 0;var n=require("../App");function r(){var e=localStorage.getItem("jwtToken")||null;return e?{Authorization:"Bearer "+e}:null}function o(r){return e(this,void 0,void 0,function(){var e,o,s;return t(this,function(t){switch(t.label){case 0:return e=n.serverUrl+"auth/login",[4,fetch(e,exports.createPostOption(r))];case 1:return(o=t.sent()).ok?[4,o.json()]:[3,3];case 2:return s=t.sent(),localStorage.setItem("jwtToken",s.access_token),[3,5];case 3:return[4,o.json()];case 4:throw(s=t.sent()).message;case 5:return[2]}})})}function s(){return e(this,void 0,Promise,function(){return t(this,function(e){return localStorage.removeItem("jwtToken"),[2,{ok:!0,message:"user sign out"}]})})}exports.getAuthHeader=r,exports.doLoginWithEmailAndPassword=o,exports.doSignOut=s,exports.doSignUp=function(r){return e(void 0,void 0,Promise,function(){var e,o,s;return t(this,function(t){switch(t.label){case 0:return e=n.serverUrl+"auth/signup",[4,fetch(e,exports.createPostOption(r))];case 1:if(!(o=t.sent()).ok)throw new Error("signup-failed");return[4,o.json()];case 2:return s=t.sent(),localStorage.setItem("jwtToken",s.access_token),console.log("signup done"),[2,{ok:!0,message:"signup ok"}]}})})},exports.getUser=function(){return e(void 0,void 0,Promise,function(){var e,o,s;return t(this,function(t){switch(t.label){case 0:return e=n.serverUrl+"auth/user",(o=r())?[4,fetch(e,{headers:o})]:[2,null];case 1:return[4,t.sent().json()];case 2:return s=t.sent(),console.log(s),[2,s.email&&s.uid?s:null]}})})},exports.createPostOption=function(e){return{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}},exports.createAuthPostOption=function(e){return{method:"POST",headers:{Authorization:"Bearer "+localStorage.getItem("jwtToken"),"Content-Type":"application/json"},body:JSON.stringify(e)}};
},{"../App":"Zmr0"}],"PUL4":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("../../constants/paths"),t=require("../Modules/AuthModules"),n=document.getElementById("email-input"),o=document.getElementById("password-input"),i=document.getElementById("login-button");i.addEventListener("click",s);var l=document.getElementById("signup-button");l.addEventListener("click",function(){return e.navigateTo(e.SIGNUP_PATH)});var u=document.getElementById("login-message");function r(e,t){return""!=e&&""!=t}function s(){var i=n.value,l=o.value;r(i,l)?t.doLoginWithEmailAndPassword({email:i,password:l}).catch(function(e){throw u.textContent=e,e}).then(function(){console.log("login passed, will redirect to home"),e.navigateTo(e.HOME_PATH)}):(u.textContent="Please fill blanks",console.error("user not filled input"))}
},{"../../constants/paths":"ooTL","../Modules/AuthModules":"SFuy"}]},{},["PUL4"], null)
//# sourceMappingURL=login.243caf24.js.map