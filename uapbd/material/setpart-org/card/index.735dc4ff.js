!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("nc-lightapp-front"),require("react"),require("react-dom")):"function"==typeof define&&define.amd?define(["nc-lightapp-front","react","react-dom"],t):"object"==typeof exports?exports["uapbd/material/setpart-org/card/index"]=t(require("nc-lightapp-front"),require("react"),require("react-dom")):e["uapbd/material/setpart-org/card/index"]=t(e["nc-lightapp-front"],e.React,e.ReactDOM)}(window,function(e,t,o){return function(e){var t={};function o(a){if(t[a])return t[a].exports;var r=t[a]={i:a,l:!1,exports:{}};return e[a].call(r.exports,r,r.exports,o),r.l=!0,r.exports}return o.m=e,o.c=t,o.d=function(e,t,a){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(o.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(a,r,function(t){return e[t]}.bind(null,r));return a},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="../../../../",o(o.s=363)}({1:function(t,o){t.exports=e},144:function(e,t){e.exports=function(e){var t="undefined"!=typeof window&&window.location;if(!t)throw new Error("fixUrls requires window.location");if(!e||"string"!=typeof e)return e;var o=t.protocol+"//"+t.host,a=o+t.pathname.replace(/\/[^\/]*$/,"/");return e.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(e,t){var r,n=t.trim().replace(/^"(.*)"$/,function(e,t){return t}).replace(/^'(.*)'$/,function(e,t){return t});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(n)?e:(r=0===n.indexOf("//")?n:0===n.indexOf("/")?o+n:a+n.replace(/^\.\//,""),"url("+JSON.stringify(r)+")")})}},168:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var a in o)Object.prototype.hasOwnProperty.call(o,a)&&(e[a]=o[a])}return e};t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t={multiLang:{domainName:"uapbd",currentLocale:"zh-CN",moduleId:"refer_uapbd"},refType:"tree",refName:"refer-000209",rootNode:{refname:"refer-000209",refpk:"root"},placeholder:"refer-000209",refCode:"uapbd.org.CorpDefaultTreeRef",queryTreeUrl:"/nccloud/uapbd/org/CorpDefaultTreeRef.do",treeConfig:{name:["refer-000002","refer-000003"],code:["refcode","refname"]},isMultiSelectedEnabled:!1,unitProps:n.conf,isShowUnit:!1};return React.createElement(l,a({},t,e))};var r=o(1),n=o(3),l=r.high.Refer},2:function(e,o){e.exports=t},216:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a,r,n=function(){function e(e,t){for(var o=0;o<t.length;o++){var a=t[o];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,o,a){return o&&e(t.prototype,o),a&&e(t,a),t}}(),l=o(2),s=c(l),i=(c(o(4)),o(1));o(217);var d=c(o(168));function c(e){return e&&e.__esModule?e:{default:e}}function u(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}i.base.NCAffix,i.base.NCPopconfirm,i.base.NCFormControl;var p=i.base.NCBackBtn,f=i.high.PrintOutput,g=(i.cardCache.setDefData,i.cardCache.getDefData,i.cardCache.addCache),m=i.cardCache.updateCache,b=i.cardCache.deleteCacheById,v=i.cardCache.getCurrentLastId,h=i.cardCache.getNextId,y="setpart-list",I="ic_setpart",k="ic_setpart_b",w="search",x="/nccloud/uapbd/setpart/save.do",_="/nccloud/uapbd/setpart/print.do";function C(e){console.log("toggleShow");var t=e.getUrlParam("status");console.log(t),"edit"==t||"add"==t?(e.button.setButtonVisible(["edit","add","back","delete","refresh","print"],!1),e.button.setButtonVisible(["save","cancel","addline","insert","copy"],!0),e.cardPagination.setCardPaginationVisible("cardPaginationBtn",!1)):(e.button.setButtonVisible(["save","addline","insert","copy","cancel"],!1),e.button.setButtonVisible(["add","edit","delete","back","refresh","print"],!0),e.cardPagination.setCardPaginationVisible("cardPaginationBtn",!0)),e.form.setFormStatus(I,t),e.cardTable.setStatus(k,t)}var T=(a=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var o=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return r.call(o),o.formId=I,o.searchId=w,o.tableId=k,o.id="",o.state={pk_org:"",title_code:"",totalcount:0,applycount:0,configs:{},curOrg:null,json:{}},o.cardUrl="",o.listUrl="",o.unitInfo={},o.selectedRowid="",o.selectedIndex=-1,"group"==e.config.nodetype?(o.cardUrl="/uapbd/material/setpart-grp/card/index.html",o.listUrl="/uapbd/material/setpart-grp/list/index.html"):(o.cardUrl="/uapbd/material/setpart-org/card/index.html",o.listUrl="/uapbd/material/setpart-org/list/index.html"),o.initTemplate(e),o}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,l.Component),n(t,[{key:"componentDidMount",value:function(){var e=this;if(console.log("componentDidMount"),"add"!=this.props.getUrlParam("status")){var t=this.props.getUrlParam("id");t&&"undefined"!=t&&t.length>0&&(this.id=t,this.getdata(t))}else this.setDefaultValue();this.props.button.setDisabled({delete:!0,print:!0,output:!0,edit:!0}),"org"==this.props.config.nodetype?this.props.form.setFormItemsDisabled(this.formId,{cmaterialvid:!0}):this.props.form.setFormItemsDisabled(this.formId,{cmaterialvid:!1}),this.loadUnitInfo(),setTimeout(function(){console.log("set default unit"),console.log(e.props.config),null!=e.props.config.defaultOrg.pk_org&&e.props.config.defaultOrg.pk_org.length>0&&e.corpRefValidate()},500),setTimeout(function(){var t=e.props.form.getFormItemsValue(e.formId,"pk_setpart").value;null==t||t.length<1?e.props.button.setDisabled({delete:!0,print:!0,output:!0,edit:!0}):e.props.button.setDisabled({delete:!1,print:!1,output:!1,edit:!1})},1e3)}},{key:"componentWillMount",value:function(){var e=this;(0,i.getMultiLang)({moduleId:"10141486",domainName:"uapbd",callback:function(t){console.log(t),e.setState({json:t})}})}},{key:"componentDidUpdate",value:function(){var e=this.props.form.getFormStatus(this.formId);window.onbeforeunload="add"!=e&&"edit"!=e?null:function(){return""}}},{key:"createCfg",value:function(e,t){console.log(this.state.configs[e]);var o={value:this.state.configs[e]?this.state.configs[e].value:[],onChange:function(t){console.log("onChange-000-"+t),console.log(t),null==t|null==t.refpk?this.props.form.setFormItemsDisabled(this.formId,{cmaterialvid:!0}):this.props.form.setFormItemsDisabled(this.formId,{cmaterialvid:!1}),this.state.curOrg=t.refpk;var o=Object.assign(this.state.configs[e],{value:t});this.setState(Object.assign(this.state.configs,o))}.bind(this)};return this.state.configs[e]=o,Object.assign(o,t)}},{key:"render",value:function(){var e=this,t=this.props,o=t.cardTable,a=t.form,r=t.button,n=t.modal,l=t.cardPagination.createCardPagination,i=this.props.button.getButtons(),c=r.createButtonApp;i=i.sort(function(e,t){return t.btnorder-e.btnorder});var u=a.createForm,g=o.createCardTable,m=(r.createButton,n.createModal),b=this.props.getUrlParam("status");return s.default.createElement("div",{id:"nc-bill-card"},s.default.createElement("div",{className:"nc-bill-card"},s.default.createElement("div",{className:"nc-bill-header-area"},s.default.createElement("div",{className:"header-title-search-area"},s.default.createElement(p,{className:"title-search-detail",style:{display:"add"==this.props.form.getFormStatus(this.formId)||"edit"==this.props.form.getFormStatus(this.formId)?"none":"",marginRight:"6px"},onClick:this.buttonClick.bind(this,this.props,"back")}),s.default.createElement("h2",{className:"title-search-detail"},this.state.json[this.props.config.nodeName],"browse"==b?"："+this.state.title_code:"")),function(){var t;return"add"===e.props.getUrlParam("status")&&e.props.config.nodetype&&"org"===e.props.config.nodetype?s.default.createElement("div",{className:"search-box"},(0,d.default)((function(e){if(null==e)throw new TypeError("Cannot destructure undefined")}(t=e.createCfg("CorpDefaultTreeRef",{pid:"",keyword:"",pageInfo:{pageIndex:0,pageSize:10,totalPage:"0"},queryCondition:function(){return{TreeRefActionExt:"nccloud.web.refer.sqlbuilder.PrimaryOrgSQLBuilder"}}})),t))):""}(),s.default.createElement("div",{className:"header-button-area"},c({area:"header-button-area",onButtonClick:this.buttonClick.bind(this)}),"add"!=this.props.form.getFormStatus(this.formId)&&"edit"!=this.props.form.getFormStatus(this.formId)?s.default.createElement("div",{className:"header-button-cardPagination"},l({handlePageInfoChange:this.pageInfoClick.bind(this),dataSource:y})):"")),s.default.createElement("div",{className:"nc-bill-form-area"},u(this.formId,{onAfterEvent:this.afterEvent.bind(this)})),s.default.createElement("div",{style:{height:"8px"}}),s.default.createElement("div",{className:"nc-bill-table-area"},g(this.tableId,{tableHead:this.getTableHead.bind(this),modelSave:this.saveClick.bind(this),showIndex:!0,onAfterEvent:this.cardTableAfterEventFn.bind(this),onRowClick:function(t,o,a,r,n){console.log(o),console.log(a),console.log(r),console.log(n),e.selectedRowid=a.rowid,e.selectedIndex=r},dataSource:y})),m("delete",{title:this.state.json["10141486-000006"],content:this.state.json["10141486-000007"],beSureBtnClick:this.delConfirm.bind(this)}),m("confirmModal",{title:this.state.json["10141486-000006"],content:this.state.json["10141486-000027"]}),s.default.createElement(f,{ref:"printOutput",url:_,data:{funcode:"10141486",nodekey:"",oids:this.state.pks,outputType:"output"}})))}}]),t}(),r=function(){var e=this;this.initTemplate=function(t){t.createUIDom({pagecode:t.config.pageCode},function(o){if(console.log("data"),console.log(o),o){if(o.template){var a=o.template;e.modifierMeta(t,a),t.meta.setMeta(a)}if(o.button){var r=o.button;t.button.setButtons(r),console.log("initTemplate"),console.log(t),console.log(t.button.getButtons());var n=t.getUrlParam("status");"edit"==n||"add"==n?(t.button.setButtonVisible(["edit","add","back","delete","refresh","print"],!1),t.button.setButtonVisible(["save","cancel","addline","insert","copy"],!0),t.cardPagination.setCardPaginationVisible("cardPaginationBtn",!1)):(t.button.setButtonVisible(["save","cancel","addline","insert","copy"],!1),t.button.setButtonVisible(["add","edit","delete","back","refresh","print"],!0),t.cardPagination.setCardPaginationVisible("cardPaginationBtn",!0)),t.form.setFormStatus(t.config.formId,n),t.cardTable.setStatus(t.config.tableId,n)}t.config.defaultOrg={pk_org:o.context.pk_org,org_Name:o.context.org_Name}}})},this.modifierMeta=function(t,o){var a=t.getUrlParam("status");o[t.config.formId].status=a,o[t.config.tableId].status=a,console.log("modifierMeta");for(var r=o[t.config.formId].items,n=0;n<r.length;n++)"cmaterialvid"===r[n].attrcode&&(r[n].refcode="../../../../uapbd/refer/pub/MaterialMultiVersionGridRef/index.js",r[n].queryCondition=function(){return{setpartsflag:"Y",pk_org:e.state.curOrg,GridRefActionExt:"nccloud.web.uapbd.ref.pub.MaterialMultiVersionGridRefExt"}});var l=o[t.config.tableId].items;console.log(l);for(var i=0;i<l.length;i++)"cmaterialvid"===l[i].attrcode&&(console.log(e.state.json["10141486-000016"]),l[i].refcode="../../../../uapbd/refer/pub/MaterialMultiVersionGridRef/index.js",l[i].queryCondition=function(){return{pk_org:e.state.curOrg,GridRefActionExt:"nccloud.web.uapbd.ref.pub.MaterialMultiVersionGridRefExt"}});var d={attrcode:"opr",label:e.state.json["10141486-000000"],visible:!0,itemtype:"customer",className:"table-opr",width:200,fixed:"right",render:function(o,a,r){return"browse"===t.cardTable.getStatus(t.config.tableId)?s.default.createElement("span",{onClick:function(){t.cardTable.toggleRowView(t.config.tableId,a)}}):s.default.createElement("div",{className:"currency-opr-col"},s.default.createElement("span",{className:"currency-opr-del",onClick:function(e){t.cardTable.openModel(t.config.tableId,"edit",a,r),e.stopPropagation()}},e.state.json["10141486-000028"]),"  ",s.default.createElement("span",{className:"currency-opr-del",onClick:function(e){t.cardTable.delRowsByIndex(t.config.tableId,r),e.stopPropagation()}},e.state.json["10141486-000036"]))}};return o[t.config.tableId].items.push(d),o},this.setDefaultValue=function(){e.props.form.setFormItemsValue(e.formId,{bill_status:{value:"0",display:e.state.json["10141486-000017"]}})},this.buttonClick=function(t,o){console.log("buttonClick"),console.log(t),console.log(o);switch(o){case"print":var a=e.props.getUrlParam("id");if(null==a||"undefined"==a)return;var r=[];r.push(a),(0,i.print)("pdf",_,{billtype:"",funcode:t.config.appcode,nodekey:"",oids:r,outputType:"print"});break;case"output":if(null==(a=e.props.getUrlParam("id"))||"undefined"==a)return;return(r=[]).push(a),void e.setState({pks:r},function(){e.refs.printOutput.open()});case"add":t.form.EmptyAllFormValue(e.formId),t.cardTable.setTableData(e.tableId,{rows:[]}),t.pushTo("/card",{status:"add",id:t.getUrlParam("id")}),C(t),e.setDefaultValue(),e.setState(e.state);break;case"edit":var n=t.form.getFormItemsValue(e.formId,"pk_org").value,l=t.form.getFormItemsValue(e.formId,"pk_group").value;if("group"==t.config.nodetype){if(n!=l)return void(0,i.toast)({content:e.state.json["10141486-000018"],color:"warning"})}else if("org"==t.config.nodetype&&n==l)return void(0,i.toast)({content:e.state.json["10141486-000001"],color:"warning"});var s=t.getUrlParam("id");if(null==s||s.length<1||"undefined"==s)return void(0,i.toast)({content:e.state.json["10141486-000019"],color:"warning"});t.pushTo("/card",{status:"edit",id:s}),C(t),e.setState(e.state);var d=t.cardTable.getAllData(e.tableId).rows;if(console.log(d),null!=d&&d.length>0)for(var c=0;c<d.length;c++){var u=e.unitInfo[d[c].values.pk_partunit.value].bitnumber;console.log(e.unitInfo[d[c].values.pk_partunit.value]),null!=u&&(t.cardTable.setValByKeyAndRowId(e.tableId,d[c].rowid,"childsnum",{scale:u}),t.cardTable.setValByKeyAndRowId(e.tableId,d[c].rowid,"partpercent",{scale:u}))}break;case"delete":if(n=t.form.getFormItemsValue(e.formId,"pk_org").value,l=t.form.getFormItemsValue(e.formId,"pk_group").value,"group"==t.config.nodetype){if(n!=l)return void(0,i.toast)({content:e.state.json["10141486-000018"],color:"warning"})}else if("org"==t.config.nodetype&&n==l)return void(0,i.toast)({content:e.state.json["10141486-000001"],color:"warning"});(0,i.promptBox)({color:"warning",title:e.state.json["10141486-000006"],content:e.state.json["10141486-000007"],beSureBtnClick:e.delConfirm.bind(e)});break;case"back":t.pushTo("/list",{});break;case"save":e.execValidateFormular(function(){e.saveClick()});break;case"cancel":return void(0,i.promptBox)({color:"warning",title:e.state.json["10141486-000006"],content:e.state.json["10141486-000020"],beSureBtnClick:function(){t.form.cancel(e.formId),t.pushTo("/card",{status:"browse",id:e.id}),C(t),e.setState(e.state);var o=t.getUrlParam("id");console.log(o),console.log(v(y)),(null==o||o.length<1)&&(o=v(y),console.log(o));var a=t.form.getFormItemsValue(e.formId,"pk_setpart");null!=a&&a.length>0?(e.props.button.setDisabled({delete:!1,print:!1,output:!1,edit:!1}),e.getdata(a)):null!=o&&o.length>0?(e.props.button.setDisabled({delete:!1,print:!1,output:!1,edit:!1}),e.getdata(o)):(e.props.button.setDisabled({delete:!0,print:!0,output:!0,edit:!0}),t.form.EmptyAllFormValue(e.formId),e.props.cardTable.setTableData(t.config.tableId,{rows:[]}))}});case"addline":t.cardTable.addRow(e.tableId);var p=t.cardTable.getAllRows(e.tableId);e.selectedIndex=p.length-1;break;case"insert":e.selectedIndex>-1&&t.cardTable.addRow(e.tableId,e.selectedIndex);break;case"copy":p=t.cardTable.getAllRows(e.tableId),console.log(p);var f=p.length;if(f>0&&e.selectedIndex>-1&&e.selectedIndex<f){var g=t.cardTable.getRowsByIndexs(e.tableId,e.selectedIndex);console.log(g),t.cardTable.addRow(e.tableId,f,g[0].values,!0),e.selectedIndex=f}break;case"refresh":var m=e.props.form.getFormItemsValue(e.formId,"pk_setpart").value;console.log(m),null!=m&&m.length>0&&e.getdata(m,"refresh")}},this.pageInfoClick=function(t,o){var a={pk:o,pageid:t.config.pageCode,template:t.config.template};(0,i.ajax)({url:"/nccloud/uapbd/setpart/pagequery.do",data:a,success:function(a){console.log("pageInfoClick"),console.log(a),a.data&&a.data.head&&(t.form.setAllFormValue(u({},I,a.data.head[I])),t.setUrlParam(o),a.data.body&&t.cardTable.setTableData(e.tableId,a.data.body[k]),e.props.setUrlParam(o),e.id=o)}})},this.afterEvent=function(t,o,a,r,n,l,s,i){t.meta.getMeta(k)[t.config.formId].items;var d=t.form.getAllFormValue(t.config.formId);if(console.log("form afterEvent"),console.log(l),console.log(s),console.log(i),console.log("end"),console.log(d.rows[0].values),null==l||null==l.values)return e.props.form.setFormItemsValue(e.props.config.formId,{"cmaterialvid.name":{value:null,display:null}}),void e.props.form.setFormItemsValue(e.props.config.formId,{pk_unit:{value:l.null,display:null}});e.props.form.setFormItemsValue(e.props.config.formId,{cmaterialoid:{value:l.refpk,display:l.refcode}}),e.props.form.setFormItemsValue(e.props.config.formId,{cmaterialvid:{value:l.refpk,display:l.refcode}}),e.props.form.setFormItemsValue(e.props.config.formId,{"cmaterialvid.name":{value:l.refname,display:l.refname}}),e.props.form.setFormItemsValue(e.props.config.formId,{pk_unit:{value:l.values.pk_measdoc.value,display:l.values.measdoc_name.value}})},this.getdata=function(t,o){if(!(null==t||t.length<1||"undefined"==t)){var a={pk:t,template:e.props.config.template};(0,i.ajax)({url:"/nccloud/uapbd/setpart/pagequery.do",data:a,success:function(a){if(a.data.head){console.log("headdata"),console.log(a.data),console.log(e),e.props.form.setAllFormValue(u({},e.props.config.formId,a.data.head[e.props.config.formId]));var r=a.data.head[e.props.config.formId].rows[0].values["cmaterialvid.name"].display;e.setState({title_code:r}),e.props.setUrlParam(t)}if(a.data.body){e.props.cardTable.setTableData(e.props.config.tableId,a.data.body[e.props.config.tableId]);var n=e.props.cardTable.getNumberOfRows(e.props.config.tableId);e.props.cardTable.getAllRows(e.props.config.tableId);e.genTableScale(),e.setState({applycount:0}),e.setState({totalcount:n})}"refresh"==o&&(0,i.toast)({title:e.state.json["10141486-000009"],color:"success"})}})}},this.genTableScale=function(){var t=e.props.cardTable.getAllData(e.tableId).rows;if(console.log(t),null!=t&&t.length>0){console.log(e.unitInfo);for(var o=0;o<t.length;o++)if(null!=e.unitInfo&&null!=e.unitInfo[t[o].values.pk_partunit.value]){var a=e.unitInfo[t[o].values.pk_partunit.value].bitnumber;console.log(e.unitInfo[t[o].values.pk_partunit.value]),null!=a&&(e.props.cardTable.setValByKeyAndRowId(e.tableId,t[o].rowid,"childsnum",{scale:a}),e.props.cardTable.setValByKeyAndRowId(e.tableId,t[o].rowid,"partpercent",{scale:a}))}}e.setState(e.state)},this.execValidateFormular=function(t){var o,a=e.props.createMasterChildData(e.props.config.pageCode,e.props.config.formId,e.props.config.tableId);console.log(a);var r=(u(o={},e.props.config.formId,"form"),u(o,e.props.config.tableId,"cardTable"),o);e.props.validateToSave(a,function(){console.log("校验公式执行返回成功"),setTimeout(function(){t()},100)},r,"card")},this.saveClick=function(){e.props.cardTable.filterEmptyRows(k,["bpriceflag"]);var t=e.props.createMasterChildData(e.props.config.pageCode,e.props.config.formId,e.props.config.tableId);console.log(t);var o=x;if("edit"===e.props.getUrlParam("status")?(o="/nccloud/uapbd/setpart/save.do",t.head[e.props.config.formId].rows[0].status="1"):"add"===e.props.getUrlParam("status")&&(o=x,t.head[e.props.config.formId].rows[0].status="2"),"org"===e.props.config.nodetype&&"add"===e.props.getUrlParam("status")){var a=e.state.curOrg;if(null==a||a.length<1)return void(0,i.toast)({content:e.state.json["10141486-000021"],color:"warning"});t.head[e.props.config.formId].rows[0].values.pk_org={value:a}}t.template=e.props.config.template;var r=t.body.ic_setpart_b.rows,n=!1;if(null!=r){var l=t.head.ic_setpart.rows[0].values.cmaterialvid.value;console.log(l);for(var s=0;s<r.length;s++)if("3"!=r[s].status&&(n=!0),r[s].values.cmaterialvid.value===l)return(0,i.toast)({content:e.state.json["10141486-000022"],color:"warning"}),void console.log(e.state.json["10141486-000022"])}console.log(r),0!=n?(e.props.cardTable.closeModel(e.props.config.tableId,function(){}),(0,i.ajax)({url:o,data:t,success:function(t){var o=null;t.success&&(t.data&&("group"===e.props.config.nodetype&&(t.data.head[e.props.config.formId].rows[0].values.pk_org.display=""),t.data.head&&t.data.head[e.props.config.formId]&&(e.props.form.setAllFormValue(u({},e.props.config.formId,t.data.head[e.props.config.formId])),o=t.data.head[e.props.config.formId].rows[0].values.pk_setpart.value),t.data.body&&t.data.body[e.props.config.tableId]&&e.props.cardTable.setTableData(e.props.config.tableId,t.data.body[e.props.config.tableId]),"add"===e.props.getUrlParam("status")?(g(o,t.data,e.props.config.formId,y),e.props.setUrlParam(o)):"edit"===e.props.getUrlParam("status")&&m("pk_setpart",o,t.data,e.props.config.formId,y)),e.id=o,e.props.pushTo("card",{status:"browse",id:o}),C(e.props),e.genTableScale(),e.setState(e.state),e.props.button.setDisabled({delete:!1,print:!1,output:!1,edit:!1}),(0,i.toast)({content:e.state.json["10141486-000024"],color:"success"}))}})):(0,i.toast)({content:e.state.json["10141486-000023"],color:"warning"})},this.corpRefValidate=function(){var t=e.props.config.defaultOrg.pk_org;(0,i.ajax)({url:"/nccloud/uapbd/setpart/corpRefValidate.do",data:{pk_corp:t},success:function(t){console.log("loadUnitInfo"),console.log(t),"1"==t.data&&(e.state.configs.CorpDefaultTreeRef={value:{refpk:e.props.config.defaultOrg.pk_org,refname:e.props.config.defaultOrg.org_Name}},e.state.curOrgObj={refpk:e.props.config.defaultOrg.pk_org,refname:e.props.config.defaultOrg.org_Name},e.state.curOrg=e.props.config.defaultOrg.pk_org,e.setState(e.state),e.props.form.setFormItemsDisabled(e.formId,{cmaterialvid:!1}))}})},this.delConfirm=function(t){null!=e.props.getUrlParam("id")&&(0,i.ajax)({url:"/nccloud/uapbd/setpart/del.do",data:{deleteinfo:[{id:e.props.getUrlParam("id"),ts:e.props.form.getFormItemsValue(e.formId,"ts").value}]},success:function(t){if(t){var o=h(e.id,y);b("pk_setpart",e.id,y),console.log("nexId="+o),null!=o&&o.length>0?(e.props.pushTo("/card",{status:"browse",id:o}),e.id=o,e.getdata(o)):(e.id=null,e.props.button.setDisabled({delete:!0,print:!0,output:!0,edit:!0}),e.props.form.EmptyAllFormValue(e.formId),e.props.cardTable.setTableData(e.props.config.tableId,{rows:[]})),(0,i.toast)({content:e.state.json["10141486-000008"],color:"success"})}}})},this.modelSave=function(t){t.cardTable.closeModel(e.tableId),e.saveClick()},this.loadUnitInfo=function(){(0,i.ajax)({url:"/nccloud/uapbd/setpart/loadUnitInfo.do",success:function(t){console.log("loadUnitInfo"),console.log(t),e.unitInfo=t.data,e.genTableScale()}})},this.cardTableAfterEventFn=function(t,o,a,r,n,l,s,i,d){console.log("cardTableAfterEventFn"),console.log(o),console.log(a),console.log(r),console.log(l),console.log(d),console.log("end"),console.log(t);t.meta.getMeta(k);if("cmaterialvid"===a){console.log(e.state.json["10141486-000025"]);var c=t.meta;console.log("paramcode chagne"),console.log(c);var u=t.cardTable;if(console.log(u),null!=r&&null!=r.values){if(u.setValByKeyAndIndex(o,l,"cmaterialvid",{value:r.refpk,display:r.refcode}),u.setValByKeyAndIndex(o,l,"cmaterialoid",{value:r.refpk,display:r.refcode}),u.setValByKeyAndIndex(o,l,"cmaterialvid.name",{value:r.refname,display:r.refname}),u.setValByKeyAndIndex(o,l,"pk_partunit",{value:r.values.pk_measdoc.value,display:r.values.measdoc_name.value}),null!=e.unitInfo&&null!=e.unitInfo[r.values.pk_measdoc.value]){var p=e.unitInfo[r.values.pk_measdoc.value].bitnumber;console.log(e.unitInfo[r.values.pk_measdoc.value]),null!=p&&(u.setValByKeyAndIndex(o,l,"childsnum",{scale:p}),u.setValByKeyAndIndex(o,l,"partpercent",{scale:p}))}}else u.setValByKeyAndIndex(o,l,"cmaterialvid",{value:null,display:null}),u.setValByKeyAndIndex(o,l,"cmaterialoid",{value:null,display:null}),u.setValByKeyAndIndex(o,l,"cmaterialvid.name",{value:null,display:null}),u.setValByKeyAndIndex(o,l,"pk_partunit",{value:r.nullvalue,display:null})}},this.getButtonNames=function(e){return"edit"===e||"add"===e||"save"===e?"main-button":"secondary - button"},this.getTableHead=function(){var t=e.props.button,o=(t.createButton,t.createButtonApp);e.props.button.getButtons(),e.props.getUrlParam("status");return s.default.createElement("div",{className:"shoulder-definition-area"},s.default.createElement("div",{className:"definition-search"}),s.default.createElement("div",{className:"definition-icons",style:{padding:0,verticalAlign:"middle"}},o({area:"card_body",onButtonClick:e.buttonClick.bind(e)}),e.props.cardTable.createBrowseIcons(e.tableId,{iconArr:["close","open","max","setCol"],maxDestAreaId:"nc-bill-card"})))}},a);t.default=T},217:function(e,t,o){var a=o(218);"string"==typeof a&&(a=[[e.i,a,""]]);var r={transform:void 0};o(6)(a,r);a.locals&&(e.exports=a.locals)},218:function(e,t,o){(e.exports=o(5)(!1)).push([e.i,".tabs-config {\n  height: 40px !important;\n}\n",""])},274:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r(o(216));r(o(2)),r(o(4));function r(e){return e&&e.__esModule?e:{default:e}}var n={nodeName:"成套件-业务单元",nodetype:"org",pageCode:"10141487_card",appid:"0001Z0100000000019BE",treeId:"materialtypetreeid",formId:"ic_setpart",tableId:"ic_setpart_b",appcode:"10141486",template:"10141487_card",defaultOrg:{}};var l=(0,o(1).createPage)({billinfo:{billtype:"card",pagecode:n.pageCode,headcode:"ic_setpart",bodycode:"ic_setpart_b"},initTemplate:function(){}})(a.default);t.default=l},3:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.conf=void 0;var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var a in o)Object.prototype.hasOwnProperty.call(o,a)&&(e[a]=o[a])}return e};t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return React.createElement(r,a({},n,e))};var r=o(1).high.Refer,n=t.conf={multiLang:{domainName:"uap",currentLocale:"zh-CN",moduleId:"uapRefer"},queryTreeUrl:"/nccloud/riart/ref/groupRefTreeAction.do",refType:"tree",placeholder:"1880000025-000061",refName:"1880000025-000061",rootNode:{refname:"1880000025-000061",refpk:"root"}}},363:function(e,t,o){e.exports=o(274)},4:function(e,t){e.exports=o},5:function(e,t){e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var o=function(e,t){var o=e[1]||"",a=e[3];if(!a)return o;if(t&&"function"==typeof btoa){var r=function(e){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(e))))+" */"}(a),n=a.sources.map(function(e){return"/*# sourceURL="+a.sourceRoot+e+" */"});return[o].concat(n).concat([r]).join("\n")}return[o].join("\n")}(t,e);return t[2]?"@media "+t[2]+"{"+o+"}":o}).join("")},t.i=function(e,o){"string"==typeof e&&(e=[[null,e,""]]);for(var a={},r=0;r<this.length;r++){var n=this[r][0];"number"==typeof n&&(a[n]=!0)}for(r=0;r<e.length;r++){var l=e[r];"number"==typeof l[0]&&a[l[0]]||(o&&!l[2]?l[2]=o:o&&(l[2]="("+l[2]+") and ("+o+")"),t.push(l))}},t}},6:function(e,t,o){var a={},r=function(e){var t;return function(){return void 0===t&&(t=e.apply(this,arguments)),t}}(function(){return window&&document&&document.all&&!window.atob}),n=function(e){var t={};return function(e){return void 0===t[e]&&(t[e]=function(e){return document.querySelector(e)}.call(this,e)),t[e]}}(),l=null,s=0,i=[],d=o(144);function c(e,t){for(var o=0;o<e.length;o++){var r=e[o],n=a[r.id];if(n){n.refs++;for(var l=0;l<n.parts.length;l++)n.parts[l](r.parts[l]);for(;l<r.parts.length;l++)n.parts.push(b(r.parts[l],t))}else{var s=[];for(l=0;l<r.parts.length;l++)s.push(b(r.parts[l],t));a[r.id]={id:r.id,refs:1,parts:s}}}}function u(e,t){for(var o=[],a={},r=0;r<e.length;r++){var n=e[r],l=t.base?n[0]+t.base:n[0],s={css:n[1],media:n[2],sourceMap:n[3]};a[l]?a[l].parts.push(s):o.push(a[l]={id:l,parts:[s]})}return o}function p(e,t){var o=n(e.insertInto);if(!o)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var a=i[i.length-1];if("top"===e.insertAt)a?a.nextSibling?o.insertBefore(t,a.nextSibling):o.appendChild(t):o.insertBefore(t,o.firstChild),i.push(t);else{if("bottom"!==e.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");o.appendChild(t)}}function f(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e);var t=i.indexOf(e);t>=0&&i.splice(t,1)}function g(e){var t=document.createElement("style");return e.attrs.type="text/css",m(t,e.attrs),p(e,t),t}function m(e,t){Object.keys(t).forEach(function(o){e.setAttribute(o,t[o])})}function b(e,t){var o,a,r,n;if(t.transform&&e.css){if(!(n=t.transform(e.css)))return function(){};e.css=n}if(t.singleton){var i=s++;o=l||(l=g(t)),a=h.bind(null,o,i,!1),r=h.bind(null,o,i,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(o=function(e){var t=document.createElement("link");return e.attrs.type="text/css",e.attrs.rel="stylesheet",m(t,e.attrs),p(e,t),t}(t),a=function(e,t,o){var a=o.css,r=o.sourceMap,n=void 0===t.convertToAbsoluteUrls&&r;(t.convertToAbsoluteUrls||n)&&(a=d(a));r&&(a+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */");var l=new Blob([a],{type:"text/css"}),s=e.href;e.href=URL.createObjectURL(l),s&&URL.revokeObjectURL(s)}.bind(null,o,t),r=function(){f(o),o.href&&URL.revokeObjectURL(o.href)}):(o=g(t),a=function(e,t){var o=t.css,a=t.media;a&&e.setAttribute("media",a);if(e.styleSheet)e.styleSheet.cssText=o;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(o))}}.bind(null,o),r=function(){f(o)});return a(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;a(e=t)}else r()}}e.exports=function(e,t){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(t=t||{}).attrs="object"==typeof t.attrs?t.attrs:{},t.singleton||(t.singleton=r()),t.insertInto||(t.insertInto="head"),t.insertAt||(t.insertAt="bottom");var o=u(e,t);return c(o,t),function(e){for(var r=[],n=0;n<o.length;n++){var l=o[n];(s=a[l.id]).refs--,r.push(s)}e&&c(u(e,t),t);for(n=0;n<r.length;n++){var s;if(0===(s=r[n]).refs){for(var i=0;i<s.parts.length;i++)s.parts[i]();delete a[s.id]}}}};var v=function(){var e=[];return function(t,o){return e[t]=o,e.filter(Boolean).join("\n")}}();function h(e,t,o,a){var r=o?"":a.css;if(e.styleSheet)e.styleSheet.cssText=v(t,r);else{var n=document.createTextNode(r),l=e.childNodes;l[t]&&e.removeChild(l[t]),l.length?e.insertBefore(n,l[t]):e.appendChild(n)}}}})});
//# sourceMappingURL=index.735dc4ff.js.map