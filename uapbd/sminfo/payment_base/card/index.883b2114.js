!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("nc-lightapp-front"),require("react"),require("react-dom")):"function"==typeof define&&define.amd?define(["nc-lightapp-front","react","react-dom"],t):"object"==typeof exports?exports["uapbd/sminfo/payment_base/card/index"]=t(require("nc-lightapp-front"),require("react"),require("react-dom")):e["uapbd/sminfo/payment_base/card/index"]=t(e["nc-lightapp-front"],e.React,e.ReactDOM)}(window,function(e,t,a){return function(e){var t={};function a(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,a),r.l=!0,r.exports}return a.m=e,a.c=t,a.d=function(e,t,o){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(a.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)a.d(o,r,function(t){return e[t]}.bind(null,r));return o},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="../../../../",a(a.s=281)}({1:function(t,a){t.exports=e},192:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o,r,n=function(){function e(e,t){for(var a=0;a<t.length;a++){var o=t[a];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,a,o){return a&&e(t.prototype,a),o&&e(t,o),t}}(),s=a(2),d=i(s),l=(i(a(3)),a(1));function i(e){return e&&e.__esModule?e:{default:e}}function c(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var u=l.base.NCAffix,p=(l.base.NCPopconfirm,l.base.NCFormControl,l.base.NCBackBtn),f=l.high.PrintOutput,m=l.cardCache.addCache,b=l.cardCache.getCacheById,h=l.cardCache.updateCache,g=l.cardCache.getCurrentLastId,v=(l.cardCache.getNextId,l.cardCache.deleteCacheById),y="uapbd.sminfo.payment.data",P="payment",k="paymentch",I="/nccloud/uapbd/sminfo/PaymentCardQuery.do",T="/nccloud/uapbd/sminfo/PaymentLoginUserInfoQuery.do",_="/nccloud/uapbd/sminfo/PaymentPrint.do",w="pk_payment";function C(e){var t=e.getUrlParam("status");"add"==t?(e.meta.getMeta()[k]&&e.cardTable.showColByKey(k,"opr"),e.button.setButtonVisible(["edit","add","back","delete","refresh","printGrp","print","output","detail"],!1),e.button.setButtonVisible(["save","saveAdd","cancel","addline","insertline","spread","delline"],!0),e.button.setButtonDisabled("saveAdd",!1),e.cardPagination.setCardPaginationVisible("cardPaginationBtn",!1)):"edit"==t?(e.meta.getMeta()[k]&&e.cardTable.showColByKey(k,"opr"),e.button.setButtonVisible(["edit","add","back","delete","refresh","printGrp","print","output","detail"],!1),e.button.setButtonVisible(["save","saveAdd","cancel","addline","insertline","delline","spread"],!0),e.button.setButtonDisabled("saveAdd",!0),e.cardPagination.setCardPaginationVisible("cardPaginationBtn",!1)):(e.meta.getMeta()[k]&&e.cardTable.hideColByKey(k,"opr"),e.button.setButtonVisible(["save","saveAdd","cancel","addline","insertline","delline","spread","print","back"],!1),e.button.setButtonVisible(["add","edit","delete","refresh","printGrp","output","detail"],!0),e.cardPagination.setCardPaginationVisible("cardPaginationBtn",!0)),e.form.setFormStatus(P,t),e.cardTable.setStatus(k,t)}var A=(o=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var a=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return r.call(a),a.formId=P,a.tableId=k,a.state={json:{},pk_org:"",title_code:"",context:{nodeType:e.nodeType,pk_org:"",pk_org_v:"",org_Name:"",org_v_Name:"",mdid:"",PermissionOrgIDs:[]}},a}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,s.Component),n(t,[{key:"initTemplate",value:function(e){var t=this;e.createUIDom({pagecode:e.pagecode_card},function(a){if(a){var o=a.context;if(t.state.context=Object.assign(t.state.context,o),a.template){var r=a.template;t.modifierMeta(e,r),e.meta.setMeta(r,function(){})}if(a.button){var n=a.button;e.button.setButtons(n,function(){e.button.setPopContent("delline",t.state.json["10140PAYMG-000002"])}),C(e)}}})}},{key:"modifierMeta",value:function(e,t){var a=e.getUrlParam("status");t[P].status=a,t[k].status=a,t[P].items.map(function(t){"pk_org"==t.attrcode&&("group"==e.nodeType?t.disabled="false":t.queryCondition=function(){return{AppCode:"10140PAYMO",TreeRefActionExt:"nccloud.web.refer.sqlbuilder.PrimaryOrgSQLBuilder"}})});var o={key:"oprCol",attrcode:"opr",label:this.state.json["10140PAYMG-000001"],visible:!0,className:"table-opr",width:"200px",itemtype:"customer",fixed:"right",render:function(t,a,o){var r=function(e){return"browse"===e.getUrlParam("status")?["detail"]:["insertline","delline"]}(e);return e.button.createOprationButton(r,{area:"table-opr-area",buttonLimit:3,onButtonClick:function(e,t){return function(e,t,a,o,r){var n=e.cardTable.getVisibleRows(k),s={};switch(t){case"insertline":n.forEach(function(t){t.values.showorder.value>=o.values.showorder.value&&(s=(parseInt(t.values.showorder.value)+1).toString(),e.cardTable.setValByKeyAndRowId(k,t.rowid,"showorder",{value:s}))}),e.cardTable.addRow(k,r,{showorder:{display:"",value:r+1+""}},!1);break;case"delline":n.forEach(function(t){t.values.showorder.value>=o.values.showorder.value&&(s=(parseInt(t.values.showorder.value)-1).toString(),e.cardTable.setValByKeyAndRowId(k,t.rowid,"showorder",{value:s}))}),e.cardTable.delRowsByIndex(k,r);break;case"detail":e.cardTable.toggleRowView(k,o);break;case"spread":e.cardTable.openModel(k,"edit",o,r);break;default:console.log(t,r)}}(e,t,0,a,o)}})}};return t[k].items.push(o),t}},{key:"componentDidMount",value:function(){var e=this;if(this.props.MultiInit.getMultiLang({moduleId:"10140PAYMG",domainName:"uapbd",callback:function(t,a,o){a&&e.setState({json:t,inlt:o},function(){e.initTemplate(e.props)})}}),"add"!=this.props.getUrlParam("status")){var t=this.props.getUrlParam("id");t&&"undefined"!=t&&this.getdata(t)}else this.setDefaultValue()}},{key:"componentDidUpdate",value:function(){var e=this.props.form.getFormStatus(P);window.onbeforeunload="add"!=e&&"edit"!=e?null:function(){return""}}},{key:"componentWillReceiveProps",value:function(){}},{key:"getDataForCache",value:function(e,t){if(e){var a=b(e,y);a?(this.props.form.setAllFormValue(c({},P,a.head[P])),a.body&&a.body[k]?this.props.cardTable.setTableData(k,a.body[k]):this.props.cardTable.setTableData(k,{rows:[]}),this.props.setUrlParam(e)):(this.getdata(e),this.props.setUrlParam(e)),t&&"function"==typeof t&&t.call(this),a&&C(this.props)}else this.props.pushTo("/list",{})}},{key:"onReturnClick",value:function(){this.props.pushTo(this.props.listUrl,{pagecode:this.props.pagecode_list,appcode:this.props.appcode,status:"browse"})}},{key:"render",value:function(){var e=this.props,t=e.cardTable,a=e.form,o=e.button,r=e.modal,n=e.cardPagination.createCardPagination,s=(this.props.button.getButtons(),a.createForm),l=t.createCardTable,i=o.createButtonApp,c=r.createModal,m=this.props.getUrlParam("status");return d.default.createElement("div",{id:"nc-bill-card"},d.default.createElement("div",{className:"nc-bill-card"},d.default.createElement("div",{className:"nc-bill-top-area"},d.default.createElement(u,null,d.default.createElement("div",{className:"nc-bill-header-area"},d.default.createElement("div",null,"browse"==m?d.default.createElement(p,{onClick:this.onReturnClick.bind(this)}):""),d.default.createElement("div",{className:"header-title-search-area"},d.default.createElement("h2",{className:"title-search-detail"},"group"==this.props.nodeType?this.state.json["10140PAYMG-000000"]:this.state.json["10140PAYMG-000014"],"browse"==m?"："+this.state.title_code:"")),d.default.createElement("div",{className:"header-button-area"},i({area:"header-button-area",onButtonClick:this.buttonClick.bind(this)}),n({handlePageInfoChange:this.pageInfoClick.bind(this),dataSource:y})))),d.default.createElement("div",{className:"nc-bill-form-area"},s(this.formId,{onAfterEvent:this.afterEvent.bind(this)}))),d.default.createElement("div",{className:"nc-bill-bottom-area"},d.default.createElement("div",{className:"nc-bill-table-area"},l(this.tableId,{tableHead:this.getTableHead.bind(this),modelSave:this.modelSave.bind(this),showIndex:!0,onAfterEvent:this.tableAfterEvent.bind(this),onBeforeEvent:this.tableBeforeEvent.bind(this)})),c("delete",{title:this.state.json["10140PAYMG-000015"],content:this.state.json["10140PAYMG-000016"],beSureBtnClick:this.delConfirm.bind(this)}),c("modal",{title:this.state.json["10140PAYMG-000003"],content:this.state.json["10140PAYMG-000017"]}),d.default.createElement(f,{ref:"printOutput",url:_,data:{appcode:this.props.appcode,funcode:this.props.printFunCode,nodekey:this.props.printNodeKey,oids:this.state.ids,outputType:"output"}}))))}}]),t}(),r=function(){var e=this;this.setDefaultValue=function(){"group"==e.props.nodeType?(0,l.ajax)({url:T,success:function(t){e.props.form.setFormItemsValue(e.formId,{pk_org:{value:t.data.group.pk_group,display:t.data.group.name},effectdate:{value:t.data.effectDate,display:null}})}}):(0,l.ajax)({url:T,success:function(t){e.props.form.setFormItemsValue(e.formId,{effectdate:{value:t.data.effectDate,display:null},pk_org:{value:e.state.context.pk_org,display:e.state.context.org_Name}})}})},this.buttonClick=function(t,a){switch(a){case"add":e.add(t),t.setUrlParam({appcode:t.appcode,pagecode:t.pagecode_card,status:"add"}),C(e.props);break;case"edit":e.valid(t,"edit",function(){t.setUrlParam({appcode:t.appcode,pagecode:t.pagecode_card,status:"edit",id:t.getUrlParam("id")}),C(e.props)});break;case"delete":e.valid(t,"delete",function(){(0,l.promptBox)({color:"warning",title:e.state.json["10140PAYMG-000003"],content:e.state.json["10140PAYMG-000004"],beSureBtnClick:e.delConfirm.bind(e)})});break;case"back":t.pushTo(t.listUrl,{appcode:t.appcode,pagecode:t.pagecode_list,status:"browse"});break;case"save":e.saveClick("save");break;case"saveAdd":e.saveClick("saveAdd");break;case"cancel":(0,l.promptBox)({color:"warning",title:e.state.json["10140PAYMG-000005"],content:e.state.json["10140PAYMG-000006"],beSureBtnClick:function(){if("add"===t.getUrlParam("status")){var a=g(y);e.getDataForCache(a,function(){t.form.cancel(e.formId),t.cardTable.resetTableData(e.tableId),t.setUrlParam({status:"browse",id:t.getUrlParam("id"),appcode:t.appcode,pagecode:t.pagecode_card}),C(e.props)})}"edit"===t.getUrlParam("status")&&(t.form.cancel(e.formId),t.cardTable.resetTableData(e.tableId),t.setUrlParam({appcode:t.appcode,pagecode:t.pagecode_card,status:"browse",id:t.getUrlParam("id")})),C(e.props)}});break;case"addline":var o=t.cardTable.getNumberOfRows(e.tableId);t.cardTable.addRow(e.tableId,o,{showorder:{display:"",value:o+1+""}},!1);break;case"refresh":t.setUrlParam({appcode:t.appcode,pagecode:t.pagecode_card,status:t.getUrlParam("status"),id:t.getUrlParam("id")}),C(e.props),e.getdata(t.getUrlParam("id"),!0);break;case"printGrp":case"print":e.onPrint();break;case"output":e.onOutput()}},this.add=function(t){var a=(0,l.deepClone)(t.form.getFormItemsValue(e.formId,"pk_org"));t.form.EmptyAllFormValue(e.formId),t.cardTable.setTableData(e.tableId,{rows:[]}),t.setUrlParam({appcode:t.appcode,pagecode:t.pagecode_card,status:"add"});var o=(0,l.getBusinessInfo)(),r=null,n=null,s=null;o&&(r=o.businessDate,n=o.groupId,s=o.groupName),"org"==t.nodeType&&a.value==n&&(a={value:"",display:""}),"group"==t.nodeType&&a!=n&&(a={value:n,display:s}),t.form.setFormItemsValue(e.formId,{pk_org:{value:a.value,display:a.display}}),t.form.setFormItemsValue(e.formId,{effectdate:{value:r,display:r}})},this.valid=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",a=arguments[2],o={pks:[e.form.getFormItemsValue(P,w).value],nodeType:e.nodeType,mdOperateCode:t};(0,l.ajax)({url:"/nccloud/uapbd/sminfo/PaymentValid.do",data:o,success:function(e){a&&a()}})},this.onPrint=function(){var t=e.props.form.getAllFormValue(P);if(0!==t.length){var a=[];t.rows.forEach(function(e,t){a.push(e.values[w].value)}),(0,l.print)("pdf",_,{appcode:e.props.appcode,funcode:e.props.printFunCode,nodekey:e.props.printNodeKey,oids:a})}else(0,l.toast)({content:e.state.json["10140PAYMG-000007"],color:"warning"})},this.onOutput=function(){var t=e.props.form.getAllFormValue(P);if(0!==t.length){var a=[];t.rows.forEach(function(e,t){a.push(e.values[w].value)}),e.setState({ids:a},e.refs.printOutput.open())}else(0,l.toast)({content:e.state.json["10140PAYMG-000008"],color:"warning"})},this.pageInfoClick=function(e,t){var a={pk_org:l.cacheTools.get("pk_org"),pk:t,pageid:e.pagecode_card};(0,l.ajax)({url:I,data:a,success:function(a){a.data.head&&(e.form.setAllFormValue(c({},P,a.data.head[P])),e.setUrlParam(t)),a.data.body&&e.cardTable.setTableData(k,a.data.body[k])}})},this.afterEvent=function(e,t,a,o,r,n,s,d){},this.tableAfterEvent=function(t,a,o,r,n,s,d,l){"paymentday"==o&&r&&null!=r&&""!=r&&(t.cardTable.setValByKeyAndIndex(a,s,"accountday",{value:null,display:null}),t.cardTable.setValByKeyAndIndex(a,s,"checkdata",{value:null,display:null}),t.cardTable.setValByKeyAndIndex(a,s,"effectmonth",{value:null,display:null}),t.cardTable.setValByKeyAndIndex(a,s,"effectaddmonth",{value:null,display:null})),"checkdata"==o&&r&&null!=r&&""!=r&&(t.cardTable.setValByKeyAndIndex(a,s,"paymentday",{value:null,display:null}),n[0].newvalue.value!=n[0].oldvalue.value&&(t.cardTable.setValByKeyAndIndex(a,s,"accountday",{value:null,display:null}),t.cardTable.setValByKeyAndIndex(a,s,"effectmonth",{value:"0",display:e.state.json["10140PAYMG-000009"]}),t.cardTable.setValByKeyAndIndex(a,s,"effectaddmonth",{value:"0",display:"0"})))},this.tableBeforeEvent=function(t,a,o,r,n,s,d,i,c){var u=t.getUrlParam("status"),p=t.meta.getMeta();if("browse"!=u&&["accountday","effectmonth","effectaddmonth"].includes(o)){var f=t.cardTable.getValByKeyAndIndex(a,n,"checkdata");if(!f||null==f.value||""==f.value)return(0,l.toast)({content:e.state.json["10140PAYMG-000010"],color:"danger"}),!1}"pk_payperiod"==o&&(p[a].items.find(function(e){return"pk_payperiod"==e.attrcode}).queryCondition=function(){return{pk_org:t.form.getFormItemsValue(P,"pk_org").value}});"pk_rate"==o&&(p[a].items.find(function(e){return"pk_rate"==e.attrcode}).queryCondition=function(){return{pk_org:t.form.getFormItemsValue(P,"pk_org").value}});return!0},this.getdata=function(t,a){var o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,r={pk:t,pk_org:null==o?l.cacheTools.get("pk_org"):o};(0,l.ajax)({url:I,data:r,success:function(t){if(t.data.head){e.props.form.setAllFormValue(c({},e.formId,t.data.head[e.formId]));var o=t.data.head[e.formId].rows[0].values.code.value;e.setState({title_code:o})}var r;(t.data.body&&e.props.cardTable.setTableData(e.tableId,t.data.body[e.tableId]),t.formulamsg&&t.formulamsg instanceof Array&&t.formulamsg.length>0)&&e.props.dealFormulamsg(t.formulamsg,(c(r={},e.tableId,"table"),c(r,e.formId,"form"),r));a&&(0,l.toast)({content:e.state.json["10140PAYMG-000011"],color:"success"})}})},this.saveClick=function(t){if(e.props.cardTable.getAllRows(k)||(0,l.toast)({content:e.state.json["10140PAYMG-000012"],color:"danger"}),setTimeout(function(){},0),e.props.form.isCheckNow(P)&&e.props.cardTable.checkTableRequired(k)){e.props.cardTable.filterEmptyRows(k);var a=e.props.createMasterChildData(e.props.pagecode_card,e.formId,e.tableId),o="/nccloud/uapbd/sminfo/PaymentSave.do";"edit"===e.props.getUrlParam("status")&&(o="/nccloud/uapbd/sminfo/PaymentUpdate.do"),e.props.validateToSave(a,function(){(0,l.ajax)({url:o,data:a,success:function(a){var o=null;if(a.success){if(a.data&&(a.data.head&&a.data.head[e.formId]&&(e.props.form.setAllFormValue(c({},e.formId,a.data.head[e.formId])),o=a.data.head[e.formId].rows[0].values[w].value),a.data.body&&a.data.body[e.tableId]&&e.props.cardTable.setTableData(e.tableId,a.data.body[e.tableId])),(0,l.toast)({title:e.state.json["10140PAYMG-000013"],color:"success"}),"save"==t){var r=a.data.head[e.formId].rows[0].values.pk_org.value;e.getdata(o,!1,r),e.props.setUrlParam({appcode:e.props.appcode,pagecode:e.props.pagecode_card,status:"browse",id:o}),e.props.setUrlParam()}else e.add(e.props),e.props.setUrlParam({appcode:e.props.appcode,pagecode:e.props.pagecode_card,status:"add"});"edit"===e.props.getUrlParam("status")?h(w,a.data.head[P].rows[0].values[w].value,a.data,P,y):m(o,a.data,e.formId,y),C(e.props)}}})},c({},k,"cardTable"),"card")}},this.delConfirm=function(){(0,l.ajax)({url:"/nccloud/uapbd/sminfo/PaymentDelete.do",data:{pk_org:e.props.form.getFormItemsValue(e.formId,"pk_org").value,deleteinfo:[{id:e.props.getUrlParam("id"),ts:e.props.form.getFormItemsValue(e.formId,"ts").value}]},success:function(t){if(t){var a=e.props.getUrlParam("id");v(w,a,y),e.props.pushTo(e.props.listUrl,{appcode:e.props.appcode,pagecode:e.props.pagecode_list,status:"browse"})}}})},this.modelSave=function(t){t.cardTable.closeModel(e.tableId),e.saveClick()},this.getTableHead=function(){var t=e.props.button.createButtonApp;e.props.button.getButtons(),e.props.getUrlParam("status");return d.default.createElement("div",{className:"shoulder-definition-area"},d.default.createElement("div",{className:"definition-icons"},t({area:"definition-icons",onButtonClick:e.buttonClick.bind(e)})))}},o);A=(0,l.createPage)({billinfo:[{billtype:"card",pagecode:"10140PAYMG_card",headcode:P,bodycode:k}],initTemplate:[]})(A),t.default=A},2:function(e,a){e.exports=t},281:function(e,t,a){e.exports=a(192)},3:function(e,t){e.exports=a}})});
//# sourceMappingURL=index.883b2114.js.map