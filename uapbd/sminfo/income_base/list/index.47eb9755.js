!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("nc-lightapp-front"),require("react"),require("react-dom")):"function"==typeof define&&define.amd?define(["nc-lightapp-front","react","react-dom"],t):"object"==typeof exports?exports["uapbd/sminfo/income_base/list/index"]=t(require("nc-lightapp-front"),require("react"),require("react-dom")):e["uapbd/sminfo/income_base/list/index"]=t(e["nc-lightapp-front"],e.React,e.ReactDOM)}(window,function(e,t,o){return function(e){var t={};function o(a){if(t[a])return t[a].exports;var n=t[a]={i:a,l:!1,exports:{}};return e[a].call(n.exports,n,n.exports,o),n.l=!0,n.exports}return o.m=e,o.c=t,o.d=function(e,t,a){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(o.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)o.d(a,n,function(t){return e[t]}.bind(null,n));return a},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="../../../../",o(o.s=261)}({1:function(t,o){t.exports=e},148:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var a in o)Object.prototype.hasOwnProperty.call(o,a)&&(e[a]=o[a])}return e};t.default=function(e){return function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=arguments[2],l=0,s={},i=function(){2==l&&r&&r(s.templateData||{},s.langData||{},s.inlt||{})};o.callback&&console.log("咱们自己createUIDom会同时获取多语和单据模板,并通过一个回调函数返回, langCfg中的回调函数将被忽略");var c=a({},o,{callback:function(e,t,o){l+=1,t||(0,n.toast)({content:"load muti lang error",color:"warning"}),s.langData=e||{},s.inlt=o||{},i()}});e.MultiInit.getMultiLang(c),e.createUIDom(t,function(e){l+=1,s.templateData=e||{},i()})}};var n=o(1)},191:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a,n,r=function(){function e(e,t){for(var o=0;o<t.length;o++){var a=t[o];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,o,a){return o&&e(t.prototype,o),a&&e(t,a),t}}(),l=o(2),s=u(l),i=(u(o(3)),o(1)),c=u(o(148));function u(e){return e&&e.__esModule?e:{default:e}}i.base.NCPopconfirm,i.base.NCIcon,i.base.NCTabs.NCTabPane;var p=i.high.PrintOutput,d="searcharea",f="pk_group",b="code",g="pk_income",h="/nccloud/uapbd/sminfo/IncomeListQuery.do",m="/nccloud/uapbd/sminfo/IncomeDelete.do",v="/nccloud/uapbd/sminfo/IncomePrint.do",I="/nccloud/uapbd/sminfo/IncomeValid.do",y="GLOBLE00000000000000";function C(e,t){return t[d].items=t[d].items.map(function(t,o){return t.col="3","pk_org"==t.attrcode&&(t.isMultiSelectedEnabled=!0,"org"==e.nodeType?t.queryCondition=function(){return{AppCode:"10140INCMO",TreeRefActionExt:"nccloud.web.refer.sqlbuilder.PrimaryOrgWithGroupSQLBuilder"}}:t.queryCondition=function(){return{AppCode:"10140INCMG",TreeRefActionExt:"nccloud.web.refer.sqlbuilder.PrimaryOrgWithGroupSQLBuilder"}}),t}),t[f].pagination=!0,t[f].items=t[f].items.map(function(t,o){return t.width=150,t.attrcode==b&&(t.render=function(t,o,a){return s.default.createElement("span",{style:{color:"#007ace",cursor:"pointer"},onClick:function(){var t=e.search.getAllSearchData(d);i.cacheTools.set("searchParams",t),i.cacheTools.set("preid",o[g].value),i.cacheTools.set("pageInfo",e.table.getTablePageInfo(f)),e.pushTo(e.cardUrl,{appcode:e.appcode,pagecode:e.pagecode_card,status:"browse",id:o[g].value})}},o&&o[b]&&o[b].value)}),t}),t[f].items.push({attrcode:"opr",label:e.MutiInit.getIntl("10140INCMG")&&e.MutiInit.getIntl("10140INCMG").get("10140INCMG-000001"),width:200,itemtype:"customer",fixed:"right",className:"table-opr",visible:!0,render:function(t,o,a){var n=[];return o.pk_org.value==y&&"global"==e.nodeType?n=["editline","delline"]:o.pk_org.value==o.pk_group.value&&"group"==e.nodeType?n=["editline","delline"]:o.pk_org.value!=o.pk_group.value&&"org"==e.nodeType&&(n=["editline","delline"]),e.button.createOprationButton(n,{area:"table-opr-area",buttonLimit:3,onButtonClick:function(e,t){return function(e,t,o,a,n){switch(t){case"editline":T(e,a,function(){e.pushTo(e.cardUrl,{appcode:e.appcode,pagecode:e.pagecode_card,status:"edit",id:a[g].value})});break;case"delline":T(e,a,function(){(0,i.ajax)({url:m,data:{pk_org:i.cacheTools.get("pk_org"),deleteinfo:[{id:a[g].value,ts:a.ts.value}]},success:function(t){if(t.success){(0,i.toast)({color:"success",title:e.MutiInit.getIntl("10140INCMG")&&e.MutiInit.getIntl("10140INCMG").get("10140INCMG-000015")}),e.table.deleteTableRowsByIndex(f,n);var o=e.table.getAllTableData(f).rows,a=e.table.getCheckedRows(f);a&&a.length>0?e.button.setButtonDisabled(["delete"],!1):e.button.setButtonDisabled(["delete"],!0),o&&o.length>0?e.button.setButtonDisabled(["printGrp","output"],!1):e.button.setButtonDisabled(["printGrp","output"],!0)}}})});break;default:console.log(t,n)}}(e,t,0,o,a)}})}}),t}function T(e,t,o){var a=[];if(t)a.push(t[g].value);else{var n=e.table.getCheckedRows(f);if(0===n.length)return void(0,i.toast)({content:e.MutiInit.getIntl("10140INCMG")&&e.MutiInit.getIntl("10140INCMG").get("10140INCMG-000016"),color:"warning"});n.forEach(function(e,t){a.push(e.data.values[g].value)})}var r={pks:a,nodeType:e.nodeType};(0,i.ajax)({url:I,data:r,success:function(e){o&&o()}})}var k=(a=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var o=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.call(o),o.searchId=d,o.tableId=f,o.state={title:"",json:{}},o.initTemplate(e),o}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,l.Component),r(t,[{key:"componentDidMount",value:function(){this.props.button.setButtonsVisible({print:!1})}},{key:"buttonClick",value:function(e,t){var o=this;switch(t){case"add":e.pushTo(e.cardUrl,{appcode:e.appcode,pagecode:e.pagecode_card,status:"add"}),i.cacheTools.remove("preid");break;case"refresh":this.refreshAction(e);break;case"delete":T(e,null,function(){(0,i.promptBox)({color:"warning",title:o.state.json["10140INCMG-000012"],hasCloseBtn:!1,content:o.state.json["10140INCMG-000013"],beSureBtnClick:o.deleteAction.bind(o)})});break;case"printGrp":case"print":this.onPrint();break;case"output":this.onOutput()}}},{key:"render",value:function(){var e=this.props,t=e.table,o=e.button,a=e.search,n=e.modal.createModal,r=(this.props.button.getButtons(),t.createSimpleTable),l=a.NCCreateSearch,i=o.createButtonApp;o.getButtons;return s.default.createElement("div",{className:"nc-bill-list"},s.default.createElement("div",{className:"nc-bill-header-area"},s.default.createElement("div",{className:"header-title-search-area"},s.default.createElement("h2",{className:"title-search-detail"},this.state.title)),s.default.createElement("div",{className:"header-button-area"},i({area:"header-button-area",buttonLimit:3,onButtonClick:this.buttonClick.bind(this),popContainer:document.querySelector(".header-button-area")}))),s.default.createElement("div",{className:"nc-bill-search-area"},l(this.searchId,{clickSearchBtn:this.clickSearchBtn.bind(this)})),s.default.createElement("div",{className:"nc-bill-table-area"},r(this.tableId,{handlePageInfoChange:this.pageInfoClick,tableModelConfirm:this.tableModelConfirm,showIndex:!0,showCheck:!0,onRowDoubleClick:this.doubleClick.bind(this),onSelected:this.onSelected.bind(this),onSelectedAll:this.onSelected.bind(this)})),n("delete",{title:this.state.json["10140INCMG-000012"],content:this.state.json["10140INCMG-000013"],beSureBtnClick:this.deleteAction.bind(this)}),s.default.createElement(p,{ref:"printOutput",url:v,data:{appcode:this.props.appcode,funcode:this.props.printFunCode,nodekey:this.props.printNodeKey,oids:this.state.ids,outputType:"output"}}))}}]),t}(),n=function(){var e=this;this.initTemplate=function(t,o){var a=e;(0,c.default)(t)({pagecode:t.pagecode_list},{moduleId:"10140INCMG",domainName:"uapbd"},function(n,r){if(r&&(e.state.json=r,"group"==t.nodeType?a.state.title=e.state.json["10140INCMG-000000"]:a.state.title=e.state.json["10140INCMG-000025"]),n){if(n.button){var l=n.button;t.button.setButtons(l),t.button.setButtonDisabled(["delete"],!0),t.button.setPopContent("delline","确定要删除吗？")}if(n.template){var s=n.template;s=C(t,s),t.meta.setMeta(s);var c=i.cacheTools.get("hasSearched"),u=i.cacheTools.get("searchParams");if(c&&1===c){u&&0!=u&&t.search.setSearchValue(d,u.conditions);var p=e.props.search.getQueryInfo(e.searchId).oid,b={querycondition:u,custcondition:{},pagecode:t.pagecode_list,nodeType:t.nodeType,queryAreaCode:d,pageInfo:i.cacheTools.get("pageInfo")?i.cacheTools.get("pageInfo"):t.table.getTablePageInfo(f),querytype:"tree",oid:p};(0,i.ajax)({url:h,data:b,success:function(o){o.data?(t.table.setAllTableData(f,o.data[f]),t.button.setButtonDisabled(["printGrp","output"],!1)):(t.button.setButtonDisabled(["printGrp","output"],!0),(0,i.toast)({content:e.state.json["10140INCMG-000019"],color:"warning"}))},error:function(e){console.log(e.message)}})}else if("group"==t.nodeType){var g=(0,i.getBusinessInfo)(),m=null==g?"pkGroup":g.groupId;t.search.setSearchValByField(d,"pk_org",{value:m,display:e.state.json["10140INCMG-000020"]})}}o&&o()}})},this.onSelected=function(){var t=e.props.table.getCheckedRows(f);t&&t.length>0?e.props.button.setButtonDisabled(["delete"],!1):e.props.button.setButtonDisabled(["delete"],!0),e.setState(e.state)},this.onPrint=function(){var t=e.props.table.getAllTableData(f);if(0!==t.length){var o=[];t.rows.forEach(function(e,t){o.push(e.values[g].value)}),(0,i.print)("pdf",v,{appcode:e.props.appcode,funcode:e.props.printFunCode,nodekey:e.props.printNodeKey,oids:o},!1)}else(0,i.toast)({content:e.state.json["10140INCMG-000006"],color:"warning"})},this.onOutput=function(){var t=e.props.table.getAllTableData(f);if(0!==t.length){var o=[];t.rows.forEach(function(e,t){o.push(e.values[g].value)}),e.setState({ids:o},e.refs.printOutput.open())}else(0,i.toast)({content:e.state.json["10140INCMG-000007"],color:"warning"})},this.doubleClick=function(t,o,a){console.log(e.state.json["10140INCMG-000021"]),console.log(e);var n=e.props.search.getAllSearchData(d);i.cacheTools.set("searchParams",n),i.cacheTools.get("searchParams"),i.cacheTools.set("preid",e.props.getUrlParam("id")),e.props.pushTo(e.props.cardUrl,{appcode:e.props.appcode,pagecode:e.props.pagecode_card,status:"browse",id:t[g].value})},this.deleteAction=function(){var t=e.props.table.getCheckedRows(f),o=e,a={pk_org:i.cacheTools.get("pk_org"),deleteinfo:t.map(function(e){return{id:e.data.values[g].value,ts:e.data.values.ts.value}})};console.log(a),(0,i.ajax)({url:m,data:a,success:function(e){(0,i.toast)({color:"success",title:o.state.json["10140INCMG-000015"]}),o.props.button.setButtonDisabled(["delete"],!0),o.refreshAction(o.props)}})},this.refreshAction=function(t){var o=t.search.getAllSearchData(d);if(console.log(o),0!=o){var a=e.props.search.getQueryInfo(e.searchId).oid,n={querycondition:o,custcondition:{},pagecode:t.pagecode_list,nodeType:t.nodeType,queryAreaCode:d,pageInfo:t.table.getTablePageInfo(f),querytype:"tree",oid:a};(0,i.ajax)({url:h,data:n,success:function(o){console.log(o),o.data?(t.table.setAllTableData(f,o.data[f]),(0,i.toast)({title:e.state.json["10140INCMG-000010"],color:"success"})):(t.table.setAllTableData(f,{rows:[]}),(0,i.toast)({title:e.state.json["10140INCMG-000010"],color:"success"})),o.formulamsg&&o.formulamsg instanceof Array&&o.formulamsg.length>0&&t.dealFormulamsg(o.formulamsg,function(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}({},f,"table")),t.button.setButtonDisabled(["delete"],!0)},error:function(e){console.log(e.message)}})}},this.pageInfoClick=function(t,o,a){t.table.getTablePageInfo(e.tableId),t.search.getAllSearchData(d);i.cacheTools.set("pageInfo",t.table.getTablePageInfo(f));var n={pk_org:i.cacheTools.get("pk_org"),allpks:a,pageid:t.pagecode_list};(0,i.ajax)({url:"/nccloud/uapbd/sminfo/IncomeQueryPageGridByPks.do",data:n,success:function(e){var o=e.success,a=e.data;o&&(a?t.table.setAllTableData(f,a[f]):t.table.setAllTableData(f,{rows:[]}))}})},this.clickSearchBtn=function(t,o){console.log(o),o.conditions.map(function(e){if("pk_org"==e.field){if("group"==t.nodeType&&"pkGroup"==e.value.firstvalue){var o=(0,i.getBusinessInfo)(),a=null==o?null:o.groupId;e.value.firstvalue=a}i.cacheTools.set("pk_org",e.value.firstvalue)}}),i.cacheTools.set("hasSearched",1),i.cacheTools.set("searchParams",o),i.cacheTools.set("pageInfo",t.table.getTablePageInfo(f));t.meta.getMeta();var a=e.props.search.getQueryInfo(e.searchId).oid,n={querycondition:o,custcondition:{},pagecode:t.pagecode_list,nodeType:t.nodeType,queryAreaCode:d,pageInfo:t.table.getTablePageInfo(f),querytype:"tree",oid:a};(0,i.ajax)({url:h,data:n,success:function(o){console.log(o),o.data?(t.table.setAllTableData(e.tableId,o.data[f]),t.button.setButtonDisabled(["printGrp","output"],!1),(0,i.toast)({content:e.state.json["10140INCMG-000022"]+o.data[f].rows.length+e.state.json["10140INCMG-000023"],color:"success"})):(t.table.setAllTableData(e.tableId,{rows:[]}),t.button.setButtonDisabled(["printGrp","output"],!0),(0,i.toast)({content:e.state.json["10140INCMG-000024"],color:"warning"}))},error:function(e){console.log(e.message)}})}},a);k=(0,i.createPage)({billinfo:[{billtype:"grid",pagecode:"10140INCMG_incomelist",headcode:f}],initTemplate:[],mutiLangCode:"10140INCMG"})(k),t.default=k},2:function(e,o){e.exports=t},261:function(e,t,o){e.exports=o(191)},3:function(e,t){e.exports=o}})});
//# sourceMappingURL=index.47eb9755.js.map