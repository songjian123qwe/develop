!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("nc-lightapp-front"),require("react"),require("react-dom")):"function"==typeof define&&define.amd?define(["nc-lightapp-front","react","react-dom"],e):"object"==typeof exports?exports["uapbd/taxinfo/taxregion/list/index"]=e(require("nc-lightapp-front"),require("react"),require("react-dom")):t["uapbd/taxinfo/taxregion/list/index"]=e(t["nc-lightapp-front"],t.React,t.ReactDOM)}(window,function(t,e,a){return function(t){var e={};function a(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,a),o.l=!0,o.exports}return a.m=t,a.c=e,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},a.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)a.d(n,o,function(e){return t[e]}.bind(null,o));return n},a.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="../../../../",a(a.s=180)}({1:function(e,a){e.exports=t},166:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n,o,s=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(t[n]=a[n])}return t},r=function(){function t(t,e){for(var a=0;a<e.length;a++){var n=e[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,a,n){return a&&t(e.prototype,a),n&&t(e,n),e}}(),i=a(2),l=u(i),c=(u(a(3)),a(1));function u(t){return t&&t.__esModule?t:{default:t}}var d=c.base.NCPopconfirm,h=c.base.NCCheckbox,f=(c.base.NCIcon,c.base.NCTabs.NCTabPane,c.high.PrintOutput),p="10140TAXRE_list",b="taxregionsearch",m="taxregion",g="pk_taxregion",T="/nccloud/uapbd/taxregion/queryTaxregionList.do",v="/nccloud/uapbd/taxregion/delTaxregion.do",E="/nccloud/uapbd/taxregion/printTaxregion.do",A=(n=function(t){function e(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);var a=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return o.call(a),a.searchId=b,a.tableId=m,a.selectedRowRecord=null,a.state={showOffDisable:!1,isShowOff:!1},a.searchVal=null,a.changeEnableInfo={title:"",content:""},a}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,i.Component),r(e,[{key:"modifierMeta",value:function(t,e){var a=this;return e[b].items=e[b].items.map(function(t,e){return t.col="3",t}),e[b].items.find(function(t){return"pk_country"==t.attrcode}).isMultiSelectedEnabled=!0,e[m].items=e[m].items.map(function(e,a){return e.width=150,"project_code"==e.attrcode&&(e.render=function(e,a,n){return l.default.createElement("span",{style:{textDecoration:"underline",cursor:"pointer"},onClick:function(){var e=t.search.getAllSearchData(b);c.cacheTools.set("searchParams",e),t.pushTo("/card",{status:"browse",id:a[g].value})}},a&&a.project_code&&a.project_code.value)}),e}),e[m].items.push({itemtype:"customer",attrcode:"opr",label:this.state.json?this.state.json["10140TAXRE-000000"]:"10140TAXRE-000000",width:200,fixed:"right",className:"table-opr",visible:!0,render:function(e,n,o){return l.default.createElement("span",null,l.default.createElement("span",{style:{cursor:"pointer"},onClick:function(){t.pushTo("/card",{status:"edit",id:n[g].value})}},a.state.json?a.state.json["10140TAXRE-000038"]:"10140TAXRE-000038"),l.default.createElement("span",null,"   "),l.default.createElement(d,{trigger:"click",placement:"top",content:a.state.json?a.state.json["10140TAXRE-000031"]:"10140TAXRE-000031",onClose:function(){var e=n[g].value;(0,c.ajax)({url:v,data:{id:n[g].value,ts:n.ts.value},success:function(n){n.success&&((0,c.toast)({color:"success",content:a.state.json["10140TAXRE-000032"]}),(0,t.table.deleteCacheId)(m,e),t.table.deleteTableRowsByIndex(m,o))}})}},l.default.createElement("span",{style:{cursor:"pointer"}},a.state.json?a.state.json["10140TAXRE-000025"]:"10140TAXRE-000025")))}}),e}},{key:"componentDidMount",value:function(){var t=this;this.props.MultiInit.getMultiLang({moduleId:"10140TAXRE",domainName:"uapbd",callback:function(e,a,n){a&&t.setState({json:e,inlt:n},function(){t.initTemplate(t.props)})}});var e={Enable:!0,Disable:!0};0==this.props.table.getAllTableData(this.tableId).rows.length&&(e.Print=!0,e.Output=!0),this.props.button.setButtonDisabled(e)}},{key:"buttonClick",value:function(t,e){var a=this;switch(e){case"Add":var n=t.search.getAllSearchData(b);c.cacheTools.set("searchParams",n),t.pushTo("/card",{status:"add"});break;case"Edit":if(n=t.search.getAllSearchData(b),c.cacheTools.set("searchParams",n),null==this.selectedRowRecord)return void(0,c.toast)({content:this.state.json["10140TAXRE-000033"],color:"warning"});t.pushTo("/card",{status:"edit",id:this.selectedRowRecord[g].value});break;case"Refresh":this.refreshAction(t,!0);break;case"Delete":(0,c.promptBox)({color:"warning",title:this.state.json["10140TAXRE-000004"],content:this.state.json["10140TAXRE-000005"],noFooter:!1,noCancelBtn:!1,beSureBtnName:this.state.json["10140TAXRE-000006"],cancelBtnName:this.state.json["10140TAXRE-000007"],beSureBtnClick:this.deleteAction.bind(this)});break;case"Print":this.output("print");break;case"Enable":(0,c.promptBox)({color:"warning",title:this.state.json["10140TAXRE-000014"],content:this.state.json["10140TAXRE-000015"],noFooter:!1,noCancelBtn:!1,beSureBtnName:this.state.json["10140TAXRE-000006"],cancelBtnName:this.state.json["10140TAXRE-000007"],beSureBtnClick:this.changeEnableClick.bind(this)});break;case"Disable":(0,c.promptBox)({color:"warning",title:this.state.json["10140TAXRE-000016"],content:this.state.json["10140TAXRE-000017"],noFooter:!1,noCancelBtn:!1,beSureBtnName:this.state.json["10140TAXRE-000006"],cancelBtnName:this.state.json["10140TAXRE-000007"],beSureBtnClick:this.changeEnableClick.bind(this)});break;case"Output":var o=[];this.props.table.getAllTableData(m).rows.forEach(function(t){o.push(t.values[g].value)}),this.setState({pks:o},function(){a.refs.printOutput.open()})}}},{key:"changeEnableClick",value:function(){var t=this,e=this.selectedRowRecord[g].value;(0,c.ajax)({url:"/nccloud/uapbd/taxregion/changeEnableTaxregion.do",data:{id:e},success:function(e){if(e.data){var a=t.props.table.getAllTableData(t.tableId);a.rows.forEach(function(a){a.values[g].value==e.data.pk&&(a.values.enablestate={value:e.data.enableState,display:2==e.data.enableState?t.state.json["10140TAXRE-000002"]:t.state.json["10140TAXRE-000034"]},a.values.modifier={value:e.data.modifier,display:e.data.modifierName},a.values.modifiedtime={value:e.data.modifyTime,display:e.data.modifyTime})}),t.props.table.setAllTableData(t.tableId,a)}2==e.data.enableState?(t.props.button.setButtonDisabled({Enable:!0,Disable:!1}),(0,c.toast)({color:"success",title:t.state.json["10140TAXRE-000020"]})):(t.props.button.setButtonDisabled({Enable:!1,Disable:!0}),(0,c.toast)({color:"success",title:t.state.json["10140TAXRE-000021"]}))}})}},{key:"output",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",e=[];this.props.table.getAllTableData(m).rows.forEach(function(t){e.push(t.values[g].value)}),""!=t&&(0,c.print)("pdf",E,{funcode:"10140TAXRE",nodekey:"list",oids:e,outputType:t})}},{key:"onRowClick",value:function(t,e,a,n){this.selectedRowRecord=a,2==a.enablestate.value?t.button.setButtonDisabled({Enable:!0,Disable:!1}):t.button.setButtonDisabled({Enable:!1,Disable:!0})}},{key:"getData",value:function(t,e){var a=this,n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],o=arguments[3],r=this.props.search.getQueryInfo("taxregionsearch"),i=r.oid,l=s({},r,{pageInfo:{pageIndex:0,pageSize:10,total:0,totalPage:0},pagecode:p,queryAreaCode:b,oid:i,querytype:"tree",showDisable:e});(0,c.ajax)({url:T,data:l,success:function(t){if(a.props.button.setButtonDisabled({Enable:!0,Disable:!0}),t.data){var e=[];t.data[m].rows.forEach(function(t){e.push(t.values[g].value)}),a.props.button.setButtonDisabled({Print:!1,Output:!1}),t.data[m].allpks=e,a.props.table.setAllTableData(a.tableId,t.data[m]);var s=e.length,r=a.state.inlt;n&&(0,c.toast)({title:a.state.json["10140TAXRE-000035"],content:r.get("10140TAXRE-000042",{count:s}),color:"success"})}else{a.props.button.setButtonDisabled({Print:!0,Output:!0}),a.props.table.setAllTableData(m,{allpks:[],rows:[]}),n&&(0,c.toast)({content:a.state.json["10140TAXRE-000036"],color:"warning",title:a.state.json["10140TAXRE-000037"]})}o&&"function"==typeof o&&o()}})}},{key:"showOffChange",value:function(){var t=!this.state.isShowOff;this.setState({isShowOff:!this.state.isShowOff}),this.getData(this.searchVal,t)}},{key:"render",value:function(){var t=this.props,e=t.table,a=t.button,n=t.search,o=(t.base,t.modal),s=this.props.button.getButtons();s=s.sort(function(t,e){return e.btnorder-t.btnorder});var r=e.createSimpleTable,i=n.NCCreateSearch,c=o.createModal,u=a.createButtonApp;a.getButtons;return l.default.createElement("div",{className:"nc-bill-list"},l.default.createElement("div",{className:"nc-bill-header-area"},l.default.createElement("div",{className:"header-title-search-area"},l.default.createElement("h2",{className:"title-search-detail"},this.state.json?this.state.json["10140TAXRE-000029"]:"10140TAXRE-000029")),l.default.createElement("div",{className:"title-search-detail"},l.default.createElement("span",null,l.default.createElement(h,{checked:this.state.isShowOff,onChange:this.showOffChange.bind(this),disabled:this.state.showOffDisable},this.state.json?this.state.json["10140TAXRE-000041"]:"10140TAXRE-000041"))),l.default.createElement("div",{className:"header-button-area"},u({area:"header-action",buttonLimit:3,onButtonClick:this.buttonClick.bind(this),popContainer:document.querySelector(".header-button-area")}))),l.default.createElement("div",{className:"nc-bill-search-area"},i(this.searchId,{clickSearchBtn:this.clickSearchBtn.bind(this)})),l.default.createElement("div",{className:"nc-bill-table-area"},r(this.tableId,{dataSource:"upabd.taxinfo.taxregion.data",pkname:g,tableModelConfirm:this.tableModelConfirm,showIndex:!1,onRowClick:this.onRowClick.bind(this),onRowDoubleClick:this.doubleClick.bind(this)})),c("delete",{title:this.state.json?this.state.json["10140TAXRE-000004"]:"10140TAXRE-000004",content:this.state.json?this.state.json["10140TAXRE-000005"]:"10140TAXRE-000005",beSureBtnClick:this.deleteAction.bind(this)}),c("enable",{title:this.state.json?this.state.json["10140TAXRE-000014"]:"10140TAXRE-000014",content:this.state.json?this.state.json["10140TAXRE-000015"]:"10140TAXRE-000015",beSureBtnClick:this.changeEnableClick.bind(this)}),c("disable",{title:this.state.json?this.state.json["10140TAXRE-000016"]:"10140TAXRE-000016",content:this.state.json?this.state.json["10140TAXRE-000017"]:"10140TAXRE-000017",beSureBtnClick:this.changeEnableClick.bind(this)}),l.default.createElement(f,{ref:"printOutput",url:E,data:{funcode:"10140TAXRE",nodekey:"list",oids:this.state.pks,outputType:"output"}}))}}]),e}(),o=function(){var t=this;this.initTemplate=function(e){e.createUIDom({pagecode:p},function(a){if(a){if(a.template){var n=a.template;n=t.modifierMeta(e,n),e.meta.setMeta(n);var o=c.cacheTools.get("searchParams"),s=null!=o&&o?o:{conditions:[],logic:"and"},r=a.template.taxregionsearch.oid,i={querycondition:s,pageInfo:{pageIndex:0,pageSize:10,total:0,totalPage:0},pagecode:p,queryAreaCode:b,oid:r,querytype:"tree"};(0,c.ajax)({url:T,data:i,success:function(a){if(a.data){var n=[];a.data[m].rows.forEach(function(t){n.push(t.values[g].value)}),e.button.setButtonDisabled({Print:!1,Output:!1}),a.data[m].allpks=n,e.table.setAllTableData(m,a.data[m])}else{e.button.setButtonDisabled({Print:!0,Output:!0}),e.table.setAllTableData(m,{allpks:[],rows:[]}),(0,c.toast)({content:t.state.json?t.state.json["10140TAXRE-000030"]:"10140TAXRE-000030",color:"warning"})}a.formulamsg&&a.formulamsg instanceof Array&&a.formulamsg.length>0&&t.props.dealFormulamsg(a.formulamsg,function(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}({},m,"editTable"))}}),o&&0!=o&&e.search.setSearchValue("taxregionsearch",o)}if(a.button){var l=a.button;e.button.setButtons(l)}}})},this.getButtonNames=function(t){return"edit"===t||"add"===t||"save"===t?"main-button":"secondary - button"},this.doubleClick=function(e,a,n,o){var s=t.props.search.getAllSearchData(b);c.cacheTools.set("searchParams",s),t.props.pushTo("/card",{status:"browse",id:e[g].value})},this.deleteAction=function(e){var a={id:t.selectedRowRecord[g].value,ts:t.selectedRowRecord.ts.value};(0,c.ajax)({url:v,data:a,success:function(a){(0,c.toast)({color:"success",title:t.state.json["10140TAXRE-000019"]}),t.refreshAction(e)}})},this.refreshAction=function(e){var a=arguments.length>1&&void 0!==arguments[1]&&arguments[1];t.getData({},t.state.isShowOff,!1,function(){a&&(0,c.toast)({title:t.state.json["10140TAXRE-000013"],color:"success"})})},this.pageInfoClick=function(e,a,n){e.table.getTablePageInfo(t.tableId);var o={allpks:n,pageid:p};(0,c.ajax)({url:"/nccloud/uapbd/taxregion/ProjectQueryPageGridByPks.do",data:o,success:function(t){var a=t.success,n=t.data;a&&(n?e.table.setAllTableData(m,n[m]):e.table.setAllTableData(m,{rows:[]}))}})},this.clickSearchBtn=function(e,a){t.searchVal=a,c.cacheTools.set("searchParams",a),t.getData(a,t.state.isShowOff,!0)}},n);A=(0,c.createPage)({initTemplate:[],mutiLangCode:"10140TAXRE"})(A),e.default=A},180:function(t,e,a){t.exports=a(166)},2:function(t,a){t.exports=e},3:function(t,e){t.exports=a}})});
//# sourceMappingURL=index.da65d490.js.map