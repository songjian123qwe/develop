!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("nc-lightapp-front"),require("react"),require("react-dom")):"function"==typeof define&&define.amd?define(["nc-lightapp-front","react","react-dom"],t):"object"==typeof exports?exports["uapbd/org/postseries_glb/main/index"]=t(require("nc-lightapp-front"),require("react"),require("react-dom")):e["uapbd/org/postseries_glb/main/index"]=t(e["nc-lightapp-front"],e.React,e.ReactDOM)}(window,function(e,t,o){return function(e){var t={};function o(r){if(t[r])return t[r].exports;var s=t[r]={i:r,l:!1,exports:{}};return e[r].call(s.exports,s,s.exports,o),s.l=!0,s.exports}return o.m=e,o.c=t,o.d=function(e,t,r){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(o.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)o.d(r,s,function(t){return e[t]}.bind(null,s));return r},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="../../../../",o(o.s=386)}({1:function(t,o){t.exports=e},132:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var r in o)Object.prototype.hasOwnProperty.call(o,r)&&(e[r]=o[r])}return e};t.default=function(e){return function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments[2],a=0,i={},c=function(){2==a&&n&&n(i.templateData||{},i.langData||{},i.inlt||{})};o.callback&&console.log("咱们自己createUIDom会同时获取多语和单据模板,并通过一个回调函数返回, langCfg中的回调函数将被忽略");var l=r({},o,{callback:function(e,t,o){a+=1,t||(0,s.toast)({content:"load muti lang error",color:"warning"}),i.langData=e||{},i.inlt=o||{},c()}});e.MultiInit.getMultiLang(l),e.createUIDom(t,function(e){a+=1,i.templateData=e||{},c()})}};var s=o(1)},2:function(e,o){e.exports=t},221:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,s,n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var r in o)Object.prototype.hasOwnProperty.call(o,r)&&(e[r]=o[r])}return e},a=function(){function e(e,t){for(var o=0;o<t.length;o++){var r=t[o];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,o,r){return o&&e(t.prototype,o),r&&e(t,r),t}}(),i=o(2),c=d(i),l=o(1);o(222);var u=d(o(132));function d(e){return e&&e.__esModule?e:{default:e}}function f(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}l.base.NCMessage,l.base.NCDropdown;var p=l.base.NCMenu,h=l.base.NCCheckbox,m=(l.base.NCPopconfirm,p.NCMenuGroup,l.high.PrintOutput),g={},v={loadTreeDataUrl:"/nccloud/org/postseries/PostSeriesAppDataInitAction.do",queryCardUrl:"/nccloud/org/postseries/PostSeriesQueryAction.do",enablestateUrl:"/nccloud/org/postseries/PostSeriesIsEnableAction.do",addCardUrl:"/nccloud/org/postseries/PostSeriesAddAction.do",deleteUrl:"/nccloud/org/postseries/PostSeriesDelAction.do",saveUrl:"/nccloud/org/postseries/PostSeriesSaveAction.do",print:"/nccloud/org/postseries/PostSeriesPrintAction.do",isPermission:"/nccloud/org/postseries/IsPostSeriesPermisAction.do"},b="10100PSG_postseries",S="10100PSG",y=(new Date).valueOf().toString(),k=(r=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var o=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return s.call(o),o.config=Object.assign({treeId:"epsTree",formId:"head",pageCode:"10100PSG_postseries",appcode:"10100PSG",nodeType:"GROUP_NODE",isGlbGrp:"1",urls:v},e.config),o.root={isleaf:!1,key:"~",title:"岗位序列",id:"~",innercode:"~",pid:"",refname:"岗位序列",refpk:"~"},o.initButtonStatus=o.initButtonStatus.bind(o),o.changeButtonStatus=o.changeButtonStatus.bind(o),o.onStartPostseries=o.onStartPostseries.bind(o),o.onStopPostseries=o.onStopPostseries.bind(o),o.dealTreeData=o.dealTreeData.bind(o),o.state={checked:!1,curSelectedNode:null,showOffDisable:!1,addSelNodeId:{},pks:[],treeDisabledSearch:!1,json:{},inlt:null},o.initTemplate(e,function(){o.loadTreeDataUrl()}),o}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,i.Component),a(t,[{key:"dealTreeData",value:function(e){return e.forEach(function(e){e.iconBox={editIcon:!1,addIcon:!1,delIcon:!1},function e(t){t.children&&0!=t.children.length?(t.isLeaf=!1,t.children.forEach(function(t){e(t)})):delete t.children}(e)}),e}},{key:"componentDidMount",value:function(){}},{key:"componentDidUpdate",value:function(){var e=this.props.form.getFormStatus(this.config.formId);window.onbeforeunload="add"!=e&&"edit"!=e?null:function(){return""}}},{key:"loadTreeDataUrl",value:function(){var e=this,t={checked:this.state.checked,isGlbGrp:this.config.isGlbGrp};(0,l.ajax)({url:this.config.urls.loadTreeDataUrl,data:t,success:function(t){if(t.success){var o=[Object.assign(n({},e.root),{children:t.data})];if(e.props.syncTree.setSyncTreeData(e.config.treeId,e.dealTreeData(o)),e.state.curSelectedNode&&e.state.curSelectedNode.refpk)e.props.syncTree.openNodeByPk(e.config.treeId,e.state.curSelectedNode.pid),e.props.syncTree.setNodeSelected(e.config.treeId,e.state.curSelectedNode.refpk),e.props.button.setDisabled(["Print","Output"],!1),e.props.syncTree.getSelectNode(e.config.treeId)||(e.setState({curSelectedNode:null}),e.props.syncTree.openNodeByPk(e.config.treeId,e.root.refpk),e.props.button.setDisabled(["Print","Output"],!0));else e.props.syncTree.openNodeByPk(e.config.treeId,e.root.refpk),e.props.button.setDisabled(["Print","Output"],!0)}}}),this.initButtonStatus()}},{key:"initButtonStatus",value:function(){this.props.button.setButtonVisible(["Save","Cancel","SaveAdd"],!1)}},{key:"onSelectTree",value:function(e){var t=this;if(this.setState({curSelectedNode:this.props.syncTree.getSelectNode(this.config.treeId)}),"edit"!=this.props.form.getFormStatus(this.config.formId)){if(e==this.root.refpk)return this.props.form.EmptyAllFormValue(this.config.formId),this.props.button.setDisabled(["Print","Output"],!0),void this.props.form.setFormItemsDisabled(this.config.formId,{enablestate:!0});y=(new Date).valueOf().toString(),(0,l.ajax)({url:this.config.urls.queryCardUrl,data:{pk_postseries:e,isGlbGrp:this.config.isGlbGrp,postseriesTs:y},success:function(e){if(e.success&&e.data.postseriesTs===y){e.data=e.data.form,t.dealDisplayFm(e),t.dealFormData(e,!0),t.props.form.EmptyAllFormValue(t.config.formId),g.head=e.data[t.config.formId],t.props.form.setAllFormValue(g);var o=t.props.syncTree.getSelectNode(t.config.treeId);t.props.button.setDisabled(["Print","Output"],!1);var r=t.props.config.nodeType;"GLOBE_NODE"===r&&o&&"~"!=o.refpk||"GROUP_NODE"===r&&o&&o.nodeData.isGrp?t.props.form.setFormItemsDisabled(t.config.formId,{enablestate:!1}):t.props.form.setFormItemsDisabled(t.config.formId,{enablestate:!0})}}})}}},{key:"dealFormData",value:function(e,t){var o=e.data.head.rows[0].values;if(t&&o.hasOwnProperty("enablestate")){var r=o.enablestate.value;e.data.head.rows[0].values.enablestate.value="2"==r}o.father_pk.display!==this.root.refpk&&"root"!==o.father_pk.display||(e.data.head.rows[0].values.father_pk.display="",e.data.head.rows[0].values.father_pk.value="")}},{key:"onAfterFormEvent",value:function(e,t,o,r,s){var n=this;switch(o){case"enablestate":var a=this.props.syncTree.getSelectNode(this.config.treeId);if(!a){var i=r.value?this.state.json["10100PSG-000003"]:this.state.json["10100PSG-000004"];return void(0,l.toast)({color:"warning",title:i})}(0,l.ajax)({url:this.config.urls.isPermission,data:{pk_postseries:a.refpk},success:function(t){var o=t.success,s=t.data;if(o){if("success"!=s)return n.props.form.setFormItemsValue(n.config.formId,{enablestate:{value:!r.value}}),void(0,l.toast)({color:"danger",title:s});var i={pk_postseries:a.refpk,enablestate:r.value?"2":"1",ts:n.props.form.getFormItemsValue(n.config.formId,"ts").value};(0,l.promptBox)({color:"warning",title:n.state.json["10100PSG-000005"],content:r.value?n.state.json["10100PSG-000006"]:n.state.json["10100PSG-000007"],beSureBtnClick:function(){(0,l.ajax)({url:n.config.urls.enablestateUrl,data:i,success:function(t){var o=t.success,s=t.data;o&&((0,l.toast)({title:r.value?n.state.json["10100PSG-000008"]:n.state.json["10100PSG-000009"],color:"success"}),s&&e.form.setFormItemsValue(n.config.formId,{ts:{value:s}}))}})},cancelBtnClick:function(){e.form.setFormItemsValue(n.config.formId,{enablestate:{value:!r.value}})},closeBtnClick:function(){n.props.form.setFormItemsValue(n.config.formId,{enablestate:{value:!r.value}})}})}}})}}},{key:"onAddPostseries",value:function(e){var t=this;this.setState({curSelectedNode:e,addSelNodeId:e});var o={isGlbGrp:this.config.isGlbGrp};o.father_pk=e?e.refpk:this.root.refpk,(0,l.ajax)({url:this.config.urls.addCardUrl,data:o,success:function(e){e.success&&(t.dealFormData(e),t.props.form.EmptyAllFormValue(t.config.formId),t.props.form.setFormStatus(t.config.formId,"edit"),g.head=e.data[t.config.formId],t.props.form.setAllFormValue(g),t.props.form.setFormItemsDisabled(t.config.formId,{enablestate:!0}),t.props.syncTree.setNodeDisable(t.config.treeId,!0))}}),this.changeButtonStatus(e,"add")}},{key:"onEditPostseries",value:function(e){var t=this;(0,l.ajax)({url:this.config.urls.isPermission,data:{pk_postseries:e.refpk},success:function(o){var r=o.success,s=o.data;if(r){if("success"!=s)return void(0,l.toast)({color:"danger",title:s});t.doEditPostseries(e)}}})}},{key:"doEditPostseries",value:function(e){var t=this;this.setState({curSelectedNode:e});var o=this.config.isGlbGrp;(0,l.ajax)({url:this.config.urls.queryCardUrl,data:{pk_postseries:e.refpk,isGlbGrp:o},success:function(e){e.success&&(e.data=e.data.form,t.dealDisplayFm(e),t.props.syncTree.setNodeDisable(t.config.treeId,!0),t.dealFormData(e),g.head=e.data[t.config.formId],t.props.form.setAllFormValue(g),t.props.form.setFormItemsDisabled(t.config.formId,{enablestate:!0}),t.props.form.setFormStatus(t.config.formId,"edit"))}}),this.changeButtonStatus(e,"edit")}},{key:"onButtonClick",value:function(e,t){var o=this;switch(t){case"Refresh":this.onSelectTree(this.state.curSelectedNode?this.state.curSelectedNode.refpk:"~"),this.loadTreeDataUrl(),(0,l.toast)({color:"success",title:this.state.json["10100PSG-000010"]});break;case"Save":this.onSavePostseries();break;case"SaveAdd":this.onSavePostseries({isSaveAdd:!0});break;case"Cancel":(0,l.promptBox)({color:"warning",title:this.state.json["10100PSG-000011"],content:this.state.json["10100PSG-000012"],beSureBtnClick:function(){o.onCancelPostseries()}});break;case"Print":var r={funcode:"1"===this.config.isGlbGrp?"10100PSB":"10100PSG",nodekey:"postseriesPrint"};this.pintFunction(r);break;case"Output":var s=this.props.syncTree.getSelectNode(this.config.treeId);s&&s.refpk&&this.setState({pks:[s.refpk]},function(){o.refs.printOutput.open()})}}},{key:"pintFunction",value:function(e){var t=this.props.syncTree.getSelectNode(this.config.treeId);e.oids=[t.refpk],(0,l.print)("pdf",v.print,e)}},{key:"onSavePostseries",value:function(){var e=this,t=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).isSaveAdd,o=void 0!==t&&t,r=this.props.syncTree.getSelectNode(this.config.treeId);r||(r=this.state.curSelectedNode);var s;if(this.props.form.isCheckNow(this.config.formId)){var n=this.props.form.getAllFormValue(this.config.formId);n.areacode=this.config.formId,n.rows.status="2",s={model:n,pageid:this.config.pageCode};var a=null;n.rows[0].values.hasOwnProperty("pk_postseries")&&(a=n.rows[0].values.pk_postseries.value);var i=!1;null!=a&&""!=a||(i=!0);this.props.validateToSave(s,function(){(0,l.ajax)({url:e.config.urls.saveUrl,data:s,success:function(t){if(t.success){(0,l.toast)({title:e.state.json["10100PSG-000013"],color:"success"});var s=t.data[0].refpk;if(e.props.form.setFormStatus(e.config.formId,"browse"),e.props.syncTree.setNodeDisable(e.config.treeId,!1),t.data[0].children&&0!=t.data[0].children.length||delete t.data[0].children,i)e.props.syncTree.addNodeSuccess(e.config.treeId,t.data);else{e.props.syncTree.setNodeSelected(e.config.treeId,s);var n=(r=e.props.syncTree.getSelectNode(e.config.treeId)).children;n&&n.length>0&&(t.data[0].children=n),e.props.asyncTree.delTreeData(e.config.treeId,s),e.props.syncTree.addNodeSuccess(e.config.treeId,t.data)}e.props.syncTree.openNodeByPk(e.config.treeId,t.data[0].pid),e.props.syncTree.setNodeSelected(e.config.treeId,s),e.props.form.setFormItemsDisabled(e.config.formId,{enablestate:!1}),e.setState({curSelectedNode:null}),e.changeButtonStatus(r,"save"),o?e.onAddPostseries(e.state.addSelNodeId):e.onSelectTree(s)}}})},f({},this.config.formId,"form"),"form")}}},{key:"onDeletePostseries",value:function(e){var t=this,o={};(0,l.ajax)({url:this.config.urls.isPermission,data:{pk_postseries:e.refpk},success:function(r){var s=r.success,n=r.data;if(s){if("success"!=n)return void(0,l.toast)({color:"danger",title:n});var a=t.state.json["10100PSG-000014"];(0,l.promptBox)({color:"warning",title:t.state.json["10100PSG-000015"],content:a,beSureBtnClick:function(){o={pk_postseries:e.refpk,isGlbGrp:t.config.isGlbGrp,ts:e.nodeData.ts};e.pid;(0,l.ajax)({url:t.config.urls.deleteUrl,data:o,success:function(o){o.success&&(t.props.form.EmptyAllFormValue(t.config.formId),t.props.asyncTree.delTreeData(t.config.treeId,e.refpk),(0,l.toast)({title:t.state.json["10100PSG-000016"],color:"success"}))}})}})}}})}},{key:"onCancelPostseries",value:function(){var e=this,t=this.props.syncTree.getSelectNode(this.config.treeId);if(this.props.form.EmptyAllFormValue(this.config.formId),t&&"~"!=t.refpk){var o=this.props.config.nodeType;"GLOBE_NODE"===o&&"~"!=t.refpk||"GROUP_NODE"===o&&t.nodeData.isGrp?this.props.form.setFormItemsDisabled(this.config.formId,{enablestate:!1}):this.props.form.setFormItemsDisabled(this.config.formId,{enablestate:!0}),(0,l.ajax)({url:this.config.urls.queryCardUrl,data:{pk_postseries:t.refpk,isGlbGrp:this.config.isGlbGrp},success:function(t){t.success&&(t.data=t.data.form,e.dealDisplayFm(t),e.dealFormData(t,!0),g.head=t.data[e.config.formId],e.props.form.setAllFormValue(g))}}),this.onSelectTree(t.refpk)}else this.props.form.EmptyAllFormValue(this.config.formId);this.props.form.setFormStatus(this.config.formId,"browse"),this.props.syncTree.setNodeDisable(this.config.treeId,!1),this.changeButtonStatus(t,"cancel")}},{key:"onStartPostseries",value:function(){var e,t=this,o=this.props.form.getAllFormValue(this.config.formId),r=this.props.asyncTree.getSelectNodeAsync(this.config.treeId);if(r){if("2"==o.rows[0].values.enablestate.value)return void(0,l.toast)({color:"warning",title:this.state.json["10100PSG-000018"]})}else(0,l.toast)({color:"warning",title:this.state.json["10100PSG-000017"]});e={pk_postseries:o.rows[0].values.pk_postseries.value,enablestate:"2",isGlbGrp:this.config.isGlbGrp},(0,l.ajax)({url:this.config.urls.enablestateUrl,data:e,success:function(e){g.head=e.data[t.config.formId],t.props.form.setAllFormValue(g),t.refreshTreeNode(t.config.treeId,r.pid)}})}},{key:"onStopPostseries",value:function(){var e,t=this,o=this.props.form.getAllFormValue(this.config.formId),r=this.props.asyncTree.getSelectNodeAsync(this.config.treeId);if(r){if("1"==o.rows[0].values.enablestate.value)return void(0,l.toast)({color:"warning",title:this.state.json["10100PSG-000020"]})}else(0,l.toast)({color:"warning",title:this.state.json["10100PSG-000019"]});e={pk_postseries:o.rows[0].values.pk_postseries.value,enablestate:"1",isGlbGrp:this.config.isGlbGrp},(0,l.ajax)({url:this.config.urls.enablestateUrl,data:e,success:function(e){e.success&&(t.props.form.EmptyAllFormValue(t.config.formId),t.refreshTreeNode(t.config.treeId,r.pid))}})}},{key:"onMoreSelect",value:function(e){var t=e.key;"start"==t?this.onStartPostseries():"stop"==t&&this.onStopPostseries()}},{key:"changeButtonStatus",value:function(e,t){switch(t){case"add":case"saveAdd":this.props.button.setButtonVisible(["Refresh","Print"],!1),this.props.button.setButtonVisible(["Save","SaveAdd","Cancel"],!0),this.setState({showOffDisable:!0,treeDisabledSearch:!0});break;case"edit":this.props.button.setButtonVisible(["Refresh","Print","SaveAdd"],!1),this.props.button.setButtonVisible(["Save","Cancel"],!0),this.setState({showOffDisable:!0,treeDisabledSearch:!0});break;case"save":case"cancel":this.props.button.setButtonVisible(["Refresh","Print"],!0),this.props.button.setButtonVisible(["Save","SaveAdd","Cancel"],!1),this.setState({showOffDisable:!1,treeDisabledSearch:!1})}}},{key:"onMouseEnterEve",value:function(e,t){var o=this.props.config.nodeType,r={};r="GLOBE_NODE"===o&&"~"!=e&&t.nodeData.isGlb||"GROUP_NODE"===o&&"~"!=e&&t.nodeData.isGrp?{delIcon:!0,editIcon:!0,addIcon:!0}:{delIcon:!1,editIcon:!1,addIcon:!0},this.props.syncTree.hideIcon(this.config.treeId,e,r)}},{key:"onChange",value:function(e){var t=this,o=this.props.syncTree.getSelectNode(this.config.treeId),r={};o||(0,l.toast)({color:"warning",title:this.state.json["10100PSG-000021"]}),r.pk_postseries=o.refpk,r.enablestate=e?"2":"1",r.isGlbGrp=this.config.isGlbGrp,(0,l.ajax)({url:this.config.urls.enablestateUrl,data:r,success:function(r){r.success&&(e?(g.head=r.data[t.config.formId],t.props.form.setAllFormValue(g)):(t.props.form.EmptyAllFormValue(t.config.formId),t.props.syncTree.delNodeSuceess(t.config.treeId,o.refpk)))}})}},{key:"onCheckBoxClick",value:function(){var e=this;this.setState({checked:!this.state.checked},function(){e.loadTreeDataUrl(),e.props.form.EmptyAllFormValue(e.config.formId)})}},{key:"render",value:function(){var e=this.props,t=e.asyncTree,o=e.syncTree,r=e.form,s=e.button,n=e.modal,a=e.search,i=e.DragWidthCom,l=(t.createAsyncTree,o.createSyncTree),u=r.createForm,d=s.createButtonApp,f=(n.createModal,a.NCCreateSearch,p.Item,"10100PSB"===this.config.appcode?this.state.json["10100PSG-000022"]:this.state.json["10100PSG-000023"]);return c.default.createElement("div",{className:"postseries_10100PS"},c.default.createElement("div",{className:"header"},c.default.createElement("div",{className:"title"},f),c.default.createElement("span",{className:"showOff"},c.default.createElement(h,{defaultChecked:!1,checked:this.state.checked,onChange:this.onCheckBoxClick.bind(this),disabled:this.state.showOffDisable,size:"lg"},this.state.json["10100PSG-000024"])),c.default.createElement("div",{className:" btn-group"},d({area:this.config.formId,buttonLimit:3,onButtonClick:this.onButtonClick.bind(this),popContainer:document.querySelector("."+this.config.formId)}))),c.default.createElement("div",{className:"tree-card"},c.default.createElement(i,{leftDom:c.default.createElement("div",{className:"tree-area"},l({treeId:this.config.treeId,needEdit:!0,showLine:!0,needSearch:!0,onSelectEve:this.onSelectTree.bind(this),onMouseEnterEve:this.onMouseEnterEve.bind(this),clickEditIconEve:this.onEditPostseries.bind(this),clickAddIconEve:this.onAddPostseries.bind(this),clickDelIconEve:this.onDeletePostseries.bind(this),showModal:!1,disabledSearch:this.state.treeDisabledSearch})),rightDom:c.default.createElement("div",{className:"card-area"},u(this.config.formId,{cancelPSwitch:!0,onAfterEvent:this.onAfterFormEvent.bind(this)})),defLeftWid:"280px"})),c.default.createElement(m,{ref:"printOutput",url:v.print,data:{funcode:"1"===this.config.isGlbGrp?"10100PSB":"10100PSG",nodekey:"postseriesPrint",oids:this.state.pks,outputType:"output"}}))}}]),t}(),s=function(){var e=this;this.initTemplate=function(t,o){b=t.config.pageCode?t.config.pageCode:b,S=t.config.appcode?t.config.appcode:S;var r="0"===t.config.isGlbGrp?"Y":"N";(0,u.default)(t)({pagecode:b},{moduleId:"10100PSG",domainName:"uapbd"},function(s,n,a){n&&(e.state.json=n,e.root.refname=e.root.title=e.state.json["10100PSG-000002"],a&&(e.state.inlt=a)),s.template&&(s.template.head.items.map(function(e){"father_pk"==e.attrcode&&(e.refcode="uapbd/refer/org/PostSeriesDefaultAllTreeRef/index.js",e.queryCondition=function(){return{isGlb:r,isEnable:"Y",TreeRefActionExt:"nccloud.web.uapbd.org.postseries.util.PostSeriesDefaultAllTreeRefExt"}})}),t.meta.setMeta(s.template)),s.button&&t.button.setButtons(s.button),o&&o()})},this.dealDisplayFm=function(t){t.formulamsg&&t.formulamsg instanceof Array&&t.formulamsg.length>0&&e.props.dealFormulamsg(t.formulamsg,f({},"head","form"))}},r);t.default=k},222:function(e,t,o){var r=o(223);"string"==typeof r&&(r=[[e.i,r,""]]);var s={transform:void 0};o(4)(r,s);r.locals&&(e.exports=r.locals)},223:function(e,t,o){(e.exports=o(3)(!1)).push([e.i,".postseries_10100PS .showOff {\n  padding: 0px 0px 0px 10px;\n}\n.postseries_10100PS .showOff .u-checkbox-label {\n  padding-top: 0px;\n}\n",""])},3:function(e,t){e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var o=function(e,t){var o=e[1]||"",r=e[3];if(!r)return o;if(t&&"function"==typeof btoa){var s=function(e){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(e))))+" */"}(r),n=r.sources.map(function(e){return"/*# sourceURL="+r.sourceRoot+e+" */"});return[o].concat(n).concat([s]).join("\n")}return[o].join("\n")}(t,e);return t[2]?"@media "+t[2]+"{"+o+"}":o}).join("")},t.i=function(e,o){"string"==typeof e&&(e=[[null,e,""]]);for(var r={},s=0;s<this.length;s++){var n=this[s][0];"number"==typeof n&&(r[n]=!0)}for(s=0;s<e.length;s++){var a=e[s];"number"==typeof a[0]&&r[a[0]]||(o&&!a[2]?a[2]=o:o&&(a[2]="("+a[2]+") and ("+o+")"),t.push(a))}},t}},386:function(e,t,o){e.exports=o(387)},387:function(e,t,o){"use strict";var r=a(o(2)),s=a(o(5)),n=a(o(221));function a(e){return e&&e.__esModule?e:{default:e}}var i=(0,o(1).createPage)({billinfo:{billtype:"form",pagecode:"10100PSB_postseries",headcode:"head"}})(n.default);s.default.render(r.default.createElement(i,{config:{pageCode:"10100PSB_postseries",appcode:"10100PSB",nodeType:"GLOBE_NODE",formId:"head",treeId:"epsTree",isGlbGrp:"0"}}),document.querySelector("#app"))},4:function(e,t,o){var r={},s=function(e){var t;return function(){return void 0===t&&(t=e.apply(this,arguments)),t}}(function(){return window&&document&&document.all&&!window.atob}),n=function(e){var t={};return function(e){return void 0===t[e]&&(t[e]=function(e){return document.querySelector(e)}.call(this,e)),t[e]}}(),a=null,i=0,c=[],l=o(6);function u(e,t){for(var o=0;o<e.length;o++){var s=e[o],n=r[s.id];if(n){n.refs++;for(var a=0;a<n.parts.length;a++)n.parts[a](s.parts[a]);for(;a<s.parts.length;a++)n.parts.push(g(s.parts[a],t))}else{var i=[];for(a=0;a<s.parts.length;a++)i.push(g(s.parts[a],t));r[s.id]={id:s.id,refs:1,parts:i}}}}function d(e,t){for(var o=[],r={},s=0;s<e.length;s++){var n=e[s],a=t.base?n[0]+t.base:n[0],i={css:n[1],media:n[2],sourceMap:n[3]};r[a]?r[a].parts.push(i):o.push(r[a]={id:a,parts:[i]})}return o}function f(e,t){var o=n(e.insertInto);if(!o)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var r=c[c.length-1];if("top"===e.insertAt)r?r.nextSibling?o.insertBefore(t,r.nextSibling):o.appendChild(t):o.insertBefore(t,o.firstChild),c.push(t);else{if("bottom"!==e.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");o.appendChild(t)}}function p(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e);var t=c.indexOf(e);t>=0&&c.splice(t,1)}function h(e){var t=document.createElement("style");return e.attrs.type="text/css",m(t,e.attrs),f(e,t),t}function m(e,t){Object.keys(t).forEach(function(o){e.setAttribute(o,t[o])})}function g(e,t){var o,r,s,n;if(t.transform&&e.css){if(!(n=t.transform(e.css)))return function(){};e.css=n}if(t.singleton){var c=i++;o=a||(a=h(t)),r=b.bind(null,o,c,!1),s=b.bind(null,o,c,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(o=function(e){var t=document.createElement("link");return e.attrs.type="text/css",e.attrs.rel="stylesheet",m(t,e.attrs),f(e,t),t}(t),r=function(e,t,o){var r=o.css,s=o.sourceMap,n=void 0===t.convertToAbsoluteUrls&&s;(t.convertToAbsoluteUrls||n)&&(r=l(r));s&&(r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(s))))+" */");var a=new Blob([r],{type:"text/css"}),i=e.href;e.href=URL.createObjectURL(a),i&&URL.revokeObjectURL(i)}.bind(null,o,t),s=function(){p(o),o.href&&URL.revokeObjectURL(o.href)}):(o=h(t),r=function(e,t){var o=t.css,r=t.media;r&&e.setAttribute("media",r);if(e.styleSheet)e.styleSheet.cssText=o;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(o))}}.bind(null,o),s=function(){p(o)});return r(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;r(e=t)}else s()}}e.exports=function(e,t){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(t=t||{}).attrs="object"==typeof t.attrs?t.attrs:{},t.singleton||(t.singleton=s()),t.insertInto||(t.insertInto="head"),t.insertAt||(t.insertAt="bottom");var o=d(e,t);return u(o,t),function(e){for(var s=[],n=0;n<o.length;n++){var a=o[n];(i=r[a.id]).refs--,s.push(i)}e&&u(d(e,t),t);for(n=0;n<s.length;n++){var i;if(0===(i=s[n]).refs){for(var c=0;c<i.parts.length;c++)i.parts[c]();delete r[i.id]}}}};var v=function(){var e=[];return function(t,o){return e[t]=o,e.filter(Boolean).join("\n")}}();function b(e,t,o,r){var s=o?"":r.css;if(e.styleSheet)e.styleSheet.cssText=v(t,s);else{var n=document.createTextNode(s),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(n,a[t]):e.appendChild(n)}}},5:function(e,t){e.exports=o},6:function(e,t){e.exports=function(e){var t="undefined"!=typeof window&&window.location;if(!t)throw new Error("fixUrls requires window.location");if(!e||"string"!=typeof e)return e;var o=t.protocol+"//"+t.host,r=o+t.pathname.replace(/\/[^\/]*$/,"/");return e.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(e,t){var s,n=t.trim().replace(/^"(.*)"$/,function(e,t){return t}).replace(/^'(.*)'$/,function(e,t){return t});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(n)?e:(s=0===n.indexOf("//")?n:0===n.indexOf("/")?o+n:r+n.replace(/^\.\//,""),"url("+JSON.stringify(s)+")")})}}})});
//# sourceMappingURL=index.a9c3aa59.js.map