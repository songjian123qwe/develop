!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("nc-lightapp-front"),require("react"),require("react-dom")):"function"==typeof define&&define.amd?define(["nc-lightapp-front","react","react-dom"],t):"object"==typeof exports?exports["uapbd/customer/custsaleclass_org/main/index"]=t(require("nc-lightapp-front"),require("react"),require("react-dom")):e["uapbd/customer/custsaleclass_org/main/index"]=t(e["nc-lightapp-front"],e.React,e.ReactDOM)}(window,function(e,t,o){return function(e){var t={};function o(r){if(t[r])return t[r].exports;var s=t[r]={i:r,l:!1,exports:{}};return e[r].call(s.exports,s,s.exports,o),s.l=!0,s.exports}return o.m=e,o.c=t,o.d=function(e,t,r){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(o.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)o.d(r,s,function(t){return e[t]}.bind(null,s));return r},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="../../../../",o(o.s=311)}({1:function(t,o){t.exports=e},130:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.conf=void 0;var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var r in o)Object.prototype.hasOwnProperty.call(o,r)&&(e[r]=o[r])}return e};t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return React.createElement(s,r({},n,e))};var s=o(1).high.Refer,n=t.conf={multiLang:{domainName:"uap",currentLocale:"zh-CN",moduleId:"uapRefer"},queryTreeUrl:"/nccloud/riart/ref/groupRefTreeAction.do",refType:"tree",placeholder:"1880000025-000061",refName:"1880000025-000061",rootNode:{refname:"1880000025-000061",refpk:"root"}}},131:function(e,t){e.exports=o},145:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var r in o)Object.prototype.hasOwnProperty.call(o,r)&&(e[r]=o[r])}return e};t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t={multiLang:{domainName:"uapbd",currentLocale:"zh-CN",moduleId:"refer_uapbd"},refType:"tree",refName:"refer-000285",refCode:"uapbd.refer.org.SaleOrgTreeRef",rootNode:{refname:"refer-000285",refpk:"root"},placeholder:"refer-000285",queryTreeUrl:"/nccloud/uapbd/ref/SaleOrgTreeRef.do",treeConfig:{name:["refer-000002","refer-000003"],code:["refcode","refname"]},isMultiSelectedEnabled:!1,unitProps:n.conf,isShowUnit:!1};return React.createElement(a,r({},t,e))};var s=o(1),n=o(130),a=s.high.Refer},149:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.conf=void 0;var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var r in o)Object.prototype.hasOwnProperty.call(o,r)&&(e[r]=o[r])}return e};t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return React.createElement(a,r({},i,e))};var s=o(1),n=o(130),a=s.high.Refer,i=t.conf={multiLang:{domainName:"uapbd",currentLocale:"zh-CN",moduleId:"refer_uapbd"},refType:"tree",refName:"refer-000201",refCode:"uapbd.refer.org.BusinessUnitTreeRef",rootNode:{refname:"refer-000201",refpk:"root"},placeholder:"refer-000201",queryTreeUrl:"/nccloud/uapbd/org/BusinessUnitTreeRef.do",treeConfig:{name:["refer-000002","refer-000003"],code:["refcode","refname"]},isMultiSelectedEnabled:!1,unitProps:n.conf,isShowUnit:!1}},196:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var r in o)Object.prototype.hasOwnProperty.call(o,r)&&(e[r]=o[r])}return e};t.default=function(e){return function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments[2],a=0,i={},c=function(){2==a&&n&&n(i.templateData||{},i.langData||{},i.inlt||{})};o.callback&&console.log("咱们自己createUIDom会同时获取多语和单据模板,并通过一个回调函数返回, langCfg中的回调函数将被忽略");var l=r({},o,{callback:function(e,t,o){a+=1,t||(0,s.toast)({content:"load muti lang error",color:"warning"}),i.langData=e||{},i.inlt=o||{},c()}});e.MultiInit.getMultiLang(l),e.createUIDom(t,function(e){a+=1,i.templateData=e||{},c()})}};var s=o(1)},2:function(e,o){e.exports=t},238:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,s,n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var r in o)Object.prototype.hasOwnProperty.call(o,r)&&(e[r]=o[r])}return e},a=function(){function e(e,t){for(var o=0;o<t.length;o++){var r=t[o];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,o,r){return o&&e(t.prototype,o),r&&e(t,r),t}}(),i=o(2),c=f(i),l=o(1),u=(f(o(145)),f(o(149))),d=f(o(196));function f(e){return e&&e.__esModule?e:{default:e}}function p(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}var h=l.cardCache.setDefData,m=l.cardCache.getDefData,g=l.base.NCMenu,b=(l.base.NCDropdown,l.base.NCCheckbox),v=(l.base.NCPopconfirm,l.base.NCMessage,l.base.NCCol,l.base.NCRow,l.base.NCButton,l.base.NCTooltip,g.NCMenuGroup,g.Item,l.high.PrintOutput),y="head",C={loadTreeDataUrl:"/nccloud/uapbd/custsaleclass/loadtreedata.do",queryTemplet:"/nccloud/platform/templet/querypage.do",addCardUrl:"/nccloud/uapbd/custsaleclass/addcard.do",queryCardUrl:"/nccloud/uapbd/custsaleclass/querycard.do",enablestateUrl:"/nccloud/uapbd/custsaleclass/enablestate.do",deleteUrl:"/nccloud/uapbd/custsaleclass/deltreenode.do",printUrl:"/nccloud/uapbd/custsaleclass/print.do",rollbackCodeUrl:"/nccloud/uapbd/custsaleclass/rollbackCode.do",saveUrl:"/nccloud/uapbd/custsaleclass/savenode.do"},S="10140CSCLG_custsaleclass",k=(r=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var o=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return s.call(o),o.config=Object.assign({treeId:"custsaleclassTree",formId:y,pageCode:S,nodeType:"GROUP_NODE",urls:C},e.config),o.state={disabledSearch:!1,showoffDisable:!0,codeedit:!0,pks:[],json:{},checked:!1,curOrg:"",curSelectedNode:null},o.root={isleaf:!1,key:"~",title:"",id:"~",innercode:"~",pid:"",refname:"",refpk:"~"},o.initButtonStatus=o.initButtonStatus.bind(o),o.changeButtonStatus=o.changeButtonStatus.bind(o),o.onStartEps=o.onStartEps.bind(o),o.onStopEps=o.onStopEps.bind(o),o.dealTreeData=o.dealTreeData.bind(o),o.initTemplate(e),o}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,i.Component),a(t,[{key:"dealTreeData",value:function(e){var t=[];return e.forEach(function(e){e.iconBox={delIcon:!0,editIcon:!0,addIcon:!0},function e(o){"~"!=o.refpk&&void 0!=o.refpk&&t.push(o.refpk),o.iconBox={delIcon:!0,editIcon:!0,addIcon:!0},o.children&&0!=o.children.length?(o.isLeaf=!1,o.children.forEach(function(t){e(t)})):delete o.children}(e)}),l.cacheTools.set("allpks",t),e}},{key:"componentDidUpdate",value:function(){var e=this.props.form.getFormStatus(this.config.formId);window.onbeforeunload="browse"==e||void 0==e?null:function(){return""}}},{key:"componentDidMount",value:function(){this.initButtonStatus()}},{key:"onRefresh",value:function(){var e=this,t=this,o={checked:t.state.checked,pkorg:t.state.curOrg.refpk};t.props.form.setFormItemsDisabled(t.config.formId,{enablestate:!0}),(0,l.ajax)({url:t.config.urls.loadTreeDataUrl,data:o,success:function(o){if(t.root.title=e.state.json["10140CSCLG-000000"],t.root.refname=e.state.json["10140CSCLG-000000"],o.success){if(o.data){var r=[Object.assign(n({},t.root),{children:o.data})];t.props.syncTree.setSyncTreeData(t.config.treeId,t.dealTreeData(r)),void 0!=t.state.curOrg.refpk&&t.props.syncTree.openNodeByPk(t.config.treeId,t.root.refpk),"ORG_NODE"===t.config.nodeType&&void 0==t.state.curOrg.refpk&&(t.props.syncTree.setNodeDisable(t.config.treeId,!0),t.props.button.setButtonDisabled(["print","export"],!0)),"GROUP_NODE"===t.config.nodeType&&t.props.syncTree.openNodeByPk(t.config.treeId,t.root.refpk),"ORG_NODE"===t.config.nodeType&&void 0!=t.state.curOrg.refpk&&(t.props.button.setButtonDisabled(["print","export","refresh"],!1),t.props.syncTree.setNodeDisable(t.config.treeId,!1))}else{var s=[n({},t.root)];t.props.syncTree.setSyncTreeData(t.config.treeId,s)}"refresh"==m("custsaleclass_btnopr",t.props.config.datasource)&&((0,l.toast)({title:e.state.json["10140CSCLG-000001"],color:"success"}),h("custsaleclass_btnopr",t.props.config.datasource,"browse"))}t.setState({showoffDisable:!1}),t.props.form.setFormItemsDisabled(e.config.formId,{enablestate:!0}),t.props.form.setFormStatus(e.config.formId,"browse")}})}},{key:"initButtonStatus",value:function(){this.props.button.setButtonVisible("save",!1),this.props.button.setButtonVisible("saveadd",!1),this.props.button.setButtonVisible("cancel",!1),this.props.button.setButtonVisible("print",!0),this.props.button.setButtonVisible("refresh",!0)}},{key:"onSelectTree",value:function(e){var t=this;if("~"==e?this.props.button.setButtonDisabled(["print","export"],!0):this.props.button.setButtonDisabled(["print","export"],!1),"edit"!=this.props.form.getFormStatus(this.config.formId))return e==this.root.refpk?(this.props.form.setFormItemsDisabled(this.config.formId,{enablestate:!0}),void this.props.form.EmptyAllFormValue(this.config.formId)):void(0,l.ajax)({url:this.config.urls.queryCardUrl,data:{pk_custsaleclass:e,isGlbGrp:this.config.isGlbGrp},success:function(e){if(e.success){e.formulamsg&&e.formulamsg instanceof Array&&e.formulamsg.length>0&&props.dealFormulamsg(e.formulamsg,p({},t.config.formId,"form"));var o=e.data.form.head.rows[0].values;if(o.enablestate){var r=o.enablestate.value;e.data.form.head.rows[0].values.enablestate.value="2"==r}o.pk_father.display==t.root.refpk&&(e.data.form.head.rows[0].values.pk_father.display="",e.data.form.head.rows[0].values.pk_father.value=""),t.props.form.setAllFormValue({head:e.data.form.head}),t.props.form.setFormItemsDisabled(t.config.formId,{enablestate:!1}),t.props.button.setButtonDisabled(["print","export"],!1)}}})}},{key:"onBeforeFormEvent",value:function(e,t,o,r,s){switch(o){case"enablestate":var n=this.props.syncTree.getSelectNode(this.config.treeId);return"ORG_NODE"===this.config.nodeType&&n&&n.nodeData.isGroup?((0,l.toast)({content:this.state.json["10140CSCLG-000002"],color:"warning"}),!1):!("GROUP_NODE"===this.config.nodeType&&n&&!n.nodeData.isGroup)||((0,l.toast)({content:this.state.json["10140CSCLG-000003"],color:"warning"}),!1);default:return!0}}},{key:"onAfterFormEvent",value:function(e,t,o,r,s){var n=this;switch(o){case"enablestate":var a=this.props.syncTree.getSelectNode(this.config.treeId);if(!a){var i=r.value?this.state.json["10140CSCLG-000004"]:this.state.json["10140CSCLG-000005"];return void(0,l.toast)({content:i,color:"warning"})}var c={pk_custsaleclass:a.refpk,enablestate:r.value?"2":"1"};(0,l.promptBox)({color:"info",title:r.value?this.state.json["10140CSCLG-000006"]:this.state.json["10140CSCLG-000036"],noFooter:!1,hasCloseBtn:!1,content:r.value?this.state.json["10140CSCLG-000007"]:this.state.json["10140CSCLG-000008"],beSureBtnClick:function(){(0,l.ajax)({url:n.config.urls.enablestateUrl,data:c,success:function(e){(0,l.toast)({color:"success",title:r.value?n.state.json["10140CSCLG-000009"]:n.state.json["10140CSCLG-000010"]})},error:function(t){r.value?e.form.setFormItemsValue(n.config.formId,{enablestate:{value:!1,display:null}}):e.form.setFormItemsValue(n.config.formId,{enablestate:{value:!0,display:null}}),(0,l.toast)({content:t.message,color:"warning"})}})}})}}},{key:"onAddEps",value:function(e){var t=this,o=this;if("ORG_NODE"!==this.config.nodeType||this.state.curOrg.refpk){var r={pk_org:this.state.curOrg.refpk,nodeType:this.config.nodeType,pk_father:e?e.refpk:this.root.refpk};(0,l.ajax)({url:this.config.urls.addCardUrl,data:r,success:function(r){r.success&&(t.props.form.EmptyAllFormValue(t.config.formId),r.formulamsg&&r.formulamsg instanceof Array&&r.formulamsg.length>0&&props.dealFormulamsg(r.formulamsg,p({},t.config.formId,"form")),t.props.form.setFormStatus(t.config.formId,"edit"),t.props.form.setAllFormValue({head:r.data.form.head}),t.props.form.setFormItemsDisabled(t.config.formId,{enablestate:!0}),"ORG_NODE"===t.config.nodeType&&o.props.form.setFormItemsValue(o.config.formId,{pk_org:{value:o.state.curOrg.refpk,display:o.state.curOrg.refname}}),t.props.form.setFormItemsDisabled(t.config.formId,{pk_org:!0}),r.data.isCodeEdit||t.props.form.setFormItemsDisabled(t.config.formId,{code:!0}),t.props.syncTree.setNodeDisable(t.config.treeId,!0),t.setState({curSelectedNode:e,disabledSearch:!0,showoffDisable:!0}),t.changeButtonStatus(e,"add"))}})}else(0,l.toast)({content:this.state.json["10140CSCLG-000011"],color:"warning"})}},{key:"onEditEps",value:function(e){var t=this;e?"ORG_NODE"===this.config.nodeType&&e.nodeData.isGroup?(0,l.toast)({content:this.state.json["10140CSCLG-000002"],color:"warning"}):"GROUP_NODE"!==this.config.nodeType||e.nodeData.isGroup?(0,l.ajax)({url:this.config.urls.queryCardUrl,data:{pk_custsaleclass:e.refpk,isGlbGrp:this.config.isGlbGrp},success:function(o){o.success&&(o.formulamsg&&o.formulamsg instanceof Array&&o.formulamsg.length>0&&props.dealFormulamsg(o.formulamsg,p({},t.config.formId,"form")),t.props.syncTree.setNodeDisable(t.config.treeId,!0),t.props.form.setAllFormValue({head:o.data.form.head}),t.props.form.setFormItemsDisabled(t.config.formId,{enablestate:!0}),t.props.form.setFormItemsDisabled(t.config.formId,{code:!o.data.isCodeEdit}),t.props.form.setFormItemsDisabled(t.config.formId,{pk_org:!0}),t.props.form.setFormStatus(t.config.formId,"edit"),t.changeButtonStatus(e,"edit"),t.setState({curSelectedNode:e,disabledSearch:!0,showoffDisable:!0}))}}):(0,l.toast)({content:this.state.json["10140CSCLG-000003"],color:"warning"}):(0,l.toast)({content:this.state.json["10140CSCLG-000012"],color:"warning"})}},{key:"onSaveEps",value:function(e){var t=this;if(this.props.form.isCheckNow(this.config.formId)){var o=this.props.syncTree.getSelectNode(this.config.treeId);o||(o=this.state.curSelectedNode);var r,s=this.props.form.getAllFormValue(this.config.formId);s.areacode=this.config.formId,s.rows.status="2",r={model:s,pageid:this.config.pageCode};var n=null;s.rows[0].values.pk_custsaleclass&&(n=s.rows[0].values.pk_custsaleclass.value);var a=!1;null!=n&&""!=n||(a=!0),this.props.validateToSave(r,function(){(0,l.ajax)({url:t.config.urls.saveUrl,data:r,success:function(r){r.success&&(t.props.form.setFormStatus(t.config.formId,"browse"),r.data[0].children&&0!=r.data[0].children.length||delete r.data[0].children,a?t.props.syncTree.addNodeSuccess(t.config.treeId,r.data):t.props.syncTree.editNodeSuccess(t.config.treeId,r.data[0]),t.props.syncTree.setNodeDisable(t.config.treeId,!1),t.props.syncTree.openNodeByPk(t.config.treeId,r.data[0].pid),t.props.syncTree.setNodeSelected(t.config.treeId,r.data[0].refpk),t.props.form.setFormItemsDisabled(t.config.formId,{enablestate:!1}),t.setState({curSelectedNode:null,disabledSearch:!1,showoffDisable:!1}),(0,l.toast)({title:t.state.json["10140CSCLG-000013"],color:"success"}),t.changeButtonStatus(o,"save"),e&&e())}})},p({},this.config.formId,"form"),"form")}}},{key:"onSaveAddEps",value:function(){var e=this;if(this.props.form.isCheckNow(this.config.formId)){var t=this.props.syncTree.getSelectNode(this.config.treeId),o={},r=this.props.form.getAllFormValue(this.config.formId);r.areacode=this.config.formId,r.rows.status="2",o={model:r,pageid:"10140EPSG"};var s=null;r.rows[0].values.pk_custsaleclass&&(s=r.rows[0].values.pk_custsaleclass.value);null!=s&&""!=s||!0,this.props.validateToSave(o,function(){(0,l.ajax)({url:e.config.urls.saveUrl,data:o,success:function(r){r.success&&(e.props.form.setFormStatus(e.config.formId,"browse"),r.data[0].children&&0!=r.data[0].children.length||delete r.data[0].children,e.props.syncTree.addNodeSuccess(e.config.treeId,r.data),e.props.syncTree.openNodeByPk(e.config.treeId,r.data[0].pid),t||(e.props.syncTree.setNodeSelected(e.config.treeId,r.data[0].pid),t=e.props.syncTree.getSelectNode(e.config.treeId)),e.props.syncTree.setNodeDisable(e.config.treeId,!0),o=t?{pk_father:t.refpk}:{pk_father:e.root.refpk},(0,l.ajax)({url:e.config.urls.addCardUrl,data:o,success:function(o){o.success&&(e.props.form.EmptyAllFormValue(e.config.formId),e.props.form.setAllFormValue({head:o.data.form.head}),"ORG_NODE"===e.config.nodeType&&e.props.form.setFormItemsValue(e.config.formId,{pk_org:{value:e.state.curOrg.refpk,display:e.state.curOrg.refname}}),e.props.form.setFormStatus(e.config.formId,"edit"),e.changeButtonStatus(t,"saveAdd"))}})),e.setState({disabledSearch:!0,showoffDisable:!0})}})},p({},this.config.formId,"form"),"form")}}},{key:"onDeleteEps",value:function(e){var t=this,o={};if(e)if("ORG_NODE"===this.config.nodeType&&e.nodeData.isGroup)(0,l.toast)({content:this.state.json["10140CSCLG-000002"],color:"warning"});else if("GROUP_NODE"!==this.config.nodeType||e.nodeData.isGroup)if(e.refpk!=this.root.refpk){var r=this.state.json["10140CSCLG-000016"];if(e.children&&e.children.length>0)(0,l.toast)({content:this.state.json["10140CSCLG-000017"],color:"warning"});else{var s=this.props.form.getFormItemsValue(this.config.formId,"code").value;(0,l.promptBox)({color:"warning",title:this.state.json["10140CSCLG-000018"],noFooter:!1,content:r,beSureBtnClick:function(){(0,l.promptBox)({color:"info",title:t.state.json["10140CSCLG-000019"],noFooter:!1,hasCloseBtn:!1,content:t.state.json["10140CSCLG-000020"],beSureBtnClick:function(){o={pk_custsaleclass:e.refpk};e.pid;(0,l.ajax)({url:t.config.urls.deleteUrl,data:o,success:function(o){o.success&&(t.props.form.EmptyAllFormValue(t.config.formId),t.props.syncTree.delNodeSuceess(t.config.treeId,e.refpk),(0,l.toast)({color:"success",title:t.state.json["10140CSCLG-000021"]}),t.changeButtonStatus(e,"del"))}})}})}}),(0,l.ajax)({url:this.config.urls.rollbackCodeUrl,data:{code:s,pk_prg:this.state.curOrg,nodetype:this.config.nodeType},success:function(e){e.success}})}}else(0,l.toast)({content:this.state.json["10140CSCLG-000015"],color:"warning"});else(0,l.toast)({content:this.state.json["10140CSCLG-000003"],color:"warning"});else(0,l.toast)({content:this.state.json["10140CSCLG-000014"],color:"warning"})}},{key:"onCancelEps",value:function(){var e=this,t=this.props.syncTree.getSelectNode(this.config.treeId);this.props.form.EmptyAllFormValue(this.config.formId),this.props.form.setFormItemsDisabled(this.config.formId,{enablestate:!0}),t&&"~"!=t.refpk?(0,l.ajax)({url:this.config.urls.queryCardUrl,data:{pk_custsaleclass:t.refpk,isGlbGrp:this.config.isGlbGrp},success:function(t){t.success&&(e.props.form.setAllFormValue({head:t.data.form.head}),e.props.form.setFormItemsDisabled(e.config.formId,{enablestate:!1}))}}):this.props.form.EmptyAllFormValue(this.config.formId),this.props.form.setFormStatus(this.config.formId,"browse"),this.props.syncTree.setNodeDisable(this.config.treeId,!1),this.changeButtonStatus(t,"cancel"),this.setState({disabledSearch:!1,showoffDisable:!1})}},{key:"onStartEps",value:function(){var e,t=this,o=this.props.form.getAllFormValue(this.config.formId),r=this.props.asyncTree.getSelectNodeAsync(this.config.treeId);if("ORG_NODE"===this.config.nodeType&&r.nodeData.isGroup)(0,l.toast)({content:this.state.json["10140CSCLG-000002"],color:"warning"});else if("GROUP_NODE"!==this.config.nodeType||r.nodeData.isGroup){if(r){if("2"==o.rows[0].values.enablestate.value)return void(0,l.toast)({content:this.state.json["10140CSCLG-000023"],color:"warning"})}else(0,l.toast)({content:this.state.json["10140CSCLG-000022"],color:"warning"});e={pk_custsaleclass:o.rows[0].values.pk_custsaleclass.value,enablestate:"2"},(0,l.ajax)({url:this.config.urls.enablestateUrl,data:e,success:function(e){t.props.form.setAllFormValue({head:e.data.head}),t.refreshTreeNode(t.config.treeId,r.pid),t.changeButtonStatus("start")}})}else(0,l.toast)({content:this.state.json["10140CSCLG-000003"],color:"warning"})}},{key:"onStopEps",value:function(){var e,t=this,o=this.props.form.getAllFormValue(this.config.formId),r=this.props.asyncTree.getSelectNodeAsync(this.config.treeId);if("ORG_NODE"===this.config.nodeType&&r.nodeData.isGroup)(0,l.toast)({content:this.state.json["10140CSCLG-000002"],color:"warning"});else if("GROUP_NODE"!==this.config.nodeType||r.nodeData.isGroup){if(r){if("1"==o.rows[0].values.enablestate.value)return void(0,l.toast)({content:this.state.json["10140CSCLG-000024"],color:"warning"})}else(0,l.toast)({content:this.state.json["10140CSCLG-000005"],color:"warning"});e={pk_custsaleclass:o.rows[0].values.pk_custsaleclass.value,enablestate:"1"},(0,l.ajax)({url:this.config.urls.enablestateUrl,data:e,success:function(e){e.success&&(t.props.form.EmptyAllFormValue(t.config.formId),t.refreshTreeNode(t.config.treeId,r.pid),t.changeButtonStatus("stop"))}})}else(0,l.toast)({content:this.state.json["10140CSCLG-000003"],color:"warning"})}},{key:"onClickSearchBtn",value:function(e,t){var o={};null!=t&&t.map(function(e){o[e.field]=e.value.firstvalue}),e.linkTo("/uapbd/eps/main/list/index.html",o)}},{key:"onMoreSelect",value:function(e){var t=e.key;"start"==t?this.onStartEps():"stop"==t&&this.onStopEps()}},{key:"onVisibleChange",value:function(e){}},{key:"onMore",value:function(){}},{key:"changeButtonStatus",value:function(e,t){switch(t){case"add":case"saveadd":this.props.button.setButtonVisible("save",!0),this.props.button.setButtonVisible("saveadd",!0),this.props.button.setButtonVisible("cancel",!0),this.props.button.setButtonVisible(["refresh","print","export"],!1);break;case"edit":this.props.button.setButtonVisible("save",!0),this.props.button.setButtonVisible("saveadd",!1),this.props.button.setButtonVisible("cancel",!0),this.props.button.setButtonVisible(["print","export"],!1),this.props.button.setButtonVisible("refresh",!1);break;case"delete":case"save":case"cancel":this.props.button.setButtonVisible("save",!1),this.props.button.setButtonVisible("saveadd",!1),this.props.button.setButtonVisible("cancel",!1),this.props.button.setButtonVisible(["print","refresh","export"],!0),this.props.button.setButtonDisabled(["print","refresh","export"],!1)}}},{key:"onMouseEnterEve",value:function(e){var t=this.props.syncTree.getSyncTreeValue(this.config.treeId,e),o={};(e===this.root.refpk||"ORG_NODE"===this.config.nodeType&&t.nodeData.isGroup)&&(o={delIcon:!1,editIcon:!1,addIcon:!0},this.props.syncTree.hideIcon(this.config.treeId,e,o)),"GROUP_NODE"!==this.config.nodeType||t.nodeData.isGroup||(o={delIcon:!1,editIcon:!1,addIcon:!0},this.props.syncTree.hideIcon(this.config.treeId,e,o)),e===this.root.refpk&&(o={delIcon:!1,editIcon:!1,addIcon:!0},this.props.syncTree.hideIcon(this.config.treeId,e,o))}},{key:"onChange",value:function(e){var t=this,o=this.props.syncTree.getSelectNode(this.config.treeId),r={};o||(0,l.toast)({content:this.state.json["10140CSCLG-000025"],color:"warning"}),r.pk_custsaleclass=o.refpk,r.enablestate=e?"2":"1",(0,l.ajax)({url:this.config.urls.enablestateUrl,data:r,success:function(r){r.success&&(e?t.props.form.setAllFormValue({head:r.data.head}):(t.props.form.EmptyAllFormValue(t.config.formId),t.props.syncTree.delNodeSuceess(t.config.treeId,o.refpk))),t.refreshTreeNode(t.config.treeId,o.pid)}})}},{key:"onCheckShowDisable",value:function(e){var t=this;this.setState({checked:!this.state.checked},function(){t.onRefresh()})}},{key:"onOrgChange",value:function(e){var t=this;this.setState({curOrg:e},function(){t.onRefresh()})}},{key:"buttonClick",value:function(e,t){var o=this;switch(t){case"save":this.onSaveEps();break;case"saveadd":this.onSaveAddEps();break;case"cancel":(0,l.promptBox)({color:"warning",title:this.state.json["10140CSCLG-000037"],noFooter:!1,hasCloseBtn:!1,content:this.state.json["10140CSCLG-000026"],beSureBtnClick:function(){var e=o.props.form.getFormItemsValue(o.config.formId,"pk_custsaleclass").value,t=o.props.form.getFormItemsValue(o.config.formId,"code").value;!e&&t?((0,l.ajax)({url:o.config.urls.rollbackCodeUrl,data:{code:t,pk_prg:o.state.curOrg,nodetype:o.config.nodeType},success:function(e){e.success}}),o.onCancelEps()):o.onCancelEps()}});break;case"refresh":var r=this.props.syncTree.getSelectNode(this.config.treeId);h("custsaleclass_btnopr",e.config.datasource,"refresh"),this.onRefresh(),r&&this.onSelectTree(r.refpk);break;case"print":if(!this.props.syncTree.getSelectNode(this.config.treeId))return void(0,l.toast)({content:this.state.json["10140CSCLG-000027"],color:"warning"});var s=l.cacheTools.get("allpks");if(s.length<=0)return void(0,l.toast)({content:this.state.json["10140CSCLG-000028"],color:"warning"});(0,l.print)("pdf",C.printUrl,{funcode:e.config.appcode,nodekey:"custsaleclass",oids:s},!1);break;case"export":if(!this.props.syncTree.getSelectNode(this.config.treeId))return void(0,l.toast)({content:this.state.json["10140CSCLG-000027"],color:"warning"});var n=l.cacheTools.get("allpks");if(n.length<=0)return void(0,l.toast)({content:this.state.json["10140CSCLG-000029"],color:"warning"});this.setState({pks:n},this.refs.printOutput.open())}}},{key:"render",value:function(){var e=this,t=this.props,o=t.asyncTree,r=t.button,s=t.syncTree,n=t.modal,a=t.DragWidthCom,i=t.treeTable,l=t.form,d=(i.createTreeTable,r.createButtonApp),f=l.createForm,p=s.createSyncTree,h=n.createModal;o.createAsyncTree;return c.default.createElement("div",null,h("modal",{noFooter:!1}),c.default.createElement("div",{className:"header"},c.default.createElement("div",{className:"title",style:{marginRight:"30px"}},this.props.config.title),"ORG_NODE"===this.config.nodeType?c.default.createElement("div",{className:"orgref"},(0,u.default)({onChange:this.onOrgChange.bind(this),value:this.state.curOrg,disabled:this.state.disabledSearch,queryCondition:function(){return{TreeRefActionExt:"nccloud.web.refer.sqlbuilder.PrimaryOrgSQLBuilder",AppCode:e.props.config.appcode}},refName:this.state.json["10140CSCLG-000030"],placeholder:this.state.json["10140CSCLG-000030"]})):"",c.default.createElement("span",{className:"showOff"},c.default.createElement(b,{checked:this.state.checked,onChange:this.onCheckShowDisable.bind(this),disabled:this.state.showoffDisable},this.state.json["10140CSCLG-000033"])),c.default.createElement("div",{className:"btn-group"},d({area:"header-button-area",onButtonClick:this.buttonClick.bind(this)}))),c.default.createElement("div",{className:"tree-card"},c.default.createElement(a,{leftDom:c.default.createElement("div",{className:"tree-area"},p({treeId:this.config.treeId,disabledSearch:this.state.disabledSearch,needEdit:!0,showLine:!1,needSearch:!0,onSelectEve:this.onSelectTree.bind(this),onMouseEnterEve:this.onMouseEnterEve.bind(this),clickEditIconEve:this.onEditEps.bind(this),clickAddIconEve:this.onAddEps.bind(this),clickDelIconEve:this.onDeleteEps.bind(this),showModal:!1})),rightDom:c.default.createElement("div",{className:"card-area"},f(this.config.formId,{cancelPSwitch:!0,onAfterEvent:this.onAfterFormEvent.bind(this),onBeforeEvent:this.onBeforeFormEvent.bind(this)})),defLeftWid:"280px"}),c.default.createElement(v,{ref:"printOutput",url:C.printUrl,data:{funcode:"10140CSCLG",nodekey:"custsaleclass",oids:this.state.pks,outputType:"output"}})))}}]),t}(),s=function(){var e=this;this.initTemplate=function(t,o){var r=e;(0,d.default)(t)({pagecode:t.config.pageCode},{moduleId:"10140CSCLG",domainName:"uapbd"},function(s,n){if(n&&(e.state.json=n,"GROUP_NODE"==t.config.nodeType?t.config.title=e.state.json["10140CSCLG-000034"]:t.config.title=e.state.json["10140CSCLG-000035"]),s){if(s.template){var a=s.template;t.meta.setMeta(a)}if(s.button){var i=s.button;t.button.setButtons(i)}r.onRefresh(),o&&o()}})}},r);t.default=k=(0,l.createPage)({billinfo:[{billtype:"form",pagecode:S,headcode:y}],mutiLangCode:"10140CSCLG"})(k)},311:function(e,t,o){e.exports=o(312)},312:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=function(){function e(e,t){for(var o=0;o<t.length;o++){var r=t[o];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,o,r){return o&&e(t.prototype,o),r&&e(t,r),t}}(),s=o(2),n=c(s),a=c(o(131)),i=c(o(238));function c(e){return e&&e.__esModule?e:{default:e}}var l=function(e){function t(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,s.Component),r(t,[{key:"render",value:function(){return n.default.createElement(i.default,{config:{title:"客户销售分类-销售组织",pageCode:"10140CSCLG_custsaleclass",appcode:"10140CSCLO",appid:"0001Z010000000001586",nodeType:"ORG_NODE",formId:"head",treeId:"custsaleclassTree",isGlbGrp:"1"}})}}]),t}();t.default=l,a.default.render(n.default.createElement(l,null),document.querySelector("#app"))}})});
//# sourceMappingURL=index.557bd6d0.js.map