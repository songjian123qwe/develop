!function(e,r){"object"==typeof exports&&"object"==typeof module?module.exports=r(require("nc-lightapp-front")):"function"==typeof define&&define.amd?define(["nc-lightapp-front"],r):"object"==typeof exports?exports["uapbd/refer/pubinfo/BankaccDefaultTreeGridRef/index"]=r(require("nc-lightapp-front")):e["uapbd/refer/pubinfo/BankaccDefaultTreeGridRef/index"]=r(e["nc-lightapp-front"])}(window,function(e){return function(e){var r={};function n(t){if(r[t])return r[t].exports;var o=r[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=r,n.d=function(e,r,t){n.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:t})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,r){if(1&r&&(e=n(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(n.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var o in e)n.d(t,o,function(r){return e[r]}.bind(null,o));return t},n.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(r,"a",r),r},n.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},n.p="../../../../",n(n.s=782)}({0:function(r,n){r.exports=e},1:function(e,r,n){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.conf=void 0;var t=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var n=arguments[r];for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&(e[t]=n[t])}return e};r.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return React.createElement(o,t({},f,e))};var o=n(0).high.Refer,f=r.conf={multiLang:{domainName:"uap",currentLocale:"zh-CN",moduleId:"uapRefer"},queryTreeUrl:"/nccloud/riart/ref/groupRefTreeAction.do",refType:"tree",placeholder:"1880000025-000061",refName:"1880000025-000061",rootNode:{refname:"1880000025-000061",refpk:"root"}}},11:function(e,r,n){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.conf=void 0;var t=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var n=arguments[r];for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&(e[t]=n[t])}return e};r.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return React.createElement(a,t({},u,e))};var o=n(0),f=n(1),a=o.high.Refer,u=r.conf={multiLang:{domainName:"uapbd",currentLocale:"zh-CN",moduleId:"refer_uapbd"},idKey:"refpk2",pidKey:"pid2",refType:"tree",refName:"refer-000165",placeholder:"refer-000165",rootNode:{refname:"refer-000165",refpk2:"root"},treeConfig:{name:["refer-000002","refer-000003"],code:["refcode","refname"]},refCode:"uapbd.refer.org.FinanceOrgTreeRef",queryTreeUrl:"/nccloud/uapbd/org/FinanceOrgTreeRef.do",isShowDisabledData:!1,unitProps:f.conf,isRunWithChildren:!1}},782:function(e,r,n){e.exports=n(783)},783:function(e,r,n){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var t=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var n=arguments[r];for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&(e[t]=n[t])}return e};r.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r={multiLang:{domainName:"uapbd",currentLocale:"zh-CN",moduleId:"refer_uapbd"},refType:"gridTree",refName:"refer-000439",placeholder:"refer-000439",rootNode:{refname:"refer-000439",refpk:"root"},refCode:"uapbd.pubinfo.BankaccDefaultTreeGridRef",treeConfig:{name:["refer-000002","refer-000003"],code:["refcode","refname"]},columnConfig:[{name:["refer-000012","refer-000013","refer-000379","refer-000387","refer-000014","refer-000015"],code:["accnum","accname","refcode","refname","mnecode","banktypename"]}],queryTreeUrl:"/nccloud/uapbd/ref/BankDocDefaultTreeRef.do",queryGridUrl:"/nccloud/uapbd/ref/BankaccGridRef.do",isMultiSelectedEnabled:!1,unitProps:f.conf};return React.createElement(a,t({},r,e))};var o=n(0),f=n(11),a=o.high.Refer}})});
//# sourceMappingURL=index.js.map