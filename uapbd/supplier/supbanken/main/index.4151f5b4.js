!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("nc-lightapp-front"),require("react"),require("react-dom")):"function"==typeof define&&define.amd?define(["nc-lightapp-front","react","react-dom"],t):"object"==typeof exports?exports["uapbd/supplier/supbanken/main/index"]=t(require("nc-lightapp-front"),require("react"),require("react-dom")):e["uapbd/supplier/supbanken/main/index"]=t(e["nc-lightapp-front"],e.React,e.ReactDOM)}(window,function(e,t,a){return function(e){var t={};function a(s){if(t[s])return t[s].exports;var n=t[s]={i:s,l:!1,exports:{}};return e[s].call(n.exports,n,n.exports,a),n.l=!0,n.exports}return a.m=e,a.c=t,a.d=function(e,t,s){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(a.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)a.d(s,n,function(t){return e[t]}.bind(null,n));return s},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="../../../../",a(a.s=407)}({1:function(t,a){t.exports=e},2:function(e,a){e.exports=t},289:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s,n,o=function(){function e(e,t){for(var a=0;a<t.length;a++){var s=t[a];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}return function(t,a,s){return a&&e(t.prototype,a),s&&e(t,s),t}}(),l=a(2),r=u(l),i=(u(a(3)),a(1));function u(e){return e&&e.__esModule?e:{default:e}}function c(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function d(e){if(Array.isArray(e)){for(var t=0,a=Array(e.length);t<e.length;t++)a[t]=e[t];return a}return Array.from(e)}var p=i.base.NCAffix,b=(i.base.NCPopconfirm,i.base.NCFormControl,i.base.NCBackBtn),f=i.high.PrintOutput,h="supbankacc",v="bankaccsub",k="search",m="/nccloud/uapbd/supbanken/enableSupbankenCard.do",g="/nccloud/uapbd/supbanken/printSupbanken.do";function E(e){var t=e.getUrlParam("status");"edit"==t||"add"==t?(e.button.setButtonVisible(["Edit","Add","back","Delete","Refresh"],!1),e.button.setButtonVisible(["Save","Cancel","AddLine","DelLine"],!0),e.cardPagination.setCardPaginationVisible("cardPaginationBtn",!1)):(e.button.setButtonVisible(["Save","Cancel","AddLine","DelLine"],!1),e.button.setButtonVisible(["Add","Edit","Delete","back","Refresh"],!0),e.cardPagination.setCardPaginationVisible("cardPaginationBtn",!0)),e.form.setFormStatus(h,t),e.cardTable.setStatus(v,"edit"==t||"add"==t?"edit":"browse")}var S=(s=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var a=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.call(a),a.formId=h,a.searchId=k,a.tableId=v,a.state={pk_org:"",title_code:"",totalcount:0,applycount:0,pks:[],backVisible:!0,json:{}},a}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,l.Component),o(t,[{key:"componentDidMount",value:function(){var e=this;this.props.MultiInit.getMultiLang({moduleId:"10140SBAE",domainName:"uapbd",callback:function(t,a,s){a&&e.setState({json:t,inlt:s},function(){e.initTemplate(e.props);var t=e.props.getUrlParam("id").split("_");e.getdata.apply(e,d(t))})}}),this.props.cardPagination.setCardPaginationId({id:this.props.getUrlParam("id"),status:0})}},{key:"modifierMeta",value:function(e,t){var a=this,s=e.getUrlParam("status");t[h].status=s,t[v].status=s;var n={itemtype:"customer",attrcode:"opr",label:this.state.json["10140SBAE-000000"],visible:!0,className:"table-opr",width:200,fixed:"right",render:function(t,s,n){return"browse"===e.cardTable.getStatus(v)?r.default.createElement("span",{onClick:function(){e.cardTable.toggleRowView(v,s)}}," ",a.state.json["10140SBAE-000015"]):r.default.createElement("div",{className:"currency-opr-col"},r.default.createElement("span",{className:"currency-opr-del",onClick:function(t){e.cardTable.openModel(v,"edit",s,n),t.stopPropagation()}},a.state.json["10140SBAE-000016"]),"  ",r.default.createElement("span",{className:"currency-opr-del",onClick:function(t){e.cardTable.delRowsByIndex(v,n),t.stopPropagation()}},a.state.json["10140SBAE-000017"]))}};return t[v].items.push(n),t}},{key:"enableSureEventClick",value:function(){var e=this,t=this.props.form.getAllFormValue(this.formId),a={isEnable:!0,list:[]},s={pk_bankaccbas:t.rows[0].values.pk_bankaccbas.value,pk_custbank:t.rows[0].values.pk_custbank.value,pk_cust:t.rows[0].values.pk_cust.value};a.list.push(s),(0,i.ajax)({url:m,data:a,success:function(t){e.getdata(s.pk_custbank,s.pk_bankaccbas,s.pk_cust,function(){(0,i.toast)({color:"success",title:e.state.json["10140SBAE-000009"]})})}})}},{key:"disableSureEventClick",value:function(){var e=this,t=this.props.form.getAllFormValue(this.formId),a={isEnable:!1,list:[]},s={pk_bankaccbas:t.rows[0].values.pk_bankaccbas.value,pk_custbank:t.rows[0].values.pk_custbank.value,pk_cust:t.rows[0].values.pk_cust.value};a.list.push(s),(0,i.ajax)({url:m,data:a,success:function(t){e.getdata(s.pk_custbank,s.pk_bankaccbas,s.pk_cust,function(){(0,i.toast)({color:"success",title:e.state.json["10140SBAE-000010"]})})}})}},{key:"output",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=(this.props.table.getAllTableData(v),this.props.getUrlParam("id").split("_"));""!=e&&(0,i.print)("pdf",g,{funcode:"10140SBAE",nodekey:"supcard",oids:t,outputType:e})}},{key:"onCardTableAfterEvent",value:function(e,t,a,s,n,o,l){if(console.log(n),console.log(l),n[0].newvalue.value!=n[0].oldvalue.value){var r={};r.value=l.values.pk_region.value,r.display=l.values.pk_region.display,e.cardTable.setValByKeyAndIndex(this.tableId,o,"pk_region.name",r),l.values.pk_region.display=s.refcode}}},{key:"render",value:function(){var e=this.props,t=e.cardTable,a=e.form,s=e.button,n=e.modal,o=e.cardPagination.createCardPagination,l=this.props.button.getButtons();l=l.sort(function(e,t){return t.btnorder-e.btnorder});var i=a.createForm,u=t.createCardTable,c=s.createButtonApp,d=n.createModal,h=this.props.getUrlParam("status");return r.default.createElement("div",{className:"nc-bill-card"},r.default.createElement("div",{className:"nc-bill-top-area"},r.default.createElement(p,null,r.default.createElement("div",{className:"nc-bill-header-area"},r.default.createElement(b,{className:"title-search-detail",style:{display:this.state.backVisible?"inline":"none"},onClick:this.buttonClick.bind(this,this.props,"Back")}),r.default.createElement("div",{className:"header-title-search-area"},r.default.createElement("h2",{className:"title-search-detail"},this.state.json["10140SBAE-000023"],"browse"==h?"："+this.state.title_code:"")),r.default.createElement("div",{className:"header-button-area"},c({area:"header-action",onButtonClick:this.buttonClick.bind(this)}),o({handlePageInfoChange:this.pageInfoClick.bind(this)})))),r.default.createElement("div",{className:"nc-bill-form-area"},i(this.formId,{onAfterEvent:this.afterEvent.bind(this)}))),r.default.createElement("div",{className:"nc-bill-bottom-area"},r.default.createElement("div",{className:"nc-bill-table-area"},u(this.tableId,{tableHead:this.getTableHead.bind(this),modelSave:this.modelSave.bind(this),onAfterEvent:this.onCardTableAfterEvent.bind(this),showIndex:!0,showCheck:!0}))),d("delete",{title:this.state.json["10140SBAE-000013"],content:this.state.json["10140SBAE-000014"],beSureBtnClick:this.delConfirm}),d("enable",{title:this.state.json["10140SBAE-000002"],content:this.state.json["10140SBAE-000003"],beSureBtnClick:this.enableSureEventClick.bind(this)}),d("disable",{title:this.state.json["10140SBAE-000006"],content:this.state.json["10140SBAE-000007"],beSureBtnClick:this.disableSureEventClick.bind(this)}),r.default.createElement(f,{ref:"printOutput",url:g,data:{funcode:"10140SBAE",oids:this.state.pks,nodekey:"supcard",outputType:"output"}}))}}]),t}(),n=function(){var e=this;this.initTemplate=function(t){t.createUIDom({pagecode:"10140SBAE_card"},function(a){if(a){if(a.template){var s=a.template;e.modifierMeta(t,s),t.meta.setMeta(s)}if(a.button){var n=a.button;t.button.setButtons(n),E(t)}}})},this.setDefaultValue=function(){e.props.form.setFormItemsValue(e.formId,{bill_status:{value:"0",display:e.state.json["10140SBAE-000001"]}})},this.buttonClick=function(t,a){switch(a){case"Enable":(0,i.promptBox)({color:"warning",title:e.state.json["10140SBAE-000002"],content:e.state.json["10140SBAE-000003"],noFooter:!1,noCancelBtn:!1,beSureBtnName:e.state.json["10140SBAE-000004"],cancelBtnName:e.state.json["10140SBAE-000005"],beSureBtnClick:e.enableSureEventClick.bind(e)});break;case"Disable":(0,i.promptBox)({color:"warning",title:e.state.json["10140SBAE-000006"],content:e.state.json["10140SBAE-000007"],noFooter:!1,noCancelBtn:!1,beSureBtnName:e.state.json["10140SBAE-000004"],cancelBtnName:e.state.json["10140SBAE-000005"],beSureBtnClick:e.disableSureEventClick.bind(e)});break;case"Back":t.pushTo("/list",{});break;case"Refresh":t.pushTo("/card",{status:t.getUrlParam("status"),id:t.getUrlParam("id")}),(0,i.toast)({title:e.state.json["10140SBAE-000008"],color:"success"});break;case"Print":e.output("print");break;case"Output":var s=e.props.getUrlParam("id").split("_");e.setState({pks:s},function(){e.refs.printOutput.open()})}},this.pageInfoClick=function(t,a){var s=a.split("_");e.getdata.apply(e,d(s).concat([function(){t.setUrlParam(a)}]))},this.afterEvent=function(e,t,a,s,n,o,l,r){},this.getdata=function(t,a,s){var n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,o={pk_custbank:t,pk_bankaccbas:a,pk_cust:s};(0,i.ajax)({url:"/nccloud/uapbd/supbanken/querySupbankenCard.do",data:o,success:function(t){if(t.data.head){e.props.form.setAllFormValue(c({},e.formId,t.data.head[e.formId]));var a=t.data.head[e.formId].rows[0].values.accname.value;e.setState({title_code:a})}if(t.data.body){var s=t.data.body[e.tableId].rows[0].values.isdefault;s&&"Y"==s.value?(t.data.body[e.tableId].rows[0].values.isdefault.value=!0,t.data.body[e.tableId].rows[0].values.isdefault.display=!1):s?(t.data.body[e.tableId].rows[0].values.isdefault.value=!1,t.data.body[e.tableId].rows[0].values.isdefault.display=!1):t.data.body[e.tableId].rows[0].values.isdefault={value:!1,display:!1},e.props.cardTable.setTableData(e.tableId,t.data.body[e.tableId]);var o=e.props.cardTable.getNumberOfRows(e.tableId);e.props.cardTable.getAllRows(e.tableId);e.setState({applycount:0}),e.setState({totalcount:o})}2==t.data.head[e.formId].rows[0].values.enablestate.value?(e.props.button.setButtonVisible(["Enable"],!1),e.props.button.setButtonVisible(["Disable"],!0)):(e.props.button.setButtonVisible(["Enable"],!0),e.props.button.setButtonVisible(["Disable"],!1)),n&&"function"==typeof n&&n.call(e)}})},this.saveClick=function(){e.props.editTable.filterEmptyRows(v);var t=e.props.createMasterChildData("10140SBAE_card",e.formId,e.tableId);delete t.head[h].rows[0].values.pk_taxregions;var a="/nccloud/uapbd/taxregion/saveTaxregion.do";"edit"===e.props.getUrlParam("status")&&(a="/nccloud/uapbd/taxregion/updateTaxregion.do"),(0,i.ajax)({url:a,data:t,success:function(t){var a=null;t.success&&(t.data&&(t.data.head&&t.data.head[e.formId]&&(e.props.form.setAllFormValue(c({},e.formId,t.data.head[e.formId])),a=t.data.head[e.formId].rows[0].values.pk_taxregion.value),t.data.body&&t.data.body[e.tableId]&&e.props.cardTable.setTableData(e.tableId,t.data.body[e.tableId])),(0,i.toast)({content:e.state.json["10140SBAE-000011"],color:"success"}),e.props.pushTo("/card",{status:"browse",id:a}),E(e.props))}})},this.delConfirm=function(){(0,i.ajax)({url:deleteUrl,data:{deleteinfo:[{id:e.props.getUrlParam("id"),ts:e.props.form.getFormItemsValue(e.formId,"ts").value}]},success:function(t){t&&e.props.pushTo("/list")}})},this.modelSave=function(t){t.cardTable.closeModel(e.tableId),e.saveClick()},this.getButtonNames=function(e){return"edit"===e||"add"===e||"save"===e?"main-button":"secondary - button"},this.getTableHead=function(){var t=e.props.button.createButtonApp,a=(e.props.button.getButtons(),e.props.getUrlParam("status"));return r.default.createElement("div",{className:"shoulder-definition-area"},r.default.createElement("div",{className:"definition-search"},"browse"==a?r.default.createElement("div",null,r.default.createElement("span",{className:"definition-search-title"},e.state.json["10140SBAE-000018"]," | ",e.state.json["10140SBAE-000019"],"："),r.default.createElement("span",{className:"count"},e.state.totalcount),r.default.createElement("span",null,e.state.json["10140SBAE-000020"]),r.default.createElement("span",null,"  ",e.state.json["10140SBAE-000021"]," ："),r.default.createElement("span",{className:"count"},e.state.applycount),r.default.createElement("span",null,e.state.json["10140SBAE-000022"])):""),r.default.createElement("div",{className:"definition-icons",style:{padding:"0px"}},t({area:"body-action",onButtonClick:e.buttonClick.bind(e)}),e.props.cardTable.createBrowseIcons(e.tableId,{iconArr:["close","open","max","setCol"],maxDestAreaId:"nc-bill-card"})))}},s);S=(0,i.createPage)({initTemplate:[]})(S),t.default=S},290:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s,n,o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var s in a)Object.prototype.hasOwnProperty.call(a,s)&&(e[s]=a[s])}return e},l=function(){function e(e,t){for(var a=0;a<t.length;a++){var s=t[a];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}return function(t,a,s){return a&&e(t.prototype,a),s&&e(t,s),t}}(),r=a(2),i=c(r),u=(c(a(3)),a(1));function c(e){return e&&e.__esModule?e:{default:e}}u.base.NCPopconfirm;var d=u.base.NCCheckbox,p=(u.base.NCIcon,u.base.NCTabs.NCTabPane,u.high.PrintOutput),b="10140SBAE_list",f="search",h="supbank",v="pk_bankaccbas",k="/nccloud/uapbd/supbanken/querySupbankenList.do",m="/nccloud/uapbd/supbanken/enableSupbankenCard.do",g="/nccloud/uapbd/supbanken/printSupbanken.do";var E=(s=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var a=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.call(a),a.searchId=f,a.tableId=h,a.selectedRowRecord=null,a.enableNumber=0,a.disableNumber=0,a.state={showOffDisable:!1,isShowOff:!1,pks:[],json:{}},a}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,r.Component),l(t,[{key:"componentDidMount",value:function(){var e=this;this.props.MultiInit.getMultiLang({moduleId:"10140SBAE",domainName:"uapbd",callback:function(t,a,s){a&&e.setState({json:t,inlt:s},function(){e.initTemplate(e.props)})}});var t={Enable:!0,Disable:!0};0==this.props.table.getAllTableData(this.tableId).rows.length&&(t.Print=!0,t.Output=!0),this.props.button.setButtonDisabled(t)}},{key:"buttonClick",value:function(e,t){var a=this;switch(t){case"Enable":(0,u.promptBox)({color:"warning",title:this.state.json["10140SBAE-000002"],content:this.state.json["10140SBAE-000003"],noFooter:!1,noCancelBtn:!1,beSureBtnName:this.state.json["10140SBAE-000004"],cancelBtnName:this.state.json["10140SBAE-000005"],beSureBtnClick:this.enableSureEventClick.bind(this)});break;case"Disable":(0,u.promptBox)({color:"warning",title:this.state.json["10140SBAE-000006"],content:this.state.json["10140SBAE-000007"],noFooter:!1,noCancelBtn:!1,beSureBtnName:this.state.json["10140SBAE-000004"],cancelBtnName:this.state.json["10140SBAE-000005"],beSureBtnClick:this.disableSureEventClick.bind(this)});break;case"Print":this.output("print");break;case"Output":var s=[];this.props.table.getAllTableData(h).rows.forEach(function(e){s.push(e.values.pk_custbank.value),s.push(e.values.pk_bankaccbas.value),s.push(e.values.pk_cust.value)}),this.setState({pks:s},function(){a.refs.printOutput.open()});break;case"Refresh":this.refreshAction(e)}}},{key:"output",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=[];this.props.table.getAllTableData(h).rows.forEach(function(e){t.push(e.values.pk_custbank.value),t.push(e.values.pk_bankaccbas.value),t.push(e.values.pk_cust.value)}),""!=e&&(0,u.print)("pdf",g,{funcode:"10140SBAE",nodekey:"suplist",oids:t,outputType:e})}},{key:"onRowClick",value:function(e,t,a,s){this.selectedRowRecord=a}},{key:"onSelected",value:function(e,t,a,s,n){var o=a.enablestate.value;n?2==o?this.enableNumber++:this.disableNumber++:2==o?this.enableNumber--:this.disableNumber--;var l={Enable:!(this.disableNumber>0),Disable:!(this.enableNumber>0)};e.button.setButtonDisabled(l)}},{key:"onSelectedAll",value:function(e,t,a,s){var n=this,o=this.props.table.getAllTableData(h);a?o.rows.forEach(function(e){2==e.values.enablestate.value?n.enableNumber++:n.disableNumber++}):(this.enableNumber=0,this.disableNumber=0);var l={Enable:!(this.disableNumber>0),Disable:!(this.enableNumber>0)};e.button.setButtonDisabled(l)}},{key:"getData",value:function(e,t){var a=this,s=arguments.length>2&&void 0!==arguments[2]&&arguments[2],n=arguments[3],l=this.props.search.getQueryInfo("search"),r=l.oid,i=o({},l,{pageInfo:{pageIndex:0,pageSize:10,total:0,totalPage:0},pagecode:b,queryAreaCode:f,oid:r,queryType:"tree",showDisable:t});(0,u.ajax)({url:k,data:i,success:function(e){if(e.data){var t=[];e.data[h].rows.forEach(function(e){var a=e.values.pk_custbank.value+"_"+e.values.pk_bankaccbas.value+"_"+e.values.pk_cust.value;t.push(a)}),u.cacheTools.set("allpks",t),e.data[h].allpks=t,a.props.button.setButtonDisabled({Print:!1,Output:!1}),a.props.table.setAllTableData(a.tableId,e.data[h]);var o=t.length,l=a.state.inlt;s&&(0,u.toast)({title:a.state.json["10140SBAE-000026"],content:l&&l.get("10140SBAE-000036",{count:o}),color:"success"})}else{a.props.button.setButtonDisabled({Print:!0,Output:!0}),a.props.table.setAllTableData(h,{allpks:[],rows:[]}),s&&(0,u.toast)({content:a.state.json["10140SBAE-000029"],color:"warning",title:a.state.json["10140SBAE-000030"]})}a.props.button.setButtonDisabled({Enable:!0,Disable:!0}),a.enableNumber=0,a.disableNumber=0,n&&"function"==typeof n&&n()}})}},{key:"enableSureEventClick",value:function(){var e=this,t=this.props.table.getCheckedRows(this.tableId);if(0!=t.length){var a={isEnable:!0,list:[]};t.forEach(function(e){var t={};t.pk_bankaccbas=e.data.values.pk_bankaccbas.value,t.pk_custbank=e.data.values.pk_custbank.value,t.pk_cust=e.data.values.pk_cust.value,a.list.push(t)}),(0,u.ajax)({url:m,data:a,success:function(t){e.mergeRetData(t.data,!0),(0,u.toast)({color:"success",title:e.state.json["10140SBAE-000009"]})}})}else(0,u.toast)({color:"warning",content:this.state.json["10140SBAE-000031"]})}},{key:"mergeRetData",value:function(e,t){var a=this,s=this.props.table.getAllTableData(this.tableId);s.rows.forEach(function(s,n){var o=""+s.values.pk_bankaccbas.value+s.values.pk_cust.value+s.values.pk_custbank.value;if(e.hasOwnProperty(o)){var l=e[o].split("_");t?(s.values["pk_bankaccbas.enableuser"]={value:l[0],display:l[0]},s.values["pk_bankaccbas.enabledate"]={value:l[1],display:l[1]},s.values.enablestate={value:2,display:a.state.json["10140SBAE-000032"]}):(s.values["pk_bankaccbas.disableuser"]={value:l[0],display:l[0]},s.values["pk_bankaccbas.disabletime"]={value:l[1],display:l[1]},s.values.enablestate={value:3,display:a.state.json["10140SBAE-000033"]})}}),this.props.table.setAllTableData(this.tableId,s),this.props.table.selectAllRows(this.tableId,!1),this.props.button.setButtonDisabled({Enable:!0,Disable:!0}),this.enableNumber=0,this.disableNumber=0}},{key:"disableSureEventClick",value:function(){var e=this,t=this.props.table.getCheckedRows(this.tableId);if(0!=t.length){var a={isEnable:!1,list:[]};t.forEach(function(e){var t={};t.pk_bankaccbas=e.data.values.pk_bankaccbas.value,t.pk_custbank=e.data.values.pk_custbank.value,t.pk_cust=e.data.values.pk_cust.value,a.list.push(t)}),(0,u.ajax)({url:m,data:a,success:function(t){e.mergeRetData(t.data,!1),(0,u.toast)({color:"success",title:e.state.json["10140SBAE-000010"]})}})}else(0,u.toast)({color:"warning",content:this.state.json["10140SBAE-000031"]})}},{key:"showOffChange",value:function(){var e=!this.state.isShowOff;this.setState({isShowOff:!this.state.isShowOff});var t=this.props.search.getAllSearchData(f);t&&this.getData(t,e)}},{key:"render",value:function(){var e=this,t=this.props,a=t.table,s=t.button,n=t.search,o=t.modal,l=this.props.button.getButtons();l=l.sort(function(e,t){return t.btnorder-e.btnorder});var r=a.createSimpleTable,c=n.NCCreateSearch,b=s.createButtonApp,h=(s.getButtons,o.createModal);return i.default.createElement("div",{className:"nc-bill-list"},i.default.createElement("div",{className:"nc-bill-header-area"},i.default.createElement("div",{className:"header-title-search-area"},i.default.createElement("h2",{className:"title-search-detail"},this.state.json["10140SBAE-000034"])),i.default.createElement("div",{className:"title-search-detail"},i.default.createElement("span",null,i.default.createElement(d,{checked:this.state.isShowOff,onChange:this.showOffChange.bind(this),disabled:this.state.showOffDisable},this.state.json["10140SBAE-000035"]))),i.default.createElement("div",{className:"header-button-area"},b({area:"header-action",buttonLimit:3,onButtonClick:this.buttonClick.bind(this),popContainer:document.querySelector(".header-button-area")}))),i.default.createElement("div",{className:"nc-bill-search-area"},c(this.searchId,{clickSearchBtn:this.clickSearchBtn.bind(this),clickAdvBtnEve:function(){var t=(0,u.getBusinessInfo)();e.props.search.setSearchValByField(f,"pk_org",{value:t.groupId,display:t.groupName})}})),i.default.createElement("div",{className:"nc-bill-table-area"},r(this.tableId,{handlePageInfoChange:this.pageInfoClick,tableModelConfirm:this.tableModelConfirm,showIndex:!0,onRowClick:this.onRowClick.bind(this),onSelected:this.onSelected.bind(this),showCheck:!0,onRowDoubleClick:this.doubleClick.bind(this),onSelectedAll:this.onSelectedAll.bind(this)})),h("enable",{title:this.state.json["10140SBAE-000002"],content:this.state.json["10140SBAE-000003"],beSureBtnClick:this.enableSureEventClick.bind(this)}),h("disable",{title:this.state.json["10140SBAE-000006"],content:this.state.json["10140SBAE-000007"],beSureBtnClick:this.disableSureEventClick.bind(this)}),i.default.createElement(p,{ref:"printOutput",url:g,data:{funcode:"10140SBAE",nodekey:"suplist",oids:this.state.pks,outputType:"output"}}))}}]),t}(),n=function(){var e=this;this.initTemplate=function(t){t.createUIDom({pagecode:b},function(a){if(a){if(a.template){var s=a.template,n=["pk_org","pk_supplier","pk_supplierclass","bankaccsub.pk_currtype","pk_bankdoc","pk_banktype","creator","enableuser"];s[f].items.forEach(function(e){n.indexOf(e.attrcode)>=0&&(e.isMultiSelectedEnabled=!0),"pk_org"==e.attrcode&&(e.queryCondition=function(){return{nodeType:"supplier",TreeRefActionExt:"nccloud.web.uapbd.supplier.supbanken.BankenOrgSqlBuilder"}}),"pk_supplier"==e.attrcode&&(e.isShowUnit=!0,e.isShowDisabledData=!0),"pk_supplierclass"==e.attrcode&&(e.isShowUnit=!0),"pk_bankdoc"==e.attrcode&&(e.isShowDisabledData=!0),"create"!=e.attrcode&&"enableuser"!=e.attrcode||(e.isShowDisabledData=!0)}),t.meta.setMeta(s);var l=u.cacheTools.get("searchParams");if(l&&0!=l){t.search.setSearchValue(f,l);var r=t.search.getQueryInfo(f),i=r.oid,c=o({},r,{pageInfo:{pageIndex:0,pageSize:10,total:0,totalPage:0},pagecode:b,queryAreaCode:f,oid:i,queryType:"tree"});(0,u.ajax)({url:k,data:c,success:function(a){if(a.data){var s=[];a.data[h].rows.forEach(function(e){var t=e.values.pk_custbank.value+"_"+e.values.pk_bankaccbas.value+"_"+e.values.pk_cust.value;s.push(t)}),a.data[h].allpks=s,t.button.setButtonDisabled({Print:!1,Output:!1}),t.table.setAllTableData(h,a.data[h])}else{t.button.setButtonDisabled({Print:!0,Output:!0}),t.table.setAllTableData(h,{allpks:[],rows:[]}),(0,u.toast)({content:e.state.json["10140SBAE-000024"],color:"warning"})}},error:function(e){console.log(e.message)}})}else{var d=(0,u.getBusinessInfo)();t.search.setSearchValByField(f,"pk_org",{value:d.groupId,display:d.groupName})}}if(a.button){var p=a.button;t.button.setButtons(p)}}})},this.getButtonNames=function(e){return"edit"===e||"add"===e||"save"===e?"main-button":"secondary - button"},this.doubleClick=function(t,a,s,n){var o=e.props.search.getAllSearchData(f);u.cacheTools.set("searchParams",o);var l=t.pk_custbank.value+"_"+t.pk_bankaccbas.value+"_"+t.pk_cust.value;e.props.pushTo("/card",{status:"browse",id:l})},this.deleteAction=function(t){var a={id:e.selectedRowRecord[v].value,ts:e.selectedRowRecord.ts.value};(0,u.ajax)({url:deleteUrl,data:a,success:function(a){(0,u.toast)({color:"success",title:e.state.json["10140SBAE-000025"]}),e.refreshAction(t)}})},this.refreshAction=function(t){var a=t.search.getAllSearchData(f);a&&e.getData(a,e.state.isShowOff,!1,function(){(0,u.toast)({color:"success",title:e.state.json["10140SBAE-000008"]})})},this.pageInfoClick=function(t,a,s){t.table.getTablePageInfo(e.tableId),t.search.getAllSearchData(f);var n={allpks:s,pageid:b};(0,u.ajax)({url:"/nccloud/uapbd/taxregion/ProjectQueryPageGridByPks.do",data:n,success:function(e){var a=e.success,s=e.data;a&&(s?t.table.setAllTableData(h,s[h]):t.table.setAllTableData(h,{rows:[]}))}})},this.clickSearchBtn=function(t,a){a&&(e.searchVal=a,u.cacheTools.set("searchParams",a),e.getData(a,e.state.isShowOff,!0))}},s);E=(0,u.createPage)({initTemplate:[]})(E),t.default=E},3:function(e,t){e.exports=a},407:function(e,t,a){e.exports=a(408)},408:function(e,t,a){"use strict";var s=a(1);!function(e,t){(0,s.RenderRouter)(e,t)}(function(e){return e&&e.__esModule?e:{default:e}}(a(409)).default,"app")},409:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a(1),n=function(e){return e&&e.__esModule?e:{default:e}}(a(290));var o=(0,s.asyncComponent)(function(){return Promise.resolve().then(a.t.bind(null,289,7))}),l=[{path:"/",component:n.default,exact:!0},{path:"/list",component:n.default},{path:"/card",component:o}];t.default=l}})});
//# sourceMappingURL=index.4151f5b4.js.map