!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("nc-lightapp-front"),require("react"),require("nc-report")):"function"==typeof define&&define.amd?define(["nc-lightapp-front","react","nc-report"],t):"object"==typeof exports?exports["uapbd/orgcloseacc/closeaccbook/closecheck/index"]=t(require("nc-lightapp-front"),require("react"),require("nc-report")):e["uapbd/orgcloseacc/closeaccbook/closecheck/index"]=t(e["nc-lightapp-front"],e.React,e["nc-report"])}(window,function(e,t,o){return function(e){var t={};function o(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,o),a.l=!0,a.exports}return o.m=e,o.c=t,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)o.d(n,a,function(t){return e[t]}.bind(null,a));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="../../../../",o(o.s=174)}({1:function(t,o){t.exports=e},149:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(e[n]=o[n])}return e},a=function(){function e(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,o,n){return o&&e(t.prototype,o),n&&e(t,n),t}}(),r=o(2),c=o(1),i=function(e){return e&&e.__esModule?e:{default:e}}(o(150));c.base.NCMessage,c.base.NCDropdown,c.base.NCMenu,c.base.NCCheckbox,c.base.NCPopconfirm;var s=c.base.NCTree,l=c.base.NCIcon,u=s.NCTreeNode,f=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var o=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return o.onExpand=function(e){o.setState({expandedKeys:e,autoExpandParent:!1})},o.config=Object.assign({treeId:"closeTree",rootName:e.config.checkconfig&&e.config.checkconfig.json["101006-000000"]?e.config.checkconfig.json["101006-000000"]:"月结检查项类别",accperiod:"",treeData:[],urls:""},e.config.checkconfig),o.root={isleaf:!1,key:"~",title:o.config.rootName,id:"~",innercode:"~",pid:"",refname:o.config.rootName,refpk:"~"},o.state={autoExpandParent:!0,checkRes:{},itemvos:{},expandedKeys:["~"],selectedKeys:["~"],comps:{},curComp:void 0,pk_checkitem:"",print:null,json:e.config.checkconfig&&e.config.checkconfig.json["101006-000000"]?e.config.checkconfig.json:{},isReport:!1,reportParam:{}},o.initButtonVisib(),o}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,r.Component),a(t,[{key:"initButtonVisib",value:function(){var e=this.config.moduleid;"2011"===e||"3607"===e||"2006"===e||"2008"===e?this.props.button.setButtonsVisible(["Print","Output"],!1):this.props.button.setButtonsVisible(["Print","Output"],!0)}},{key:"componentDidMount",value:function(){this.config.isCheck&&this.onCheckClose()}},{key:"dealTreeData",value:function(e){return e.forEach(function(e){!function e(t){t.children&&0!=t.children.length?(t.isLeaf=!1,t.children.forEach(function(t){e(t)})):delete t.children}(e)}),e}},{key:"onButtonClick",value:function(e,t){var o=this;switch(t){case"Check":(0,c.promptBox)({color:"info",title:this.state.json["101006-000001"],content:this.state.json["101006-000002"],beSureBtnClick:function(){o.onCheckClose()}});break;case"Print":this.onPrintClose();break;case"Output":this.onOutputClose();break;case"OneKeySign":this.oneKeySign()}}},{key:"onCheckClose",value:function(){var e=this;(0,c.ajax)({url:"/nccloud/uapbd/org/DoCheckCloseAccNCCAction.do",data:this.config.data,success:function(t){var o=t.success,n=t.data;if(o&&n){n.isPass;var a=n.itemvos,r=n.checkRes,c=n.pk_checkitem;e.setState({checkRes:r,itemvos:a,expandedKeys:e.getCheckItemTypeIds(e.config.treeData),selectedKeys:[c],autoExpandParent:!0,pk_checkitem:c},function(){e.selectTree({refpk:c})})}}})}},{key:"onPrintClose",value:function(){this.state.print&&this.state.print()}},{key:"onprintPreVIewClose",value:function(){this.state.printPreVIew&&this.state.printPreVIew()}},{key:"onOutputClose",value:function(){this.state.output&&this.state.output()}},{key:"oneKeySign",value:function(){this.state.oneKeySign&&this.state.oneKeySign()}},{key:"getCheckItemTypeIds",value:function(e){var t=["~"];return e.forEach(function(e){!function e(o){o.nodeData&&o.nodeData.iSchecktypevo&&(t[t.length]=o.refpk),o.children&&o.children.length>0&&o.children.forEach(function(t){e(t)})}(e)}),t}},{key:"isCheckItem",value:function(e,t){for(var o=!1,n=0;n<e.length;n++){var a=e[n];if(a.refpk===t&&a.nodeData.iScheckitemvo)return!0;if(a.children&&(o=this.isCheckItem(a.children,t)))return!0}return o}},{key:"onSelectTree",value:function(e,t){var o=this;this.setState({selectedKeys:e,pk_checkitem:e[0]},function(){o.selectTree({refpk:e[0]})})}},{key:"selectTree",value:function(){var e=this,t=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).refpk,o=void 0===t?"":t,n=this.config.treeData;if(0!=n.length&&this.isCheckItem(n,o)){var a=this.getUrl(n,o);if(a)if(-1!=a.indexOf("report##"))(0,c.ajax)({url:"/nccloud/uapbd/org/QueryReportParambyFunid.do",data:{funid:a.split("##")[1]},success:function(t){var o=t.success,n=t.data;if(o&&n){n.appCode,n.pagecode,n.pk_report;var a=n.flag;n.reportName;"1"===a?e.setState({isReport:!0,reportParam:n}):((0,c.toast)({content:e.state.json["101006-000048"],color:"warning"}),e.setState({isReport:!1,reportParam:{}}))}}});else{-1!=a.indexOf("../../../../")?a+=".js":a="../../../../"+a+".js";var r=a.substring(12,a.length-3),i=document.createElement("script");i.src=a,i.type="text/javascript",i.onload=function(){var t=window[r];t?(e.state.comps[r]=t.default,e.state.curComp=t.default,e.state.isReport=!1,e.setState(e.state)):(0,c.toast)({content:"load panel class error!",color:"danger"})},i.onerror=function(){(0,c.toast)({content:e.state.json["101006-000004"],color:"danger"})},document.body.appendChild(i)}else(0,c.toast)({content:this.state.json["101006-000003"],color:"danger"})}}},{key:"getUrl",value:function(e,t){for(var o=null,n=0;n<e.length;n++){var a=e[n];if(a.refpk===t&&a.nodeData.iScheckitemvo)return a.nodeData.checkitemvo.checkclass?a.nodeData.checkitemvo.checkitem_url:"report##"+a.nodeData.checkitemvo.associpoint;if(a.children&&(o=this.getUrl(a.children,t)))return o}return o}},{key:"createRightPanel",value:function(){var e=this;if(this.state.isReport){var t={pk_checkitem:this.state.pk_checkitem,period:this.config.selref_pk_accperiodmonth,pk_accountingbook:this.config.data.model1.rows[0].values.pk_checkaccbook.value,pk_org:this.config.data.exdata.pk_org,moduleid:this.config.data.exdata.moduleid,selref_pk_accperiodmonth:this.config.data.exdata.selref_pk_accperiodmonth,selref_accperiodmonth_name:this.config.data.exdata.selref_accperiodmonth_name,isShowOnclose:this.config.data.exdata.isShowOnclose,key_time_offset:this.config.data.exdata.key_time_offset,data:this.config.data},o=(this.config.data.exdata.pk_org,this.config.data.model1.rows[0].values.pk_org.value),n=this.config.data.model1.rows[0].values.pk_storedoc.value,a=o;switch("STOREDOC"===t.moduleid&&(t.moduleid="4008"),"2016"===t.moduleid?a=this.config.data.model1.rows[0].values.pk_checkaccbook.value:"3824"===t.moduleid?a=this.config.data.model1.rows[0].values.pk_liabilitybook.value:"2014"===t.moduleid&&(a=this.config.data.model1.rows[0].values.pk_checkaccbook.value+this.config.data.model1.rows[0].values.pk_costregion.value),"2016"===t.moduleid?o=a:"2014"===t.moduleid&&(o=a.substring(0,20)),t.moduleid){case"2002":case"2016":t.pk_accountingbook=o;break;case"2014":t.pk_costorg=o;break;case"STOREDOC":case"4008":t.pk_inventory=o,t.pk_store=n;break;case"3830":t.pk_product=o}var r={appcode:this.state.reportParam.appcode,pagecode:this.state.reportParam.pagecode,LinkReport:JSON.stringify({logic:"and",conditions:[]}),reportName:this.state.reportParam.reportName,userdefObj:t};return React.createElement(i.default,r)}var c={},s=this.state.curComp,l={pk_checkitem:this.state.pk_checkitem,period:this.config.selref_pk_accperiodmonth,pk_accountingbook:this.config.data.model1.rows[0].values.pk_checkaccbook.value,data:this.config.data,linkParam:c,fthis:this,ref:function(t){e.curCompInstance=t,e.linkParam=e.linkParam?e.linkParam:c}};return s?s(l):""}},{key:"render",value:function(){var e=this,t=this.props,o=(t.asyncTree,t.syncTree,t.button),a=(t.modal,t.search,t.DragWidthCom),r=o.createButtonApp,c=this.dealTreeData([Object.assign(n({},this.root),{children:this.config.treeData})]),i=React.createElement("div",{className:"tree-area"},React.createElement("div",{style:{height:380,overflow:"auto"}},React.createElement(s,{selectedKeys:this.state.selectedKeys,onExpand:this.onExpand.bind(this),expandedKeys:this.state.expandedKeys,autoExpandParent:this.state.autoExpandParent,onSelect:this.onSelectTree.bind(this),openIcon:React.createElement("i",{field:"tree-switcher",fieldname:this.state.json["101006-000005"],class:"icon iconfont icon-shu_zk tree-swich"}),closeIcon:React.createElement("i",{field:"tree-switcher",fieldname:this.state.json["101006-000005"],class:"icon iconfont icon-shushouqi tree-swich"})},function t(o){return o.map(function(o){var n=o.refname,a="";if(o.nodeData&&o.nodeData.iSchecktypevo)a=React.createElement(l,{type:"uf-4square-3"});else if(o.nodeData&&o.nodeData.iScheckitemvo){var r=e.state.checkRes[o.refpk];a=r?React.createElement("span",{style:{marginTop:3,marginRight:6}},React.createElement("div",{style:{display:"flex",height:15,width:15,justifyContent:"center",alignItems:"center",overflow:"hidden",borderRadius:15}},React.createElement("i",{style:{color:"#69AC4E",fontSize:24,marginTop:5},className:"uf uf-pass-3"}))):void 0!=r&&null!=r&&!1===r?"1"==o.nodeData.checkitemvo.checkstrategy?React.createElement("span",{style:{marginRight:6}},React.createElement("i",{style:{color:"#F35118",fontSize:17},className:"uf uf-close-c"})):React.createElement("span",{style:{marginRight:6}},React.createElement("i",{style:{color:"#F35118",fontSize:20},className:"uf uf-exc-c-2"})):""}else a=React.createElement(l,{type:"uf-folder-o"});var c=React.createElement("span",{style:{display:"flex"}},a,React.createElement("span",null,n));return o.children?React.createElement(u,{key:o.refpk,title:c},t(o.children)):React.createElement(u,{key:o.refpk,title:c,isLeaf:o.isLeaf})})}(c)))),f=React.createElement("div",{className:"card-area",style:this.state.isReport?{}:{overflow:"hidden"}},this.createRightPanel());return React.createElement("div",null,React.createElement("div",{className:"header",style:{height:35,paddingBottom:10,marginTop:-8}},React.createElement("span",{className:"showOff"},this.state.json["101006-000006"],"：",this.config.accperiod),React.createElement("div",{className:"btn-group"},r({area:"check-area",onButtonClick:this.onButtonClick.bind(this)}))),React.createElement("div",{className:"tree-card",style:{height:420}},React.createElement(a,{leftDom:i,rightDom:f,defLeftWid:"20%"})))}}]),t}();t.default=f},150:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,o,n){return o&&e(t.prototype,o),n&&e(t,n),t}}(),a=o(2),r=o(1),c=o(151);r.base.NCMessage,r.base.NCDropdown,r.base.NCMenu,r.base.NCCheckbox,r.base.NCPopconfirm,r.base.NCTree,r.base.NCIcon;var i=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var o=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return o.state={checkRes:{},itemvos:{}},o}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,a.Component),n(t,[{key:"componentDidMount",value:function(){}},{key:"setDefaultVal",value:function(e,t){}},{key:"render",value:function(){var e={appcode:this.props.appcode,pagecode:this.props.pagecode,LinkReport:this.props.LinkReport,userdefObj:this.props.userdefObj,reportName:this.props.reportName,showSearchArea:"2"};return React.createElement("div",{className:"table"},React.createElement(c.SimpleReport,{ownReportParams:e,showAdvBtn:!0,setDefaultVal:this.setDefaultVal.bind(this)}))}}]),t}();t.default=i},151:function(e,t){e.exports=o},174:function(e,t,o){e.exports=o(149)},2:function(e,o){e.exports=t}})});
//# sourceMappingURL=index.d3674fda.js.map