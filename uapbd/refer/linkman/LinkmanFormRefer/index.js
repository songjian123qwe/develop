!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("nc-lightapp-front"),require("react")):"function"==typeof define&&define.amd?define(["nc-lightapp-front","react"],t):"object"==typeof exports?exports["uapbd/refer/linkman/LinkmanFormRefer/index"]=t(require("nc-lightapp-front"),require("react")):e["uapbd/refer/linkman/LinkmanFormRefer/index"]=t(e["nc-lightapp-front"],e.React)}(window,function(e,t){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="../../../../",n(n.s=310)}({0:function(t,n){t.exports=e},310:function(e,t,n){e.exports=n(311)},311:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.conf=void 0;var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e};t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return o.default.createElement(a.default,r({},u,e))};var o=i(n(4)),a=i(n(312));function i(e){return e&&e.__esModule?e:{default:e}}var u=t.conf={placeholder:"refer-000033",refName:"refer-000033",multiLang:{domainName:"uapbd",currentLocale:"zh-CN",moduleId:"refer_uapbd"},refType:"grid",queryGridUrl:"/nccloud/uapbd/ref/QueryReferLinkman.do",columnConfig:[{name:["refer-000002","refer-000003"],code:["refcode","refname"]}]}},312:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=function(e){return e&&e.__esModule?e:{default:e}}(n(4)),i=n(0);function u(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n(313);var s=i.high.Refer,c=s.PopRefer,f=s.MultiLangWrapper,l=i.base.NCRow,p=i.base.NCButton,d=f(function(e){function t(e){var n=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var o=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return o.renderPopoverSearchArea=function(){return null},o.show=function(){var e=o.props,t=e.disabled,n=e.form,r=e.value;if(t)return!1;var a=o.__getParam({});a.queryCondition&&a.queryCondition.pk_linkman||(a.queryCondition.pk_linkman=r.value),n.EmptyAllFormValue(o.state.areacode),o.loadLinkmanData(a).then(function(e){o.setState({oldData:e},function(){o.setFormData("linkmanRefer",e)})}),o.setState({isShow:!0,isFirstShow:!1,dropDownShow:!1})},o.close=function(e){},o.renderPopoverHeader=function(){o.props.isMultiSelectedEnabled;var e=o.props.refName;return[a.default.createElement("div",{className:"refer-title",key:"1"},e),a.default.createElement("div",{className:"refer-header-extend",key:"2"},o.renderPopoverHeaderExtend()),a.default.createElement("div",{className:"refer-refresh iconfont icon-shuaxin",onClick:o.refresh,key:"3"}),a.default.createElement("div",{className:"refer-max iconfont icon-zuidahua",onClick:o.max,key:"4"}),a.default.createElement("div",{className:"refer-close iconfont icon-guanbi",onClick:function(){o.onCancel(o.onClosePopover)},key:"5"})]},o.renderPopoverContain=function(){var e=o.props.refType,t=o.state.activeKey;return"gridTree"===e&&1==t?a.default.createElement(l,{className:"refer-content-area",style:{width:"1020px"}},o.renderPopoverRight()):a.default.createElement(l,{className:"refer-content-area"},"grid"!==e&&a.default.createElement("div",{style:{width:"tree"===e?"640px":"240px"},className:"refer-tree"},o.renderPopoverLeft()),"tree"!==e&&a.default.createElement("div",{style:{width:"900px"},className:"refer-grid"},o.renderPopoverRight()))},o.renderPopoverBottom=function(){return[a.default.createElement("div",{className:"refer-bottom-extend",key:"2"}),a.default.createElement("div",{className:"buttons",key:"3"},a.default.createElement(p,{style:{backgroundColor:"#E14C46",color:"#fff"},onClick:function(){o.onSaveLinkman(o.onClosePopover)}},o.props.multiLang["refer-001010"]),a.default.createElement(p,{style:{backgroundColor:"#eee",color:"#666",marginLeft:"9px"},onClick:function(){o.onCancel(o.onClosePopover)}},o.props.multiLang["refer-001011"]))]},o.setFormData=function(e,t){o.props.form.setFormStatus(e,"edit"),t&&o.props.form.setAllFormValue(u({},e,t[e]))},o.loadLinkmanData=function(){var e=function(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,n){return function r(o,a){try{var i=t[o](a),u=i.value}catch(e){return void n(e)}if(!i.done)return Promise.resolve(u).then(function(e){r("next",e)},function(e){r("throw",e)});e(u)}("next")})}}(regeneratorRuntime.mark(function e(t){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,new Promise(function(e){o.setState({loading:!0},function(){var n=o.props.queryGridUrl;(0,i.ajax)({url:n,data:t,loading:!1,success:function(t){var n=o.props.dealFormulamsg&&"function"==typeof o.props.dealFormulamsg?o.props.dealFormulamsg:null;if(n&&t.formulamsg&&t.formulamsg instanceof Array&&t.formulamsg.length>0&&n(t),o.setState({loading:!1}),!t.success)throw new Error(t.error.message);e(t.data)},error:function(e){throw(0,i.toast)({color:"danger",content:e.message}),o.setState({loading:!1}),new Error(e)}})})});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e,n)}));return function(t){return e.apply(this,arguments)}}(),o.renderPopoverRight=function(){var e=o.props.form.createForm;return a.default.createElement("div",null,e("linkmanRefer",{onAfterEvent:o.onAfterFormEvent}))},o.onAfterFormEvent=function(){},o.onSaveLinkman=function(e){if(o.props.form.isCheckNow(o.state.areacode)){var t=o.props.validateToSave&&"function"==typeof o.props.validateToSave?o.props.validateToSave:null,n=o.props.form.getAllFormValue(o.state.areacode);n.areacode=o.state.areacode,n.rows.status="2";var r={model:n,pageid:o.props.pageid};o.props.selectedValue;t?t(r,function(){o.saveLinkman(r,e)},u({},o.state.areacode,"form"),"form"):o.saveLinkman(r,e)}},o.saveLinkman=function(e,t){var n=o;(0,i.ajax)({url:n.state.urls.saveLinkmanUrl,data:e,success:function(e){e.success&&(t&&t(),n.props.onAfterEdit&&n.props.onAfterEdit(e.data))}})},o.handleInput=function(e){o.focusFlag=!0,o.setState({referVal:e,dropDownShow:!1})},o.onCancel=function(e){o.props.onAfterEdit&&o.props.onAfterEdit(o.state.oldData),e&&e()},o.onClosePopover=function(){o.setState({isShow:!1,isFirstShow:!1,dropDownShow:!1})},o.state=r({},o.state,{oldData:null,areacode:"linkmanRefer",urls:{saveLinkmanUrl:"/nccloud/uapbd/ref/SaveReferLinkman.do"}}),o}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,c),o(t,[{key:"componentWillReceiveProps",value:function(e){this.setState(r({},e))}}]),t}());t.default=d},313:function(e,t,n){var r=n(314);"string"==typeof r&&(r=[[e.i,r,""]]);var o={transform:void 0};n(6)(r,o);r.locals&&(e.exports=r.locals)},314:function(e,t,n){(e.exports=n(5)(!1)).push([e.i,'.ncc-hr-shezhi::before {\n  color: #757f8c;\n  font-size: 22px;\n  cursor: pointer;\n  margin-left: 20px;\n  content: "\\E613";\n}\n.ncc-hr-sousuo::before {\n  color: #757f8c;\n  font-size: 22px;\n  cursor: pointer;\n  margin-left: 20px;\n  content: "\\E611";\n}\n.ncc-hr-refer-searcharea {\n  text-align: right;\n  margin-right: 20px;\n  width: 100%;\n}\n.ncc-hr-form-style {\n  height: 100%;\n  background-color: #fff;\n}\n.ncc-hr-refer-zIndex {\n  z-index: 301;\n}\n.u-tree-noline_close .u-tree-noline_open .u-tree-switcher {\n  margin-right: 1px;\n}\n.extable-selected-row {\n  background: #ebedf2;\n}\n.ncc-hr-font-size {\n  font-size: 13px;\n  font-family: \'PingFangHK\';\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n',""])},4:function(e,n){e.exports=t},5:function(e,t){e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var n=function(e,t){var n=e[1]||"",r=e[3];if(!r)return n;if(t&&"function"==typeof btoa){var o=function(e){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(e))))+" */"}(r),a=r.sources.map(function(e){return"/*# sourceURL="+r.sourceRoot+e+" */"});return[n].concat(a).concat([o]).join("\n")}return[n].join("\n")}(t,e);return t[2]?"@media "+t[2]+"{"+n+"}":n}).join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var r={},o=0;o<this.length;o++){var a=this[o][0];"number"==typeof a&&(r[a]=!0)}for(o=0;o<e.length;o++){var i=e[o];"number"==typeof i[0]&&r[i[0]]||(n&&!i[2]?i[2]=n:n&&(i[2]="("+i[2]+") and ("+n+")"),t.push(i))}},t}},6:function(e,t,n){var r={},o=function(e){var t;return function(){return void 0===t&&(t=e.apply(this,arguments)),t}}(function(){return window&&document&&document.all&&!window.atob}),a=function(e){var t={};return function(e){return void 0===t[e]&&(t[e]=function(e){return document.querySelector(e)}.call(this,e)),t[e]}}(),i=null,u=0,s=[],c=n(7);function f(e,t){for(var n=0;n<e.length;n++){var o=e[n],a=r[o.id];if(a){a.refs++;for(var i=0;i<a.parts.length;i++)a.parts[i](o.parts[i]);for(;i<o.parts.length;i++)a.parts.push(h(o.parts[i],t))}else{var u=[];for(i=0;i<o.parts.length;i++)u.push(h(o.parts[i],t));r[o.id]={id:o.id,refs:1,parts:u}}}}function l(e,t){for(var n=[],r={},o=0;o<e.length;o++){var a=e[o],i=t.base?a[0]+t.base:a[0],u={css:a[1],media:a[2],sourceMap:a[3]};r[i]?r[i].parts.push(u):n.push(r[i]={id:i,parts:[u]})}return n}function p(e,t){var n=a(e.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var r=s[s.length-1];if("top"===e.insertAt)r?r.nextSibling?n.insertBefore(t,r.nextSibling):n.appendChild(t):n.insertBefore(t,n.firstChild),s.push(t);else{if("bottom"!==e.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");n.appendChild(t)}}function d(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e);var t=s.indexOf(e);t>=0&&s.splice(t,1)}function m(e){var t=document.createElement("style");return e.attrs.type="text/css",v(t,e.attrs),p(e,t),t}function v(e,t){Object.keys(t).forEach(function(n){e.setAttribute(n,t[n])})}function h(e,t){var n,r,o,a;if(t.transform&&e.css){if(!(a=t.transform(e.css)))return function(){};e.css=a}if(t.singleton){var s=u++;n=i||(i=m(t)),r=y.bind(null,n,s,!1),o=y.bind(null,n,s,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=function(e){var t=document.createElement("link");return e.attrs.type="text/css",e.attrs.rel="stylesheet",v(t,e.attrs),p(e,t),t}(t),r=function(e,t,n){var r=n.css,o=n.sourceMap,a=void 0===t.convertToAbsoluteUrls&&o;(t.convertToAbsoluteUrls||a)&&(r=c(r));o&&(r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */");var i=new Blob([r],{type:"text/css"}),u=e.href;e.href=URL.createObjectURL(i),u&&URL.revokeObjectURL(u)}.bind(null,n,t),o=function(){d(n),n.href&&URL.revokeObjectURL(n.href)}):(n=m(t),r=function(e,t){var n=t.css,r=t.media;r&&e.setAttribute("media",r);if(e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}.bind(null,n),o=function(){d(n)});return r(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;r(e=t)}else o()}}e.exports=function(e,t){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(t=t||{}).attrs="object"==typeof t.attrs?t.attrs:{},t.singleton||(t.singleton=o()),t.insertInto||(t.insertInto="head"),t.insertAt||(t.insertAt="bottom");var n=l(e,t);return f(n,t),function(e){for(var o=[],a=0;a<n.length;a++){var i=n[a];(u=r[i.id]).refs--,o.push(u)}e&&f(l(e,t),t);for(a=0;a<o.length;a++){var u;if(0===(u=o[a]).refs){for(var s=0;s<u.parts.length;s++)u.parts[s]();delete r[u.id]}}}};var b=function(){var e=[];return function(t,n){return e[t]=n,e.filter(Boolean).join("\n")}}();function y(e,t,n,r){var o=n?"":r.css;if(e.styleSheet)e.styleSheet.cssText=b(t,o);else{var a=document.createTextNode(o),i=e.childNodes;i[t]&&e.removeChild(i[t]),i.length?e.insertBefore(a,i[t]):e.appendChild(a)}}},7:function(e,t){e.exports=function(e){var t="undefined"!=typeof window&&window.location;if(!t)throw new Error("fixUrls requires window.location");if(!e||"string"!=typeof e)return e;var n=t.protocol+"//"+t.host,r=n+t.pathname.replace(/\/[^\/]*$/,"/");return e.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(e,t){var o,a=t.trim().replace(/^"(.*)"$/,function(e,t){return t}).replace(/^'(.*)'$/,function(e,t){return t});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(a)?e:(o=0===a.indexOf("//")?a:0===a.indexOf("/")?n+a:r+a.replace(/^\.\//,""),"url("+JSON.stringify(o)+")")})}}})});
//# sourceMappingURL=index.js.map