!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("nc-lightapp-front"),require("react"),require("react-dom")):"function"==typeof define&&define.amd?define(["nc-lightapp-front","react","react-dom"],t):"object"==typeof exports?exports["uapbd/taxinfo/taxcode/card/index"]=t(require("nc-lightapp-front"),require("react"),require("react-dom")):e["uapbd/taxinfo/taxcode/card/index"]=t(e["nc-lightapp-front"],e.React,e.ReactDOM)}(window,function(e,t,a){return function(e){var t={};function a(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,a),r.l=!0,r.exports}return a.m=e,a.c=t,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)a.d(n,r,function(t){return e[t]}.bind(null,r));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="../../../../",a(a.s=167)}({1:function(t,a){t.exports=e},128:function(e,t){e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var a=function(e,t){var a=e[1]||"",n=e[3];if(!n)return a;if(t&&"function"==typeof btoa){var r=function(e){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(e))))+" */"}(n),o=n.sources.map(function(e){return"/*# sourceURL="+n.sourceRoot+e+" */"});return[a].concat(o).concat([r]).join("\n")}return[a].join("\n")}(t,e);return t[2]?"@media "+t[2]+"{"+a+"}":a}).join("")},t.i=function(e,a){"string"==typeof e&&(e=[[null,e,""]]);for(var n={},r=0;r<this.length;r++){var o=this[r][0];"number"==typeof o&&(n[o]=!0)}for(r=0;r<e.length;r++){var s=e[r];"number"==typeof s[0]&&n[s[0]]||(a&&!s[2]?s[2]=a:a&&(s[2]="("+s[2]+") and ("+a+")"),t.push(s))}},t}},129:function(e,t,a){var n={},r=function(e){var t;return function(){return void 0===t&&(t=e.apply(this,arguments)),t}}(function(){return window&&document&&document.all&&!window.atob}),o=function(e){var t={};return function(e){return void 0===t[e]&&(t[e]=function(e){return document.querySelector(e)}.call(this,e)),t[e]}}(),s=null,i=0,l=[],u=a(130);function c(e,t){for(var a=0;a<e.length;a++){var r=e[a],o=n[r.id];if(o){o.refs++;for(var s=0;s<o.parts.length;s++)o.parts[s](r.parts[s]);for(;s<r.parts.length;s++)o.parts.push(b(r.parts[s],t))}else{var i=[];for(s=0;s<r.parts.length;s++)i.push(b(r.parts[s],t));n[r.id]={id:r.id,refs:1,parts:i}}}}function d(e,t){for(var a=[],n={},r=0;r<e.length;r++){var o=e[r],s=t.base?o[0]+t.base:o[0],i={css:o[1],media:o[2],sourceMap:o[3]};n[s]?n[s].parts.push(i):a.push(n[s]={id:s,parts:[i]})}return a}function f(e,t){var a=o(e.insertInto);if(!a)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var n=l[l.length-1];if("top"===e.insertAt)n?n.nextSibling?a.insertBefore(t,n.nextSibling):a.appendChild(t):a.insertBefore(t,a.firstChild),l.push(t);else{if("bottom"!==e.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");a.appendChild(t)}}function p(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e);var t=l.indexOf(e);t>=0&&l.splice(t,1)}function m(e){var t=document.createElement("style");return e.attrs.type="text/css",v(t,e.attrs),f(e,t),t}function v(e,t){Object.keys(t).forEach(function(a){e.setAttribute(a,t[a])})}function b(e,t){var a,n,r,o;if(t.transform&&e.css){if(!(o=t.transform(e.css)))return function(){};e.css=o}if(t.singleton){var l=i++;a=s||(s=m(t)),n=g.bind(null,a,l,!1),r=g.bind(null,a,l,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(a=function(e){var t=document.createElement("link");return e.attrs.type="text/css",e.attrs.rel="stylesheet",v(t,e.attrs),f(e,t),t}(t),n=function(e,t,a){var n=a.css,r=a.sourceMap,o=void 0===t.convertToAbsoluteUrls&&r;(t.convertToAbsoluteUrls||o)&&(n=u(n));r&&(n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */");var s=new Blob([n],{type:"text/css"}),i=e.href;e.href=URL.createObjectURL(s),i&&URL.revokeObjectURL(i)}.bind(null,a,t),r=function(){p(a),a.href&&URL.revokeObjectURL(a.href)}):(a=m(t),n=function(e,t){var a=t.css,n=t.media;n&&e.setAttribute("media",n);if(e.styleSheet)e.styleSheet.cssText=a;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(a))}}.bind(null,a),r=function(){p(a)});return n(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;n(e=t)}else r()}}e.exports=function(e,t){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(t=t||{}).attrs="object"==typeof t.attrs?t.attrs:{},t.singleton||(t.singleton=r()),t.insertInto||(t.insertInto="head"),t.insertAt||(t.insertAt="bottom");var a=d(e,t);return c(a,t),function(e){for(var r=[],o=0;o<a.length;o++){var s=a[o];(i=n[s.id]).refs--,r.push(i)}e&&c(d(e,t),t);for(o=0;o<r.length;o++){var i;if(0===(i=r[o]).refs){for(var l=0;l<i.parts.length;l++)i.parts[l]();delete n[i.id]}}}};var h=function(){var e=[];return function(t,a){return e[t]=a,e.filter(Boolean).join("\n")}}();function g(e,t,a,n){var r=a?"":n.css;if(e.styleSheet)e.styleSheet.cssText=h(t,r);else{var o=document.createTextNode(r),s=e.childNodes;s[t]&&e.removeChild(s[t]),s.length?e.insertBefore(o,s[t]):e.appendChild(o)}}},130:function(e,t){e.exports=function(e){var t="undefined"!=typeof window&&window.location;if(!t)throw new Error("fixUrls requires window.location");if(!e||"string"!=typeof e)return e;var a=t.protocol+"//"+t.host,n=a+t.pathname.replace(/\/[^\/]*$/,"/");return e.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(e,t){var r,o=t.trim().replace(/^"(.*)"$/,function(e,t){return t}).replace(/^'(.*)'$/,function(e,t){return t});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(o)?e:(r=0===o.indexOf("//")?o:0===o.indexOf("/")?a+o:n+o.replace(/^\.\//,""),"url("+JSON.stringify(r)+")")})}},146:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={setTab_hForTab_b:function(e,t,a){return e&&t&&a&&a.length?(e.rows.forEach(function(e,n){var r=e.values[t].value;r&&r.length&&r[0]&&a.forEach(function(t){2===t.length?(e.values[t[0]]={},e.values[t[0]].value=r[0][t[1]]):3===t.length&&(e.values[t[0]]={},t[2].forEach(function(a){a.value===r[0][t[1]]&&(e.values[t[0]]=a)}))})}),e):e},isInArray:function(e,t){return!(!e||!t||0===e.length||0===t.length)&&(Array.prototype.in_array=function(e){return new RegExp(","+e+",").test(","+this.join(",")+",")},new Array(e).in_array(t))}};t.default=n},147:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e};t.default=function(e){return function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},o=arguments[2],s=0,i={},l=function(){2==s&&o&&o(i.templateData||{},i.langData||{},i.inlt||{})};a.callback&&console.log("咱们自己createUIDom会同时获取多语和单据模板,并通过一个回调函数返回, langCfg中的回调函数将被忽略");var u=n({},a,{callback:function(e,t,a){s+=1,t||(0,r.toast)({content:"load muti lang error",color:"warning"}),i.langData=e||{},i.inlt=a||{},l()}});e.MultiInit.getMultiLang(u),e.createUIDom(t,function(e){s+=1,i.templateData=e||{},l()})}};var r=a(1)},148:function(e,t){var a;a=function(){return this}();try{a=a||Function("return this")()||(0,eval)("this")}catch(e){"object"==typeof window&&(a=window)}e.exports=a},149:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n,r,o=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),s=a(2),i=d(s),l=(d(a(3)),a(1)),u=d(a(146)),c=(a(150),d(a(147)));function d(e){return e&&e.__esModule?e:{default:e}}function f(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}a(153);var p=l.high.PrintOutput,m=l.base.NCAffix,v=(l.base.NCPopconfirm,l.base.NCFormControl,l.base.NCBackBtn),b=l.cardCache.getDefData,h=(l.cardCache.setDefData,"uapbd.taxinfo.taxcode.dataSource"),g="head",x="taxrate",y="10140VATCR_taxcode_card",T="10140VATCR",w=[{display:"应税内含",value:"0"},{display:"应税外加",value:"1"}],C="/nccloud/uapbd/taxcode/TaxcodeCardQryAction.do",I="/nccloud/uapbd/taxcode/TaxcodeDeleteAction.do",E="/nccloud/uapbd/taxcode/TaxrateEditAction.do",k="/nccloud/uapbd/taxcode/TaxcodeTaxrateSaveAction.do",A="/nccloud/uapbd/taxcode/TaxcodeSaveAction.do",_="/nccloud/uapbd/taxcode/TaxcodeEnableAction.do",R="/nccloud/uapbd/taxcode/TaxcodeDisableNccAction.do",j="/nccloud/uapbd/taxcode/TaxcodeCardPrintAction.do",S=(n=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var a=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));r.call(a),a.formId=g,a.tableId=x;var n=a.props.getUrlParam("status"),o=a.props.getUrlParam("id"),s=b("selCountry_10140VATCR",h);return a.state={selCountry:s,pagesate:n,pk_taxcode:o,title_code:"",totalcount:0,applycount:0,lastTaxrate_pk:"",addtaxraterows:null,pks:[],json:{},inlt:null},(0,c.default)(e)({pagecode:y},{moduleId:T,domainName:"uapbd"},function(t,r,o){if(r&&(a.state.json=r,o&&(a.state.inlt=o),w=[{display:a.state.json["10140VATCR-000000"],value:"0"},{display:a.state.json["10140VATCR-000001"],value:"1"}]),t&&t.template){var s=a.modifierMeta(e,t.template);e.meta.setMeta(s),t.button&&e.button.setButtons(t.button),"add"===n||"edit"===n?a.onButtonClick(e,"add"===n?"Add":"Edit"):a.getdata()}}),a}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,s.Component),o(t,[{key:"componentDidMount",value:function(){}},{key:"componentDidUpdate",value:function(){var e=this.props.form.getFormStatus(this.formId),t=this.props.form.getFormStatus("editTaxRate");window.onbeforeunload="add"===e||"edit"===e||t&&"edit"===t?function(){return""}:null}},{key:"pintFunction",value:function(){var e=[this.state.pk_taxcode],t={funcode:T,nodekey:"taxcodecard",oids:e};(0,l.print)("pdf",j,t)}},{key:"output",value:function(){var e=this,t=[this.state.pk_taxcode];this.setState({pks:t},function(){e.refs.printOutput.open()})}},{key:"isEU",value:function(){var e=this.state.selCountry.refpk;return!(!e||"Y"!=e.iseucountry)}},{key:"setItemsEditable",value:function(e){var t=this;["mattaxes","suptaxes","custaxes","iscusvat","istriangletrade"].forEach(function(a){var n={};u.default.isInArray(e,a)?(n[a]=!1,t.props.form.setFormItemsDisabled(t.formId,n)):(n[a]=!0,t.props.form.setFormItemsDisabled(t.formId,n),n[a]={value:"",display:null},t.props.form.setFormItemsValue(t.formId,{itemkey:{value:"",display:null}}))})}},{key:"render",value:function(){var e=this,t=this.props,a=t.cardTable,n=t.form,r=t.button,o=t.modal,s=(t.cardPagination.createCardPagination,n.createForm),u=a.createCardTable,c=r.createButtonApp,d=o.createModal,f=this.state.json["10140VATCR-000015"];return i.default.createElement("div",{id:"nc-bill-extCard"},i.default.createElement("div",{className:"nc-bill-top-area"},i.default.createElement(m,null,i.default.createElement("div",{className:"nc-bill-header-area"},"browse"==this.state.pagesate&&i.default.createElement(v,{className:"title-search-detail",onClick:this.onButtonClick.bind(this,this.props,"back")}),i.default.createElement("div",{className:"header-title-search-area"},i.default.createElement("h2",{className:"title-search-detail"},f,"browse"==this.state.pagesate&&this.state.title_code?"："+this.state.title_code:"")),i.default.createElement("div",{className:"header-button-area"},c({area:"card-area",onButtonClick:this.onButtonClick.bind(this),popContainer:document.querySelector(".card-area")})))),i.default.createElement("div",{className:"nc-bill-form-area"},s(this.formId,{onAfterEvent:this.onAfterEvent.bind(this)}))),i.default.createElement("div",{className:"nc-bill-bottom-area",style:{marginTop:8}},i.default.createElement("div",{className:"nc-bill-tableTab-area taxcode-tab-area"},u(this.tableId,{tableHead:this.getTableHead.bind(this),showIndex:!0}))),d("editTaxRate",{title:this.state.json["10140VATCR-000016"],userControl:!0,content:i.default.createElement("div",null,s("editTaxRate",{})),beSureBtnClick:function(){var t={model:e.props.form.getAllFormValue("editTaxRate"),pageid:"10140VATCR_taxcode_card"};(0,l.ajax)({url:k,data:t,success:function(t){var a=t.success;t.data;a&&((0,l.toast)({title:e.state.json["10140VATCR-000013"],color:"success"}),e.props.modal.close("editTaxRate"),e.getdata())}})},cancelBtnClick:function(){e.props.form.setFormStatus("editTaxRate","browse"),e.props.modal.close("editTaxRate")}}),i.default.createElement(p,{ref:"printOutput",url:j,data:{funcode:T,nodekey:"taxcodecard",oids:this.state.pks,outputType:"output"}}))}}]),t}(),r=function(){var e=this;this.modifierMeta=function(e,t){var a=b("selCountry_10140VATCR",h);return t[g].items.map(function(e){"iscusvat"==e.attrcode?e.visible=!(!a||"Y"!==a.iseucountry):"suptaxes"===e.attrcode?e.visible=!a||"Y"!==a.iseucountry:"taxtype"===e.attrcode&&(w=e.options)}),t},this.getdata=function(t){var a={pk:e.state.pk_taxcode,selCountryId:e.state.selCountry?e.state.selCountry.refpk:"",pagesate:e.state.pagesate};(0,l.ajax)({url:C,data:a,success:function(a){if(a.success){e.dealFormulHanhander(a);var n=null;if(a.data&&a.data.billcard&&a.data.billcard.head){e.props.form.EmptyAllFormValue(e.formId),e.props.cardTable.setTableData(e.tableId,{rows:[]});var r=a.data.billcard.head[e.formId];u.default.setTab_hForTab_b(r,"taxrate",[["taxtype","taxtype",w],["taxrate_b","taxrate"],["realtaxrate","realtaxrate"],["begindate","begindate"],["enddate","enddate"]]);e.props.form.setAllFormValue(f({},e.formId,r));var o=[];"add"!=e.state.pagesate?e.props.cardTable.setTableData(e.tableId,a.data.billcard.body[e.tableId]):o=a.data.billcard.body[e.tableId].rows;var s=r.rows[0].values.code.value,i=a.data.lastTaxrate_pk;e.setState({title_code:s,lastTaxrate_pk:i,addtaxraterows:o})}else e.props.form.EmptyAllFormValue(e.formId),e.props.cardTable.setTableData(e.tableId,{rows:[]}),n=function(){e.props.button.setButtonVisible(["Edit","Delete","EditTaxRate","Print","Save","SaveAdd","Cancel","Enable","Disable","Refresh"],!1),e.props.button.setButtonVisible(["Add"],!0)};e.toggleShow(n),t&&t()}}})},this.dealFormulHanhander=function(t){var a;t.formulamsg&&t.formulamsg instanceof Array&&t.formulamsg.length>0&&e.props.dealFormulamsg(t.formulamsg,(f(a={},g,"form"),f(a,x,"cardTable"),a))},this.toggleShow=function(t){if("add"==e.state.pagesate?(e.props.button.setButtonVisible(["Add","Edit","Delete","EditTaxRate","Print","Enable","Disable","Refresh"],!1),e.props.button.setButtonVisible(["Save","SaveAdd","Cancel"],!0)):"edit"==e.state.pagesate?(e.props.button.setButtonVisible(["Add","Edit","Delete","EditTaxRate","Print","Enable","Disable","Refresh","SaveAdd"],!1),e.props.button.setButtonVisible(["Save","Cancel"],!0)):(e.props.button.setButtonVisible(["Add","Edit","Delete","EditTaxRate","Print","Refresh"],!0),e.props.button.setButtonVisible(["Save","SaveAdd","Cancel"],!1),e.updateButtonState()),e.props.form.setFormStatus(e.formId,e.state.pagesate),e.props.cardTable.setStatus(e.tableId,e.state.pagesate),"edit"===e.state.pagesate||"add"===e.state.pagesate){var a=e.props.form.getFormItemsValue(e.formId,["pursaletype"])[0].value;"edit"===e.state.pagesate&&e.props.form.setFormItemsDisabled(e.formId,{pursaletype:!0}),e.pursaletypeChangeEvnt(a)}"browse"===e.state.pagesate?window.onbeforeunload=null:window.onbeforeunload=function(){return""},t&&t()},this.onButtonClick=function(t,a){switch(a){case"Add":t.form.EmptyAllFormValue(e.formId),t.cardTable.setTableData(e.tableId,{rows:[]}),e.setState({pagesate:"add"},function(){e.getdata()});break;case"Edit":e.setState({pagesate:"edit"},function(){e.getdata()});break;case"Delete":(0,l.promptBox)({color:"info",title:e.state.json["10140VATCR-000002"],content:e.state.json["10140VATCR-000003"],beSureBtnClick:function(){e.delConfirm()}});break;case"back":t.pushTo("/list",{appcode:T,pagecode:"10140VATCR_taxcode_list"});break;case"Save":e.saveClick(function(){e.state.pk_taxcode&&e.getdata()});break;case"SaveAdd":e.saveClick(function(){e.onButtonClick(t,"Add")});break;case"Cancel":(0,l.promptBox)({color:"info",title:e.state.json["10140VATCR-000004"],content:e.state.json["10140VATCR-000005"],beSureBtnClick:function(){e.setState({pagesate:"browse"},function(){e.getdata()})}});break;case"Refresh":e.getdata(function(){(0,l.toast)({title:e.state.json["10140VATCR-000006"],color:"success"})});break;case"EditTaxRate":e.editTaxRate();break;case"Enable":e.enable();break;case"Disable":e.disEnable();break;case"Print":e.pintFunction();break;case"Output":e.output()}},this.editTaxRate=function(){e.props.modal.show("editTaxRate"),(0,l.ajax)({url:E,data:{pk_taxcode:e.props.form.getFormItemsValue(g,"pk_taxcode").value},success:function(t){if(t.success){e.props.form.EmptyAllFormValue("editTaxRate");var a={};a.editTaxRate=t.data.form.editTaxRate,e.props.form.setAllFormValue(a),e.props.form.setFormStatus("editTaxRate","edit");var n=void 0,r=a.editTaxRate.rows[0];n="9999"===r.values.enddate.value.substr(0,4)||"9999-12-31"===r.values.enddate.value?parseInt(r.values.begindate.value.substr(0,4))>(new Date).getFullYear()?parseInt(r.values.begindate.value.substr(0,4))+1+"-01-01":(new Date).getFullYear()+1+"-01-01":parseInt(r.values.begindate.value.substr(0,4))+1+"-01-01";var o={oldtaxtype:r.values.taxtype,oldtaxrate:r.values.taxrate,oldrealtaxrate:r.values.realtaxrate,oldbegindate:r.values.begindate,oldenddate:r.values.enddate,begindate:{value:n},enddate:{value:"9999-12-31"},taxrate:{value:""},realtaxrate:{value:""},note:{value:""}};e.props.form.setFormItemsValue("editTaxRate",o)}}})},this.enable=function(){var t={id:e.props.form.getFormItemsValue(g,"pk_taxcode").value,ts:e.props.form.getFormItemsValue(g,"ts").value};(0,l.promptBox)({color:"info",title:e.state.json["10140VATCR-000007"],content:e.state.json["10140VATCR-000008"],beSureBtnClick:function(){(0,l.ajax)({url:_,data:t,success:function(t){t.success&&((0,l.toast)({color:"success",title:e.state.json["10140VATCR-000009"]}),e.getdata())}})}})},this.disEnable=function(){var t={id:e.props.form.getFormItemsValue(g,"pk_taxcode").value,ts:e.props.form.getFormItemsValue(g,"ts").value};(0,l.promptBox)({color:"info",title:e.state.json["10140VATCR-000010"],content:e.state.json["10140VATCR-000011"],beSureBtnClick:function(){(0,l.ajax)({url:R,data:t,success:function(t){t.success&&((0,l.toast)({color:"success",title:e.state.json["10140VATCR-000012"]}),e.getdata())}})}})},this.pageInfoClick=function(e,t){var a={pk:t,pageid:y};(0,l.ajax)({url:C,data:a,success:function(a){a.data.head&&(e.form.setAllFormValue(f({},g,a.data.head[g])),e.setUrlParam(t)),a.data.body&&e.cardTable.setTableData(x,a.data.body[x])}})},this.updateButtonState=function(){"2"===e.props.form.getFormItemsValue(g,"enablestate").value?e.props.button.setButtonVisible({Disable:!0,Enable:!1}):e.props.button.setButtonVisible({Enable:!0,Disable:!1})},this.saveClick=function(t){var a;if(e.props.form.isCheckNow(g)){e.props.cardTable.filterEmptyRows(x);var n=e.props.createMasterChildData(y,e.formId,e.tableId);if(n.head.head.rows[0].values.taxrate=null,n.head.head.rows[0].values.pk_taxcode.value)n.body.taxrate.rows.map(function(t){t.values.pk_taxrate.value===e.state.lastTaxrate_pk&&(t.status="1",t.values.taxtype.value=n.head.head.rows[0].values.taxtype.value,t.values.taxrate.value=n.head.head.rows[0].values.taxrate_b.value,t.values.realtaxrate.value=n.head.head.rows[0].values.realtaxrate.value,t.values.begindate.value=n.head.head.rows[0].values.begindate.value,t.values.enddate.value=n.head.head.rows[0].values.enddate.value)});else{var r=e.state.addtaxraterows[0];r.values.taxtype.value=n.head.head.rows[0].values.taxtype.value,r.values.taxrate.value=n.head.head.rows[0].values.taxrate_b.value,r.values.realtaxrate.value=n.head.head.rows[0].values.realtaxrate.value,r.values.begindate.value=n.head.head.rows[0].values.begindate.value,r.values.enddate.value=n.head.head.rows[0].values.enddate.value,n.body.taxrate.rows=[r]}e.props.validateToSave(n,function(){(0,l.ajax)({url:A,data:n,success:function(a){if(a.success){(0,l.toast)({title:e.state.json["10140VATCR-000013"],color:"success"});var n=a.data.pk_taxcode;e.setState({pagesate:"browse",pk_taxcode:n},function(){t&&t()})}}})},(f(a={},g,"form"),f(a,x,"cardTable"),a),"card")}},this.delConfirm=function(){(0,l.ajax)({url:I,data:{id:e.state.pk_taxcode,ts:e.props.form.getFormItemsValue(e.formId,"ts").value},success:function(t){t&&((0,l.toast)({color:"success",title:e.state.json["10140VATCR-000014"]}),e.props.pushTo("/list",{status:"browse",appcode:T,pagecode:"10140VATCR_taxcode_list"}))}})},this.onAfterEvent=function(t,a,n,r,o){switch(n){case"pursaletype":var s=r.value;e.pursaletypeChangeEvnt(s)}return!0},this.pursaletypeChangeEvnt=function(t){var a=e.isEU();"1"===t?a?e.setItemsEditable(["mattaxes","custaxes","iscusvat"]):e.setItemsEditable(["mattaxes","custaxes"]):"2"==t?a?e.setItemsEditable(["mattaxes"]):e.setItemsEditable(["mattaxes","suptaxes"]):"3"==t?a?e.setItemsEditable(["istriangletrade","custaxes","iscusvat","mattaxes"]):e.setItemsEditable(["mattaxes"]):"4"==t?a?e.setItemsEditable(["istriangletrade","mattaxes"]):e.setItemsEditable(["mattaxes"]):a?e.setItemsEditable(["mattaxes","suptaxes","custaxes","iscusvat","istriangletrade"]):e.setItemsEditable(["mattaxes","custaxes","suptaxes"])},this.getTableHead=function(){return i.default.createElement("div",{className:"shoulder-definition-area"},i.default.createElement("div",{className:"definition-icons"},e.props.cardTable.createBrowseIcons(e.tableId,{iconArr:["close","open","max","setCol"],maxDestAreaId:"nc-bill-card"})))}},n);S=(0,l.createPage)({billinfo:{billtype:"card",pagecode:"10140VATCR_taxcode_card",headcode:"head",bodycode:"taxrate"}})(S),t.default=S},150:function(e,t,a){(function(e){var n=void 0!==e&&e||"undefined"!=typeof self&&self||window,r=Function.prototype.apply;function o(e,t){this._id=e,this._clearFn=t}t.setTimeout=function(){return new o(r.call(setTimeout,n,arguments),clearTimeout)},t.setInterval=function(){return new o(r.call(setInterval,n,arguments),clearInterval)},t.clearTimeout=t.clearInterval=function(e){e&&e.close()},o.prototype.unref=o.prototype.ref=function(){},o.prototype.close=function(){this._clearFn.call(n,this._id)},t.enroll=function(e,t){clearTimeout(e._idleTimeoutId),e._idleTimeout=t},t.unenroll=function(e){clearTimeout(e._idleTimeoutId),e._idleTimeout=-1},t._unrefActive=t.active=function(e){clearTimeout(e._idleTimeoutId);var t=e._idleTimeout;t>=0&&(e._idleTimeoutId=setTimeout(function(){e._onTimeout&&e._onTimeout()},t))},a(151),t.setImmediate="undefined"!=typeof self&&self.setImmediate||void 0!==e&&e.setImmediate||this&&this.setImmediate,t.clearImmediate="undefined"!=typeof self&&self.clearImmediate||void 0!==e&&e.clearImmediate||this&&this.clearImmediate}).call(this,a(148))},151:function(e,t,a){(function(e,t){!function(e,a){"use strict";if(!e.setImmediate){var n,r=1,o={},s=!1,i=e.document,l=Object.getPrototypeOf&&Object.getPrototypeOf(e);l=l&&l.setTimeout?l:e,"[object process]"==={}.toString.call(e.process)?n=function(e){t.nextTick(function(){c(e)})}:function(){if(e.postMessage&&!e.importScripts){var t=!0,a=e.onmessage;return e.onmessage=function(){t=!1},e.postMessage("","*"),e.onmessage=a,t}}()?function(){var t="setImmediate$"+Math.random()+"$",a=function(a){a.source===e&&"string"==typeof a.data&&0===a.data.indexOf(t)&&c(+a.data.slice(t.length))};e.addEventListener?e.addEventListener("message",a,!1):e.attachEvent("onmessage",a),n=function(a){e.postMessage(t+a,"*")}}():e.MessageChannel?function(){var e=new MessageChannel;e.port1.onmessage=function(e){c(e.data)},n=function(t){e.port2.postMessage(t)}}():i&&"onreadystatechange"in i.createElement("script")?function(){var e=i.documentElement;n=function(t){var a=i.createElement("script");a.onreadystatechange=function(){c(t),a.onreadystatechange=null,e.removeChild(a),a=null},e.appendChild(a)}}():n=function(e){setTimeout(c,0,e)},l.setImmediate=function(e){"function"!=typeof e&&(e=new Function(""+e));for(var t=new Array(arguments.length-1),a=0;a<t.length;a++)t[a]=arguments[a+1];var s={callback:e,args:t};return o[r]=s,n(r),r++},l.clearImmediate=u}function u(e){delete o[e]}function c(e){if(s)setTimeout(c,0,e);else{var t=o[e];if(t){s=!0;try{!function(e){var t=e.callback,n=e.args;switch(n.length){case 0:t();break;case 1:t(n[0]);break;case 2:t(n[0],n[1]);break;case 3:t(n[0],n[1],n[2]);break;default:t.apply(a,n)}}(t)}finally{u(e),s=!1}}}}}("undefined"==typeof self?void 0===e?this:e:self)}).call(this,a(148),a(152))},152:function(e,t){var a,n,r=e.exports={};function o(){throw new Error("setTimeout has not been defined")}function s(){throw new Error("clearTimeout has not been defined")}function i(e){if(a===setTimeout)return setTimeout(e,0);if((a===o||!a)&&setTimeout)return a=setTimeout,setTimeout(e,0);try{return a(e,0)}catch(t){try{return a.call(null,e,0)}catch(t){return a.call(this,e,0)}}}!function(){try{a="function"==typeof setTimeout?setTimeout:o}catch(e){a=o}try{n="function"==typeof clearTimeout?clearTimeout:s}catch(e){n=s}}();var l,u=[],c=!1,d=-1;function f(){c&&l&&(c=!1,l.length?u=l.concat(u):d=-1,u.length&&p())}function p(){if(!c){var e=i(f);c=!0;for(var t=u.length;t;){for(l=u,u=[];++d<t;)l&&l[d].run();d=-1,t=u.length}l=null,c=!1,function(e){if(n===clearTimeout)return clearTimeout(e);if((n===s||!n)&&clearTimeout)return n=clearTimeout,clearTimeout(e);try{n(e)}catch(t){try{return n.call(null,e)}catch(t){return n.call(this,e)}}}(e)}}function m(e,t){this.fun=e,this.array=t}function v(){}r.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var a=1;a<arguments.length;a++)t[a-1]=arguments[a];u.push(new m(e,t)),1!==u.length||c||i(p)},m.prototype.run=function(){this.fun.apply(null,this.array)},r.title="browser",r.browser=!0,r.env={},r.argv=[],r.version="",r.versions={},r.on=v,r.addListener=v,r.once=v,r.off=v,r.removeListener=v,r.removeAllListeners=v,r.emit=v,r.prependListener=v,r.prependOnceListener=v,r.listeners=function(e){return[]},r.binding=function(e){throw new Error("process.binding is not supported")},r.cwd=function(){return"/"},r.chdir=function(e){throw new Error("process.chdir is not supported")},r.umask=function(){return 0}},153:function(e,t,a){var n=a(154);"string"==typeof n&&(n=[[e.i,n,""]]);var r={transform:void 0};a(129)(n,r);n.locals&&(e.exports=n.locals)},154:function(e,t,a){(e.exports=a(128)(!1)).push([e.i,".taxcode-tab-area section.light-tabs {\n  background: white;\n  border-top: 1px solid #ccc;\n}\n",""])},167:function(e,t,a){e.exports=a(149)},2:function(e,a){e.exports=t},3:function(e,t){e.exports=a}})});
//# sourceMappingURL=index.fba8db28.js.map