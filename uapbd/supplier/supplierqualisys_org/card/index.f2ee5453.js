!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("nc-lightapp-front"),require("react"),require("react-dom")):"function"==typeof define&&define.amd?define(["nc-lightapp-front","react","react-dom"],t):"object"==typeof exports?exports["uapbd/supplier/supplierqualisys_org/card/index"]=t(require("nc-lightapp-front"),require("react"),require("react-dom")):e["uapbd/supplier/supplierqualisys_org/card/index"]=t(e["nc-lightapp-front"],e.React,e.ReactDOM)}(window,function(e,t,a){return function(e){var t={};function a(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,a),r.l=!0,r.exports}return a.m=e,a.c=t,a.d=function(e,t,o){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(a.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)a.d(o,r,function(t){return e[t]}.bind(null,r));return o},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="../../../../",a(a.s=468)}({1:function(t,a){t.exports=e},152:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var o in a)Object.prototype.hasOwnProperty.call(a,o)&&(e[o]=a[o])}return e};t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t={multiLang:{domainName:"uapbd",currentLocale:"zh-CN",moduleId:"refer_uapbd"},refType:"tree",refName:"refer-000209",rootNode:{refname:"refer-000209",refpk:"root"},placeholder:"refer-000209",refCode:"uapbd.org.CorpDefaultTreeRef",queryTreeUrl:"/nccloud/uapbd/org/CorpDefaultTreeRef.do",treeConfig:{name:["refer-000002","refer-000003"],code:["refcode","refname"]},isMultiSelectedEnabled:!1,unitProps:n.conf,isShowUnit:!1};return React.createElement(l,o({},t,e))};var r=a(1),n=a(7),l=r.high.Refer},2:function(e,a){e.exports=t},222:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o,r,n=function(){function e(e,t){for(var a=0;a<t.length;a++){var o=t[a];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,a,o){return a&&e(t.prototype,a),o&&e(t,o),t}}(),l=a(2),s=c(l),i=(c(a(3)),a(1)),d=c(a(152));function c(e){return e&&e.__esModule?e:{default:e}}function u(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var p=i.base.NCAffix,f=(i.base.NCPopconfirm,i.base.NCFormControl,i.base.NCBackBtn),m="supqualidoc",b="supqualilevel",g="search",h="/nccloud/uapbd/supplierqualisys/query.do",v="/nccloud/uapbd/supplierqualisys/save.do";function y(e){console.log("toggleShow");var t=e.getUrlParam("status");"edit"==t||"add"==t?(e.button.setButtonVisible(["edit","add","back","delete","refresh"],!1),e.button.setButtonVisible(["save","cancel","addline"],!0),e.cardPagination.setCardPaginationVisible("cardPaginationBtn",!1)):(e.button.setButtonVisible(["save","addline","cancel"],!1),e.button.setButtonVisible(["add","edit","delete","back","refresh"],!0),e.cardPagination.setCardPaginationVisible("cardPaginationBtn",!0)),e.form.setFormStatus(m,t),e.cardTable.setStatus(b,t)}var I=(o=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var a=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return r.call(a),a.formId=m,a.searchId=g,a.tableId=b,a.state={pk_org:"",title_code:"",totalcount:0,applycount:0,configs:{},curOrg:null,json:{}},a.cardUrl="",a.listUrl="",a.mainUrl="","group"==a.props.config.nodetype?(a.cardUrl="/uapbd/supplier/supplierqualisys_grp/card/index.html",a.listUrl="/uapbd/supplier/supplierqualisys_grp/list/index.html",a.mainUrl="/uapbd/supplier/supplierqualisys_grp/main/index.html"):(a.cardUrl="/uapbd/supplier/supplierqualisys_org/card/index.html",a.listUrl="/uapbd/supplier/supplierqualisys_org/list/index.html",a.mainUrl="/uapbd/supplier/supplierqualisys_org/main/index.html"),a.initTemplate(e),a}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,l.Component),n(t,[{key:"componentDidMount",value:function(){if(console.log("componentDidMount"),"add"!=this.props.getUrlParam("status")){var e=this.props.getUrlParam("id");e&&"undefined"!=e&&this.getdata(e)}else this.setDefaultValue()}},{key:"componentWillMount",value:function(){var e=this;(0,i.getMultiLang)({moduleId:"10140SAQSG",domainName:"uapbd",callback:function(t){console.log(t),e.setState({json:t})}})}},{key:"createCfg",value:function(e,t){var a={value:this.state.configs[e]?this.state.configs[e].value:[],onChange:function(e){console.log("onChange--"+e),console.log(e),this.state.curOrg=e.refpk}.bind(this)};return this.state.configs[e]=a,Object.assign(a,t)}},{key:"render",value:function(){var e=this,t=this.props,a=t.cardTable,o=t.form,r=t.button,n=t.modal,l=(t.cardPagination.createCardPagination,this.props.button.getButtons()),i=r.createButtonApp;l=l.sort(function(e,t){return t.btnorder-e.btnorder});var c=o.createForm,u=a.createCardTable,m=(r.createButton,n.createModal);this.props.getUrlParam("status");return s.default.createElement("div",{id:"nc-bill-card"},s.default.createElement("div",{className:"nc-bill-card"},s.default.createElement(p,null,s.default.createElement("div",{className:"nc-bill-header-area"},s.default.createElement("div",{className:"header-title-search-area"},s.default.createElement(f,{className:"title-search-detail",style:{marginRight:"6px"},onClick:this.buttonClick.bind(this,this.props,"back")}),s.default.createElement("h2",{className:"title-search-detail"},this.state.json[this.props.config.nodeName])),function(){var t;return"add"===e.props.getUrlParam("status")&&e.props.config.nodetype&&"org"===e.props.config.nodetype?s.default.createElement("div",{className:"search-box"},(0,d.default)((function(e){if(null==e)throw new TypeError("Cannot destructure undefined")}(t=e.createCfg("CorpDefaultTreeRef",{pid:"",keyword:"",pageInfo:{pageIndex:0,pageSize:10,totalPage:"0"},queryCondition:function(){return{isShowDisabledData:!0}}})),t))):""}(),s.default.createElement("div",{className:"header-button-area"},i({area:"header-button-area",buttonLimit:1,onButtonClick:this.buttonClick.bind(this)})),"                ")),s.default.createElement("div",{className:"nc-bill-form-area"},c(this.formId,{onAfterEvent:this.afterEvent.bind(this)})),s.default.createElement("div",{style:{height:"8px"}}),s.default.createElement("div",{className:"nc-bill-table-area"},u(this.tableId,{tableHead:this.getTableHead.bind(this),modelSave:this.modelSave.bind(this),showIndex:!0,onAfterEvent:this.cardTableAfterEventFn.bind(this)})),m("delete",{title:this.state.json["10140SAQSG-000042"],content:this.state.json["10140SAQSG-000022"],beSureBtnClick:this.delConfirm.bind(this)})))}}]),t}(),r=function(){var e=this;this.initTemplate=function(t){t.createUIDom({pagecode:t.config.pageCode},function(a){if(console.log("data"),console.log(a),a){if(a.template){var o=a.template;e.modifierMeta(t,o),t.meta.setMeta(o)}if(a.button){var r=a.button;t.button.setButtons(r),console.log("initTemplate"),console.log(t),console.log(t.button.getButtons());var n=t.getUrlParam("status");"edit"==n||"add"==n?(t.button.setButtonVisible(["edit","add","back","delete","refresh"],!1),t.button.setButtonVisible(["save","cancel","addline"],!0),t.cardPagination.setCardPaginationVisible("cardPaginationBtn",!1)):(t.button.setButtonVisible(["save","cancel","addline"],!1),t.button.setButtonVisible(["add","edit","delete","back","refresh"],!0),t.cardPagination.setCardPaginationVisible("cardPaginationBtn",!1)),t.form.setFormStatus(t.config.formId,n),t.cardTable.setStatus(t.config.tableId,n)}}})},this.modifierMeta=function(t,a){var o=t.getUrlParam("status");a[t.config.formId].status=o,a[t.config.tableId].status=o,console.log("modifierMeta23232");var r=a[t.config.formId].items;console.log(r);for(var n=0;n<r.length;n++)"pk_qualitype"===r[n].attrcode&&(r[n].refcode="../../../../uapbd/refer/pub/SupplierQualiTypeTreeRef/index.js");var l=a[t.config.tableId].items;console.log(l);for(var i=0;i<l.length;i++)"cmaterialvid"===l[i].attrcode&&(console.log(e.state.json["10140SAQSG-000000"]),l[i].refcode="../../../../uapbd/refer/pub/MaterialMultiVersionGridRef/index.js");var d={attrcode:"opr",label:e.state.json["10140SAQSG-000001"],visible:!0,itemtype:"customer",className:"table-opr",width:200,fixed:"right",render:function(a,o,r){return"browse"===t.cardTable.getStatus(t.config.tableId)?s.default.createElement("span",null):s.default.createElement("div",{className:"currency-opr-col"},s.default.createElement("span",{className:"currency-opr-del",onClick:function(e){t.cardTable.openModel(t.config.tableId,"edit",o,r),e.stopPropagation()}},e.state.json["10140SAQSG-000044"]),"  ",s.default.createElement("span",{className:"currency-opr-del",onClick:function(e){t.cardTable.delRowsByIndex(t.config.tableId,r),e.stopPropagation()}},e.state.json["10140SAQSG-000038"]))}};return a[t.config.tableId].items.push(d),a},this.setDefaultValue=function(){e.props.form.setFormItemsValue(e.formId,{enablestate:{value:"2",display:e.state.json["10140SAQSG-000067"]}})},this.buttonClick=function(t,a){console.log("buttonClick"),console.log(t),console.log(a);switch(a){case"add":t.form.EmptyAllFormValue(e.formId),t.cardTable.setTableData(e.tableId,{rows:[]}),t.pushTo("/card",{status:"add"}),y(t);break;case"edit":t.pushTo("/card",{status:"edit",id:t.getUrlParam("id")}),y(t);break;case"delete":e.props.modal.show("delete");break;case"back":t.pushTo("/list",{});break;case"save":e.saveClick();break;case"cancel":"add"===t.getUrlParam("status")&&(t.CacheTools.get("preid")?(t.form.cancel(e.formId),t.cardTable.resetTableData(e.tableId),t.cardTable.setStatus(e.tableId,"browse"),t.pushTo("/card",{status:"browse",id:t.CacheTools.get("preid")}),e.toggleShow(t)):t.pushTo("/list",{status:"browse"})),"edit"===t.getUrlParam("status")&&(t.form.cancel(e.formId),t.cardTable.resetTableData(e.tableId),t.cardTable.setStatus(e.tableId,"browse"),t.pushTo("/card",{status:"browse",id:t.getUrlParam("id")})),y(t);break;case"addline":t.cardTable.addRow(e.tableId);break;case"refresh":t.pushTo("/card",{status:t.getUrlParam("status"),id:t.getUrlParam("id")}),e.getdata(t.getUrlParam("id"))}},this.pageInfoClick=function(e,t){var a={pk:t,pageid:e.config.pageCode};(0,i.ajax)({url:h,data:a,success:function(a){console.log("pageInfoClick"),console.log(a),a.data.head&&(e.form.setAllFormValue(u({},m,a.data.head[m])),e.setUrlParam(t)),a.data.body&&e.editTable.setTableData(b,a.data.body[b])}})},this.afterEvent=function(e,t,a,o,r,n,l,s){e.meta.getMeta(b)[e.config.formId].items;var i=e.form.getAllFormValue(e.config.formId);console.log("form afterEvent"),console.log(n),console.log(l),console.log(s),console.log("end"),i.rows[0].values.cmaterialoid={display:n.refcode,value:n.refpk},i.rows[0].values.cmaterialvid={display:n.refcode,value:n.refpk},i.rows[0].values["cmaterialvid.name"]={display:n.refname,value:n.refname},i.rows[0].values.pk_unit={display:n.values.measdoc_name.value,value:n.values.pk_measdoc.value}},this.getdata=function(t){var a={pk:t,template:e.props.config.template};(0,i.ajax)({url:h,data:a,success:function(t){if(t.data.head){console.log("headdata"),console.log(t.data),console.log(e),e.props.form.setAllFormValue(u({},e.props.config.formId,t.data.head[e.props.config.formId]));var a=t.data.head[e.props.config.formId].rows[0].values.name.value;e.setState({title_code:a})}if(t.data.body){e.props.cardTable.setTableData(e.props.config.tableId,t.data.body[e.props.config.tableId]);var o=e.props.cardTable.getNumberOfRows(e.props.config.tableId);e.props.cardTable.getAllRows(e.props.config.tableId);e.setState({applycount:0}),e.setState({totalcount:o})}console.log("1452")}})},this.saveClick=function(){e.props.editTable.filterEmptyRows(b);var t=e.props.createMasterChildData(e.props.config.pageCode,e.props.config.formId,e.props.config.tableId);console.log(t);var a=v;if("edit"===e.props.getUrlParam("status")?(a="/nccloud/uapbd/supplierqualisys/save.do",t.head[e.props.config.formId].rows[0].status="1"):"add"===e.props.getUrlParam("status")&&(a=v,t.head[e.props.config.formId].rows[0].status="2"),"org"===e.props.config.nodetype&&"add"===e.props.getUrlParam("status")){var o=e.state.curOrg;if(null==o||o.length<1)return void(0,i.toast)({content:e.state.json["10140SAQSG-000068"],color:"warning"});t.head[e.props.config.formId].rows[0].values.pk_org={value:o}}(0,i.ajax)({url:a,data:t,success:function(t){var a=null;if(t.success){t.data&&(t.data.head&&t.data.head[e.props.config.formId]&&(e.props.form.setAllFormValue(u({},e.props.config.formId,t.data.head[e.props.config.formId])),a=t.data.head[e.props.config.formId].rows[0].values.pk_suppliergrade.value),t.data.body&&t.data.body[e.props.config.tableId]&&e.props.cardTable.setTableData(e.props.config.tableId,t.data.body[e.props.config.tableId])),(0,i.toast)({title:"保存成功",color:"success"});var o=t.data.head[e.props.config.formId].rows[0].values.name.value;e.setState({title_code:o}),e.props.pushTo("./card",{status:"browse",id:a}),y(e.props)}}})},this.delConfirm=function(t){(0,i.ajax)({url:"/nccloud/uapbd/supplierqualisys/del.do",data:{deleteinfo:[{id:e.props.getUrlParam("id"),ts:e.props.form.getFormItemsValue(e.formId,"ts").value}]},success:function(t){t&&e.props.pushTo("./list")}})},this.modelSave=function(t){t.cardTable.closeModel(e.tableId),e.saveClick()},this.cardTableAfterEventFn=function(t,a,o,r,n,l,s,i,d){console.log("cardTableAfterEventFn"),console.log(a),console.log(o),console.log(r),console.log(l),console.log(d),console.log("end"),console.log(t);t.meta.getMeta(b);if("cmaterialvid"===o){console.log(e.state.json["10140SAQSG-000069"]);var c=t.meta;console.log("paramcode chagne"),console.log(c);var u=t.cardTable;console.log(u),u.setColValue(a,"cmaterialvid",{value:r.refcode,display:r.refcode}),u.setColValue(a,"cmaterialoid",{value:r.refcode,display:r.refcode}),u.setColValue(a,"cmaterialvid.name",{value:r.refname,display:r.refname}),u.setColValue(a,"pk_partunit",{value:r.values.pk_measdoc.value,display:r.values.measdoc_name.value})}},this.getButtonNames=function(e){return"edit"===e||"add"===e||"save"===e?"main-button":"secondary - button"},this.getTableHead=function(){e.props.button.createButton,e.props.button.getButtons();var t=e.props.getUrlParam("status");return s.default.createElement("div",{className:"shoulder-definition-area"},s.default.createElement("div",{className:"definition-search"},"browse"==t?s.default.createElement("div",null,s.default.createElement("span",{className:"definition-search-title"},e.state.json["10140SAQSG-000045"]|e.state.json["10140SAQSG-000046"],"："),s.default.createElement("span",{className:"count"},e.state.totalcount),s.default.createElement("span",null,e.state.json["10140SAQSG-000047"])):s.default.createElement("span",{className:"definition-search-title"})),s.default.createElement("div",{className:"definition-icons"},e.props.cardTable.createBrowseIcons(e.tableId,{iconArr:["close","open","max","setCol"],maxDestAreaId:"nc-bill-card"})))}},o);t.default=I},3:function(e,t){e.exports=a},392:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=r(a(222));r(a(2)),r(a(3));function r(e){return e&&e.__esModule?e:{default:e}}var n=(0,a(1).createPage)({initTemplate:function(){}})(o.default);t.default=n},468:function(e,t,a){e.exports=a(392)},7:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.conf=void 0;var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var o in a)Object.prototype.hasOwnProperty.call(a,o)&&(e[o]=a[o])}return e};t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return React.createElement(r,o({},n,e))};var r=a(1).high.Refer,n=t.conf={multiLang:{domainName:"uap",currentLocale:"zh-CN",moduleId:"uapRefer"},queryTreeUrl:"/nccloud/riart/ref/groupRefTreeAction.do",refType:"tree",placeholder:"1880000025-000061",refName:"1880000025-000061",rootNode:{refname:"1880000025-000061",refpk:"root"}}}})});
//# sourceMappingURL=index.f2ee5453.js.map