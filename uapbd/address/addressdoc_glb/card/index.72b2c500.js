!function(e,a){"object"==typeof exports&&"object"==typeof module?module.exports=a(require("nc-lightapp-front"),require("react"),require("react-dom")):"function"==typeof define&&define.amd?define(["nc-lightapp-front","react","react-dom"],a):"object"==typeof exports?exports["uapbd/address/addressdoc_glb/card/index"]=a(require("nc-lightapp-front"),require("react"),require("react-dom")):e["uapbd/address/addressdoc_glb/card/index"]=a(e["nc-lightapp-front"],e.React,e.ReactDOM)}(window,function(e,a,t){return function(e){var a={};function t(o){if(a[o])return a[o].exports;var r=a[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}return t.m=e,t.c=a,t.d=function(e,a,o){t.o(e,a)||Object.defineProperty(e,a,{enumerable:!0,get:o})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,a){if(1&a&&(e=t(e)),8&a)return e;if(4&a&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(t.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&a&&"string"!=typeof e)for(var r in e)t.d(o,r,function(a){return e[a]}.bind(null,r));return o},t.n=function(e){var a=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(a,"a",a),a},t.o=function(e,a){return Object.prototype.hasOwnProperty.call(e,a)},t.p="../../../../",t(t.s=162)}({1:function(a,t){a.exports=e},156:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var o=function(){function e(e,a){for(var t=0;t<a.length;t++){var o=a[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(a,t,o){return t&&e(a.prototype,t),o&&e(a,o),a}}(),r=l(t(7)),n=t(2),d=l(n);l(t(4)),t(1);function l(e){return e&&e.__esModule?e:{default:e}}var s=function(e){function a(e){return function(e,a){if(!(e instanceof a))throw new TypeError("Cannot call a class as a function")}(this,a),function(e,a){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!a||"object"!=typeof a&&"function"!=typeof a?e:a}(this,(a.__proto__||Object.getPrototypeOf(a)).call(this,e))}return function(e,a){if("function"!=typeof a&&null!==a)throw new TypeError("Super expression must either be null or a function, not "+typeof a);e.prototype=Object.create(a&&a.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),a&&(Object.setPrototypeOf?Object.setPrototypeOf(e,a):e.__proto__=a)}(a,n.Component),o(a,[{key:"render",value:function(){return d.default.createElement(r.default,{config:{title:"10140ADRB-000000",pageCode:"10140ADRB_card",appcode:"10140ADRB",nodeType:"GLOBE_NODE",linktourl:"/uapbd/address/addressdoc_glb/",linkpagecode:"10140ADRB_list"}})}}]),a}();a.default=s},162:function(e,a,t){e.exports=t(156)},2:function(e,t){e.exports=a},3:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var o=Object.assign||function(e){for(var a=1;a<arguments.length;a++){var t=arguments[a];for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])}return e};a.default=function(e){return function(){var a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments[2],d=0,l={},s=function(){2==d&&n&&n(l.templateData||{},l.langData||{},l.inlt||{})};t.callback&&console.log("咱们自己createUIDom会同时获取多语和单据模板,并通过一个回调函数返回, langCfg中的回调函数将被忽略");var i=o({},t,{callback:function(e,a,t){d+=1,a||(0,r.toast)({content:"load muti lang error",color:"warning"}),l.langData=e||{},l.inlt=t||{},s()}});e.MultiInit.getMultiLang(i),e.createUIDom(a,function(e){d+=1,l.templateData=e||{},s()})}};var r=t(1)},4:function(e,a){e.exports=t},7:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var o,r,n=function(){function e(e,a){for(var t=0;t<a.length;t++){var o=a[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(a,t,o){return t&&e(a.prototype,t),o&&e(a,o),a}}(),d=t(2),l=c(d),s=t(1),i=c(t(3));function c(e){return e&&e.__esModule?e:{default:e}}function u(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}var f=s.high.PrintOutput,p=s.base.NCAffix,m=s.base.NCBackBtn,b=s.cardCache.getCacheById,g=s.cardCache.updateCache,v=s.cardCache.addCache,h=s.cardCache.getCurrentLastId,y=s.cardCache.getNextId,k=s.cardCache.deleteCacheById,I="linkmanvos",w="10140LM",_="pk_addressdoc",C="uapbd.address.addressdoc_grp.dataSource",D={queryaddresscardUrl:"/nccloud/uapbd/address/queryaddresscard.do",SaveaddressUrl:"/nccloud/uapbd/address/saveaddress.do",updateaddressUrl:"/nccloud/uapbd/address/updateaddress.do",deladdressUrl:"/nccloud/uapbd/address/deladdress.do",copyaddressUrl:"/nccloud/uapbd/address/copyAddressCard.do",saveLinkman:"/nccloud/uapbd/address/saveLinkman.do",queryLinkman:"/nccloud/uapbd/address/queryLinkman.do",queryDefaultDataUrl:"/nccloud/uapbd/address/queryDefaultData.do",enablestateUrl:"/nccloud/uapbd/address/enableAddressDocInfo.do",print:"/nccloud/uapbd/address/printAddressDocInfo.do",cancel:"/nccloud/uapbd/address/cancelAddressDoc.do",validateUrl:"/nccloud/uapbd/address/validateAddressDoc.do"},P=(o=function(e){function a(e){!function(e,a){if(!(e instanceof a))throw new TypeError("Cannot call a class as a function")}(this,a);var t=function(e,a){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!a||"object"!=typeof a&&"function"!=typeof a?e:a}(this,(a.__proto__||Object.getPrototypeOf(a)).call(this,e));return r.call(t),t.config=Object.assign({title:"10140ADRB-000000",tableId:"linkmanvos",formId:"head",linkman:"10140LM",pageCode:"10140ADRB_card",appcode:"10140ADRB",oid:"1004Z01000000000YWY3",nodeType:"GLOBE_NODE",primaryKey:"pk_addressdoc",urls:D},e.config),t.state={project_code:null,bill_code:"",isedit:!0,pks:[],stated:"browse",json:{},isPrecode:!0},t.initTemplate(t.props,function(){if("add"!=t.props.getUrlParam("status")){var e=t.props.getUrlParam("id");e&&"undefined"!=e&&t.getdata(e)}else{var a=t.props.getUrlParam("id");a&&"undefined"!=a?t.copydate(a):t.setDefaultValue()}}),t}return function(e,a){if("function"!=typeof a&&null!==a)throw new TypeError("Super expression must either be null or a function, not "+typeof a);e.prototype=Object.create(a&&a.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),a&&(Object.setPrototypeOf?Object.setPrototypeOf(e,a):e.__proto__=a)}(a,d.Component),n(a,[{key:"componentWillMount",value:function(){}},{key:"componentDidMount",value:function(){}},{key:"componentDidUpdate",value:function(){var e=this.props.form.getFormStatus(this.config.formId);window.onbeforeunload="browse"===e?null:function(){return""}}},{key:"buttonClick",value:function(e,a){var t=this;switch(a){case"add":e.form.EmptyAllFormValue(this.config.formId),e.cardTable.setTableData(this.config.tableId,{rows:[]}),e.setUrlParam({status:"add"}),this.setDefaultValue();break;case"edit":(0,s.ajax)({url:D.validateUrl,data:{pk:e.getUrlParam("id"),nodeType:e.config.nodeType,type:a},success:function(a){e.setUrlParam({status:"edit",id:e.getUrlParam("id")}),t.toggleShow()}});break;case"delete":(0,s.ajax)({url:D.validateUrl,data:{pk:e.getUrlParam("id"),nodeType:e.config.nodeType,type:a},success:function(e){(0,s.promptBox)({color:"info",title:t.state.json["10140ADRB-000002"],content:t.state.json["10140ADRB-000003"],beSureBtnClick:t.delConfirm.bind(t)})}});break;case"back":e.pushTo("list");break;case"save":this.saveClick();break;case"saveadd":this.saveaddClick();break;case"copy":e.setUrlParam({status:"add",id:e.getUrlParam("id")}),this.copydate(e.getUrlParam("id"));break;case"cancel":(0,s.promptBox)({color:"info",title:this.state.json["10140ADRB-000004"],content:this.state.json["10140ADRB-000005"],beSureBtnClick:function(){if("add"===e.getUrlParam("status"))if(e.getUrlParam("id"))e.setUrlParam({status:"browse",id:e.getUrlParam("id")}),t.getdata(e.getUrlParam("id"));else{var a=t.props.form.getFormItemsValue(t.config.formId,"code");(0,s.ajax)({url:D.cancel,data:{code:a.value},success:function(a){e.form.cancel(t.config.formId),e.cardTable.resetTableData(t.config.tableId);var o=h(C);if(e.setUrlParam({status:"browse",id:o}),null==o)return t.props.button.setButtonVisible(["add","edit","delete","copy","refresh","back","print"],!0),t.props.button.setButtonVisible(["save","saveadd","cancel","addline"],!1),t.props.button.setDisabled(["edit","delete","copy","refresh","back","print"],!0),t.props.form.cancel(t.config.formId),t.props.cardTable.resetTableData(t.config.tableId),void t.props.form.setFormItemsDisabled(t.config.formId,{enablestate:!0});var r=t.props.getUrlParam("id");r&&"undefined"!=r&&t.getdata(r)}})}"edit"===e.getUrlParam("status")&&(e.form.cancel(t.config.formId),e.cardTable.resetTableData(t.config.tableId),e.setUrlParam({status:"browse",id:e.getUrlParam("id")})),t.toggleShow()},cancelBtnClick:function(){},closeBtnClick:function(){}});break;case"addline":this.linkadd(e);break;case"refresh":var o=this.props.getUrlParam("id");o&&"undefined"!=o&&this.getdata(o,!0,function(){(0,s.toast)({title:t.state.json["10140ADRB-000006"],color:"success"})});break;case"print":this.pintFunction({funcode:"10140ADRB",nodekey:"addresscard",outputType:"print"});break;case"output":var r=this.props.getUrlParam("id");if(null==r)return;var n=[];n.push(r),this.setState({pks:n},this.refs.printOutput.open())}}},{key:"pintFunction",value:function(e){var a=this.props.getUrlParam("id");if(null!=a){var t=[];t.push(a),e.oids=t,(0,s.print)("pdf",D.print,e)}}},{key:"render",value:function(){var e=this.props,a=e.cardTable,t=e.form,o=e.button,r=e.modal,n=e.cardPagination.createCardPagination,d=t.createForm,s=a.createCardTable,i=o.createButtonApp,c=r.createModal;return l.default.createElement("div",{className:"nc-bill-card"},l.default.createElement("div",{className:"nc-bill-top-area"},l.default.createElement(p,null,l.default.createElement("div",{className:"nc-bill-header-area"},"browse"===this.state.stated&&l.default.createElement(m,{className:"title-search-detail",onClick:this.buttonClick.bind(this,this.props,"back")}),l.default.createElement("div",{className:"header-title-search-area"},l.default.createElement("h2",{className:"title-search-detail"},this.state.json[this.config.title],"browse"==this.state.stated?"："+(null!=this.state.project_code?this.state.project_code:""):"")),l.default.createElement("div",{className:"header-button-area"},i({area:"card-header-button",buttonLimit:3,onButtonClick:this.buttonClick.bind(this),popContainer:document.querySelector(".card-header-button")})),l.default.createElement("div",{className:"header-cardPagination-area",style:{float:"right"}},n({handlePageInfoChange:this.pageInfoClick.bind(this),dataSource:C})))),l.default.createElement("div",{className:"nc-bill-form-area"},d(this.config.formId,{onAfterEvent:this.afterEvent.bind(this)}))),l.default.createElement("div",{className:"nc-bill-bottom-area"},l.default.createElement("div",{className:"nc-bill-table-area"},s(this.config.tableId,{tableHead:this.getTableHead.bind(this),modelSave:this.modelSave.bind(this),tableModelConfirm:this.tableModelConfirm,showIndex:!0}))),c("delete",{title:this.state.json["10140ADRB-000012"],content:this.state.json["10140ADRB-000013"],beSureBtnClick:this.delConfirm.bind(this)}),c("linkmanModal",{title:this.state.json["10140ADRB-000014"],size:"lg",content:this.createLinkmanForm()}),c("modal",{noFooter:!1}),l.default.createElement(f,{ref:"printOutput",url:D.print,data:{funcode:"10140ADRB",nodekey:"addresscard",oids:this.state.pks,outputType:"output"}}))}}]),a}(),r=function(){var e=this;this.initTemplate=function(a,t){(0,i.default)(a)({pagecode:a.config.pageCode?a.config.pageCode:"10140ADRB_card"},{moduleId:"10140ADRB",domainName:"uapbd"},function(o,r){if(r&&(e.state.json=r),o){if(o.button){var n=o.button;a.button.setButtons(n)}if(o.template){var d=o.template;e.modifierMeta(a,d),a.meta.setMeta(d)}t&&t()}})},this.tableBtnAry=function(e){return"browse"===e.cardTable.getStatus(I)?[]:["insertline","delline","editline"]},this.modifierMeta=function(a,t){var o=a.getUrlParam("status");return t.head.status=o,t[I].status=o,t.head.items.map(function(t){"pk_areacl"==t.attrcode&&(t.queryCondition=function(){if("GLOBE_NODE"==e.config.nodeType)return{pk_org:"GLOBLE00000000000000"}}),"province"==t.attrcode&&(t.disabled=!0,t.queryCondition=function(){return{pk_country:a.form.getFormItemsValue("head","country").value,pk_father:"~"}}),"city"==t.attrcode&&(t.disabled=!0,t.queryCondition=function(){return{pk_father:a.form.getFormItemsValue("head","province").value}}),"region"==t.attrcode&&(t.disabled=!0,t.queryCondition=function(){return{pk_father:a.form.getFormItemsValue("head","city").value}})}),t[I].items.push({attrcode:"opr",label:e.state.json["10140ADRB-000001"],visible:!0,className:"table-opr",width:200,itemtype:"customer",render:function(t,o,r){var n=e.tableBtnAry(a);return a.button.createOprationButton(n,{area:"table-opr-button",buttonLimit:3,onButtonClick:function(a,n){return e.tableButtonClick(a,n,t,o,r)}})}}),t},this.tablemodalshow=function(a,t){a.modal.show("linkmanModal",{userControl:!0,beSureBtnClick:function(){if(e.props.form.isCheckNow(w)){var o=a.form.getAllFormValue(w);(0,s.ajax)({url:D.saveLinkman,data:{pageid:a.config.pageCode,gridModel:o},success:function(e){var r=e.success,n=e.data;r&&(a.modal.close("linkmanModal"),n&&(a.cardTable.setValByKeyAndIndex(I,t,"pk_linkman",{value:n,display:n}),a.cardTable.setValByKeyAndIndex(I,t,"pk_linkman.name",o.rows[0].values.name),a.cardTable.setValByKeyAndIndex(I,t,"pk_linkman.sex",o.rows[0].values.sex),a.cardTable.setValByKeyAndIndex(I,t,"pk_linkman.vjob",o.rows[0].values.vjob),a.cardTable.setValByKeyAndIndex(I,t,"pk_linkman.phone",o.rows[0].values.phone),a.cardTable.setValByKeyAndIndex(I,t,"pk_linkman.cell",o.rows[0].values.cell)))}})}},cancelBtnClick:function(){a.form.EmptyAllFormValue(w),a.modal.close("linkmanModal")},closeModalEve:function(){a.form.EmptyAllFormValue(w),a.modal.close("linkmanModal")}})},this.tableButtonClick=function(a,t,o,r,n){switch(t){case"spread":a.cardTable.toggleRowView(I,r);break;case"delline":a.cardTable.delRowsByIndex(I,n);break;case"insertline":a.form.setFormStatus(w,"edit"),a.modal.show("linkmanModal",{userControl:!0,beSureBtnClick:function(){if(e.props.form.isCheckNow(w)){var t=a.form.getAllFormValue(w);(0,s.ajax)({url:D.saveLinkman,data:{pageid:e.config.pageCode,gridModel:t},success:function(e){var o=e.success,r=e.data;o&&r&&(a.modal.close("linkmanModal"),a.cardTable.addRow(I,n+1,{pk_linkman:{value:r},"pk_linkman.name":t.rows[0].values.name,"pk_linkman.sex":t.rows[0].values.sex,"pk_linkman.vjob":t.rows[0].values.vjob,"pk_linkman.phone":t.rows[0].values.phone,"pk_linkman.cell":t.rows[0].values.cell}))}})}},cancelBtnClick:function(){a.form.EmptyAllFormValue(w),a.modal.close("linkmanModal")},closeModalEve:function(){a.form.EmptyAllFormValue(w),a.modal.close("linkmanModal")}});break;case"editline":(0,s.ajax)({url:D.queryLinkman,data:{pageid:a.config.pageCode,moudleid:w,pk:r.values.pk_linkman.value},success:function(t){var o=t.success,r=t.data;o&&r&&(a.form.setFormStatus(w,"edit"),a.form.setAllFormValue(u({},w,t.data[w])),e.tablemodalshow(a,n))}})}},this.setDefaultValue=function(){(0,s.ajax)({url:D.queryDefaultDataUrl,data:{nodeType:e.config.nodeType},success:function(a){if(a.data.carddate.head){var t=a.data.carddate.head[e.config.formId],o=t.rows[0].values.code.value;t.rows.forEach(function(e,a,t){"2"===e.values.enablestate.value?e.values.enablestate.value=!0:e.values.enablestate.value=!1}),e.props.form.setAllFormValue(u({},e.config.formId,t)),console.log(e.config.formId,{code:!0}),e.props.form.setFormItemsDisabled(e.config.formId,{code:!a.data.isCodeEdit}),e.state.isPrecode=a.data.isPrecode,e.setState({project_code:o})}a.data.carddate.body&&e.props.cardTable.setTableData(e.config.tableId,a.data.carddate.body[e.config.tableId]),a.data.message&&(0,s.toast)({content:a.data.message,color:"warning"}),e.toggleShow()},error:function(e){}})},this.toggleShow=function(){var a=e.props.getUrlParam("status"),t="browse"!==a;e.props.button.setButtonVisible(["add","edit","delete","copy","refresh","back","print"],!t),e.props.button.setButtonVisible(["save","saveadd","cancel","addline"],t),e.props.cardPagination.setCardPaginationVisible("cardPaginationBtn",!t);var o=e.props.form.getFormItemsValue(e.config.formId,"pk_group").value,r=e.props.form.getFormItemsValue(e.config.formId,"pk_org").value,n="GROPE_NODE"===e.config.nodeType&&o!=r;e.props.button.setDisabled({edit:n,delete:n,saveadd:"edit"==a}),e.props.form.setFormStatus(e.config.formId,a),e.props.form.setFormItemsDisabled(e.config.formId,{enablestate:t}),e.props.cardTable.setStatus(e.config.tableId,"browse"===a?"browse":"edit"),e.setState({stated:a})},this.getdata=function(a,t,o){var r=b(a,C);if(r&&!t){if(r.carddate.head){r.carddate.head[e.config.formId].rows.forEach(function(e,a,t){"2"===e.values.enablestate.value?e.values.enablestate.value=!0:e.values.enablestate.value=!1}),e.props.form.setAllFormValue(u({},e.config.formId,r.carddate.head[e.config.formId]));var n=r.carddate.head[e.config.formId].rows[0].values,d=n.code.value;e.setState({project_code:d}),e.props.form.setFormItemsDisabled(e.config.formId,{code:!r.isCodeEdit}),e.state.isPrecode=r.isPrecode;var l="GROPE_NODE"===e.config.nodeType&&n.pk_group.value!=n.pk_org.value;e.props.form.setFormItemsDisabled(e.config.formId,{enablestate:l})}r.carddate.body&&e.props.cardTable.setTableData(e.config.tableId,r.carddate.body[e.config.tableId]),e.toggleShow()}else{var i={pk:a,pagecode:e.config.pageCode};(0,s.ajax)({url:D.queryaddresscardUrl,data:i,success:function(t){if(t.data.carddate.head){t.data.carddate.head[e.config.formId].rows.forEach(function(e,a,t){"2"===e.values.enablestate.value?e.values.enablestate.value=!0:e.values.enablestate.value=!1}),e.props.form.setAllFormValue(u({},e.config.formId,t.data.carddate.head[e.config.formId]));var r=t.data.carddate.head[e.config.formId].rows[0].values,n=r.code.value;e.setState({project_code:n}),e.props.form.setFormItemsDisabled(e.config.formId,{code:!t.data.isCodeEdit}),e.state.isPrecode=t.data.isPrecode;var d="GROPE_NODE"===e.config.nodeType&&r.pk_group.value!=r.pk_org.value;e.props.form.setFormItemsDisabled(e.config.formId,{enablestate:d})}t.data.carddate.body&&e.props.cardTable.setTableData(e.config.tableId,t.data.carddate.body[e.config.tableId]),t.data.head=t.data.carddate.head,g(_,a,t.data,e.config.formId,C),o&&o(),e.toggleShow()}})}},this.copydate=function(a){var t={pk:a,pagecode:e.config.pageCode};(0,s.ajax)({url:D.copyaddressUrl,data:t,success:function(a){if(a.data.carddate.head){a.data.carddate.head[e.config.formId].rows.forEach(function(e,a,t){"2"===e.values.enablestate.value?e.values.enablestate.value=!0:e.values.enablestate.value=!1}),e.props.form.setAllFormValue(u({},e.config.formId,a.data.carddate.head[e.config.formId]));var t=a.data.carddate.head[e.config.formId].rows[0].values.code.value;e.setState({project_code:t}),e.props.form.setFormItemsDisabled(e.config.formId,{code:!a.data.isCodeEdit}),e.state.isPrecode=a.data.isPrecode}a.data.carddate.body&&e.props.cardTable.setTableData(e.config.tableId,a.data.carddate.body[e.config.tableId]),e.toggleShow()}})},this.pageInfoClick=function(a,t){console.log(t),t&&null!=t&&(a.setUrlParam({id:t}),e.getdata(t))},this.saveClick=function(){if(e.props.cardTable.filterEmptyRows(I),0==e.state.isPrecode&&null==e.props.form.getFormItemsValue(e.config.formId,"code").value&&e.props.form.setFormItemsValue(e.config.formId,{code:{value:".",display:null}}),e.props.form.isCheckNow(e.config.formId)){var a=e.props.createMasterChildData(e.config.pageCode,e.config.formId,e.config.tableId);a.head[e.config.formId].rows[0].values.enablestate.value=1==a.head[e.config.formId].rows[0].values.enablestate.value?2:3;var t=D.SaveaddressUrl;"edit"===e.props.getUrlParam("status")&&(t=D.updateaddressUrl),(0,s.ajax)({url:t,data:a,success:function(a){if(a.success){var t=null;if(a.data){if(a.data.carddate.head){a.data.carddate.head[e.config.formId].rows.forEach(function(e,a,t){"2"===e.values.enablestate.value?e.values.enablestate.value=!0:e.values.enablestate.value=!1}),e.props.form.setAllFormValue(u({},e.config.formId,a.data.carddate.head[e.config.formId]));var o=a.data.carddate.head[e.config.formId].rows[0].values,r=o.code.value;t=o[_].value,e.setState({project_code:r}),e.props.form.setFormItemsDisabled(e.config.formId,{code:!a.data.isCodeEdit});var n="GROPE_NODE"===e.config.nodeType&&o.pk_group.value!=o.pk_org.value;e.props.form.setFormItemsDisabled(e.config.formId,{enablestate:n})}a.data.carddate.body&&e.props.cardTable.setTableData(e.config.tableId,a.data.carddate.body[e.config.tableId]),a.data.head=a.data.carddate.head,"add"===e.props.getUrlParam("status")&&v(t,a.data,e.config.formId,C),g(_,t,a.data,e.config.formId,C),e.props.setUrlParam({status:"browse",id:t}),(0,s.toast)({title:e.state.json["10140ADRB-000007"],color:"success"}),e.toggleShow()}}}})}},this.saveaddClick=function(){if(e.props.cardTable.filterEmptyRows(I),0==e.state.isPrecode&&null==e.props.form.getFormItemsValue(e.config.formId,"code").value&&e.props.form.setFormItemsValue(e.config.formId,{code:{value:".",display:null}}),e.props.form.isCheckNow(e.config.formId)){var a=e.props.createMasterChildData(e.config.pageCode,e.config.formId,e.config.tableId);a.head[e.config.formId].rows[0].values.enablestate.value=1==a.head[e.config.formId].rows[0].values.enablestate.value?2:3;var t=D.SaveaddressUrl;"edit"===e.props.getUrlParam("status")&&(t=D.updateaddressUrl),(0,s.ajax)({url:t,data:a,success:function(a){if(a.success){var t=null;if(a.data){if(a.data.carddate.head){a.data.carddate.head[e.config.formId].rows.forEach(function(e,a,t){"2"===e.values.enablestate.value?e.values.enablestate.value=!0:e.values.enablestate.value=!1}),e.props.form.setAllFormValue(u({},e.config.formId,a.data.carddate.head[e.config.formId]));var o=a.data.carddate.head[e.config.formId].rows[0].values,r=o.code.value;t=o[_].value,e.setState({project_code:r}),e.props.form.setFormItemsDisabled(e.config.formId,{code:!a.data.isCodeEdit});var n="GROPE_NODE"===e.config.nodeType&&o.pk_group.value!=o.pk_org.value;e.props.form.setFormItemsDisabled(e.config.formId,{enablestate:n})}a.data.carddate.body&&e.props.cardTable.setTableData(e.config.tableId,a.data.carddate.body[e.config.tableId]),a.data.head=a.data.carddate.head,"add"===e.props.getUrlParam("status")&&v(t,a.data,e.config.formId,C),g(_,t,a.data,e.config.formId,C),e.props.setUrlParam({status:"add",id:null}),(0,s.toast)({title:e.state.json["10140ADRB-000007"],color:"success"}),e.props.form.EmptyAllFormValue(e.config.formId),e.props.cardTable.setTableData(e.config.tableId,{rows:[]}),e.setDefaultValue()}}}})}},this.delConfirm=function(){(0,s.ajax)({url:D.deladdressUrl,data:{id:e.props.getUrlParam("id"),ts:e.props.form.getFormItemsValue(e.config.formId,"ts").value},success:function(a){if(a){var t=e.props.getUrlParam("id"),o=y(t,C);k(_,t,C),(0,s.toast)({color:"success",title:e.state.json["10140ADRB-000008"]}),o?(e.props.setUrlParam({status:"browse",id:o}),e.getdata(o)):e.props.pushTo("/list",{})}}})},this.modelSave=function(a){a.cardTable.closeModel(e.config.tableId),e.saveClick()},this.afterEvent=function(a,t,o,r,n,d){switch(o){case"country":a.form.setFormItemsDisabled(t,{province:null==r.value}),null==r.value&&a.form.setFormItemsDisabled(t,{city:!0,region:!0}),a.form.setFormItemsValue(e.config.formId,{province:{value:null,display:null},city:{display:null,value:null},region:{display:null,value:null}});break;case"province":a.form.setFormItemsDisabled(t,{city:null==r.value}),null==r.value&&a.form.setFormItemsDisabled(t,{region:!0}),a.form.setFormItemsValue(e.config.formId,{city:{display:null,value:null},region:{display:null,value:null}});break;case"city":a.form.setFormItemsDisabled(t,{region:null==r.value}),a.form.setFormItemsValue(e.config.formId,{region:{display:null,value:null}});break;case"enablestate":var l={pk:a.form.getAllFormValue(t).rows[0].values.pk_addressdoc.value,enablestate:r.value?"2":"3",ts:a.form.getAllFormValue(t).rows[0].values.ts.value,nodeType:e.config.nodeType,moduleid:e.config.formId,pagecode:e.config.pageCode};(0,s.ajax)({url:D.validateUrl,data:{pk:a.getUrlParam("id"),nodeType:a.config.nodeType,type:r.value?"enable":"disable"},success:function(a){(0,s.ajax)({url:D.enablestateUrl,data:l,success:function(a){if(a.data.head){a.data.head[e.config.formId].rows.forEach(function(e,a,t){"2"===e.values.enablestate.value?e.values.enablestate.value=!0:e.values.enablestate.value=!1}),e.props.form.setAllFormValue(u({},e.config.formId,a.data.head[e.config.formId]));var t=a.data.head[e.config.formId].rows[0].values.code.value;e.setState({project_code:t})}a.data.body&&e.props.cardTable.setTableData(e.config.tableId,a.data.body[e.config.tableId]),e.toggleShow(),(0,s.toast)({title:r.value?e.state.json["10140ADRB-000009"]:e.state.json["10140ADRB-000010"]})}})},error:function(t){(0,s.toast)({content:t.message,color:"warning"}),a.form.setFormItemsValue(e.config.formId,{enablestate:{value:!r.value}})}})}e.state.isedit=!e.state.isedit,e.setState(e.state)},this.getTableHead=function(){var a=e.props.button.createButtonApp;e.props.getUrlParam("status");return l.default.createElement("div",{className:"shoulder-definition-area"},l.default.createElement("div",{className:"definition-icons"},a({area:"table-header-button",buttonLimit:5,onButtonClick:e.buttonClick.bind(e),popContainer:document.querySelector(".table-header-button")}),e.props.cardTable.createBrowseIcons(e.config.tableId,{iconArr:["close","open","max","setCol"],maxDestAreaId:"nc-bill-card"})))},this.createLinkmanForm=function(){var a=e.props.form.createForm;return l.default.createElement("div",null,l.default.createElement("div",{className:"nc-bill-form-area"},a(w,{onAfterEvent:e.modalAfterEvent.bind(e)})))},this.modalAfterEvent=function(){},this.linkadd=function(a){a.form.setFormStatus(w,"edit"),a.modal.show("linkmanModal",{userControl:!0,beSureBtnClick:function(){if(e.props.form.isCheckNow(w)){var t=a.form.getAllFormValue(w);(0,s.ajax)({url:D.saveLinkman,data:{pageid:e.config.pageCode,gridModel:t},success:function(e){var o=e.success,r=e.data;if(o&&r){a.modal.close("linkmanModal");var n=a.cardTable.getNumberOfRows(I);a.cardTable.addRow(I,n,{pk_linkman:{value:r},"pk_linkman.name":t.rows[0].values.name,"pk_linkman.sex":t.rows[0].values.sex,"pk_linkman.vjob":t.rows[0].values.vjob,"pk_linkman.phone":t.rows[0].values.phone,"pk_linkman.cell":t.rows[0].values.cell})}}})}},cancelBtnClick:function(){a.form.EmptyAllFormValue(w),a.modal.close("linkmanModal")},closeModalEve:function(){a.form.EmptyAllFormValue(w),a.modal.close("linkmanModal")}})}},o);P=(0,s.createPage)({})(P),a.default=P}})});
//# sourceMappingURL=index.72b2c500.js.map