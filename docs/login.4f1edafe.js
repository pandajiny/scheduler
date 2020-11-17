parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"ooTL":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.SIGNUP_PATH=exports.LOGIN_PATH=exports.HOME_PATH=exports.navigateTo=void 0,exports.navigateTo=function(e){var o;(null===(o="production")?void 0:o.includes("LOCAL"))?window.location.pathname=e:window.location.pathname="scheduler/"+e},exports.HOME_PATH="index.html",exports.LOGIN_PATH="login.html",exports.SIGNUP_PATH="signup.html";
},{}],"Zmr0":[function(require,module,exports) {
"use strict";var e,t=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(a,o){function c(e){try{l(r.next(e))}catch(t){o(t)}}function i(e){try{l(r.throw(e))}catch(t){o(t)}}function l(e){var t;e.done?a(e.value):(t=e.value,t instanceof n?t:new n(function(e){e(t)})).then(c,i)}l((r=r.apply(e,t||[])).next())})},n=this&&this.__generator||function(e,t){var n,r,a,o,c={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return o={next:i(0),throw:i(1),return:i(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function i(o){return function(i){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;c;)try{if(n=1,r&&(a=2&o[0]?r.return:o[0]?r.throw||((a=r.return)&&a.call(r),0):r.next)&&!(a=a.call(r,o[1])).done)return a;switch(r=0,a&&(o=[2&o[0],a.value]),o[0]){case 0:case 1:a=o;break;case 4:return c.label++,{value:o[1],done:!1};case 5:c.label++,r=o[1],o=[0];continue;case 7:o=c.ops.pop(),c.trys.pop();continue;default:if(!(a=(a=c.trys).length>0&&a[a.length-1])&&(6===o[0]||2===o[0])){c=0;continue}if(3===o[0]&&(!a||o[1]>a[0]&&o[1]<a[3])){c.label=o[1];break}if(6===o[0]&&c.label<a[1]){c.label=a[1],a=o;break}if(a&&c.label<a[2]){c.label=a[2],c.ops.push(o);break}a[2]&&c.ops.pop(),c.trys.pop();continue}o=t.call(e,c)}catch(i){o=[6,i],r=0}finally{n=a=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,i])}}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.serverUrl=exports.$createContainer=exports.$createInputElement=exports.$createParagraphElement=exports.$createButtonElement=exports.renderUserState=exports.renderNavigator=exports.renderTopbanner=void 0;var r=require("../constants/paths"),a=require("./AuthModule");function o(){return t(this,void 0,Promise,function(){var e,t,o,c,i,l;return n(this,function(n){switch(n.label){case 0:return(e=document.getElementById("user-state")).innerHTML="",[4,a.getUser()];case 1:return t=n.sent(),console.log("got user state",t),t?((i=document.createElement("p")).appendChild(document.createTextNode("Welcome "+t.email)),e.appendChild(i),(l=document.createElement("button")).className="text-button",l.appendChild(document.createTextNode("SIGNOUT?")),l.addEventListener("click",function(){a.doSignOut().then(function(){window.location.reload()})}),e.appendChild(l),[2,t]):((o=document.createElement("div")).appendChild(document.createTextNode("please login first")),e.appendChild(o),(c=document.createElement("button")).appendChild(document.createTextNode("LOGIN")),c.addEventListener("click",function(){r.navigateTo(r.LOGIN_PATH)}),e.appendChild(c),[2,null])}})})}function c(e){var t=e.id,n=e.className,r=e.onClick,a=e.content,o=document.createElement("button");return t&&(o.id=t),n&&(o.className=n),r&&o.addEventListener("click",r),o.appendChild(document.createTextNode(a)),o}function i(e){var t=e.className,n=e.text,r=e.type,a=document.createElement(r);return t&&(a.className=t),a.appendChild(document.createTextNode(n)),a}function l(e){var t=e.id,n=e.className,r=e.placeholder,a=e.value,o=e.onSubmit,c=document.createElement("input");return t&&(c.id=t),n&&(c.className=n),r&&(c.placeholder=r),a&&(c.value=a),o&&c.addEventListener("keypress",function(e){"Enter"==e.key&&o(c.value).then(function(){c.value=""})}),c}function u(e){var t=e.$elements,n=e.className,r=e.id,a=document.createElement("div");return r&&(a.id=r),n&&(a.className=n),t&&t.map(function(e){a.appendChild(e)}),a}exports.renderTopbanner=function(){},exports.renderNavigator=function(e){var t=document.getElementById("navigator");t.innerHTML="",e.map(function(e){var n=document.createElement("a");n.id="nav-item",n.appendChild(document.createTextNode(e.title)),n.addEventListener("click",function(){return r.navigateTo(e.pathname)}),t.appendChild(n)})},exports.renderUserState=o,exports.$createButtonElement=c,exports.$createParagraphElement=i,exports.$createInputElement=l,exports.$createContainer=u,exports.serverUrl=(null===(e="production")||void 0===e?void 0:e.includes("LOCAL"))?"http://localhost/":"https://pandajiny.shop/";
},{"../constants/paths":"ooTL","./AuthModule":"sKwx"}],"sKwx":[function(require,module,exports) {
"use strict";var e=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))(function(o,i){function s(e){try{u(n.next(e))}catch(t){i(t)}}function a(e){try{u(n.throw(e))}catch(t){i(t)}}function u(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r(function(e){e(t)})).then(s,a)}u((n=n.apply(e,t||[])).next())})},t=this&&this.__generator||function(e,t){var r,n,o,i,s={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;s;)try{if(r=1,n&&(o=2&i[0]?n.return:i[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,i[1])).done)return o;switch(n=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return s.label++,{value:i[1],done:!1};case 5:s.label++,n=i[1],i=[0];continue;case 7:i=s.ops.pop(),s.trys.pop();continue;default:if(!(o=(o=s.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){s=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){s.label=i[1];break}if(6===i[0]&&s.label<o[1]){s.label=o[1],o=i;break}if(o&&s.label<o[2]){s.label=o[2],s.ops.push(i);break}o[2]&&s.ops.pop(),s.trys.pop();continue}i=t.call(e,s)}catch(a){i=[6,a],n=0}finally{r=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,a])}}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.createAuthPostOption=exports.createPostOption=exports.getAuthHeader=exports.getProfile=exports.getUser=exports.doSignUp=exports.doSignOut=exports.doLoginWithEmailAndPassword=void 0;var r=require("./App");function n(n){return e(this,void 0,void 0,function(){var e,o,i;return t(this,function(t){switch(t.label){case 0:return e=r.serverUrl+"auth/login",[4,fetch(e,exports.createPostOption(n))];case 1:return(o=t.sent()).ok?[4,o.json()]:[3,3];case 2:return i=t.sent(),localStorage.setItem("jwtToken",i.access_token),[3,5];case 3:return[4,o.json()];case 4:throw(i=t.sent()).message;case 5:return[2]}})})}exports.doLoginWithEmailAndPassword=n,exports.doSignOut=function(){return e(void 0,void 0,void 0,function(){return t(this,function(e){return localStorage.removeItem("jwtToken"),[2]})})},exports.doSignUp=function(n){return e(void 0,void 0,Promise,function(){var e,o,i;return t(this,function(t){switch(t.label){case 0:return e=r.serverUrl+"auth/signup",[4,fetch(e,exports.createPostOption(n))];case 1:if(!(o=t.sent()).ok)throw new Error("signup-failed");return[4,o.json()];case 2:return i=t.sent(),localStorage.setItem("jwtToken",i.access_token),console.log("signup done"),[2,{ok:!0,message:"signup ok"}]}})})},exports.getUser=function(){return e(void 0,void 0,Promise,function(){var e,n;return t(this,function(t){switch(t.label){case 0:return e=r.serverUrl+"auth/user",[4,fetch(e,{headers:exports.getAuthHeader()})];case 1:return[4,t.sent().json()];case 2:return[2,(n=t.sent()).email&&n.uid?n:null]}})})},exports.getProfile=function(){return e(void 0,void 0,void 0,function(){var e;return t(this,function(t){return e=r.serverUrl+"profile",fetch(e,{headers:exports.getAuthHeader()}).then(function(e){e.json().then(function(e){console.log(e)})}),[2]})})},exports.getAuthHeader=function(){return{Authorization:"Bearer "+localStorage.getItem("jwtToken")}},exports.createPostOption=function(e){return{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}},exports.createAuthPostOption=function(e){return{method:"POST",headers:{Authorization:"Bearer "+localStorage.getItem("jwtToken"),"Content-Type":"application/json"},body:JSON.stringify(e)}};
},{"./App":"Zmr0"}],"PUL4":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("../../constants/paths"),t=require("../AuthModule"),n=document.getElementById("email-input"),o=document.getElementById("password-input"),i=document.getElementById("login-button");i.addEventListener("click",function(){var e=n.value,i=o.value;u(e,i)?t.doLoginWithEmailAndPassword({email:e,password:i}).catch(function(e){throw r.textContent=e,e}).then(function(){console.log("login passed, will redirect to home")}):(r.textContent="Please fill blanks",console.error("user not filled input"))});var l=document.getElementById("signup-button");l.addEventListener("click",function(){return e.navigateTo(e.SIGNUP_PATH)});var r=document.getElementById("login-message");function u(e,t){return""!=e&&""!=t}
},{"../../constants/paths":"ooTL","../AuthModule":"sKwx"}]},{},["PUL4"], null)
//# sourceMappingURL=/login.4f1edafe.js.map