!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("nc-lightapp-front")):"function"==typeof define&&define.amd?define(["nc-lightapp-front"],t):"object"==typeof exports?exports["uapbd/customer/customer_base/checkAssignOrg/index"]=t(require("nc-lightapp-front")):e["uapbd/customer/customer_base/checkAssignOrg/index"]=t(e["nc-lightapp-front"])}(window,function(e){return function(e){var t={};function n(a){if(t[a])return t[a].exports;var s=t[a]={i:a,l:!1,exports:{}};return e[a].call(s.exports,s,s.exports,n),s.l=!0,s.exports}return n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)n.d(a,s,function(t){return e[t]}.bind(null,s));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="../../../../",n(n.s=286)}({1:function(t,n){t.exports=e},158:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=e.button,n=e.table,s=e.form.createForm,l=n.createSimpleTable,i=t.createButtonApp;return React.createElement("div",{className:""},React.createElement("div",{className:""},React.createElement("div",null,React.createElement("div",{className:"header-button-area",style:{textAlign:"right",marginBottom:"8px"}},i({area:"assignOrg-modal-button",onButtonClick:function(e,t){var n=this,s=[],l=e.table.getCheckedRows("assignOrgtable");if(0===l.length)return void(0,a.toast)({color:"warning",title:this.state.json["10140CUST-000019"]});switch(0===l.length||l.map(function(e){s.push(e.data.values.enablestate.value)}),t){case"assignEnable":case"assignModalEnable":s.includes("2")||o.call(this,e,t,l,function(){e.button.setButtonDisabled(["assignModalEnable","assignEnable"],!0),(0,a.toast)({color:"success",title:n.state.json["10140CUST-000020"]})}),s.includes("2")&&(0,a.toast)({color:"warning",content:this.state.json["10140CUST-000021"]});break;case"assignModalDisable":s.includes("3")||o.call(this,e,t,l,function(){e.button.setButtonDisabled(["assignModalDisable"],!0),(0,a.toast)({color:"success",title:n.state.json["10140CUST-000020"]})}),s.includes("3")&&(0,a.toast)({color:"warning",content:this.state.json["10140CUST-000022"]})}}.bind(this),popContainer:document.querySelector("#header-button-area")}))),React.createElement("div",{className:"nc-bill-form-area"},s("assignOrgCustInfo")),React.createElement("div",{className:"nc-bill-table-area"},l("assignOrgtable",{onSelected:function(e,t,n,a,s){var o=e.table.getCheckedRows(t);0===o.length?e.button.setButtonDisabled(["assignModalEnable","assignEnable","assignModalDisable"],!0):o.length>1?e.button.setButtonDisabled(["assignModalEnable","assignEnable","assignModalDisable"],!1):(e.button.setButtonDisabled(["assignModalEnable","assignEnable"],"2"==o[0].data.values.enablestate.value),e.button.setButtonDisabled(["assignModalDisable"],"2"!=o[0].data.values.enablestate.value))}.bind(this),onSelectedAll:function(e,t,n,a){e.button.setButtonDisabled(["assignModalEnable","assignEnable","assignModalDisable"],!n)}.bind(this),showIndex:!0,showCheck:!0}))))};var a=n(1),s=function(e){return e&&e.__esModule?e:{default:e}}(n(4));function o(e,t,n,o){var l=this,i="assignModalDisable"===t?this.state.json["10140CUST-000023"]:this.state.json["10140CUST-000024"];s.default.call(this,{title:this.state.json["10140CUST-000025"],content:i,beSureBtnClick:function(){(0,a.ajax)({url:"/nccloud/uapbd/customer/assignOrgEnableDisable.do",data:{model:{areacode:"assignOrgtable",rows:[n[0].data],pageInfo:e.table.getTablePageInfo("assignOrgtable")},pageid:e.config.pagecode,userjson:t},success:function(t){var a=t.success,s=t.data;a&&s&&(e.table.updateDataByIndexs("assignOrgtable",[{index:n[0].index,data:s.assignOrgtable.rows[0]}]),o.call(l))}})}})}},286:function(e,t,n){e.exports=n(158)},4:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=e.title,n=e.content,s=e.beSureBtnClick,o=e.cancelBtnClick,l=e.closeBtnClick,i=e.leftBtnName,r=e.rightBtnName;(0,a.promptBox)({color:"warning",title:t,content:n,noFooter:!1,noCancelBtn:!1,beSureBtnName:i||this.state.json["beSureBtnName-001"],cancelBtnName:r||this.state.json["cancelBtnName-001"],hasCloseBtn:!1,beSureBtnClick:s,cancelBtnClick:o,closeBtnClick:l,closeByClickBackDrop:!0})};var a=n(1)}})});
//# sourceMappingURL=index.80fa32af.js.map