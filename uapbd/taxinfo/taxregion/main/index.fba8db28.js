!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("nc-lightapp-front"),require("react"),require("react-dom")):"function"==typeof define&&define.amd?define(["nc-lightapp-front","react","react-dom"],e):"object"==typeof exports?exports["uapbd/taxinfo/taxregion/main/index"]=e(require("nc-lightapp-front"),require("react"),require("react-dom")):t["uapbd/taxinfo/taxregion/main/index"]=e(t["nc-lightapp-front"],t.React,t.ReactDOM)}(window,function(t,e,a){return function(t){var e={};function a(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,a),o.l=!0,o.exports}return a.m=t,a.c=e,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},a.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)a.d(n,o,function(e){return t[e]}.bind(null,o));return n},a.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="../../../../",a(a.s=181)}({1:function(e,a){e.exports=t},165:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n,o,s=function(){function t(t,e){for(var a=0;a<e.length;a++){var n=e[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,a,n){return a&&t(e.prototype,a),n&&t(e,n),e}}(),r=a(2),i=c(r),l=(c(a(3)),a(1));function c(t){return t&&t.__esModule?t:{default:t}}function u(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}var d=l.base.NCAffix,p=(l.base.NCPopconfirm,l.base.NCFormControl,l.base.NCBackBtn),f=l.high.PrintOutput,b=l.cardCache.addCache,h=l.cardCache.getCacheById,m=l.cardCache.updateCache,g=l.cardCache.getCurrentLastId,v=l.cardCache.getNextId,T=l.cardCache.deleteCacheById,E="upabd.taxinfo.taxregion.data",k="taxregion",y="taxregionb",A="10140TAXRE_card",R="search",j="/nccloud/uapbd/taxregion/saveTaxregion.do",C="pk_taxregion",X="/nccloud/uapbd/taxregion/printTaxregion.do",w=null;function x(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2,a=t.getUrlParam("status"),n=[],o=[];"edit"==a||"add"==a?(o=["Edit","Add","back","Delete","Refresh","Enable","Disable","Print","Output"],n=["Save","Cancel","AddLine","DelLine"],"add"==a?n.push("SaveAdd"):o.push("SaveAdd"),t.button.setButtonVisible(o,!1),t.button.setButtonVisible(n,!0),t.cardPagination.setCardPaginationVisible("cardPaginationBtn",!1)):(o=["Save","Cancel","AddLine","DelLine","SaveAdd"],n=["Add","Edit","Delete","back","Refresh","Print","Output"],2==e?(n.push("Disable"),o.push("Enable")):(n.push("Enable"),o.push("Disable")),t.button.setButtonVisible(o,!1),t.button.setButtonVisible(n,!0),t.cardPagination.setCardPaginationVisible("cardPaginationBtn",!0)),t.form.setFormStatus(k,a),t.cardTable.setStatus(y,"edit"==a||"add"==a?"edit":"browse"),window.onbeforeunload="add"!=a&&"edit"!=a?null:function(){return""}}var B=(n=function(t){function e(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);var a=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return o.call(a),a.formId=k,a.searchId=R,a.tableId=y,a.state={pk_org:"",title_code:"",totalcount:0,applycount:0,backVisible:!0,json:{}},a}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,r.Component),s(e,[{key:"modifierMeta",value:function(t,e){var a=this,n=t.getUrlParam("status");e[k].status=n,e[y].status=n,console.log(this),e[y].items.map(function(t){"pk_region"==t.attrcode&&(t.queryCondition=function(){return{pk_country:w.value}})}),e["taxregionb&childform1"].items.find(function(t){return"pk_region"==t.attrcode}).queryCondition=function(){return{pk_country:w.value}},e["taxregionb&childform2"].items.find(function(t){return"pk_region"==t.attrcode}).queryCondition=function(){return{pk_country:w.value}};var o={itemtype:"customer",attrcode:"opr",label:this.state.json?this.state.json["10140TAXRE-000000"]:"10140TAXRE-000000",visible:!0,className:"table-opr",width:200,fixed:"right",render:function(e,n,o){return"browse"===t.cardTable.getStatus(y)?i.default.createElement("span",{onClick:function(){t.cardTable.toggleRowView(y,n)}}," ",a.state.json?a.state.json["10140TAXRE-000023"]:"10140TAXRE-000023"):i.default.createElement("div",{className:"currency-opr-col"},i.default.createElement("span",{className:"currency-opr-del",onClick:function(e){t.cardTable.openModel(y,"edit",n,o),e.stopPropagation()}},a.state.json?a.state.json["10140TAXRE-000024"]:"10140TAXRE-000024"),"  ",i.default.createElement("span",{className:"currency-opr-del",onClick:function(e){t.cardTable.delRowsByIndex(y,o),e.stopPropagation()}},a.state.json?a.state.json["10140TAXRE-000025"]:"10140TAXRE-000025"))}};return e[y].items.push(o),e}},{key:"componentDidMount",value:function(){var t=this;this.props.MultiInit.getMultiLang({moduleId:"10140TAXRE",domainName:"uapbd",callback:function(e){t.setState({json:e},function(){t.initTemplate(t.props)})}}),x(this.props),this.updateCardTableBtnStatus();var e=this.props.getUrlParam("status");if("add"!=e){var a=this.props.getUrlParam("id");a&&"undefined"!=a&&this.getdata(a)}else this.setDefaultValue();"add"!=e&&"edit"!=e||this.setState({backVisible:!1})}},{key:"componentWillUnmount",value:function(){w=null}},{key:"output",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",e=[];e.push(this.props.getUrlParam("id")),""!=t&&(0,l.print)("pdf",X,{funcode:"10140TAXRE",nodekey:"card",oids:e,outputType:t})}},{key:"cancelSureEvent",value:function(){var t=this;if("add"===this.props.getUrlParam("status")){var e=g(E);this.getDataForCache(e,function(){t.props.pushTo("/card",{status:"browse",id:t.props.getUrlParam("id")}),t.props.form.setFormStatus(t.formId,"browse"),t.props.cardTable.setStatus(t.tableId,"browse")})}if("edit"===this.props.getUrlParam("status")){this.props.form.cancel(this.formId),this.props.cardTable.resetTableData(this.tableId),this.props.pushTo("/card",{status:"browse",id:this.props.getUrlParam("id")});var a=this.props.form.getFormItemsValue(this.formId,"enablestate");x(this.props,a.value)}this.setState({backVisible:!0})}},{key:"afterEvent",value:function(t,e,a,n,o){if("pk_country"==a&&n.value!=o.value){var s=t.meta.getMeta();s[y].items.map(function(t){"pk_region"==t.attrcode&&(t.queryCondition=function(){return{pk_country:n.value}})}),s["taxregionb&childform1"].items.find(function(t){return"pk_region"==t.attrcode}).queryCondition=function(){return{pk_country:n.value}},s["taxregionb&childform2"].items.find(function(t){return"pk_region"==t.attrcode}).queryCondition=function(){return{pk_country:n.value}}}}},{key:"onCardTableAfterEvent",value:function(t,e,a,n,o,s,r){if(console.log(o),console.log(r),o[0].newvalue.value!=o[0].oldvalue.value){var i={};i.value=r.values.pk_region.value,i.display=n.refname,t.cardTable.setValByKeyAndIndex(this.tableId,s,"pk_region.name",i),r.values.pk_region.display=n.refcode}}},{key:"getDataForCache",value:function(t,e){if(t){var a=h(t,E);if(a?(this.props.form.setAllFormValue(u({},k,a.head[k])),a.body&&a.body[y]?this.props.cardTable.setTableData(y,a.body[y]):this.props.cardTable.setTableData(y,{rows:[]}),this.props.setUrlParam(t)):(this.getdata(t),this.props.setUrlParam(t)),e&&"function"==typeof e&&e.call(this),a){var n=a.head[k].rows[0].values.enablestate.value;x(this.props,n)}}else this.props.pushTo("/list",{})}},{key:"updateCardTableBtnStatus",value:function(){this.props.cardTable.getCheckedRows(this.tableId).length>0?this.props.button.setButtonDisabled(["DelLine"],!1):this.props.button.setButtonDisabled(["DelLine"],!0)}},{key:"changeEnableClick",value:function(){var t=this;(0,l.ajax)({url:"/nccloud/uapbd/taxregion/changeEnableTaxregion.do",data:{id:this.props.getUrlParam("id")},success:function(e){t.getdata(t.props.getUrlParam("id"),function(){t.enableClick?(0,l.toast)({color:"success",title:t.state.json["10140TAXRE-000020"]}):(0,l.toast)({color:"success",title:t.state.json["10140TAXRE-000021"]})})}})}},{key:"render",value:function(){var t=this.props,e=t.cardTable,a=t.form,n=t.button,o=t.modal,s=t.cardPagination.createCardPagination,r=a.createForm,l=e.createCardTable,c=n.createButtonApp,u=o.createModal,b=this.props.getUrlParam("status");return i.default.createElement("div",{className:"nc-bill-card"},i.default.createElement("div",{className:"nc-bill-top-area"},i.default.createElement(d,null,i.default.createElement("div",{className:"nc-bill-header-area"},i.default.createElement(p,{className:"title-search-detail",style:{display:this.state.backVisible?"inline":"none"},onClick:this.buttonClick.bind(this,this.props,"Back")}),i.default.createElement("div",{className:"header-title-search-area"},i.default.createElement("h2",{className:"title-search-detail"},this.state.json?this.state.json["10140TAXRE-000029"]:"10140TAXRE-000029","browse"==b?"："+this.state.title_code:"")),i.default.createElement("div",{className:"header-button-area"},c({area:"header-action",onButtonClick:this.buttonClick.bind(this)}),s({handlePageInfoChange:this.pageInfoClick.bind(this),dataSource:E})))),i.default.createElement("div",{className:"nc-bill-form-area"},r(this.formId,{onAfterEvent:this.afterEvent.bind(this)}))),i.default.createElement("div",{className:"nc-bill-bottom-area"},i.default.createElement("div",{className:"nc-bill-table-area"},l(this.tableId,{tableHead:this.getTableHead.bind(this),modelSave:this.modelSave.bind(this),onAfterEvent:this.onCardTableAfterEvent.bind(this),showIndex:!0,showCheck:!0,onSelected:this.updateCardTableBtnStatus.bind(this),onSelectedAll:this.updateCardTableBtnStatus.bind(this)}))),u("delete",{title:this.state.json?this.state.json["10140TAXRE-000004"]:"10140TAXRE-000004",content:this.state.json?this.state.json["10140TAXRE-000005"]:"10140TAXRE-000005",beSureBtnClick:this.delConfirm.bind(this)}),u("cancel",{title:this.state.json?this.state.json["10140TAXRE-000008"]:"10140TAXRE-000008",content:this.state.json?this.state.json["10140TAXRE-000009"]:"10140TAXRE-000009",beSureBtnClick:this.cancelSureEvent.bind(this)}),u("enable",{title:this.state.json?this.state.json["10140TAXRE-000014"]:"10140TAXRE-000014",content:this.state.json?this.state.json["10140TAXRE-000015"]:"10140TAXRE-000015",beSureBtnClick:this.changeEnableClick.bind(this)}),u("disable",{title:this.state.json?this.state.json["10140TAXRE-000016"]:"10140TAXRE-000016",content:this.state.json?this.state.json["10140TAXRE-000017"]:"10140TAXRE-000017",beSureBtnClick:this.changeEnableClick.bind(this)}),i.default.createElement(f,{ref:"printOutput",url:X,data:{funcode:"10140TAXRE",nodekey:"card",oids:this.state.pks,outputType:"output"}}))}}]),e}(),o=function(){var t=this;this.initTemplate=function(e){e.createUIDom({pagecode:A},function(a){if(a){if(a.template){var n=a.template;t.modifierMeta(e,n),e.meta.setMeta(n)}if(a.button){var o=a.button;e.button.setButtons(o),x(e)}}})},this.setDefaultValue=function(){t.props.form.setFormItemsValue(t.formId,{bill_status:{value:"0",display:t.state.json["10140TAXRE-000001"]}}),t.props.form.setFormItemsValue(t.formId,{enablestate:{value:"2",display:t.state.json["10140TAXRE-000002"]}}),t.props.form.setFormItemsValue(t.formId,{dataoriginflag:{value:"0",display:t.state.json["10140TAXRE-000003"]}})},this.buttonClick=function(e,a){switch(a){case"Add":e.form.EmptyAllFormValue(t.formId),e.cardTable.setTableData(t.tableId,{rows:[]}),e.pushTo("/card",{status:"add"}),t.setDefaultValue(),x(t.props),t.setState({backVisible:!1});break;case"Edit":e.pushTo("/card",{status:"edit",id:e.getUrlParam("id")}),x(t.props);var n=t.props.form.getFormItemsValue(t.formId,"pk_country"),o=e.meta.getMeta();o[y].items.map(function(t){"pk_region"==t.attrcode&&(t.queryCondition=function(){return{pk_country:n.value}})}),o["taxregionb&childform1"].items.find(function(t){return"pk_region"==t.attrcode}).queryCondition=function(){return{pk_country:w.value}},o["taxregionb&childform2"].items.find(function(t){return"pk_region"==t.attrcode}).queryCondition=function(){return{pk_country:w.value}},t.setState({backVisible:!1});break;case"Delete":(0,l.promptBox)({color:"warning",title:t.state.json["10140TAXRE-000004"],content:t.state.json["10140TAXRE-000005"],noFooter:!1,noCancelBtn:!1,beSureBtnName:t.state.json["10140TAXRE-000006"],cancelBtnName:t.state.json["10140TAXRE-000007"],beSureBtnClick:t.delConfirm.bind(t)});break;case"Back":e.pushTo("/list",{});break;case"Save":t.saveClick();break;case"Cancel":(0,l.promptBox)({color:"warning",title:t.state.json["10140TAXRE-000008"],content:t.state.json["10140TAXRE-000009"],noFooter:!1,noCancelBtn:!1,beSureBtnName:t.state.json["10140TAXRE-000006"],cancelBtnName:t.state.json["10140TAXRE-000007"],beSureBtnClick:t.cancelSureEvent.bind(t)});break;case"AddLine":var s=[t.state.json["10140TAXRE-000010"],t.state.json["10140TAXRE-000011"],t.state.json["10140TAXRE-000012"]],r=!0;t.props.form.getFormItemsValue(t.formId,["pk_country","code","name"]).forEach(function(t,e){null!=t.value&&""!=t.value||(r=!1)&&(0,l.toast)({color:"warning",content:s[e]})}),r&&(e.cardTable.addRow(t.tableId),x(t.props));break;case"DelLine":var i=[];e.cardTable.getCheckedRows(t.tableId).forEach(function(t){i.push(t.index)}),e.cardTable.delRowsByIndex(t.tableId,i);break;case"Refresh":t.getdata(t.props.getUrlParam("id"),function(){(0,l.toast)({title:t.state.json["10140TAXRE-000013"],color:"success"})});break;case"Print":t.output("print");break;case"Output":var c=[];c.push(t.props.getUrlParam("id")),t.setState({pks:c},function(){t.refs.printOutput.open()});break;case"Enable":t.enableClick=!0,(0,l.promptBox)({color:"warning",title:t.state.json["10140TAXRE-000014"],content:t.state.json["10140TAXRE-000015"],noFooter:!1,noCancelBtn:!1,beSureBtnName:t.state.json["10140TAXRE-000006"],cancelBtnName:t.state.json["10140TAXRE-000007"],beSureBtnClick:t.changeEnableClick.bind(t)});break;case"Disable":t.enableClick=!1,(0,l.promptBox)({color:"warning",title:t.state.json["10140TAXRE-000016"],content:t.state.json["10140TAXRE-000017"],noFooter:!1,noCancelBtn:!1,beSureBtnName:t.state.json["10140TAXRE-000006"],cancelBtnName:t.state.json["10140TAXRE-000007"],beSureBtnClick:t.changeEnableClick.bind(t)});break;case"SaveAdd":t.saveClick(!0)}},this.pageInfoClick=function(e,a){t.getDataForCache(a)},this.getdata=function(e,a){var n={pk:e};(0,l.ajax)({url:"/nccloud/uapbd/taxregion/queryTaxregionCard.do",data:n,success:function(e){if(e.data.head){t.props.form.setAllFormValue(u({},t.formId,e.data.head[t.formId]));var n=e.data.head[t.formId].rows[0].values.code.value;t.setState({title_code:n});var o=e.data.head[t.formId].rows[0].values.enablestate.value;2==o?(t.props.button.setButtonVisible(["Disable"],!0),t.props.button.setButtonVisible(["Enable"],!1)):3==o&&(t.props.button.setButtonVisible(["Disable"],!1),t.props.button.setButtonVisible(["Enable"],!0)),x(t.props,o);var s=e.data.head[t.formId].rows[0].values.pk_country,r=t.props.meta.getMeta();r&&r[y]?(console.log("modifierMeta in getData"),r[y].items.map(function(t){"pk_region"==t.attrcode&&(t.queryCondition=function(){return{pk_country:s.value}})}),r["taxregionb&childform1"].items.find(function(t){return"pk_region"==t.attrcode}).queryCondition=function(){return{pk_country:s.value}},r["taxregionb&childform2"].items.find(function(t){return"pk_region"==t.attrcode}).queryCondition=function(){return{pk_country:s.value}},t.props.meta.setMeta(r)):w=s,m(C,e.data.head[k].rows[0].values[C].value,e.data,k,E)}if(e.data.body){t.props.cardTable.setTableData(t.tableId,e.data.body[t.tableId]);var i=t.props.cardTable.getNumberOfRows(t.tableId);t.props.cardTable.getAllRows(t.tableId);t.setState({applycount:0}),t.setState({totalcount:i})}else t.props.cardTable.setTableData(t.tableId,{rows:[]});var l;e.formulamsg&&e.formulamsg instanceof Array&&e.formulamsg.length>0&&t.props.dealFormulamsg(e.formulamsg,(u(l={},k,"form"),u(l,y,"cardTable"),l));a&&"function"==typeof a&&a.call(t)}})},this.saveClick=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],a=t.props.createMasterChildData(A,t.formId,t.tableId);delete a.head[k].rows[0].values.pk_taxregions;var n=j;"edit"===t.props.getUrlParam("status")&&(n="/nccloud/uapbd/taxregion/updateTaxregion.do"),t.props.validateToSave(a,function(){(0,l.ajax)({url:n,data:a,success:function(a){var o=null;if(a.success){if(a.data&&!e){if(a.data.head&&a.data.head[t.formId]){t.props.form.setAllFormValue(u({},t.formId,a.data.head[t.formId])),o=a.data.head[t.formId].rows[0].values[C].value;var s=a.data.head[t.formId].rows[0].values.enablestate.value;2==s?(t.props.button.setButtonVisible(["Disable"],!0),t.props.button.setButtonVisible(["Enable"],!1)):3==s&&(t.props.button.setButtonVisible(["Disable"],!1),t.props.button.setButtonVisible(["Enable"],!0))}a.data.body&&a.data.body[t.tableId]&&t.props.cardTable.setTableData(t.tableId,a.data.body[t.tableId])}else o=a.data.head[t.formId].rows[0].values[C].value;e?(t.props.form.EmptyAllFormValue(t.formId),t.setDefaultValue()):(t.props.pushTo("/card",{status:"browse",id:o}),x(t.props),t.setState({backVisible:!0})),n==j?b(o,a.data,t.formId,E):m(C,a.data.head[k].rows[0].values[C].value,a.data,k,E),(0,l.toast)({content:t.state.json["10140TAXRE-000018"],color:"success"})}}})},u({head:k},y,"cardTable"))},this.delConfirm=function(){(0,l.ajax)({url:"/nccloud/uapbd/taxregion/delTaxregion.do",data:{id:t.props.getUrlParam("id"),ts:t.props.form.getFormItemsValue(t.formId,"ts").value},success:function(e){if(e){var a=t.props.getUrlParam("id"),n=v(a,E);T(C,a,E),t.getDataForCache(n,function(){(0,l.toast)({color:"success",title:t.state.json["10140TAXRE-000019"]})})}}})},this.modelSave=function(e){e.cardTable.closeModel(t.tableId),t.saveClick()},this.getButtonNames=function(t){return"edit"===t||"add"===t||"save"===t?"main-button":"secondary - button"},this.getTableHead=function(){var e=t.props.button.createButtonApp,a=(t.props.button.getButtons(),t.props.getUrlParam("status"));return i.default.createElement("div",{className:"shoulder-definition-area"},i.default.createElement("div",{className:"definition-search"},"browse"==a?i.default.createElement("div",null,i.default.createElement("span",{className:"definition-search-title"},t.state.json?t.state.json["10140TAXRE-000026"]:"10140TAXRE-000026"," | ",t.state.json?t.state.json["10140TAXRE-000027"]:"10140TAXRE-000027","："),i.default.createElement("span",{className:"count"},t.state.totalcount),i.default.createElement("span",null,t.state.json?t.state.json["10140TAXRE-000028"]:"10140TAXRE-000028")):i.default.createElement("span",{className:"definition-search-title"})),i.default.createElement("div",{className:"definition-icons",style:{padding:"0px"}},e({area:"body-action",onButtonClick:t.buttonClick.bind(t)}),t.props.cardTable.createBrowseIcons(t.tableId,{iconArr:["close","open","max","setCol"],maxDestAreaId:"nc-bill-card"})))}},n);B=(0,l.createPage)({billinfo:{billtype:"card",pagecode:A,headcode:k,bodycode:y},initTemplate:[]})(B),e.default=B},166:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n,o,s=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(t[n]=a[n])}return t},r=function(){function t(t,e){for(var a=0;a<e.length;a++){var n=e[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,a,n){return a&&t(e.prototype,a),n&&t(e,n),e}}(),i=a(2),l=u(i),c=(u(a(3)),a(1));function u(t){return t&&t.__esModule?t:{default:t}}var d=c.base.NCPopconfirm,p=c.base.NCCheckbox,f=(c.base.NCIcon,c.base.NCTabs.NCTabPane,c.high.PrintOutput),b="10140TAXRE_list",h="taxregionsearch",m="taxregion",g="pk_taxregion",v="/nccloud/uapbd/taxregion/queryTaxregionList.do",T="/nccloud/uapbd/taxregion/delTaxregion.do",E="/nccloud/uapbd/taxregion/printTaxregion.do",k=(n=function(t){function e(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);var a=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return o.call(a),a.searchId=h,a.tableId=m,a.selectedRowRecord=null,a.state={showOffDisable:!1,isShowOff:!1},a.searchVal=null,a.changeEnableInfo={title:"",content:""},a}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,i.Component),r(e,[{key:"modifierMeta",value:function(t,e){var a=this;return e[h].items=e[h].items.map(function(t,e){return t.col="3",t}),e[h].items.find(function(t){return"pk_country"==t.attrcode}).isMultiSelectedEnabled=!0,e[m].items=e[m].items.map(function(e,a){return e.width=150,"project_code"==e.attrcode&&(e.render=function(e,a,n){return l.default.createElement("span",{style:{textDecoration:"underline",cursor:"pointer"},onClick:function(){var e=t.search.getAllSearchData(h);c.cacheTools.set("searchParams",e),t.pushTo("/card",{status:"browse",id:a[g].value})}},a&&a.project_code&&a.project_code.value)}),e}),e[m].items.push({itemtype:"customer",attrcode:"opr",label:this.state.json?this.state.json["10140TAXRE-000000"]:"10140TAXRE-000000",width:200,fixed:"right",className:"table-opr",visible:!0,render:function(e,n,o){return l.default.createElement("span",null,l.default.createElement("span",{style:{cursor:"pointer"},onClick:function(){t.pushTo("/card",{status:"edit",id:n[g].value})}},a.state.json?a.state.json["10140TAXRE-000038"]:"10140TAXRE-000038"),l.default.createElement("span",null,"   "),l.default.createElement(d,{trigger:"click",placement:"top",content:a.state.json?a.state.json["10140TAXRE-000031"]:"10140TAXRE-000031",onClose:function(){var e=n[g].value;(0,c.ajax)({url:T,data:{id:n[g].value,ts:n.ts.value},success:function(n){n.success&&((0,c.toast)({color:"success",content:a.state.json["10140TAXRE-000032"]}),(0,t.table.deleteCacheId)(m,e),t.table.deleteTableRowsByIndex(m,o))}})}},l.default.createElement("span",{style:{cursor:"pointer"}},a.state.json?a.state.json["10140TAXRE-000025"]:"10140TAXRE-000025")))}}),e}},{key:"componentDidMount",value:function(){var t=this;this.props.MultiInit.getMultiLang({moduleId:"10140TAXRE",domainName:"uapbd",callback:function(e,a,n){a&&t.setState({json:e,inlt:n},function(){t.initTemplate(t.props)})}});var e={Enable:!0,Disable:!0};0==this.props.table.getAllTableData(this.tableId).rows.length&&(e.Print=!0,e.Output=!0),this.props.button.setButtonDisabled(e)}},{key:"buttonClick",value:function(t,e){var a=this;switch(e){case"Add":var n=t.search.getAllSearchData(h);c.cacheTools.set("searchParams",n),t.pushTo("/card",{status:"add"});break;case"Edit":if(n=t.search.getAllSearchData(h),c.cacheTools.set("searchParams",n),null==this.selectedRowRecord)return void(0,c.toast)({content:this.state.json["10140TAXRE-000033"],color:"warning"});t.pushTo("/card",{status:"edit",id:this.selectedRowRecord[g].value});break;case"Refresh":this.refreshAction(t,!0);break;case"Delete":(0,c.promptBox)({color:"warning",title:this.state.json["10140TAXRE-000004"],content:this.state.json["10140TAXRE-000005"],noFooter:!1,noCancelBtn:!1,beSureBtnName:this.state.json["10140TAXRE-000006"],cancelBtnName:this.state.json["10140TAXRE-000007"],beSureBtnClick:this.deleteAction.bind(this)});break;case"Print":this.output("print");break;case"Enable":(0,c.promptBox)({color:"warning",title:this.state.json["10140TAXRE-000014"],content:this.state.json["10140TAXRE-000015"],noFooter:!1,noCancelBtn:!1,beSureBtnName:this.state.json["10140TAXRE-000006"],cancelBtnName:this.state.json["10140TAXRE-000007"],beSureBtnClick:this.changeEnableClick.bind(this)});break;case"Disable":(0,c.promptBox)({color:"warning",title:this.state.json["10140TAXRE-000016"],content:this.state.json["10140TAXRE-000017"],noFooter:!1,noCancelBtn:!1,beSureBtnName:this.state.json["10140TAXRE-000006"],cancelBtnName:this.state.json["10140TAXRE-000007"],beSureBtnClick:this.changeEnableClick.bind(this)});break;case"Output":var o=[];this.props.table.getAllTableData(m).rows.forEach(function(t){o.push(t.values[g].value)}),this.setState({pks:o},function(){a.refs.printOutput.open()})}}},{key:"changeEnableClick",value:function(){var t=this,e=this.selectedRowRecord[g].value;(0,c.ajax)({url:"/nccloud/uapbd/taxregion/changeEnableTaxregion.do",data:{id:e},success:function(e){if(e.data){var a=t.props.table.getAllTableData(t.tableId);a.rows.forEach(function(a){a.values[g].value==e.data.pk&&(a.values.enablestate={value:e.data.enableState,display:2==e.data.enableState?t.state.json["10140TAXRE-000002"]:t.state.json["10140TAXRE-000034"]},a.values.modifier={value:e.data.modifier,display:e.data.modifierName},a.values.modifiedtime={value:e.data.modifyTime,display:e.data.modifyTime})}),t.props.table.setAllTableData(t.tableId,a)}2==e.data.enableState?(t.props.button.setButtonDisabled({Enable:!0,Disable:!1}),(0,c.toast)({color:"success",title:t.state.json["10140TAXRE-000020"]})):(t.props.button.setButtonDisabled({Enable:!1,Disable:!0}),(0,c.toast)({color:"success",title:t.state.json["10140TAXRE-000021"]}))}})}},{key:"output",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",e=[];this.props.table.getAllTableData(m).rows.forEach(function(t){e.push(t.values[g].value)}),""!=t&&(0,c.print)("pdf",E,{funcode:"10140TAXRE",nodekey:"list",oids:e,outputType:t})}},{key:"onRowClick",value:function(t,e,a,n){this.selectedRowRecord=a,2==a.enablestate.value?t.button.setButtonDisabled({Enable:!0,Disable:!1}):t.button.setButtonDisabled({Enable:!1,Disable:!0})}},{key:"getData",value:function(t,e){var a=this,n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],o=arguments[3],r=this.props.search.getQueryInfo("taxregionsearch"),i=r.oid,l=s({},r,{pageInfo:{pageIndex:0,pageSize:10,total:0,totalPage:0},pagecode:b,queryAreaCode:h,oid:i,queryType:"tree",showDisable:e});(0,c.ajax)({url:v,data:l,success:function(t){if(a.props.button.setButtonDisabled({Enable:!0,Disable:!0}),t.data){var e=[];t.data[m].rows.forEach(function(t){e.push(t.values[g].value)}),a.props.button.setButtonDisabled({Print:!1,Output:!1}),t.data[m].allpks=e,a.props.table.setAllTableData(a.tableId,t.data[m]);var s=e.length,r=a.state.inlt;n&&(0,c.toast)({title:a.state.json["10140TAXRE-000035"],content:r.get("10140TAXRE-000042",{count:s}),color:"success"})}else{a.props.button.setButtonDisabled({Print:!0,Output:!0}),a.props.table.setAllTableData(m,{allpks:[],rows:[]}),n&&(0,c.toast)({content:a.state.json["10140TAXRE-000036"],color:"warning",title:a.state.json["10140TAXRE-000037"]})}o&&"function"==typeof o&&o()}})}},{key:"showOffChange",value:function(){var t=!this.state.isShowOff;this.setState({isShowOff:!this.state.isShowOff}),this.getData(this.searchVal,t)}},{key:"render",value:function(){var t=this.props,e=t.table,a=t.button,n=t.search,o=(t.base,t.modal),s=this.props.button.getButtons();s=s.sort(function(t,e){return e.btnorder-t.btnorder});var r=e.createSimpleTable,i=n.NCCreateSearch,c=o.createModal,u=a.createButtonApp;a.getButtons;return l.default.createElement("div",{className:"nc-bill-list"},l.default.createElement("div",{className:"nc-bill-header-area"},l.default.createElement("div",{className:"header-title-search-area"},l.default.createElement("h2",{className:"title-search-detail"},this.state.json?this.state.json["10140TAXRE-000029"]:"10140TAXRE-000029")),l.default.createElement("div",{className:"title-search-detail"},l.default.createElement("span",null,l.default.createElement(p,{checked:this.state.isShowOff,onChange:this.showOffChange.bind(this),disabled:this.state.showOffDisable},this.state.json?this.state.json["10140TAXRE-000041"]:"10140TAXRE-000041"))),l.default.createElement("div",{className:"header-button-area"},u({area:"header-action",buttonLimit:3,onButtonClick:this.buttonClick.bind(this),popContainer:document.querySelector(".header-button-area")}))),l.default.createElement("div",{className:"nc-bill-search-area"},i(this.searchId,{clickSearchBtn:this.clickSearchBtn.bind(this)})),l.default.createElement("div",{className:"nc-bill-table-area"},r(this.tableId,{dataSource:"upabd.taxinfo.taxregion.data",pkname:g,tableModelConfirm:this.tableModelConfirm,showIndex:!1,onRowClick:this.onRowClick.bind(this),onRowDoubleClick:this.doubleClick.bind(this)})),c("delete",{title:this.state.json?this.state.json["10140TAXRE-000004"]:"10140TAXRE-000004",content:this.state.json?this.state.json["10140TAXRE-000005"]:"10140TAXRE-000005",beSureBtnClick:this.deleteAction.bind(this)}),c("enable",{title:this.state.json?this.state.json["10140TAXRE-000014"]:"10140TAXRE-000014",content:this.state.json?this.state.json["10140TAXRE-000015"]:"10140TAXRE-000015",beSureBtnClick:this.changeEnableClick.bind(this)}),c("disable",{title:this.state.json?this.state.json["10140TAXRE-000016"]:"10140TAXRE-000016",content:this.state.json?this.state.json["10140TAXRE-000017"]:"10140TAXRE-000017",beSureBtnClick:this.changeEnableClick.bind(this)}),l.default.createElement(f,{ref:"printOutput",url:E,data:{funcode:"10140TAXRE",nodekey:"list",oids:this.state.pks,outputType:"output"}}))}}]),e}(),o=function(){var t=this;this.initTemplate=function(e){e.createUIDom({pagecode:b},function(a){if(a){if(a.template){var n=a.template;n=t.modifierMeta(e,n),e.meta.setMeta(n);var o=c.cacheTools.get("searchParams"),r=e.search.getQueryInfo("taxregionsearch"),i=r.oid,l=s({},r,{pageInfo:{pageIndex:0,pageSize:10,total:0,totalPage:0},pagecode:b,queryAreaCode:h,oid:i,queryType:"tree"});(0,c.ajax)({url:v,data:l,success:function(a){if(a.data){var n=[];a.data[m].rows.forEach(function(t){n.push(t.values[g].value)}),e.button.setButtonDisabled({Print:!1,Output:!1}),a.data[m].allpks=n,e.table.setAllTableData(m,a.data[m])}else{e.button.setButtonDisabled({Print:!0,Output:!0}),e.table.setAllTableData(m,{allpks:[],rows:[]}),(0,c.toast)({content:t.state.json?t.state.json["10140TAXRE-000030"]:"10140TAXRE-000030",color:"warning"})}a.formulamsg&&a.formulamsg instanceof Array&&a.formulamsg.length>0&&t.props.dealFormulamsg(a.formulamsg,function(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}({},m,"editTable"))}}),o&&0!=o&&e.search.setSearchValue("taxregionsearch",o)}if(a.button){var u=a.button;e.button.setButtons(u)}}})},this.getButtonNames=function(t){return"edit"===t||"add"===t||"save"===t?"main-button":"secondary - button"},this.doubleClick=function(e,a,n,o){var s=t.props.search.getAllSearchData(h);c.cacheTools.set("searchParams",s),t.props.pushTo("/card",{status:"browse",id:e[g].value})},this.deleteAction=function(e){var a={id:t.selectedRowRecord[g].value,ts:t.selectedRowRecord.ts.value};(0,c.ajax)({url:T,data:a,success:function(a){(0,c.toast)({color:"success",title:t.state.json["10140TAXRE-000019"]}),t.refreshAction(e)}})},this.refreshAction=function(e){var a=arguments.length>1&&void 0!==arguments[1]&&arguments[1];t.getData({},t.state.isShowOff,!1,function(){a&&(0,c.toast)({title:t.state.json["10140TAXRE-000013"],color:"success"})})},this.pageInfoClick=function(e,a,n){e.table.getTablePageInfo(t.tableId);var o={allpks:n,pageid:b};(0,c.ajax)({url:"/nccloud/uapbd/taxregion/ProjectQueryPageGridByPks.do",data:o,success:function(t){var a=t.success,n=t.data;a&&(n?e.table.setAllTableData(m,n[m]):e.table.setAllTableData(m,{rows:[]}))}})},this.clickSearchBtn=function(e,a){t.searchVal=a,c.cacheTools.set("searchParams",a),t.getData(a,t.state.isShowOff,!0)}},n);k=(0,c.createPage)({initTemplate:[],mutiLangCode:"10140TAXRE"})(k),e.default=k},181:function(t,e,a){t.exports=a(182)},182:function(t,e,a){"use strict";var n=a(1);!function(t,e){(0,n.RenderRouter)(t,e)}(function(t){return t&&t.__esModule?t:{default:t}}(a(183)).default,"app")},183:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(1),o=function(t){return t&&t.__esModule?t:{default:t}}(a(166));var s=(0,n.asyncComponent)(function(){return Promise.resolve().then(a.t.bind(null,165,7))}),r=[{path:"/",component:o.default,exact:!0},{path:"/list",component:o.default},{path:"/card",component:s}];e.default=r},2:function(t,a){t.exports=e},3:function(t,e){t.exports=a}})});
//# sourceMappingURL=index.fba8db28.js.map