!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("nc-lightapp-front"),require("react"),require("react-dom")):"function"==typeof define&&define.amd?define(["nc-lightapp-front","react","react-dom"],t):"object"==typeof exports?exports["uapbd/material/marasstrst/main/index"]=t(require("nc-lightapp-front"),require("react"),require("react-dom")):e["uapbd/material/marasstrst/main/index"]=t(e["nc-lightapp-front"],e.React,e.ReactDOM)}(window,function(e,t,r){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="../../../../",r(r.s=290)}({1:function(t,r){t.exports=e},144:function(e,t){e.exports=function(e){var t="undefined"!=typeof window&&window.location;if(!t)throw new Error("fixUrls requires window.location");if(!e||"string"!=typeof e)return e;var r=t.protocol+"//"+t.host,n=r+t.pathname.replace(/\/[^\/]*$/,"/");return e.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(e,t){var o,a=t.trim().replace(/^"(.*)"$/,function(e,t){return t}).replace(/^'(.*)'$/,function(e,t){return t});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(a)?e:(o=0===a.indexOf("//")?a:0===a.indexOf("/")?r+a:n+a.replace(/^\.\//,""),"url("+JSON.stringify(o)+")")})}},147:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e};t.default=function(e){return function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=arguments[2],i=0,s={},c=function(){2==i&&a&&a(s.templateData||{},s.langData||{},s.inlt||{})};r.callback&&console.log("咱们自己createUIDom会同时获取多语和单据模板,并通过一个回调函数返回, langCfg中的回调函数将被忽略");var l=n({},r,{callback:function(e,t,r){i+=1,t||(0,o.toast)({content:"load muti lang error",color:"warning"}),s.langData=e||{},s.inlt=r||{},c()}});e.MultiInit.getMultiLang(l),e.createUIDom(t,function(e){i+=1,s.templateData=e||{},c()})}};var o=r(1)},148:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.conf=void 0;var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e};t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return React.createElement(i,n({},s,e))};var o=r(1),a=r(5),i=o.high.Refer,s=t.conf={multiLang:{domainName:"uapbd",currentLocale:"zh-CN",moduleId:"refer_uapbd"},refType:"tree",refName:"refer-000201",refCode:"uapbd.refer.org.BusinessUnitTreeRef",rootNode:{refname:"refer-000201",refpk:"root"},placeholder:"refer-000201",queryTreeUrl:"/nccloud/uapbd/org/BusinessUnitTreeRef.do",treeConfig:{name:["refer-000002","refer-000003"],code:["refcode","refname"]},isMultiSelectedEnabled:!1,unitProps:a.conf,isShowUnit:!1}},2:function(e,r){e.exports=t},226:function(e,t,r){(function(e,n){var o=/%[sdj%]/g;t.format=function(e){if(!v(e)){for(var t=[],r=0;r<arguments.length;r++)t.push(s(arguments[r]));return t.join(" ")}r=1;for(var n=arguments,a=n.length,i=String(e).replace(o,function(e){if("%%"===e)return"%";if(r>=a)return e;switch(e){case"%s":return String(n[r++]);case"%d":return Number(n[r++]);case"%j":try{return JSON.stringify(n[r++])}catch(e){return"[Circular]"}default:return e}}),c=n[r];r<a;c=n[++r])m(c)||!S(c)?i+=" "+c:i+=" "+s(c);return i},t.deprecate=function(r,o){if(y(e.process))return function(){return t.deprecate(r,o).apply(this,arguments)};if(!0===n.noDeprecation)return r;var a=!1;return function(){if(!a){if(n.throwDeprecation)throw new Error(o);n.traceDeprecation?console.trace(o):console.error(o),a=!0}return r.apply(this,arguments)}};var a,i={};function s(e,r){var n={seen:[],stylize:l};return arguments.length>=3&&(n.depth=arguments[2]),arguments.length>=4&&(n.colors=arguments[3]),h(r)?n.showHidden=r:r&&t._extend(n,r),y(n.showHidden)&&(n.showHidden=!1),y(n.depth)&&(n.depth=2),y(n.colors)&&(n.colors=!1),y(n.customInspect)&&(n.customInspect=!0),n.colors&&(n.stylize=c),u(n,e,n.depth)}function c(e,t){var r=s.styles[t];return r?"["+s.colors[r][0]+"m"+e+"["+s.colors[r][1]+"m":e}function l(e,t){return e}function u(e,r,n){if(e.customInspect&&r&&x(r.inspect)&&r.inspect!==t.inspect&&(!r.constructor||r.constructor.prototype!==r)){var o=r.inspect(n,e);return v(o)||(o=u(e,o,n)),o}var a=function(e,t){if(y(t))return e.stylize("undefined","undefined");if(v(t)){var r="'"+JSON.stringify(t).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";return e.stylize(r,"string")}if(b(t))return e.stylize(""+t,"number");if(h(t))return e.stylize(""+t,"boolean");if(m(t))return e.stylize("null","null")}(e,r);if(a)return a;var i=Object.keys(r),s=function(e){var t={};return e.forEach(function(e,r){t[e]=!0}),t}(i);if(e.showHidden&&(i=Object.getOwnPropertyNames(r)),T(r)&&(i.indexOf("message")>=0||i.indexOf("description")>=0))return f(r);if(0===i.length){if(x(r)){var c=r.name?": "+r.name:"";return e.stylize("[Function"+c+"]","special")}if(g(r))return e.stylize(RegExp.prototype.toString.call(r),"regexp");if(w(r))return e.stylize(Date.prototype.toString.call(r),"date");if(T(r))return f(r)}var l,S="",j=!1,R=["{","}"];(p(r)&&(j=!0,R=["[","]"]),x(r))&&(S=" [Function"+(r.name?": "+r.name:"")+"]");return g(r)&&(S=" "+RegExp.prototype.toString.call(r)),w(r)&&(S=" "+Date.prototype.toUTCString.call(r)),T(r)&&(S=" "+f(r)),0!==i.length||j&&0!=r.length?n<0?g(r)?e.stylize(RegExp.prototype.toString.call(r),"regexp"):e.stylize("[Object]","special"):(e.seen.push(r),l=j?function(e,t,r,n,o){for(var a=[],i=0,s=t.length;i<s;++i)k(t,String(i))?a.push(d(e,t,r,n,String(i),!0)):a.push("");return o.forEach(function(o){o.match(/^\d+$/)||a.push(d(e,t,r,n,o,!0))}),a}(e,r,n,s,i):i.map(function(t){return d(e,r,n,s,t,j)}),e.seen.pop(),function(e,t,r){if(e.reduce(function(e,t){return 0,t.indexOf("\n")>=0&&0,e+t.replace(/\u001b\[\d\d?m/g,"").length+1},0)>60)return r[0]+(""===t?"":t+"\n ")+" "+e.join(",\n  ")+" "+r[1];return r[0]+t+" "+e.join(", ")+" "+r[1]}(l,S,R)):R[0]+S+R[1]}function f(e){return"["+Error.prototype.toString.call(e)+"]"}function d(e,t,r,n,o,a){var i,s,c;if((c=Object.getOwnPropertyDescriptor(t,o)||{value:t[o]}).get?s=c.set?e.stylize("[Getter/Setter]","special"):e.stylize("[Getter]","special"):c.set&&(s=e.stylize("[Setter]","special")),k(n,o)||(i="["+o+"]"),s||(e.seen.indexOf(c.value)<0?(s=m(r)?u(e,c.value,null):u(e,c.value,r-1)).indexOf("\n")>-1&&(s=a?s.split("\n").map(function(e){return"  "+e}).join("\n").substr(2):"\n"+s.split("\n").map(function(e){return"   "+e}).join("\n")):s=e.stylize("[Circular]","special")),y(i)){if(a&&o.match(/^\d+$/))return s;(i=JSON.stringify(""+o)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?(i=i.substr(1,i.length-2),i=e.stylize(i,"name")):(i=i.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'"),i=e.stylize(i,"string"))}return i+": "+s}function p(e){return Array.isArray(e)}function h(e){return"boolean"==typeof e}function m(e){return null===e}function b(e){return"number"==typeof e}function v(e){return"string"==typeof e}function y(e){return void 0===e}function g(e){return S(e)&&"[object RegExp]"===j(e)}function S(e){return"object"==typeof e&&null!==e}function w(e){return S(e)&&"[object Date]"===j(e)}function T(e){return S(e)&&("[object Error]"===j(e)||e instanceof Error)}function x(e){return"function"==typeof e}function j(e){return Object.prototype.toString.call(e)}function R(e){return e<10?"0"+e.toString(10):e.toString(10)}t.debuglog=function(e){if(y(a)&&(a=n.env.NODE_DEBUG||""),e=e.toUpperCase(),!i[e])if(new RegExp("\\b"+e+"\\b","i").test(a)){var r=n.pid;i[e]=function(){var n=t.format.apply(t,arguments);console.error("%s %d: %s",e,r,n)}}else i[e]=function(){};return i[e]},t.inspect=s,s.colors={bold:[1,22],italic:[3,23],underline:[4,24],inverse:[7,27],white:[37,39],grey:[90,39],black:[30,39],blue:[34,39],cyan:[36,39],green:[32,39],magenta:[35,39],red:[31,39],yellow:[33,39]},s.styles={special:"cyan",number:"yellow",boolean:"yellow",undefined:"grey",null:"bold",string:"green",date:"magenta",regexp:"red"},t.isArray=p,t.isBoolean=h,t.isNull=m,t.isNullOrUndefined=function(e){return null==e},t.isNumber=b,t.isString=v,t.isSymbol=function(e){return"symbol"==typeof e},t.isUndefined=y,t.isRegExp=g,t.isObject=S,t.isDate=w,t.isError=T,t.isFunction=x,t.isPrimitive=function(e){return null===e||"boolean"==typeof e||"number"==typeof e||"string"==typeof e||"symbol"==typeof e||void 0===e},t.isBuffer=r(229);var A=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function k(e,t){return Object.prototype.hasOwnProperty.call(e,t)}t.log=function(){console.log("%s - %s",function(){var e=new Date,t=[R(e.getHours()),R(e.getMinutes()),R(e.getSeconds())].join(":");return[e.getDate(),A[e.getMonth()],t].join(" ")}(),t.format.apply(t,arguments))},t.inherits=r(230),t._extend=function(e,t){if(!t||!S(t))return e;for(var r=Object.keys(t),n=r.length;n--;)e[r[n]]=t[r[n]];return e}}).call(this,r(227),r(228))},227:function(e,t){var r;r=function(){return this}();try{r=r||Function("return this")()||(0,eval)("this")}catch(e){"object"==typeof window&&(r=window)}e.exports=r},228:function(e,t){var r,n,o=e.exports={};function a(){throw new Error("setTimeout has not been defined")}function i(){throw new Error("clearTimeout has not been defined")}function s(e){if(r===setTimeout)return setTimeout(e,0);if((r===a||!r)&&setTimeout)return r=setTimeout,setTimeout(e,0);try{return r(e,0)}catch(t){try{return r.call(null,e,0)}catch(t){return r.call(this,e,0)}}}!function(){try{r="function"==typeof setTimeout?setTimeout:a}catch(e){r=a}try{n="function"==typeof clearTimeout?clearTimeout:i}catch(e){n=i}}();var c,l=[],u=!1,f=-1;function d(){u&&c&&(u=!1,c.length?l=c.concat(l):f=-1,l.length&&p())}function p(){if(!u){var e=s(d);u=!0;for(var t=l.length;t;){for(c=l,l=[];++f<t;)c&&c[f].run();f=-1,t=l.length}c=null,u=!1,function(e){if(n===clearTimeout)return clearTimeout(e);if((n===i||!n)&&clearTimeout)return n=clearTimeout,clearTimeout(e);try{n(e)}catch(t){try{return n.call(null,e)}catch(t){return n.call(this,e)}}}(e)}}function h(e,t){this.fun=e,this.array=t}function m(){}o.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)t[r-1]=arguments[r];l.push(new h(e,t)),1!==l.length||u||s(p)},h.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=m,o.addListener=m,o.once=m,o.off=m,o.removeListener=m,o.removeAllListeners=m,o.emit=m,o.prependListener=m,o.prependOnceListener=m,o.listeners=function(e){return[]},o.binding=function(e){throw new Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(e){throw new Error("process.chdir is not supported")},o.umask=function(){return 0}},229:function(e,t){e.exports=function(e){return e&&"object"==typeof e&&"function"==typeof e.copy&&"function"==typeof e.fill&&"function"==typeof e.readUInt8}},230:function(e,t){"function"==typeof Object.create?e.exports=function(e,t){e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}})}:e.exports=function(e,t){e.super_=t;var r=function(){};r.prototype=t.prototype,e.prototype=new r,e.prototype.constructor=e}},290:function(e,t,r){e.exports=r(291)},291:function(e,t,r){"use strict";var n,o,a=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),i=r(2),s=d(i),c=d(r(6)),l=r(1);r(292);r(226);var u=r(148),f=d(r(147));function d(e){return e&&e.__esModule?e:{default:e}}function p(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}l.base.NCCol,l.base.NCRow,l.base.NCDatePicker,l.base.NCButton,l.base.NCPanel,l.base.NCCheckbox,l.base.NCPopconfirm,l.base.NCRadio,l.base.NCTree;var h="leftTree",m="marasstrstval",b="root",v="10140MASSR_card",y=["DelLine"],g="/nccloud/uapbd/material/MarAsstrstTreeQueryAction.do",S="/nccloud/uapbd/material/MarAsstrstQueryByPkAction.do",w="/nccloud/uapbd/material/MarAsstrstSaveAction.do",T="/nccloud/uapbd/material/MarAsstrstDeleteAction.do",x="/nccloud/uapbd/material/MarAsstrstRefQueryAction.do",j=(n=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var r=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));o.call(r),r.props=e;var n=r.props,a=(n.form,n.button,n.table,n.search,n.syncTree.setSyncTreeData);return r.setSyncTreeData=a,r.state={disabledSearch:!1,json:{}},r.initTemplate(e),r}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,i.Component),a(t,[{key:"componentDidMount",value:function(){this.loadLeftTreeData()}},{key:"loadLeftTreeData",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];(0,l.ajax)({url:g,method:"post",data:{isrst:"true"},success:function(r){if(r.success){var n=e.dealTreeData(r.data);e.setSyncTreeData(h,n),r.data.length>0&&(e.props.syncTree.setNodeSelected(h,r.data[0].refpk),e.onSelectEve(r.data[0].refpk,null,!0)),t&&(0,l.toast)({color:"success",title:e.state.json["10140MASSR-000001"]})}else alert(r.message)}})}},{key:"onSelectEve",value:function(e,t,r){if(b=t?t.nodeData.votype:"root","root"===e||"frame"===b)return this.props.form.EmptyAllFormValue("head"),this.props.cardTable.setTableData(m,{rows:[]}),void this.toggleShow("browse");this.loadCardData(e,null),this.toggleShow("browse")}},{key:"resetformRef",value:function(){var e=this.props.syncTree.getSelectNode(h);if(e&&"root"!==e.nodeData.votype){var t=e.nodeData.pk_marasstframe,r=this.props.meta.getMeta(),n=this;r.head.items.map(function(e){"pk_marassistant"!==e.attrcode&&"pk_marassistant_ctrl"!==e.attrcode||(e.queryCondition=function(){return n.props.renderItem("table",m,e.attrcode,null),{pk_marasstframe:t}})}),this.props.meta.setMeta(r)}}},{key:"resetBodyItemRef",value:function(e){var t=this.props.form.getFormItemsValue("head",e),r=this;t&&t.value&&(0,l.ajax)({url:x,method:"post",data:{pk_marassistant:t.value},success:function(t){var n=t.data.code;r.resetBodyRef(e,n)}})}},{key:"resetBodyRef",value:function(e,t){var r=this,n=this.props.syncTree.getSelectNode(h),o="";o="frame"===n.nodeData.votype?n.id:n.pid;var a="";"pk_marassistant"===e&&(a="value",this.props.renderItem("table",m,"value",null)),"pk_marassistant_ctrl"===e&&(a="value_ctrl",this.props.renderItem("table",m,"value_ctrl",null));var i=this.props.meta.getMeta();i[m].items.map(function(e){e.attrcode===a&&(e.refcode=null,"1"===t&&(e.refcode="uapbd/refer/material/StoreStateGridRef/index.js",e.refName=r.state.json["10140MASSR-000002"],e.queryCondition=function(){return{pk_marassframe:o,GridRefActionExt:"nccloud.web.uapbd.marasstrst.action.MarAsstrstRefSqlBuilder"}}),"2"===t&&(e.refcode="uapbd/refer/pm/ProjectDefaultTreeGridRef/index.js",e.refName=r.state.json["10140MASSR-000003"],e.isShowUnit=!0,u.conf.placeholder=r.state.json["10140MASSR-000004"],e.unitProps=u.conf,e.queryCondition=function(){return{pk_marassframe:o,GridRefActionExt:"nccloud.web.uapbd.marasstrst.action.MarAsstrstRefSqlBuilder"}}),"3"===t&&(e.refcode="uapbd/refer/supplier/SupplierRefTreeGridRef/index.js",e.refName=r.state.json["10140MASSR-000005"],e.isShowUnit=!0,u.conf.placeholder=r.state.json["10140MASSR-000004"],e.unitProps=u.conf,e.queryCondition=function(){return{pk_marassframe:o,GridRefActionExt:"nccloud.web.uapbd.marasstrst.action.MarAsstrstRefSqlBuilder"}}),"4"===t&&(e.refcode="uapbd/refer/userdef/DefdocGridRef/index.js",e.refName=r.state.json["10140MASSR-000006"],e.queryCondition=function(){return{pk_defdoclist:"1002ZZ1000000000066Q",pk_marassframe:o,GridRefActionExt:"nccloud.web.uapbd.marasstrst.action.MarAsstrstRefSqlBuilder"}}),"5"===t&&(e.refcode="uapbd/refer/customer/CustomerDefaultTreeGridRef/index.js",e.refName=r.state.json["10140MASSR-000007"],e.queryCondition=function(){return{pk_marassframe:o,GridRefActionExt:"nccloud.web.uapbd.marasstrst.action.MarAsstrstRefSqlBuilder"}}),"100"===t&&(e.refcode="uapbd/refer/material/FFileSkuCodeGridRef/index.js",e.refName=r.state.json["10140MASSR-000008"],e.queryCondition=function(){return{pk_marassframe:o,GridRefActionExt:"nccloud.web.uapbd.marasstrst.action.MarAsstrstRefSqlBuilder"}}))}),this.props.meta.setMeta(i)}},{key:"loadCardData",value:function(e,t){var r=this;(0,l.ajax)({url:S,method:"post",data:{pk_marasstrst:e,pk_marassframe:t},success:function(e){var t={head:{rows:e.data.form.head.rows}};r.props.form.setAllFormValue(t),e.data.grid?r.props.cardTable.setTableData(m,e.data.grid.marasstrstval):r.props.table.setAllTableData(m,{rows:[]}),r.resetformRef(),r.resetBodyItemRef("pk_marassistant"),r.resetBodyItemRef("pk_marassistant_ctrl")}})}},{key:"toggleShow",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"browse";"browse"===e?("root"===b?this.props.button.setButtonsVisible({Add:!1,Edit:!1,Delete:!1,Refresh:!0,Save:!1,Cancel:!1,AddLine:!1,DelLine:!1}):"frame"===b?this.props.button.setButtonsVisible({Add:!0,Edit:!1,Delete:!1,Refresh:!0,Save:!1,Cancel:!1,AddLine:!1,DelLine:!1}):this.props.button.setButtonsVisible({Add:!0,Edit:!0,Delete:!0,Refresh:!0,Save:!1,Cancel:!1,AddLine:!1,DelLine:!1}),this.props.cardTable.setStatus(m,"browse"),this.props.form.setFormStatus("head","browse"),this.props.syncTree.setNodeDisable(h,!1),this.setState({disabledSearch:!1})):(this.props.button.setButtonsVisible({Add:!1,Edit:!1,Delete:!1,Refresh:!1,Return:!1,Save:!0,Cancel:!0,AddLine:!0,DelLine:!0}),this.props.cardTable.setStatus(m,"edit"),this.props.form.setFormStatus("head","edit"),this.props.syncTree.setNodeDisable(h,!0),this.setState({disabledSearch:!0})),window.onbeforeunload="browse"===e?null:function(){return""}}},{key:"onMouseEnterEve",value:function(e){this.props.syncTree.hideIcon(h,e,{delIcon:!1,editIcon:!1,addIcon:!1})}},{key:"dealTreeData",value:function(e){return e.forEach(function(e){e.iconBox={editIcon:!0,addIcon:!0,delIcon:!0},function e(t){t.iconBox={editIcon:!0,addIcon:!0,delIcon:!0},t.children&&0!=t.children.length?(t.isLeaf=!1,t.children.forEach(function(t){e(t)})):delete t.children}(e)}),e}},{key:"onClickButton",value:function(e,t){var r=this,n=e.syncTree.getSelectNode(h),o=n.id,a=n.pid,i=this;switch(t){case"Add":if("root"===o)return void(0,l.toast)({content:this.state.json["10140MASSR-000009"],color:"warning"});this.onAddNew();break;case"Edit":this.toggleShow("edit");break;case"Delete":var s=e.form.getFormItemsValue("head","pk_marasstrst").value,c=e.form.getFormItemsValue("head","ts").value;(0,l.promptBox)({color:"warning",title:this.state.json["10140MASSR-000015"],content:this.state.json["10140MASSR-000010"],beSureBtnClick:function(){(0,l.ajax)({url:T,data:{pk_marasstrst:s,ts:c},success:function(t){e.form.EmptyAllFormValue("head"),e.cardTable.setTableData(m,{rows:[]}),e.syncTree.delNodeSuceess(h,o),e.syncTree.setNodeSelected(h,a),(0,l.toast)({color:"success",title:i.state.json["10140MASSR-000011"]}),b="frame",i.toggleShow("browse")}})}});break;case"Refresh":this.loadLeftTreeData(!0);break;case"Save":if(!e.form.isCheckNow("head"))break;if(this.props.cardTable.filterEmptyRows(m,["value","value_ctrl"],"include"),!e.cardTable.checkTableRequired(m))break;var u=e.createMasterChildData(v,"head",m);this.props.validateToSave(u,function(){var t=u;(0,l.ajax)({url:w,data:t,success:function(t){var r=t.success,n=t.data;if(r){var o={head:{rows:t.data.form.head.rows}};e.form.setAllFormValue(o),t.data.grid&&e.cardTable.setTableData(m,n.grid.marasstrstval),i.toggleShow("browse")}else alert(t.message)}})},p({formId:"form"},m,"cardTable"),"card");break;case"Cancel":(0,l.promptBox)({color:"warning",title:this.state.json["10140MASSR-000012"],content:this.state.json["10140MASSR-000013"],beSureBtnClick:function(){e.form.cancel("head"),e.cardTable.resetTableData(m),r.toggleShow("browse"),"rst"===n.nodeData.votype&&r.loadCardData(n.id,null)}});break;case"AddLine":e.cardTable.getNumberOfRows(m);e.cardTable.addRow(m)}}},{key:"onAddNew",value:function(){var e=this.props.syncTree.getSelectNode(h);if("root"!==e.id){var t="";t="frame"===e.nodeData.votype?e.id:e.pid,this.loadCardData(null,t),this.toggleShow("edit")}}},{key:"onAferEdit",value:function(e,t,r,n,o,a){"pk_marassistant"===r&&n.value!=o.value&&(this.resetBodyItemRef("pk_marassistant"),e.table.setAllTableData(m,{rows:[]})),"pk_marassistant_ctrl"===r&&n.value!=o.value&&(this.resetBodyItemRef("pk_marassistant_ctrl"),e.table.setAllTableData(m,{rows:[]}))}},{key:"afterSubEvent",value:function(e,t,r,n,o,a,i){if("value"===r&&o[0].newvalue.value!=o[0].oldvalue.value){var s={};s.value=i.values.value.value,s.display=i.values.value.display,e.cardTable.setValByKeyAndIndex(m,a,"value",s),i.values.value.display=n.refcode;var c={};c.value=n.refname,c.display=n.refname,e.cardTable.setValByKeyAndIndex(m,a,"value_name",c)}if("value_ctrl"===r&&o[0].newvalue.value!=o[0].oldvalue.value){var l={};l.value=i.values.value_ctrl.value,l.display=i.values.value_ctrl.display,e.cardTable.setValByKeyAndIndex(m,a,"value_ctrl",l),i.values.value_ctrl.display=n.refcode;var u={};u.value=n.refname,u.display=n.refname,e.cardTable.setValByKeyAndIndex(m,a,"value_ctrl_name",u)}}},{key:"render",value:function(){var e=this,t=this.props,r=t.button,n=t.syncTree,o=t.modal,a=t.DragWidthCom,i=t.treeTable,c=t.treeTableManyCol,l=t.form,u=t.cardTable,f=l.createForm,d=(r.createButton,r.createButtonApp),b=(i.createTreeTable,c.treeTableCol,n.createSyncTree),v=o.createModal,y=u.createCardTable;return s.default.createElement("div",{className:"bankPage"},v("modal",{}),s.default.createElement("div",{className:"header"},s.default.createElement("h2",{className:"title"},this.state.json["10140MASSR-000000"]),s.default.createElement("div",{className:"btn-group"},d({area:"card_head",buttonLimit:5,onButtonClick:this.onClickButton.bind(this),popContainer:document.querySelector(".card_head")}))),s.default.createElement("div",{className:"tree-table"},s.default.createElement(a,p({defLeftWid:"280px",leftDom:s.default.createElement("div",{className:"tree-area"},b({treeId:h,showLine:!0,onSelectEve:this.onSelectEve.bind(this),defaultExpandAll:!0,onMouseEnterEve:this.onMouseEnterEve.bind(this),showModal:!1,disabledSearch:this.state.disabledSearch})),rightDom:s.default.createElement("div",{className:"nc-bill-card"},s.default.createElement("div",{className:"nc-bill-form-area"},f("head",{onAfterEvent:this.onAferEdit.bind(this)})),s.default.createElement("div",{className:"nc-bill-table-area"},y(m,{tableHead:function(){return s.default.createElement("div",{className:"shoulder-definition-area"},s.default.createElement("div",{className:"definition-icons"},d({area:"card_body",onButtonClick:e.onClickButton.bind(e)})))},onAfterEvent:this.afterSubEvent.bind(this),hideColSet:function(){return!1},hideSwitch:function(){return!1}})))},"defLeftWid","280px"))))}}]),t}(),o=function(){var e=this;this.initTemplate=function(t){(0,f.default)(t)({pagecode:v},{moduleId:"10140MASSR",domainName:"uapbd"},function(r,n){if(n&&(e.state.json=n),r){var o=r.template;o=e.modifierMeta(t,o),t.meta.setMeta(o),r.button&&t.button.setButtons(r.button)}})},this.tableButtonClick=function(e,t,r,n,o){switch(t){case"DelLine":e.cardTable.delRowsByIndex(m,o)}},this.modifierMeta=function(t,r){return r[m].items.push({attrcode:"opr",label:e.state.json["10140MASSR-000014"],itemtype:"customer",className:"table-opr",width:200,fixed:"right",visible:!0,render:function(r,n,o){return t.button.createOprationButton(y,{area:"card_body_inner",buttonLimit:3,onButtonClick:function(t,a){return e.tableButtonClick.call(e,t,a,r,n,o)}})}}),r}},n),R=(0,l.createPage)({initTemplate:function(){},billinfo:{billtype:"card",pagecode:v,headcode:"head",bodycode:m}})(j);c.default.render(s.default.createElement(R,{nodeType:"GROPE_NODE",appId:"0001Z0100000000034UT"}),document.querySelector("#app"))},292:function(e,t,r){var n=r(293);"string"==typeof n&&(n=[[e.i,n,""]]);var o={transform:void 0};r(4)(n,o);n.locals&&(e.exports=n.locals)},293:function(e,t,r){(e.exports=r(3)(!1)).push([e.i,".version-head {\n  margin-bottom: 13px;\n}\n.tree-table {\n  top: 60px;\n}\n.ncc-hr-contain {\n  width: 100%;\n  height: 100%;\n  border: 1px solid #e9e9e9;\n}\n.ncc-hr-left-tree {\n  width: 75%;\n  float: left;\n  height: 99%;\n  background-color: #fff;\n}\n.ncc-hr-right-operate {\n  width: 24%;\n  height: 99%;\n  float: right;\n  background-color: #fff;\n  border-left: 1px solid #e9e9e9;\n}\n.ncc-hr-sperator {\n  width: 1px;\n  height: 100%;\n  float: left;\n  background-color: #e9e9e9;\n  border: 2px solid #e9e9e9;\n}\n.ncc-hr-padding {\n  padding: 20px 20px 20px 20px;\n}\n",""])},3:function(e,t){e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var r=function(e,t){var r=e[1]||"",n=e[3];if(!n)return r;if(t&&"function"==typeof btoa){var o=function(e){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(e))))+" */"}(n),a=n.sources.map(function(e){return"/*# sourceURL="+n.sourceRoot+e+" */"});return[r].concat(a).concat([o]).join("\n")}return[r].join("\n")}(t,e);return t[2]?"@media "+t[2]+"{"+r+"}":r}).join("")},t.i=function(e,r){"string"==typeof e&&(e=[[null,e,""]]);for(var n={},o=0;o<this.length;o++){var a=this[o][0];"number"==typeof a&&(n[a]=!0)}for(o=0;o<e.length;o++){var i=e[o];"number"==typeof i[0]&&n[i[0]]||(r&&!i[2]?i[2]=r:r&&(i[2]="("+i[2]+") and ("+r+")"),t.push(i))}},t}},4:function(e,t,r){var n={},o=function(e){var t;return function(){return void 0===t&&(t=e.apply(this,arguments)),t}}(function(){return window&&document&&document.all&&!window.atob}),a=function(e){var t={};return function(e){return void 0===t[e]&&(t[e]=function(e){return document.querySelector(e)}.call(this,e)),t[e]}}(),i=null,s=0,c=[],l=r(144);function u(e,t){for(var r=0;r<e.length;r++){var o=e[r],a=n[o.id];if(a){a.refs++;for(var i=0;i<a.parts.length;i++)a.parts[i](o.parts[i]);for(;i<o.parts.length;i++)a.parts.push(b(o.parts[i],t))}else{var s=[];for(i=0;i<o.parts.length;i++)s.push(b(o.parts[i],t));n[o.id]={id:o.id,refs:1,parts:s}}}}function f(e,t){for(var r=[],n={},o=0;o<e.length;o++){var a=e[o],i=t.base?a[0]+t.base:a[0],s={css:a[1],media:a[2],sourceMap:a[3]};n[i]?n[i].parts.push(s):r.push(n[i]={id:i,parts:[s]})}return r}function d(e,t){var r=a(e.insertInto);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var n=c[c.length-1];if("top"===e.insertAt)n?n.nextSibling?r.insertBefore(t,n.nextSibling):r.appendChild(t):r.insertBefore(t,r.firstChild),c.push(t);else{if("bottom"!==e.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");r.appendChild(t)}}function p(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e);var t=c.indexOf(e);t>=0&&c.splice(t,1)}function h(e){var t=document.createElement("style");return e.attrs.type="text/css",m(t,e.attrs),d(e,t),t}function m(e,t){Object.keys(t).forEach(function(r){e.setAttribute(r,t[r])})}function b(e,t){var r,n,o,a;if(t.transform&&e.css){if(!(a=t.transform(e.css)))return function(){};e.css=a}if(t.singleton){var c=s++;r=i||(i=h(t)),n=y.bind(null,r,c,!1),o=y.bind(null,r,c,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(r=function(e){var t=document.createElement("link");return e.attrs.type="text/css",e.attrs.rel="stylesheet",m(t,e.attrs),d(e,t),t}(t),n=function(e,t,r){var n=r.css,o=r.sourceMap,a=void 0===t.convertToAbsoluteUrls&&o;(t.convertToAbsoluteUrls||a)&&(n=l(n));o&&(n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */");var i=new Blob([n],{type:"text/css"}),s=e.href;e.href=URL.createObjectURL(i),s&&URL.revokeObjectURL(s)}.bind(null,r,t),o=function(){p(r),r.href&&URL.revokeObjectURL(r.href)}):(r=h(t),n=function(e,t){var r=t.css,n=t.media;n&&e.setAttribute("media",n);if(e.styleSheet)e.styleSheet.cssText=r;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(r))}}.bind(null,r),o=function(){p(r)});return n(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;n(e=t)}else o()}}e.exports=function(e,t){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(t=t||{}).attrs="object"==typeof t.attrs?t.attrs:{},t.singleton||(t.singleton=o()),t.insertInto||(t.insertInto="head"),t.insertAt||(t.insertAt="bottom");var r=f(e,t);return u(r,t),function(e){for(var o=[],a=0;a<r.length;a++){var i=r[a];(s=n[i.id]).refs--,o.push(s)}e&&u(f(e,t),t);for(a=0;a<o.length;a++){var s;if(0===(s=o[a]).refs){for(var c=0;c<s.parts.length;c++)s.parts[c]();delete n[s.id]}}}};var v=function(){var e=[];return function(t,r){return e[t]=r,e.filter(Boolean).join("\n")}}();function y(e,t,r,n){var o=r?"":n.css;if(e.styleSheet)e.styleSheet.cssText=v(t,o);else{var a=document.createTextNode(o),i=e.childNodes;i[t]&&e.removeChild(i[t]),i.length?e.insertBefore(a,i[t]):e.appendChild(a)}}},5:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.conf=void 0;var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e};t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return React.createElement(o,n({},a,e))};var o=r(1).high.Refer,a=t.conf={multiLang:{domainName:"uap",currentLocale:"zh-CN",moduleId:"uapRefer"},queryTreeUrl:"/nccloud/riart/ref/groupRefTreeAction.do",refType:"tree",placeholder:"1880000025-000061",refName:"1880000025-000061",rootNode:{refname:"1880000025-000061",refpk:"root"}}},6:function(e,t){e.exports=r}})});
//# sourceMappingURL=index.0f9aac84.js.map