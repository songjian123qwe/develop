!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("nc-lightapp-front"),require("react"),require("react-dom")):"function"==typeof define&&define.amd?define(["nc-lightapp-front","react","react-dom"],t):"object"==typeof exports?exports["uapbd/pmbase/project_org/list/index"]=t(require("nc-lightapp-front"),require("react"),require("react-dom")):e["uapbd/pmbase/project_org/list/index"]=t(e["nc-lightapp-front"],e.React,e.ReactDOM)}(window,function(e,t,n){return function(e){var t={};function n(a){if(t[a])return t[a].exports;var o=t[a]={i:a,l:!1,exports:{}};return e[a].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(a,o,function(t){return e[t]}.bind(null,o));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="../../../../",n(n.s=177)}({1:function(t,n){t.exports=e},10:function(e,t,n){var a={},o=function(e){var t;return function(){return void 0===t&&(t=e.apply(this,arguments)),t}}(function(){return window&&document&&document.all&&!window.atob}),r=function(e){var t={};return function(e){return void 0===t[e]&&(t[e]=function(e){return document.querySelector(e)}.call(this,e)),t[e]}}(),s=null,i=0,c=[],l=n(11);function u(e,t){for(var n=0;n<e.length;n++){var o=e[n],r=a[o.id];if(r){r.refs++;for(var s=0;s<r.parts.length;s++)r.parts[s](o.parts[s]);for(;s<o.parts.length;s++)r.parts.push(y(o.parts[s],t))}else{var i=[];for(s=0;s<o.parts.length;s++)i.push(y(o.parts[s],t));a[o.id]={id:o.id,refs:1,parts:i}}}}function d(e,t){for(var n=[],a={},o=0;o<e.length;o++){var r=e[o],s=t.base?r[0]+t.base:r[0],i={css:r[1],media:r[2],sourceMap:r[3]};a[s]?a[s].parts.push(i):n.push(a[s]={id:s,parts:[i]})}return n}function p(e,t){var n=r(e.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var a=c[c.length-1];if("top"===e.insertAt)a?a.nextSibling?n.insertBefore(t,a.nextSibling):n.appendChild(t):n.insertBefore(t,n.firstChild),c.push(t);else{if("bottom"!==e.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");n.appendChild(t)}}function f(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e);var t=c.indexOf(e);t>=0&&c.splice(t,1)}function h(e){var t=document.createElement("style");return e.attrs.type="text/css",b(t,e.attrs),p(e,t),t}function b(e,t){Object.keys(t).forEach(function(n){e.setAttribute(n,t[n])})}function y(e,t){var n,a,o,r;if(t.transform&&e.css){if(!(r=t.transform(e.css)))return function(){};e.css=r}if(t.singleton){var c=i++;n=s||(s=h(t)),a=v.bind(null,n,c,!1),o=v.bind(null,n,c,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=function(e){var t=document.createElement("link");return e.attrs.type="text/css",e.attrs.rel="stylesheet",b(t,e.attrs),p(e,t),t}(t),a=function(e,t,n){var a=n.css,o=n.sourceMap,r=void 0===t.convertToAbsoluteUrls&&o;(t.convertToAbsoluteUrls||r)&&(a=l(a));o&&(a+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */");var s=new Blob([a],{type:"text/css"}),i=e.href;e.href=URL.createObjectURL(s),i&&URL.revokeObjectURL(i)}.bind(null,n,t),o=function(){f(n),n.href&&URL.revokeObjectURL(n.href)}):(n=h(t),a=function(e,t){var n=t.css,a=t.media;a&&e.setAttribute("media",a);if(e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}.bind(null,n),o=function(){f(n)});return a(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;a(e=t)}else o()}}e.exports=function(e,t){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(t=t||{}).attrs="object"==typeof t.attrs?t.attrs:{},t.singleton||(t.singleton=o()),t.insertInto||(t.insertInto="head"),t.insertAt||(t.insertAt="bottom");var n=d(e,t);return u(n,t),function(e){for(var o=[],r=0;r<n.length;r++){var s=n[r];(i=a[s.id]).refs--,o.push(i)}e&&u(d(e,t),t);for(r=0;r<o.length;r++){var i;if(0===(i=o[r]).refs){for(var c=0;c<i.parts.length;c++)i.parts[c]();delete a[i.id]}}}};var g=function(){var e=[];return function(t,n){return e[t]=n,e.filter(Boolean).join("\n")}}();function v(e,t,n,a){var o=n?"":a.css;if(e.styleSheet)e.styleSheet.cssText=g(t,o);else{var r=document.createTextNode(o),s=e.childNodes;s[t]&&e.removeChild(s[t]),s.length?e.insertBefore(r,s[t]):e.appendChild(r)}}},11:function(e,t){e.exports=function(e){var t="undefined"!=typeof window&&window.location;if(!t)throw new Error("fixUrls requires window.location");if(!e||"string"!=typeof e)return e;var n=t.protocol+"//"+t.host,a=n+t.pathname.replace(/\/[^\/]*$/,"/");return e.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(e,t){var o,r=t.trim().replace(/^"(.*)"$/,function(e,t){return t}).replace(/^'(.*)'$/,function(e,t){return t});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(r)?e:(o=0===r.indexOf("//")?r:0===r.indexOf("/")?n+r:a+r.replace(/^\.\//,""),"url("+JSON.stringify(o)+")")})}},136:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a,o,r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},s=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),i=n(2),c=p(i),l=(p(n(3)),n(1)),u=p(n(4)),d=p(n(5));function p(e){return e&&e.__esModule?e:{default:e}}l.base.NCPopconfirm,l.base.NCIcon;var f=l.base.NCTabs,h=l.base.NCCheckbox,b=l.cardCache.setDefData,y=l.cardCache.getDefData,g="10140PRJG_list",v=(f.NCTabPane,l.high.PrintOutput),m="search",_="head",w="pk_project",j="/nccloud/uapbd/pmbase/ProjectDelete.do",k="/nccloud/uapbd/pmbase/ProjectEnable.do",x="/nccloud/uapbd/pmbase/ProjectDisable.do",P="/nccloud/uapbd/pmbase/ProjectValid.do",C="/nccloud/uapbd/pmbase/ProjectPrint.do",T=(a=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return o.call(n),n.searchId=m,n.tableId=_,n.state={checked:!1,json:{}},(0,d.default)(e)({pagecode:e.pagecode_list},{moduleId:"10140PRJB",domainName:"uapbd"},function(t,a){if(a&&(n.state.json=a),t&&t.template){var o=t.template;o=n.modifierMeta(e,o),e.meta.setMeta(o,function(){if(t.button){var a=t.button;e.button.setButtons(a),"global"==e.nodeType&&e.button.setButtonVisible("assig",!1),e.button.setButtonDisabled(["delete","enable","disable","assig","unassig"],!0),e.button.setButtonDisabled(["delete","printGrp","print","output"],!0),e.button.setPopContent("delline",n.state.json["10140PRJB-000035"]),e.button.setPopContent("enableLine",n.state.json["10140PRJB-000015"]),e.button.setPopContent("disableLine",n.state.json["10140PRJB-000016"])}var o=y("searchParams",g);o&&0!=o&&n.props.search.setSearchValue(m,o.conditions),o&&0!=o&&n.loadData()})}}),n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,i.Component),s(t,[{key:"componentDidMount",value:function(){}},{key:"buttonClick",value:function(e,t){var n=e.table.getCheckedRows(this.tableId);switch(t){case"add":(0,l.ajax)({url:"/nccloud/uapbd/pmbase/ProjectAdd.do",data:{nodeType:this.props.nodeType},success:function(t){b("listAddData",g,t),l.cacheTools.remove("preid"),e.pushTo(e.cardUrl,{appcode:e.appcode,pagecode:e.pagecode_card,status:"add"})}});break;case"editline":e.pushTo(e.cardUrl,{appcode:e.appcode,pagecode:e.pagecode_card,status:"edit",id:e.record[w].value});break;case"refresh":this.loadData("refresh");break;case"delete":(0,l.promptBox)({color:"warning",title:this.state.json["10140PRJB-000010"],content:this.state.json["10140PRJB-000046"],beSureBtnClick:this.deleteAction.bind(this)});break;case"enable":(0,l.promptBox)({color:"warning",title:this.state.json["10140PRJB-000012"],content:this.state.json["10140PRJB-000015"],beSureBtnClick:this.enableAction.bind(this)});break;case"disable":(0,l.promptBox)({color:"warning",title:this.state.json["10140PRJB-000012"],content:this.state.json["10140PRJB-000016"],beSureBtnClick:this.disableAction.bind(this)});break;case"assig":void 0==n||0==n.length?(0,l.toast)({color:"danger",content:this.state.json["10140PRJB-000000"]}):this.assignAction("assign");break;case"unassig":void 0==n||0==n.length?(0,l.toast)({color:"danger",content:this.state.json["10140PRJB-000038"]}):this.assignAction("unassig");break;case"printGrp":case"print":this.onPrint();break;case"output":this.onOutput()}}},{key:"onSearchAfterEvent",value:function(e,t){if("pk_duty_org"===e){var n=this.props.meta.getMeta();n[m].items.find(function(e){return"pk_duty_dept"===e.attrcode}).queryCondition=function(){return{pk_org:Array.isArray(t)?t[0].refpk:t.refpk}},n[m].items.find(function(e){return"pk_dutier"===e.attrcode}).queryCondition=function(){return{pk_org:Array.isArray(t)?t[0].refpk:t.refpk}},this.props.meta.setMeta(n)}}},{key:"onCheckShowDisable",value:function(){var e=this;this.setState({checked:!this.state.checked},function(){e.loadData()})}},{key:"loadData",value:function(e){var t=this,n=y("searchParams",g),a=this.state.checked;0==a&&[].push({field:"enablestate",oprtype:"=",value:{firstvalue:"2",secondvalue:null}});var o=this.props.search.getQueryInfo(this.searchId).oid,r={querycondition:null==n?{}:n,pageInfo:this.props.table.getTablePageInfo(_),pagecode:this.props.pagecode_list,queryAreaCode:m,oid:o,querytype:"tree",nodeType:this.props.nodeType,appCode:this.props.appcode,enablestate:a};(0,l.ajax)({url:"/nccloud/uapbd/pmbase/ProjectListQuery.do",data:r,success:function(n){if(console.log(n),n.data){if(t.props.table.setAllTableData(t.tableId,n.data[_]),"refresh"===e&&(0,l.toast)({title:t.state.json["10140PRJB-000025"],color:"success"}),"search"===e){var a=t.state.json["10140PRJB-000047"]+n.data[_].rows.length+t.state.json["10140PRJB-000048"];(0,l.toast)({content:a,color:"success"})}}else t.props.table.setAllTableData(t.tableId,{rows:[]}),(0,l.toast)({content:t.state.json["10140PRJB-000042"],color:"warning"});t.props.button.setButtonDisabled(["delete","enable","disable","assig","unassig"],!0),t.setState(t.state)}})}},{key:"render",value:function(){var e=this,t=this.props,n=t.table,a=t.button,o=t.search,s=t.modal.createModal,i=(this.props.button.getButtons(),n.createSimpleTable),l=o.NCCreateSearch,d=a.createButtonApp,p=(a.getButtons,this.state.json["10140PRJB-000044"]);return"10140PRJG"===this.props.appcode&&(p=this.state.json["10140PRJB-000034"]),"10140PRJO"===this.props.appcode&&(p=this.state.json["10140PRJB-000045"]),c.default.createElement("div",{className:"nc-bill-list"},c.default.createElement("div",{className:"nc-bill-header-area"},c.default.createElement("div",{className:"header-title-search-area"},c.default.createElement("h2",{className:"title-search-detail"},p)),c.default.createElement(h,{onChange:this.onCheckShowDisable.bind(this),checked:this.state.checked},this.state.json["10140PRJB-000043"]),c.default.createElement("div",{className:"header-button-area"},d({area:"header-button-area",buttonLimit:3,onButtonClick:this.buttonClick.bind(this),popContainer:document.querySelector(".header-button-area")}))),c.default.createElement("div",{className:"nc-bill-search-area"},l(this.searchId,{onAfterEvent:this.onSearchAfterEvent.bind(this),clickSearchBtn:this.clickSearchBtn.bind(this)})),c.default.createElement("div",{className:"nc-bill-table-area"},i(this.tableId,{handlePageInfoChange:this.pageInfoClick.bind(this),showIndex:!0,showCheck:!0,onRowDoubleClick:this.doubleClick.bind(this),onRowClick:this.onRowClick.bind(this),onSelected:this.onSelected.bind(this),onSelectedAll:this.onSelected.bind(this),dataSource:g,pkname:"pk_project",componentInitFinished:function(){}})),s("delete",{title:this.state.json["10140PRJB-000012"],content:this.state.json["10140PRJB-000013"],beSureBtnClick:this.deleteAction.bind(this)}),c.default.createElement(u.default,r({ref:function(t){return e.assignModal=t}},{gridId:this.tableId,json:this.state.json},this.props)),c.default.createElement(v,{ref:"printOutput",url:C,data:{funcode:this.props.printFunCode,nodekey:this.props.printNodeKey,oids:this.state.ids,outputType:"output"}}))}}]),t}(),o=function(){var e=this;this.modifierMeta=function(t,n){return n[m].items=n[m].items.map(function(e,t){return"pk_org"==e.attrcode&&(e.queryCondition={orgType:"orgtype16"}),"pk_duty_org"==e.attrcode&&(e.isMultiSelectedEnabled=!0),e.col="3","pk_projectclass"!==e.attrcode&&"pk_eps"!==e.attrcode||(e.isMultiSelectedEnabled=!0),e}),n[_].pagination=!0,n[_].items=n[_].items.map(function(e,n){return e.width=150,"project_code"==e.attrcode&&(e.render=function(e,n,a){return c.default.createElement("span",{style:{color:"#007ace",cursor:"pointer"},onClick:function(){var e=t.search.getAllSearchData(m);l.cacheTools.set("searchParams",e),l.cacheTools.set("preid",n[w].value),l.cacheTools.set("pageInfo",t.table.getTablePageInfo(_)),t.pushTo(t.cardUrl,{appcode:t.appcode,pagecode:t.pagecode_card,status:"browse",id:n[w].value})}},n&&n.project_code&&n.project_code.value)}),e}),n[_].items.push({attrcode:"opr",label:e.state.json["10140PRJB-000009"],itemtype:"customer",width:200,fixed:"right",className:"table-opr",visible:!0,render:function(n,a,o){var r=[];return"GLOBLE00000000000000"==a.pk_org.value&&"global"==e.props.nodeType?r=["editline","delline"]:a.pk_org.value==a.pk_group.value&&"group"==e.props.nodeType?r=["editline","delline"]:a.pk_org.value!=a.pk_group.value&&"GLOBLE00000000000000"!=a.pk_org.value&&"org"==e.props.nodeType&&(r=["editline","delline"]),t.button.createOprationButton(r,{area:"table-opr-area",buttonLimit:3,onButtonClick:function(t,r){return e.tableButtonClick(t,r,n,a,o)}})}}),n},this.tableButtonClick=function(t,n,a,o,r){switch(n){case"editline":t.pushTo(t.cardUrl,{appcode:t.appcode,pagecode:t.pagecode_card,status:"edit",id:o[w].value});break;case"delline":(0,l.ajax)({url:P,data:{pks:[o[w].value],nodeType:t.nodeType},success:function(n){(0,l.ajax)({url:j,data:{appCode:t.appcode,nodeType:t.nodeType,deleteinfo:[{id:o[w].value,ts:o.ts.value}]},success:function(n){if(n.success){(0,l.toast)({color:"success",content:e.state.json["10140PRJB-000036"]}),t.table.deleteTableRowsByIndex(_,r);t.table.getAllTableData(_).rows}}})}});break;case"enableLine":(0,l.ajax)({url:P,data:{pks:[o[w].value],nodeType:t.nodeType},success:function(t){(0,l.promptBox)({color:"warning",title:e.state.json["10140PRJB-000012"],content:e.state.json["10140PRJB-000015"],beSureBtnClick:function(){var t=[];if("3"==o.enablestate.value){var n={values:o};delete n.values.numberindex,delete n.values.key,t.push(n)}var a={model:{rows:t}};(0,l.ajax)({url:k,data:a,success:function(t){(0,l.toast)({content:e.state.json["10140PRJB-000019"],title:e.state.json["10140PRJB-000037"]}),e.loadData()}})},cancelBtnClick:function(){}})}});break;case"disableLine":(0,l.ajax)({url:P,data:{pks:[o[w].value],nodeType:t.nodeType},success:function(n){(0,l.promptBox)({color:"warning",title:e.state.json["10140PRJB-000012"],content:e.state.json["10140PRJB-000016"],beSureBtnClick:function(){var n=[];if("2"==o.enablestate.value){var a={values:o};delete a.values.numberindex,delete a.values.key,n.push(a)}var r={model:{rows:n}};(0,l.ajax)({url:x,data:r,success:function(n){(0,l.toast)({content:e.state.json["10140PRJB-000020"],title:e.state.json["10140PRJB-000037"]}),e.loadData(t)}})},cancelBtnClick:function(){}})}});break;default:console.log(n,r)}},this.onPrint=function(){var t=e.props.table.getCheckedRows(_);if(0!==t.length){var n=[];t.forEach(function(e,t){n.push(e.data.values[w].value)}),(0,l.print)("pdf",C,{funcode:e.props.printFunCode,nodekey:e.props.printNodeKey,oids:n})}else(0,l.toast)({content:e.state.json["10140PRJB-000017"],color:"warning"})},this.onOutput=function(){var t=e.props.table.getAllTableData(_);if(0!==t.length){var n=[];t.rows.forEach(function(e,t){n.push(e.values[w].value)}),e.setState({ids:n},e.refs.printOutput.open())}else(0,l.toast)({content:e.state.json["10140PRJB-000018"],color:"warning"})},this.assignAction=function(t){var n=e.props.table.getCheckedRows(_);n&&(0,l.ajax)({url:P,data:{pks:n.map(function(e){return e.data.values[w].value}),nodeType:e.props.nodeType},success:function(n){e.assignModal.show(t)}})},this.enableAction=function(){var t=[],n=[];e.props.table.getCheckedRows(_).map(function(e){"3"==e.data.values.enablestate.value&&(t.push(e.data),n.push(e.data.values[w].value))}),n[0]&&void 0!=n[0]?(0,l.ajax)({url:P,data:{pks:n,nodeType:e.props.nodeType},success:function(n){var a={model:{rows:t}};(0,l.ajax)({url:k,data:a,success:function(t){(0,l.toast)({color:"success",title:e.state.json["10140PRJB-000019"]}),e.loadData()}})}}):(0,l.toast)({color:"warning",content:e.state.json["10140PRJB-000039"]})},this.disableAction=function(){var t=[],n=[];e.props.table.getCheckedRows(_).map(function(e){"2"==e.data.values.enablestate.value&&(t.push(e.data),n.push(e.data.values[w].value))}),n[0]&&void 0!=n[0]?(0,l.ajax)({url:P,data:{pks:n,nodeType:e.props.nodeType},success:function(n){var a={model:{rows:t}};(0,l.ajax)({url:x,data:a,success:function(t){(0,l.toast)({color:"success",title:e.state.json["10140PRJB-000020"]}),e.loadData()}})}}):(0,l.toast)({color:"warning",content:e.state.json["10140PRJB-000040"]})},this.doubleClick=function(t,n,a){console.log(e.state.json["10140PRJB-000041"]),console.log(e);var o=e.props.search.getAllSearchData("search");l.cacheTools.set("searchParams",o),l.cacheTools.get("searchParams"),l.cacheTools.set("preid",e.props.getUrlParam("id")),e.props.pushTo(e.props.cardUrl,{appcode:e.props.appcode,pagecode:e.props.pagecode_card,status:"browse",id:t[w].value})},this.deleteAction=function(){var t=e.props.table.getCheckedRows(_);(0,l.ajax)({url:P,data:{pks:t.map(function(e){return e.data.values[w].value}),nodeType:e.props.nodeType},success:function(n){var a={deleteinfo:t.map(function(e){return{id:e.data.values[w].value,ts:e.data.values.ts.value}})};(0,l.ajax)({url:j,data:a,success:function(t){(0,l.toast)({color:"success",content:e.state.json["10140PRJB-000036"]}),e.refreshAction(e.props)}})}})},this.refreshAction=function(t){e.loadData()},this.pageInfoClick=function(t,n,a){t.table.getTablePageInfo(e.tableId),t.search.getAllSearchData(m);l.cacheTools.set("pageInfo",t.table.getTablePageInfo(_));var o={allpks:a,pageid:t.pagecode_list};(0,l.ajax)({url:"/nccloud/uapbd/pmbase/ProjectQueryPageGridByPks.do",data:o,success:function(e){var n=e.success,a=e.data;n&&(a?t.table.setAllTableData(_,a[_]):t.table.setAllTableData(_,{rows:[]}))}})},this.clickSearchBtn=function(t,n){b("searchParams",g,n),e.loadData("search")},this.onRowClick=function(){e.props.button.setButtonDisabled(["delete","enable","disable","assig","unassig"],!1),e.setState(e.state)},this.onSelected=function(){var t=e.props.table.getCheckedRows(_);if(t&&t.length>0){var n=t.some(function(e,t,n){return"2"==e.data.values.enablestate.value}),a=t.some(function(e,t,n){return"3"==e.data.values.enablestate.value});e.props.button.setButtonDisabled({delete:!1,assig:!1,unassig:!1,enable:n,disable:a}),e.props.button.setButtonDisabled(["printGrp","output"],!1)}else e.props.button.setButtonDisabled(["delete","enable","disable","assig","unassig"],!0),e.props.button.setButtonDisabled(["printGrp","output"],!0);e.setState(e.state)}},a);T=(0,l.createPage)({initTemplate:[]})(T),t.default=T},157:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),o=n(2),r=i(o),s=(i(n(3)),i(n(136)));function i(e){return e&&e.__esModule?e:{default:e}}var c={nodeType:"org",pagecode_list:"10140PRJG_list",pagecode_card:"10140PRJG_card",appcode:"10140PRJO",appid:"0001Z010000000004OEE",printFunCode:"10140PRJO",printNodeKey:"listPrint",listUrl:"/list",cardUrl:"/card"},l=function(e){function t(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,o.Component),a(t,[{key:"render",value:function(){return r.default.createElement("div",null,r.default.createElement(s.default,c))}}]),t}();t.default=l},177:function(e,t,n){e.exports=n(157)},2:function(e,n){e.exports=t},3:function(e,t){e.exports=n},4:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},o=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),r=n(2),s=l(r),i=n(1),c=l(n(6));function l(e){return e&&e.__esModule?e:{default:e}}var u=i.base.NCButton,d=i.base.NCModal,p=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.loadData=function(){n.props.getData&&n.props.getData(n.props.getUrlParam("id"))},n.loadSaleInfoGridData=function(){n.props.loadSubGridData&&n.props.loadSubGridData("shoulder",n.props.config.subGrid5,n.props.config.custsaleForm,n.props.config.pagecode,"querySubFormOrGrid",["subG5ModalSave","subG5ModalCancel"],["subGrid5Edit","subGrid5Del","subGrid5Addr","subGrid5Ref","subGrid5Print"])},n.loadFinaceInfoGridData=function(){n.props.loadSubGridData&&n.props.loadSubGridData("shoulder",n.props.config.subGrid4,n.props.config.custfinanceForm,n.props.config.pagecode,"querySubFormOrGrid",["subG4ModalSave","subG4ModalCancel"],["subGrid4Edit","subGrid4Del","subGrid4Ref","subGrid4Pri"])},n.loadCreDitCtlInfoGridData=function(){n.props.loadSubGridData&&n.props.loadSubGridData("shoulder",n.props.config.subGrid6,n.props.config.creditctlForm,n.props.config.pagecode,"querySubFormOrGrid",["subG6ModalSave","subG6ModalCancel"],["subG6Edit","subG6Del","subG6Ref","subG6Pri"])},n.state={modal:{show:!1,modalDropup:!0,size:"xlg",backdrop:!0}},n.config={isAssign:!0},n.pk_project=n.props.getUrlParam("id"),n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,r.Component),o(t,[{key:"show",value:function(e){var t=this;this.state.modal.show=!0,this.setState(this.state,function(){t.orgSelect.reset()}),this.config.isAssign="assign"===e}},{key:"onsubmit",value:function(){var e=this,t=[];this.orgSelect.state.selectData.datas&&this.orgSelect.state.selectData.datas.map(function(e){t.push(e.id)});var n=this.props.getUrlParam("id");n||this.props.table.getCheckedRows(this.props.gridId)||(0,i.toast)({color:"danger",content:this.props.json["10140PRJB-000000"]});var a=n||this.props.table.getCheckedRows(this.props.gridId)[0].data.values.pk_project.value;0===t.length?(0,i.toast)({color:"danger",content:this.props.json["10140PRJB-000001"]}):(0,i.ajax)({url:"/nccloud/uapbd/pmbase/ProjectAssignOrgs.do",data:{pkcustList:[a],targetOrgIds:t,isAssign:this.config.isAssign},success:function(t){var n=t.success,a=t.data;n&&a&&a.hasOwnProperty("message")&&((0,i.toast)({color:"success",content:a.message}),e.loadData(),e.cancel())}})}},{key:"cancel",value:function(){this.state.modal.show=!1,this.setState(this.state)}},{key:"render",value:function(){var e=this,t=this.props.json,n=a({},this.state.modal);return s.default.createElement(d,a({},n,{onHide:this.cancel.bind(this)}),s.default.createElement(d.Header,{closeButton:!0},s.default.createElement(d.Title,null,this.config.isAssign?t["10140PRJB-000002"]:t["10140PRJB-000003"])),s.default.createElement(d.Body,null,s.default.createElement("div",null,s.default.createElement(c.default,a({ref:function(t){return e.orgSelect=t}},{json:t})))),s.default.createElement(d.Footer,null,s.default.createElement(u,{onClick:this.onsubmit.bind(this)},t["10140PRJB-000004"]),s.default.createElement(u,{onClick:this.cancel.bind(this)},t["10140PRJB-000005"])))}}]),t}();t.default=p},5:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e};t.default=function(e){return function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=arguments[2],s=0,i={},c=function(){2==s&&r&&r(i.templateData||{},i.langData||{},i.inlt||{})};n.callback&&console.log("咱们自己createUIDom会同时获取多语和单据模板,并通过一个回调函数返回, langCfg中的回调函数将被忽略");var l=a({},n,{callback:function(e,t,n){s+=1,t||(0,o.toast)({content:"load muti lang error",color:"warning"}),i.langData=e||{},i.inlt=n||{},c()}});e.MultiInit.getMultiLang(l),e.createUIDom(t,function(e){s+=1,i.templateData=e||{},c()})}};var o=n(1)},6:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},o=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),r=n(2),s=function(e){return e&&e.__esModule?e:{default:e}}(r),i=n(1);n(7);var c=i.base.NCTable,l=i.base.NCButton,u=(i.base.NCCol,i.base.NCRow,i.base.NCTree),d=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.onExpandFn=function(e){n.state.tree.expandedKeys=e,n.setState(n.state)},n.state={tree:{main:n,defNodeCfg:{},root:{root:!0,key:"root",title:n.props.json["10140PRJB-000006"]},expandedKeys:[],datas:[],renderNode:function(){var e=this,t=(arguments.length>0&&void 0!==arguments[0]&&arguments[0],arguments[1],this.main.state.tree.defNodeCfg||{}),n=function(e){return e.disableCheckbox=1==e.root||"orgtype"==e.nodeData.orgclazz,e};return function o(r){return r.map(function(r){var i=a({},t,r),c=r.children||[];return s.default.createElement(u.NCTreeNode,a({className:"node-item"},n?n(i):i,{title:function(t){console.log(e,"renderFileTreeTitle");var n=void 0,a=e.expandedKeys.includes(t.refpk);return n=t&&t.hasOwnProperty("children")&&t.children.length>0?a?"icon iconfont  icon-wenjianjiadakai tree-wenjian":"icon iconfont  icon-wenjianjia tree-wenjian":"tree-dian",s.default.createElement("div",{className:"title-con"},s.default.createElement("i",{className:n}),s.default.createElement("span",{className:"title-middle"},t.refname))}(r),isLeaf:0==c.length}),0==c.length?"":o(c))})}([a({},this.root,{children:this.datas})])},config:function(){return{checkable:!0,defaultExpandAll:!0,checkStrictly:!0,onCheck:function(e,t){var n=t.node.props,a=t.checked,o=this.main.state.selectData.datas,r={id:n.id,name:n.name,code:n.nodeData.code};o=a?o.concat(r):o.filter(function(e){return e.id!=r.id}),this.main.state.selectData.datas=o,this.main.setState(this.main.state)}.bind(this)}}},table:{main:n,rowKey:"id",bodyStyle:{"overflow-y":"hidden",height:"390px"},columns:[{title:n.props.json["10140PRJB-000007"],dataIndex:"code",width:"40%"},{title:n.props.json["10140PRJB-000008"],dataIndex:"name",width:"40%"},{title:n.props.json["10140PRJB-000009"],dataIndex:"doit",width:"20%",render:function(e,t,n){return s.default.createElement(l,{onClick:function(){var e=this.state.selectData.datas;this.state.selectData.datas=e.filter(function(e){return e.id!=t.id}),this.setState(this.state)}.bind(this)},this.props.json["10140PRJB-000010"])}.bind(n)}]},selectData:{datas:[]}},n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,r.Component),o(t,[{key:"componentDidMount",value:function(){this.reset()}},{key:"reset",value:function(){var e=this;(0,i.ajax)({url:"/nccloud/uapbd/customer/assignTree.do",data:{orgtypeIDs:["BUSINESSUNIT00000000"],isCludeGlobalAndGroupVO:!1,isProject_grp:!0},success:function(t){var n=t.data;e.state.selectData.datas=[],e.state.tree.datas=n,e.setState(e.state)}})}},{key:"getData",value:function(){return this.state.selectData.datas.map(function(e){return e.id})}},{key:"render",value:function(){var e=this.state.tree,t=this.state.table,n=this.state.selectData.datas,o=n.map(function(e){return e.id});return s.default.createElement("div",{className:"transfer_tree_container",style:{marginTop:10}},s.default.createElement("div",{className:"left-area",style:{height:"450px",padding:"10px",background:"rgba(249,249,249,1)",width:"calc(50% - 25px)"}},s.default.createElement("div",{className:"left-area-nei"},s.default.createElement("div",{field:"tree-area",className:"syncTreeCom",style:{marginLeft:20,height:"calc(100% - 40px)"}},s.default.createElement("div",{className:"synctree-area",fieldname:"树控件"},s.default.createElement(u,a({closeIcon:s.default.createElement("i",{field:"tree-switcher",fieldname:"树开关",class:"icon iconfont icon-shushouqi tree-swich"}),openIcon:s.default.createElement("i",{field:"tree-switcher",fieldname:"树开关",class:"icon iconfont icon-shu_zk tree-swich"}),onExpand:this.onExpandFn,expandedKeys:this.state.tree.expandedKeys},e.config(),{checkedKeys:o}),e.renderNode()))))),s.default.createElement("div",{className:"right-area",style:{marginLeft:30,height:"450px",padding:"10px",background:"rgba(249,249,249,1)",width:"calc(50% - 25px)",overflow:"hidden"}},s.default.createElement(c,a({},t,{data:n},{scroll:{y:390}}))))}}]),t}();t.default=d},7:function(e,t,n){var a=n(8);"string"==typeof a&&(a=[[e.i,a,""]]);var o={transform:void 0};n(10)(a,o);a.locals&&(e.exports=a.locals)},8:function(e,t,n){(e.exports=n(9)(!1)).push([e.i,'* {\n  padding: 0;\n  margin: 0;\n}\n/*定位容器*/\n.uapbd_style_center_container {\n  position: relative;\n  /*容器 子元素 未定义距离*/\n  /*容器 子元素 距离右边 20px*/\n  /*容器 use 子元素 距离右边 20px*/\n}\n.uapbd_style_center_container .uapbd_style_center_undefined {\n  position: absolute;\n}\n.uapbd_style_center_container .uapbd_style_center_right20 {\n  position: absolute;\n  top: 0;\n  right: 20px;\n  bottom: 0;\n}\n.uapbd_style_center_container .uapbd_style_center_left20 {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 20px;\n}\n/*出现 滚动条的容器*/\n.uapbd_style_scroll_container {\n  overflow: auto;\n}\n/*定义滚动条轨道*/\n.uapbd_style_scroll_container::-webkit-scrollbar-track {\n  border-radius: 8px;\n  background-color: white;\n}\n/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/\n.uapbd_style_scroll_container::-webkit-scrollbar {\n  width: 8px;\n}\n/*定义滑块 内阴影+圆角*/\n.uapbd_style_scroll_container::-webkit-scrollbar-thumb {\n  border-radius: 8px;\n  width: 8px;\n  background-color: #d8d8d8;\n}\n.transfer_tree_container {\n  clear: both;\n  height: 90%;\n  width: 100%;\n  margin-top: 10px;\n}\n.transfer_tree_container .left-area {\n  height: 100%;\n  display: inline-block;\n  vertical-align: top;\n  width: calc(50% - 91px);\n  overflow: auto;\n}\n.transfer_tree_container .button-area {\n  height: 100%;\n  width: 50px;\n  display: inline-block;\n  vertical-align: middle;\n  padding-top: 30px;\n  text-align: center;\n}\n.transfer_tree_container .button-area .opr-botton {\n  padding-top: 25px;\n  display: block;\n  margin: 0 auto;\n}\n.transfer_tree_container .right-area {\n  height: 100%;\n  display: inline-block;\n  vertical-align: top;\n  width: calc(50% - 91px);\n  overflow: auto;\n}\n.transfer_tree_container .transferSwitcherClassSelfNameHidden i {\n  visibility: hidden;\n}\n.transfer_tree_container .left-area-tree .u-tree,\n.transfer_tree_container .right-area-tree .u-tree {\n  height: 360px;\n  overflow: auto;\n}\n.transfer_tree_container .left-area-nei,\n.transfer_tree_container .right-area-nei {\n  height: 100%;\n  border-radius: 3px;\n  border: 1px solid #d0d0d0;\n  background: #ffffff;\n}\n.transfer_tree_container .opr-botton-trans button {\n  min-width: auto;\n  width: 32px;\n  height: 32px;\n  padding: 0;\n}\n/*\n * 这个是左树的 控制搜索框 宽度的。\n */\n.NC_syncTreeSearch_self_width {\n  width: 240px!important;\n}\n.NC_syncTreeSearch_self_width .u-form-control-wrapper {\n  width: 240px!important;\n}\n/*\n * 这个是左树中加虚线样式。\n */\n.syncTreeComLineStyle .synctree-area .u-tree > li:only-child > ul:before {\n  border-left: none;\n}\n.syncTreeComLineStyle .synctree-area .u-tree > li > ul:last-child::before {\n  border-left: none;\n}\n.syncTreeComLineStyle .synctree-area .u-tree-child-tree-open > li::after {\n  position: absolute;\n  left: 8px;\n  top: -15px;\n  content: "";\n  display: inline-block;\n  width: 1px;\n  height: 28px;\n  border-left: 1px dashed #d0d0d0;\n}\n.syncTreeComLineStyle .synctree-area .node-item .u-tree-switcher {\n  position: relative;\n  z-index: 2;\n}\n.syncTreeComLineStyle .synctree-area li::after {\n  border: none;\n}\n.syncTreeComLineStyle .synctree-area li {\n  position: relative;\n}\n.syncTreeComLineStyle .synctree-area li .u-tree-switcher {\n  position: relative;\n}\n.syncTreeComLineStyle .synctree-area li .u-tree-switcher::before {\n  position: absolute;\n  left: 11px;\n  top: 8px;\n  content: "";\n  display: inline-block;\n  width: 10px;\n  border-top: 1px dashed #d0d0d0;\n}\n.syncTreeComLineStyle .synctree-area li .isLeaf_hiden_point_line > i::before {\n  visibility: hidden;\n}\n/*\n * 穿梭树 线样式修改\n */\n.syncTreeComTransferLineStyle .synctree-area .u-tree > li:only-child > ul:before {\n  border-left: none;\n}\n.syncTreeComTransferLineStyle .synctree-area .u-tree > li > ul:last-child::before {\n  border-left: none;\n}\n.syncTreeComTransferLineStyle .synctree-area .u-tree-child-tree-open > li::after {\n  position: absolute;\n  left: 8px;\n  top: -15px;\n  content: "";\n  display: inline-block;\n  width: 1px;\n  height: 28px;\n  border-left: 1px dashed #d0d0d0;\n}\n.syncTreeComTransferLineStyle .synctree-area .node-item .u-tree-switcher {\n  position: relative;\n  z-index: 2;\n}\n.syncTreeComTransferLineStyle .synctree-area li::after {\n  border: none;\n}\n.syncTreeComTransferLineStyle .synctree-area li {\n  position: relative;\n}\n.syncTreeComTransferLineStyle .synctree-area li .isLeaf_show_point_line::before {\n  position: absolute;\n  left: 11px;\n  top: 8px;\n  content: "";\n  display: inline-block;\n  width: 10px;\n  border-top: 1px dashed #d0d0d0;\n}\n.syncTreeComTransferLineStyle .synctree-area li .isLeaf_hiden_point_line::before {\n  position: absolute;\n  left: 11px;\n  top: 8px;\n  content: "";\n  display: inline-block;\n  width: 10px;\n  border-top: 1px dashed #d0d0d0;\n}\n.syncTreeComTransferLineStyle .synctree-area li .isLeaf_hiden_point_line > i::before {\n  visibility: hidden;\n}\n.node-item-edit-point-style-self > a {\n  background-color: #ebedf2;\n}\n.node-item-edit-point-style-self > a span {\n  color: #e14c46!important;\n}\n.table-slef-set-long span {\n  margin-right: 0px!important;\n}\n',""])},9:function(e,t){e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var n=function(e,t){var n=e[1]||"",a=e[3];if(!a)return n;if(t&&"function"==typeof btoa){var o=function(e){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(e))))+" */"}(a),r=a.sources.map(function(e){return"/*# sourceURL="+a.sourceRoot+e+" */"});return[n].concat(r).concat([o]).join("\n")}return[n].join("\n")}(t,e);return t[2]?"@media "+t[2]+"{"+n+"}":n}).join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var a={},o=0;o<this.length;o++){var r=this[o][0];"number"==typeof r&&(a[r]=!0)}for(o=0;o<e.length;o++){var s=e[o];"number"==typeof s[0]&&a[s[0]]||(n&&!s[2]?s[2]=n:n&&(s[2]="("+s[2]+") and ("+n+")"),t.push(s))}},t}}})});
//# sourceMappingURL=index.5e1f70a4.js.map