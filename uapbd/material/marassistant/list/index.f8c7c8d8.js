!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("nc-lightapp-front"),require("react"),require("react-dom")):"function"==typeof define&&define.amd?define(["nc-lightapp-front","react","react-dom"],t):"object"==typeof exports?exports["uapbd/material/marassistant/list/index"]=t(require("nc-lightapp-front"),require("react"),require("react-dom")):e["uapbd/material/marassistant/list/index"]=t(e["nc-lightapp-front"],e.React,e.ReactDOM)}(window,function(e,t,n){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="../../../../",n(n.s=303)}({1:function(t,n){t.exports=e},144:function(e,t){e.exports=function(e){var t="undefined"!=typeof window&&window.location;if(!t)throw new Error("fixUrls requires window.location");if(!e||"string"!=typeof e)return e;var n=t.protocol+"//"+t.host,r=n+t.pathname.replace(/\/[^\/]*$/,"/");return e.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(e,t){var o,a=t.trim().replace(/^"(.*)"$/,function(e,t){return t}).replace(/^'(.*)'$/,function(e,t){return t});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(a)?e:(o=0===a.indexOf("//")?a:0===a.indexOf("/")?n+a:r+a.replace(/^\.\//,""),"url("+JSON.stringify(o)+")")})}},148:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e};t.default=function(e){return function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=arguments[2],i=0,s={},c=function(){2==i&&a&&a(s.templateData||{},s.langData||{},s.inlt||{})};n.callback&&console.log("咱们自己createUIDom会同时获取多语和单据模板,并通过一个回调函数返回, langCfg中的回调函数将被忽略");var u=r({},n,{callback:function(e,t,n){i+=1,t||(0,o.toast)({content:"load muti lang error",color:"warning"}),s.langData=e||{},s.inlt=n||{},c()}});e.MultiInit.getMultiLang(u),e.createUIDom(t,function(e){i+=1,s.templateData=e||{},c()})}};var o=n(1)},2:function(e,n){e.exports=t},229:function(e,t,n){(function(e,r){var o=/%[sdj%]/g;t.format=function(e){if(!y(e)){for(var t=[],n=0;n<arguments.length;n++)t.push(s(arguments[n]));return t.join(" ")}n=1;for(var r=arguments,a=r.length,i=String(e).replace(o,function(e){if("%%"===e)return"%";if(n>=a)return e;switch(e){case"%s":return String(r[n++]);case"%d":return Number(r[n++]);case"%j":try{return JSON.stringify(r[n++])}catch(e){return"[Circular]"}default:return e}}),c=r[n];n<a;c=r[++n])m(c)||!S(c)?i+=" "+c:i+=" "+s(c);return i},t.deprecate=function(n,o){if(v(e.process))return function(){return t.deprecate(n,o).apply(this,arguments)};if(!0===r.noDeprecation)return n;var a=!1;return function(){if(!a){if(r.throwDeprecation)throw new Error(o);r.traceDeprecation?console.trace(o):console.error(o),a=!0}return n.apply(this,arguments)}};var a,i={};function s(e,n){var r={seen:[],stylize:u};return arguments.length>=3&&(r.depth=arguments[2]),arguments.length>=4&&(r.colors=arguments[3]),h(n)?r.showHidden=n:n&&t._extend(r,n),v(r.showHidden)&&(r.showHidden=!1),v(r.depth)&&(r.depth=2),v(r.colors)&&(r.colors=!1),v(r.customInspect)&&(r.customInspect=!0),r.colors&&(r.stylize=c),l(r,e,r.depth)}function c(e,t){var n=s.styles[t];return n?"["+s.colors[n][0]+"m"+e+"["+s.colors[n][1]+"m":e}function u(e,t){return e}function l(e,n,r){if(e.customInspect&&n&&x(n.inspect)&&n.inspect!==t.inspect&&(!n.constructor||n.constructor.prototype!==n)){var o=n.inspect(r,e);return y(o)||(o=l(e,o,r)),o}var a=function(e,t){if(v(t))return e.stylize("undefined","undefined");if(y(t)){var n="'"+JSON.stringify(t).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";return e.stylize(n,"string")}if(b(t))return e.stylize(""+t,"number");if(h(t))return e.stylize(""+t,"boolean");if(m(t))return e.stylize("null","null")}(e,n);if(a)return a;var i=Object.keys(n),s=function(e){var t={};return e.forEach(function(e,n){t[e]=!0}),t}(i);if(e.showHidden&&(i=Object.getOwnPropertyNames(n)),w(n)&&(i.indexOf("message")>=0||i.indexOf("description")>=0))return f(n);if(0===i.length){if(x(n)){var c=n.name?": "+n.name:"";return e.stylize("[Function"+c+"]","special")}if(g(n))return e.stylize(RegExp.prototype.toString.call(n),"regexp");if(T(n))return e.stylize(Date.prototype.toString.call(n),"date");if(w(n))return f(n)}var u,S="",k=!1,j=["{","}"];(d(n)&&(k=!0,j=["[","]"]),x(n))&&(S=" [Function"+(n.name?": "+n.name:"")+"]");return g(n)&&(S=" "+RegExp.prototype.toString.call(n)),T(n)&&(S=" "+Date.prototype.toUTCString.call(n)),w(n)&&(S=" "+f(n)),0!==i.length||k&&0!=n.length?r<0?g(n)?e.stylize(RegExp.prototype.toString.call(n),"regexp"):e.stylize("[Object]","special"):(e.seen.push(n),u=k?function(e,t,n,r,o){for(var a=[],i=0,s=t.length;i<s;++i)D(t,String(i))?a.push(p(e,t,n,r,String(i),!0)):a.push("");return o.forEach(function(o){o.match(/^\d+$/)||a.push(p(e,t,n,r,o,!0))}),a}(e,n,r,s,i):i.map(function(t){return p(e,n,r,s,t,k)}),e.seen.pop(),function(e,t,n){if(e.reduce(function(e,t){return 0,t.indexOf("\n")>=0&&0,e+t.replace(/\u001b\[\d\d?m/g,"").length+1},0)>60)return n[0]+(""===t?"":t+"\n ")+" "+e.join(",\n  ")+" "+n[1];return n[0]+t+" "+e.join(", ")+" "+n[1]}(u,S,j)):j[0]+S+j[1]}function f(e){return"["+Error.prototype.toString.call(e)+"]"}function p(e,t,n,r,o,a){var i,s,c;if((c=Object.getOwnPropertyDescriptor(t,o)||{value:t[o]}).get?s=c.set?e.stylize("[Getter/Setter]","special"):e.stylize("[Getter]","special"):c.set&&(s=e.stylize("[Setter]","special")),D(r,o)||(i="["+o+"]"),s||(e.seen.indexOf(c.value)<0?(s=m(n)?l(e,c.value,null):l(e,c.value,n-1)).indexOf("\n")>-1&&(s=a?s.split("\n").map(function(e){return"  "+e}).join("\n").substr(2):"\n"+s.split("\n").map(function(e){return"   "+e}).join("\n")):s=e.stylize("[Circular]","special")),v(i)){if(a&&o.match(/^\d+$/))return s;(i=JSON.stringify(""+o)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?(i=i.substr(1,i.length-2),i=e.stylize(i,"name")):(i=i.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'"),i=e.stylize(i,"string"))}return i+": "+s}function d(e){return Array.isArray(e)}function h(e){return"boolean"==typeof e}function m(e){return null===e}function b(e){return"number"==typeof e}function y(e){return"string"==typeof e}function v(e){return void 0===e}function g(e){return S(e)&&"[object RegExp]"===k(e)}function S(e){return"object"==typeof e&&null!==e}function T(e){return S(e)&&"[object Date]"===k(e)}function w(e){return S(e)&&("[object Error]"===k(e)||e instanceof Error)}function x(e){return"function"==typeof e}function k(e){return Object.prototype.toString.call(e)}function j(e){return e<10?"0"+e.toString(10):e.toString(10)}t.debuglog=function(e){if(v(a)&&(a=r.env.NODE_DEBUG||""),e=e.toUpperCase(),!i[e])if(new RegExp("\\b"+e+"\\b","i").test(a)){var n=r.pid;i[e]=function(){var r=t.format.apply(t,arguments);console.error("%s %d: %s",e,n,r)}}else i[e]=function(){};return i[e]},t.inspect=s,s.colors={bold:[1,22],italic:[3,23],underline:[4,24],inverse:[7,27],white:[37,39],grey:[90,39],black:[30,39],blue:[34,39],cyan:[36,39],green:[32,39],magenta:[35,39],red:[31,39],yellow:[33,39]},s.styles={special:"cyan",number:"yellow",boolean:"yellow",undefined:"grey",null:"bold",string:"green",date:"magenta",regexp:"red"},t.isArray=d,t.isBoolean=h,t.isNull=m,t.isNullOrUndefined=function(e){return null==e},t.isNumber=b,t.isString=y,t.isSymbol=function(e){return"symbol"==typeof e},t.isUndefined=v,t.isRegExp=g,t.isObject=S,t.isDate=T,t.isError=w,t.isFunction=x,t.isPrimitive=function(e){return null===e||"boolean"==typeof e||"number"==typeof e||"string"==typeof e||"symbol"==typeof e||void 0===e},t.isBuffer=n(232);var A=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function D(e,t){return Object.prototype.hasOwnProperty.call(e,t)}t.log=function(){console.log("%s - %s",function(){var e=new Date,t=[j(e.getHours()),j(e.getMinutes()),j(e.getSeconds())].join(":");return[e.getDate(),A[e.getMonth()],t].join(" ")}(),t.format.apply(t,arguments))},t.inherits=n(233),t._extend=function(e,t){if(!t||!S(t))return e;for(var n=Object.keys(t),r=n.length;r--;)e[n[r]]=t[n[r]];return e}}).call(this,n(230),n(231))},230:function(e,t){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(e){"object"==typeof window&&(n=window)}e.exports=n},231:function(e,t){var n,r,o=e.exports={};function a(){throw new Error("setTimeout has not been defined")}function i(){throw new Error("clearTimeout has not been defined")}function s(e){if(n===setTimeout)return setTimeout(e,0);if((n===a||!n)&&setTimeout)return n=setTimeout,setTimeout(e,0);try{return n(e,0)}catch(t){try{return n.call(null,e,0)}catch(t){return n.call(this,e,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:a}catch(e){n=a}try{r="function"==typeof clearTimeout?clearTimeout:i}catch(e){r=i}}();var c,u=[],l=!1,f=-1;function p(){l&&c&&(l=!1,c.length?u=c.concat(u):f=-1,u.length&&d())}function d(){if(!l){var e=s(p);l=!0;for(var t=u.length;t;){for(c=u,u=[];++f<t;)c&&c[f].run();f=-1,t=u.length}c=null,l=!1,function(e){if(r===clearTimeout)return clearTimeout(e);if((r===i||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(e);try{r(e)}catch(t){try{return r.call(null,e)}catch(t){return r.call(this,e)}}}(e)}}function h(e,t){this.fun=e,this.array=t}function m(){}o.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];u.push(new h(e,t)),1!==u.length||l||s(d)},h.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=m,o.addListener=m,o.once=m,o.off=m,o.removeListener=m,o.removeAllListeners=m,o.emit=m,o.prependListener=m,o.prependOnceListener=m,o.listeners=function(e){return[]},o.binding=function(e){throw new Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(e){throw new Error("process.chdir is not supported")},o.umask=function(){return 0}},232:function(e,t){e.exports=function(e){return e&&"object"==typeof e&&"function"==typeof e.copy&&"function"==typeof e.fill&&"function"==typeof e.readUInt8}},233:function(e,t){"function"==typeof Object.create?e.exports=function(e,t){e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}})}:e.exports=function(e,t){e.super_=t;var n=function(){};n.prototype=t.prototype,e.prototype=new n,e.prototype.constructor=e}},258:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,o,a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=n(2),s=l(i),c=(l(n(4)),n(1));n(259);n(229);var u=l(n(148));function l(e){return e&&e.__esModule?e:{default:e}}c.base.NCCol,c.base.NCRow;var f=c.cardCache.setDefData,p=c.cardCache.getDefData,d=(c.base.NCDatePicker,c.base.NCButton,c.base.NCPanel,c.base.NCCheckbox,c.base.NCPopconfirm,c.base.NCRadio,c.base.NCTree,"systemTree"),h="marassistant_list",m="marasstframe",b="",y="add",v="10140MASST_list",g="10140MASST_card_frame",S=["Edit","Delete"],T="10140MASST_list",w="/nccloud/uapbd/material/MarAsstFrameQueryAction.do",x="/nccloud/uapbd/material/MarAssistantQueryByFramePkAction.do",k="/nccloud/uapbd/material/MarAsstFrameQueryByPkAction.do",j="/nccloud/uapbd/material/MarAsstFrameSaveAction.do",A="/nccloud/uapbd/material/MarAsstFrameDeleteAction.do",D="/nccloud/uapbd/material/MarAssistantDeleteAction.do",E=(r=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));o.call(n),n.props=e;var r=n.props,a=(r.form,r.button,r.table,r.search,r.syncTree.setSyncTreeData);return n.setSyncTreeData=a,n.state={json:{}},n.initTemplate(e),n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,i.Component),a(t,[{key:"componentDidMount",value:function(){this.loadLeftTreeData()}},{key:"loadLeftTreeData",value:function(){var e=this;(0,c.ajax)({url:w,method:"post",data:{},success:function(t){if(t.success){var n=e.dealTreeData(t.data);if(e.setSyncTreeData(d,n),t.data.length>0){var r=p("pk_marasstframe",T);r&&""!=r?setTimeout(function(){e.props.syncTree.setNodeSelected(d,r),e.loadTableData(r)},100):e.props.syncTree.setNodeSelected(d,t.data[0].refpk)}e.toggleShow()}else alert(t.message)}})}},{key:"onDeleteSysEve",value:function(e){var t=this;b=e,(0,c.promptBox)({color:"warning",content:this.state.json["10140MASST-000015"],beSureBtnClick:function(){t.onDeleteSys()}})}},{key:"onDeleteSys",value:function(){var e=b.id,t=this;(0,c.ajax)({url:A,method:"post",data:{pk_marasstframe:e,ts:b.nodeData.ts},success:function(n){t.props.syncTree.delNodeSuceess(d,e),t.props.modal.close("sysDelete")}})}},{key:"onSelectEve",value:function(e,t,n){"root"!==e?this.loadTableData(e):this.props.table.setAllTableData(h,{rows:[]})}},{key:"loadTableData",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=this;(0,c.ajax)({url:x,method:"post",data:{pk_marasstframe:e},success:function(e){if(e.success){if(e.data){n.props.table.setAllTableData(h,e.data.marassistant_list),n.props.button.setButtonDisabled(["Print","Output"],!1)}else n.props.table.setAllTableData(h,{rows:[]}),n.props.button.setButtonDisabled(["Print","Output"],!0);t&&(0,c.toast)({color:"success",title:n.state.json["10140MASST-000016"]}),n.toggleShow()}else alert(e.message)}})}},{key:"toggleShow",value:function(){var e=this.props.syncTree.getSelectNode(d);e?"root"===e.id?this.props.button.setButtonDisabled(["Add"],!0):this.props.button.setButtonDisabled(["Add"],!1):this.props.button.setButtonDisabled(["Add"],!0)}},{key:"onMouseEnterEve",value:function(e){if("root"===e){this.props.syncTree.hideIcon(d,e,{delIcon:!1,editIcon:!1,addIcon:!0})}else{this.props.syncTree.hideIcon(d,e,{delIcon:!0,editIcon:!0,addIcon:!1})}}},{key:"onAddFrame",value:function(){y="add",this.openSysModal("")}},{key:"onEditSys",value:function(e){y="edit",this.openSysModal(e.id)}},{key:"openSysModal",value:function(e){this.props.form.setFormStatus(m,"edit"),this.props.form.EmptyAllFormValue(m);var t=this;(0,c.ajax)({url:k,method:"post",data:{pk_marasstframe:e},success:function(e){if(e.success){t.props.form.EmptyAllFormValue(m);var n={marasstframe:{rows:e.data.marasstframe.rows}};t.props.form.setAllFormValue(n),t.props.modal.show("frameModal")}else alert(e.message)}})}},{key:"onSaveSys",value:function(){var e=this;if(this.props.form.isCheckNow(m)){var t=this.props.form.getAllFormValue(m),n={model:t,pageid:v};this.props.validateToSave(n,function(){e.frameSaveFun(t)},{marasstframe:"form"},"form")}}},{key:"frameSaveFun",value:function(e){var t={model:e,pageid:g},n=this;(0,c.ajax)({url:j,method:"post",data:t,success:function(e){if(e.success){var t=n.dealTreeData(e.data);"add"===y?n.props.syncTree.addNodeSuccess(d,t):n.props.syncTree.editNodeSuccess(d,t),n.props.modal.close("frameModal")}else alert(e.message)}})}},{key:"dealTreeData",value:function(e){return e.forEach(function(e){!function e(t){t.iconBox={editIcon:!0,addIcon:!0,delIcon:!0},t.children&&0!=t.children.length?(t.isLeaf=!1,t.children.forEach(function(t){e(t)})):delete t.children}(e),e.iconBox={editIcon:!0,addIcon:!0,delIcon:!0}}),e}},{key:"onClickButton",value:function(e,t){var n=e.syncTree.getSelectNode(d).id;switch(t){case"Add":if("root"===n)return void(0,c.toast)({content:this.state.json["10140MASST-000017"],color:"warning"});f("pk_marasstframe",T,n),e.pushTo("/card",{pagecode:"10140MASST_card",status:"add",id:"",pk_marasstframe:n});break;case"Refresh":this.loadTableData(n,!0);break;case"Asstrst":e.openTo("/uapbd/material/marasstrst/main/index.html",{pagecode:"10140MASSR_card",appcode:"10140MASSR",status:"browse"})}}},{key:"render",value:function(){var e=this,t=this.props,n=t.table,r=t.button,o=t.syncTree,a=t.modal,i=t.DragWidthCom,u=t.treeTable,l=t.treeTableManyCol,f=t.editTable,p=n.createSimpleTable,b=(r.createButton,r.createButtonApp),y=(u.createTreeTable,f.createEditTable,l.treeTableCol,o.createSyncTree),v=a.createModal;return s.default.createElement("div",{className:"bankPage"},v("warning",{title:this.state.json["10140MASST-000018"],content:this.state.json["10140MASST-000019"]}),v("frameModal",{title:this.state.json["10140MASST-000020"],content:this.props.form.createForm(m),userControl:!0,beSureBtnClick:this.onSaveSys.bind(this),cancelBtnClick:function(){(0,c.promptBox)({color:"warning",title:e.state.json["10140MASST-000003"],content:e.state.json["10140MASST-000004"],beSureBtnClick:function(){e.props.modal.close("frameModal")}})}}),v("sysDelete",{title:this.state.json["10140MASST-000021"],content:this.state.json["10140MASST-000022"],userControl:!0,beSureBtnClick:this.onDeleteSys.bind(this),cancelBtnClick:function(){e.props.modal.close("sysDelete")}}),s.default.createElement("div",{className:"header credit",style:{marginBottom:0}},s.default.createElement("h2",{className:"title"},this.state.json["10140MASST-000012"]),s.default.createElement("div",{className:"btn-group"},b({area:"list_head",buttonLimit:5,onButtonClick:this.onClickButton.bind(this),popContainer:document.querySelector(".list_head")}))),s.default.createElement("div",{className:"tree-table"},s.default.createElement(i,{leftDom:s.default.createElement("div",{className:"tree-area"},y({treeId:d,showLine:!0,clickEditIconEve:this.onEditSys.bind(this),clickDelIconEve:this.onDeleteSysEve.bind(this),clickAddIconEve:this.onAddFrame.bind(this),onSelectEve:this.onSelectEve.bind(this),defaultExpandAll:!0,onMouseEnterEve:this.onMouseEnterEve.bind(this),showModal:!1})),rightDom:s.default.createElement("div",{className:"treeTableCol"},p(h,{defaultExpandAll:!0,showCheckBox:!0,onRowDoubleClick:this.doubleClick.bind(this),checkedType:"radio",dataSource:T,pkname:"pk_marassistant",componentInitFinished:function(){}})),defLeftWid:"280px"})))}}]),t}(),o=function(){var e=this;this.doubleClick=function(t,n,r){var o=t.pk_marassistant.value,a=e.props.syncTree.getSelectNode(d).id;f("pk_marasstframe",T,a),e.props.pushTo("/card",{status:"browse",id:o,pk:o,pk_marasstframe:a})},this.initTemplate=function(e){var t=this;(0,u.default)(e)({pagecode:v},{moduleId:"10140MASST",domainName:"uapbd"},function(n,r){if(r&&(t.state.json=r),n){var o=n.template;o=t.modifierMeta(e,o),e.meta.setMeta(o),n.button&&(e.button.setButtons(n.button),e.button.setPopContent("Delete",t.state.json["10140MASST-000022"]))}})},this.tableButtonClick=function(t,n,r,o,a){var i=o.pk_marassistant.value,s=t.syncTree.getSelectNode(d).id;switch(n){case"Edit":f("pk_marasstframe",T,s),t.pushTo("/card",{status:"edit",id:i,pk:i,pk_marasstframe:s});break;case"Delete":(0,c.ajax)({url:D,data:{pk_marassistant:i,ts:o.ts.value},success:function(n){n.success&&((0,c.toast)({color:"success",title:e.state.json["10140MASST-000024"]}),t.table.deleteTableRowsByIndex(h,a),(0,t.table.deleteCacheId)(h,i))}})}},this.modifierMeta=function(t,n){return n[h].items.push({attrcode:"opr",label:e.state.json["10140MASST-000014"],itemtype:"customer",className:"table-opr",width:200,fixed:"right",visible:!0,render:function(n,r,o){return t.button.createOprationButton(S,{area:"list_inner",buttonLimit:3,onButtonClick:function(t,a){return e.tableButtonClick.call(e,t,a,n,r,o)}})}}),n[h].items=n[h].items.map(function(n,r){return"code"==n.attrcode&&(n.render=function(n,r,o){return s.default.createElement("span",{style:{color:"#007ace",cursor:"pointer"},onClick:function(){f("pk_marasstframe",T,e.props.syncTree.getSelectNode(d).id),t.pushTo("/card",{status:"browse",id:r.pk_marassistant.value,pk:r.pk_marassistant.value,pk_marasstframe:e.props.syncTree.getSelectNode(d).id})}},r&&r.code&&r.code.value)}),n}),n}},r);E=(0,c.createPage)({initTemplate:function(){},billinfo:{billtype:"form",pagecode:v,headcode:"marasstframe"}})(E),t.default=E},259:function(e,t,n){var r=n(260);"string"==typeof r&&(r=[[e.i,r,""]]);var o={transform:void 0};n(6)(r,o);r.locals&&(e.exports=r.locals)},260:function(e,t,n){(e.exports=n(5)(!1)).push([e.i,".version-head {\n  margin-bottom: 13px;\n}\n.tree-table {\n  top: 60px;\n}\n.ncc-hr-contain {\n  width: 100%;\n  height: 100%;\n  border: 1px solid #e9e9e9;\n}\n.ncc-hr-left-tree {\n  width: 75%;\n  float: left;\n  height: 99%;\n  background-color: #fff;\n}\n.ncc-hr-right-operate {\n  width: 24%;\n  height: 99%;\n  float: right;\n  background-color: #fff;\n  border-left: 1px solid #e9e9e9;\n}\n.ncc-hr-sperator {\n  width: 1px;\n  height: 100%;\n  float: left;\n  background-color: #e9e9e9;\n  border: 2px solid #e9e9e9;\n}\n.ncc-hr-padding {\n  padding: 20px 20px 20px 20px;\n}\n.credit {\n  padding-left: 20px!important;\n  padding-right: 20px!important;\n}\n",""])},303:function(e,t,n){e.exports=n(258)},4:function(e,t){e.exports=n},5:function(e,t){e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var n=function(e,t){var n=e[1]||"",r=e[3];if(!r)return n;if(t&&"function"==typeof btoa){var o=function(e){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(e))))+" */"}(r),a=r.sources.map(function(e){return"/*# sourceURL="+r.sourceRoot+e+" */"});return[n].concat(a).concat([o]).join("\n")}return[n].join("\n")}(t,e);return t[2]?"@media "+t[2]+"{"+n+"}":n}).join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var r={},o=0;o<this.length;o++){var a=this[o][0];"number"==typeof a&&(r[a]=!0)}for(o=0;o<e.length;o++){var i=e[o];"number"==typeof i[0]&&r[i[0]]||(n&&!i[2]?i[2]=n:n&&(i[2]="("+i[2]+") and ("+n+")"),t.push(i))}},t}},6:function(e,t,n){var r={},o=function(e){var t;return function(){return void 0===t&&(t=e.apply(this,arguments)),t}}(function(){return window&&document&&document.all&&!window.atob}),a=function(e){var t={};return function(e){return void 0===t[e]&&(t[e]=function(e){return document.querySelector(e)}.call(this,e)),t[e]}}(),i=null,s=0,c=[],u=n(144);function l(e,t){for(var n=0;n<e.length;n++){var o=e[n],a=r[o.id];if(a){a.refs++;for(var i=0;i<a.parts.length;i++)a.parts[i](o.parts[i]);for(;i<o.parts.length;i++)a.parts.push(b(o.parts[i],t))}else{var s=[];for(i=0;i<o.parts.length;i++)s.push(b(o.parts[i],t));r[o.id]={id:o.id,refs:1,parts:s}}}}function f(e,t){for(var n=[],r={},o=0;o<e.length;o++){var a=e[o],i=t.base?a[0]+t.base:a[0],s={css:a[1],media:a[2],sourceMap:a[3]};r[i]?r[i].parts.push(s):n.push(r[i]={id:i,parts:[s]})}return n}function p(e,t){var n=a(e.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var r=c[c.length-1];if("top"===e.insertAt)r?r.nextSibling?n.insertBefore(t,r.nextSibling):n.appendChild(t):n.insertBefore(t,n.firstChild),c.push(t);else{if("bottom"!==e.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");n.appendChild(t)}}function d(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e);var t=c.indexOf(e);t>=0&&c.splice(t,1)}function h(e){var t=document.createElement("style");return e.attrs.type="text/css",m(t,e.attrs),p(e,t),t}function m(e,t){Object.keys(t).forEach(function(n){e.setAttribute(n,t[n])})}function b(e,t){var n,r,o,a;if(t.transform&&e.css){if(!(a=t.transform(e.css)))return function(){};e.css=a}if(t.singleton){var c=s++;n=i||(i=h(t)),r=v.bind(null,n,c,!1),o=v.bind(null,n,c,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=function(e){var t=document.createElement("link");return e.attrs.type="text/css",e.attrs.rel="stylesheet",m(t,e.attrs),p(e,t),t}(t),r=function(e,t,n){var r=n.css,o=n.sourceMap,a=void 0===t.convertToAbsoluteUrls&&o;(t.convertToAbsoluteUrls||a)&&(r=u(r));o&&(r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */");var i=new Blob([r],{type:"text/css"}),s=e.href;e.href=URL.createObjectURL(i),s&&URL.revokeObjectURL(s)}.bind(null,n,t),o=function(){d(n),n.href&&URL.revokeObjectURL(n.href)}):(n=h(t),r=function(e,t){var n=t.css,r=t.media;r&&e.setAttribute("media",r);if(e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}.bind(null,n),o=function(){d(n)});return r(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;r(e=t)}else o()}}e.exports=function(e,t){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(t=t||{}).attrs="object"==typeof t.attrs?t.attrs:{},t.singleton||(t.singleton=o()),t.insertInto||(t.insertInto="head"),t.insertAt||(t.insertAt="bottom");var n=f(e,t);return l(n,t),function(e){for(var o=[],a=0;a<n.length;a++){var i=n[a];(s=r[i.id]).refs--,o.push(s)}e&&l(f(e,t),t);for(a=0;a<o.length;a++){var s;if(0===(s=o[a]).refs){for(var c=0;c<s.parts.length;c++)s.parts[c]();delete r[s.id]}}}};var y=function(){var e=[];return function(t,n){return e[t]=n,e.filter(Boolean).join("\n")}}();function v(e,t,n,r){var o=n?"":r.css;if(e.styleSheet)e.styleSheet.cssText=y(t,o);else{var a=document.createTextNode(o),i=e.childNodes;i[t]&&e.removeChild(i[t]),i.length?e.insertBefore(a,i[t]):e.appendChild(a)}}}})});
//# sourceMappingURL=index.f8c7c8d8.js.map