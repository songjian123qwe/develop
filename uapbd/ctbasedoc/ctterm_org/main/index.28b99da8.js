!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("nc-lightapp-front"),require("react"),require("react-dom")):"function"==typeof define&&define.amd?define(["nc-lightapp-front","react","react-dom"],t):"object"==typeof exports?exports["uapbd/ctbasedoc/ctterm_org/main/index"]=t(require("nc-lightapp-front"),require("react"),require("react-dom")):e["uapbd/ctbasedoc/ctterm_org/main/index"]=t(e["nc-lightapp-front"],e.React,e.ReactDOM)}(window,function(e,t,o){return function(e){var t={};function o(r){if(t[r])return t[r].exports;var n=t[r]={i:r,l:!1,exports:{}};return e[r].call(n.exports,n,n.exports,o),n.l=!0,n.exports}return o.m=e,o.c=t,o.d=function(e,t,r){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(o.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)o.d(r,n,function(t){return e[t]}.bind(null,n));return r},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="../../../../",o(o.s=138)}({1:function(t,o){t.exports=e},10:function(e,t,o){var r=o(11);"string"==typeof r&&(r=[[e.i,r,""]]);var n={transform:void 0};o(4)(r,n);r.locals&&(e.exports=r.locals)},11:function(e,t,o){(e.exports=o(3)(!1)).push([e.i,".search-box .clearfix {\n  width: 220px!important;\n}\n",""])},12:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var r in o)Object.prototype.hasOwnProperty.call(o,r)&&(e[r]=o[r])}return e};t.default=function(e){return function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},s=arguments[2],a=0,i={},c=function(){2==a&&s&&s(i.templateData||{},i.langData||{},i.inlt||{})};o.callback&&console.log("咱们自己createUIDom会同时获取多语和单据模板,并通过一个回调函数返回, langCfg中的回调函数将被忽略");var l=r({},o,{callback:function(e,t,o){a+=1,t||(0,n.toast)({content:"load muti lang error",color:"warning"}),i.langData=e||{},i.inlt=o||{},c()}});e.MultiInit.getMultiLang(l),e.createUIDom(t,function(e){a+=1,i.templateData=e||{},c()})}};var n=o(1)},138:function(e,t,o){e.exports=o(139)},139:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=function(){function e(e,t){for(var o=0;o<t.length;o++){var r=t[o];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,o,r){return o&&e(t.prototype,o),r&&e(t,r),t}}(),n=o(2),s=c(n),a=c(o(6)),i=c(o(7));function c(e){return e&&e.__esModule?e:{default:e}}var l=function(e){function t(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,n.Component),r(t,[{key:"render",value:function(){return s.default.createElement(i.default,{config:{title:"合同条款定义-业务单元",pageCode:"10140Z00_termset",appcode:"10140Z02",appid:"0001Z010000000000O0L",nodeType:"ORG_NODE",formId:"head",treeId:"cttermTree",isGlbGrp:"1"}})}}]),t}();t.default=l,a.default.render(s.default.createElement(l,null),document.querySelector("#app"))},2:function(e,o){e.exports=t},3:function(e,t){e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var o=function(e,t){var o=e[1]||"",r=e[3];if(!r)return o;if(t&&"function"==typeof btoa){var n=function(e){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(e))))+" */"}(r),s=r.sources.map(function(e){return"/*# sourceURL="+r.sourceRoot+e+" */"});return[o].concat(s).concat([n]).join("\n")}return[o].join("\n")}(t,e);return t[2]?"@media "+t[2]+"{"+o+"}":o}).join("")},t.i=function(e,o){"string"==typeof e&&(e=[[null,e,""]]);for(var r={},n=0;n<this.length;n++){var s=this[n][0];"number"==typeof s&&(r[s]=!0)}for(n=0;n<e.length;n++){var a=e[n];"number"==typeof a[0]&&r[a[0]]||(o&&!a[2]?a[2]=o:o&&(a[2]="("+a[2]+") and ("+o+")"),t.push(a))}},t}},4:function(e,t,o){var r={},n=function(e){var t;return function(){return void 0===t&&(t=e.apply(this,arguments)),t}}(function(){return window&&document&&document.all&&!window.atob}),s=function(e){var t={};return function(e){return void 0===t[e]&&(t[e]=function(e){return document.querySelector(e)}.call(this,e)),t[e]}}(),a=null,i=0,c=[],l=o(5);function u(e,t){for(var o=0;o<e.length;o++){var n=e[o],s=r[n.id];if(s){s.refs++;for(var a=0;a<s.parts.length;a++)s.parts[a](n.parts[a]);for(;a<n.parts.length;a++)s.parts.push(g(n.parts[a],t))}else{var i=[];for(a=0;a<n.parts.length;a++)i.push(g(n.parts[a],t));r[n.id]={id:n.id,refs:1,parts:i}}}}function d(e,t){for(var o=[],r={},n=0;n<e.length;n++){var s=e[n],a=t.base?s[0]+t.base:s[0],i={css:s[1],media:s[2],sourceMap:s[3]};r[a]?r[a].parts.push(i):o.push(r[a]={id:a,parts:[i]})}return o}function p(e,t){var o=s(e.insertInto);if(!o)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var r=c[c.length-1];if("top"===e.insertAt)r?r.nextSibling?o.insertBefore(t,r.nextSibling):o.appendChild(t):o.insertBefore(t,o.firstChild),c.push(t);else{if("bottom"!==e.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");o.appendChild(t)}}function f(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e);var t=c.indexOf(e);t>=0&&c.splice(t,1)}function h(e){var t=document.createElement("style");return e.attrs.type="text/css",m(t,e.attrs),p(e,t),t}function m(e,t){Object.keys(t).forEach(function(o){e.setAttribute(o,t[o])})}function g(e,t){var o,r,n,s;if(t.transform&&e.css){if(!(s=t.transform(e.css)))return function(){};e.css=s}if(t.singleton){var c=i++;o=a||(a=h(t)),r=v.bind(null,o,c,!1),n=v.bind(null,o,c,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(o=function(e){var t=document.createElement("link");return e.attrs.type="text/css",e.attrs.rel="stylesheet",m(t,e.attrs),p(e,t),t}(t),r=function(e,t,o){var r=o.css,n=o.sourceMap,s=void 0===t.convertToAbsoluteUrls&&n;(t.convertToAbsoluteUrls||s)&&(r=l(r));n&&(r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(n))))+" */");var a=new Blob([r],{type:"text/css"}),i=e.href;e.href=URL.createObjectURL(a),i&&URL.revokeObjectURL(i)}.bind(null,o,t),n=function(){f(o),o.href&&URL.revokeObjectURL(o.href)}):(o=h(t),r=function(e,t){var o=t.css,r=t.media;r&&e.setAttribute("media",r);if(e.styleSheet)e.styleSheet.cssText=o;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(o))}}.bind(null,o),n=function(){f(o)});return r(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;r(e=t)}else n()}}e.exports=function(e,t){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(t=t||{}).attrs="object"==typeof t.attrs?t.attrs:{},t.singleton||(t.singleton=n()),t.insertInto||(t.insertInto="head"),t.insertAt||(t.insertAt="bottom");var o=d(e,t);return u(o,t),function(e){for(var n=[],s=0;s<o.length;s++){var a=o[s];(i=r[a.id]).refs--,n.push(i)}e&&u(d(e,t),t);for(s=0;s<n.length;s++){var i;if(0===(i=n[s]).refs){for(var c=0;c<i.parts.length;c++)i.parts[c]();delete r[i.id]}}}};var b=function(){var e=[];return function(t,o){return e[t]=o,e.filter(Boolean).join("\n")}}();function v(e,t,o,r){var n=o?"":r.css;if(e.styleSheet)e.styleSheet.cssText=b(t,n);else{var s=document.createTextNode(n),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(s,a[t]):e.appendChild(s)}}},5:function(e,t){e.exports=function(e){var t="undefined"!=typeof window&&window.location;if(!t)throw new Error("fixUrls requires window.location");if(!e||"string"!=typeof e)return e;var o=t.protocol+"//"+t.host,r=o+t.pathname.replace(/\/[^\/]*$/,"/");return e.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(e,t){var n,s=t.trim().replace(/^"(.*)"$/,function(e,t){return t}).replace(/^'(.*)'$/,function(e,t){return t});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(s)?e:(n=0===s.indexOf("//")?s:0===s.indexOf("/")?o+s:r+s.replace(/^\.\//,""),"url("+JSON.stringify(n)+")")})}},6:function(e,t){e.exports=o},7:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,n,s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var r in o)Object.prototype.hasOwnProperty.call(o,r)&&(e[r]=o[r])}return e},a=function(){function e(e,t){for(var o=0;o<t.length;o++){var r=t[o];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,o,r){return o&&e(t.prototype,o),r&&e(t,r),t}}(),i=o(2),c=p(i),l=o(1),u=p(o(8));o(10);var d=p(o(12));function p(e){return e&&e.__esModule?e:{default:e}}function f(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}var h=l.cardCache.setDefData,m=l.cardCache.getDefData,g=l.base.NCMenu,b=(l.base.NCDropdown,l.base.NCCheckbox,l.base.NCPopconfirm,l.base.NCCol,l.base.NCRow,l.base.NCButton,l.base.NCTooltip,g.NCMenuGroup,g.Item,l.high.PrintOutput),v="head",y="card",k={loadTreeDataUrl:"/nccloud/uapbd/ctterm/loadtreedata.do",queryTemplet:"/nccloud/platform/templet/querypage.do",addcttermUrl:"/nccloud/uapbd/ctterm/addctterm.do",queryCardUrl:"/nccloud/uapbd/ctterm/querycard.do",savetermUrl:"/nccloud/uapbd/ctterm/saveterm.do",savetermtypeUrl:"/nccloud/uapbd/ctterm/savetermtype.do",deleteTermUrl:"/nccloud/uapbd/ctterm/delterm.do",deleteTermtypeUrl:"/nccloud/uapbd/ctterm/deltermtype.do",printUrl:"/nccloud/uapbd/ctterm/printurl.do",sysQueryByPkUrl:"/nccloud/uapbd/ctterm/sysquerybypk.do"},S="10140Z00_termset",T=(r=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var o=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.call(o),o.state={pks:[],disabledSearch:!1,disabledOrgunit:!1,checked:!1,curOrg:"",json:null,curSelectedNode:null},o.config=Object.assign({title:"",treeId:"cttermTree",formId:v,cardfromId:y,pageCode:S,nodeType:"GROUP_NODE",urls:k},e.config),o.root={isleaf:!1,key:"~",title:"",id:"~",innercode:"~",pid:"",refname:"",refpk:"~"},o.initTemplate=o.initTemplate.bind(o),o.initButtonStatus=o.initButtonStatus.bind(o),o.changeButtonStatus=o.changeButtonStatus.bind(o),o.onStartEps=o.onStartEps.bind(o),o.onStopEps=o.onStopEps.bind(o),o.dealTreeData=o.dealTreeData.bind(o),o.onSaveCtterm=o.onSaveCtterm.bind(o),o.onDeleteCtterm=o.onDeleteCtterm.bind(o),o.initTemplate(e),o}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,i.Component),a(t,[{key:"dealTreeData",value:function(e){var t=[];return e.forEach(function(e){e.iconBox={delIcon:!0,editIcon:!0,addIcon:!0},function e(o){"~"!=o.refpk&&void 0!=o.refpk&&o.nodeData.isTermType&&t.push(o.refpk),o.iconBox={delIcon:!0,editIcon:!0,addIcon:!0},o.children&&0!=o.children.length?(o.isLeaf=!1,o.children.forEach(function(t){e(t)})):delete o.children}(e)}),h("allpks",this.props.config.datasource,t),e}},{key:"componentDidUpdate",value:function(){var e=this.props.form.getFormStatus(this.config.formId),t=this.props.form.getFormStatus(this.config.cardfromId);window.onbeforeunload=void 0!=e&&"browse"!=e||"browse"!=t&&void 0!=t?function(){return""}:null}},{key:"componentDidMount",value:function(){this.initButtonStatus()}},{key:"onRefresh",value:function(){var e=this,t=this,o={checked:t.state.checked,pkorg:t.state.curOrg.refpk},r=[];(0,l.ajax)({url:t.config.urls.loadTreeDataUrl,data:o,success:function(o){o.success&&(t.root.title=e.state.json["10140Z00-000000"],t.root.refname=e.state.json["10140Z00-000000"],r="ORG_NODE"!==t.config.nodeType||t.state.curOrg?[Object.assign(s({},t.root),{children:o.data})]:[s({},t.root)],t.props.syncTree.setSyncTreeData(t.config.treeId,t.dealTreeData(r)),t.props.syncTree.openNodeByPk(t.config.treeId,t.root.refpk),"refresh"==m("ctterm_btnopr",t.props.config.datasource)&&(0,l.toast)({title:e.state.json["10140Z00-000001"],color:"success"}))}})}},{key:"initButtonStatus",value:function(){this.props.button.setButtonVisible("add",!1),this.props.button.setButtonVisible("edit",!1),this.props.button.setButtonVisible("save",!1),this.props.button.setButtonVisible("saveadd",!1),this.props.button.setButtonVisible("cancel",!1),this.props.button.setButtonVisible("delete",!1),this.props.button.setButtonVisible("printpage",!1)}},{key:"onSelectTree",value:function(e){var t=this,o=(this.props.syncTree.getSelectNode(this.config.treeId),this.props.form.getFormStatus(this.config.formId)),r=this.props.syncTree.getSelectNode(this.config.treeId);if(e==this.root.refpk)return this.props.form.EmptyAllFormValue(this.config.formId),void this.changeButtonStatus("selectroot");"edit"==o||r.nodeData.isTermType?this.changeButtonStatus("select"):(0,l.ajax)({url:this.config.urls.queryCardUrl,data:{pk_ct_termset:e,isGlbGrp:this.config.isGlbGrp},success:function(e){if(e.success){var o;if(e.formulamsg&&e.formulamsg instanceof Array&&e.formulamsg.length>0)props.dealFormulamsg(e.formulamsg,(f(o={},t.config.formId,"form"),f(o,t.config.cardfromId,"form"),o));var r=e.data.head.rows[0].values;if(r.hasOwnProperty("enablestate")){var n=r.enablestate.value;e.data.head.rows[0].values.enablestate.value="2"==n}r.pk_ct_termtype.display==t.root.refpk&&(e.data.head.rows[0].values.pk_ct_termtype.display="",e.data.head.rows[0].values.pk_ct_termtype.value=""),t.props.form.EmptyAllFormValue(t.config.formId),t.props.form.setAllFormValue({head:e.data.head}),t.changeButtonStatus("cancel")}}})}},{key:"onAfterFormEvent",value:function(e,t,o,r,n){var s=this;switch(o){case"enablestate":var a=this.props.syncTree.getSelectNode(this.config.treeId);if(!a){var i=r.value?this.state.json["10140Z00-000002"]:this.state.json["10140Z00-000003"];return void(0,l.toast)({content:i,color:"warning"})}var c={pk_custsaleclass:a.refpk,enablestate:r.value?"2":"1"};(0,l.promptBox)({color:"warning",title:this.state.json["10140Z00-000004"],noFooter:!1,hasCloseBtn:!1,content:r.value?this.state.json["10140Z00-000005"]:this.state.json["10140Z00-000006"],beSureBtnClick:function(){(0,l.ajax)({url:s.config.urls.enablestateUrl,data:c,success:function(e){(0,l.toast)({title:r.value?s.state.json["10140Z00-000007"]:s.state.json["10140Z00-000008"],color:"success"})}})},cancelBtnClick:function(){e.form.setFormItemsValue(s.config.formId,{enablestate:!0})}})}}},{key:"onAddCttermtype",value:function(e){"~"==e.refpk||e.nodeData.isTermType?"ORG_NODE"!==this.config.nodeType||this.state.curOrg.refpk?this.openSysModal(""):(0,l.toast)({content:this.state.json["10140Z00-000011"],color:"warning"}):(0,l.toast)({content:this.state.json["10140Z00-000010"],color:"warning"})}},{key:"onAddCtterm",value:function(){var e=this,t=this.props.syncTree.getSelectNode(this.config.treeId);if("ORG_NODE"!==this.config.nodeType||this.state.curOrg.refpk)if(t){this.setState({curSelectedNode:t});var o={};o.pkorg=this.state.curOrg.refpk,t.nodeData.isTermType?o.pk_ct_termtype=t.refpk:o.pk_ct_termtype=t.pid,(0,l.ajax)({url:this.config.urls.addcttermUrl,data:o,success:function(t){t.success&&(e.props.form.EmptyAllFormValue(e.config.formId),e.props.form.setFormStatus(e.config.formId,"edit"),e.props.form.setAllFormValue({head:t.data.head}),e.props.syncTree.setNodeDisable(e.config.treeId,!0),e.setState({disabledSearch:!0,disabledOrgunit:!0}),e.changeButtonStatus("add"))}})}else(0,l.toast)({content:this.state.json["10140Z00-000012"],color:"warning"});else(0,l.toast)({content:this.state.json["10140Z00-000011"],color:"warning"})}},{key:"onEditCttermtype",value:function(e){"ORG_NODE"===this.config.nodeType&&e.nodeData.isGroup?(0,l.toast)({content:this.state.json["10140Z00-000013"],color:"warning"}):e.nodeData.isTermType?this.openSysModal(e.id):(0,l.toast)({content:this.state.json["10140Z00-000014"],color:"warning"})}},{key:"onEditCtterm",value:function(){var e=this,t=this.props.syncTree.getSelectNode(this.config.treeId);t?(this.setState({curSelectedNode:t}),t.nodeData.isTermType?(0,l.toast)({content:this.state.json["10140Z00-000015"],color:"warning"}):"ORG_NODE"===this.config.nodeType&&t.nodeData.isGroup?(0,l.toast)({content:this.state.json["10140Z00-000013"],color:"warning"}):(0,l.ajax)({url:this.config.urls.queryCardUrl,data:{pk_ct_termset:t.refpk},success:function(t){if(t.success){var o;if(t.formulamsg&&t.formulamsg instanceof Array&&t.formulamsg.length>0)props.dealFormulamsg(t.formulamsg,(f(o={},e.config.formId,"form"),f(o,e.config.cardfromId,"form"),o));e.props.syncTree.setNodeDisable(e.config.treeId,!0),e.props.form.setAllFormValue({head:t.data.head}),e.props.form.setFormStatus(e.config.formId,"edit"),e.setState({disabledSearch:!0,disabledOrgunit:!0}),e.changeButtonStatus("edit")}}})):(0,l.toast)({content:this.state.json["10140Z00-000012"],color:"warning"})}},{key:"openSysModal",value:function(e){var t=this;this.props.form.setFormStatus(y,"edit");var o={pk_ct_termtype:e,pkorg:this.state.curOrg.refpk};(0,l.ajax)({url:this.config.urls.sysQueryByPkUrl,method:"post",data:o,success:function(e){e.success&&(t.props.modal.show("treeedit",{title:t.state.json["10140Z00-000029"]}),t.props.form.setFormStatus(t.config.cardfromId,"edit"),t.props.form.EmptyAllFormValue(y),t.props.form.setAllFormValue({card:e.data.card}))}})}},{key:"onSaveCtterm",value:function(){var e=this;if(this.props.form.isCheckNow(this.config.formId)){var t=this.props.syncTree.getSelectNode(this.config.treeId);if(t||(t=this.state.curSelectedNode),t){var o,r=void 0,n=null;(r=this.props.form.getAllFormValue(this.config.formId)).rows[0].values.hasOwnProperty("pk_ct_termset")&&(n=r.rows[0].values.pk_ct_termset.value,r.areacode=this.config.formId),r.rows.status="2",o={model:r,pageid:this.config.pageCode};var s=!1;null!=n&&""!=n||(s=!0),this.props.validateToSave(o,function(){(0,l.ajax)({url:e.config.urls.savetermUrl,data:o,success:function(t){if(t.success){e.props.form.setFormStatus(e.config.formId,"browse"),e.props.syncTree.setNodeDisable(e.config.treeId,!1),t.data.treenode[0].children&&0!=t.data.treenode[0].children.length||delete t.data.treenode[0].children,s?e.props.syncTree.addNodeSuccess(e.config.treeId,t.data.treenode):e.props.syncTree.editNodeSuccess(e.config.treeId,t.data.treenode[0]);var o=t.data.head.head.rows[0].values;if(o.hasOwnProperty("enablestate")){var r=o.enablestate.value;o.enablestate.value="2"==r}e.props.form.EmptyAllFormValue(e.config.formId),e.props.form.setAllFormValue({head:t.data.head.head}),e.props.syncTree.openNodeByPk(e.config.treeId,t.data.treenode[0].pid),e.props.syncTree.setNodeSelected(e.config.treeId,t.data.treenode[0].refpk),e.setState({curSelectedNode:null,disabledSearch:!1,disabledOrgunit:!1}),(0,l.toast)({title:e.state.json["10140Z00-000017"],color:"success"}),e.changeButtonStatus("save")}}})},{head:"form"},"form")}else alert(this.state.json["10140Z00-000016"])}}},{key:"onSaveCttermtype",value:function(){var e=this;if(this.props.form.isCheckNow(this.config.cardfromId)){var t,o=void 0,r=null;(o=this.props.form.getAllFormValue(this.config.cardfromId)).rows[0].values.hasOwnProperty("pk_ct_termtype")&&(r=o.rows[0].values.pk_ct_termtype.value,o.areacode=this.config.cardfromId),o.rows.status="2",t={model:o,pageid:this.config.pageCode};var n=!1;null!=r&&""!=r||(n=!0),(0,l.ajax)({url:this.config.urls.savetermtypeUrl,data:t,success:function(t){t.success&&t.data&&(e.props.form.setFormStatus(e.config.formId,"browse"),e.props.syncTree.setNodeDisable(e.config.treeId,!1),t.data[0].children&&0!=t.data[0].children.length||delete t.data[0].children,n?e.props.syncTree.addNodeSuccess(e.config.treeId,t.data):e.props.syncTree.editNodeSuccess(e.config.treeId,t.data[0]),e.props.syncTree.openNodeByPk(e.config.treeId,t.data[0].pid),e.props.syncTree.setNodeSelected(e.config.treeId,t.data[0].refpk),e.setState({curSelectedNode:null}),e.changeButtonStatus("save"),e.props.form.setFormStatus(y,"browse"),(0,l.toast)({title:e.state.json["10140Z00-000017"],color:"success"}),e.props.modal.close("treeedit"))}})}else this.props.modal.show("treeedit",{title:this.state.json["10140Z00-000029"]})}},{key:"onSaveAddCtterm",value:function(){var e=this,t=this.props.syncTree.getSelectNode(this.config.treeId),o={},r=this.props.form.getAllFormValue(this.config.formId);r.areacode=this.config.formId,r.rows.status="2";var n,s=null;n=this.config.urls.savetermUrl,r.rows[0].values.hasOwnProperty("pk_ct_termset")&&(s=r.rows[0].values.pk_ct_termset.value),o={model:r,pageid:"10140EPSG"};this.props.validateToSave(o,function(){(0,l.ajax)({url:n,data:o,success:function(r){r.success&&(e.props.form.setFormStatus(e.config.formId,"browse"),r.data[0].children&&0!=r.data[0].children.length||delete r.data[0].children,e.props.syncTree.addNodeSuccess(e.config.treeId,r.data),e.props.syncTree.openNodeByPk(e.config.treeId,r.data[0].pid),t||(e.props.syncTree.setNodeSelected(e.config.treeId,r.data[0].pid),t=e.props.syncTree.getSelectNode(e.config.treeId)),e.props.syncTree.setNodeDisable(e.config.treeId,!0),o={pk_ct_termtype:r.data[0].pid},e.onAddCtterm())}})},f({},this.config.formId,"form"),"form")}},{key:"deleteCtterm",value:function(){var e=this,t=this.props.syncTree.getSelectNode(this.config.treeId),o={},r=void 0;1==t.nodeData.isTermType?(r=this.config.urls.deleteTermtypeUrl,o={pk_ct_termtype:t.refpk}):(r=this.config.urls.deleteTermUrl,o={pk_ct_termset:t.refpk}),(0,l.ajax)({url:r,data:o,success:function(o){o.success&&(e.props.form.EmptyAllFormValue(e.config.formId),e.props.syncTree.delNodeSuceess(e.config.treeId,t.refpk),(0,l.toast)({title:e.state.json["10140Z00-000018"],color:"success"}))}})}},{key:"onDeleteCtterm",value:function(){var e=this,t=this.props.syncTree.getSelectNode(this.config.treeId);if(t)if("ORG_NODE"===this.config.nodeType&&t.nodeData.isGroup)(0,l.toast)({content:this.state.json["10140Z00-000013"],color:"warning"});else if(t.refpk!=this.root.refpk)if(t.nodeData.isTermType)(0,l.toast)({content:this.state.json["10140Z00-000021"],color:"warning"});else{var o=this.state.json["10140Z00-000022"];t.children&&t.children.length>0?(0,l.toast)({content:this.state.json["10140Z00-000023"],color:"warning"}):((0,l.promptBox)({color:"warning",title:this.state.json["10140Z00-000004"],noFooter:!1,hasCloseBtn:!1,content:o,beSureBtnClick:function(){e.deleteCtterm()}}),this.changeButtonStatus("delete"))}else(0,l.toast)({content:this.state.json["10140Z00-000020"],color:"warning"});else(0,l.toast)({content:this.state.json["10140Z00-000019"],color:"warning"})}},{key:"onDeleteCttermtype",value:function(){var e=this,t=this.props.syncTree.getSelectNode(this.config.treeId);if(t)if("ORG_NODE"===this.config.nodeType&&t.nodeData.isGroup)(0,l.toast)({content:this.state.json["10140Z00-000013"],color:"warning"});else if(t.refpk!=this.root.refpk){var o=this.state.json["10140Z00-000022"];t.nodeData.isTermType&&t.hasOwnProperty("children")&&t.children.length>0?(0,l.toast)({content:this.state.json["10140Z00-000023"],color:"warning"}):t.nodeData.isTermType?((0,l.promptBox)({color:"warning",title:this.state.json["10140Z00-000004"],noFooter:!1,hasCloseBtn:!1,content:o,beSureBtnClick:function(){e.deleteCtterm()}}),this.changeButtonStatus("del")):(0,l.toast)({content:this.state.json["10140Z00-000024"],color:"warning"})}else(0,l.toast)({content:this.state.json["10140Z00-000020"],color:"warning"});else(0,l.toast)({content:this.state.json["10140Z00-000019"],color:"warning"})}},{key:"onCancelCtterm",value:function(){var e=this,t=this.props.syncTree.getSelectNode(this.config.treeId);(0,l.promptBox)({color:"warning",title:this.state.json["10140Z00-000034"],noFooter:!1,hasCloseBtn:!1,content:this.state.json["10140Z00-000025"],beSureBtnClick:function(){var o=e.props.syncTree.getSelectNode(e.config.treeId);e.props.form.EmptyAllFormValue(e.config.formId),e.props.form.setFormItemsDisabled(e.config.formId,{enablestate:!0}),o?(0,l.ajax)({url:e.config.urls.queryCardUrl,data:{pk_ct_termset:o.refpk},success:function(t){if(t.success){var o;if(t.formulamsg&&t.formulamsg instanceof Array&&t.formulamsg.length>0)props.dealFormulamsg(t.formulamsg,(f(o={},e.config.formId,"form"),f(o,e.config.cardfromId,"form"),o));e.props.form.setAllFormValue({head:t.data.head})}}}):e.props.form.EmptyAllFormValue(e.config.formId),e.props.form.setFormStatus(e.config.formId,"browse"),e.props.syncTree.setNodeDisable(e.config.treeId,!1),e.setState({disabledSearch:!1,disabledOrgunit:!1}),t.nodeData.isTermType?e.changeButtonStatus("select"):e.changeButtonStatus("cancel")}})}},{key:"onStartEps",value:function(){var e,t=this,o=this.props.form.getAllFormValue(this.config.formId),r=this.props.asyncTree.getSelectNodeAsync(this.config.treeId);if(r){if("2"==o.rows[0].values.enablestate.value)return void(0,l.toast)({content:this.state.json["10140Z00-000026"],color:"warning"})}else(0,l.toast)({content:this.state.json["10140Z00-000002"],color:"warning"});e={pk_custsaleclass:o.rows[0].values.pk_custsaleclass.value,enablestate:"2"},(0,l.ajax)({url:this.config.urls.enablestateUrl,data:e,success:function(e){res.success&&(t.props.form.setAllFormValue({head:e.data.head}),t.refreshTreeNode("epsTree",r.pid),t.changeButtonStatus("start"))}})}},{key:"onStopEps",value:function(){var e,t=this,o=this.props.form.getAllFormValue(this.config.formId),r=this.props.asyncTree.getSelectNodeAsync(this.config.treeId);if(r){if("1"==o.rows[0].values.enablestate.value)return void(0,l.toast)({content:this.state.json["10140Z00-000027"],color:"warning"})}else(0,l.toast)({content:this.state.json["10140Z00-000003"],color:"warning"});e={pk_custsaleclass:o.rows[0].values.pk_custsaleclass.value,enablestate:"1"},(0,l.ajax)({url:this.config.urls.enablestateUrl,data:e,success:function(e){e.success&&(t.props.form.EmptyAllFormValue(t.config.formId),t.refreshTreeNode("epsTree",r.pid),t.changeButtonStatus("stop"))}})}},{key:"onClickSearchBtn",value:function(e,t){var o={};null!=t&&t.map(function(e){o[e.field]=e.value.firstvalue}),e.linkTo("/uapbd/eps/main/list/index.html",o)}},{key:"onMoreSelect",value:function(e){var t=e.key;"start"==t?this.onStartEps():"stop"==t&&this.onStopEps()}},{key:"onVisibleChange",value:function(e){}},{key:"onMore",value:function(){}},{key:"changeButtonStatus",value:function(e){switch(e){case"saveadd":case"add":this.props.button.setButtonVisible("save",!0),this.props.button.setButtonVisible("saveadd",!0),this.props.button.setButtonVisible("cancel",!0),this.props.button.setButtonVisible("printpage",!1),this.props.button.setButtonVisible("refresh",!1),this.props.button.setButtonVisible("edit",!1),this.props.button.setButtonVisible("delete",!1),this.props.button.setButtonVisible("add",!1);break;case"edit":this.props.button.setButtonVisible("add",!1),this.props.button.setButtonVisible("edit",!1),this.props.button.setButtonVisible("save",!0),this.props.button.setButtonVisible("saveadd",!1),this.props.button.setButtonVisible("cancel",!0),this.props.button.setButtonVisible("printpage",!1),this.props.button.setButtonVisible("refresh",!1),this.props.button.setButtonVisible("delete",!1);break;case"save":case"cancel":case"delete":this.props.button.setButtonVisible("save",!1),this.props.button.setButtonVisible("saveadd",!1),this.props.button.setButtonVisible("delete",!0),this.props.button.setButtonDisabled(["delete"],!1),this.props.button.setButtonVisible("add",!0),this.props.button.setButtonDisabled(["add"],!1),this.props.button.setButtonVisible("edit",!0),this.props.button.setButtonVisible("cancel",!1),this.props.button.setButtonVisible("refresh",!0),this.props.button.setButtonVisible("printpage",!0);break;case"select":this.props.button.setButtonVisible("add",!0),this.props.button.setButtonDisabled(["add"],!1),this.props.button.setButtonVisible("edit",!1),this.props.button.setButtonVisible("save",!1),this.props.button.setButtonVisible("saveadd",!1),this.props.button.setButtonVisible("cancel",!1),this.props.button.setButtonVisible("delete",!0),this.props.button.setButtonVisible("refresh",!0),this.props.button.setButtonVisible("printpage",!0),this.props.button.setButtonDisabled(["delete"],!0);break;case"selectroot":this.props.button.setButtonVisible("add",!0),this.props.button.setButtonVisible("edit",!1),this.props.button.setButtonVisible("save",!1),this.props.button.setButtonVisible("saveadd",!1),this.props.button.setButtonVisible("cancel",!1),this.props.button.setButtonVisible("delete",!0),this.props.button.setButtonVisible("refresh",!0),this.props.button.setButtonVisible("printpage",!0),this.props.button.setButtonDisabled(["delete","add"],!0)}}},{key:"onMouseEnterEve",value:function(e){var t=this.props.syncTree.getSyncTreeValue(this.config.treeId,e),o={};(e===this.root.refpk||"ORG_NODE"===this.config.nodeType&&t.nodeData&&t.nodeData.isGroup)&&(o={delIcon:!1,editIcon:!1,addIcon:!0},this.props.syncTree.hideIcon(this.config.treeId,e,o)),"GROUP_NODE"===this.config.nodeType&&t.nodeData&&!t.nodeData.isGroup&&(o={delIcon:!1,editIcon:!1,addIcon:!0},this.props.syncTree.hideIcon(this.config.treeId,e,o)),t.nodeData.isTermType||(o={delIcon:!1,editIcon:!1,addIcon:!1},this.props.syncTree.hideIcon(this.config.treeId,e,o))}},{key:"onChange",value:function(e){var t=this,o=this.props.syncTree.getSelectNode(this.config.treeId),r={};o||(0,l.toast)({content:this.state.json["10140Z00-000028"],color:"warning"}),r.pk_custsaleclass=o.refpk,r.enablestate=e?"2":"1",(0,l.ajax)({url:this.config.urls.enablestateUrl,data:r,success:function(r){r.success&&(e?t.props.form.setAllFormValue({head:r.data.head}):(t.props.form.EmptyAllFormValue(t.config.formId),t.props.syncTree.delNodeSuceess(t.config.treeId,o.refpk)))}})}},{key:"onCheckBoxChange",value:function(){var e=this,t=(this.state.checked,{checked:this.state.checked});(0,l.ajax)({url:this.config.urls.loadTreeDataUrl,data:t,success:function(t){if(t.success){var o=[Object.assign(s({},e.root),{children:t.data})];o.forEach(function(e){!function e(t){t.children&&0!=t.children.length?(t.isLeaf=!1,t.children.forEach(function(t){e(t)})):delete t.children}(e)}),e.props.syncTree.setSyncTreeData(e.config.treeId,o),e.props.syncTree.openNodeByPk(e.config.treeId,e.root.refpk)}}})}},{key:"onCheckBoxClick",value:function(){this.setState({checked:!this.state.checked}),this.props.form.EmptyAllFormValue(this.config.formId)}},{key:"onOrgChange",value:function(e){var t=this;this.setState({curOrg:e}),setTimeout(function(){return t.onRefresh()},10)}},{key:"onButtonClick",value:function(e,t){switch(t){case"add":this.onAddCtterm();break;case"edit":this.onEditCtterm();break;case"save":this.onSaveCtterm();break;case"saveadd":this.onSaveAddCtterm();break;case"delete":this.onDeleteCtterm();break;case"cancel":this.onCancelCtterm();break;case"print":var o=m("allpks",e.config.datasource);if(o.length<=0)return void(0,l.toast)({content:this.state.json["10140Z00-000035"],color:"warning"});(0,l.print)("pdf",this.config.urls.printUrl,{funcode:"10140Z00",nodekey:"termset",oids:o},!1);break;case"export":var r=m("allpks",e.config.datasource);if(r.length<=0)return void(0,l.toast)({content:this.state.json["10140Z00-000036"],color:"warning"});this.setState({pks:r},this.refs.printOutput.open());break;case"refresh":h("ctterm_btnopr",e.config.datasource,"refresh"),this.onRefresh()}}},{key:"render",value:function(){var e=this,t=this.props,o=t.asyncTree,r=t.syncTree,n=t.form,s=t.button,a=t.modal,i=t.search,d=t.DragWidthCom,p=(o.createAsyncTree,r.createSyncTree),f=n.createForm,h=s.createButtonApp,m=a.createModal;i.NCCreateSearch;return c.default.createElement("div",{className:"nc-bill-card"},m("modal",{noFooter:!1}),m("confirm"),this.state.json&&m("treeedit",{title:this.state.json["10140Z00-000029"],content:this.props.form.createForm(y),userControl:!0,beSureBtnClick:this.onSaveCttermtype.bind(this),cancelBtnClick:function(){(0,l.promptBox)({color:"warning",title:e.state.json["10140Z00-000034"],noFooter:!1,hasCloseBtn:!1,content:e.state.json["10140Z00-000025"],beSureBtnClick:function(){e.props.form.setFormStatus(y,"browse"),e.props.modal.close("treeedit")}})},noFooter:!1}),c.default.createElement("div",{className:"header"},c.default.createElement("h2",{className:"title"},this.props.config.title),"ORG_NODE"===this.config.nodeType?c.default.createElement("div",{className:"search-box"},(0,u.default)({onChange:this.onOrgChange.bind(this),value:this.state.curOrg,disabled:this.state.disabledOrgunit,queryCondition:function(){return{TreeRefActionExt:"nccloud.web.refer.sqlbuilder.PrimaryOrgSQLBuilder,nccloud.web.uapbd.ctbasedoc.ctterm.action.OrgUnitForCorpFilter",orgtype2:"Y",AppCode:e.config.appcode}}})):"",c.default.createElement("div",{className:"btn-group"},h({area:"header-button-area",buttonLimit:5,onButtonClick:this.onButtonClick.bind(this),popContainer:document.querySelector(".header-button-area")}))),c.default.createElement("div",{className:"tree-card"},c.default.createElement(d,{leftDom:c.default.createElement("div",{className:"tree-area"},p({disabledSearch:this.state.disabledSearch,treeId:this.config.treeId,needEdit:!0,showLine:!1,needSearch:!0,onSelectEve:this.onSelectTree.bind(this),onMouseEnterEve:this.onMouseEnterEve.bind(this),clickEditIconEve:this.onEditCttermtype.bind(this),clickAddIconEve:this.onAddCttermtype.bind(this),clickDelIconEve:this.onDeleteCttermtype.bind(this),showModal:!1})),rightDom:c.default.createElement("div",{className:"card-area"},f(this.config.formId,{cancelPSwitch:!0,onAfterEvent:this.onAfterFormEvent.bind(this)})),defLeftWid:"20%"})),c.default.createElement(b,{ref:"printOutput",url:this.config.urls.printUrl,data:{funcode:"10140Z00",nodekey:"termset",oids:this.state.pks,outputType:"output"}}))}}]),t}(),n=function(){var e=this;this.initTemplate=function(t,o){var r=e;(0,d.default)(t)({pagecode:t.config.pageCode},{moduleId:"10140Z00",domainName:"uapbd"},function(n,s){if(s&&(e.state.json=s,r.root.title=e.state.json["10140Z00-000000"],r.root.refname=e.state.json["10140Z00-000000"],"GROUP_NODE"==t.config.nodeType?t.config.title=e.state.json["10140Z00-000032"]:t.config.title=e.state.json["10140Z00-000033"]),n){var a=n.context||{};if(r.state.curOrg={refpk:a.pk_org,refname:a.org_Name,display:a.org_Name,values:{refpk:a.pk_org,refname:a.org_Name}},n.template){var i=n.template;t.meta.setMeta(i)}if(n.button){var c=n.button;t.button.setButtons(c)}r.onRefresh(),o&&o()}})}},r);t.default=T=(0,l.createPage)({billinfo:[{billtype:"form",pagecode:S,headcode:v},{billtype:"form",pagecode:S,headcode:y}],mutiLangCode:"10140Z00"})(T)},8:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.conf=void 0;var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var r in o)Object.prototype.hasOwnProperty.call(o,r)&&(e[r]=o[r])}return e};t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return React.createElement(a,r({},i,e))};var n=o(1),s=o(9),a=n.high.Refer,i=t.conf={multiLang:{domainName:"uapbd",currentLocale:"zh-CN",moduleId:"refer_uapbd"},refType:"tree",refName:"refer-000201",refCode:"uapbd.refer.org.BusinessUnitTreeRef",rootNode:{refname:"refer-000201",refpk:"root"},placeholder:"refer-000201",queryTreeUrl:"/nccloud/uapbd/org/BusinessUnitTreeRef.do",treeConfig:{name:["refer-000002","refer-000003"],code:["refcode","refname"]},isMultiSelectedEnabled:!1,unitProps:s.conf,isShowUnit:!1}},9:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.conf=void 0;var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var r in o)Object.prototype.hasOwnProperty.call(o,r)&&(e[r]=o[r])}return e};t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return React.createElement(n,r({},s,e))};var n=o(1).high.Refer,s=t.conf={multiLang:{domainName:"uap",currentLocale:"zh-CN",moduleId:"uapRefer"},queryTreeUrl:"/nccloud/riart/ref/groupRefTreeAction.do",refType:"tree",placeholder:"1880000025-000061",refName:"1880000025-000061",rootNode:{refname:"1880000025-000061",refpk:"root"}}}})});
//# sourceMappingURL=index.28b99da8.js.map