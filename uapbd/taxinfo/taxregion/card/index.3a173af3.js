!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("nc-lightapp-front"),require("react"),require("react-dom")):"function"==typeof define&&define.amd?define(["nc-lightapp-front","react","react-dom"],t):"object"==typeof exports?exports["uapbd/taxinfo/taxregion/card/index"]=t(require("nc-lightapp-front"),require("react"),require("react-dom")):e["uapbd/taxinfo/taxregion/card/index"]=t(e["nc-lightapp-front"],e.React,e.ReactDOM)}(window,function(e,t,a){return function(e){var t={};function a(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,a),o.l=!0,o.exports}return a.m=e,a.c=t,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)a.d(n,o,function(t){return e[t]}.bind(null,o));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="../../../../",a(a.s=179)}({1:function(t,a){t.exports=e},165:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n,o,r=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),s=a(2),i=u(s),l=(u(a(3)),a(1));function u(e){return e&&e.__esModule?e:{default:e}}function c(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var d=l.base.NCAffix,p=(l.base.NCPopconfirm,l.base.NCFormControl,l.base.NCBackBtn),f=l.high.PrintOutput,b=l.cardCache.addCache,m=l.cardCache.getCacheById,h=l.cardCache.updateCache,g=l.cardCache.getCurrentLastId,v=l.cardCache.getNextId,T=l.cardCache.deleteCacheById,E="upabd.taxinfo.taxregion.data",y="taxregion",k="taxregionb",C="10140TAXRE_card",A="search",j="/nccloud/uapbd/taxregion/saveTaxregion.do",R="pk_taxregion",I="/nccloud/uapbd/taxregion/printTaxregion.do",x=null;function X(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2,a=e.getUrlParam("status"),n=[],o=[];"edit"==a||"add"==a?(o=["Edit","Add","back","Delete","Refresh","Enable","Disable","Print","Output"],n=["Save","Cancel","AddLine","DelLine"],"add"==a?n.push("SaveAdd"):o.push("SaveAdd"),e.button.setButtonVisible(o,!1),e.button.setButtonVisible(n,!0),e.cardPagination.setCardPaginationVisible("cardPaginationBtn",!1)):(o=["Save","Cancel","AddLine","DelLine","SaveAdd"],n=["Add","Edit","Delete","back","Refresh","Print","Output"],2==t?(n.push("Disable"),o.push("Enable")):(n.push("Enable"),o.push("Disable")),e.button.setButtonVisible(o,!1),e.button.setButtonVisible(n,!0),e.cardPagination.setCardPaginationVisible("cardPaginationBtn",!0)),e.form.setFormStatus(y,a),e.cardTable.setStatus(k,"edit"==a||"add"==a?"edit":"browse"),window.onbeforeunload="add"!=a&&"edit"!=a?null:function(){return""}}var B=(n=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var a=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return o.call(a),a.formId=y,a.searchId=A,a.tableId=k,a.state={pk_org:"",title_code:"",totalcount:0,applycount:0,backVisible:!0,json:{}},a}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,s.Component),r(t,[{key:"modifierMeta",value:function(e,t){var a=this,n=e.getUrlParam("status");t[y].status=n,t[k].status=n,console.log(this),t[k].items.map(function(e){"pk_region"==e.attrcode&&(e.queryCondition=function(){return{pk_country:x.value}})}),t["taxregionb&childform1"].items.find(function(e){return"pk_region"==e.attrcode}).queryCondition=function(){return{pk_country:x.value}},t["taxregionb&childform2"].items.find(function(e){return"pk_region"==e.attrcode}).queryCondition=function(){return{pk_country:x.value}};var o={itemtype:"customer",attrcode:"opr",label:this.state.json?this.state.json["10140TAXRE-000000"]:"10140TAXRE-000000",visible:!0,className:"table-opr",width:200,fixed:"right",render:function(t,n,o){return"browse"===e.cardTable.getStatus(k)?i.default.createElement("span",{onClick:function(){e.cardTable.toggleRowView(k,n)}}," ",a.state.json?a.state.json["10140TAXRE-000023"]:"10140TAXRE-000023"):i.default.createElement("div",{className:"currency-opr-col"},i.default.createElement("span",{className:"currency-opr-del",onClick:function(t){e.cardTable.openModel(k,"edit",n,o),t.stopPropagation()}},a.state.json?a.state.json["10140TAXRE-000024"]:"10140TAXRE-000024"),"  ",i.default.createElement("span",{className:"currency-opr-del",onClick:function(t){e.cardTable.delRowsByIndex(k,o),t.stopPropagation()}},a.state.json?a.state.json["10140TAXRE-000025"]:"10140TAXRE-000025"))}};return t[k].items.push(o),t}},{key:"componentDidMount",value:function(){var e=this;this.props.MultiInit.getMultiLang({moduleId:"10140TAXRE",domainName:"uapbd",callback:function(t){e.setState({json:t},function(){e.initTemplate(e.props)})}}),X(this.props),this.updateCardTableBtnStatus();var t=this.props.getUrlParam("status");if("add"!=t){var a=this.props.getUrlParam("id");a&&"undefined"!=a&&this.getdata(a)}else this.setDefaultValue();"add"!=t&&"edit"!=t||this.setState({backVisible:!1})}},{key:"componentWillUnmount",value:function(){x=null}},{key:"output",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=[];t.push(this.props.getUrlParam("id")),""!=e&&(0,l.print)("pdf",I,{funcode:"10140TAXRE",nodekey:"card",oids:t,outputType:e})}},{key:"cancelSureEvent",value:function(){var e=this;if("add"===this.props.getUrlParam("status")){var t=g(E);this.getDataForCache(t,function(){e.props.pushTo("/card",{status:"browse",id:e.props.getUrlParam("id")}),e.props.form.setFormStatus(e.formId,"browse"),e.props.cardTable.setStatus(e.tableId,"browse")})}if("edit"===this.props.getUrlParam("status")){this.props.form.cancel(this.formId),this.props.cardTable.resetTableData(this.tableId),this.props.pushTo("/card",{status:"browse",id:this.props.getUrlParam("id")});var a=this.props.form.getFormItemsValue(this.formId,"enablestate");X(this.props,a.value)}this.setState({backVisible:!0})}},{key:"afterEvent",value:function(e,t,a,n,o){if("pk_country"==a&&n.value!=o.value){var r=e.meta.getMeta();r[k].items.map(function(e){"pk_region"==e.attrcode&&(e.queryCondition=function(){return{pk_country:n.value}})}),r["taxregionb&childform1"].items.find(function(e){return"pk_region"==e.attrcode}).queryCondition=function(){return{pk_country:n.value}},r["taxregionb&childform2"].items.find(function(e){return"pk_region"==e.attrcode}).queryCondition=function(){return{pk_country:n.value}}}}},{key:"onCardTableAfterEvent",value:function(e,t,a,n,o,r,s){if(console.log(o),console.log(s),o[0].newvalue.value!=o[0].oldvalue.value){var i={};i.value=s.values.pk_region.value,i.display=n.refname,e.cardTable.setValByKeyAndIndex(this.tableId,r,"pk_region.name",i),s.values.pk_region.display=n.refcode}}},{key:"getDataForCache",value:function(e,t){if(e){var a=m(e,E);if(a?(this.props.form.setAllFormValue(c({},y,a.head[y])),a.body&&a.body[k]?this.props.cardTable.setTableData(k,a.body[k]):this.props.cardTable.setTableData(k,{rows:[]}),this.props.setUrlParam(e)):(this.getdata(e),this.props.setUrlParam(e)),t&&"function"==typeof t&&t.call(this),a){var n=a.head[y].rows[0].values.enablestate.value;X(this.props,n)}}else this.props.pushTo("/list",{})}},{key:"updateCardTableBtnStatus",value:function(){this.props.cardTable.getCheckedRows(this.tableId).length>0?this.props.button.setButtonDisabled(["DelLine"],!1):this.props.button.setButtonDisabled(["DelLine"],!0)}},{key:"changeEnableClick",value:function(){var e=this;(0,l.ajax)({url:"/nccloud/uapbd/taxregion/changeEnableTaxregion.do",data:{id:this.props.getUrlParam("id")},success:function(t){e.getdata(e.props.getUrlParam("id"),function(){e.enableClick?(0,l.toast)({color:"success",title:e.state.json["10140TAXRE-000020"]}):(0,l.toast)({color:"success",title:e.state.json["10140TAXRE-000021"]})})}})}},{key:"render",value:function(){var e=this.props,t=e.cardTable,a=e.form,n=e.button,o=e.modal,r=e.cardPagination.createCardPagination,s=a.createForm,l=t.createCardTable,u=n.createButtonApp,c=o.createModal,b=this.props.getUrlParam("status");return i.default.createElement("div",{className:"nc-bill-card"},i.default.createElement("div",{className:"nc-bill-top-area"},i.default.createElement(d,null,i.default.createElement("div",{className:"nc-bill-header-area"},i.default.createElement(p,{className:"title-search-detail",style:{display:this.state.backVisible?"inline":"none"},onClick:this.buttonClick.bind(this,this.props,"Back")}),i.default.createElement("div",{className:"header-title-search-area"},i.default.createElement("h2",{className:"title-search-detail"},this.state.json?this.state.json["10140TAXRE-000029"]:"10140TAXRE-000029","browse"==b?"："+this.state.title_code:"")),i.default.createElement("div",{className:"header-button-area"},u({area:"header-action",onButtonClick:this.buttonClick.bind(this)}),r({handlePageInfoChange:this.pageInfoClick.bind(this),dataSource:E})))),i.default.createElement("div",{className:"nc-bill-form-area"},s(this.formId,{onAfterEvent:this.afterEvent.bind(this)}))),i.default.createElement("div",{className:"nc-bill-bottom-area"},i.default.createElement("div",{className:"nc-bill-table-area"},l(this.tableId,{tableHead:this.getTableHead.bind(this),modelSave:this.modelSave.bind(this),onAfterEvent:this.onCardTableAfterEvent.bind(this),showIndex:!0,showCheck:!0,onSelected:this.updateCardTableBtnStatus.bind(this),onSelectedAll:this.updateCardTableBtnStatus.bind(this)}))),c("delete",{title:this.state.json?this.state.json["10140TAXRE-000004"]:"10140TAXRE-000004",content:this.state.json?this.state.json["10140TAXRE-000005"]:"10140TAXRE-000005",beSureBtnClick:this.delConfirm.bind(this)}),c("cancel",{title:this.state.json?this.state.json["10140TAXRE-000008"]:"10140TAXRE-000008",content:this.state.json?this.state.json["10140TAXRE-000009"]:"10140TAXRE-000009",beSureBtnClick:this.cancelSureEvent.bind(this)}),c("enable",{title:this.state.json?this.state.json["10140TAXRE-000014"]:"10140TAXRE-000014",content:this.state.json?this.state.json["10140TAXRE-000015"]:"10140TAXRE-000015",beSureBtnClick:this.changeEnableClick.bind(this)}),c("disable",{title:this.state.json?this.state.json["10140TAXRE-000016"]:"10140TAXRE-000016",content:this.state.json?this.state.json["10140TAXRE-000017"]:"10140TAXRE-000017",beSureBtnClick:this.changeEnableClick.bind(this)}),i.default.createElement(f,{ref:"printOutput",url:I,data:{funcode:"10140TAXRE",nodekey:"card",oids:this.state.pks,outputType:"output"}}))}}]),t}(),o=function(){var e=this;this.initTemplate=function(t){t.createUIDom({pagecode:C},function(a){if(a){if(a.template){var n=a.template;e.modifierMeta(t,n),t.meta.setMeta(n)}if(a.button){var o=a.button;t.button.setButtons(o),X(t)}}})},this.setDefaultValue=function(){e.props.form.setFormItemsValue(e.formId,{bill_status:{value:"0",display:e.state.json["10140TAXRE-000001"]}}),e.props.form.setFormItemsValue(e.formId,{enablestate:{value:"2",display:e.state.json["10140TAXRE-000002"]}}),e.props.form.setFormItemsValue(e.formId,{dataoriginflag:{value:"0",display:e.state.json["10140TAXRE-000003"]}})},this.buttonClick=function(t,a){switch(a){case"Add":t.form.EmptyAllFormValue(e.formId),t.cardTable.setTableData(e.tableId,{rows:[]}),t.pushTo("/card",{status:"add"}),e.setDefaultValue(),X(e.props),e.setState({backVisible:!1});break;case"Edit":t.pushTo("/card",{status:"edit",id:t.getUrlParam("id")}),X(e.props);var n=e.props.form.getFormItemsValue(e.formId,"pk_country"),o=t.meta.getMeta();o[k].items.map(function(e){"pk_region"==e.attrcode&&(e.queryCondition=function(){return{pk_country:n.value}})}),o["taxregionb&childform1"].items.find(function(e){return"pk_region"==e.attrcode}).queryCondition=function(){return{pk_country:x.value}},o["taxregionb&childform2"].items.find(function(e){return"pk_region"==e.attrcode}).queryCondition=function(){return{pk_country:x.value}},e.setState({backVisible:!1});break;case"Delete":(0,l.promptBox)({color:"warning",title:e.state.json["10140TAXRE-000004"],content:e.state.json["10140TAXRE-000005"],noFooter:!1,noCancelBtn:!1,beSureBtnName:e.state.json["10140TAXRE-000006"],cancelBtnName:e.state.json["10140TAXRE-000007"],beSureBtnClick:e.delConfirm.bind(e)});break;case"Back":t.pushTo("/list",{});break;case"Save":e.saveClick();break;case"Cancel":(0,l.promptBox)({color:"warning",title:e.state.json["10140TAXRE-000008"],content:e.state.json["10140TAXRE-000009"],noFooter:!1,noCancelBtn:!1,beSureBtnName:e.state.json["10140TAXRE-000006"],cancelBtnName:e.state.json["10140TAXRE-000007"],beSureBtnClick:e.cancelSureEvent.bind(e)});break;case"AddLine":var r=[e.state.json["10140TAXRE-000010"],e.state.json["10140TAXRE-000011"],e.state.json["10140TAXRE-000012"]],s=!0;e.props.form.getFormItemsValue(e.formId,["pk_country","code","name"]).forEach(function(e,t){null!=e.value&&""!=e.value||(s=!1)&&(0,l.toast)({color:"warning",content:r[t]})}),s&&(t.cardTable.addRow(e.tableId),X(e.props));break;case"DelLine":var i=[];t.cardTable.getCheckedRows(e.tableId).forEach(function(e){i.push(e.index)}),t.cardTable.delRowsByIndex(e.tableId,i);break;case"Refresh":e.getdata(e.props.getUrlParam("id"),function(){(0,l.toast)({title:e.state.json["10140TAXRE-000013"],color:"success"})});break;case"Print":e.output("print");break;case"Output":var u=[];u.push(e.props.getUrlParam("id")),e.setState({pks:u},function(){e.refs.printOutput.open()});break;case"Enable":e.enableClick=!0,(0,l.promptBox)({color:"warning",title:e.state.json["10140TAXRE-000014"],content:e.state.json["10140TAXRE-000015"],noFooter:!1,noCancelBtn:!1,beSureBtnName:e.state.json["10140TAXRE-000006"],cancelBtnName:e.state.json["10140TAXRE-000007"],beSureBtnClick:e.changeEnableClick.bind(e)});break;case"Disable":e.enableClick=!1,(0,l.promptBox)({color:"warning",title:e.state.json["10140TAXRE-000016"],content:e.state.json["10140TAXRE-000017"],noFooter:!1,noCancelBtn:!1,beSureBtnName:e.state.json["10140TAXRE-000006"],cancelBtnName:e.state.json["10140TAXRE-000007"],beSureBtnClick:e.changeEnableClick.bind(e)});break;case"SaveAdd":e.saveClick(!0)}},this.pageInfoClick=function(t,a){e.getDataForCache(a)},this.getdata=function(t,a){var n={pk:t};(0,l.ajax)({url:"/nccloud/uapbd/taxregion/queryTaxregionCard.do",data:n,success:function(t){if(t.data.head){e.props.form.setAllFormValue(c({},e.formId,t.data.head[e.formId]));var n=t.data.head[e.formId].rows[0].values.code.value;e.setState({title_code:n});var o=t.data.head[e.formId].rows[0].values.enablestate.value;2==o?(e.props.button.setButtonVisible(["Disable"],!0),e.props.button.setButtonVisible(["Enable"],!1)):3==o&&(e.props.button.setButtonVisible(["Disable"],!1),e.props.button.setButtonVisible(["Enable"],!0)),X(e.props,o);var r=t.data.head[e.formId].rows[0].values.pk_country,s=e.props.meta.getMeta();s&&s[k]?(console.log("modifierMeta in getData"),s[k].items.map(function(e){"pk_region"==e.attrcode&&(e.queryCondition=function(){return{pk_country:r.value}})}),s["taxregionb&childform1"].items.find(function(e){return"pk_region"==e.attrcode}).queryCondition=function(){return{pk_country:r.value}},s["taxregionb&childform2"].items.find(function(e){return"pk_region"==e.attrcode}).queryCondition=function(){return{pk_country:r.value}},e.props.meta.setMeta(s)):x=r,h(R,t.data.head[y].rows[0].values[R].value,t.data,y,E)}if(t.data.body){e.props.cardTable.setTableData(e.tableId,t.data.body[e.tableId]);var i=e.props.cardTable.getNumberOfRows(e.tableId);e.props.cardTable.getAllRows(e.tableId);e.setState({applycount:0}),e.setState({totalcount:i})}else e.props.cardTable.setTableData(e.tableId,{rows:[]});var l;t.formulamsg&&t.formulamsg instanceof Array&&t.formulamsg.length>0&&e.props.dealFormulamsg(t.formulamsg,(c(l={},y,"form"),c(l,k,"cardTable"),l));a&&"function"==typeof a&&a.call(e)}})},this.saveClick=function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],a=e.props.createMasterChildData(C,e.formId,e.tableId);delete a.head[y].rows[0].values.pk_taxregions;var n=j;"edit"===e.props.getUrlParam("status")&&(n="/nccloud/uapbd/taxregion/updateTaxregion.do"),e.props.validateToSave(a,function(){(0,l.ajax)({url:n,data:a,success:function(a){var o=null;if(a.success){if(a.data&&!t){if(a.data.head&&a.data.head[e.formId]){e.props.form.setAllFormValue(c({},e.formId,a.data.head[e.formId])),o=a.data.head[e.formId].rows[0].values[R].value;var r=a.data.head[e.formId].rows[0].values.enablestate.value;2==r?(e.props.button.setButtonVisible(["Disable"],!0),e.props.button.setButtonVisible(["Enable"],!1)):3==r&&(e.props.button.setButtonVisible(["Disable"],!1),e.props.button.setButtonVisible(["Enable"],!0))}a.data.body&&a.data.body[e.tableId]&&e.props.cardTable.setTableData(e.tableId,a.data.body[e.tableId])}else o=a.data.head[e.formId].rows[0].values[R].value;t?(e.props.form.EmptyAllFormValue(e.formId),e.setDefaultValue()):(e.props.pushTo("/card",{status:"browse",id:o}),X(e.props),e.setState({backVisible:!0})),n==j?b(o,a.data,e.formId,E):h(R,a.data.head[y].rows[0].values[R].value,a.data,y,E),(0,l.toast)({content:e.state.json["10140TAXRE-000018"],color:"success"})}}})},c({head:y},k,"cardTable"))},this.delConfirm=function(){(0,l.ajax)({url:"/nccloud/uapbd/taxregion/delTaxregion.do",data:{id:e.props.getUrlParam("id"),ts:e.props.form.getFormItemsValue(e.formId,"ts").value},success:function(t){if(t){var a=e.props.getUrlParam("id"),n=v(a,E);T(R,a,E),e.getDataForCache(n,function(){(0,l.toast)({color:"success",title:e.state.json["10140TAXRE-000019"]})})}}})},this.modelSave=function(t){t.cardTable.closeModel(e.tableId),e.saveClick()},this.getButtonNames=function(e){return"edit"===e||"add"===e||"save"===e?"main-button":"secondary - button"},this.getTableHead=function(){var t=e.props.button.createButtonApp,a=(e.props.button.getButtons(),e.props.getUrlParam("status"));return i.default.createElement("div",{className:"shoulder-definition-area"},i.default.createElement("div",{className:"definition-search"},"browse"==a?i.default.createElement("div",null,i.default.createElement("span",{className:"definition-search-title"},e.state.json?e.state.json["10140TAXRE-000026"]:"10140TAXRE-000026"," | ",e.state.json?e.state.json["10140TAXRE-000027"]:"10140TAXRE-000027","："),i.default.createElement("span",{className:"count"},e.state.totalcount),i.default.createElement("span",null,e.state.json?e.state.json["10140TAXRE-000028"]:"10140TAXRE-000028")):i.default.createElement("span",{className:"definition-search-title"})),i.default.createElement("div",{className:"definition-icons",style:{padding:"0px"}},t({area:"body-action",onButtonClick:e.buttonClick.bind(e)}),e.props.cardTable.createBrowseIcons(e.tableId,{iconArr:["close","open","max","setCol"],maxDestAreaId:"nc-bill-card"})))}},n);B=(0,l.createPage)({billinfo:{billtype:"card",pagecode:C,headcode:y,bodycode:k},initTemplate:[]})(B),t.default=B},179:function(e,t,a){e.exports=a(165)},2:function(e,a){e.exports=t},3:function(e,t){e.exports=a}})});
//# sourceMappingURL=index.3a173af3.js.map