!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("nc-lightapp-front"),require("react"),require("react-dom")):"function"==typeof define&&define.amd?define(["nc-lightapp-front","react","react-dom"],t):"object"==typeof exports?exports["uapbd/pubinfo/workcalendarrule_org/main/index"]=t(require("nc-lightapp-front"),require("react"),require("react-dom")):e["uapbd/pubinfo/workcalendarrule_org/main/index"]=t(e["nc-lightapp-front"],e.React,e.ReactDOM)}(window,function(e,t,o){return function(e){var t={};function o(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,o),a.l=!0,a.exports}return o.m=e,o.c=t,o.d=function(e,t,r){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(o.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)o.d(r,a,function(t){return e[t]}.bind(null,a));return r},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="../../../../",o(o.s=210)}({1:function(t,o){t.exports=e},131:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.conf=void 0;var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var r in o)Object.prototype.hasOwnProperty.call(o,r)&&(e[r]=o[r])}return e};t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return React.createElement(a,r({},n,e))};var a=o(1).high.Refer,n=t.conf={multiLang:{domainName:"uap",currentLocale:"zh-CN",moduleId:"uapRefer"},queryTreeUrl:"/nccloud/riart/ref/groupRefTreeAction.do",refType:"tree",placeholder:"1880000025-000061",refName:"1880000025-000061",rootNode:{refname:"1880000025-000061",refpk:"root"}}},145:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var r in o)Object.prototype.hasOwnProperty.call(o,r)&&(e[r]=o[r])}return e};t.default=function(e){return function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments[2],s=0,c={},i=function(){2==s&&n&&n(c.templateData||{},c.langData||{},c.inlt||{})};o.callback&&console.log("咱们自己createUIDom会同时获取多语和单据模板,并通过一个回调函数返回, langCfg中的回调函数将被忽略");var l=r({},o,{callback:function(e,t,o){s+=1,t||(0,a.toast)({content:"load muti lang error",color:"warning"}),c.langData=e||{},c.inlt=o||{},i()}});e.MultiInit.getMultiLang(l),e.createUIDom(t,function(e){s+=1,c.templateData=e||{},i()})}};var a=o(1)},146:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.conf=void 0;var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var r in o)Object.prototype.hasOwnProperty.call(o,r)&&(e[r]=o[r])}return e};t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return React.createElement(s,r({},c,e))};var a=o(1),n=o(131),s=a.high.Refer,c=t.conf={multiLang:{domainName:"uapbd",currentLocale:"zh-CN",moduleId:"refer_uapbd"},refType:"tree",refName:"refer-000201",refCode:"uapbd.refer.org.BusinessUnitTreeRef",rootNode:{refname:"refer-000201",refpk:"root"},placeholder:"refer-000201",queryTreeUrl:"/nccloud/uapbd/org/BusinessUnitTreeRef.do",treeConfig:{name:["refer-000002","refer-000003"],code:["refcode","refname"]},isMultiSelectedEnabled:!1,unitProps:n.conf,isShowUnit:!1}},160:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,a,n=function(){function e(e,t){for(var o=0;o<t.length;o++){var r=t[o];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,o,r){return o&&e(t.prototype,o),r&&e(t,r),t}}(),s=o(2),c=u(s),i=(u(o(3)),o(1)),l=u(o(145)),d=u(o(146));function u(e){return e&&e.__esModule?e:{default:e}}function p(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}i.cardCache.setDefData,i.cardCache.getDefData,i.base.NCCol,i.base.NCRow,i.base.NCDatePicker,i.base.NCButton,i.base.NCPanel,i.base.NCCheckbox,i.base.NCPopconfirm,i.base.NCRadio;var f="systemTree",h="GLOBLE00000000000000",m="/nccloud/uapbd/wcr/queryWorkCalendarRuleTree.do",g="/nccloud/uapbd/wcr/queryWorkCalendarRuleForm.do",b="/nccloud/uapbd/wcr/saveWorkCalendarRule.do",v="/nccloud/uapbd/wcr/generateWorkCalendar.do",y="/nccloud/uapbd/wcr/deleteWorkCalendarRule.do",C=(r=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var o=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.call(o),o.state={json:{},status:"browse",curOrg:{pk_org:"glb"==e.config.nodeType?h:"",name:""}},o.initTemplate(e),o}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,s.Component),n(t,[{key:"componentDidUpdate",value:function(){"browse"===this.state.status?window.onbeforeunload=null:window.onbeforeunload=function(){return""}}},{key:"componentDidMount",value:function(){}},{key:"loadLeftTreeData",value:function(e){var t=this,o=this;(0,i.ajax)({url:m,method:"post",data:{pk_org:this.state.curOrg.pk_org,nodeType:this.props.config.nodeType},success:function(r){if(r.success){t.root={isleaf:!1,key:"root",title:t.state.json["10140WCR-000000"],id:"root",innercode:"root",pid:"",refname:t.state.json["10140WCR-000000"],refpk:"root"};var a=[Object.assign(t.root,{children:r.data})],n=t.dealTreeData(a);o.props.syncTree.setSyncTreeData(f,n)}r.data||o.props.syncTree.setSyncTreeData(f,o.root),o.props.syncTree.setNodeSelected(f,"root"),o.onRootSelected(),o.props.syncTree.setIconVisible(f,[{key:"root",value:{editIcon:!1,delIcon:!1}}]),o.toggleShow(),e&&e.call(t)}})}},{key:"dealTreeData",value:function(e){return e&&e.forEach(function(e){!function e(t){t.children&&0!=t.children.length?(t.isLeaf=!1,t.children.forEach(function(t){e(t)})):delete t.children}(e)}),e[0].children&&e[0].children.length>0&&e[0].children.forEach(function(e){e.pid="root"}),e}},{key:"toggleShow",value:function(){var e=this.props.syncTree.getSelectNode(f);"browse"==this.state.status?this.props.button.setButtonsVisible({CreateCalendar:!0,Refresh:!0,Save:!1,SaveAdd:!1,Cancel:!1}):this.props.button.setButtonsVisible({CreateCalendar:!1,Refresh:!1,Save:!0,SaveAdd:!0,Cancel:!0}),this.props.button.setButtonDisabled(["SaveAdd"],!1),"root"===e.refpk?this.props.button.setButtonDisabled(["CreateCalendar"],!0):this.props.button.setButtonDisabled(["CreateCalendar"],!1)}},{key:"onEdit",value:function(e){var t=this,o=this;e?(0,i.ajax)({url:g,data:{pk_wcr:e.refpk,pk_org:this.state.curOrg.pk_org,status:1,nodeType:this.props.config.nodeType,pageCode:this.props.config.pageCode},success:function(e){e.success&&(e.data&&e.data.userjson&&e.data.headform&&("Y"===JSON.parse(e.data.userjson).maintainPerm?(o.props.form.setAllFormValue(p({},"headform",e.data.headform)),o.setAllState("edit"),t.props.button.setButtonDisabled(["SaveAdd"],!0)):(0,i.toast)({color:"warning",content:t.state.json["10140WCR-000002"]})))}}):Message.create({content:this.state.json["10140WCR-000001"],color:"warning"})}},{key:"onDelete",value:function(e){var t=this;(0,i.ajax)({url:g,method:"post",data:{pk_wcr:e.refpk,pk_org:this.state.curOrg.pk_org,status:0,nodeType:this.props.config.nodeType},success:function(o){o.success&&(o.data&&o.data.userjson&&("Y"===JSON.parse(o.data.userjson).maintainPerm?function(){var o=t.state.json["10140WCR-000003"];(0,i.promptBox)({color:"warning",title:t.state.json["10140WCR-000004"],content:o,noFooter:!1,noCancelBtn:!1,beSureBtnName:t.state.json["10140WCR-000005"],cancelBtnName:t.state.json["10140WCR-000006"],beSureBtnClick:function(){(0,i.ajax)({url:y,data:{pk_wcr:e.refpk},success:function(o){o.success&&(t.props.form.EmptyAllFormValue("headform"),t.props.asyncTree.delTreeData(f,e.refpk),(0,i.toast)({content:t.state.json["10140WCR-000007"],title:t.state.json["10140WCR-000008"]}))}})}})}():(0,i.toast)({color:"warning",content:this.state.json["10100JTB-000002"]})))}})}},{key:"onAdd",value:function(e){if(e&&this.props.syncTree.setNodeSelected(f,e.refpk),"org"!=this.props.config.nodeType||this.state.curOrg.pk_org){var t=this;(0,i.ajax)({url:g,data:{pk_wcr:e?e.refpk:"",pk_org:this.state.curOrg.pk_org,status:2,pageCode:this.props.config.pageCode},success:function(e){e.success&&e.data&&e.data.headform&&(t.props.form.setAllFormValue(p({},"headform",e.data.headform)),t.setAllState("edit"))}})}else(0,i.toast)({content:this.state.json["10140WCR-000009"],color:"warning"})}},{key:"onCancel",value:function(){var e=this;(0,i.promptBox)({color:"warning",title:this.state.json["10140WCR-000010"],content:this.state.json["10140WCR-000011"],noFooter:!1,noCancelBtn:!1,beSureBtnName:this.state.json["10140WCR-000005"],cancelBtnName:this.state.json["10140WCR-000006"],beSureBtnClick:function(){var t=e.props.syncTree.getSelectNode(f);e.onSelect(t.refpk,{},!0),e.setAllState("browse")}})}},{key:"onSave",value:function(){var e=this,t=this.props.form.getAllFormValue("headform");t.areacode="headform";var o={model:t,pageid:this.props.config.pageCode},r=null;t.rows[0].values.hasOwnProperty("pk_workcalendrule")&&(r=t.rows[0].values.pk_workcalendrule.value);var a=!1;null!=r&&""!=r||(a=!0),this.props.form.isCheckNow("headform")&&this.props.validateToSave(o,function(){(0,i.ajax)({url:b,data:o,success:function(t){t.success&&(e.setAllState("browse"),t.data[0].pid="root",t.data[0].children&&0!=t.data[0].children.length||delete t.data[0].children,a?e.props.syncTree.addNodeSuccess(f,t.data):e.props.syncTree.editNodeSuccess(f,t.data[0]),e.props.syncTree.setNodeSelected(f,t.data[0].refpk),e.onSelect(t.data[0].refpk,{},!0),(0,i.toast)({title:e.state.json["10140WCR-000012"],color:"success"}))}})},p({},headform,"form"),"form")}},{key:"onSaveAdd",value:function(){var e=this,t=this.props.form.getAllFormValue("headform"),o={model:t,pageid:"10140WCRB_main"},r={pageid:this.props.config.pageCode,headform:t};this.props.form.isCheckNow("headform")&&this.props.validateToSave(r,function(){(0,i.ajax)({url:b,data:o,success:function(t){if(t.success){t.data[0].pid="root",t.data[0].children&&0!=t.data[0].children.length||delete t.data[0].children,e.props.syncTree.addNodeSuccess(f,t.data),e.props.syncTree.setNodeSelected(f,t.data[0].refpk),(0,i.toast)({title:e.state.json["10140WCR-000012"],color:"success"}),e.props.form.EmptyAllFormValue("headform");var o=e;(0,i.ajax)({url:g,data:{pk_wcr:"",pk_org:e.state.curOrg.pk_org,status:2},success:function(e){e.success&&e.data&&e.data.headform&&(o.props.form.setAllFormValue(p({},"headform",e.data.headform)),o.setAllState("edit"))}})}}})},p({},headform,"form"),"form")}},{key:"onSelect",value:function(e,t,o){if("root"===e)this.onRootSelected(),this.toggleShow();else{var r=this;(0,i.ajax)({url:g,method:"post",data:{pk_wcr:e,pk_org:this.state.curOrg.pk_org,status:0,nodeType:this.props.config.nodeType,pageCode:this.props.config.pageCode},success:function(e){e.success&&e.data&&e.data.headform&&(r.props.form.setAllFormValue(p({},"headform",e.data.headform)),r.toggleShow())}})}}},{key:"onRefresh",value:function(){var e=this;this.loadLeftTreeData(function(){(0,i.toast)({title:e.state.json["10140WCR-000013"],color:"success"})})}},{key:"onRootSelected",value:function(){this.props.form.EmptyAllFormValue("headform"),this.props.form.setFormItemsValue("headform",{ondutytime:{value:"00:00",display:""},offdutytime:{value:"00:00",display:""}})}},{key:"onGenerate",value:function(){var e=this,t=this.props.form.getAllFormValue("createmodel");t.areacode="createmodel";var o={model:t,pageid:this.props.config.pageCode};this.props.form.isCheckNow("createmodel")&&this.props.validateToSave(o,function(){(0,i.ajax)({url:v,method:"post",data:o,success:function(t){t.success&&t.data&&"Y"===t.data.result&&(0,i.toast)({content:e.state.json["10140WCR-000012"],title:e.state.json["10140WCR-000008"]})}})},p({},"createmodel","form"),"form")}},{key:"initModal",value:function(){var e=this,t=this.props.syncTree.getSelectNode(f);(0,i.ajax)({url:g,method:"post",data:{pk_wcr:t.refpk,pk_org:this.state.curOrg.pk_org,status:3,nodeType:this.props.config.nodeType,checkBDManage:"Y",pageCode:this.props.config.pageCode},success:function(t){if(t.success&&t.data&&t.data.userjson){var o=JSON.parse(t.data.userjson);"N"===o.managePerm?e.props.form.setFormItemsDisabled("createmodel",{pk_org:!0}):e.props.form.setFormItemsDisabled("createmodel",{pk_org:!1}),"Y"===o.maintainPerm?(e.props.form.setAllFormValue(p({},"createmodel",t.data.createmodel)),e.props.form.setFormStatus("createmodel","edit"),e.props.modal.show("wcModal",{})):(0,i.toast)({color:"warning",content:e.state.json["10140WCR-000002"]})}}})}},{key:"buttonClick",value:function(e,t){switch(t){case"Save":this.onSave();break;case"SaveAdd":this.onSaveAdd();break;case"CreateCalendar":this.initModal();break;case"Cancel":this.onCancel();break;case"Refresh":this.onRefresh()}}},{key:"setAllState",value:function(e){var t=this,o="edit"===e;this.props.syncTree.setNodeDisable(f,o),this.props.form.setFormStatus("headform",e),this.setState({status:e},function(){t.toggleShow()})}},{key:"onOrgChange",value:function(e){var t=this;this.setState({curOrg:{pk_org:e.refpk,name:e.refname}},function(){t.loadLeftTreeData()})}},{key:"render",value:function(){var e=this,t=this.props,o=t.button,r=t.syncTree,a=t.modal,n=t.DragWidthCom,s=t.form,l=t.config,u=o.createButtonApp,p=s.createForm,h=r.createSyncTree,m=a.createModal,g=this.props.config.nodeType;return c.default.createElement("div",null,c.default.createElement("div",{className:"header"},m("wcModal",{title:this.state.json["10140WCR-000014"],content:p("createmodel",{}),userControl:!0,beSureBtnClick:this.onGenerate.bind(this),cancelBtnClick:function(){(0,i.promptBox)({color:"warning",title:e.state.json["10140WCR-000017"],noFooter:!1,hasCloseBtn:!1,content:e.state.json["10140WCR-000011"],beSureBtnClick:function(){e.props.modal.close("wcModal")}})}}),c.default.createElement("h2",{className:"title"},"glb"==this.props.config.nodeType?this.state.json["10140WCR-000015"]:this.state.json["10140WCR-000016"]),c.default.createElement("div",{className:"search-box"},"org"==g&&(0,d.default)({isTreelazyLoad:!1,queryCondition:function(){return{AppCode:l.appcode,TreeRefActionExt:"nccloud.web.refer.sqlbuilder.PrimaryOrgSQLBuilder"}},onChange:this.onOrgChange.bind(this),value:{refpk:this.state.curOrg.pk_org,refname:this.state.curOrg.name},disabled:"browse"!=this.state.status})),c.default.createElement("div",{className:"btn-group"},u({area:"header-button-area",onButtonClick:this.buttonClick.bind(this)}))),c.default.createElement("div",{className:"tree-card"},c.default.createElement(n,{leftDom:c.default.createElement("div",{className:"tree-area"},h({treeId:f,showLine:!0,clickEditIconEve:this.onEdit.bind(this),clickDelIconEve:this.onDelete.bind(this),clickAddIconEve:this.onAdd.bind(this),onSelectEve:this.onSelect.bind(this),defaultExpandAll:!0,showModal:!1})),rightDom:c.default.createElement("div",{className:"card-area"},p("headform",{})),defLeftWid:"280px"})))}}]),t}(),a=function(){var e=this;this.initTemplate=function(t,o){var r=e;(0,l.default)(t)({pagecode:t.config.pageCode},{moduleId:"10140WCR",domainName:"uapbd"},function(a,n){if(n&&r.setState({json:n}),a){if(a.template){var s=a.template;t.meta.setMeta(s)}if(a.button){var c=a.button;t.button.setButtons(c)}a.context&&a.context.pk_org&&r.setState({curOrg:{pk_org:a.context.pk_org,name:a.context.org_Name}},function(){e.loadLeftTreeData()}),o&&o()}})}},r);t.default=C},2:function(e,o){e.exports=t},210:function(e,t,o){e.exports=o(211)},211:function(e,t,o){"use strict";var r=s(o(2)),a=s(o(3)),n=s(o(160));function s(e){return e&&e.__esModule?e:{default:e}}var c={title:"工作日历规则-业务单元",pageCode:"10140WCRO_main",appcode:"10140WCRO",nodeType:"org"},i=(0,o(1).createPage)({billinfo:[{billtype:"form",pagecode:c.pageCode,headcode:"headform"},{billtype:"form",pagecode:c.pageCode,headcode:"createmodel"}]})(n.default);a.default.render(r.default.createElement(i,{config:c}),document.querySelector("#app"))},3:function(e,t){e.exports=o}})});
//# sourceMappingURL=index.4ddf9561.js.map