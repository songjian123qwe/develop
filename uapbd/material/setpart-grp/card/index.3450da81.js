!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("nc-lightapp-front"),require("react"),require("react-dom")):"function"==typeof define&&define.amd?define(["nc-lightapp-front","react","react-dom"],t):"object"==typeof exports?exports["uapbd/material/setpart-grp/card/index"]=t(require("nc-lightapp-front"),require("react"),require("react-dom")):e["uapbd/material/setpart-grp/card/index"]=t(e["nc-lightapp-front"],e.React,e.ReactDOM)}(window,function(e,t,a){return function(e){var t={};function a(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,a),r.l=!0,r.exports}return a.m=e,a.c=t,a.d=function(e,t,o){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(a.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)a.d(o,r,function(t){return e[t]}.bind(null,r));return o},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="../../../../",a(a.s=339)}({1:function(t,a){t.exports=e},131:function(e,t){e.exports=function(e){var t="undefined"!=typeof window&&window.location;if(!t)throw new Error("fixUrls requires window.location");if(!e||"string"!=typeof e)return e;var a=t.protocol+"//"+t.host,o=a+t.pathname.replace(/\/[^\/]*$/,"/");return e.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(e,t){var r,n=t.trim().replace(/^"(.*)"$/,function(e,t){return t}).replace(/^'(.*)'$/,function(e,t){return t});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(n)?e:(r=0===n.indexOf("//")?n:0===n.indexOf("/")?a+n:o+n.replace(/^\.\//,""),"url("+JSON.stringify(r)+")")})}},161:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var o in a)Object.prototype.hasOwnProperty.call(a,o)&&(e[o]=a[o])}return e};t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t={multiLang:{domainName:"uapbd",currentLocale:"zh-CN",moduleId:"refer_uapbd"},refType:"tree",refName:"refer-000209",rootNode:{refname:"refer-000209",refpk:"root"},placeholder:"refer-000209",refCode:"uapbd.org.CorpDefaultTreeRef",queryTreeUrl:"/nccloud/uapbd/org/CorpDefaultTreeRef.do",treeConfig:{name:["refer-000002","refer-000003"],code:["refcode","refname"]},isMultiSelectedEnabled:!1,unitProps:n.conf,isShowUnit:!1};return React.createElement(s,o({},t,e))};var r=a(1),n=a(5),s=r.high.Refer},2:function(e,a){e.exports=t},213:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o,r,n=function(){function e(e,t){for(var a=0;a<t.length;a++){var o=t[a];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,a,o){return a&&e(t.prototype,a),o&&e(t,o),t}}(),s=a(2),l=c(s),i=(c(a(6)),a(1));a(214);var d=c(a(161));function c(e){return e&&e.__esModule?e:{default:e}}function u(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}i.base.NCAffix,i.base.NCPopconfirm,i.base.NCFormControl;var p=i.base.NCBackBtn,f=i.high.PrintOutput,m=(i.cardCache.setDefData,i.cardCache.getDefData,i.cardCache.addCache),g=i.cardCache.updateCache,b=i.cardCache.deleteCacheById,v=(i.cardCache.getCurrentLastId,i.cardCache.getNextId),h="ic_setpart",y="ic_setpart_b",I="search",k="/nccloud/uapbd/setpart/save.do",w="/nccloud/uapbd/setpart/print.do";function _(e){console.log("toggleShow");var t=e.getUrlParam("status");console.log(t),"edit"==t||"add"==t?(e.button.setButtonVisible(["edit","add","back","delete","refresh","print"],!1),e.button.setButtonVisible(["save","cancel","addline"],!0),e.cardPagination.setCardPaginationVisible("cardPaginationBtn",!1)):(e.button.setButtonVisible(["save","addline","cancel"],!1),e.button.setButtonVisible(["add","edit","delete","back","refresh","print"],!0),e.cardPagination.setCardPaginationVisible("cardPaginationBtn",!0)),e.form.setFormStatus(h,t),e.cardTable.setStatus(y,t)}var C=(o=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var a=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return r.call(a),a.formId=h,a.searchId=I,a.tableId=y,a.id="",a.state={pk_org:"",title_code:"",totalcount:0,applycount:0,configs:{},curOrg:null,json:{}},a.cardUrl="",a.listUrl="",a.unitInfo={},"group"==e.config.nodetype?(a.cardUrl="/uapbd/material/setpart-grp/card/index.html",a.listUrl="/uapbd/material/setpart-grp/list/index.html"):(a.cardUrl="/uapbd/material/setpart-org/card/index.html",a.listUrl="/uapbd/material/setpart-org/list/index.html"),a.initTemplate(e),a}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,s.Component),n(t,[{key:"componentDidMount",value:function(){var e=this;if(console.log("componentDidMount"),"add"!=this.props.getUrlParam("status")){var t=this.props.getUrlParam("id");t&&"undefined"!=t&&t.length>0&&(this.id=t,this.getdata(t))}else this.setDefaultValue();this.props.button.setDisabled({delete:!0,print:!0,output:!0,edit:!0}),"org"==this.props.config.nodetype?this.props.form.setFormItemsDisabled(this.formId,{cmaterialvid:!0}):this.props.form.setFormItemsDisabled(this.formId,{cmaterialvid:!1}),this.loadUnitInfo(),setTimeout(function(){console.log("set default unit"),console.log(e.props.config),null!=e.props.config.defaultOrg.pk_org&&e.props.config.defaultOrg.pk_org.length>0&&(e.state.configs.CorpDefaultTreeRef={value:{refpk:e.props.config.defaultOrg.pk_org,refname:e.props.config.defaultOrg.org_Name}},e.state.curOrgObj={refpk:e.props.config.defaultOrg.pk_org,refname:e.props.config.defaultOrg.org_Name},e.state.curOrg=e.props.config.defaultOrg.pk_org,e.setState(e.state),e.props.form.setFormItemsDisabled(e.formId,{cmaterialvid:!1}))},500),setTimeout(function(){var t=e.props.form.getFormItemsValue(e.formId,"pk_setpart").value;null==t||t.length<1?e.props.button.setDisabled({delete:!0,print:!0,output:!0,edit:!0}):e.props.button.setDisabled({delete:!1,print:!1,output:!1,edit:!1})},1e3)}},{key:"componentWillMount",value:function(){var e=this;(0,i.getMultiLang)({moduleId:"10141486",domainName:"uapbd",callback:function(t){console.log(t),e.setState({json:t})}})}},{key:"componentDidUpdate",value:function(){var e=this.props.form.getFormStatus(this.formId);window.onbeforeunload="add"!=e&&"edit"!=e?null:function(){return""}}},{key:"createCfg",value:function(e,t){console.log(this.state.configs[e]);var a={value:this.state.configs[e]?this.state.configs[e].value:[],onChange:function(t){console.log("onChange-000-"+t),console.log(t),null==t|null==t.refpk?this.props.form.setFormItemsDisabled(this.formId,{cmaterialvid:!0}):this.props.form.setFormItemsDisabled(this.formId,{cmaterialvid:!1}),this.state.curOrg=t.refpk;var a=Object.assign(this.state.configs[e],{value:t});this.setState(Object.assign(this.state.configs,a))}.bind(this)};return this.state.configs[e]=a,Object.assign(a,t)}},{key:"render",value:function(){var e=this,t=this.props,a=t.cardTable,o=t.form,r=t.button,n=t.modal,s=t.cardPagination.createCardPagination,i=this.props.button.getButtons(),c=r.createButtonApp;i=i.sort(function(e,t){return t.btnorder-e.btnorder});var u=o.createForm,m=a.createCardTable,g=(r.createButton,n.createModal),b=this.props.getUrlParam("status");return l.default.createElement("div",{id:"nc-bill-card"},l.default.createElement("div",{className:"nc-bill-card"},l.default.createElement("div",{className:"nc-bill-header-area"},l.default.createElement("div",{className:"header-title-search-area"},l.default.createElement(p,{className:"title-search-detail",style:{display:"add"==this.props.form.getFormStatus(this.formId)||"edit"==this.props.form.getFormStatus(this.formId)?"none":"",marginRight:"6px"},onClick:this.buttonClick.bind(this,this.props,"back")}),l.default.createElement("h2",{className:"title-search-detail"},this.state.json[this.props.config.nodeName],"browse"==b?"："+this.state.title_code:"")),function(){var t;return"add"===e.props.getUrlParam("status")&&e.props.config.nodetype&&"org"===e.props.config.nodetype?l.default.createElement("div",{className:"search-box"},(0,d.default)((function(e){if(null==e)throw new TypeError("Cannot destructure undefined")}(t=e.createCfg("CorpDefaultTreeRef",{pid:"",keyword:"",pageInfo:{pageIndex:0,pageSize:10,totalPage:"0"},queryCondition:function(){return{isShowDisabledData:!0,TreeRefActionExt:"nccloud.web.refer.sqlbuilder.PrimaryOrgSQLBuilder"}}})),t))):""}(),l.default.createElement("div",{className:"header-button-area"},c({area:"header-button-area",onButtonClick:this.buttonClick.bind(this)}),"add"!=this.props.form.getFormStatus(this.formId)&&"edit"!=this.props.form.getFormStatus(this.formId)?l.default.createElement("div",{className:"header-button-cardPagination"},s({handlePageInfoChange:this.pageInfoClick.bind(this),dataSource:"setpart-list"})):"")),l.default.createElement("div",{className:"nc-bill-form-area"},u(this.formId,{onAfterEvent:this.afterEvent.bind(this)})),l.default.createElement("div",{style:{height:"8px"}}),l.default.createElement("div",{className:"nc-bill-table-area"},m(this.tableId,{tableHead:this.getTableHead.bind(this),modelSave:this.saveClick.bind(this),showIndex:!0,onAfterEvent:this.cardTableAfterEventFn.bind(this)})),g("delete",{title:this.state.json["10141486-000006"],content:this.state.json["10141486-000007"],beSureBtnClick:this.delConfirm.bind(this)}),g("confirmModal",{title:this.state.json["10141486-000006"],content:this.state.json["10141486-000027"]}),l.default.createElement(f,{ref:"printOutput",url:w,data:{funcode:"10141486",nodekey:"",oids:this.state.pks,outputType:"output"}})))}}]),t}(),r=function(){var e=this;this.initTemplate=function(t){t.createUIDom({pagecode:t.config.pageCode},function(a){if(console.log("data"),console.log(a),a){if(a.template){var o=a.template;e.modifierMeta(t,o),t.meta.setMeta(o)}if(a.button){var r=a.button;t.button.setButtons(r),console.log("initTemplate"),console.log(t),console.log(t.button.getButtons());var n=t.getUrlParam("status");"edit"==n||"add"==n?(t.button.setButtonVisible(["edit","add","back","delete","refresh","print"],!1),t.button.setButtonVisible(["save","cancel","addline"],!0),t.cardPagination.setCardPaginationVisible("cardPaginationBtn",!1)):(t.button.setButtonVisible(["save","cancel","addline"],!1),t.button.setButtonVisible(["add","edit","delete","back","refresh","print"],!0),t.cardPagination.setCardPaginationVisible("cardPaginationBtn",!0)),t.form.setFormStatus(t.config.formId,n),t.cardTable.setStatus(t.config.tableId,n)}t.config.defaultOrg={pk_org:a.context.pk_org,org_Name:a.context.org_Name}}})},this.modifierMeta=function(t,a){var o=t.getUrlParam("status");a[t.config.formId].status=o,a[t.config.tableId].status=o,console.log("modifierMeta");for(var r=a[t.config.formId].items,n=0;n<r.length;n++)"cmaterialvid"===r[n].attrcode&&(r[n].refcode="../../../../uapbd/refer/pub/MaterialMultiVersionGridRef/index.js",r[n].queryCondition=function(){return{setpartsflag:"Y",pk_org:e.state.curOrg,GridRefActionExt:"nccloud.web.uapbd.ref.pub.MaterialMultiVersionGridRefExt"}});var s=a[t.config.tableId].items;console.log(s);for(var i=0;i<s.length;i++)"cmaterialvid"===s[i].attrcode&&(console.log(e.state.json["10141486-000016"]),s[i].refcode="../../../../uapbd/refer/pub/MaterialMultiVersionGridRef/index.js",s[i].queryCondition=function(){return{pk_org:e.state.curOrg,GridRefActionExt:"nccloud.web.uapbd.ref.pub.MaterialMultiVersionGridRefExt"}});var d={attrcode:"opr",label:e.state.json["10141486-000000"],visible:!0,itemtype:"customer",className:"table-opr",width:200,fixed:"right",render:function(a,o,r){return"browse"===t.cardTable.getStatus(t.config.tableId)?l.default.createElement("span",{onClick:function(){t.cardTable.toggleRowView(t.config.tableId,o)}}):l.default.createElement("div",{className:"currency-opr-col"},l.default.createElement("span",{className:"currency-opr-del",onClick:function(e){t.cardTable.openModel(t.config.tableId,"edit",o,r),e.stopPropagation()}},e.state.json["10141486-000028"]),"  ",l.default.createElement("span",{className:"currency-opr-del",onClick:function(e){t.cardTable.delRowsByIndex(t.config.tableId,r),e.stopPropagation()}},e.state.json["10141486-000036"]))}};return a[t.config.tableId].items.push(d),a},this.setDefaultValue=function(){e.props.form.setFormItemsValue(e.formId,{bill_status:{value:"0",display:e.state.json["10141486-000017"]}})},this.buttonClick=function(t,a){console.log("buttonClick"),console.log(t),console.log(a);switch(a){case"print":var o=e.props.getUrlParam("id");if(null==o||"undefined"==o)return;var r=[];r.push(o),(0,i.print)("pdf",w,{billtype:"",funcode:t.config.appcode,nodekey:"",oids:r,outputType:"print"});break;case"output":if(null==(o=e.props.getUrlParam("id"))||"undefined"==o)return;return(r=[]).push(o),void e.setState({pks:r},function(){e.refs.printOutput.open()});case"add":t.form.EmptyAllFormValue(e.formId),t.cardTable.setTableData(e.tableId,{rows:[]}),t.pushTo("/card",{status:"add",id:t.getUrlParam("id")}),_(t),e.setDefaultValue(),e.setState(e.state);break;case"edit":var n=t.form.getFormItemsValue(e.formId,"pk_org").value,s=t.form.getFormItemsValue(e.formId,"pk_group").value;if("group"==t.config.nodetype){if(n!=s)return void(0,i.toast)({content:e.state.json["10141486-000018"],color:"warning"})}else if("org"==t.config.nodetype&&n==s)return void(0,i.toast)({content:e.state.json["10141486-000001"],color:"warning"});var l=t.getUrlParam("id");if(null==l||l.length<1||"undefined"==l)return void(0,i.toast)({content:e.state.json["10141486-000019"],color:"warning"});t.pushTo("/card",{status:"edit",id:l}),_(t),e.setState(e.state);var d=t.cardTable.getAllData(e.tableId).rows;if(console.log(d),null!=d&&d.length>0)for(var c=0;c<d.length;c++){var u=e.unitInfo[d[c].values.pk_partunit.value].bitnumber;console.log(e.unitInfo[d[c].values.pk_partunit.value]),null!=u&&(t.cardTable.setValByKeyAndRowId(e.tableId,d[c].rowid,"childsnum",{scale:u}),t.cardTable.setValByKeyAndRowId(e.tableId,d[c].rowid,"partpercent",{scale:u}))}break;case"delete":if(n=t.form.getFormItemsValue(e.formId,"pk_org").value,s=t.form.getFormItemsValue(e.formId,"pk_group").value,"group"==t.config.nodetype){if(n!=s)return void(0,i.toast)({content:e.state.json["10141486-000018"],color:"warning"})}else if("org"==t.config.nodetype&&n==s)return void(0,i.toast)({content:e.state.json["10141486-000001"],color:"warning"});(0,i.promptBox)({color:"warning",title:e.state.json["10141486-000006"],content:e.state.json["10141486-000007"],beSureBtnClick:e.delConfirm.bind(e)});break;case"back":t.pushTo("/list",{});break;case"save":e.execValidateFormular(function(){e.saveClick()});break;case"cancel":return void(0,i.promptBox)({color:"warning",title:e.state.json["10141486-000006"],content:e.state.json["10141486-000020"],beSureBtnClick:function(){t.form.cancel(e.formId),t.pushTo("/card",{status:"browse",id:e.id}),_(t),e.setState(e.state);var a=t.getUrlParam("id"),o=t.form.getFormItemsValue(e.formId,"pk_setpart");null!=o&&o.length>0?(e.props.button.setDisabled({delete:!1,print:!1,output:!1,edit:!1}),e.getdata(o)):null!=a&&a.length>0?(e.props.button.setDisabled({delete:!1,print:!1,output:!1,edit:!1}),e.getdata(a)):(e.props.button.setDisabled({delete:!0,print:!0,output:!0,edit:!0}),t.form.EmptyAllFormValue(e.formId),e.props.cardTable.setTableData(t.config.tableId,{rows:[]}))}});case"addline":t.cardTable.addRow(e.tableId);break;case"refresh":var p=e.props.form.getFormItemsValue(e.formId,"pk_setpart").value;console.log(p),null!=p&&p.length>0&&e.getdata(p,"refresh")}},this.pageInfoClick=function(t,a){var o={pk:a,pageid:t.config.pageCode,template:t.config.template};(0,i.ajax)({url:"/nccloud/uapbd/setpart/pagequery.do",data:o,success:function(o){console.log("pageInfoClick"),console.log(o),o.data&&o.data.head&&(t.form.setAllFormValue(u({},h,o.data.head[h])),t.setUrlParam(a),o.data.body&&t.cardTable.setTableData(e.tableId,o.data.body[y]),e.props.setUrlParam(a),e.id=a)}})},this.afterEvent=function(t,a,o,r,n,s,l,i){t.meta.getMeta(y)[t.config.formId].items;var d=t.form.getAllFormValue(t.config.formId);if(console.log("form afterEvent"),console.log(s),console.log(l),console.log(i),console.log("end"),console.log(d.rows[0].values),null==s||null==s.values)return e.props.form.setFormItemsValue(e.props.config.formId,{"cmaterialvid.name":{value:null,display:null}}),void e.props.form.setFormItemsValue(e.props.config.formId,{pk_unit:{value:s.null,display:null}});e.props.form.setFormItemsValue(e.props.config.formId,{cmaterialoid:{value:s.refpk,display:s.refcode}}),e.props.form.setFormItemsValue(e.props.config.formId,{cmaterialvid:{value:s.refpk,display:s.refcode}}),e.props.form.setFormItemsValue(e.props.config.formId,{"cmaterialvid.name":{value:s.refname,display:s.refname}}),e.props.form.setFormItemsValue(e.props.config.formId,{pk_unit:{value:s.values.pk_measdoc.value,display:s.values.measdoc_name.value}})},this.getdata=function(t,a){if(!(null==t||t.length<1||"undefined"==t)){var o={pk:t,template:e.props.config.template};(0,i.ajax)({url:"/nccloud/uapbd/setpart/pagequery.do",data:o,success:function(o){if(o.data.head){console.log("headdata"),console.log(o.data),console.log(e),e.props.form.setAllFormValue(u({},e.props.config.formId,o.data.head[e.props.config.formId]));var r=o.data.head[e.props.config.formId].rows[0].values["cmaterialvid.name"].display;e.setState({title_code:r}),e.props.setUrlParam(t)}if(o.data.body){e.props.cardTable.setTableData(e.props.config.tableId,o.data.body[e.props.config.tableId]);var n=e.props.cardTable.getNumberOfRows(e.props.config.tableId);e.props.cardTable.getAllRows(e.props.config.tableId);e.genTableScale(),e.setState({applycount:0}),e.setState({totalcount:n})}"refresh"==a&&(0,i.toast)({title:e.state.json["10141486-000009"],color:"success"})}})}},this.genTableScale=function(){var t=e.props.cardTable.getAllData(e.tableId).rows;if(console.log(t),null!=t&&t.length>0){console.log(e.unitInfo);for(var a=0;a<t.length;a++)if(null!=e.unitInfo&&null!=e.unitInfo[t[a].values.pk_partunit.value]){var o=e.unitInfo[t[a].values.pk_partunit.value].bitnumber;console.log(e.unitInfo[t[a].values.pk_partunit.value]),null!=o&&(e.props.cardTable.setValByKeyAndRowId(e.tableId,t[a].rowid,"childsnum",{scale:o}),e.props.cardTable.setValByKeyAndRowId(e.tableId,t[a].rowid,"partpercent",{scale:o}))}}e.setState(e.state)},this.execValidateFormular=function(t){var a,o=e.props.createMasterChildData(e.props.config.pageCode,e.props.config.formId,e.props.config.tableId);console.log(o);var r=(u(a={},e.props.config.formId,"form"),u(a,e.props.config.tableId,"cardTable"),a);e.props.validateToSave(o,function(){console.log("校验公式执行返回成功"),setTimeout(function(){t()},100)},r,"card")},this.saveClick=function(){e.props.cardTable.filterEmptyRows(y,["bpriceflag"]);var t=e.props.createMasterChildData(e.props.config.pageCode,e.props.config.formId,e.props.config.tableId);console.log(t);var a=k;if("edit"===e.props.getUrlParam("status")?(a="/nccloud/uapbd/setpart/save.do",t.head[e.props.config.formId].rows[0].status="1"):"add"===e.props.getUrlParam("status")&&(a=k,t.head[e.props.config.formId].rows[0].status="2"),"org"===e.props.config.nodetype&&"add"===e.props.getUrlParam("status")){var o=e.state.curOrg;if(null==o||o.length<1)return void(0,i.toast)({content:e.state.json["10141486-000021"],color:"warning"});t.head[e.props.config.formId].rows[0].values.pk_org={value:o}}t.template=e.props.config.template;var r=t.body.ic_setpart_b.rows,n=!1;if(null!=r){var s=t.head.ic_setpart.rows[0].values.cmaterialvid.value;console.log(s);for(var l=0;l<r.length;l++)if("3"!=r[l].status&&(n=!0),r[l].values.cmaterialvid.value===s)return(0,i.toast)({content:e.state.json["10141486-000022"],color:"warning"}),void console.log(e.state.json["10141486-000022"])}console.log(r),0!=n?(e.props.cardTable.closeModel(e.props.config.tableId,function(){}),(0,i.ajax)({url:a,data:t,success:function(t){var a=null;t.success&&(t.data&&("group"===e.props.config.nodetype&&(t.data.head[e.props.config.formId].rows[0].values.pk_org.display=""),t.data.head&&t.data.head[e.props.config.formId]&&(e.props.form.setAllFormValue(u({},e.props.config.formId,t.data.head[e.props.config.formId])),a=t.data.head[e.props.config.formId].rows[0].values.pk_setpart.value),t.data.body&&t.data.body[e.props.config.tableId]&&e.props.cardTable.setTableData(e.props.config.tableId,t.data.body[e.props.config.tableId]),"add"===e.props.getUrlParam("status")?(m(a,t.data,e.props.config.formId,"setpart-list"),e.props.setUrlParam(a)):"edit"===e.props.getUrlParam("status")&&g("pk_setpart",a,t.data,e.props.config.formId,"setpart-list")),e.id=a,(0,i.toast)({content:e.state.json["10141486-000024"],color:"success"}),e.props.pushTo("card",{status:"browse",id:a}),_(e.props),e.genTableScale(),e.setState(e.state),e.props.button.setDisabled({delete:!1,print:!1,output:!1,edit:!1}))}})):(0,i.toast)({content:e.state.json["10141486-000023"],color:"warning"})},this.delConfirm=function(t){null!=e.props.getUrlParam("id")&&(0,i.ajax)({url:"/nccloud/uapbd/setpart/del.do",data:{deleteinfo:[{id:e.props.getUrlParam("id"),ts:e.props.form.getFormItemsValue(e.formId,"ts").value}]},success:function(t){if(t){var a=v(e.id,"setpart-list");b("pk_setpart",e.id,"setpart-list"),console.log("nexId="+a),null!=a&&a.length>0?(e.props.pushTo("/card",{status:"browse",id:a}),e.id=a,e.getdata(a)):(e.id=null,e.props.button.setDisabled({delete:!0,print:!0,output:!0,edit:!0}),e.props.form.EmptyAllFormValue(e.formId),e.props.cardTable.setTableData(e.props.config.tableId,{rows:[]}))}}})},this.modelSave=function(t){t.cardTable.closeModel(e.tableId),e.saveClick()},this.loadUnitInfo=function(){(0,i.ajax)({url:"/nccloud/uapbd/setpart/loadUnitInfo.do",success:function(t){console.log("loadUnitInfo"),console.log(t),e.unitInfo=t.data,e.genTableScale()}})},this.cardTableAfterEventFn=function(t,a,o,r,n,s,l,i,d){console.log("cardTableAfterEventFn"),console.log(a),console.log(o),console.log(r),console.log(s),console.log(d),console.log("end"),console.log(t);t.meta.getMeta(y);if("cmaterialvid"===o){console.log(e.state.json["10141486-000025"]);var c=t.meta;console.log("paramcode chagne"),console.log(c);var u=t.cardTable;if(console.log(u),null!=r&&null!=r.values){if(u.setValByKeyAndIndex(a,s,"cmaterialvid",{value:r.refpk,display:r.refcode}),u.setValByKeyAndIndex(a,s,"cmaterialoid",{value:r.refpk,display:r.refcode}),u.setValByKeyAndIndex(a,s,"cmaterialvid.name",{value:r.refname,display:r.refname}),u.setValByKeyAndIndex(a,s,"pk_partunit",{value:r.values.pk_measdoc.value,display:r.values.measdoc_name.value}),null!=e.unitInfo&&null!=e.unitInfo[r.values.pk_measdoc.value]){var p=e.unitInfo[r.values.pk_measdoc.value].bitnumber;console.log(e.unitInfo[r.values.pk_measdoc.value]),null!=p&&(u.setValByKeyAndIndex(a,s,"childsnum",{scale:p}),u.setValByKeyAndIndex(a,s,"partpercent",{scale:p}))}}else u.setValByKeyAndIndex(a,s,"cmaterialvid",{value:null,display:null}),u.setValByKeyAndIndex(a,s,"cmaterialoid",{value:null,display:null}),u.setValByKeyAndIndex(a,s,"cmaterialvid.name",{value:null,display:null}),u.setValByKeyAndIndex(a,s,"pk_partunit",{value:r.nullvalue,display:null})}},this.getButtonNames=function(e){return"edit"===e||"add"===e||"save"===e?"main-button":"secondary - button"},this.getTableHead=function(){var t=e.props.button,a=(t.createButton,t.createButtonApp);e.props.button.getButtons(),e.props.getUrlParam("status");return l.default.createElement("div",{className:"shoulder-definition-area"},l.default.createElement("div",{className:"definition-search"}),l.default.createElement("div",{className:"definition-icons",style:{padding:0,verticalAlign:"middle"}},a({area:"card_body",onButtonClick:e.buttonClick.bind(e)}),e.props.cardTable.createBrowseIcons(e.tableId,{iconArr:["close","open","max","setCol"],maxDestAreaId:"nc-bill-card"})))}},o);t.default=C},214:function(e,t,a){var o=a(215);"string"==typeof o&&(o=[[e.i,o,""]]);var r={transform:void 0};a(4)(o,r);o.locals&&(e.exports=o.locals)},215:function(e,t,a){(e.exports=a(3)(!1)).push([e.i,".tabs-config {\n  height: 40px !important;\n}\n",""])},263:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=r(a(213));r(a(2)),r(a(6));function r(e){return e&&e.__esModule?e:{default:e}}var n={nodeName:"10141486-000033",nodetype:"group",pageCode:"10141486_card",appid:"0001Z0100000000019BE",treeId:"materialtypetreeid",formId:"ic_setpart",tableId:"ic_setpart_b",appcode:"10141486",template:"10141486_card",defaultOrg:{}};var s=(0,a(1).createPage)({billinfo:{billtype:"card",pagecode:n.pageCode,headcode:"ic_setpart",bodycode:"ic_setpart_b"},initTemplate:function(){}})(o.default);t.default=s},3:function(e,t){e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var a=function(e,t){var a=e[1]||"",o=e[3];if(!o)return a;if(t&&"function"==typeof btoa){var r=function(e){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(e))))+" */"}(o),n=o.sources.map(function(e){return"/*# sourceURL="+o.sourceRoot+e+" */"});return[a].concat(n).concat([r]).join("\n")}return[a].join("\n")}(t,e);return t[2]?"@media "+t[2]+"{"+a+"}":a}).join("")},t.i=function(e,a){"string"==typeof e&&(e=[[null,e,""]]);for(var o={},r=0;r<this.length;r++){var n=this[r][0];"number"==typeof n&&(o[n]=!0)}for(r=0;r<e.length;r++){var s=e[r];"number"==typeof s[0]&&o[s[0]]||(a&&!s[2]?s[2]=a:a&&(s[2]="("+s[2]+") and ("+a+")"),t.push(s))}},t}},339:function(e,t,a){e.exports=a(263)},4:function(e,t,a){var o={},r=function(e){var t;return function(){return void 0===t&&(t=e.apply(this,arguments)),t}}(function(){return window&&document&&document.all&&!window.atob}),n=function(e){var t={};return function(e){return void 0===t[e]&&(t[e]=function(e){return document.querySelector(e)}.call(this,e)),t[e]}}(),s=null,l=0,i=[],d=a(131);function c(e,t){for(var a=0;a<e.length;a++){var r=e[a],n=o[r.id];if(n){n.refs++;for(var s=0;s<n.parts.length;s++)n.parts[s](r.parts[s]);for(;s<r.parts.length;s++)n.parts.push(b(r.parts[s],t))}else{var l=[];for(s=0;s<r.parts.length;s++)l.push(b(r.parts[s],t));o[r.id]={id:r.id,refs:1,parts:l}}}}function u(e,t){for(var a=[],o={},r=0;r<e.length;r++){var n=e[r],s=t.base?n[0]+t.base:n[0],l={css:n[1],media:n[2],sourceMap:n[3]};o[s]?o[s].parts.push(l):a.push(o[s]={id:s,parts:[l]})}return a}function p(e,t){var a=n(e.insertInto);if(!a)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var o=i[i.length-1];if("top"===e.insertAt)o?o.nextSibling?a.insertBefore(t,o.nextSibling):a.appendChild(t):a.insertBefore(t,a.firstChild),i.push(t);else{if("bottom"!==e.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");a.appendChild(t)}}function f(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e);var t=i.indexOf(e);t>=0&&i.splice(t,1)}function m(e){var t=document.createElement("style");return e.attrs.type="text/css",g(t,e.attrs),p(e,t),t}function g(e,t){Object.keys(t).forEach(function(a){e.setAttribute(a,t[a])})}function b(e,t){var a,o,r,n;if(t.transform&&e.css){if(!(n=t.transform(e.css)))return function(){};e.css=n}if(t.singleton){var i=l++;a=s||(s=m(t)),o=h.bind(null,a,i,!1),r=h.bind(null,a,i,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(a=function(e){var t=document.createElement("link");return e.attrs.type="text/css",e.attrs.rel="stylesheet",g(t,e.attrs),p(e,t),t}(t),o=function(e,t,a){var o=a.css,r=a.sourceMap,n=void 0===t.convertToAbsoluteUrls&&r;(t.convertToAbsoluteUrls||n)&&(o=d(o));r&&(o+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */");var s=new Blob([o],{type:"text/css"}),l=e.href;e.href=URL.createObjectURL(s),l&&URL.revokeObjectURL(l)}.bind(null,a,t),r=function(){f(a),a.href&&URL.revokeObjectURL(a.href)}):(a=m(t),o=function(e,t){var a=t.css,o=t.media;o&&e.setAttribute("media",o);if(e.styleSheet)e.styleSheet.cssText=a;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(a))}}.bind(null,a),r=function(){f(a)});return o(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;o(e=t)}else r()}}e.exports=function(e,t){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(t=t||{}).attrs="object"==typeof t.attrs?t.attrs:{},t.singleton||(t.singleton=r()),t.insertInto||(t.insertInto="head"),t.insertAt||(t.insertAt="bottom");var a=u(e,t);return c(a,t),function(e){for(var r=[],n=0;n<a.length;n++){var s=a[n];(l=o[s.id]).refs--,r.push(l)}e&&c(u(e,t),t);for(n=0;n<r.length;n++){var l;if(0===(l=r[n]).refs){for(var i=0;i<l.parts.length;i++)l.parts[i]();delete o[l.id]}}}};var v=function(){var e=[];return function(t,a){return e[t]=a,e.filter(Boolean).join("\n")}}();function h(e,t,a,o){var r=a?"":o.css;if(e.styleSheet)e.styleSheet.cssText=v(t,r);else{var n=document.createTextNode(r),s=e.childNodes;s[t]&&e.removeChild(s[t]),s.length?e.insertBefore(n,s[t]):e.appendChild(n)}}},5:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.conf=void 0;var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var o in a)Object.prototype.hasOwnProperty.call(a,o)&&(e[o]=a[o])}return e};t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return React.createElement(r,o({},n,e))};var r=a(1).high.Refer,n=t.conf={multiLang:{domainName:"uap",currentLocale:"zh-CN",moduleId:"uapRefer"},queryTreeUrl:"/nccloud/riart/ref/groupRefTreeAction.do",refType:"tree",placeholder:"1880000025-000061",refName:"1880000025-000061",rootNode:{refname:"1880000025-000061",refpk:"root"}}},6:function(e,t){e.exports=a}})});
//# sourceMappingURL=index.3450da81.js.map