parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"ooTL":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.SIGNUP_PATH=exports.LOGIN_PATH=exports.HOME_PATH=exports.navigateTo=void 0,exports.navigateTo=function(o){"localhost"==location.hostname?window.location.pathname=o:window.location.pathname="scheduler/"+o},exports.HOME_PATH="localhost"==location.hostname?"index.html":"",exports.LOGIN_PATH="login.html",exports.SIGNUP_PATH="signup.html";
},{}],"SFuy":[function(require,module,exports) {
"use strict";var e=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(o,s){function i(e){try{u(r.next(e))}catch(t){s(t)}}function a(e){try{u(r.throw(e))}catch(t){s(t)}}function u(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n(function(e){e(t)})).then(i,a)}u((r=r.apply(e,t||[])).next())})},t=this&&this.__generator||function(e,t){var n,r,o,s,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return s={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function a(s){return function(a){return function(s){if(n)throw new TypeError("Generator is already executing.");for(;i;)try{if(n=1,r&&(o=2&s[0]?r.return:s[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,s[1])).done)return o;switch(r=0,o&&(s=[2&s[0],o.value]),s[0]){case 0:case 1:o=s;break;case 4:return i.label++,{value:s[1],done:!1};case 5:i.label++,r=s[1],s=[0];continue;case 7:s=i.ops.pop(),i.trys.pop();continue;default:if(!(o=(o=i.trys).length>0&&o[o.length-1])&&(6===s[0]||2===s[0])){i=0;continue}if(3===s[0]&&(!o||s[1]>o[0]&&s[1]<o[3])){i.label=s[1];break}if(6===s[0]&&i.label<o[1]){i.label=o[1],o=s;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(s);break}o[2]&&i.ops.pop(),i.trys.pop();continue}s=t.call(e,i)}catch(a){s=[6,a],r=0}finally{n=o=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,a])}}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.createAuthPostOption=exports.createPostOption=exports.getUser=exports.doSignUp=exports.doSignOut=exports.doLoginWithEmailAndPassword=exports.getAuthHeader=void 0;var n=require("../App");function r(){var e=localStorage.getItem("jwtToken")||null;return e?{Authorization:"Bearer "+e}:null}function o(r){return e(this,void 0,void 0,function(){var e,o,s;return t(this,function(t){switch(t.label){case 0:return e=n.serverUrl+"auth/login",[4,fetch(e,exports.createPostOption(r))];case 1:return(o=t.sent()).ok?[4,o.json()]:[3,3];case 2:return s=t.sent(),localStorage.setItem("jwtToken",s.access_token),[3,5];case 3:return[4,o.json()];case 4:throw(s=t.sent()).message;case 5:return[2]}})})}function s(){return e(this,void 0,Promise,function(){return t(this,function(e){return localStorage.removeItem("jwtToken"),[2,{ok:!0,message:"user sign out"}]})})}exports.getAuthHeader=r,exports.doLoginWithEmailAndPassword=o,exports.doSignOut=s,exports.doSignUp=function(r){return e(void 0,void 0,Promise,function(){var e,o,s;return t(this,function(t){switch(t.label){case 0:return e=n.serverUrl+"auth/signup",[4,fetch(e,exports.createPostOption(r))];case 1:if(!(o=t.sent()).ok)throw new Error("signup-failed");return[4,o.json()];case 2:return s=t.sent(),localStorage.setItem("jwtToken",s.access_token),console.log("signup done"),[2,{ok:!0,message:"signup ok"}]}})})},exports.getUser=function(){return e(void 0,void 0,Promise,function(){var e,o,s;return t(this,function(t){switch(t.label){case 0:return e=n.serverUrl+"auth/user",(o=r())?[4,fetch(e,{headers:o})]:[2,null];case 1:return[4,t.sent().json()];case 2:return s=t.sent(),console.log(s),[2,s.email&&s.uid?s:null]}})})},exports.createPostOption=function(e){return{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}},exports.createAuthPostOption=function(e){return{method:"POST",headers:{Authorization:"Bearer "+localStorage.getItem("jwtToken"),"Content-Type":"application/json"},body:JSON.stringify(e)}};
},{"../App":"Zmr0"}],"Zmr0":[function(require,module,exports) {
"use strict";var e,t;Object.defineProperty(exports,"__esModule",{value:!0}),exports.isLocalMode=exports.isDevMode=exports.serverUrl=exports.$createContainer=exports.keyInputListener=exports.$createInputElement=exports.$createParagraphElement=exports.$createButtonElement=exports.$renderAccountState=void 0;var n=require("../constants/paths"),o=require("./Modules/AuthModules");function r(e){var t=e.$container,n=e.user;n?i({$container:t,user:n}):a({$container:t})}function i(e){var t=e.user,r=e.$container,i=t.email,a=t.name;r.innerHTML='\n  <div id="user-information">\n    <p id="name">'+a+'</p>\n    <p id="email">'+i+'</p>\n  </div>\n  <div id="account-actions">\n    <a>Profile</a>\n    <a id="signout-button">Sign out</a>\n  </div>\n';document.getElementById("signout-button").addEventListener("click",function(){o.doSignOut().then(function(e){e.ok&&n.navigateTo(n.LOGIN_PATH)})})}function a(e){e.$container.innerHTML='\n    <div id="login-require">\n      <button id="login-button">LOG IN</button>\n    </div>\n';document.getElementById("login-button").addEventListener("click",function(){n.navigateTo(n.LOGIN_PATH)})}function s(e){var t=e.id,n=e.className,o=e.onClick,r=e.content,i=document.createElement("button");return t&&(i.id=t),n&&(i.className=n),o&&i.addEventListener("click",o),i.appendChild(document.createTextNode(r)),i}function c(e){var t=e.className,n=e.text,o=e.type,r=document.createElement(o);return t&&(r.className=t),r.appendChild(document.createTextNode(n)),r}function l(e){var t=e.id,n=e.className,o=e.placeholder,r=e.value,i=e.onSubmit,a=document.createElement("input");return t&&(a.id=t),n&&(a.className=n),o&&(a.placeholder=o),r&&(a.value=r),i&&a.addEventListener("keypress",function(e){"Enter"==e.key&&i(a.value).then(function(){a.value=""})}),a}function d(e,t){"Enter"==e.key&&t()}function u(e){var t=e.$elements,n=e.className,o=e.id,r=document.createElement("div");return o&&(r.id=o),n&&(r.className=n),t&&t.map(function(e){r.appendChild(e)}),r}exports.$renderAccountState=r,exports.$createButtonElement=s,exports.$createParagraphElement=c,exports.$createInputElement=l,exports.keyInputListener=d,exports.$createContainer=u,exports.serverUrl="https://pandajiny.shop/",exports.isDevMode=(null===(e="production")||void 0===e?void 0:e.includes("DEV"))||!1,exports.isLocalMode=(null===(t="production")||void 0===t?void 0:t.toString().includes("LOCAL"))||!1,exports.isLocalMode?(exports.serverUrl="http://localhost/",console.log("app is local mode server url : "+exports.serverUrl)):exports.isDevMode&&(console.log("app is dev mode"),fetch(exports.serverUrl).then(function(e){e.ok?console.log("server activated"):(console.log("server not responde, using localhost"),exports.serverUrl="http://localhost/")}));
},{"../constants/paths":"ooTL","./Modules/AuthModules":"SFuy"}],"Wr6p":[function(require,module,exports) {
"use strict";var e=this&&this.__awaiter||function(e,t,r,o){return new(r||(r=Promise))(function(n,s){function i(e){try{a(o.next(e))}catch(t){s(t)}}function u(e){try{a(o.throw(e))}catch(t){s(t)}}function a(e){var t;e.done?n(e.value):(t=e.value,t instanceof r?t:new r(function(e){e(t)})).then(i,u)}a((o=o.apply(e,t||[])).next())})},t=this&&this.__generator||function(e,t){var r,o,n,s,i={label:0,sent:function(){if(1&n[0])throw n[1];return n[1]},trys:[],ops:[]};return s={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function u(s){return function(u){return function(s){if(r)throw new TypeError("Generator is already executing.");for(;i;)try{if(r=1,o&&(n=2&s[0]?o.return:s[0]?o.throw||((n=o.return)&&n.call(o),0):o.next)&&!(n=n.call(o,s[1])).done)return n;switch(o=0,n&&(s=[2&s[0],n.value]),s[0]){case 0:case 1:n=s;break;case 4:return i.label++,{value:s[1],done:!1};case 5:i.label++,o=s[1],s=[0];continue;case 7:s=i.ops.pop(),i.trys.pop();continue;default:if(!(n=(n=i.trys).length>0&&n[n.length-1])&&(6===s[0]||2===s[0])){i=0;continue}if(3===s[0]&&(!n||s[1]>n[0]&&s[1]<n[3])){i.label=s[1];break}if(6===s[0]&&i.label<n[1]){i.label=n[1],n=s;break}if(n&&i.label<n[2]){i.label=n[2],i.ops.push(s);break}n[2]&&i.ops.pop(),i.trys.pop();continue}s=t.call(e,i)}catch(u){s=[6,u],o=0}finally{r=n=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,u])}}},r=this&&this.__read||function(e,t){var r="function"==typeof Symbol&&e[Symbol.iterator];if(!r)return e;var o,n,s=r.call(e),i=[];try{for(;(void 0===t||t-- >0)&&!(o=s.next()).done;)i.push(o.value)}catch(u){n={error:u}}finally{try{o&&!o.done&&(r=s.return)&&r.call(s)}finally{if(n)throw n.error}}return i},o=this&&this.__spread||function(){for(var e=[],t=0;t<arguments.length;t++)e=e.concat(r(arguments[t]));return e};Object.defineProperty(exports,"__esModule",{value:!0}),exports.addGroup=exports.getGroupList=exports.getEndTimeListFromTodos=exports.uncompleteTodos=exports.completeTodos=exports.editTodo=exports.deleteTodoItem=exports.addTodoItem=exports.getTodoItemsFromLoggedInUser=exports.testReq=void 0;var n=require("../App"),s=require("./AuthModules");function i(){var e=n.serverUrl+"group",t=s.getAuthHeader();t&&fetch(e,{headers:t})}function u(r){return e(this,void 0,Promise,function(){var e,o,i,u,a;return t(this,function(t){switch(t.label){case 0:return e=n.serverUrl+"todo/"+r.id,o=Object.assign({"Content-Type":"application/json"},s.getAuthHeader()),[4,fetch(e,{headers:o,method:"PUT",body:JSON.stringify(r)})];case 1:return(i=t.sent()).ok?[3,3]:(a={ok:!1},[4,i.json().then(function(e){return e.message})]);case 2:return[2,(a.error_message=t.sent(),a)];case 3:return[4,i.json()];case 4:return u=t.sent(),console.log("edit todo result",u),[2,u]}})})}function a(r){return e(this,void 0,Promise,function(){var e,o,i,u,a;return t(this,function(t){switch(t.label){case 0:return e=n.serverUrl+"todo/complete",o=Object.assign({"Content-Type":"application/json"},s.getAuthHeader()),[4,fetch(e,{headers:o,method:"POST",body:JSON.stringify(r)})];case 1:return(i=t.sent()).ok?[3,3]:(u=Error.bind,[4,i.json()]);case 2:throw new(u.apply(Error,[void 0,t.sent()]));case 3:return[4,i.json()];case 4:return a=t.sent(),console.log("complete todos result",a),[2,a]}})})}function c(r){return e(this,void 0,Promise,function(){var e,o,i,u,a;return t(this,function(t){switch(t.label){case 0:return e=n.serverUrl+"todo/uncomplete",o=Object.assign({"Content-Type":"application/json"},s.getAuthHeader()),[4,fetch(e,{headers:o,method:"POST",body:JSON.stringify(r)})];case 1:return(i=t.sent()).ok?[3,3]:(u=Error.bind,[4,i.json()]);case 2:throw new(u.apply(Error,[void 0,t.sent()]));case 3:return[4,i.json()];case 4:return a=t.sent(),console.log("uncomplete todos result",a),[2,a]}})})}function l(e){return o(new Set(e.map(function(e){return e.end_time})))}function d(){return e(this,void 0,Promise,function(){var e,r,o;return t(this,function(t){switch(t.label){case 0:if(e=n.serverUrl+"group",!(r=s.getAuthHeader()))throw new Error("please login first");return[4,fetch(e,{headers:r})];case 1:return[4,t.sent().json()];case 2:return o=t.sent(),console.log("getting "+o.length+" of group list done"),[2,o]}})})}function h(r){return e(this,void 0,Promise,function(){var e,o,i,u,a;return t(this,function(t){switch(t.label){case 0:return e=r.groupName,console.log("add group with : "+e),o=n.serverUrl+"group",i=Object.assign(p,s.getAuthHeader()),u={groupName:e},[4,fetch(o,{method:"POST",headers:i,body:JSON.stringify(u)})];case 1:return[4,t.sent().json()];case 2:return a=t.sent(),console.log("add group done, "+a.message),[2,a]}})})}exports.testReq=i,exports.getTodoItemsFromLoggedInUser=function(){return e(void 0,void 0,Promise,function(){var e,r,o,i;return t(this,function(t){switch(t.label){case 0:return console.log("get todoItems"),e=n.serverUrl+"todo",(r=s.getAuthHeader())?[4,fetch(e,{method:"GET",headers:r})]:[2,[]];case 1:return(o=t.sent()).ok?[4,o.json()]:[2,[]];case 2:return i=t.sent(),console.log(i.length+" todo items updated"),[2,i]}})})},exports.addTodoItem=function(r){return e(void 0,void 0,Promise,function(){var o,i,u,a,c,l,d,h;return t(this,function(p){switch(p.label){case 0:return o=r.content,i=r.endTime,u=r.parentId,a=r.groupId,console.log("adding todo"),c=n.serverUrl+"todo",[4,s.getUser()];case 1:if(!(l=p.sent()))throw new Error("please login first");return d={content:o,parentId:u||null,isComplete:!1,owner:l.uid,endTime:i||null,groupId:a||null},[4,fetch(c,s.createAuthPostOption(d)).then(function(r){return e(void 0,void 0,void 0,function(){return t(this,function(e){switch(e.label){case 0:return[4,r.json()];case 1:return[2,e.sent()]}})})})];case 2:return h=p.sent(),console.log("adding todo done",h),[2,{ok:!0,message:"adding todo done"}]}})})},exports.deleteTodoItem=function(r){return e(void 0,void 0,void 0,function(){var e,o,i,u;return t(this,function(t){switch(t.label){case 0:if(e=r.id,o=n.serverUrl+"todo/"+e,!(i=s.getAuthHeader()))throw"please login first";return[4,fetch(o,{method:"DELETE",headers:i})];case 1:return[4,t.sent().json()];case 2:return u=t.sent(),console.log("delete result",u),[2,u]}})})},exports.editTodo=u,exports.completeTodos=a,exports.uncompleteTodos=c,exports.getEndTimeListFromTodos=l,exports.getGroupList=d,exports.addGroup=h;var p={"Content-Type":"application/json"};
},{"../App":"Zmr0","./AuthModules":"SFuy"}],"ro44":[function(require,module,exports) {
"use strict";function t(t){var e=new Date(t);return e.getFullYear()+"/"+(e.getMonth()+1)+"/"+e.getDate()}function e(t){var e=t.split("/").join("").split(".").join("").split("-").map(function(t){return parseInt(t)});return new Date(e[0],e[1]-1,e[2]).getTime()}Object.defineProperty(exports,"__esModule",{value:!0}),exports.convertStringToTimestamp=exports.convertTimestampToString=void 0,exports.convertTimestampToString=t,exports.convertStringToTimestamp=e;
},{}],"cXqv":[function(require,module,exports) {
"use strict";var e=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))(function(r,i){function a(e){try{u(o.next(e))}catch(t){i(t)}}function c(e){try{u(o.throw(e))}catch(t){i(t)}}function u(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n(function(e){e(t)})).then(a,c)}u((o=o.apply(e,t||[])).next())})},t=this&&this.__generator||function(e,t){var n,o,r,i,a={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return i={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function c(i){return function(c){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,o&&(r=2&i[0]?o.return:i[0]?o.throw||((r=o.return)&&r.call(o),0):o.next)&&!(r=r.call(o,i[1])).done)return r;switch(o=0,r&&(i=[2&i[0],r.value]),i[0]){case 0:case 1:r=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,o=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(r=(r=a.trys).length>0&&r[r.length-1])&&(6===i[0]||2===i[0])){a=0;continue}if(3===i[0]&&(!r||i[1]>r[0]&&i[1]<r[3])){a.label=i[1];break}if(6===i[0]&&a.label<r[1]){a.label=r[1],r=i;break}if(r&&a.label<r[2]){a.label=r[2],a.ops.push(i);break}r[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(c){i=[6,c],o=0}finally{n=r=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,c])}}};Object.defineProperty(exports,"__esModule",{value:!0});var n=require("../App"),o=require("../Modules/AuthModules"),r=require("../Modules/TodoModules");require("../../pages/index.html");var i=require("../../constants/paths"),a=require("../Modules/TimeModules");function c(){return e(this,void 0,void 0,function(){var e,n,i,a;return t(this,function(t){switch(t.label){case 0:return[4,o.getUser()];case 1:return(e=t.sent())?(d(e),[4,r.getTodoItemsFromLoggedInUser()]):[3,4];case 2:return n=t.sent(),[4,r.getGroupList()];case 3:return i=t.sent(),a=r.getEndTimeListFromTodos(n),v(n,i),l({endTimes:a,groups:i}),[3,5];case 4:E(),t.label=5;case 5:return[2]}})})}function u(){return e(this,void 0,void 0,function(){var e,n,o;return t(this,function(t){switch(t.label){case 0:return[4,r.getTodoItemsFromLoggedInUser()];case 1:return e=t.sent(),[4,r.getGroupList()];case 2:return n=t.sent(),s({endTimes:r.getEndTimeListFromTodos(e),groups:n}),o=p(),T(e,o),[2]}})})}function d(e){document.getElementById("content-container").style.display="flex";var t=document.getElementById("account-container");n.$renderAccountState({$container:t,user:e})}function l(e){var t=e.endTimes,n=e.groups;document.getElementById("create-group-button").addEventListener("click",function(){var e=prompt("new group name","GROUP NAME");console.log(e),e&&r.addGroup({groupName:e}).then(u)}),s({groups:n,endTimes:t})}function s(e){var t=e.endTimes,n=e.groups;if(n){var o=document.getElementById("group-list");o.innerHTML="",o.style.display="block";var r=document.querySelector("#nav-group-container > .nav-message");r.textContent="",r.style.display="none",n.forEach(function(e){var t=e.group_id,n=e.group_name,r=document.createElement("li");r.className="nav-item",r.id="nav-"+t,r.innerHTML='\n        <label class="nav-symbol">🗹</label>\n        <p>'+n+"</p>\n      ",r.addEventListener("click",function(){window.location.search="?group="+t}),o.appendChild(r)})}if(t){var i=document.getElementById("upcoming-list");i.style.display="block",t.sort().forEach(function(e){var t={type:"TIME",title:e?a.convertTimestampToString(e):"Not Selected",pathname:e?""+e:"NONE"},n=document.createElement("li");n.className="nav-item",n.id="nav-"+t.pathname,n.textContent=t.title,n.addEventListener("click",function(){window.location.search="?time="+t.pathname}),i.appendChild(n)})}m()}function m(){var e=window.location.search,t=e.split("").splice(e.indexOf("=")+1).join("")||"all";document.getElementById("nav-"+t).className+=" selected"}function p(){var e=window.location.search,t=new URLSearchParams(e),n=t.get("group"),o=t.get("time");return"NONE"==o?{endTime:"NONE",groupId:n}:{endTime:o?parseInt(o):null,groupId:n}}function v(n,o){return e(this,void 0,void 0,function(){var e;return t(this,function(t){return h(e=p(),o),f(e.groupId),T(n,e),[2]})})}function f(e){var t=document.getElementById("add-todo-container"),n=document.getElementById("add-todo-input"),o=t.querySelector("#date-select");n.addEventListener("keypress",function(t){if("Enter"==t.key){y("");var i=n.value;if(!i)return void y("Can't create todo with no content");var c=""!=o.value?a.convertStringToTimestamp(o.value):null;r.addTodoItem({content:i,endTime:c,parentId:null,groupId:e}).then(function(e){if(!e.ok)throw e.error_message;n.value="",u()})}})}c();var g=document.getElementById("alert-message");function y(e){g.textContent=e}function h(e,t){var n=document.getElementById("todo-container-title"),o="Todo title not recognized ";if(e.endTime)o="NONE"==e.endTime?"Date Not Selected Todos":a.convertTimestampToString(e.endTime);else if(e.groupId){var r=t.find(function(t){return t.group_id==e.groupId});console.log(r),o=r?r.group_name:"unrecognized Group"}else o="All Todos";n.textContent=o}function T(n,o){return e(this,void 0,void 0,function(){var e;return t(this,function(t){return(e=document.getElementById("todolist")).innerHTML="",console.log(o),n.filter(function(e){var t=!0;return t&&o.groupId&&(t=o.groupId==e.group_id),o.endTime&&(t=o.endTime==e.end_time),t}).forEach(function(t){var n=b(t);e.appendChild(n)}),[2]})})}function b(e){var t=document.createElement("div");t.id="todo-"+e.id,t.className="todo",t.innerHTML='\n    <label id="todo-content-container" class="'+(e.isComplete?"done":"")+'">\n      <p id="date">\n        '+(e.end_time?a.convertTimestampToString(e.end_time):"-")+'\n      </p>\n      <p id="content">'+e.content+'</p>\n      <div id="content-edit-container" class="unactive">\n        <p class="icon">✎ </p>\n        <input id="content-edit" value="'+e.content+'" placeholder="...content here" />\n      </div>\n    </label>\n    <div id="action-buttons" class="'+(e.isComplete?"done":"")+'">\n      <button id="edit-button" class="text-button">✎</button>\n      <button id="done-button" class="text-button">✓</button>\n      <button id="delete-button" class="text-button">✖</button>\n    </div>\n  ';var o=t.querySelector("#content"),i=t.querySelector("#content-edit-container"),c=t.querySelector("#content-edit");function d(){i.className="unactive",i.style.display="none",o.className="active"}return c.onblur=d,c.addEventListener("keypress",function(t){n.keyInputListener(t,function(){e.content!=c.value?(e.content=c.value,r.editTodo(e).then(u)):d()})}),t.querySelector("#delete-button").addEventListener("click",function(){return t=e.id,void r.deleteTodoItem({id:t}).then(u);var t}),t.querySelector("#edit-button").addEventListener("click",function(){i.className="active",i.style.display="flex",o.className="unactive",c.value=e.content,c.focus()}),t.querySelector("#done-button").addEventListener("click",function(){e.id&&r.completeTodos([e.id]).then(u)}),t}function E(){document.getElementById("introduce").style.display="flex",document.getElementById("signup-button").addEventListener("click",function(){i.navigateTo(i.SIGNUP_PATH)}),document.getElementById("login-button").addEventListener("click",function(){i.navigateTo(i.LOGIN_PATH)})}
},{"../App":"Zmr0","../Modules/AuthModules":"SFuy","../Modules/TodoModules":"Wr6p","../../pages/index.html":"s8zH","../../constants/paths":"ooTL","../Modules/TimeModules":"ro44"}],"tI4L":[function(require,module,exports) {
var t=null;function e(){return t||(t=n()),t}function n(){try{throw new Error}catch(e){var t=(""+e.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);if(t)return r(t[0])}return"/"}function r(t){return(""+t).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/,"$1")+"/"}exports.getBundleURL=e,exports.getBaseURL=r;
},{}],"dsVf":[function(require,module,exports) {
var r=require("./bundle-url").getBundleURL;function e(r){Array.isArray(r)||(r=[r]);var e=r[r.length-1];try{return Promise.resolve(require(e))}catch(n){if("MODULE_NOT_FOUND"===n.code)return new s(function(n,i){t(r.slice(0,-1)).then(function(){return require(e)}).then(n,i)});throw n}}function t(r){return Promise.all(r.map(u))}var n={};function i(r,e){n[r]=e}module.exports=exports=e,exports.load=t,exports.register=i;var o={};function u(e){var t;if(Array.isArray(e)&&(t=e[1],e=e[0]),o[e])return o[e];var i=(e.substring(e.lastIndexOf(".")+1,e.length)||e).toLowerCase(),u=n[i];return u?o[e]=u(r()+e).then(function(r){return r&&module.bundle.register(t,r),r}).catch(function(r){throw delete o[e],r}):void 0}function s(r){this.executor=r,this.promise=null}s.prototype.then=function(r,e){return null===this.promise&&(this.promise=new Promise(this.executor)),this.promise.then(r,e)},s.prototype.catch=function(r){return null===this.promise&&(this.promise=new Promise(this.executor)),this.promise.catch(r)};
},{"./bundle-url":"tI4L"}],"Mmsi":[function(require,module,exports) {
module.exports=function(t){return fetch(t).then(function(t){return t.text()})};
},{}],0:[function(require,module,exports) {
var b=require("dsVf");b.register("html",require("Mmsi"));b.load([["index.html","s8zH"]]).then(function(){require("cXqv");});
},{}]},{},[0], null)
//# sourceMappingURL=pages.6f46732c.js.map