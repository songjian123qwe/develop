!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("nc-lightapp-front"),require("react")):"function"==typeof define&&define.amd?define(["nc-lightapp-front","react"],t):"object"==typeof exports?exports["uapbd/org/orgunit/version/index"]=t(require("nc-lightapp-front"),require("react")):e["uapbd/org/orgunit/version/index"]=t(e["nc-lightapp-front"],e.React)}(window,function(e,t){return function(e){var t={};function r(a){if(t[a])return t[a].exports;var o=t[a]={i:a,l:!1,exports:{}};return e[a].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,a){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(r.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(a,o,function(t){return e[t]}.bind(null,o));return a},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="../../../../",r(r.s=374)}({1:function(t,r){t.exports=e},132:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e};t.default=function(e){return function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments[2],i=0,l={},c=function(){2==i&&n&&n(l.templateData||{},l.langData||{},l.inlt||{})};r.callback&&console.log("咱们自己createUIDom会同时获取多语和单据模板,并通过一个回调函数返回, langCfg中的回调函数将被忽略");var s=a({},r,{callback:function(e,t,r){i+=1,t||(0,o.toast)({content:"load muti lang error",color:"warning"}),l.langData=e||{},l.inlt=r||{},c()}});e.MultiInit.getMultiLang(s),e.createUIDom(t,function(e){i+=1,l.templateData=e||{},c()})}};var o=r(1)},156:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,r,a){return r&&e(t.prototype,r),a&&e(t,a),t}}(),o=r(2),n=r(1),i=function(e){return e&&e.__esModule?e:{default:e}}(r(132));var l=n.base.NCAffix,c=(n.base.NCAnchor,n.base.NCScrollElement),s=(n.base.NCScrollLink,n.base.NCCol),m=(n.base.NCCheckbox,n.base.NCSwitch),u=(n.base.NCMessage,n.base.NCCollapse),f="org",p=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var r=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));if(r.config=e.config,r.config&&void 0!=r.config.templatedata)r.lang=e.config.json,r.state=r.createState(),f="org_v_form",r.state.json=r.config.json,r.queryRoot(r.config.templatedata,e),e.meta.setMeta(r.config.templatedata,function(){r.setState(r.state,function(){r.browseCard(r.config.pk_vid)})});else{(0,i.default)(e)({pagecode:"10100ORG_orgunit",datasource:"uapbd.org.orgunit.orgunit",appcode:"10100ORG",gridId:"orglist"},{moduleId:"10100ORG",domainName:"uapbd"},function(t,a){f="org",r.lang=a,r.state=r.createState(),r.state.json=a,r.queryRoot(t,e),r.setState(r.state,function(){e.meta.setMeta(t&&t.template?t.template:{},function(){r.browseCard(r.props.getUrlParam("pk_org")||void 0)})})})}return window.onbeforeunload=function(){r.state.editMode},r}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,o.Component),a(t,[{key:"createState",value:function(){var e=this,t=this.props,r=(document.querySelector(".childline-button-area"),function(e){return"subname-"+e||!1}),a=function(){return null!=t.form.getFormItemsValue(f,this.orgtypeitem)&&(null!=t.form.getFormItemsValue(f,this.orgtypeitem).value&&t.form.getFormItemsValue(f,this.orgtypeitem).value)},o=function(){t.form.setFormStatus(this.areaname,0==e.state.status?"edit":"browse"),void 0!=this.authorize&&this.authorize.authorizeareacode.forEach(function(r){t.form.setFormStatus(r,0==e.state.status?"edit":"browse")})},n=function(){var e=this.areaname,a=this.title,o=this.orgtypeitem,n=t.form,i=(t.button,n.createForm,{checked:null!=t.form.getFormItemsValue(f,o)&&null!=t.form.getFormItemsValue(f,o).value&&t.form.getFormItemsValue(f,o).value});return React.createElement("div",{name:r(e),style:{display:this.isshow()?"":"none"}},React.createElement(c,{name:e},React.createElement("div",{className:"nc-bill-table-area nc-bill-table-list nc-bill-part"},React.createElement(s,null,React.createElement("span",{className:"showOff"},a,React.createElement(m,i))),React.createElement(u,{className:"nc-bill-btn-par",style:{marginBottom:"5px"},in:i.checked},React.createElement("div",null,this.renderCardForm())))))},i=function(){var e=this.areaname,r=(this.title,this.orgtypeitem,this.isshow,t.form);t.button;return(0,r.createForm)(e)},l={showMode:"card",json:{},orgunit_name:"",status:!0},p={corp:{areaname:"version"!=this.props.config.type?"corp":"corp_v",orderby:1,pk:"pk_corp",orgtypeitem:"orgtype2",title:this.lang["10100ORG-000064"]},hrorg:{areaname:"version"!=this.props.config.type?"hrorg":"hrorg_v",orderby:2,title:this.lang["10100ORG-000065"],orgtypeitem:"orgtype4",pk:"pk_hrorg"},financeorg:{areaname:"version"!=this.props.config.type?"financeorg":"financeorg_v",orderby:3,title:this.lang["10100ORG-000066"],orgtypeitem:"orgtype5",pk:"pk_financeorg"},fundorg:{areaname:"version"!=this.props.config.type?"fundorg":"fundorg_v",orderby:4,orgtypeitem:"orgtype6",pk:"pk_fundorg",title:this.lang["10100ORG-000067"]},purchaseorg:{areaname:"version"!=this.props.config.type?"purchaseorg":"purchaseorg_v",orderby:5,orgtypeitem:"orgtype7",pk:"pk_purchaseorg",title:this.lang["10100ORG-000068"]},saleorg:{areaname:"version"!=this.props.config.type?"saleorg":"saleorg_v",orderby:6,orgtypeitem:"orgtype8",pk:"pk_salesorg",title:this.lang["10100ORG-000069"],authorize:{authorizetitle:this.lang["10100ORG-000070"],authorizeareacode:"version"!=this.props.config.type?["saleorgrelation"]:["saleorgrelation_v"]},renderCardFramework:function(){var e=this.areaname,a=this.title,o=this.orgtypeitem,n=this.authorize,i=t.form,l=(t.button,i.createForm),p={checked:null!=t.form.getFormItemsValue(f,o)&&null!=t.form.getFormItemsValue(f,o).value&&t.form.getFormItemsValue(f,o).value};return React.createElement("div",{name:r(e),style:{display:this.isshow()?"":"none"}},React.createElement(c,{name:e},React.createElement("div",{className:"nc-bill-table-area nc-bill-table-list nc-bill-part"},React.createElement(s,null,React.createElement("span",{className:"showOff"},a,React.createElement(m,p))),React.createElement(u,{className:"nc-bill-btn-par",style:{marginBottom:"5px"},in:p.checked},React.createElement("div",null,this.renderCardForm(),React.createElement("div",{class:"operator operator-tit"},n.authorizetitle,React.createElement("span",{class:"wuliu"})),l(n.authorizeareacode[0]))))))}},stockorg:{areaname:"version"!=this.props.config.type?"stockorg":"stockorg_v",orderby:7,orgtypeitem:"orgtype9",pk:"pk_stockorg",title:this.lang["10100ORG-000071"],authorize:{authorizetitle:[this.lang["10100ORG-000072"],[this.lang["10100ORG-000073"]],[this.lang["10100ORG-000074"]],[this.lang["10100ORG-000075"]]],authorizeareacode:"version"!=this.props.config.type?["stocktrafficrelation","stockqccenterrelation","stockorgrelation","stockassetrelation"]:["stocktrafficrelation_v","stockqccenterrelation_v","stockorgrelation_v","stockassetrelation_v"]},renderCardFramework:function(){var e=this.areaname,a=this.title,o=this.orgtypeitem,n=this.authorize,i=t.form,l=(t.button,i.createForm),p={checked:null!=t.form.getFormItemsValue(f,o)&&null!=t.form.getFormItemsValue(f,o).value&&t.form.getFormItemsValue(f,o).value};return React.createElement("div",{name:r(e),style:{display:this.isshow()?"":"none"}},React.createElement(c,{name:e},React.createElement("div",{className:"nc-bill-table-area nc-bill-table-list nc-bill-part"},React.createElement(s,null,React.createElement("span",{className:"showOff"},a,React.createElement(m,p))),React.createElement(u,{className:"nc-bill-btn-par",style:{marginBottom:"5px"},in:p.checked},React.createElement("div",null,this.renderCardForm(),React.createElement("div",{class:"operator operator-tit"},n.authorizetitle[0],React.createElement("span",{class:"wuliu"})),l(n.authorizeareacode[0]),React.createElement("div",{class:"operator operator-tit"},n.authorizetitle[1],React.createElement("span",{className:"wuliu"})),l(n.authorizeareacode[1]),React.createElement("div",{class:"operator operator-tit"},n.authorizetitle[2],React.createElement("span",{className:"wuliu"})),l(n.authorizeareacode[2]),React.createElement("div",{class:"operator operator-tit"},n.authorizetitle[3],React.createElement("span",{className:"wuliu"})),l(n.authorizeareacode[3]))))))}},trafficorg:{areaname:"version"!=this.props.config.type?"trafficorg":"trafficorg_v",orderby:8,title:this.lang["10100ORG-000076"],orgtypeitem:"orgtype10",pk:"pk_trafficorg"},qccenter:{areaname:"version"!=this.props.config.type?"qccenter":"qccenter_v",orderby:9,title:this.lang["10100ORG-000077"],orgtypeitem:"orgtype11",pk:"pk_qccenter"},assetorg:{areaname:"version"!=this.props.config.type?"assetorg":"assetorg_v",orderby:10,orgtypeitem:"orgtype12",pk:"pk_assetorg",title:this.lang["10100ORG-000078"],authorize:{authorizetitle:this.lang["10100ORG-000079"],authorizeareacode:"version"!=this.props.config.type?["assetorgmaintainrelation"]:["assetorgmaintainrelation_v"]},renderCardFramework:function(){var e=this.areaname,a=this.title,o=this.orgtypeitem,n=this.authorize,i=t.form,l=(t.button,i.createForm),p={checked:null!=t.form.getFormItemsValue(f,o)&&null!=t.form.getFormItemsValue(f,o).value&&t.form.getFormItemsValue(f,o).value};return React.createElement("div",{name:r(e),style:{display:this.isshow()?"":"none"}},React.createElement(c,{name:e},React.createElement("div",{className:"nc-bill-table-area nc-bill-table-list nc-bill-part"},React.createElement(s,null,React.createElement("span",{className:"showOff"},a,React.createElement(m,p))),React.createElement(u,{className:"nc-bill-btn-par",style:{marginBottom:"5px"},in:p.checked},React.createElement("div",null,this.renderCardForm(),React.createElement("div",{class:"operator operator-tit"},n.authorizetitle,React.createElement("span",{class:"wuliu"})),l(n.authorizeareacode[0]))))))}},maintainorg:{areaname:"version"!=this.props.config.type?"maintainorg":"maintainorg_v",orderby:11,orgtypeitem:"orgtype14",pk:"pk_maintainorg",title:this.lang["10100ORG-000080"],authorize:{authorizetitle:this.lang["10100ORG-000081"],authorizeareacode:"version"!=this.props.config.type?["maintainstockrelation"]:["maintainstockrelation_v"]},renderCardFramework:function(){var e=this.areaname,a=this.title,o=this.orgtypeitem,n=this.authorize,i=t.form,l=(t.button,i.createForm),p={checked:null!=t.form.getFormItemsValue(f,o)&&null!=t.form.getFormItemsValue(f,o).value&&t.form.getFormItemsValue(f,o).value};return React.createElement("div",{name:r(e),style:{display:this.isshow()?"":"none"}},React.createElement(c,{name:e},React.createElement("div",{className:"nc-bill-table-area nc-bill-table-list nc-bill-part"},React.createElement(s,null,React.createElement("span",{className:"showOff"},a,React.createElement(m,p))),React.createElement(u,{className:"nc-bill-btn-par",style:{marginBottom:"5px"},in:p.checked},React.createElement("div",null,this.renderCardForm(),React.createElement("div",{class:"operator operator-tit"},n.authorizetitle,React.createElement("span",{class:"wuliu"})),l(n.authorizeareacode[0]))))))}},liabilitycenter:{areaname:"version"!=this.props.config.type?"liabilitycenter":"liabilitycenter_v",orderby:12,title:this.lang["10100ORG-000003"],orgtypeitem:"orgtype15",pk:"pk_liabilitycenter"},itemorg:{areaname:"version"!=this.props.config.type?"itemorg":"itemorg_v",orderby:13,orgtypeitem:"orgtype16",pk:"pk_itemorg",title:this.lang["10100ORG-000082"],authorize:{authorizetitle:this.lang["10100ORG-000083"],authorizeareacode:"version"!=this.props.config.type?["itemstockrelation"]:["itemstockrelation_v"]},renderCardFramework:function(){var e=this.areaname,a=this.title,o=this.orgtypeitem,n=this.authorize,i=t.form,l=(t.button,i.createForm),p={checked:null!=t.form.getFormItemsValue(f,o)&&null!=t.form.getFormItemsValue(f,o).value&&t.form.getFormItemsValue(f,o).value};return React.createElement("div",{name:r(e),style:{display:this.isshow()?"":"none"}},React.createElement(c,{name:e},React.createElement("div",{className:"nc-bill-table-area nc-bill-table-list nc-bill-part"},React.createElement(s,null,React.createElement("span",{className:"showOff"},a,React.createElement(m,p))),React.createElement(u,{className:"nc-bill-btn-par",style:{marginBottom:"5px"},in:p.checked},React.createElement("div",null,this.renderCardForm(),React.createElement("div",{class:"operator operator-tit"},n.authorizetitle,React.createElement("span",{class:"wuliu"})),l(n.authorizeareacode[0]))))))}},planbudget:{areaname:"version"!=this.props.config.type?"planbudget":"planbudget_v",orderby:14,title:this.lang["10100ORG-000084"],orgtypeitem:"orgtype17",pk:"pk_planbudget"},adminorg:{areaname:"version"!=this.props.config.type?"adminorg":"adminorg_v",orderby:15,title:this.lang["10100ORG-000085"],orgtypeitem:"orgtype29",pk:"pk_adminorg"},factory:{areaname:"version"!=this.props.config.type?"factory":"factory_v",orderby:16,title:this.lang["10100ORG-000086"],orgtypeitem:"orgtype33",pk:"pk_factory"},plancenter:{areaname:"version"!=this.props.config.type?"plancenter":"plancenter_v",orderby:17,title:this.lang["10100ORG-000087"],orgtypeitem:"orgtype34",pk:"pk_plancenter"}};return Object.values(p).forEach(function(e){!e.setFormStatus&&(e.setFormStatus=o),!e.isshow&&(e.isshow=a),!e.renderCardFramework&&(e.renderCardFramework=n),!e.renderCardForm&&(e.renderCardForm=i)}),l.card=p,l}},{key:"queryRoot",value:function(e,t){e.formrelation||(e.formrelation={}),e.formrelation.corp=["corpotherinfo","corpcontactinfo","corpdefinfo","corpaudioinfo"],e.formrelation.org=["orgtype","orgversioninfo","orgauditinfo"],e.formrelation.hrorg=["hrorgdef","hrorgauditinfo"],e.formrelation.financeorg=["financeorgdef","financeorgaudioinfo"],e.formrelation.fundorg=["fundorgdef","fundorgauditinfo"],e.formrelation.purchaseorg=["purchaseorgdef","purchaseorgauditinfo"],e.formrelation.saleorg=["saleorgdef","saleorgaudit"],e.formrelation.stockorg=["stockorgdef","stockorgaudit"],e.formrelation.trafficorg=["trafficorgdef","trafficorgauditinfo"],e.formrelation.qccenter=["qccenterdef","qccenterauditinfo"],e.formrelation.assetorg=["assetorgdef","assetorgauditinfo"],e.formrelation.maintainorg=["maintainorgdef","maintainorgauditinfo"],e.formrelation.liabilitycenter=["liabilitycenterdef","liabilitycenterauditinfo"],e.formrelation.itemorg=["itemorgdefinfo","itemorgauditinfo"],e.formrelation.planbudget=["planbudgetdef","planbudgetauditinfo"],e.formrelation.adminorg=["adminorgdef","adminorgauditinfo"],e.formrelation.factory=["factorydefitem","factoryauditinfo"],e.formrelation.plancenter=["plancenterdefiitem","plancenterauditinfo"],e.formrelation.corp_v=["corpversionotherinfo","corpversionlinkinfo"],e.formrelation.org_v_form=["orgtype_v","orgunitversioninfo"],e.formrelation.org_v_form=["orgtype_v","orgunitversioninfo"],e.formrelation.hrorg_v=["hrorgdef"],e.formrelation.financeorg_v=["financeorgdef"],e.formrelation.fundorg_v=["fundorgdef"],e.formrelation.purchaseorg_v=["purchaseorgdef"],e.formrelation.salesorg_v=["saleorgrelation_v"],e.formrelation.stockorg_v=["stocktrafficrelation_v","stockqccenterrelation_v","stockorgrelation_v","stockassetrelation_v"],e.formrelation.trafficorg_v=["trafficorgdef"],e.formrelation.qccenter_v=["qccenterdef"],e.formrelation.assetorg_v=["assetorgmaintainrelation_v"],e.formrelation.maintainorg_v=["maintainstockrelation_v"],e.formrelation.liabilitycenter_v=["liabilitycenterdef"],e.formrelation.itemorg_v_v=["itemstockrelation_v"],e.formrelation.planbudget_v=["planbudgetdef"],e.formrelation.adminorg_v=["adminorgdef"],e.formrelation.factory_v=["factorydefitem"],e.formrelation.plancenter_v=["plancenterdefiitem"]}},{key:"browseCard",value:function(e,t){var r=this;this.state.showMode="card",this.state.status=!0,this.setState(this.state,function(){r.loadCardData({pk_org:e,callback:function(e,a){r.fillCardData(e,function(e){r.setAllFormStatus(e),setTimeout(function(){t&&t(e)},0)})}})})}},{key:"loadCardData",value:function(e){var t,r=e.pk_org,a=e.callback;r&&(0,n.ajax)({url:"version"!=this.props.config.type?"/nccloud/uapbd/org/queryorgtype.do":"/nccloud/uapbd/org/queryorgunitversionUrl.do",data:{pk_org:r||void 0,type:this.props.config.type||"normal"},success:function(e){t=e.data||void 0,a&&a(t)}})}},{key:"fillCardData",value:function(e,t){var r={};e&&e.forEach(function(e){Object.values(e).forEach(function(e){e&&e.areacode&&(r[e.areacode]=e)})}),this.props.form.setAllFormValue(r),this.setState(this.state,function(){t&&t(r)})}},{key:"setAllFormStatus",value:function(e){var t=0==this.state.status?"edit":"browse",r=Object.values(this.state.card);this.props.form.setFormStatus("org",t),r.map(function(e){e.setFormStatus()})}},{key:"render",value:function(){var e=this;if(!this.lang)return"";var t=this.props,r=t.cardTable,a=t.form,o=(t.button,t.modal),n=t.table,i=t.editTable,s=(t.DragWidthCom,t.syncTree),m=t.treeTableManyCol,u=a.createForm;r.createCardTable,o.createModal,n.createSimpleTable,s.createSyncTree,m.treeTableCol,i.createEditTable;return React.createElement("div",null,React.createElement("div",{id:"nc-bill-card"},React.createElement("div",{className:"nc-bill-card orgunit-card"},React.createElement("div",null,React.createElement(l,null,React.createElement("div",{className:"nc-bill-header-area"},React.createElement("div",{className:"header-title-search-area"},React.createElement("h2",{className:"title-search-detail"},e.lang["10100ORG-000098"])),React.createElement("div",{className:"header-button-area"}))),React.createElement(c,{style:{marginBottom:"5px"},name:f},React.createElement("div",{className:"nc-bill-form-area"},u(f,{expandArr:["orgtype_v"]})))),Object.values(e.state.card).map(function(e){return e.renderCardFramework()}))))}}]),t}();t.default=p=(0,n.createPage)({})(p)},2:function(e,r){e.exports=t},374:function(e,t,r){e.exports=r(156)}})});
//# sourceMappingURL=index.a9c3aa59.js.map