!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("nc-lightapp-front"),require("react")):"function"==typeof define&&define.amd?define(["nc-lightapp-front","react"],t):"object"==typeof exports?exports["uapbd/org/dept/list/index"]=t(require("nc-lightapp-front"),require("react")):e["uapbd/org/dept/list/index"]=t(e["nc-lightapp-front"],e.React)}(window,function(e,t){return function(e){var t={};function n(o){if(t[o])return t[o].exports;var a=t[o]={i:o,l:!1,exports:{}};return e[o].call(a.exports,a,a.exports,n),a.l=!0,a.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(o,a,function(t){return e[t]}.bind(null,a));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="../../../../",n(n.s=333)}({1:function(t,n){t.exports=e},2:function(e,n){e.exports=t},266:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),a=n(2),r=function(e){return e&&e.__esModule?e:{default:e}}(a),i=n(1);i.base.NCForm,i.base.NCInput,i.base.NCTable;var s=i.base.NCBackBtn,l=i.high.PrintOutput,u="deptquery",c="/nccloud/baseapp/dept/print.do",p="/nccloud/baseapp/dept/queryarea.do",d="/nccloud/baseapp/dept/querypage.do",f=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.clickSearchBtn=function(e,t){var o={querycondition:null==t?null:t,queryAreaCode:u,oid:"1010Z010000000005HKC",querytype:"tree",custcondition:{conditions:[],logic:"and"}};n.setState({queryparam:o}),n.loadData(o)},n.state={queryparam:{pageInfo:{},ids:[],querycondition:{},queryAreaCode:u,oid:"1010Z010000000005HKC",querytype:"tree",custcondition:{conditions:[],logic:"and"}}},n.loadMeta(function(){n.loadData({querycondition:n.props.search.getAllSearchData(u,!1),queryAreaCode:u,oid:"1010Z010000000005HKC",querytype:"tree",custcondition:{conditions:[],logic:"and"}},"init")}),n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,a.Component),o(t,[{key:"loadMeta",value:function(e){var t=this.props;t.createUIDom({pagecode:"10100DEPT_deptlist"},function(n){if(n&&n.template){var o=n.template,a=o.deptquery.items.find(function(e){return"pk_fatherorg"===e.attrcode}),r=o.deptquery.items.find(function(e){return"deptlevel"===e.attrcode});a.isShowUnit=!0,r.queryCondition=function(){return{pk_defdoclist:"1010ZZ10000000003PHX"}},o.deptquery.items.find(function(e){return"principal"===e.attrcode}).isShowDisabledData=!0,t.meta.setMeta(o),t.search.setSearchValByField(u,"pk_org",{value:n.context.pk_org,display:n.context.org_Name})}if(n.button){var i=n.button;t.button.setButtons(i)}e()})}},{key:"onButtonClick",value:function(e,t){var n=this;switch(t){case"refresh":this.loadData(this.state.queryparam,function(){(0,i.toast)({title:n.props.config.json["10100DEPT-000025"],color:"success"})});break;case"print":var o={funcode:"10100DEPT",nodekey:"deptListPrint"};this.pintFunction(o);break;case"export":var a=this.props.table.getPks("dept");this.setState({ids:a},this.refs.printOutput.open());break;case"return":this.props.config("N")}}},{key:"pintFunction",value:function(e){var t=this.props.table.getPks("dept");e.oids=t,(0,i.print)("pdf",c,e)}},{key:"loadData",value:function(e,t){var n=this;(0,i.ajax)({url:p,data:e,success:function(e){e.success&&e.data?(e.formulamsg&&e.formulamsg instanceof Array&&e.formulamsg.length>0&&n.props.dealFormulamsg(e.formulamsg,{tableid:"simpleTable"}),e.data.dept.rows.forEach(function(e){e.values.displayorder.value="999999"==e.values.displayorder.value?null:e.values.displayorder.value}),n.props.table.setAllTableData("dept",e.data.dept),t&&t instanceof Function?t():"init"==t||(0,i.toast)({content:n.props.config.json["10100DEPT-000068"]+e.data.dept.allpks.length+n.props.config.json["10100DEPT-000069"],color:"success"}),n.props.button.setDisabled({print:!1,export:!1})):(n.props.table.setAllTableData("dept",{rows:[]}),t&&t instanceof Function?t():"init"==t||(0,i.toast)({content:n.props.config.json["10100DEPT-000070"],color:"warning"}),n.props.button.setDisabled({print:!0,export:!0}))},error:function(e){console.log(e.message)}})}},{key:"onPageModalClick",value:function(e,t,n){var o=this;e.table.getTablePageInfo("dept");(0,i.ajax)({url:d,data:{pk_depts:n},success:function(e){e.success&&e.data?(e.formulamsg&&e.formulamsg instanceof Array&&e.formulamsg.length>0&&o.props.dealFormulamsg(e.formulamsg,{tableid:"simpleTable"}),e.data.dept.rows.forEach(function(e){e.values.displayorder.value="999999"==e.values.displayorder.value?null:e.values.displayorder.value}),o.props.table.setAllTableData("dept",e.data.dept)):(o.props.table.setAllTableData("dept",{rows:[]}),(0,i.toast)({content:o.props.config.json["10100DEPT-000070"],color:"warning"}))},error:function(e){console.log(e.message)}})}},{key:"render",value:function(){var e=this.props,t=e.table,n=e.search,o=e.button,a=t.createSimpleTable,i=n.NCCreateSearch,p=(o.createButton,o.createButtonApp);return r.default.createElement("div",{className:"nc-single-table"},r.default.createElement("div",{className:"nc-singleTable-header-area"},r.default.createElement(s,{className:"title-search-detail",onClick:this.onButtonClick.bind(this,null,"return")}),r.default.createElement("h2",{className:"title-search-detail",style:{fontSize:"16px"}},this.props.config.json["10100DEPT-000000"]),r.default.createElement("div",{className:"header-button-area"},p({area:"deptlist_btn",buttonLimit:3,onButtonClick:this.onButtonClick.bind(this),popContainer:document.querySelector(".header-button-area")}))),r.default.createElement("div",{className:"nc-bill-search-area",style:{marginTop:10,marginBottom:10,padding:"0px 20px"}},i(u,{clickSearchBtn:this.clickSearchBtn.bind(this)})),r.default.createElement("div",{className:"nc-singleTable-table-area"},a("dept",{handlePageInfoChange:this.onPageModalClick.bind(this),showIndex:!0,showCheck:!1})),r.default.createElement(l,{ref:"printOutput",url:c,data:{funcode:"10100DEPT",nodekey:"deptListPrint",oids:this.state.ids,outputType:"output"}}))}}]),t}();f=(0,i.createPage)({initTemplate:function(){}})(f),t.default=f},333:function(e,t,n){e.exports=n(266)}})});
//# sourceMappingURL=index.9c330e0e.js.map