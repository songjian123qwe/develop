!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("nc-lightapp-front"),require("react"),require("react-dom")):"function"==typeof define&&define.amd?define(["nc-lightapp-front","react","react-dom"],t):"object"==typeof exports?exports["uapbd/supplier/supbanken/list/index"]=t(require("nc-lightapp-front"),require("react"),require("react-dom")):e["uapbd/supplier/supbanken/list/index"]=t(e["nc-lightapp-front"],e.React,e.ReactDOM)}(window,function(e,t,a){return function(e){var t={};function a(s){if(t[s])return t[s].exports;var n=t[s]={i:s,l:!1,exports:{}};return e[s].call(n.exports,n,n.exports,a),n.l=!0,n.exports}return a.m=e,a.c=t,a.d=function(e,t,s){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(a.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)a.d(s,n,function(t){return e[t]}.bind(null,n));return s},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="../../../../",a(a.s=405)}({1:function(t,a){t.exports=e},2:function(e,a){e.exports=t},289:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s,n,l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var s in a)Object.prototype.hasOwnProperty.call(a,s)&&(e[s]=a[s])}return e},o=function(){function e(e,t){for(var a=0;a<t.length;a++){var s=t[a];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}return function(t,a,s){return a&&e(t.prototype,a),s&&e(t,s),t}}(),r=a(2),i=c(r),u=(c(a(3)),a(1));function c(e){return e&&e.__esModule?e:{default:e}}u.base.NCPopconfirm;var b=u.base.NCCheckbox,p=(u.base.NCIcon,u.base.NCTabs.NCTabPane,u.high.PrintOutput),d="10140SBAE_list",h="search",f="supbank",v="pk_bankaccbas",k="/nccloud/uapbd/supbanken/querySupbankenList.do",g="/nccloud/uapbd/supbanken/enableSupbankenCard.do",m="/nccloud/uapbd/supbanken/printSupbanken.do";var S=(s=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var a=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.call(a),a.searchId=h,a.tableId=f,a.selectedRowRecord=null,a.enableNumber=0,a.disableNumber=0,a.state={showOffDisable:!1,isShowOff:!1,pks:[],json:{}},a}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,r.Component),o(t,[{key:"componentDidMount",value:function(){var e=this;this.props.MultiInit.getMultiLang({moduleId:"10140SBAE",domainName:"uapbd",callback:function(t,a,s){a&&e.setState({json:t,inlt:s},function(){e.initTemplate(e.props)})}});var t={Enable:!0,Disable:!0};0==this.props.table.getAllTableData(this.tableId).rows.length&&(t.Print=!0,t.Output=!0),this.props.button.setButtonDisabled(t)}},{key:"buttonClick",value:function(e,t){var a=this;switch(t){case"Enable":(0,u.promptBox)({color:"warning",title:this.state.json["10140SBAE-000002"],content:this.state.json["10140SBAE-000003"],noFooter:!1,noCancelBtn:!1,beSureBtnName:this.state.json["10140SBAE-000004"],cancelBtnName:this.state.json["10140SBAE-000005"],beSureBtnClick:this.enableSureEventClick.bind(this)});break;case"Disable":(0,u.promptBox)({color:"warning",title:this.state.json["10140SBAE-000006"],content:this.state.json["10140SBAE-000007"],noFooter:!1,noCancelBtn:!1,beSureBtnName:this.state.json["10140SBAE-000004"],cancelBtnName:this.state.json["10140SBAE-000005"],beSureBtnClick:this.disableSureEventClick.bind(this)});break;case"Print":this.output("print");break;case"Output":var s=[];this.props.table.getAllTableData(f).rows.forEach(function(e){s.push(e.values.pk_custbank.value),s.push(e.values.pk_bankaccbas.value),s.push(e.values.pk_cust.value)}),this.setState({pks:s},function(){a.refs.printOutput.open()});break;case"Refresh":this.refreshAction(e)}}},{key:"output",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=[];this.props.table.getAllTableData(f).rows.forEach(function(e){t.push(e.values.pk_custbank.value),t.push(e.values.pk_bankaccbas.value),t.push(e.values.pk_cust.value)}),""!=e&&(0,u.print)("pdf",m,{funcode:"10140SBAE",nodekey:"suplist",oids:t,outputType:e})}},{key:"onRowClick",value:function(e,t,a,s){this.selectedRowRecord=a}},{key:"onSelected",value:function(e,t,a,s,n){var l=a.enablestate.value;n?2==l?this.enableNumber++:this.disableNumber++:2==l?this.enableNumber--:this.disableNumber--;var o={Enable:!(this.disableNumber>0),Disable:!(this.enableNumber>0)};e.button.setButtonDisabled(o)}},{key:"onSelectedAll",value:function(e,t,a,s){var n=this,l=this.props.table.getAllTableData(f);a?l.rows.forEach(function(e){2==e.values.enablestate.value?n.enableNumber++:n.disableNumber++}):(this.enableNumber=0,this.disableNumber=0);var o={Enable:!(this.disableNumber>0),Disable:!(this.enableNumber>0)};e.button.setButtonDisabled(o)}},{key:"getData",value:function(e,t){var a=this,s=arguments.length>2&&void 0!==arguments[2]&&arguments[2],n=arguments[3],o=this.props.search.getQueryInfo("search"),r=o.oid,i=l({},o,{pageInfo:{pageIndex:0,pageSize:10,total:0,totalPage:0},pagecode:d,queryAreaCode:h,oid:r,queryType:"tree",showDisable:t});(0,u.ajax)({url:k,data:i,success:function(e){if(e.data){var t=[];e.data[f].rows.forEach(function(e){var a=e.values.pk_custbank.value+"_"+e.values.pk_bankaccbas.value+"_"+e.values.pk_cust.value;t.push(a)}),u.cacheTools.set("allpks",t),e.data[f].allpks=t,a.props.button.setButtonDisabled({Print:!1,Output:!1}),a.props.table.setAllTableData(a.tableId,e.data[f]);var l=t.length,o=a.state.inlt;s&&(0,u.toast)({title:a.state.json["10140SBAE-000026"],content:o&&o.get("10140SBAE-000036",{count:l}),color:"success"})}else{a.props.button.setButtonDisabled({Print:!0,Output:!0}),a.props.table.setAllTableData(f,{allpks:[],rows:[]}),s&&(0,u.toast)({content:a.state.json["10140SBAE-000029"],color:"warning",title:a.state.json["10140SBAE-000030"]})}a.props.button.setButtonDisabled({Enable:!0,Disable:!0}),a.enableNumber=0,a.disableNumber=0,n&&"function"==typeof n&&n()}})}},{key:"enableSureEventClick",value:function(){var e=this,t=this.props.table.getCheckedRows(this.tableId);if(0!=t.length){var a={isEnable:!0,list:[]};t.forEach(function(e){var t={};t.pk_bankaccbas=e.data.values.pk_bankaccbas.value,t.pk_custbank=e.data.values.pk_custbank.value,t.pk_cust=e.data.values.pk_cust.value,a.list.push(t)}),(0,u.ajax)({url:g,data:a,success:function(t){e.mergeRetData(t.data,!0),(0,u.toast)({color:"success",title:e.state.json["10140SBAE-000009"]})}})}else(0,u.toast)({color:"warning",content:this.state.json["10140SBAE-000031"]})}},{key:"mergeRetData",value:function(e,t){var a=this,s=this.props.table.getAllTableData(this.tableId);s.rows.forEach(function(s,n){var l=""+s.values.pk_bankaccbas.value+s.values.pk_cust.value+s.values.pk_custbank.value;if(e.hasOwnProperty(l)){var o=e[l].split("_");t?(s.values["pk_bankaccbas.enableuser"]={value:o[0],display:o[0]},s.values["pk_bankaccbas.enabledate"]={value:o[1],display:o[1]},s.values.enablestate={value:2,display:a.state.json["10140SBAE-000032"]}):(s.values["pk_bankaccbas.disableuser"]={value:o[0],display:o[0]},s.values["pk_bankaccbas.disabletime"]={value:o[1],display:o[1]},s.values.enablestate={value:3,display:a.state.json["10140SBAE-000033"]})}}),this.props.table.setAllTableData(this.tableId,s),this.props.table.selectAllRows(this.tableId,!1),this.props.button.setButtonDisabled({Enable:!0,Disable:!0}),this.enableNumber=0,this.disableNumber=0}},{key:"disableSureEventClick",value:function(){var e=this,t=this.props.table.getCheckedRows(this.tableId);if(0!=t.length){var a={isEnable:!1,list:[]};t.forEach(function(e){var t={};t.pk_bankaccbas=e.data.values.pk_bankaccbas.value,t.pk_custbank=e.data.values.pk_custbank.value,t.pk_cust=e.data.values.pk_cust.value,a.list.push(t)}),(0,u.ajax)({url:g,data:a,success:function(t){e.mergeRetData(t.data,!1),(0,u.toast)({color:"success",title:e.state.json["10140SBAE-000010"]})}})}else(0,u.toast)({color:"warning",content:this.state.json["10140SBAE-000031"]})}},{key:"showOffChange",value:function(){var e=!this.state.isShowOff;this.setState({isShowOff:!this.state.isShowOff});var t=this.props.search.getAllSearchData(h);t&&this.getData(t,e)}},{key:"render",value:function(){var e=this,t=this.props,a=t.table,s=t.button,n=t.search,l=t.modal,o=this.props.button.getButtons();o=o.sort(function(e,t){return t.btnorder-e.btnorder});var r=a.createSimpleTable,c=n.NCCreateSearch,d=s.createButtonApp,f=(s.getButtons,l.createModal);return i.default.createElement("div",{className:"nc-bill-list"},i.default.createElement("div",{className:"nc-bill-header-area"},i.default.createElement("div",{className:"header-title-search-area"},i.default.createElement("h2",{className:"title-search-detail"},this.state.json["10140SBAE-000034"])),i.default.createElement("div",{className:"title-search-detail"},i.default.createElement("span",null,i.default.createElement(b,{checked:this.state.isShowOff,onChange:this.showOffChange.bind(this),disabled:this.state.showOffDisable},this.state.json["10140SBAE-000035"]))),i.default.createElement("div",{className:"header-button-area"},d({area:"header-action",buttonLimit:3,onButtonClick:this.buttonClick.bind(this),popContainer:document.querySelector(".header-button-area")}))),i.default.createElement("div",{className:"nc-bill-search-area"},c(this.searchId,{clickSearchBtn:this.clickSearchBtn.bind(this),clickAdvBtnEve:function(){var t=(0,u.getBusinessInfo)();e.props.search.setSearchValByField(h,"pk_org",{value:t.groupId,display:t.groupName})}})),i.default.createElement("div",{className:"nc-bill-table-area"},r(this.tableId,{handlePageInfoChange:this.pageInfoClick,tableModelConfirm:this.tableModelConfirm,showIndex:!0,onRowClick:this.onRowClick.bind(this),onSelected:this.onSelected.bind(this),showCheck:!0,onRowDoubleClick:this.doubleClick.bind(this),onSelectedAll:this.onSelectedAll.bind(this)})),f("enable",{title:this.state.json["10140SBAE-000002"],content:this.state.json["10140SBAE-000003"],beSureBtnClick:this.enableSureEventClick.bind(this)}),f("disable",{title:this.state.json["10140SBAE-000006"],content:this.state.json["10140SBAE-000007"],beSureBtnClick:this.disableSureEventClick.bind(this)}),i.default.createElement(p,{ref:"printOutput",url:m,data:{funcode:"10140SBAE",nodekey:"suplist",oids:this.state.pks,outputType:"output"}}))}}]),t}(),n=function(){var e=this;this.initTemplate=function(t){t.createUIDom({pagecode:d},function(a){if(a){if(a.template){var s=a.template,n=["pk_org","pk_supplier","pk_supplierclass","bankaccsub.pk_currtype","pk_bankdoc","pk_banktype","creator","enableuser"];s[h].items.forEach(function(e){n.indexOf(e.attrcode)>=0&&(e.isMultiSelectedEnabled=!0),"pk_org"==e.attrcode&&(e.queryCondition=function(){return{nodeType:"supplier",TreeRefActionExt:"nccloud.web.uapbd.supplier.supbanken.BankenOrgSqlBuilder"}}),"pk_supplier"==e.attrcode&&(e.isShowUnit=!0,e.isShowDisabledData=!0),"pk_supplierclass"==e.attrcode&&(e.isShowUnit=!0),"pk_bankdoc"==e.attrcode&&(e.isShowDisabledData=!0),"create"!=e.attrcode&&"enableuser"!=e.attrcode||(e.isShowDisabledData=!0)}),t.meta.setMeta(s);var o=u.cacheTools.get("searchParams");if(o&&0!=o){t.search.setSearchValue(h,o);var r=t.search.getQueryInfo(h),i=r.oid,c=l({},r,{pageInfo:{pageIndex:0,pageSize:10,total:0,totalPage:0},pagecode:d,queryAreaCode:h,oid:i,queryType:"tree"});(0,u.ajax)({url:k,data:c,success:function(a){if(a.data){var s=[];a.data[f].rows.forEach(function(e){var t=e.values.pk_custbank.value+"_"+e.values.pk_bankaccbas.value+"_"+e.values.pk_cust.value;s.push(t)}),a.data[f].allpks=s,t.button.setButtonDisabled({Print:!1,Output:!1}),t.table.setAllTableData(f,a.data[f])}else{t.button.setButtonDisabled({Print:!0,Output:!0}),t.table.setAllTableData(f,{allpks:[],rows:[]}),(0,u.toast)({content:e.state.json["10140SBAE-000024"],color:"warning"})}},error:function(e){console.log(e.message)}})}else{var b=(0,u.getBusinessInfo)();t.search.setSearchValByField(h,"pk_org",{value:b.groupId,display:b.groupName})}}if(a.button){var p=a.button;t.button.setButtons(p)}}})},this.getButtonNames=function(e){return"edit"===e||"add"===e||"save"===e?"main-button":"secondary - button"},this.doubleClick=function(t,a,s,n){var l=e.props.search.getAllSearchData(h);u.cacheTools.set("searchParams",l);var o=t.pk_custbank.value+"_"+t.pk_bankaccbas.value+"_"+t.pk_cust.value;e.props.pushTo("/card",{status:"browse",id:o})},this.deleteAction=function(t){var a={id:e.selectedRowRecord[v].value,ts:e.selectedRowRecord.ts.value};(0,u.ajax)({url:deleteUrl,data:a,success:function(a){(0,u.toast)({color:"success",title:e.state.json["10140SBAE-000025"]}),e.refreshAction(t)}})},this.refreshAction=function(t){var a=t.search.getAllSearchData(h);a&&e.getData(a,e.state.isShowOff,!1,function(){(0,u.toast)({color:"success",title:e.state.json["10140SBAE-000008"]})})},this.pageInfoClick=function(t,a,s){t.table.getTablePageInfo(e.tableId),t.search.getAllSearchData(h);var n={allpks:s,pageid:d};(0,u.ajax)({url:"/nccloud/uapbd/taxregion/ProjectQueryPageGridByPks.do",data:n,success:function(e){var a=e.success,s=e.data;a&&(s?t.table.setAllTableData(f,s[f]):t.table.setAllTableData(f,{rows:[]}))}})},this.clickSearchBtn=function(t,a){a&&(e.searchVal=a,u.cacheTools.set("searchParams",a),e.getData(a,e.state.isShowOff,!0))}},s);S=(0,u.createPage)({initTemplate:[]})(S),t.default=S},3:function(e,t){e.exports=a},405:function(e,t,a){e.exports=a(289)}})});
//# sourceMappingURL=index.f2ee5453.js.map