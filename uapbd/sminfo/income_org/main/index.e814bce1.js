!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("nc-lightapp-front"),require("react"),require("react-dom")):"function"==typeof define&&define.amd?define(["nc-lightapp-front","react","react-dom"],t):"object"==typeof exports?exports["uapbd/sminfo/income_org/main/index"]=t(require("nc-lightapp-front"),require("react"),require("react-dom")):e["uapbd/sminfo/income_org/main/index"]=t(e["nc-lightapp-front"],e.React,e.ReactDOM)}(window,function(e,t,a){return function(e){var t={};function a(o){if(t[o])return t[o].exports;var n=t[o]={i:o,l:!1,exports:{}};return e[o].call(n.exports,n,n.exports,a),n.l=!0,n.exports}return a.m=e,a.c=t,a.d=function(e,t,o){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(a.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)a.d(o,n,function(t){return e[t]}.bind(null,n));return o},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="../../../../",a(a.s=269)}({1:function(t,a){t.exports=e},148:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var o in a)Object.prototype.hasOwnProperty.call(a,o)&&(e[o]=a[o])}return e};t.default=function(e){return function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=arguments[2],l=0,s={},i=function(){2==l&&r&&r(s.templateData||{},s.langData||{},s.inlt||{})};a.callback&&console.log("咱们自己createUIDom会同时获取多语和单据模板,并通过一个回调函数返回, langCfg中的回调函数将被忽略");var c=o({},a,{callback:function(e,t,a){l+=1,t||(0,n.toast)({content:"load muti lang error",color:"warning"}),s.langData=e||{},s.inlt=a||{},i()}});e.MultiInit.getMultiLang(c),e.createUIDom(t,function(e){l+=1,s.templateData=e||{},i()})}};var n=a(1)},190:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o,n,r=function(){function e(e,t){for(var a=0;a<t.length;a++){var o=t[a];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,a,o){return a&&e(t.prototype,a),o&&e(t,o),t}}(),l=a(2),s=d(l),i=(d(a(3)),a(1)),c=d(a(148));function d(e){return e&&e.__esModule?e:{default:e}}function u(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var p=i.base.NCAffix,f=(i.base.NCPopconfirm,i.base.NCFormControl,i.base.NCBackBtn),b=i.high.PrintOutput,m="income",g="incomech",h="/nccloud/uapbd/sminfo/IncomeCardQuery.do",v="/nccloud/uapbd/sminfo/PaymentLoginUserInfoQuery.do",y="/nccloud/uapbd/sminfo/IncomePrint.do",I=function(e){return"browse"===e.getUrlParam("status")?["detail"]:["insertline","delline"]};function C(e,t){var a=e.getUrlParam("status");t[m].status=a,t[g].status=a,t[m].items.map(function(t){"pk_org"==t.attrcode&&("group"==e.nodeType?t.disabled="false":t.queryCondition=function(){return{AppCode:"10140INCMO",TreeRefActionExt:"nccloud.web.refer.sqlbuilder.PrimaryOrgSQLBuilder"}})});var o={attrcode:"opr",label:e.MutiInit.getIntl("10140INCMG")&&e.MutiInit.getIntl("10140INCMG").get("10140INCMG-000001"),visible:!0,className:"table-opr",width:"200px",itemtype:"customer",fixed:"right",render:function(t,a,o){var n=I(e);return e.button.createOprationButton(n,{area:"table-opr-area",buttonLimit:3,onButtonClick:function(e,t){return function(e,t,a,o,n){var r=e.cardTable.getVisibleRows(g,!1),l={};switch(t){case"insertline":r.forEach(function(t){t.values.showorder.value>=o.values.showorder.value&&(l=(parseInt(t.values.showorder.value)+1).toString(),e.cardTable.setValByKeyAndRowId(g,t.rowid,"showorder",{value:l}))}),e.cardTable.addRow(g,n,{showorder:{display:"",value:n+1+""}},!1);break;case"delline":r.forEach(function(t){t.values.showorder.value>=o.values.showorder.value&&(l=(parseInt(t.values.showorder.value)-1).toString(),e.cardTable.setValByKeyAndRowId(g,t.rowid,"showorder",{value:l}))}),e.cardTable.delRowsByIndex(g,n);break;case"detail":e.cardTable.toggleRowView(g,o);break;case"spread":e.cardTable.openModel(g,"edit",o,n);break;default:console.log(t,n)}}(e,t,0,a,o)}})}};return t[g].items.push(o),t}function _(e){var t=e.getUrlParam("status");"add"==t?(e.cardTable.showColByKey(g,"opr"),e.button.setButtonVisible(["edit","add","back","delete","refresh","spread","printGrp","print","output"],!1),e.button.setButtonVisible(["save","saveAdd","cancel","addline","insertline","delline","detail"],!0),e.button.setButtonDisabled("saveAdd",!1),e.cardPagination.setCardPaginationVisible("cardPaginationBtn",!1)):"edit"==t?(e.cardTable.showColByKey(g,"opr"),e.button.setButtonVisible(["edit","add","back","delete","refresh","spread","printGrp","print","output"],!1),e.button.setButtonVisible(["save","saveAdd","cancel","addline","insertline","delline","detail"],!0),e.button.setButtonDisabled("saveAdd",!0),e.cardPagination.setCardPaginationVisible("cardPaginationBtn",!1)):(e.cardTable.hideColByKey(g,"opr"),e.button.setButtonVisible(["save","saveAdd","cancel","addline","insertline","delline","detail","print","back"],!1),e.button.setButtonVisible(["add","edit","delete","refresh","spread","printGrp","output"],!0),e.cardPagination.setCardPaginationVisible("cardPaginationBtn",!0)),e.form.setFormStatus(m,t),e.cardTable.setStatus(g,t)}var T=(o=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var a=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.call(a),a.formId=m,a.tableId=g,a.state={pk_org:"",json:{},title:"",title_code:"",totalcount:0,applycount:0},a.initTemplate(e),a}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,l.Component),r(t,[{key:"componentDidMount",value:function(){if("add"!=this.props.getUrlParam("status")){var e=this.props.getUrlParam("id");e&&"undefined"!=e&&this.getdata(e)}else this.setDefaultValue()}},{key:"componentDidUpdate",value:function(){var e=this.props.form.getFormStatus(m);window.onbeforeunload="add"!=e&&"edit"!=e?null:function(){return""}}},{key:"componentWillReceiveProps",value:function(){}},{key:"onReturnClick",value:function(){this.props.pushTo(this.props.listUrl,{pagecode:this.props.pagecode_list,appcode:this.props.appcode,status:"browse"})}},{key:"render",value:function(){var e=this.props,t=e.cardTable,a=e.form,o=e.button,n=e.modal,r=e.cardPagination.createCardPagination,l=(this.props.button.getButtons(),a.createForm),i=t.createCardTable,c=o.createButtonApp,d=n.createModal,u=this.props.getUrlParam("status");return s.default.createElement("div",{id:"nc-bill-card"},s.default.createElement("div",{className:"nc-bill-card"},s.default.createElement("div",{className:"nc-bill-top-area"},s.default.createElement(p,null,s.default.createElement("div",{className:"nc-bill-header-area"},s.default.createElement("div",null,"browse"==u?s.default.createElement(f,{onClick:this.onReturnClick.bind(this)}):""),s.default.createElement("div",{className:"header-title-search-area"},s.default.createElement("h2",{className:"title-search-detail"},this.state.title,"browse"==u?"："+this.state.title_code:"")),s.default.createElement("div",{className:"header-button-area"},c({area:"header-button-area",onButtonClick:this.buttonClick.bind(this)}),r({handlePageInfoChange:this.pageInfoClick.bind(this)})))),s.default.createElement("div",{className:"nc-bill-form-area"},l(this.formId,{onAfterEvent:this.afterEvent.bind(this)}))),s.default.createElement("div",{className:"nc-bill-bottom-area"},s.default.createElement("div",{className:"nc-bill-table-area"},i(this.tableId,{tableHead:this.getTableHead.bind(this),modelSave:this.modelSave.bind(this),showIndex:!0,onAfterEvent:this.tableAfterEvent.bind(this),onBeforeEvent:this.tableBeforeEvent.bind(this)})),d("delete",{title:this.state.json["10140INCMG-000012"],content:this.state.json["10140INCMG-000013"],beSureBtnClick:this.delConfirm.bind(this)}),d("modal",{title:this.state.json["10140INCMG-000002"],content:this.state.json["10140INCMG-000014"]}),s.default.createElement(b,{ref:"printOutput",url:y,data:{appcode:this.props.appcode,funcode:this.props.printFunCode,nodekey:this.props.printNodeKey,oids:this.state.ids,outputType:"output"}}))))}}]),t}(),n=function(){var e=this;this.initTemplate=function(t,a){var o=e;(0,c.default)(t)({pagecode:t.pagecode_card},{moduleId:"10140INCMG",domainName:"uapbd"},function(n,r){if(r&&(e.state.json=r,"group"==t.nodeType?o.state.title=e.state.json["10140INCMG-000000"]:o.state.title=e.state.json["10140INCMG-000025"]),n){if(n.template){var l=n.template;C(t,l),t.meta.setMeta(l)}if(n.button){var s=n.button;t.button.setButtons(s,function(){}),_(t)}a&&a()}})},this.setDefaultValue=function(){"group"==e.props.nodeType?(0,i.ajax)({url:v,success:function(t){e.props.form.setFormItemsValue(e.formId,{pk_org:{value:t.data.group.pk_group,display:t.data.group.name},effectdate:{value:t.data.effectDate,display:null}})}}):(0,i.ajax)({url:v,success:function(t){e.props.form.setFormItemsValue(e.formId,{effectdate:{value:t.data.effectDate,display:null}})}})},this.buttonClick=function(t,a){switch(a){case"add":e.add(t),t.setUrlParam({appcode:t.appcode,pagecode:t.pagecode_card,status:"add"}),_(e.props);break;case"edit":e.valid(t,function(){t.setUrlParam({appcode:t.appcode,pagecode:t.pagecode_card,status:"edit",id:t.getUrlParam("id")}),_(e.props)});break;case"delete":e.valid(t,function(){(0,i.promptBox)({title:e.state.json["10140INCMG-000002"],color:"warning",hasCloseBtn:!1,content:e.state.json["10140INCMG-000003"],beSureBtnClick:e.delConfirm.bind(e)})});break;case"back":t.pushTo(t.listUrl,{appcode:t.appcode,pagecode:t.pagecode_list,status:"browse"});break;case"save":e.saveClick("save");break;case"saveAdd":e.saveClick("saveAdd");break;case"cancel":(0,i.promptBox)({color:"warning",title:e.state.json["10140INCMG-000004"],hasCloseBtn:!1,content:e.state.json["10140INCMG-000005"],beSureBtnClick:function(){"add"===t.getUrlParam("status")&&(i.cacheTools.get("preid")?(t.form.cancel(e.formId),t.cardTable.resetTableData(e.tableId),t.setUrlParam({appcode:t.appcode,pagecode:t.pagecode_card,status:"browse",id:i.cacheTools.get("preid")}),_(e.props)):t.pushTo(t.listUrl,{appcode:t.appcode,pagecode:t.pagecode_list,status:"browse"})),"edit"===t.getUrlParam("status")&&(t.form.cancel(e.formId),t.cardTable.resetTableData(e.tableId),t.setUrlParam({appcode:t.appcode,pagecode:t.pagecode_card,status:"browse",id:t.getUrlParam("id")})),_(e.props)}});break;case"addline":var o=t.cardTable.getNumberOfRows(e.tableId);t.cardTable.addRow(e.tableId,o,{showorder:{display:"",value:o+1+""}},!1);break;case"refresh":t.setUrlParam({appcode:t.appcode,pagecode:t.pagecode_card,status:t.getUrlParam("status"),id:t.getUrlParam("id")}),_(e.props),e.getdata(t.getUrlParam("id"),!0);break;case"printGrp":case"print":e.onPrint();break;case"output":e.onOutput()}},this.valid=function(e,t){var a={pks:[e.form.getFormItemsValue(m,"pk_income").value],nodeType:e.nodeType};(0,i.ajax)({url:"/nccloud/uapbd/sminfo/IncomeValid.do",data:a,success:function(e){t&&t()}})},this.add=function(t){var a=(0,i.deepClone)(t.form.getFormItemsValue(e.formId,"pk_org"));t.form.EmptyAllFormValue(e.formId),t.cardTable.setTableData(e.tableId,{rows:[]}),t.setUrlParam({appcode:t.appcode,pagecode:t.pagecode_card,status:"add"});var o=(0,i.getBusinessInfo)().businessDate,n=(0,i.getBusinessInfo)().groupId,r=(0,i.getBusinessInfo)().groupName;"org"==t.nodeType&&a.value==n&&(a={value:"",display:""}),"group"==t.nodeType&&a!=n&&(a={value:n,display:r}),t.form.setFormItemsValue(e.formId,{pk_org:{value:a.value,display:a.display}}),t.form.setFormItemsValue(e.formId,{effectdate:{value:o,display:o}})},this.onPrint=function(){var t=e.props.form.getAllFormValue(m);if(0!==t.length){var a=[];t.rows.forEach(function(e,t){a.push(e.values.pk_income.value)}),(0,i.print)("pdf",y,{appcode:e.props.appcode,funcode:e.props.printFunCode,nodekey:e.props.printNodeKey,oids:a},!1)}else(0,i.toast)({content:e.state.json["10140INCMG-000006"],color:"warning"})},this.onOutput=function(){var t=e.props.form.getAllFormValue(m);if(0!==t.length){var a=[];t.rows.forEach(function(e,t){a.push(e.values.pk_income.value)}),e.setState({ids:a},e.refs.printOutput.open())}else(0,i.toast)({content:e.state.json["10140INCMG-000007"],color:"warning"})},this.pageInfoClick=function(e,t){var a={pk_org:i.cacheTools.get("pk_org"),pk:t,pageid:e.pagecode_card};(0,i.ajax)({url:h,data:a,success:function(a){a.data.head&&(e.form.setAllFormValue(u({},m,a.data.head[m])),e.setUrlParam(t)),a.data.body&&e.cardTable.setTableData(g,a.data.body[g])}})},this.afterEvent=function(e,t,a,o,n,r,l,s){},this.tableAfterEvent=function(t,a,o,n,r,l,s,i){"paymentday"==o&&n&&null!=n&&""!=n&&(t.cardTable.setValByKeyAndIndex(a,l,"accountday",{value:null,display:null}),t.cardTable.setValByKeyAndIndex(a,l,"checkdata",{value:null,display:null}),t.cardTable.setValByKeyAndIndex(a,l,"effectmonth",{value:null,display:null}),t.cardTable.setValByKeyAndIndex(a,l,"effectaddmonth",{value:null,display:null})),"checkdata"==o&&n&&null!=n&&""!=n&&(t.cardTable.setValByKeyAndIndex(a,l,"paymentday",{value:null,display:null}),r[0].newvalue.value!=r[0].oldvalue.value&&(t.cardTable.setValByKeyAndIndex(a,l,"accountday",{value:null,display:null}),t.cardTable.setValByKeyAndIndex(a,l,"effectmonth",{value:"0",display:e.state.json["10140INCMG-000008"]}),t.cardTable.setValByKeyAndIndex(a,l,"effectaddmonth",{value:"0",display:"0"})))},this.tableBeforeEvent=function(t,a,o,n,r,l,s,c,d){var u=t.getUrlParam("status"),p=t.meta.getMeta();if("browse"!=u&&["accountday","effectmonth","effectaddmonth"].includes(o)){var f=t.cardTable.getValByKeyAndIndex(a,r,"checkdata");if(!f||null==f.value||""==f.value)return(0,i.toast)({content:e.state.json["10140INCMG-000009"],color:"danger"}),!1}"pk_incomeperiod"==o&&(p[a].items.find(function(e){return"pk_incomeperiod"==e.attrcode}).queryCondition=function(){return{pk_org:t.form.getFormItemsValue("income","pk_org").value}});"pk_rate"==o&&(p[a].items.find(function(e){return"pk_rate"==e.attrcode}).queryCondition=function(){return{pk_org:t.form.getFormItemsValue("income","pk_org").value}});return t.meta.setMeta(p),!0},this.getdata=function(t,a){var o={pk:t,pk_org:i.cacheTools.get("pk_org")};(0,i.ajax)({url:h,data:o,success:function(t){if(t.data){if(t.data.head){e.props.form.setAllFormValue(u({},e.formId,t.data.head[e.formId]));var o=t.data.head[e.formId].rows[0].values.code.value;e.setState({title_code:o})}var n;if(t.data.body&&e.props.cardTable.setTableData(e.tableId,t.data.body[e.tableId]),t.formulamsg&&t.formulamsg instanceof Array&&t.formulamsg.length>0)props.dealFormulamsg(t.formulamsg,(u(n={},e.tableId,"table"),u(n,e.formId,"form"),n))}a&&(0,i.toast)({title:e.state.json["10140INCMG-000010"],color:"success"})}})},this.saveClick=function(t){if(e.props.form.isCheckNow(m)&&e.props.cardTable.checkTableRequired(g)){e.props.cardTable.filterEmptyRows(g,["accrate","pk_incomeperiod","pk_balatype"]);var a=e.props.createMasterChildData(e.props.pagecode_card,e.formId,e.tableId),o="/nccloud/uapbd/sminfo/IncomeSave.do";"edit"===e.props.getUrlParam("status")&&(o="/nccloud/uapbd/sminfo/IncomeUpdate.do"),e.props.validateToSave(a,function(){(0,i.ajax)({url:o,data:a,success:function(a){var o=null;a.success&&(a.data&&(a.data.head&&a.data.head[e.formId]&&(e.props.form.setAllFormValue(u({},e.formId,a.data.head[e.formId])),o=a.data.head[e.formId].rows[0].values.pk_income.value),a.data.body&&a.data.body[e.tableId]&&e.props.cardTable.setTableData(e.tableId,a.data.body[e.tableId])),(0,i.toast)({title:e.state.json["10140INCMG-000011"],color:"success"}),"save"==t?(e.getdata(o),e.props.setUrlParam({appcode:e.props.appcode,pagecode:e.props.pagecode_card,status:"browse",id:o})):(e.add(e.props),e.props.setUrlParam({appcode:e.props.appcode,pagecode:e.props.pagecode_card,status:"add"})),_(e.props))}})},u({},g,"cardTable"),"card")}},this.delConfirm=function(){(0,i.ajax)({url:"/nccloud/uapbd/sminfo/IncomeDelete.do",data:{pk_org:e.props.form.getFormItemsValue(e.formId,"pk_org").value,deleteinfo:[{id:e.props.getUrlParam("id"),ts:e.props.form.getFormItemsValue(e.formId,"ts").value}]},success:function(t){t&&e.props.pushTo(e.props.listUrl,{appcode:e.props.appcode,pagecode:e.props.pagecode_list,status:"browse"})}})},this.modelSave=function(t){t.cardTable.closeModel(e.tableId),e.saveClick()},this.getTableHead=function(){var t=e.props.button.createButtonApp;e.props.button.getButtons(),e.props.getUrlParam("status");return s.default.createElement("div",{className:"shoulder-definition-area"},s.default.createElement("div",{className:"definition-icons"},t({area:"definition-icons",onButtonClick:e.buttonClick.bind(e)}),e.props.cardTable.createBrowseIcons(e.tableId,{iconArr:["close","open","max","setCol"],maxDestAreaId:"nc-bill-card"})))}},o);T=(0,i.createPage)({billinfo:[{billtype:"card",pagecode:"10140INCMG_incomecard",headcode:m,bodycode:g}],initTemplate:[],mutiLangCode:"10140INCMG"})(T),t.default=T},191:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o,n,r=function(){function e(e,t){for(var a=0;a<t.length;a++){var o=t[a];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,a,o){return a&&e(t.prototype,a),o&&e(t,o),t}}(),l=a(2),s=d(l),i=(d(a(3)),a(1)),c=d(a(148));function d(e){return e&&e.__esModule?e:{default:e}}i.base.NCPopconfirm,i.base.NCIcon,i.base.NCTabs.NCTabPane;var u=i.high.PrintOutput,p="searcharea",f="pk_group",b="code",m="pk_income",g="/nccloud/uapbd/sminfo/IncomeListQuery.do",h="/nccloud/uapbd/sminfo/IncomeDelete.do",v="/nccloud/uapbd/sminfo/IncomePrint.do",y="/nccloud/uapbd/sminfo/IncomeValid.do",I="GLOBLE00000000000000";function C(e,t){return t[p].items=t[p].items.map(function(t,a){return t.col="3","pk_org"==t.attrcode&&(t.isMultiSelectedEnabled=!0,"org"==e.nodeType?t.queryCondition=function(){return{AppCode:"10140INCMO",TreeRefActionExt:"nccloud.web.refer.sqlbuilder.PrimaryOrgWithGroupSQLBuilder"}}:t.queryCondition=function(){return{AppCode:"10140INCMG",TreeRefActionExt:"nccloud.web.refer.sqlbuilder.PrimaryOrgWithGroupSQLBuilder"}}),t}),t[f].pagination=!0,t[f].items=t[f].items.map(function(t,a){return t.width=150,t.attrcode==b&&(t.render=function(t,a,o){return s.default.createElement("span",{style:{color:"#007ace",cursor:"pointer"},onClick:function(){var t=e.search.getAllSearchData(p);i.cacheTools.set("searchParams",t),i.cacheTools.set("preid",a[m].value),i.cacheTools.set("pageInfo",e.table.getTablePageInfo(f)),e.pushTo(e.cardUrl,{appcode:e.appcode,pagecode:e.pagecode_card,status:"browse",id:a[m].value})}},a&&a[b]&&a[b].value)}),t}),t[f].items.push({attrcode:"opr",label:e.MutiInit.getIntl("10140INCMG")&&e.MutiInit.getIntl("10140INCMG").get("10140INCMG-000001"),width:200,itemtype:"customer",fixed:"right",className:"table-opr",visible:!0,render:function(t,a,o){var n=[];return a.pk_org.value==I&&"global"==e.nodeType?n=["editline","delline"]:a.pk_org.value==a.pk_group.value&&"group"==e.nodeType?n=["editline","delline"]:a.pk_org.value!=a.pk_group.value&&"org"==e.nodeType&&(n=["editline","delline"]),e.button.createOprationButton(n,{area:"table-opr-area",buttonLimit:3,onButtonClick:function(e,t){return function(e,t,a,o,n){switch(t){case"editline":_(e,o,function(){e.pushTo(e.cardUrl,{appcode:e.appcode,pagecode:e.pagecode_card,status:"edit",id:o[m].value})});break;case"delline":_(e,o,function(){(0,i.ajax)({url:h,data:{pk_org:i.cacheTools.get("pk_org"),deleteinfo:[{id:o[m].value,ts:o.ts.value}]},success:function(t){if(t.success){(0,i.toast)({color:"success",title:e.MutiInit.getIntl("10140INCMG")&&e.MutiInit.getIntl("10140INCMG").get("10140INCMG-000015")}),e.table.deleteTableRowsByIndex(f,n);var a=e.table.getAllTableData(f).rows,o=e.table.getCheckedRows(f);o&&o.length>0?e.button.setButtonDisabled(["delete"],!1):e.button.setButtonDisabled(["delete"],!0),a&&a.length>0?e.button.setButtonDisabled(["printGrp","output"],!1):e.button.setButtonDisabled(["printGrp","output"],!0)}}})});break;default:console.log(t,n)}}(e,t,0,a,o)}})}}),t}function _(e,t,a){var o=[];if(t)o.push(t[m].value);else{var n=e.table.getCheckedRows(f);if(0===n.length)return void(0,i.toast)({content:e.MutiInit.getIntl("10140INCMG")&&e.MutiInit.getIntl("10140INCMG").get("10140INCMG-000016"),color:"warning"});n.forEach(function(e,t){o.push(e.data.values[m].value)})}var r={pks:o,nodeType:e.nodeType};(0,i.ajax)({url:y,data:r,success:function(e){a&&a()}})}var T=(o=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var a=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.call(a),a.searchId=p,a.tableId=f,a.state={title:"",json:{}},a.initTemplate(e),a}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,l.Component),r(t,[{key:"componentDidMount",value:function(){this.props.button.setButtonsVisible({print:!1})}},{key:"buttonClick",value:function(e,t){var a=this;switch(t){case"add":e.pushTo(e.cardUrl,{appcode:e.appcode,pagecode:e.pagecode_card,status:"add"}),i.cacheTools.remove("preid");break;case"refresh":this.refreshAction(e);break;case"delete":_(e,null,function(){(0,i.promptBox)({color:"warning",title:a.state.json["10140INCMG-000012"],hasCloseBtn:!1,content:a.state.json["10140INCMG-000013"],beSureBtnClick:a.deleteAction.bind(a)})});break;case"printGrp":case"print":this.onPrint();break;case"output":this.onOutput()}}},{key:"render",value:function(){var e=this.props,t=e.table,a=e.button,o=e.search,n=e.modal.createModal,r=(this.props.button.getButtons(),t.createSimpleTable),l=o.NCCreateSearch,i=a.createButtonApp;a.getButtons;return s.default.createElement("div",{className:"nc-bill-list"},s.default.createElement("div",{className:"nc-bill-header-area"},s.default.createElement("div",{className:"header-title-search-area"},s.default.createElement("h2",{className:"title-search-detail"},this.state.title)),s.default.createElement("div",{className:"header-button-area"},i({area:"header-button-area",buttonLimit:3,onButtonClick:this.buttonClick.bind(this),popContainer:document.querySelector(".header-button-area")}))),s.default.createElement("div",{className:"nc-bill-search-area"},l(this.searchId,{clickSearchBtn:this.clickSearchBtn.bind(this)})),s.default.createElement("div",{className:"nc-bill-table-area"},r(this.tableId,{handlePageInfoChange:this.pageInfoClick,tableModelConfirm:this.tableModelConfirm,showIndex:!0,showCheck:!0,onRowDoubleClick:this.doubleClick.bind(this),onSelected:this.onSelected.bind(this),onSelectedAll:this.onSelected.bind(this)})),n("delete",{title:this.state.json["10140INCMG-000012"],content:this.state.json["10140INCMG-000013"],beSureBtnClick:this.deleteAction.bind(this)}),s.default.createElement(u,{ref:"printOutput",url:v,data:{appcode:this.props.appcode,funcode:this.props.printFunCode,nodekey:this.props.printNodeKey,oids:this.state.ids,outputType:"output"}}))}}]),t}(),n=function(){var e=this;this.initTemplate=function(t,a){var o=e;(0,c.default)(t)({pagecode:t.pagecode_list},{moduleId:"10140INCMG",domainName:"uapbd"},function(n,r){if(r&&(e.state.json=r,"group"==t.nodeType?o.state.title=e.state.json["10140INCMG-000000"]:o.state.title=e.state.json["10140INCMG-000025"]),n){if(n.button){var l=n.button;t.button.setButtons(l),t.button.setButtonDisabled(["delete"],!0),t.button.setPopContent("delline","确定要删除吗？")}if(n.template){var s=n.template;s=C(t,s),t.meta.setMeta(s);var c=i.cacheTools.get("hasSearched"),d=i.cacheTools.get("searchParams");if(c&&1===c){d&&0!=d&&t.search.setSearchValue(p,d.conditions);var u=e.props.search.getQueryInfo(e.searchId).oid,b={querycondition:d,custcondition:{},pagecode:t.pagecode_list,nodeType:t.nodeType,queryAreaCode:p,pageInfo:i.cacheTools.get("pageInfo")?i.cacheTools.get("pageInfo"):t.table.getTablePageInfo(f),querytype:"tree",oid:u};(0,i.ajax)({url:g,data:b,success:function(a){a.data?(t.table.setAllTableData(f,a.data[f]),t.button.setButtonDisabled(["printGrp","output"],!1)):(t.button.setButtonDisabled(["printGrp","output"],!0),(0,i.toast)({content:e.state.json["10140INCMG-000019"],color:"warning"}))},error:function(e){console.log(e.message)}})}else if("group"==t.nodeType){var m=(0,i.getBusinessInfo)(),h=null==m?"pkGroup":m.groupId;t.search.setSearchValByField(p,"pk_org",{value:h,display:e.state.json["10140INCMG-000020"]})}}a&&a()}})},this.onSelected=function(){var t=e.props.table.getCheckedRows(f);t&&t.length>0?e.props.button.setButtonDisabled(["delete"],!1):e.props.button.setButtonDisabled(["delete"],!0),e.setState(e.state)},this.onPrint=function(){var t=e.props.table.getAllTableData(f);if(0!==t.length){var a=[];t.rows.forEach(function(e,t){a.push(e.values[m].value)}),(0,i.print)("pdf",v,{appcode:e.props.appcode,funcode:e.props.printFunCode,nodekey:e.props.printNodeKey,oids:a},!1)}else(0,i.toast)({content:e.state.json["10140INCMG-000006"],color:"warning"})},this.onOutput=function(){var t=e.props.table.getAllTableData(f);if(0!==t.length){var a=[];t.rows.forEach(function(e,t){a.push(e.values[m].value)}),e.setState({ids:a},e.refs.printOutput.open())}else(0,i.toast)({content:e.state.json["10140INCMG-000007"],color:"warning"})},this.doubleClick=function(t,a,o){console.log(e.state.json["10140INCMG-000021"]),console.log(e);var n=e.props.search.getAllSearchData(p);i.cacheTools.set("searchParams",n),i.cacheTools.get("searchParams"),i.cacheTools.set("preid",e.props.getUrlParam("id")),e.props.pushTo(e.props.cardUrl,{appcode:e.props.appcode,pagecode:e.props.pagecode_card,status:"browse",id:t[m].value})},this.deleteAction=function(){var t=e.props.table.getCheckedRows(f),a=e,o={pk_org:i.cacheTools.get("pk_org"),deleteinfo:t.map(function(e){return{id:e.data.values[m].value,ts:e.data.values.ts.value}})};console.log(o),(0,i.ajax)({url:h,data:o,success:function(e){(0,i.toast)({color:"success",title:a.state.json["10140INCMG-000015"]}),a.props.button.setButtonDisabled(["delete"],!0),a.refreshAction(a.props)}})},this.refreshAction=function(t){var a=t.search.getAllSearchData(p);if(console.log(a),0!=a){var o=e.props.search.getQueryInfo(e.searchId).oid,n={querycondition:a,custcondition:{},pagecode:t.pagecode_list,nodeType:t.nodeType,queryAreaCode:p,pageInfo:t.table.getTablePageInfo(f),querytype:"tree",oid:o};(0,i.ajax)({url:g,data:n,success:function(a){console.log(a),a.data?(t.table.setAllTableData(f,a.data[f]),(0,i.toast)({title:e.state.json["10140INCMG-000010"],color:"success"})):(t.table.setAllTableData(f,{rows:[]}),(0,i.toast)({title:e.state.json["10140INCMG-000010"],color:"success"})),a.formulamsg&&a.formulamsg instanceof Array&&a.formulamsg.length>0&&t.dealFormulamsg(a.formulamsg,function(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}({},f,"table")),t.button.setButtonDisabled(["delete"],!0)},error:function(e){console.log(e.message)}})}},this.pageInfoClick=function(t,a,o){t.table.getTablePageInfo(e.tableId),t.search.getAllSearchData(p);i.cacheTools.set("pageInfo",t.table.getTablePageInfo(f));var n={pk_org:i.cacheTools.get("pk_org"),allpks:o,pageid:t.pagecode_list};(0,i.ajax)({url:"/nccloud/uapbd/sminfo/IncomeQueryPageGridByPks.do",data:n,success:function(e){var a=e.success,o=e.data;a&&(o?t.table.setAllTableData(f,o[f]):t.table.setAllTableData(f,{rows:[]}))}})},this.clickSearchBtn=function(t,a){console.log(a),a.conditions.map(function(e){if("pk_org"==e.field){if("group"==t.nodeType&&"pkGroup"==e.value.firstvalue){var a=(0,i.getBusinessInfo)(),o=null==a?null:a.groupId;e.value.firstvalue=o}i.cacheTools.set("pk_org",e.value.firstvalue)}}),i.cacheTools.set("hasSearched",1),i.cacheTools.set("searchParams",a),i.cacheTools.set("pageInfo",t.table.getTablePageInfo(f));t.meta.getMeta();var o=e.props.search.getQueryInfo(e.searchId).oid,n={querycondition:a,custcondition:{},pagecode:t.pagecode_list,nodeType:t.nodeType,queryAreaCode:p,pageInfo:t.table.getTablePageInfo(f),querytype:"tree",oid:o};(0,i.ajax)({url:g,data:n,success:function(a){console.log(a),a.data?(t.table.setAllTableData(e.tableId,a.data[f]),t.button.setButtonDisabled(["printGrp","output"],!1),(0,i.toast)({content:e.state.json["10140INCMG-000022"]+a.data[f].rows.length+e.state.json["10140INCMG-000023"],color:"success"})):(t.table.setAllTableData(e.tableId,{rows:[]}),t.button.setButtonDisabled(["printGrp","output"],!0),(0,i.toast)({content:e.state.json["10140INCMG-000024"],color:"warning"}))},error:function(e){console.log(e.message)}})}},o);T=(0,i.createPage)({billinfo:[{billtype:"grid",pagecode:"10140INCMG_incomelist",headcode:f}],initTemplate:[],mutiLangCode:"10140INCMG"})(T),t.default=T},2:function(e,a){e.exports=t},216:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var a=0;a<t.length;a++){var o=t[a];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,a,o){return a&&e(t.prototype,a),o&&e(t,o),t}}(),n=a(2),r=s(n),l=(s(a(3)),s(a(190)));function s(e){return e&&e.__esModule?e:{default:e}}var i={nodeName:"收款协议-业务单元",nodeType:"org",pagecode_list:"10140INCMG_incomelist",pagecode_card:"10140INCMG_incomecard",appcode:"10140INCMO",appid:"0001Z010000000001PR5",printFunCode:"10140INCMG",printNodeKey:"incomecard",listUrl:"/list",cardUrl:"/card"},c=function(e){function t(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,n.Component),o(t,[{key:"render",value:function(){return r.default.createElement("div",null,r.default.createElement(l.default,i))}}]),t}();t.default=c},217:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var a=0;a<t.length;a++){var o=t[a];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,a,o){return a&&e(t.prototype,a),o&&e(t,o),t}}(),n=a(2),r=s(n),l=(s(a(3)),s(a(191)));function s(e){return e&&e.__esModule?e:{default:e}}var i={nodeName:"收款协议-业务单元",nodeType:"org",pagecode_list:"10140INCMG_incomelist",pagecode_card:"10140INCMG_incomecard",appcode:"10140INCMO",appid:"0001Z010000000001PR5",printFunCode:"10140INCMG",printNodeKey:"incomelist",listUrl:"/list",cardUrl:"/card"},c=function(e){function t(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,n.Component),o(t,[{key:"render",value:function(){return r.default.createElement("div",null,r.default.createElement(l.default,i))}}]),t}();t.default=c},269:function(e,t,a){e.exports=a(270)},270:function(e,t,a){"use strict";var o=a(1);!function(e,t){(0,o.RenderRouter)(e,t)}(function(e){return e&&e.__esModule?e:{default:e}}(a(271)).default,"app")},271:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=a(1),n=function(e){return e&&e.__esModule?e:{default:e}}(a(217));var r=(0,o.asyncComponent)(function(){return Promise.resolve().then(a.t.bind(null,216,7))}),l=[{path:"/",component:n.default,exact:!0},{path:"/list",component:n.default},{path:"/card",component:r}];t.default=l},3:function(e,t){e.exports=a}})});
//# sourceMappingURL=index.e814bce1.js.map