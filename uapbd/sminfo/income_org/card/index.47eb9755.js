!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("nc-lightapp-front"),require("react"),require("react-dom")):"function"==typeof define&&define.amd?define(["nc-lightapp-front","react","react-dom"],t):"object"==typeof exports?exports["uapbd/sminfo/income_org/card/index"]=t(require("nc-lightapp-front"),require("react"),require("react-dom")):e["uapbd/sminfo/income_org/card/index"]=t(e["nc-lightapp-front"],e.React,e.ReactDOM)}(window,function(e,t,a){return function(e){var t={};function a(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,a),r.l=!0,r.exports}return a.m=e,a.c=t,a.d=function(e,t,o){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(a.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)a.d(o,r,function(t){return e[t]}.bind(null,r));return o},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="../../../../",a(a.s=267)}({1:function(t,a){t.exports=e},148:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var o in a)Object.prototype.hasOwnProperty.call(a,o)&&(e[o]=a[o])}return e};t.default=function(e){return function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments[2],l=0,s={},d=function(){2==l&&n&&n(s.templateData||{},s.langData||{},s.inlt||{})};a.callback&&console.log("咱们自己createUIDom会同时获取多语和单据模板,并通过一个回调函数返回, langCfg中的回调函数将被忽略");var i=o({},a,{callback:function(e,t,a){l+=1,t||(0,r.toast)({content:"load muti lang error",color:"warning"}),s.langData=e||{},s.inlt=a||{},d()}});e.MultiInit.getMultiLang(i),e.createUIDom(t,function(e){l+=1,s.templateData=e||{},d()})}};var r=a(1)},190:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o,r,n=function(){function e(e,t){for(var a=0;a<t.length;a++){var o=t[a];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,a,o){return a&&e(t.prototype,a),o&&e(t,o),t}}(),l=a(2),s=c(l),d=(c(a(3)),a(1)),i=c(a(148));function c(e){return e&&e.__esModule?e:{default:e}}function u(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var p=d.base.NCAffix,f=(d.base.NCPopconfirm,d.base.NCFormControl,d.base.NCBackBtn),m=d.high.PrintOutput,b="income",g="incomech",v="/nccloud/uapbd/sminfo/IncomeCardQuery.do",h="/nccloud/uapbd/sminfo/PaymentLoginUserInfoQuery.do",y="/nccloud/uapbd/sminfo/IncomePrint.do",I=function(e){return"browse"===e.getUrlParam("status")?["detail"]:["insertline","delline"]};function k(e,t){var a=e.getUrlParam("status");t[b].status=a,t[g].status=a,t[b].items.map(function(t){"pk_org"==t.attrcode&&("group"==e.nodeType?t.disabled="false":t.queryCondition=function(){return{AppCode:"10140INCMO",TreeRefActionExt:"nccloud.web.refer.sqlbuilder.PrimaryOrgSQLBuilder"}})});var o={attrcode:"opr",label:e.MutiInit.getIntl("10140INCMG")&&e.MutiInit.getIntl("10140INCMG").get("10140INCMG-000001"),visible:!0,className:"table-opr",width:"200px",itemtype:"customer",fixed:"right",render:function(t,a,o){var r=I(e);return e.button.createOprationButton(r,{area:"table-opr-area",buttonLimit:3,onButtonClick:function(e,t){return function(e,t,a,o,r){var n=e.cardTable.getVisibleRows(g,!1),l={};switch(t){case"insertline":n.forEach(function(t){t.values.showorder.value>=o.values.showorder.value&&(l=(parseInt(t.values.showorder.value)+1).toString(),e.cardTable.setValByKeyAndRowId(g,t.rowid,"showorder",{value:l}))}),e.cardTable.addRow(g,r,{showorder:{display:"",value:r+1+""}},!1);break;case"delline":n.forEach(function(t){t.values.showorder.value>=o.values.showorder.value&&(l=(parseInt(t.values.showorder.value)-1).toString(),e.cardTable.setValByKeyAndRowId(g,t.rowid,"showorder",{value:l}))}),e.cardTable.delRowsByIndex(g,r);break;case"detail":e.cardTable.toggleRowView(g,o);break;case"spread":e.cardTable.openModel(g,"edit",o,r);break;default:console.log(t,r)}}(e,t,0,a,o)}})}};return t[g].items.push(o),t}function _(e){var t=e.getUrlParam("status");"add"==t?(e.cardTable.showColByKey(g,"opr"),e.button.setButtonVisible(["edit","add","back","delete","refresh","spread","printGrp","print","output"],!1),e.button.setButtonVisible(["save","saveAdd","cancel","addline","insertline","delline","detail"],!0),e.button.setButtonDisabled("saveAdd",!1),e.cardPagination.setCardPaginationVisible("cardPaginationBtn",!1)):"edit"==t?(e.cardTable.showColByKey(g,"opr"),e.button.setButtonVisible(["edit","add","back","delete","refresh","spread","printGrp","print","output"],!1),e.button.setButtonVisible(["save","saveAdd","cancel","addline","insertline","delline","detail"],!0),e.button.setButtonDisabled("saveAdd",!0),e.cardPagination.setCardPaginationVisible("cardPaginationBtn",!1)):(e.cardTable.hideColByKey(g,"opr"),e.button.setButtonVisible(["save","saveAdd","cancel","addline","insertline","delline","detail","print","back"],!1),e.button.setButtonVisible(["add","edit","delete","refresh","spread","printGrp","output"],!0),e.cardPagination.setCardPaginationVisible("cardPaginationBtn",!0)),e.form.setFormStatus(b,t),e.cardTable.setStatus(g,t)}var C=(o=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var a=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return r.call(a),a.formId=b,a.tableId=g,a.state={pk_org:"",json:{},title:"",title_code:"",totalcount:0,applycount:0},a.initTemplate(e),a}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,l.Component),n(t,[{key:"componentDidMount",value:function(){if("add"!=this.props.getUrlParam("status")){var e=this.props.getUrlParam("id");e&&"undefined"!=e&&this.getdata(e)}else this.setDefaultValue()}},{key:"componentDidUpdate",value:function(){var e=this.props.form.getFormStatus(b);window.onbeforeunload="add"!=e&&"edit"!=e?null:function(){return""}}},{key:"componentWillReceiveProps",value:function(){}},{key:"onReturnClick",value:function(){this.props.pushTo(this.props.listUrl,{pagecode:this.props.pagecode_list,appcode:this.props.appcode,status:"browse"})}},{key:"render",value:function(){var e=this.props,t=e.cardTable,a=e.form,o=e.button,r=e.modal,n=e.cardPagination.createCardPagination,l=(this.props.button.getButtons(),a.createForm),d=t.createCardTable,i=o.createButtonApp,c=r.createModal,u=this.props.getUrlParam("status");return s.default.createElement("div",{id:"nc-bill-card"},s.default.createElement("div",{className:"nc-bill-card"},s.default.createElement("div",{className:"nc-bill-top-area"},s.default.createElement(p,null,s.default.createElement("div",{className:"nc-bill-header-area"},s.default.createElement("div",null,"browse"==u?s.default.createElement(f,{onClick:this.onReturnClick.bind(this)}):""),s.default.createElement("div",{className:"header-title-search-area"},s.default.createElement("h2",{className:"title-search-detail"},this.state.title,"browse"==u?"："+this.state.title_code:"")),s.default.createElement("div",{className:"header-button-area"},i({area:"header-button-area",onButtonClick:this.buttonClick.bind(this)}),n({handlePageInfoChange:this.pageInfoClick.bind(this)})))),s.default.createElement("div",{className:"nc-bill-form-area"},l(this.formId,{onAfterEvent:this.afterEvent.bind(this)}))),s.default.createElement("div",{className:"nc-bill-bottom-area"},s.default.createElement("div",{className:"nc-bill-table-area"},d(this.tableId,{tableHead:this.getTableHead.bind(this),modelSave:this.modelSave.bind(this),showIndex:!0,onAfterEvent:this.tableAfterEvent.bind(this),onBeforeEvent:this.tableBeforeEvent.bind(this)})),c("delete",{title:this.state.json["10140INCMG-000012"],content:this.state.json["10140INCMG-000013"],beSureBtnClick:this.delConfirm.bind(this)}),c("modal",{title:this.state.json["10140INCMG-000002"],content:this.state.json["10140INCMG-000014"]}),s.default.createElement(m,{ref:"printOutput",url:y,data:{appcode:this.props.appcode,funcode:this.props.printFunCode,nodekey:this.props.printNodeKey,oids:this.state.ids,outputType:"output"}}))))}}]),t}(),r=function(){var e=this;this.initTemplate=function(t,a){var o=e;(0,i.default)(t)({pagecode:t.pagecode_card},{moduleId:"10140INCMG",domainName:"uapbd"},function(r,n){if(n&&(e.state.json=n,"group"==t.nodeType?o.state.title=e.state.json["10140INCMG-000000"]:o.state.title=e.state.json["10140INCMG-000025"]),r){if(r.template){var l=r.template;k(t,l),t.meta.setMeta(l)}if(r.button){var s=r.button;t.button.setButtons(s,function(){}),_(t)}a&&a()}})},this.setDefaultValue=function(){"group"==e.props.nodeType?(0,d.ajax)({url:h,success:function(t){e.props.form.setFormItemsValue(e.formId,{pk_org:{value:t.data.group.pk_group,display:t.data.group.name},effectdate:{value:t.data.effectDate,display:null}})}}):(0,d.ajax)({url:h,success:function(t){e.props.form.setFormItemsValue(e.formId,{effectdate:{value:t.data.effectDate,display:null}})}})},this.buttonClick=function(t,a){switch(a){case"add":e.add(t),t.setUrlParam({appcode:t.appcode,pagecode:t.pagecode_card,status:"add"}),_(e.props);break;case"edit":e.valid(t,function(){t.setUrlParam({appcode:t.appcode,pagecode:t.pagecode_card,status:"edit",id:t.getUrlParam("id")}),_(e.props)});break;case"delete":e.valid(t,function(){(0,d.promptBox)({title:e.state.json["10140INCMG-000002"],color:"warning",hasCloseBtn:!1,content:e.state.json["10140INCMG-000003"],beSureBtnClick:e.delConfirm.bind(e)})});break;case"back":t.pushTo(t.listUrl,{appcode:t.appcode,pagecode:t.pagecode_list,status:"browse"});break;case"save":e.saveClick("save");break;case"saveAdd":e.saveClick("saveAdd");break;case"cancel":(0,d.promptBox)({color:"warning",title:e.state.json["10140INCMG-000004"],hasCloseBtn:!1,content:e.state.json["10140INCMG-000005"],beSureBtnClick:function(){"add"===t.getUrlParam("status")&&(d.cacheTools.get("preid")?(t.form.cancel(e.formId),t.cardTable.resetTableData(e.tableId),t.setUrlParam({appcode:t.appcode,pagecode:t.pagecode_card,status:"browse",id:d.cacheTools.get("preid")}),_(e.props)):t.pushTo(t.listUrl,{appcode:t.appcode,pagecode:t.pagecode_list,status:"browse"})),"edit"===t.getUrlParam("status")&&(t.form.cancel(e.formId),t.cardTable.resetTableData(e.tableId),t.setUrlParam({appcode:t.appcode,pagecode:t.pagecode_card,status:"browse",id:t.getUrlParam("id")})),_(e.props)}});break;case"addline":var o=t.cardTable.getNumberOfRows(e.tableId);t.cardTable.addRow(e.tableId,o,{showorder:{display:"",value:o+1+""}},!1);break;case"refresh":t.setUrlParam({appcode:t.appcode,pagecode:t.pagecode_card,status:t.getUrlParam("status"),id:t.getUrlParam("id")}),_(e.props),e.getdata(t.getUrlParam("id"),!0);break;case"printGrp":case"print":e.onPrint();break;case"output":e.onOutput()}},this.valid=function(e,t){var a={pks:[e.form.getFormItemsValue(b,"pk_income").value],nodeType:e.nodeType};(0,d.ajax)({url:"/nccloud/uapbd/sminfo/IncomeValid.do",data:a,success:function(e){t&&t()}})},this.add=function(t){var a=(0,d.deepClone)(t.form.getFormItemsValue(e.formId,"pk_org"));t.form.EmptyAllFormValue(e.formId),t.cardTable.setTableData(e.tableId,{rows:[]}),t.setUrlParam({appcode:t.appcode,pagecode:t.pagecode_card,status:"add"});var o=(0,d.getBusinessInfo)().businessDate,r=(0,d.getBusinessInfo)().groupId,n=(0,d.getBusinessInfo)().groupName;"org"==t.nodeType&&a.value==r&&(a={value:"",display:""}),"group"==t.nodeType&&a!=r&&(a={value:r,display:n}),t.form.setFormItemsValue(e.formId,{pk_org:{value:a.value,display:a.display}}),t.form.setFormItemsValue(e.formId,{effectdate:{value:o,display:o}})},this.onPrint=function(){var t=e.props.form.getAllFormValue(b);if(0!==t.length){var a=[];t.rows.forEach(function(e,t){a.push(e.values.pk_income.value)}),(0,d.print)("pdf",y,{appcode:e.props.appcode,funcode:e.props.printFunCode,nodekey:e.props.printNodeKey,oids:a},!1)}else(0,d.toast)({content:e.state.json["10140INCMG-000006"],color:"warning"})},this.onOutput=function(){var t=e.props.form.getAllFormValue(b);if(0!==t.length){var a=[];t.rows.forEach(function(e,t){a.push(e.values.pk_income.value)}),e.setState({ids:a},e.refs.printOutput.open())}else(0,d.toast)({content:e.state.json["10140INCMG-000007"],color:"warning"})},this.pageInfoClick=function(e,t){var a={pk_org:d.cacheTools.get("pk_org"),pk:t,pageid:e.pagecode_card};(0,d.ajax)({url:v,data:a,success:function(a){a.data.head&&(e.form.setAllFormValue(u({},b,a.data.head[b])),e.setUrlParam(t)),a.data.body&&e.cardTable.setTableData(g,a.data.body[g])}})},this.afterEvent=function(e,t,a,o,r,n,l,s){},this.tableAfterEvent=function(t,a,o,r,n,l,s,d){"paymentday"==o&&r&&null!=r&&""!=r&&(t.cardTable.setValByKeyAndIndex(a,l,"accountday",{value:null,display:null}),t.cardTable.setValByKeyAndIndex(a,l,"checkdata",{value:null,display:null}),t.cardTable.setValByKeyAndIndex(a,l,"effectmonth",{value:null,display:null}),t.cardTable.setValByKeyAndIndex(a,l,"effectaddmonth",{value:null,display:null})),"checkdata"==o&&r&&null!=r&&""!=r&&(t.cardTable.setValByKeyAndIndex(a,l,"paymentday",{value:null,display:null}),n[0].newvalue.value!=n[0].oldvalue.value&&(t.cardTable.setValByKeyAndIndex(a,l,"accountday",{value:null,display:null}),t.cardTable.setValByKeyAndIndex(a,l,"effectmonth",{value:"0",display:e.state.json["10140INCMG-000008"]}),t.cardTable.setValByKeyAndIndex(a,l,"effectaddmonth",{value:"0",display:"0"})))},this.tableBeforeEvent=function(t,a,o,r,n,l,s,i,c){var u=t.getUrlParam("status"),p=t.meta.getMeta();if("browse"!=u&&["accountday","effectmonth","effectaddmonth"].includes(o)){var f=t.cardTable.getValByKeyAndIndex(a,n,"checkdata");if(!f||null==f.value||""==f.value)return(0,d.toast)({content:e.state.json["10140INCMG-000009"],color:"danger"}),!1}"pk_incomeperiod"==o&&(p[a].items.find(function(e){return"pk_incomeperiod"==e.attrcode}).queryCondition=function(){return{pk_org:t.form.getFormItemsValue("income","pk_org").value}});"pk_rate"==o&&(p[a].items.find(function(e){return"pk_rate"==e.attrcode}).queryCondition=function(){return{pk_org:t.form.getFormItemsValue("income","pk_org").value}});return t.meta.setMeta(p),!0},this.getdata=function(t,a){var o={pk:t,pk_org:d.cacheTools.get("pk_org")};(0,d.ajax)({url:v,data:o,success:function(t){if(t.data){if(t.data.head){e.props.form.setAllFormValue(u({},e.formId,t.data.head[e.formId]));var o=t.data.head[e.formId].rows[0].values.code.value;e.setState({title_code:o})}var r;if(t.data.body&&e.props.cardTable.setTableData(e.tableId,t.data.body[e.tableId]),t.formulamsg&&t.formulamsg instanceof Array&&t.formulamsg.length>0)props.dealFormulamsg(t.formulamsg,(u(r={},e.tableId,"table"),u(r,e.formId,"form"),r))}a&&(0,d.toast)({title:e.state.json["10140INCMG-000010"],color:"success"})}})},this.saveClick=function(t){if(e.props.form.isCheckNow(b)&&e.props.cardTable.checkTableRequired(g)){e.props.cardTable.filterEmptyRows(g,["accrate","pk_incomeperiod","pk_balatype"]);var a=e.props.createMasterChildData(e.props.pagecode_card,e.formId,e.tableId),o="/nccloud/uapbd/sminfo/IncomeSave.do";"edit"===e.props.getUrlParam("status")&&(o="/nccloud/uapbd/sminfo/IncomeUpdate.do"),e.props.validateToSave(a,function(){(0,d.ajax)({url:o,data:a,success:function(a){var o=null;a.success&&(a.data&&(a.data.head&&a.data.head[e.formId]&&(e.props.form.setAllFormValue(u({},e.formId,a.data.head[e.formId])),o=a.data.head[e.formId].rows[0].values.pk_income.value),a.data.body&&a.data.body[e.tableId]&&e.props.cardTable.setTableData(e.tableId,a.data.body[e.tableId])),(0,d.toast)({title:e.state.json["10140INCMG-000011"],color:"success"}),"save"==t?(e.getdata(o),e.props.setUrlParam({appcode:e.props.appcode,pagecode:e.props.pagecode_card,status:"browse",id:o})):(e.add(e.props),e.props.setUrlParam({appcode:e.props.appcode,pagecode:e.props.pagecode_card,status:"add"})),_(e.props))}})},u({},g,"cardTable"),"card")}},this.delConfirm=function(){(0,d.ajax)({url:"/nccloud/uapbd/sminfo/IncomeDelete.do",data:{pk_org:e.props.form.getFormItemsValue(e.formId,"pk_org").value,deleteinfo:[{id:e.props.getUrlParam("id"),ts:e.props.form.getFormItemsValue(e.formId,"ts").value}]},success:function(t){t&&e.props.pushTo(e.props.listUrl,{appcode:e.props.appcode,pagecode:e.props.pagecode_list,status:"browse"})}})},this.modelSave=function(t){t.cardTable.closeModel(e.tableId),e.saveClick()},this.getTableHead=function(){var t=e.props.button.createButtonApp;e.props.button.getButtons(),e.props.getUrlParam("status");return s.default.createElement("div",{className:"shoulder-definition-area"},s.default.createElement("div",{className:"definition-icons"},t({area:"definition-icons",onButtonClick:e.buttonClick.bind(e)}),e.props.cardTable.createBrowseIcons(e.tableId,{iconArr:["close","open","max","setCol"],maxDestAreaId:"nc-bill-card"})))}},o);C=(0,d.createPage)({billinfo:[{billtype:"card",pagecode:"10140INCMG_incomecard",headcode:b,bodycode:g}],initTemplate:[],mutiLangCode:"10140INCMG"})(C),t.default=C},2:function(e,a){e.exports=t},216:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var a=0;a<t.length;a++){var o=t[a];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,a,o){return a&&e(t.prototype,a),o&&e(t,o),t}}(),r=a(2),n=s(r),l=(s(a(3)),s(a(190)));function s(e){return e&&e.__esModule?e:{default:e}}var d={nodeName:"收款协议-业务单元",nodeType:"org",pagecode_list:"10140INCMG_incomelist",pagecode_card:"10140INCMG_incomecard",appcode:"10140INCMO",appid:"0001Z010000000001PR5",printFunCode:"10140INCMG",printNodeKey:"incomecard",listUrl:"/list",cardUrl:"/card"},i=function(e){function t(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,r.Component),o(t,[{key:"render",value:function(){return n.default.createElement("div",null,n.default.createElement(l.default,d))}}]),t}();t.default=i},267:function(e,t,a){e.exports=a(216)},3:function(e,t){e.exports=a}})});
//# sourceMappingURL=index.47eb9755.js.map