!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("nc-lightapp-front"),require("react"),require("react-dom")):"function"==typeof define&&define.amd?define(["nc-lightapp-front","react","react-dom"],t):"object"==typeof exports?exports["uapbd/sminfo/payment_base/list/index"]=t(require("nc-lightapp-front"),require("react"),require("react-dom")):e["uapbd/sminfo/payment_base/list/index"]=t(e["nc-lightapp-front"],e.React,e.ReactDOM)}(window,function(e,t,o){return function(e){var t={};function o(a){if(t[a])return t[a].exports;var n=t[a]={i:a,l:!1,exports:{}};return e[a].call(n.exports,n,n.exports,o),n.l=!0,n.exports}return o.m=e,o.c=t,o.d=function(e,t,a){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(o.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)o.d(a,n,function(t){return e[t]}.bind(null,n));return a},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="../../../../",o(o.s=282)}({1:function(t,o){t.exports=e},193:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a,n,r=function(){function e(e,t){for(var o=0;o<t.length;o++){var a=t[o];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,o,a){return o&&e(t.prototype,o),a&&e(t,a),t}}(),s=o(2),l=c(s),i=(c(o(3)),o(1));function c(e){return e&&e.__esModule?e:{default:e}}function u(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}i.base.NCPopconfirm,i.base.NCIcon,i.base.NCTabs.NCTabPane;var p=i.high.PrintOutput,d="searcharea",f="pk_group",b="pk_payment",g="/nccloud/uapbd/sminfo/PaymentListQuery.do",h="/nccloud/uapbd/sminfo/PaymentDelete.do",m="/nccloud/uapbd/sminfo/PaymentPrint.do",y=(a=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var o=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.call(o),o.searchId=d,o.tableId=f,o.state={json:{},context:{nodeType:e.nodeType,pk_org:"",pk_org_v:"",org_Name:"",org_v_Name:"",mdid:"",title:"",PermissionOrgIDs:[]}},o}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,s.Component),r(t,[{key:"initTemplate",value:function(e){var t=this;e.createUIDom({pagecode:e.pagecode_list},function(o){if(o&&o.template){var a=o.template,n=o.context;t.state.context=Object.assign(t.state.context,n),a=t.modifierMeta(e,a),e.meta.setMeta(a,function(){if(o.button){var a=o.button;e.button.setButtonDisabled(["delete","printGrp","output"],!0),e.button.setButtons(a,function(){e.button.setPopContent("delline",t.state.json["10140PAYMG-000002"])})}var n=i.cacheTools.get("hasSearched"),r=i.cacheTools.get("searchParams");if("undefined"!==r&&r&&r.conditions||(r={conditions:[],logic:"and"},"org"===t.state.context.nodeType&&r.conditions.push({field:"pk_org",value:{firstvalue:t.state.context.pk_org,secondvalue:""},oprtype:"=",display:t.state.context.org_Name}),t.props.search.setSearchValue(d,r)),n&&1===n){r&&0!=r&&e.search.setSearchValue(d,r.conditions);var s=t.props.search.getQueryInfo(t.searchId).oid,l={querycondition:null==r?null:r,pageInfo:i.cacheTools.get("pageInfo")?i.cacheTools.get("pageInfo"):e.table.getTablePageInfo(f),pagecode:e.pagecode_list,queryAreaCode:d,oid:s,querytype:"tree",nodeType:e.nodeType};(0,i.ajax)({url:g,data:l,success:function(o){o.data?(e.table.setAllTableData(f,o.data[f]),setTimeout(function(){e.button.setButtonDisabled(["printGrp","output"],!1)},0)):(e.button.setButtonDisabled(["printGrp","output"],!0),(0,i.toast)({color:"warning",content:t.state.json["10140PAYMG-000026"]})),o.formulamsg&&o.formulamsg instanceof Array&&o.formulamsg.length>0&&e.dealFormulamsg(o.formulamsg,u({},f,"table")),t.setState(t.state)},error:function(e){console.log(e.message)}})}else if("group"==e.nodeType){var c=(0,i.getBusinessInfo)(),p=null==c?"pkGroup":c.groupId;e.search.setSearchValByField(d,"pk_org",{value:p,display:t.state.json["10140PAYMG-000019"]})}})}})}},{key:"modifierMeta",value:function(e,t){var o=this;return t[d].items=t[d].items.map(function(t,o){return t.col="3","pk_org"==t.attrcode&&(t.isMultiSelectedEnabled=!0,"org"==e.nodeType?t.queryCondition=function(){return{AppCode:"10140PAYMO",TreeRefActionExt:"nccloud.web.refer.sqlbuilder.PrimaryOrgWithGroupSQLBuilder"}}:t.queryCondition=function(){return{AppCode:"10140PAYMG",TreeRefActionExt:"nccloud.web.refer.sqlbuilder.PrimaryOrgWithGroupSQLBuilder"}}),t}),t[f].pagination=!0,t[f].items=t[f].items.map(function(t,o){return t.width=150,"code"==t.attrcode&&(t.render=function(t,o,a){return l.default.createElement("span",{style:{color:"#007ace",cursor:"pointer"},onClick:function(){var t=e.search.getAllSearchData(d);i.cacheTools.set("searchParams",t),i.cacheTools.set("preid",o[b].value),i.cacheTools.set("pageInfo",e.table.getTablePageInfo(f)),e.pushTo(e.cardUrl,{appcode:e.appcode,pagecode:e.pagecode_card,status:"browse",id:o[b].value})}},o&&o.code&&o.code.value)}),t}),t[f].items.push({attrcode:"opr",label:this.state.json["10140PAYMG-000001"],width:200,fixed:"right",className:"table-opr",visible:!0,itemtype:"customer",render:function(t,a,n){var r=[];return"GLOBLE00000000000000"==a.pk_org.value&&"global"==e.nodeType?r=["editline","delline"]:a.pk_org.value==a.pk_group.value&&"group"==e.nodeType?r=["editline","delline"]:a.pk_org.value!=a.pk_group.value&&"org"==e.nodeType&&(r=["editline","delline"]),e.button.createOprationButton(r,{area:"table-opr-area",buttonLimit:3,onButtonClick:function(e,r){return o.tableButtonClick(e,r,t,a,n)}})}}),t}},{key:"tableButtonClick",value:function(e,t,o,a,n){var r=this;switch(t){case"editline":this.valid(e,"edit",a,function(){e.pushTo(e.cardUrl,{appcode:e.appcode,pagecode:e.pagecode_card,status:"edit",id:a[b].value})});break;case"delline":this.valid(e,"delete",a,function(){(0,i.ajax)({url:h,data:{pk_org:i.cacheTools.get("pk_org"),deleteinfo:[{id:a[b].value,ts:a.ts.value}]},success:function(t){if(t.success){(0,i.toast)({color:"success",title:r.state.json["10140PAYMG-000020"]}),e.table.deleteTableRowsByIndex(f,n);var o=e.table.getAllTableData(f).rows;o&&o.length>0?e.button.setButtonDisabled(["printGrp","output"],!1):e.button.setButtonDisabled(["printGrp","output"],!0)}}})});break;default:console.log(t,n)}}},{key:"valid",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",o=arguments[2],a=arguments[3],n=[];if(o)n.push(o[b].value);else{var r=e.table.getCheckedRows(f);if(0===r.length)return void(0,i.toast)({content:this.state.json["10140PAYMG-000021"],color:"warning"});r.forEach(function(e,t){n.push(e.data.values[b].value)})}var s={pks:n,nodeType:e.nodeType,mdOperateCode:t};(0,i.ajax)({url:"/nccloud/uapbd/sminfo/PaymentValid.do",data:s,success:function(e){a&&a()}})}},{key:"componentDidMount",value:function(){var e=this;this.props.MultiInit.getMultiLang({moduleId:"10140PAYMG",domainName:"uapbd",callback:function(t,o,a){o&&e.setState({json:t,inlt:a},function(){e.initTemplate(e.props),"group"==e.props.nodeType?e.state.context.title=e.state.json["10140PAYMG-000000"]:e.state.context.title=e.state.json["10140PAYMG-000014"]})}}),this.props.button.setButtonsVisible({print:!1})}},{key:"buttonClick",value:function(e,t){var o=this;switch(t){case"add":e.pushTo(e.cardUrl,{appcode:e.appcode,pagecode:e.pagecode_card,status:"add"}),i.cacheTools.remove("preid");break;case"refresh":this.refreshAction(e);break;case"delete":this.valid(e,"delete",null,function(){(0,i.promptBox)({color:"warning",title:o.state.json["10140PAYMG-000015"],content:o.state.json["10140PAYMG-000016"],beSureBtnClick:o.deleteAction.bind(o)})});break;case"printGrp":case"print":this.onPrint();break;case"output":this.onOutput()}}},{key:"render",value:function(){var e=this.props,t=e.table,o=e.button,a=e.search,n=e.modal.createModal,r=(this.props.button.getButtons(),t.createSimpleTable),s=a.NCCreateSearch,i=o.createButtonApp;o.getButtons;return l.default.createElement("div",{className:"nc-bill-list"},l.default.createElement("div",{className:"nc-bill-header-area"},l.default.createElement("div",{className:"header-title-search-area"},l.default.createElement("h2",{className:"title-search-detail"},this.state.context.title)),l.default.createElement("div",{className:"header-button-area"},i({area:"header-button-area",buttonLimit:3,onButtonClick:this.buttonClick.bind(this),popContainer:document.querySelector(".header-button-area")}))),l.default.createElement("div",{className:"nc-bill-search-area"},s(this.searchId,{clickSearchBtn:this.clickSearchBtn.bind(this)})),l.default.createElement("div",{className:"nc-bill-table-area"},r(this.tableId,{handlePageInfoChange:this.pageInfoClick,tableModelConfirm:this.tableModelConfirm,dataSource:"uapbd.sminfo.payment.data",pkname:b,showIndex:!0,showCheck:!0,onRowDoubleClick:this.doubleClick.bind(this),onSelected:this.onSelected.bind(this),onSelectedAll:this.onSelected.bind(this)})),n("delete",{title:this.state.json["10140PAYMG-000015"],content:this.state.json["10140PAYMG-000016"],beSureBtnClick:this.deleteAction.bind(this)}),l.default.createElement(p,{ref:"printOutput",url:m,data:{appcode:this.props.appcode,funcode:this.props.printFunCode,nodekey:this.props.printNodeKey,oids:this.state.ids,outputType:"output"}}))}}]),t}(),n=function(){var e=this;this.onSelected=function(){var t=e.props.table.getCheckedRows(f);t&&t.length>0?e.props.button.setButtonDisabled(["delete"],!1):e.props.button.setButtonDisabled(["delete"],!0),e.setState(e.state)},this.onPrint=function(){var t=e.props.table.getAllTableData(f);if(0!==t.length){var o=[];t.rows.forEach(function(e,t){o.push(e.values[b].value)}),(0,i.print)("pdf",m,{appcode:e.props.printFunCode,funcode:e.props.printFunCode,nodekey:e.props.printNodeKey,oids:o})}else(0,i.toast)({content:e.state.json["10140PAYMG-000007"],color:"warning"})},this.onOutput=function(){var t=e.props.table.getAllTableData(f);if(0!==t.length){var o=[];t.rows.forEach(function(e,t){o.push(e.values[b].value)}),e.setState({ids:o},e.refs.printOutput.open())}else(0,i.toast)({content:e.state.json["10140PAYMG-000008"],color:"warning"})},this.doubleClick=function(t,o,a){console.log(e.state.json["10140PAYMG-000022"]),console.log(e);var n=e.props.search.getAllSearchData(d);i.cacheTools.set("searchParams",n),i.cacheTools.get("searchParams"),i.cacheTools.set("preid",e.props.getUrlParam("id")),e.props.pushTo(e.props.cardUrl,{appcode:e.props.appcode,pagecode:e.props.pagecode_card,status:"browse",id:t[b].value})},this.deleteAction=function(){var t=e.props.table.getCheckedRows(f),o={pk_org:i.cacheTools.get("pk_org"),deleteinfo:t.map(function(e){return{id:e.data.values[b].value,ts:e.data.values.ts.value}})};(0,i.ajax)({url:h,data:o,success:function(t){e.props.button.setButtonDisabled("delete",!0),(0,i.toast)({color:"success",content:e.state.json["10140PAYMG-000020"]}),e.refreshAction(e.props,!0)}})},this.refreshAction=function(t){var o=arguments.length>1&&void 0!==arguments[1]&&arguments[1],a=t.search.getAllSearchData(d);if(0!=a){var n=e.props.search.getQueryInfo(e.searchId).oid,r={querycondition:null==a?null:a,pageInfo:t.table.getTablePageInfo(f),pagecode:t.pagecode_list,queryAreaCode:d,oid:n,querytype:"tree",nodeType:t.nodeType};(0,i.ajax)({url:g,data:r,success:function(a){console.log(a),a.data?(t.table.setAllTableData(f,a.data[f]),t.button.setButtonDisabled(["printGrp","output"],!1)):(t.table.setAllTableData(f,{rows:[]}),t.button.setButtonDisabled(["printGrp","output"],!0)),a.formulamsg&&a.formulamsg instanceof Array&&a.formulamsg.length>0&&t.dealFormulamsg(a.formulamsg,u({},f,"table")),t.button.setButtonDisabled("delete",!0),o||(0,i.toast)({color:"success",title:e.state.json["10140PAYMG-000023"]})},error:function(e){console.log(e.message)}})}},this.pageInfoClick=function(t,o,a){t.table.getTablePageInfo(e.tableId),t.search.getAllSearchData(d);i.cacheTools.set("pageInfo",t.table.getTablePageInfo(f));var n={pk_org:i.cacheTools.get("pk_org"),allpks:a,pageid:t.pagecode_list,nodeType:t.nodeType};(0,i.ajax)({url:"/nccloud/uapbd/sminfo/PaymentQueryPageGridByPks.do",data:n,success:function(e){var o=e.success,a=e.data;o&&(a?t.table.setAllTableData(f,a[f]):t.table.setAllTableData(f,{rows:[]}))}})},this.clickSearchBtn=function(t,o){console.log(o),o.conditions.map(function(e){if("pk_org"==e.field){if("group"==t.nodeType&&"pkGroup"==e.value.firstvalue){var o=(0,i.getBusinessInfo)(),a=null==o?null:o.groupId;e.value.firstvalue=a}i.cacheTools.set("pk_org",e.value.firstvalue)}}),i.cacheTools.set("hasSearched",1),i.cacheTools.set("searchParams",o),i.cacheTools.set("pageInfo",t.table.getTablePageInfo(f));t.meta.getMeta();var a=e.props.search.getQueryInfo(e.searchId).oid,n={querycondition:null==o?null:o,pageInfo:t.table.getTablePageInfo(f),pagecode:t.pagecode_list,queryAreaCode:d,oid:a,querytype:"tree",nodeType:t.nodeType};(0,i.ajax)({url:g,data:n,success:function(o){console.log(o),o.data?(t.table.setAllTableData(e.tableId,o.data[f]),t.button.setButtonDisabled(["printGrp","output"],!1),(0,i.toast)({color:"success",content:e.state.json["10140PAYMG-000024"]+o.data[f].allpks.length+e.state.json["10140PAYMG-000025"]})):(t.table.setAllTableData(e.tableId,{rows:[]}),t.button.setButtonDisabled(["printGrp","output"],!0),(0,i.toast)({color:"warning",content:e.state.json["10140PAYMG-000026"]})),o.formulamsg&&o.formulamsg instanceof Array&&o.formulamsg.length>0&&t.dealFormulamsg(o.formulamsg,u({},f,"table")),e.setState(e.state)},error:function(e){console.log(e.message)}})}},a);y=(0,i.createPage)({billinfo:[{billtype:"grid",pagecode:"10140PAYMG_list",bodycode:f}],initTemplate:[],mutiLangCode:"10140PAYMG"})(y),t.default=y},2:function(e,o){e.exports=t},282:function(e,t,o){e.exports=o(193)},3:function(e,t){e.exports=o}})});
//# sourceMappingURL=index.883b2114.js.map