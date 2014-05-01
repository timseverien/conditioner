!function(t){"use strict";var e=function(e,n,o,i,r,s){var l,u,a,h=function(t,e){this._path=t,this._expected=e,this._watches=[],this._count=0};h.prototype={getPath:function(){return this._path},getExpected:function(){return this._expected},isTrue:function(){for(var t=0,e=this._count;e>t;t++)if(!this._watches[t].valid)return!1;return!0},assignWatches:function(t){this._watches=t,this._count=t.length},toString:function(){return this._path+":{"+this._expected+"}"}};var d=function(t,e){this._expression=t,this._change=e,this._currentState=null};d.prototype={evaluate:function(){var t=this._expression.isTrue();t!=this._currentState&&(this._currentState=t,this._change(t))}};var c=function(){this._monitors=[],this._expressions=[]};c.prototype={_parse:function(t,e){if(this._expressions[t])return this._expressions[t];for(var n,o=0,i=t.split(","),r=i.length,s=[];r>o;o++)n=i[o].split(":"),s.push({test:n[0],value:e?n[0]:"undefined"==typeof n[1]?!0:n[1]});return this._expressions[t]=s,s},_mergeData:function(t,e,n){return s({element:n,expected:e},t)},create:function(t,e){var i=new o,r=t.getPath(),s=t.getExpected(),u=this;return l.loader.require([l.paths.monitors+"/"+r],function(t){var o,l,a,h,d,c,_,f,p=0,g=u._monitors[r];if(!g){if(g={watches:[],change:function(){for(p=0,o=g.watches.length;o>p;p++)g.watches[p].test()}},_=t.unique?u._mergeData(t.data,s,e):t.data,"function"==typeof t.trigger)t.trigger(g.change,_);else for(d in t.trigger)t.trigger.hasOwnProperty(d)&&t.trigger[d].addEventListener(d,g.change,!1);t.unique||(u._monitors[r]=g)}for(a=[],f="function"==typeof t.test,h=t.parse?t.parse(s,f):u._parse(s,f),o=h.length;o>p;p++)c=h[p],l={valid:null,data:u._mergeData(t,c.value,e),test:function(t){return function(){var e=t(this.data);this.valid!=e&&(this.valid=e,n.publish(this,"change"))}}(f?t.test:t.test[c.test])},l.test(),a.push(l);g.watches=g.watches.concat(a),i.resolve(a)}),i}};var _={test:function(t,e,n){var o,i,r,s,l;for(o=g.parse(t),i=new d(o,n),r=0,s=o.getTests(),l=s.length;l>r;r++)this._setupMonitor(s[r],e,i)},_setupMonitor:function(t,e,o){var i,r=0;u.create(t,e).then(function(e){for(t.assignWatches(e),i=e.length;i>r;r++)n.subscribe(e[r],"change",function(){o.evaluate()});o.evaluate()})}},f=function(t,e){this._expression=t,this._negate="undefined"==typeof e?!1:e};f.prototype.isTrue=function(){return this._expression.isTrue()!==this._negate},f.prototype.getTests=function(){return this._expression instanceof h?[this._expression]:this._expression.getTests()},f.prototype.toString=function(){return(this._negate?"not ":"")+this._expression.toString()};var p=function(t,e,n){this._a=t,this._operator=e,this._b=n};p.prototype.isTrue=function(){return"and"===this._operator?this._a.isTrue()&&this._b.isTrue():this._a.isTrue()||this._b.isTrue()},p.prototype.getTests=function(){return this._a.getTests().concat(this._b.getTests())},p.prototype.toString=function(){return"("+this._a.toString()+" "+this._operator+" "+this._b.toString()+")"};var g={parse:function(t){var e,n,o,i,r,s,l,u,a,d,c,_=0,g="",m=[],v="",b=!1,y=!1,A=null,M=null,w=[],C=t.length;for(A||(A=m);C>_;_++)if(s=t.charCodeAt(_),123!==s)if(125===s&&(e=A.length-1,n=e+1,b="not"===A[e],n=b?e:e+1,i=new h(g,v),A[n]=new f(i,b),g="",v="",b=!1,y=!1),y)v+=t.charAt(_);else{if(40===s&&(A.push([]),w.push(A),A=A[A.length-1]),32===s||0===_||40===s){if(o=t.substr(_,5).match(/and |or |not /g),!o)continue;a=o[0],d=a.length-1,A.push(a.substring(0,d)),_+=d}if(41===s||_===C-1)do if(M=w.pop(),0!==A.length){for(r=0,c=A.length;c>r;r++)"string"==typeof A[r]&&("not"===A[r]?(A.splice(r,2,new f(A[r+1],!0)),r=-1,c=A.length):"not"!==A[r+1]&&(A.splice(r-1,3,new p(A[r-1],A[r],A[r+1])),r=-1,c=A.length));1===A.length&&M&&(M[M.length-1]=A[0],A=M)}else A=M;while(_===C-1&&M)}else for(y=!0,g="",l=_-2;l>=0&&(u=t.charCodeAt(l),32!==u&&40!==u);)g=t.charAt(l)+g,l--;return 1===m.length?m[0]:m}},m={init:function(t){t()},allowsActivation:function(){return!0},destroy:function(){}},v=function(t,e){"string"==typeof t&&t.length&&(this._conditions=t,this._element=e,this._state=!1)};v.prototype={init:function(t){var e=this,o=!1;_.test(this._conditions,this._element,function(i){e._state=i,n.publish(e,"change"),o||(o=!0,t())})},allowsActivation:function(){return this._state},destroy:function(){}};var b={_options:{},_redirects:{},registerModule:function(t,e,n){this._options[l.loader.toUrl(t)]=e,n&&(this._redirects[n]=t),l.loader.config(t,e)},getRedirect:function(t){return this._redirects[t]||t},getModule:function(t){if(!t)throw new Error('ModuleRegistry.getModule(path): "path" is a required parameter.');return this._options[t]||this._options[l.loader.toUrl(t)]}},y=function(t,e,n,o){if(!t||!e)throw new Error('ModuleController(path,element,options,agent): "path" and "element" are required parameters.');this._path=b.getRedirect(t),this._alias=t,this._element=e,this._options=n||{},this._agent=o||m,this._Module=null,this._module=null,this._initialized=!1,this._onAgentStateChangeBind=this._onAgentStateChange.bind(this);var i=this;this._agent.init(function(){i._initialize()})};y.prototype={hasInitialized:function(){return this._initialized},getModulePath:function(){return this._path},isModuleAvailable:function(){return this._agent.allowsActivation()&&!this._module},isModuleActive:function(){return null!==this._module},wrapsModuleWithPath:function(t){return this._path===t||this._alias===t},_initialize:function(){this._initialized=!0,n.subscribe(this._agent,"change",this._onAgentStateChangeBind),n.publishAsync(this,"init",this),this._agent.allowsActivation()&&this._onBecameAvailable()},_onBecameAvailable:function(){n.publishAsync(this,"available",this),this._load()},_onAgentStateChange:function(){var t=this._agent.allowsActivation();this._module&&!t?this._unload():!this._module&&t&&this._onBecameAvailable()},_load:function(){if(this._Module)return void this._onLoad();var t=this;l.loader.require([this._path],function(e){if(!e)throw new Error("ModuleController: A module needs to export an object.");t._Module=e,t._onLoad()})},_optionsToObject:function(t){if("string"==typeof t)try{return JSON.parse(t)}catch(e){throw new Error('ModuleController.load(): "options" is not a valid JSON string.')}return t},_parseOptions:function(t,e,n){var o,i,r=[],l={},u={};do o=b.getModule(t),r.push({page:o,module:e.options}),t=e.__superUrl;while(e=e.__super);for(i=r.length;i--;)l=s(l,r[i].page),u=s(u,r[i].module);return o=s(u,l),n&&(o=s(o,this._optionsToObject(n))),o},_onLoad:function(){if(this._agent.allowsActivation()){var t=this._parseOptions(this._path,this._Module,this._options);if("function"==typeof this._Module?this._module=new this._Module(this._element,t):(this._module=this._Module.load?this._Module.load(this._element,t):null,"undefined"==typeof this._module&&(this._module=this._Module)),!this._module)throw new Error('ModuleController.load(): could not initialize module, missing constructor or "load" method.');n.inform(this._module,this),n.publishAsync(this,"load",this)}},_unload:function(){return this._available=!1,this._module?(n.conceal(this._module,this),this._module.unload&&this._module.unload(),this._module=null,n.publishAsync(this,"unload",this),!0):!1},destroy:function(){this._unload(),n.unsubscribe(this._agent,"ready",this._onAgentReadyBind),n.unsubscribe(this._agent,"change",this._onAgentStateChangeBind),this._agent.destroy()},execute:function(t,e){if(!this._module)return{status:404,response:null};var n=this._module[t];if(!n)throw new Error('ModuleController.execute(method,params): function specified in "method" not found on module.');return e=e||[],{status:200,response:n.apply(this._module,e)}}};var A=function(){var t=function(t){return t.isModuleActive()},e=function(t){return t.isModuleAvailable()},o=function(t){return t.getModulePath()},s=function(t,e){if(!t)throw new Error('NodeController(element): "element" is a required parameter.');this._element=t,this._element.setAttribute(l.attr.processed,"true"),this._priority=e?parseInt(e,10):0,this._moduleControllers=[],this._moduleAvailableBind=this._onModuleAvailable.bind(this),this._moduleLoadBind=this._onModuleLoad.bind(this),this._moduleUnloadBind=this._onModuleUnload.bind(this)};return s.hasProcessed=function(t){return"true"===t.getAttribute(l.attr.processed)},s.prototype={load:function(){if(!arguments||!arguments.length)throw new Error("NodeController.load(controllers): Expects an array of module controllers as parameters.");this._moduleControllers=Array.prototype.slice.call(arguments,0);for(var t,e=0,o=this._moduleControllers.length;o>e;e++)t=this._moduleControllers[e],n.subscribe(t,"available",this._moduleAvailableBind),n.subscribe(t,"load",this._moduleLoadBind)},destroy:function(){for(var t=0,e=this._moduleControllers.length;e>t;t++)this._destroyModule(this._moduleControllers[t]);this._moduleControllers=[],this._updateAttribute(l.attr.initialized,this._moduleControllers),this._element.removeAttribute(l.attr.processed),this._element=null},_destroyModule:function(t){n.unsubscribe(t,"available",this._moduleAvailableBind),n.unsubscribe(t,"load",this._moduleLoadBind),n.unsubscribe(t,"unload",this._moduleUnloadBind),n.conceal(t,this),t.destroy()},getPriority:function(){return this._priority},getElement:function(){return this._element},matchesSelector:function(t,e){return e&&!i(e,this._element)?!1:r(this._element,t,e)},areAllModulesActive:function(){return this.getActiveModules().length===this._moduleControllers.length},getActiveModules:function(){return this._moduleControllers.filter(t)},getModule:function(t){return this._getModules(t,!0)},getModules:function(t){return this._getModules(t)},_getModules:function(t,e){if("undefined"==typeof t)return e?this._moduleControllers[0]:this._moduleControllers.concat();for(var n,o=0,i=this._moduleControllers.length,r=[];i>o;o++)if(n=this._moduleControllers[o],n.wrapsModuleWithPath(t)){if(e)return n;r.push(n)}return e?null:r},execute:function(t,e){return this._moduleControllers.map(function(n){return{controller:n,result:n.execute(t,e)}})},_onModuleAvailable:function(t){n.inform(t,this),this._updateAttribute(l.attr.loading,this._moduleControllers.filter(e))},_onModuleLoad:function(t){n.unsubscribe(t,"load",this._moduleLoadBind),n.subscribe(t,"unload",this._moduleUnloadBind),this._updateAttribute(l.attr.loading,this._moduleControllers.filter(e)),this._updateAttribute(l.attr.initialized,this.getActiveModules())},_onModuleUnload:function(t){n.subscribe(t,"load",this._moduleLoadBind),n.unsubscribe(t,"unload",this._moduleUnloadBind),n.conceal(t,this),this._updateAttribute(l.attr.initialized,this.getActiveModules())},_updateAttribute:function(t,e){var n=e.map(o);n.length?this._element.setAttribute(t,n.join(",")):this._element.removeAttribute(t)}},s}(),M=function(){if(!arguments||!arguments.length)throw new Error("SyncedControllerGroup(controllers): Expects an array of node controllers as parameters.");this._inSync=!1,this._controllers=1===arguments.length?arguments[0]:Array.prototype.slice.call(arguments,0),this._controllerLoadedBind=this._onLoad.bind(this),this._controllerUnloadedBind=this._onUnload.bind(this);for(var t,e=0,o=this._controllers.length;o>e;e++){if(t=this._controllers[e],!t)throw new Error("SyncedControllerGroup(controllers): Stumbled upon an undefined controller is undefined.");n.subscribe(t,"load",this._controllerLoadedBind),n.subscribe(t,"unload",this._controllerUnloadedBind)}this._test()};M.prototype={destroy:function(){for(var t,e=0,o=this._controllers.length;o>e;e++)t=this._controllers[e],n.unsubscribe(t,"load",this._controllerLoadedBind),n.unsubscribe(t,"unload",this._controllerUnloadedBind);this._controllers=[]},areAllModulesActive:function(){for(var t,e=0,n=this._controllers.length;n>e;e++)if(t=this._controllers[e],!this._isActiveController(t))return!1;return!0},_onLoad:function(){this._test()},_onUnload:function(){this._unload()},_isActiveController:function(t){return t.isModuleActive&&t.isModuleActive()||t.areAllModulesActive&&t.areAllModulesActive()},_test:function(){this.areAllModulesActive()&&this._load()},_load:function(){this._inSync||(this._inSync=!0,n.publishAsync(this,"load",this._controllers))},_unload:function(){this._inSync&&(this._inSync=!1,n.publish(this,"unload",this._controllers))}};var w=function(){this._nodes=[]};return w.prototype={parse:function(t){if(!t)throw new Error('ModuleLoader.loadModules(context): "context" is a required parameter.');var e,n,o=t.querySelectorAll("[data-module]"),i=o.length,r=0,s=[];if(!o)return[];for(;i>r;r++)n=o[r],A.hasProcessed(n)||s.push(new A(n,n.getAttribute(l.attr.priority)));for(s.sort(function(t,e){return t.getPriority()-e.getPriority()}),r=s.length;--r>=0;)e=s[r],e.load.apply(e,this._getModuleControllersByElement(e.getElement()));return this._nodes=this._nodes.concat(s),s},load:function(t,e){if(!e)return null;e=e.length?e:[e];var n,o,i=0,r=e.length,s=[];for(n=new A(t);r>i;i++)o=e[i],s.push(this._getModuleController(o.path,t,o.options,o.conditions));return n.load(s),this._nodes.push(n),n},destroyNode:function(t){for(var e=this._nodes.length;e--;)if(this._nodes[e]===t)return this._nodes.splice(e,1),t.destroy(),!0;return!1},getNodes:function(t,e,n){if("undefined"==typeof t&&"undefined"==typeof e)return n?this._nodes[0]:this._nodes.concat();for(var o,i=0,r=this._nodes.length,s=[];r>i;i++)if(o=this._nodes[i],o.matchesSelector(t,e)){if(n)return o;s.push(o)}return n?null:s},_getModuleControllersByElement:function(t){var e,n,o,i=[],r=t.getAttribute(l.attr.module)||"",s=0,u=91===r.charCodeAt(0);if(u){try{e=JSON.parse(r)}catch(a){throw new Error('ModuleLoader.load(context): "data-module" attribute contains a malformed JSON string.')}if(!e)return[];for(o=e.length;o>s;s++)n=e[s],i.push(this._getModuleController(n.path,t,n.options,n.conditions))}else r.length&&i.push(this._getModuleController(r,t,t.getAttribute(l.attr.options),t.getAttribute(l.attr.conditions)));return i},_getModuleController:function(t,e,n,o){return new y(t,e,n,o?new v(o,e):m)}},l={paths:{monitors:"./monitors/"},attr:{options:"data-options",module:"data-module",conditions:"data-conditions",priority:"data-priority",initialized:"data-initialized",processed:"data-processed",loading:"data-loading"},loader:{require:function(t,n){e(t,n)},config:function(t,e){var n={};n[t]=e,requirejs.config({config:n})},toUrl:function(t){return requirejs.toUrl(t)}},modules:{}},u=new c,a=new w,{init:function(e){return e&&this.setOptions(e),a.parse(t)},setOptions:function(t){if(!t)throw new Error('Conditioner.setOptions(options): "options" is a required parameter.');var e,n,o,i;l=s(l,t);for(n in l.modules)l.modules.hasOwnProperty(n)&&(o=l.modules[n],i="string"==typeof o?o:o.alias,e="string"==typeof o?null:o.options||{},b.registerModule(n,e,i))},parse:function(t){if(!t)throw new Error('Conditioner.parse(context): "context" is a required parameter.');return a.parse(t)},load:function(t,e){return a.load(t,e)},sync:function(){var t=Object.create(M.prototype);return M.apply(t,1!==arguments.length||arguments.slice?arguments:arguments[0]),t},getNode:function(t,e){return a.getNodes(t,e,!0)},getNodes:function(t,e){return a.getNodes(t,e,!1)},destroyNode:function(t){return a.destroyNode(t)},getModule:function(t,e,n){for(var o,i=0,r=this.getNodes(e,n),s=r.length;s>i;i++)if(o=r[i].getModule(t))return o;return null},getModules:function(t,e,n){for(var o,i=0,r=this.getNodes(e,n),s=r.length,l=[];s>i;i++)o=r[i].getModules(t),o.length&&(l=l.concat(o));return l},test:function(t,e){if(!t)throw new Error('Conditioner.test(conditions): "conditions" is a required parameter.');var n=new o;return _.test(t,e,function(t){n[t?"resolve":"reject"]()}),n}}};if("undefined"!=typeof module&&module.exports)module.exports=e(require,require("./utils/Observer"),require("./utils/Promise"),require("./utils/contains"),require("./utils/matchesSelector"),require("./utils/mergeObjects"));else{if("function"!=typeof define||!define.amd)throw new Error("To use ConditionerJS you need to setup a module loader like RequireJS.");define(["require","./utils/Observer","./utils/Promise","./utils/contains","./utils/matchesSelector","./utils/mergeObjects"],e)}}(document);