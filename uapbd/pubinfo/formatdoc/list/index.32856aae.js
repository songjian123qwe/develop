!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("nc-lightapp-front"),require("react"),require("react-dom")):"function"==typeof define&&define.amd?define(["nc-lightapp-front","react","react-dom"],t):"object"==typeof exports?exports["uapbd/pubinfo/formatdoc/list/index"]=t(require("nc-lightapp-front"),require("react"),require("react-dom")):e["uapbd/pubinfo/formatdoc/list/index"]=t(e["nc-lightapp-front"],e.React,e.ReactDOM)}(window,function(e,t,n){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="../../../../",n(n.s=187)}({1:function(t,n){t.exports=e},126:function(e,t){e.exports=n},128:function(e,t){e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var n=function(e,t){var n=e[1]||"",r=e[3];if(!r)return n;if(t&&"function"==typeof btoa){var o=function(e){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(e))))+" */"}(r),a=r.sources.map(function(e){return"/*# sourceURL="+r.sourceRoot+e+" */"});return[n].concat(a).concat([o]).join("\n")}return[n].join("\n")}(t,e);return t[2]?"@media "+t[2]+"{"+n+"}":n}).join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var r={},o=0;o<this.length;o++){var a=this[o][0];"number"==typeof a&&(r[a]=!0)}for(o=0;o<e.length;o++){var i=e[o];"number"==typeof i[0]&&r[i[0]]||(n&&!i[2]?i[2]=n:n&&(i[2]="("+i[2]+") and ("+n+")"),t.push(i))}},t}},129:function(e,t,n){var r={},o=function(e){var t;return function(){return void 0===t&&(t=e.apply(this,arguments)),t}}(function(){return window&&document&&document.all&&!window.atob}),a=function(e){var t={};return function(e){return void 0===t[e]&&(t[e]=function(e){return document.querySelector(e)}.call(this,e)),t[e]}}(),i=null,c=0,s=[],u=n(130);function l(e,t){for(var n=0;n<e.length;n++){var o=e[n],a=r[o.id];if(a){a.refs++;for(var i=0;i<a.parts.length;i++)a.parts[i](o.parts[i]);for(;i<o.parts.length;i++)a.parts.push(m(o.parts[i],t))}else{var c=[];for(i=0;i<o.parts.length;i++)c.push(m(o.parts[i],t));r[o.id]={id:o.id,refs:1,parts:c}}}}function f(e,t){for(var n=[],r={},o=0;o<e.length;o++){var a=e[o],i=t.base?a[0]+t.base:a[0],c={css:a[1],media:a[2],sourceMap:a[3]};r[i]?r[i].parts.push(c):n.push(r[i]={id:i,parts:[c]})}return n}function d(e,t){var n=a(e.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var r=s[s.length-1];if("top"===e.insertAt)r?r.nextSibling?n.insertBefore(t,r.nextSibling):n.appendChild(t):n.insertBefore(t,n.firstChild),s.push(t);else{if("bottom"!==e.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");n.appendChild(t)}}function p(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e);var t=s.indexOf(e);t>=0&&s.splice(t,1)}function b(e){var t=document.createElement("style");return e.attrs.type="text/css",h(t,e.attrs),d(e,t),t}function h(e,t){Object.keys(t).forEach(function(n){e.setAttribute(n,t[n])})}function m(e,t){var n,r,o,a;if(t.transform&&e.css){if(!(a=t.transform(e.css)))return function(){};e.css=a}if(t.singleton){var s=c++;n=i||(i=b(t)),r=g.bind(null,n,s,!1),o=g.bind(null,n,s,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=function(e){var t=document.createElement("link");return e.attrs.type="text/css",e.attrs.rel="stylesheet",h(t,e.attrs),d(e,t),t}(t),r=function(e,t,n){var r=n.css,o=n.sourceMap,a=void 0===t.convertToAbsoluteUrls&&o;(t.convertToAbsoluteUrls||a)&&(r=u(r));o&&(r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */");var i=new Blob([r],{type:"text/css"}),c=e.href;e.href=URL.createObjectURL(i),c&&URL.revokeObjectURL(c)}.bind(null,n,t),o=function(){p(n),n.href&&URL.revokeObjectURL(n.href)}):(n=b(t),r=function(e,t){var n=t.css,r=t.media;r&&e.setAttribute("media",r);if(e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}.bind(null,n),o=function(){p(n)});return r(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;r(e=t)}else o()}}e.exports=function(e,t){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(t=t||{}).attrs="object"==typeof t.attrs?t.attrs:{},t.singleton||(t.singleton=o()),t.insertInto||(t.insertInto="head"),t.insertAt||(t.insertAt="bottom");var n=f(e,t);return l(n,t),function(e){for(var o=[],a=0;a<n.length;a++){var i=n[a];(c=r[i.id]).refs--,o.push(c)}e&&l(f(e,t),t);for(a=0;a<o.length;a++){var c;if(0===(c=o[a]).refs){for(var s=0;s<c.parts.length;s++)c.parts[s]();delete r[c.id]}}}};var v=function(){var e=[];return function(t,n){return e[t]=n,e.filter(Boolean).join("\n")}}();function g(e,t,n,r){var o=n?"":r.css;if(e.styleSheet)e.styleSheet.cssText=v(t,o);else{var a=document.createTextNode(o),i=e.childNodes;i[t]&&e.removeChild(i[t]),i.length?e.insertBefore(a,i[t]):e.appendChild(a)}}},130:function(e,t){e.exports=function(e){var t="undefined"!=typeof window&&window.location;if(!t)throw new Error("fixUrls requires window.location");if(!e||"string"!=typeof e)return e;var n=t.protocol+"//"+t.host,r=n+t.pathname.replace(/\/[^\/]*$/,"/");return e.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(e,t){var o,a=t.trim().replace(/^"(.*)"$/,function(e,t){return t}).replace(/^'(.*)'$/,function(e,t){return t});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(a)?e:(o=0===a.indexOf("//")?a:0===a.indexOf("/")?n+a:r+a.replace(/^\.\//,""),"url("+JSON.stringify(o)+")")})}},187:function(e,t,n){e.exports=n(188)},188:function(e,t,n){"use strict";var r,o,a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=n(2),c=l(i),s=l(n(126)),u=n(1);function l(e){return e&&e.__esModule?e:{default:e}}n(189);u.base.NCPopconfirm,u.base.NCIcon,u.base.NCTabs.NCTabPane;var f="10140LFOR",d="formatdoc",p="pk_formatdoc",b="/nccloud/uapbd/formatdoc/formatdocquery.do",h="/nccloud/uapbd/formatdoc/formatdocdelete.do",m="/nccloud/uapbd/formatdoc/formatdocdefault.do",v=["EditLine","DelLine","SetToDefault","Copy"];var g=(r=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return o.call(n),n.tableId=d,n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,i.Component),a(t,[{key:"componentDidMount",value:function(){}},{key:"buttonClick",value:function(e,t){switch(t){case"Add":e.linkTo("../card/index.html",{status:"add"});break;case"Refresh":this.refreshAction(e);break;case"Delete":this.props.modal.show("delete")}}},{key:"render",value:function(){var e=this.props,t=e.table,n=e.button,r=e.search,o=e.modal.createModal,a=this.props.button.getButtons();a=a.sort(function(e,t){return t.btnorder-e.btnorder});var i=t.createSimpleTable,s=(r.NCCreateSearch,n.createButtonApp);n.getButtons;return c.default.createElement("div",{className:"nc-bill-list"},c.default.createElement("div",{className:"nc-bill-header-area"},c.default.createElement("div",{className:"header-title-search-area"},c.default.createElement("h2",{className:"title-search-detail"},"数据格式")),c.default.createElement("div",{className:"header-button-area"},s({area:"header-button-area",buttonLimit:3,onButtonClick:this.buttonClick.bind(this),popContainer:document.querySelector(".header-button-area")}))),c.default.createElement("div",{style:{height:"10px"}}),c.default.createElement("div",{className:"nc-bill-table-area"},i(this.tableId,{handlePageInfoChange:this.pageInfoClick,tableModelConfirm:this.tableModelConfirm,showIndex:!0,showCheck:!0,onRowDoubleClick:this.doubleClick.bind(this)})),o("delete",{title:"注意",content:"确认删除？",beSureBtnClick:this.deleteAction}))}}]),t}(),o=function(){var e=this;this.doubleClick=function(t,n,r){console.log("双击"),console.log(e);e.props.search.getAllSearchData("searcharea");e.props.linkTo("../card/index.html",{status:"browse",id:t[p].value})},this.deleteAction=function(){var t=e.props.table.getCheckedRows(d);console.log(t);var n={deleteinfo:t.map(function(e){return{id:e.data.values[p].value,ts:e.data.values.ts.value}})};console.log(n),(0,u.ajax)({url:h,data:n,success:function(t){(0,u.toast)({color:"success",content:"删除成功"}),e.refreshAction(e.props)}})},this.refreshAction=function(e){var t={pageInfo:e.table.getTablePageInfo(d),pagecode:f};(0,u.ajax)({url:b,data:t,success:function(t){console.log(t),t.data?e.table.setAllTableData(d,t.data[d]):(0,u.toast)({content:"无数据",color:"warning"})},error:function(e){console.log(e.message)}})},this.pageInfoClick=function(t,n,r){t.table.getTablePageInfo(e.tableId),t.search.getAllSearchData("searcharea");u.cacheTools.set("pageInfo",t.table.getTablePageInfo(d));var o={allpks:r,pageid:f};(0,u.ajax)({url:queryPageUrl,data:o,success:function(e){var n=e.success,r=e.data;n&&(r?t.table.setAllTableData(d,r[d]):t.table.setAllTableData(d,{rows:[]}))}})}},r);g=(0,u.createPage)({initTemplate:function(e){e.createUIDom({pagecode:f,appid:"0001Z010000000001H74"},function(t){if(t&&t.template){var n=t.template;n=function(e,t){return t[d].items.push({attrcode:"opr",label:"操作",width:200,fixed:"right",className:"table-opr",visible:!0,render:function(t,n,r){return e.button.createOprationButton(v,{area:"table-opr-area",buttonLimit:3,onButtonClick:function(e,t){return function(e,t,n,r,o){switch(t){case"EditLine":e.linkTo("../card/index.html",{status:"edit",id:r[p].value});break;case"Copy":e.linkTo("../card/index.html",{status:"add",id:r[p].value});break;case"SetToDefault":var a={pageid:f,id:r[p].value,model:{areaType:"table",pageinfo:null,rows:[]}};(0,u.ajax)({url:m,data:a,success:function(e){(0,u.toast)({color:"success",content:"成功"})}});break;case"DelLine":(0,u.ajax)({url:h,data:{pk_formatdoc:r[p].value},success:function(t){t.success&&((0,u.toast)({color:"success",content:"删除成功"}),e.table.deleteTableRowsByIndex(d,o))}});break;default:console.log(t,o)}}(e,t,0,n,r)}})}}),t}(e,n),e.meta.setMeta(n),t.button&&e.button.setButtons(t.button),(0,u.ajax)({url:b,data:{pagecode:f},success:function(t){t.data?e.table.setAllTableData(d,t.data[d]):(0,u.toast)({content:"无数据",color:"warning"})},error:function(e){console.log(e.message)}}),e.button.setButtonsVisible({Add:!0,Edit:!0,Copy:!0,Save:!1,Cancel:!1,SetToDefault:!0,Refresh:!0,Print:!0})}})}})(g),s.default.render(c.default.createElement(g,null),document.querySelector("#app"))},189:function(e,t,n){var r=n(190);"string"==typeof r&&(r=[[e.i,r,""]]);var o={transform:void 0};n(129)(r,o);r.locals&&(e.exports=r.locals)},190:function(e,t,n){(e.exports=n(128)(!1)).push([e.i,"#app {\n  margin: 20px 50px;\n}\n",""])},2:function(e,n){e.exports=t}})});
//# sourceMappingURL=index.32856aae.js.map