!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("nc-lightapp-front"),require("react"),require("react-dom")):"function"==typeof define&&define.amd?define(["nc-lightapp-front","react","react-dom"],t):"object"==typeof exports?exports["uapbd/supplier/supplierqualisys_org/list/index"]=t(require("nc-lightapp-front"),require("react"),require("react-dom")):e["uapbd/supplier/supplierqualisys_org/list/index"]=t(e["nc-lightapp-front"],e.React,e.ReactDOM)}(window,function(e,t,a){return function(e){var t={};function a(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,a),r.l=!0,r.exports}return a.m=e,a.c=t,a.d=function(e,t,o){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(a.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)a.d(o,r,function(t){return e[t]}.bind(null,r));return o},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="../../../../",a(a.s=472)}({1:function(t,a){t.exports=e},152:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var o in a)Object.prototype.hasOwnProperty.call(a,o)&&(e[o]=a[o])}return e};t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t={multiLang:{domainName:"uapbd",currentLocale:"zh-CN",moduleId:"refer_uapbd"},refType:"tree",refName:"refer-000209",rootNode:{refname:"refer-000209",refpk:"root"},placeholder:"refer-000209",refCode:"uapbd.org.CorpDefaultTreeRef",queryTreeUrl:"/nccloud/uapbd/org/CorpDefaultTreeRef.do",treeConfig:{name:["refer-000002","refer-000003"],code:["refcode","refname"]},isMultiSelectedEnabled:!1,unitProps:n.conf,isShowUnit:!1};return React.createElement(l,o({},t,e))};var r=a(1),n=a(7),l=r.high.Refer},2:function(e,a){e.exports=t},223:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o,r,n=function(){function e(e,t){for(var a=0;a<t.length;a++){var o=t[a];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,a,o){return a&&e(t.prototype,a),o&&e(t,o),t}}(),l=a(2),s=c(l),i=(c(a(3)),a(1));c(a(152));function c(e){return e&&e.__esModule?e:{default:e}}i.base.NCPopconfirm,i.base.NCIcon;var u=i.base.NCTabs,d=i.base.NCCheckbox,f=i.base.NCBackBtn,p=(u.NCTabPane,i.cardCache.setDefData),h=(i.cardCache.getDefData,"supplierqualisys-list"),g="10140SAQSG_qualidoc_list",b="supqualidoc",m="1001Z01000000000A9LN",v="/nccloud/uapbd/supplierqualisys/list.do",y=(0,i.getBusinessInfo)(),S=(o=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),console.log("constructor"),console.log(e);var a=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return r.call(a),a.searchId=e.config.searchId,a.tableId=e.config.tableId,a.state={checked:!1,isShowOff:!1,curSelectedNode:null,method:null,configs:{},curOrg:null,json:{}},a.cardUrl="",a.listUrl="",a.mainUrl="","group"==a.props.config.nodetype?(a.cardUrl="/uapbd/supplier/supplierqualisys_grp/card/index.html",a.listUrl="/uapbd/supplier/supplierqualisys_grp/list/index.html",a.mainUrl="/uapbd/supplier/supplierqualisys_grp/main/index.html"):(a.cardUrl="/uapbd/supplier/supplierqualisys_org/card/index.html",a.listUrl="/uapbd/supplier/supplierqualisys_org/list/index.html",a.mainUrl="/uapbd/supplier/supplierqualisys_org/main/index.html"),a.initTemplate(e),a}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,l.Component),n(t,[{key:"componentDidMount",value:function(){var e=this;this.toggleButton(this.props),console.log(this.props.config),console.log(this.props.config.defaultOrg),null!=this.props.config.defaultOrg.pk_org&&this.props.config.defaultOrg.pk_org.length>0&&setTimeout(function(){e.props.search.setSearchValByField(e.searchId,"pk_org",{value:e.props.config.defaultOrg.pk_org,display:e.props.config.defaultOrg.org_Name})},1e3)}},{key:"componentWillMount",value:function(){var e=this;(0,i.getMultiLang)({moduleId:"10140SAQSG",domainName:"uapbd",callback:function(t){console.log(t),e.setState({json:t})}})}},{key:"showOffChange",value:function(){var e=this;this.setState({isShowOff:!this.state.isShowOff},function(){e.refreshAction(e.props)})}},{key:"buttonClick",value:function(e,t){switch(t){case"print":var a=[];this.props.table.getAllTableData(this.tableId).rows.forEach(function(e,t){a.push(e.values.pk_supqualidoc.value)}),console.log("printPks"),console.log(a),(0,i.print)("pdf","/nccloud/uapbd/supplierqualisys/print.do",{billtype:"",funcode:"10140SAQSG",nodekey:"nccloud",oids:a});break;case"add":e.pushTo("/card",{status:"add"});break;case"edit":e.pushTo("/card",{status:"edit"});break;case"back":e.pushTo("/main",{status:"browse"});break;case"refresh":this.refreshAction(e,"refresh");break;case"delete":this.deleteAction(e)}}},{key:"createCfg",value:function(e,t){var a={value:this.state.configs[e]?this.state.configs[e].value:[],onChange:function(e){console.log("onChange--"+e),console.log(e),this.state.curOrg=e.refpk,this.refreshAction(this.props)}.bind(this)};return this.state.configs[e]=a,Object.assign(a,t)}},{key:"render",value:function(){var e=this.props,t=e.table,a=e.button,o=e.search,r=this.props.button.getButtons();r=r.sort(function(e,t){return t.btnorder-e.btnorder});var n=t.createSimpleTable,l=o.NCCreateSearch,i=(a.createButton,a.getButtons,a.createButtonApp);return s.default.createElement("div",{className:"nc-bill-list"},s.default.createElement("div",{className:"nc-bill-header-area"},s.default.createElement("div",{className:"header-title-search-area"},s.default.createElement(f,{className:"title-search-detail",style:{marginRight:"6px"},onClick:this.buttonClick.bind(this,this.props,"back")}),s.default.createElement("h2",{className:"title-search-detail"},this.state.json[this.props.config.nodeName])),s.default.createElement("div",{className:"title-search-detail"},s.default.createElement("span",{className:"showOff"},s.default.createElement(d,{checked:this.state.isShowOff,onChange:this.showOffChange.bind(this)},this.state.json["10140SAQSG-000055"]))),s.default.createElement("div",{className:"header-button-area"},i({area:"header-button-area",onButtonClick:this.buttonClick.bind(this)}))),s.default.createElement("div",{className:"nc-bill-search-area"},l(this.searchId,{clickSearchBtn:this.clickSearchBtn.bind(this),onAfterEvent:this.onSearchAfterEvent.bind(this)})),s.default.createElement("div",{style:{height:"0px",backgroundColor:"#EDEDED"}}),s.default.createElement("div",{className:"nc-bill-table-area"},n(this.tableId,{handlePageInfoChange:this.pageInfoClick,tableModelConfirm:this.tableModelConfirm,showIndex:!0,showCheck:!0,dataSource:h,onRowDoubleClick:this.doubleClick.bind(this)})))}}]),t}(),r=function(){var e=this;this.initTemplate=function(t){t.createUIDom({pagecode:t.config.pageCode},function(a){if(console.log("inittemplage"),console.log(a),a){if(a.template){var o=a.template;o=e.modifierMeta(t,o),t.meta.setMeta(o),null!=(y=(0,i.getBusinessInfo)())&&t.search.setSearchValByField(t.config.searchId,"pk_org",{value:y.groupId,display:y.groupName});var r=i.cacheTools.get("searchParams");console.log("searchParams"),console.log(r),null!=r&&0!=r||(r=[]);var n={conditions:r=[],pageInfo:{pageIndex:0,pageSize:10,total:0,totalPage:0},pagecode:t.config.pageId,queryAreaCode:t.config.searchId,oid:t.config.oid,queryType:"tree",template:t.config.template};if((0,t.table.hasCacheData)(h))return void console.log(e.state.json["10140SAQSG-000061"]);(0,i.ajax)({url:v,data:n,success:function(e){console.log("queryListUrl"),console.log(e),e.data&&(console.log(11),console.log(e.data[t.config.tableId]),p("key_list",h,e.data[t.config.tableId]),t.table.setAllTableData(t.config.tableId,e.data[t.config.tableId]))},error:function(e){console.log(e)}})}if(a.button){var l=a.button;t.button.setButtons(l)}console.log(a.context),t.config.defaultOrg={pk_org:a.context.pk_org,org_Name:a.context.org_Name}}})},this.modifierMeta=function(t,a){a[t.config.searchId].items=a[t.config.searchId].items.map(function(e,t){return e.col="3",e});for(var o=a[t.config.searchId].items,r=0;r<o.length;r++)"pk_org"==o[r].attrcode&&(o[r].isRunWithChildren=!0),"pk_qualitype"==o[r].attrcode&&(o[r].refcode="../../../../uapbd/refer/pub/SupplierQualiTypeTreeRef/index.js");return a[t.config.tableId].pagination=!0,a[t.config.tableId].items=a[t.config.tableId].items.map(function(e,a){return e.width=150,"cmaterialvid"==e.attrcode&&(e.render=function(e,a,o){return s.default.createElement("span",{style:{color:"#007ace",cursor:"pointer"},onClick:function(){var e=t.search.getAllSearchData("search");t.CacheTools.set("searchParams",e),t.CacheTools.set("preid",a[t.config.pk_item].value),t.pushTo("/card",{status:"browse",id:a.pk_setpart.value})}},a&&a.cmaterialvid&&a.cmaterialvid.value)}),e}),console.log("meta push"),a[t.config.tableId].items.push({attrcode:"opr",label:e.state.json["10140SAQSG-000001"],width:200,fixed:"right",className:"table-opr",visible:!0,render:function(a,o,r){return s.default.createElement("span",null,s.default.createElement("span",{style:{cursor:"pointer"},onClick:function(){t.pushTo("/card",{status:"browse",id:o[t.config.pk_item].value})}},e.state.json["10140SAQSG-000058"]),s.default.createElement("span",null,"   "))}}),a},this.toggleButton=function(e){},this.getButtonNames=function(e){return"edit"===e||"add"===e||"save"===e?"main-button":"secondary - button"},this.doubleClick=function(t,a,o){console.log(e.state.json["10140SAQSG-000063"]),console.log(e);e.props.search.getAllSearchData("search");e.props.pushTo("/card",{status:"browse",id:t.pk_supqualidoc.value})},this.deleteAction=function(t){var a=t.table.getCheckedRows(b);console.log(a);var o={deleteinfo:a.map(function(e){return{id:e.data.values.pk_supqualidoc.value,ts:e.data.values.ts.value}})};console.log(o),(0,i.ajax)({url:"/nccloud/uapbd/supplierqualisys/del.do",data:o,success:function(a){(0,i.toast)({color:"success",title:e.state.json["10140SAQSG-000014"]}),e.refreshAction(t)}})},this.refreshAction=function(t,a){var o=t.search.getAllSearchData("search");if(console.log(o),0!=o){var r={querycondition:{conditions:null==o?null:o.conditions,logic:null==o?null:o.logic},custcondition:{conditions:[{field:"nodetype",value:{firstvalue:t.config.nodetype}},{field:"curOrg",value:{firstvalue:e.state.curOrg}},{field:"isShowOff",value:{firstvalue:e.state.isShowOff?"1":"0"}}]},pageInfo:{pageIndex:0,pageSize:10,total:0,totalPage:0},pagecode:g,queryAreaCode:"search",oid:m,queryType:"tree",querytype:"tree",template:t.config.template,showOfff:e.state.isShowOff};(0,i.ajax)({url:v,data:r,success:function(o){console.log(o),o.data?(p("key_list",h,o.data[b]),t.table.setAllTableData(b,o.data[b])):t.table.setAllTableData(b,{rows:[]}),"refresh"==a&&(0,i.toast)({title:e.state.json["10140SAQSG-000005"],color:"success"})},error:function(e){console.log(e.message)}})}},this.pageInfoClick=function(t,a,o){var r=t.table.getTablePageInfo(e.tableId),n=t.search.getAllSearchData("search"),l={querycondition:{conditions:null==n?null:n.conditions,logic:null==n?null:n.logic},custcondition:{conditions:[{field:"nodetype",value:{firstvalue:t.config.nodetype}},{field:"curOrg",value:{firstvalue:e.state.curOrg}},{field:"isShowOff",value:{firstvalue:e.state.isShowOff?"1":"0"}}]},allpks:o,pageid:g,pageInfo:r,pagecode:g,queryAreaCode:"search",oid:m,queryType:"tree",querytype:"tree",template:t.config.template,showOfff:e.state.isShowOff};(0,i.ajax)({url:"/nccloud/uapbd/supplierqualisys/list.do",data:l,success:function(e){var a=e.success,o=e.data;a&&(o?(console.log(t),p("key_list",h,e.data[t.config.tableId]),t.table.setAllTableData(t.config.tableId,o[t.config.tableId])):t.table.setAllTableData(t.config.tableId,{rows:[]}))}})},this.onSearchAfterEvent=function(t,a){console.log("onSearchAfterEvent"),console.log(t),console.log(a);var o=e.props.search.getAllSearchData(e.searchId,!1);if(i.cacheTools.set("searchParams",o),null!=a&&void 0!=a&&null!=a.refcode&&void 0!=a.refcode){var r=e.props.search.getSearchValByField(e.searchId,t);"cmaterialoid.code"===t?(r.display=a.refcode,r.value.firstvalue=a.refcode):"cmaterialoid.name"===t?(r.display=a.refname,r.value.firstvalue=a.refname):"pk_setpart_b.cmaterialoid"===t?(r.display=a.refcode,r.value.firstvalue=a.refcode):"pk_setpart_b.cmaterialoid.name"===t&&(r.display=a.refname,r.value.firstvalue=a.refname),r.value=r.value.firstvalue,e.props.search.setSearchValByField(e.searchId,t,r),console.log(e.props.search.getSearchValByField(e.searchId,t))}},this.clickSearchBtn=function(t,a){console.log("clickSearchBtn"),a=e.props.search.getAllSearchData("search"),console.log(a);t.meta.getMeta();var o={querycondition:{conditions:null==a?null:a.conditions,logic:null==a?null:a.logic},custcondition:{conditions:[{field:"nodetype",value:{firstvalue:e.props.config.nodetype}},{field:"curOrg",value:{firstvalue:e.state.curOrg}}]},pageInfo:{pageIndex:0,pageSize:10,total:0,totalPage:0},pagecode:g,queryAreaCode:"search",oid:m,queryType:"tree",querytype:"tree",template:e.props.config.template,showOfff:e.state.isShowOff};(0,i.ajax)({url:v,data:o,success:function(a){console.log(a),a.data?(t.table.setAllTableData(e.tableId,a.data[e.props.config.tableId]),(0,i.toast)({content:e.state.json["10140SAQSG-000064"]+a.data[e.props.config.tableId].pageInfo.total+e.state.json["10140SAQSG-000065"],color:"success"})):(t.table.setAllTableData(e.tableId,{rows:[]}),(0,i.toast)({content:e.state.json["10140SAQSG-000066"],color:"warning"}))}})}},o);t.default=S},3:function(e,t){e.exports=a},394:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(a(223)),r=(n(a(2)),n(a(3)),a(1));function n(e){return e&&e.__esModule?e:{default:e}}r.cardCache.setDefData,r.cardCache.getDefData,r.base.NCPopconfirm,r.base.NCIcon,r.base.NCTabs,(0,r.getBusinessInfo)();var l=(0,r.createPage)({initTemplate:function(){}})(o.default);t.default=l},472:function(e,t,a){e.exports=a(394)},7:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.conf=void 0;var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var o in a)Object.prototype.hasOwnProperty.call(a,o)&&(e[o]=a[o])}return e};t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return React.createElement(r,o({},n,e))};var r=a(1).high.Refer,n=t.conf={multiLang:{domainName:"uap",currentLocale:"zh-CN",moduleId:"uapRefer"},queryTreeUrl:"/nccloud/riart/ref/groupRefTreeAction.do",refType:"tree",placeholder:"1880000025-000061",refName:"1880000025-000061",rootNode:{refname:"1880000025-000061",refpk:"root"}}}})});
//# sourceMappingURL=index.4151f5b4.js.map