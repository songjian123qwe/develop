!function(e,r){"object"==typeof exports&&"object"==typeof module?module.exports=r(require("nc-lightapp-front")):"function"==typeof define&&define.amd?define(["nc-lightapp-front"],r):"object"==typeof exports?exports["uapbd/refer/customer/FreeCustGridRef/index"]=r(require("nc-lightapp-front")):e["uapbd/refer/customer/FreeCustGridRef/index"]=r(e["nc-lightapp-front"])}(window,function(e){return function(e){var r={};function t(o){if(r[o])return r[o].exports;var n=r[o]={i:o,l:!1,exports:{}};return e[o].call(n.exports,n,n.exports,t),n.l=!0,n.exports}return t.m=e,t.c=r,t.d=function(e,r,o){t.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:o})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,r){if(1&r&&(e=t(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(t.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var n in e)t.d(o,n,function(r){return e[r]}.bind(null,n));return o},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},t.p="../../../../",t(t.s=222)}({0:function(r,t){r.exports=e},222:function(e,r,t){e.exports=t(223)},223:function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var o=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])}return e},n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},u=function(){function e(e,r){for(var t=0;t<r.length;t++){var o=r[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(r,t,o){return t&&e(r.prototype,t),o&&e(r,o),r}}();r.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return React.createElement(l,o({},{multiLang:{domainName:"uapbd",currentLocale:"zh-CN",moduleId:"refer_uapbd"},refType:"grid",refName:"refer-000542",placeholder:"refer-000542",refCode:"uapbd.refer.customer.FreeCustGridRef",queryGridUrl:"/nccloud/uapbd/ref/FreeCustGridRef.do",columnConfig:[{name:["refer-000002","refer-000003","refer-000543","refer-000033","refer-000544"],code:["refcode","refname","address","plinkman","linkphone"]}],isMultiSelectedEnabled:!1,isHasDisabledData:!1},e))};var i=t(0);var c=i.high.Refer,f=c.PopRefer,a=c.MultiLangWrapper,p=i.base.NCButton,l=(i.base.NCTable,i.base.NCModal,a(function(e){function r(e){!function(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}(this,r);var t=function(e,r){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!r||"object"!=typeof r&&"function"!=typeof r?e:r}(this,(r.__proto__||Object.getPrototypeOf(r)).call(this,e));return t.renderPopoverBottomExtend=function(){return React.createElement("div",null,React.createElement(p,{onClick:t.onAddClick.bind(t)},t.props.multiLang["refer-000545"]))},t}return function(e,r){if("function"!=typeof r&&null!==r)throw new TypeError("Super expression must either be null or a function, not "+typeof r);e.prototype=Object.create(r&&r.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),r&&(Object.setPrototypeOf?Object.setPrototypeOf(e,r):e.__proto__=r)}(r,f),u(r,[{key:"onAddClick",value:function(){var e=this,r="",t=window.open();(0,i.ajax)({url:"/nccloud/platform/appregister/openapp.do",data:{appcode:"10140FCG"},success:function(o){var u=encodeURIComponent(encodeURIComponent(o.data.pageurl));"function"==typeof e.props.queryCondition?r=e.props.queryCondition().customSupplier:"object"===n(e.props.queryCondition)&&(r=e.props.queryCondition.customSupplier),t.location="/nccloud/resources/workbench/public/common/main/index.html#/ifr?ifr="+u+"&pk_customsupplier="+r+"&c=10140FCG&p=10140FCG_freecustom"}})}}]),r}()))}})});
//# sourceMappingURL=index.js.map