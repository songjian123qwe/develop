!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("nc-lightapp-front"),require("react"),require("react-dom")):"function"==typeof define&&define.amd?define(["nc-lightapp-front","react","react-dom"],t):"object"==typeof exports?exports["uapbd/pub/bdref/referencing/index"]=t(require("nc-lightapp-front"),require("react"),require("react-dom")):e["uapbd/pub/bdref/referencing/index"]=t(e["nc-lightapp-front"],e.React,e.ReactDOM)}(window,function(e,t,n){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="../../../../",n(n.s=145)}({1:function(t,n){t.exports=e},127:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=n(2),a=u(o),i=(u(n(3)),n(1));function u(e){return e&&e.__esModule?e:{default:e}}i.base.NCPopconfirm,i.base.NCModal;var c="referencing",l="/nccloud/uapbd/bdref/querybdrefdata.do",f={},s=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.props=e,n.props.button.setButtonsVisible({listButton:!0,relatedbillButton:!0}),n.state={curMeta:"",curPk:"",RefPk:"",json:{},inlt:null},n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,o.Component),r(t,[{key:"componentDidMount",value:function(){var e=this;this.props.MultiInit.getMultiLang({moduleId:"10140REFCO",domainName:"uapbd",callback:function(t,n,r){n?(e.setState({json:t,inlt:r}),e.initTemplate.call(e,e.props,t,r)):console.log("未加载到多语资源")}})}},{key:"initTemplate",value:function(e,t,n){var r={referencingTable:e.config.referencingTable,referencingColumn:e.config.referencingColumn,referencedTable:e.config.referencedTable,docPk:e.config.docPk,pagecode:"10140REFCO_referencing"};(0,i.ajax)({url:l,data:r,success:function(n){var r=n.data.meta;r[c].name=t["10140REFCO-000014"],e.meta.setMeta(r),f={rows:[]},n.data.data&&n.data.data[c]&&(f=n.data.data[c]),e.table.setAllTableData(c,f)}})}},{key:"updateButtonStatus",value:function(){this.props.table.getCheckedRows(c).length;this.props.button.setButtonsVisible({listButton:!0,relatedbillButton:!0})}},{key:"onButtonClick",value:function(e){switch(e){case"list":this.props.linkTo("referenced/index.html",{status:"ing",data:props.getUrlParam("data")})}}},{key:"render",value:function(){var e=this.props,t=e.cardTable,n=e.table,r=e.button,o=e.search,u=e.editTable,l=e.modal,f=(u.createEditTable,n.createSimpleTable);o.NCCreateSearch,r.createButton,i.base.NCFormControl,i.base.NCCheckbox,l.createModal,t.createCardTable;return a.default.createElement("div",{className:"nc-single-table"},a.default.createElement("div",{className:"nc-singleTable-table-area"},f(c,{useFixedHeader:!0,selectedChange:this.updateButtonStatus.bind(this),showIndex:!1,showCheck:!1})))}}]),t}();s=(0,i.createPage)({initTemplate:function(){}})(s),t.default=s},145:function(e,t,n){e.exports=n(127)},2:function(e,n){e.exports=t},3:function(e,t){e.exports=n}})});
//# sourceMappingURL=index.d0bc5389.js.map