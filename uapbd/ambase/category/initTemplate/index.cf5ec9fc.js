!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("nc-lightapp-front")):"function"==typeof define&&define.amd?define(["nc-lightapp-front"],t):"object"==typeof exports?exports["uapbd/ambase/category/initTemplate/index"]=t(require("nc-lightapp-front")):e["uapbd/ambase/category/initTemplate/index"]=t(e["nc-lightapp-front"])}(window,function(e){return function(e){var t={};function o(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,o),a.l=!0,a.exports}return o.m=e,o.c=t,o.d=function(e,t,r){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(o.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)o.d(r,a,function(t){return e[t]}.bind(null,a));return r},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="../../../../",o(o.s=154)}({1:function(t,o){t.exports=e},125:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.config={formId:"head",treeId:"categoryTree",bodyvosId:"bodyvos",ajaxurl:{loadtree:"/nccloud/uapbd/amcategory/loadtree.do",loadtreeByCode:"/nccloud/uapbd/amcategory/loadtreebycode.do",query4form:"/nccloud/uapbd/amcategory/queryCategory4Form.do",savecategory:"/nccloud/uapbd/amcategory/savecategory.do",addcategory:"/nccloud/uapbd/amcategory/addcategory.do",deletecategory:"/nccloud/uapbd/amcategory/deletecategory.do",enablecategory:"/nccloud/uapbd/amcategory/enablecategory.do",disablecategory:"/nccloud/uapbd/amcategory/disablecategory.do",editcategory:"/nccloud/uapbd/amcategory/editcategory.do",loadleveltree:"/nccloud/uapbd/amcategory/loadleveltree.do",printcategorycard:"/nccloud/uapbd/amcategory/printcategorycard.do",queryparam:"/nccloud/uapbd/amcategory/categoryparamref.do"},keys:["input_length","input_digit","nullflag"]}},141:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.initTemplate=void 0;var r=o(125),a=o(1),n=r.config.treeId,c=r.config.formId,d=r.config.bodyvosId;t.initTemplate=function(e,t,o){e.createUIDom({pagecode:e.config.pageCodeForm},function(r){var u=r.template;u=function(e,t,o,r){t[c].status="browse",t[d].status="browse",t[d].items.forEach(function(e){"classid"===e.attrcode&&(e.refcode="../../../../uapbd/refer/am/CategoryParamTypeGridRef/index.js",e.refName=o["10141505-000035"])});var u={attrcode:"opr",label:o["10141505-000000"],visible:!0,className:"table-opr",width:100,itemtype:"customer",render:function(t,c,u){var l=e.cardTable.getStatus(d);return"browse"===l||void 0==l?React.createElement("div",null):React.createElement("div",{className:"currency-opr-col"},React.createElement("span",{className:"currency-opr-del",onClick:function(t){var l=e.syncTree.getSelectNode(n);if("edit"!=c.operate||l.isleaf||"ROOT"==l.refpk){var i=r&&r.get(["10141505-000001"],{index:c.values.param_index.value});if(c.father)(0,a.toast)({color:"warning",content:i});else{e.cardTable.delRowsByIndex(d,u);var p=e.cardTable.getCheckedRows(d);e.button.setDisabled({delline:!(p&&p.length>0)}),t.stopPropagation()}}else(0,a.toast)({color:"warning",content:o["10141505-000032"]})}},o["10141505-000003"]))}};return t[d].items.push(u),t}(e,u,t,o),e.meta.setMeta(u),r.button&&e.button.setButtons(r.button),r.button&&e.button.setButtons(r.button)})}},154:function(e,t,o){e.exports=o(141)}})});
//# sourceMappingURL=index.cf5ec9fc.js.map