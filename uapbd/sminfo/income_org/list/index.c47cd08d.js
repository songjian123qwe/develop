!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("nc-lightapp-front"),require("react"),require("react-dom")):"function"==typeof define&&define.amd?define(["nc-lightapp-front","react","react-dom"],t):"object"==typeof exports?exports["uapbd/sminfo/income_org/list/index"]=t(require("nc-lightapp-front"),require("react"),require("react-dom")):e["uapbd/sminfo/income_org/list/index"]=t(e["nc-lightapp-front"],e.React,e.ReactDOM)}(window,function(e,t,o){return function(e){var t={};function o(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,o),a.l=!0,a.exports}return o.m=e,o.c=t,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)o.d(n,a,function(t){return e[t]}.bind(null,a));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="../../../../",o(o.s=268)}({1:function(t,o){t.exports=e},148:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(e[n]=o[n])}return e};t.default=function(e){return function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=arguments[2],l=0,s={},i=function(){2==l&&r&&r(s.templateData||{},s.langData||{},s.inlt||{})};o.callback&&console.log("咱们自己createUIDom会同时获取多语和单据模板,并通过一个回调函数返回, langCfg中的回调函数将被忽略");var c=n({},o,{callback:function(e,t,o){l+=1,t||(0,a.toast)({content:"load muti lang error",color:"warning"}),s.langData=e||{},s.inlt=o||{},i()}});e.MultiInit.getMultiLang(c),e.createUIDom(t,function(e){l+=1,s.templateData=e||{},i()})}};var a=o(1)},191:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n,a,r=function(){function e(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,o,n){return o&&e(t.prototype,o),n&&e(t,n),t}}(),l=o(2),s=u(l),i=(u(o(3)),o(1)),c=u(o(148));function u(e){return e&&e.__esModule?e:{default:e}}i.base.NCPopconfirm,i.base.NCIcon,i.base.NCTabs.NCTabPane;var p=i.high.PrintOutput,d="searcharea",f="pk_group",b="code",g="pk_income",h="/nccloud/uapbd/sminfo/IncomeListQuery.do",m="/nccloud/uapbd/sminfo/IncomeDelete.do",v="/nccloud/uapbd/sminfo/IncomePrint.do",y="/nccloud/uapbd/sminfo/IncomeValid.do",I="GLOBLE00000000000000";function C(e,t){return t[d].items=t[d].items.map(function(t,o){return t.col="3","pk_org"==t.attrcode&&(t.isMultiSelectedEnabled=!0,"org"==e.nodeType?t.queryCondition=function(){return{AppCode:"10140INCMO",TreeRefActionExt:"nccloud.web.refer.sqlbuilder.PrimaryOrgWithGroupSQLBuilder"}}:t.queryCondition=function(){return{AppCode:"10140INCMG",TreeRefActionExt:"nccloud.web.refer.sqlbuilder.PrimaryOrgWithGroupSQLBuilder"}}),t}),t[f].pagination=!0,t[f].items=t[f].items.map(function(t,o){return t.width=150,t.attrcode==b&&(t.render=function(t,o,n){return s.default.createElement("span",{style:{color:"#007ace",cursor:"pointer"},onClick:function(){var t=e.search.getAllSearchData(d);i.cacheTools.set("searchParams",t),i.cacheTools.set("preid",o[g].value),i.cacheTools.set("pageInfo",e.table.getTablePageInfo(f)),e.pushTo(e.cardUrl,{appcode:e.appcode,pagecode:e.pagecode_card,status:"browse",id:o[g].value})}},o&&o[b]&&o[b].value)}),t}),t[f].items.push({attrcode:"opr",label:e.MutiInit.getIntl("10140INCMG")&&e.MutiInit.getIntl("10140INCMG").get("10140INCMG-000001"),width:200,itemtype:"customer",fixed:"right",className:"table-opr",visible:!0,render:function(t,o,n){var a=[];return o.pk_org.value==I&&"global"==e.nodeType?a=["editline","delline"]:o.pk_org.value==o.pk_group.value&&"group"==e.nodeType?a=["editline","delline"]:o.pk_org.value!=o.pk_group.value&&"org"==e.nodeType&&(a=["editline","delline"]),e.button.createOprationButton(a,{area:"table-opr-area",buttonLimit:3,onButtonClick:function(e,t){return function(e,t,o,n,a){switch(t){case"editline":T(e,n,function(){e.pushTo(e.cardUrl,{appcode:e.appcode,pagecode:e.pagecode_card,status:"edit",id:n[g].value})});break;case"delline":T(e,n,function(){(0,i.ajax)({url:m,data:{pk_org:i.cacheTools.get("pk_org"),deleteinfo:[{id:n[g].value,ts:n.ts.value}]},success:function(t){if(t.success){(0,i.toast)({color:"success",title:e.MutiInit.getIntl("10140INCMG")&&e.MutiInit.getIntl("10140INCMG").get("10140INCMG-000015")}),e.table.deleteTableRowsByIndex(f,a);var o=e.table.getAllTableData(f).rows,n=e.table.getCheckedRows(f);n&&n.length>0?e.button.setButtonDisabled(["delete"],!1):e.button.setButtonDisabled(["delete"],!0),o&&o.length>0?e.button.setButtonDisabled(["printGrp","output"],!1):e.button.setButtonDisabled(["printGrp","output"],!0)}}})});break;default:console.log(t,a)}}(e,t,0,o,n)}})}}),t}function T(e,t,o){var n=[];if(t)n.push(t[g].value);else{var a=e.table.getCheckedRows(f);if(0===a.length)return void(0,i.toast)({content:e.MutiInit.getIntl("10140INCMG")&&e.MutiInit.getIntl("10140INCMG").get("10140INCMG-000016"),color:"warning"});a.forEach(function(e,t){n.push(e.data.values[g].value)})}var r={pks:n,nodeType:e.nodeType};(0,i.ajax)({url:y,data:r,success:function(e){o&&o()}})}var _=(n=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var o=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.call(o),o.searchId=d,o.tableId=f,o.state={title:"",json:{}},o.initTemplate(e),o}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,l.Component),r(t,[{key:"componentDidMount",value:function(){this.props.button.setButtonsVisible({print:!1})}},{key:"buttonClick",value:function(e,t){var o=this;switch(t){case"add":e.pushTo(e.cardUrl,{appcode:e.appcode,pagecode:e.pagecode_card,status:"add"}),i.cacheTools.remove("preid");break;case"refresh":this.refreshAction(e);break;case"delete":T(e,null,function(){(0,i.promptBox)({color:"warning",title:o.state.json["10140INCMG-000012"],hasCloseBtn:!1,content:o.state.json["10140INCMG-000013"],beSureBtnClick:o.deleteAction.bind(o)})});break;case"printGrp":case"print":this.onPrint();break;case"output":this.onOutput()}}},{key:"render",value:function(){var e=this.props,t=e.table,o=e.button,n=e.search,a=e.modal.createModal,r=(this.props.button.getButtons(),t.createSimpleTable),l=n.NCCreateSearch,i=o.createButtonApp;o.getButtons;return s.default.createElement("div",{className:"nc-bill-list"},s.default.createElement("div",{className:"nc-bill-header-area"},s.default.createElement("div",{className:"header-title-search-area"},s.default.createElement("h2",{className:"title-search-detail"},this.state.title)),s.default.createElement("div",{className:"header-button-area"},i({area:"header-button-area",buttonLimit:3,onButtonClick:this.buttonClick.bind(this),popContainer:document.querySelector(".header-button-area")}))),s.default.createElement("div",{className:"nc-bill-search-area"},l(this.searchId,{clickSearchBtn:this.clickSearchBtn.bind(this)})),s.default.createElement("div",{className:"nc-bill-table-area"},r(this.tableId,{handlePageInfoChange:this.pageInfoClick,tableModelConfirm:this.tableModelConfirm,showIndex:!0,showCheck:!0,onRowDoubleClick:this.doubleClick.bind(this),onSelected:this.onSelected.bind(this),onSelectedAll:this.onSelected.bind(this)})),a("delete",{title:this.state.json["10140INCMG-000012"],content:this.state.json["10140INCMG-000013"],beSureBtnClick:this.deleteAction.bind(this)}),s.default.createElement(p,{ref:"printOutput",url:v,data:{appcode:this.props.appcode,funcode:this.props.printFunCode,nodekey:this.props.printNodeKey,oids:this.state.ids,outputType:"output"}}))}}]),t}(),a=function(){var e=this;this.initTemplate=function(t,o){var n=e;(0,c.default)(t)({pagecode:t.pagecode_list},{moduleId:"10140INCMG",domainName:"uapbd"},function(a,r){if(r&&(e.state.json=r,"group"==t.nodeType?n.state.title=e.state.json["10140INCMG-000000"]:n.state.title=e.state.json["10140INCMG-000025"]),a){if(a.button){var l=a.button;t.button.setButtons(l),t.button.setButtonDisabled(["delete"],!0),t.button.setPopContent("delline","确定要删除吗？")}if(a.template){var s=a.template;s=C(t,s),t.meta.setMeta(s);var c=i.cacheTools.get("hasSearched"),u=i.cacheTools.get("searchParams");if(c&&1===c){u&&0!=u&&t.search.setSearchValue(d,u.conditions);var p=e.props.search.getQueryInfo(e.searchId).oid,b={querycondition:u,custcondition:{},pagecode:t.pagecode_list,nodeType:t.nodeType,queryAreaCode:d,pageInfo:i.cacheTools.get("pageInfo")?i.cacheTools.get("pageInfo"):t.table.getTablePageInfo(f),querytype:"tree",oid:p};(0,i.ajax)({url:h,data:b,success:function(o){o.data?(t.table.setAllTableData(f,o.data[f]),t.button.setButtonDisabled(["printGrp","output"],!1)):(t.button.setButtonDisabled(["printGrp","output"],!0),(0,i.toast)({content:e.state.json["10140INCMG-000019"],color:"warning"}))},error:function(e){console.log(e.message)}})}else if("group"==t.nodeType){var g=(0,i.getBusinessInfo)(),m=null==g?"pkGroup":g.groupId;t.search.setSearchValByField(d,"pk_org",{value:m,display:e.state.json["10140INCMG-000020"]})}}o&&o()}})},this.onSelected=function(){var t=e.props.table.getCheckedRows(f);t&&t.length>0?e.props.button.setButtonDisabled(["delete"],!1):e.props.button.setButtonDisabled(["delete"],!0),e.setState(e.state)},this.onPrint=function(){var t=e.props.table.getAllTableData(f);if(0!==t.length){var o=[];t.rows.forEach(function(e,t){o.push(e.values[g].value)}),(0,i.print)("pdf",v,{appcode:e.props.appcode,funcode:e.props.printFunCode,nodekey:e.props.printNodeKey,oids:o},!1)}else(0,i.toast)({content:e.state.json["10140INCMG-000006"],color:"warning"})},this.onOutput=function(){var t=e.props.table.getAllTableData(f);if(0!==t.length){var o=[];t.rows.forEach(function(e,t){o.push(e.values[g].value)}),e.setState({ids:o},e.refs.printOutput.open())}else(0,i.toast)({content:e.state.json["10140INCMG-000007"],color:"warning"})},this.doubleClick=function(t,o,n){console.log(e.state.json["10140INCMG-000021"]),console.log(e);var a=e.props.search.getAllSearchData(d);i.cacheTools.set("searchParams",a),i.cacheTools.get("searchParams"),i.cacheTools.set("preid",e.props.getUrlParam("id")),e.props.pushTo(e.props.cardUrl,{appcode:e.props.appcode,pagecode:e.props.pagecode_card,status:"browse",id:t[g].value})},this.deleteAction=function(){var t=e.props.table.getCheckedRows(f),o=e,n={pk_org:i.cacheTools.get("pk_org"),deleteinfo:t.map(function(e){return{id:e.data.values[g].value,ts:e.data.values.ts.value}})};console.log(n),(0,i.ajax)({url:m,data:n,success:function(e){(0,i.toast)({color:"success",title:o.state.json["10140INCMG-000015"]}),o.props.button.setButtonDisabled(["delete"],!0),o.refreshAction(o.props)}})},this.refreshAction=function(t){var o=t.search.getAllSearchData(d);if(console.log(o),0!=o){var n=e.props.search.getQueryInfo(e.searchId).oid,a={querycondition:o,custcondition:{},pagecode:t.pagecode_list,nodeType:t.nodeType,queryAreaCode:d,pageInfo:t.table.getTablePageInfo(f),querytype:"tree",oid:n};(0,i.ajax)({url:h,data:a,success:function(o){console.log(o),o.data?(t.table.setAllTableData(f,o.data[f]),(0,i.toast)({title:e.state.json["10140INCMG-000010"],color:"success"})):(t.table.setAllTableData(f,{rows:[]}),(0,i.toast)({title:e.state.json["10140INCMG-000010"],color:"success"})),o.formulamsg&&o.formulamsg instanceof Array&&o.formulamsg.length>0&&t.dealFormulamsg(o.formulamsg,function(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}({},f,"table")),t.button.setButtonDisabled(["delete"],!0)},error:function(e){console.log(e.message)}})}},this.pageInfoClick=function(t,o,n){t.table.getTablePageInfo(e.tableId),t.search.getAllSearchData(d);i.cacheTools.set("pageInfo",t.table.getTablePageInfo(f));var a={pk_org:i.cacheTools.get("pk_org"),allpks:n,pageid:t.pagecode_list};(0,i.ajax)({url:"/nccloud/uapbd/sminfo/IncomeQueryPageGridByPks.do",data:a,success:function(e){var o=e.success,n=e.data;o&&(n?t.table.setAllTableData(f,n[f]):t.table.setAllTableData(f,{rows:[]}))}})},this.clickSearchBtn=function(t,o){console.log(o),o.conditions.map(function(e){if("pk_org"==e.field){if("group"==t.nodeType&&"pkGroup"==e.value.firstvalue){var o=(0,i.getBusinessInfo)(),n=null==o?null:o.groupId;e.value.firstvalue=n}i.cacheTools.set("pk_org",e.value.firstvalue)}}),i.cacheTools.set("hasSearched",1),i.cacheTools.set("searchParams",o),i.cacheTools.set("pageInfo",t.table.getTablePageInfo(f));t.meta.getMeta();var n=e.props.search.getQueryInfo(e.searchId).oid,a={querycondition:o,custcondition:{},pagecode:t.pagecode_list,nodeType:t.nodeType,queryAreaCode:d,pageInfo:t.table.getTablePageInfo(f),querytype:"tree",oid:n};(0,i.ajax)({url:h,data:a,success:function(o){console.log(o),o.data?(t.table.setAllTableData(e.tableId,o.data[f]),t.button.setButtonDisabled(["printGrp","output"],!1),(0,i.toast)({content:e.state.json["10140INCMG-000022"]+o.data[f].rows.length+e.state.json["10140INCMG-000023"],color:"success"})):(t.table.setAllTableData(e.tableId,{rows:[]}),t.button.setButtonDisabled(["printGrp","output"],!0),(0,i.toast)({content:e.state.json["10140INCMG-000024"],color:"warning"}))},error:function(e){console.log(e.message)}})}},n);_=(0,i.createPage)({billinfo:[{billtype:"grid",pagecode:"10140INCMG_incomelist",headcode:f}],initTemplate:[],mutiLangCode:"10140INCMG"})(_),t.default=_},2:function(e,o){e.exports=t},217:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,o,n){return o&&e(t.prototype,o),n&&e(t,n),t}}(),a=o(2),r=s(a),l=(s(o(3)),s(o(191)));function s(e){return e&&e.__esModule?e:{default:e}}var i={nodeName:"收款协议-业务单元",nodeType:"org",pagecode_list:"10140INCMG_incomelist",pagecode_card:"10140INCMG_incomecard",appcode:"10140INCMO",appid:"0001Z010000000001PR5",printFunCode:"10140INCMG",printNodeKey:"incomelist",listUrl:"/list",cardUrl:"/card"},c=function(e){function t(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,a.Component),n(t,[{key:"render",value:function(){return r.default.createElement("div",null,r.default.createElement(l.default,i))}}]),t}();t.default=c},268:function(e,t,o){e.exports=o(217)},3:function(e,t){e.exports=o}})});
//# sourceMappingURL=index.c47cd08d.js.map