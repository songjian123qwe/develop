!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("nc-lightapp-front"),require("react"),require("react-dom")):"function"==typeof define&&define.amd?define(["nc-lightapp-front","react","react-dom"],t):"object"==typeof exports?exports["uapbd/customer/custapply/main/index"]=t(require("nc-lightapp-front"),require("react"),require("react-dom")):e["uapbd/customer/custapply/main/index"]=t(e["nc-lightapp-front"],e.React,e.ReactDOM)}(window,function(e,t,n){return function(e){function t(t){for(var n,r,o=t[0],s=t[1],i=0,c=[];i<o.length;i++)r=o[i],a[r]&&c.push(a[r][0]),a[r]=0;for(n in s)Object.prototype.hasOwnProperty.call(s,n)&&(e[n]=s[n]);for(l&&l(t);c.length;)c.shift()()}var n={},a={5:0};function r(t){if(n[t])return n[t].exports;var a=n[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,r),a.l=!0,a.exports}r.e=function(e){var t=[],n=a[e];if(0!==n)if(n)t.push(n[2]);else{var o=new Promise(function(t,r){n=a[e]=[t,r]});t.push(n[2]=o);var s,i=document.getElementsByTagName("head")[0],l=document.createElement("script");l.charset="utf-8",l.timeout=120,r.nc&&l.setAttribute("nonce",r.nc),l.src=function(e){return r.p+""+({2:"uapbd/customer/custapply/card/Card"}[e]||e)+".js"}(e),s=function(t){l.onerror=l.onload=null,clearTimeout(c);var n=a[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src,s=new Error("Loading chunk "+e+" failed.\n("+r+": "+o+")");s.type=r,s.request=o,n[1](s)}a[e]=void 0}};var c=setTimeout(function(){s({type:"timeout",target:l})},12e4);l.onerror=l.onload=s,i.appendChild(l)}return Promise.all(t)},r.m=e,r.c=n,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)r.d(n,a,function(t){return e[t]}.bind(null,a));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="../../../../",r.oe=function(e){throw console.error(e),e};var o=window.webpackJsonp_name_=window.webpackJsonp_name_||[],s=o.push.bind(o);o.push=t,o=o.slice();for(var i=0;i<o.length;i++)t(o[i]);var l=s;return r(r.s=265)}({1:function(t,n){t.exports=e},131:function(e,t){e.exports=n},148:function(e,t){e.exports=function(e){var t="undefined"!=typeof window&&window.location;if(!t)throw new Error("fixUrls requires window.location");if(!e||"string"!=typeof e)return e;var n=t.protocol+"//"+t.host,a=n+t.pathname.replace(/\/[^\/]*$/,"/");return e.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(e,t){var r,o=t.trim().replace(/^"(.*)"$/,function(e,t){return t}).replace(/^'(.*)'$/,function(e,t){return t});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(o)?e:(r=0===o.indexOf("//")?o:0===o.indexOf("/")?n+o:a+o.replace(/^\.\//,""),"url("+JSON.stringify(r)+")")})}},2:function(e,n){e.exports=t},233:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),r=n(2),o=l(r),s=l(n(234)),i=l(n(235));function l(e){return e&&e.__esModule?e:{default:e}}var c=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.type=n.props.data.flow_type,console.log("display",n.props.display,e.data),n.state={showModal:n.props.display,data:n.props.data},n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,r.Component),a(t,[{key:"componentWillReceiveProps",value:function(e){this.setState({data:e.data,showModal:e.display})}},{key:"render",value:function(){return"workflow"==this.type?o.default.createElement(i.default,{title:this.props.title||"选择下游环节",getResult:this.props.getResult,data:this.state.data,cancel:this.props.cancel,hideNote:this.props.hideNote,display:this.state.showModal}):o.default.createElement(s.default,{title:this.props.title||"指派",data:this.state.data,getResult:this.props.getResult,cancel:this.props.cancel,display:this.state.showModal})}}]),t}();t.default=c},234:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),r=n(2),o=function(e){return e&&e.__esModule?e:{default:e}}(r),s=n(1);var i=s.base.NCModal,l=s.base.NCTransfer,c=s.base.NCSelect,u=s.base.NCButton,p=(c.NCOption,function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e)),a=n.props.data.content?n.props.data.content:[];console.log("data",a);var r,o=[];return n.mapSource={},n.result={},a.forEach(function(e,t){o[o.length]={key:e.desc,value:e.activitydefid},n.mapSource[e.activitydefid]=e.uservos.map(function(t){return{key:e.activitydefid+"_"+t.userpk,title:t.username}})}),r=n.mapSource[o[0].value],console.log("sourceKeys",r),n.state={showModal:n.props.display,selectDataSource:o,source:r,target:[],currenttab:o.length>0?o[0].value:""},n.cancel=n.cancel.bind(n),n.confirm=n.confirm.bind(n),n.handleSelectChange=n.handleSelectChange.bind(n),n.handleTransferChange=n.handleTransferChange.bind(n),n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,r.Component),a(t,[{key:"componentWillReceiveProps",value:function(e){var t=this,n=e.data.content?e.data.content:[];console.log("data_async",n);var a,r=[];this.mapSource={},this.result={},n.forEach(function(e,n){r[r.length]={key:e.desc,value:e.activitydefid},t.mapSource[e.activitydefid]=e.uservos.map(function(t){return{key:e.activitydefid+"_"+t.userpk,title:t.username}})}),a=this.mapSource[r[0].value],console.log("sourceKeys_async",a),this.state={showModal:e.display,selectDataSource:r,source:a,target:[],currenttab:r.length>0?r[0].value:""}}},{key:"confirm",value:function(){var e=this;console.log("confirm",this.result),0!=this.state.target.length?(this.props.data.content.forEach(function(t){e.result[t.activitydefid]||(t.uservos=[]),t.uservos=t.uservos.filter(function(n){return e.result[t.activitydefid].includes(t.activitydefid+"_"+n.userpk)})}),this.props.getResult(this.props.data)):(0,s.toast)({content:"没有为活动指派参与者!"})}},{key:"cancel",value:function(){console.log("cancel"),this.props.cancel()}},{key:"handleSelectChange",value:function(e){console.log("change",e,this.mapSource),this.setState({source:this.mapSource[e],currenttab:e})}},{key:"handleTransferChange",value:function(e,t,n){var a=this;console.log(e,t,n,this.state.source),this.result[this.state.currenttab]||(this.result[this.state.currenttab]=[]),"right"==t?n.forEach(function(e){e.indexOf(a.state.currenttab)>-1&&a.result[a.state.currenttab].push(e)}):"left"==t&&n.forEach(function(e){if(e.indexOf(a.state.currenttab)>-1){var t=a.result[a.state.currenttab].indexOf(e);a.result[a.state.currenttab].splice(t,1)}}),this.setState({target:e})}},{key:"render",value:function(){console.log("render_source",this.state.source);var e=this.state.selectDataSource,t=e.map(function(e){return o.default.createElement(c.NCOption,{value:e.value},e.key)}),n=e.length>0?e[0].value:"";return o.default.createElement("div",null,o.default.createElement(i,{show:this.state.showModal},o.default.createElement(i.Header,null,o.default.createElement(i.Title,null,this.props.title)),o.default.createElement(i.Body,null,o.default.createElement("div",{style:{margin:"0 auto",display:"table",width:"82%"}},o.default.createElement(c,{style:{width:"100%"},defaultValue:n,onChange:this.handleSelectChange},t)),o.default.createElement("div",{style:{margin:"0 auto",marginTop:"10px",display:"table"}},o.default.createElement(l,{lazy:{container:"modal"},listStyle:{width:200,height:250},dataSource:this.state.source,onChange:this.handleTransferChange,targetKeys:this.state.target,render:function(e){return e.title}}))),o.default.createElement(i.Footer,null,o.default.createElement(u,{onClick:this.confirm,colors:"primary"},"确定"),o.default.createElement(u,{onClick:this.cancel,style:{marginRight:50}},"取消"))))}}]),t}());t.default=p},235:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),r=n(2),o=function(e){return e&&e.__esModule?e:{default:e}}(r),s=n(1);n(236);var i=s.base.NCModal,l=s.base.NCTransfer,c=s.base.NCMenu,u=s.base.NCCheckbox,p=s.base.NCButton,d=s.base.NCTextArea,f=c.NCSubMenu,h=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));n.menuData=[],n.initTransferData=[],n.mapTransfer={},n.usersResult={},n.defaultSelectedKeys,n.falseMap={},n.prepareData(e.data.content),n.isMultiSelect=n.props.data.muplityWithOutAssgin;var a=n;return n.state={showModal:n.props.display,source:n.initTransferData,currentMenu:n.defaultSelectedKeys,target:[],textValue:"",mapCheck:function(t){return Object.keys(a.mapTransfer).map(function(n,a){t[n]=e.data.content[a].isChoice||!1}),t}({})},n.handleTransferChange=n.handleTransferChange.bind(n),n.handleCheckboxChange=n.handleCheckboxChange.bind(n),n.handleMenuClick=n.handleMenuClick.bind(n),n.confirm=n.confirm.bind(n),n.cancel=n.cancel.bind(n),n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,r.Component),a(t,[{key:"prepareData",value:function(e){var t=this;e.forEach(function(e,n){t.falseMap[e.selectpath]=!1,t.menuData[t.menuData.length]={name:e.desc,id:e.selectpath},e.isAssgin?t.mapTransfer[e.selectpath]=e.assginUsers.map(function(t){return{title:t.name,code:t.code,key:e.selectpath+"_"+t.pk}}):t.mapTransfer[e.selectpath]=[]});var n=Object.keys(t.mapTransfer)[0];t.initTransferData=t.mapTransfer[n],t.defaultSelectedKeys=n}},{key:"componentWillReceiveProps",value:function(e){this.menuData=[],this.initTransferData=[],this.mapTransfer={},this.usersResult={},this.falseMap={},this.isMultiSelect=e.data.muplityWithOutAssgin,this.prepareData(e.data.content);var t=this;this.state={showModal:e.display,source:this.initTransferData,currentMenu:this.defaultSelectedKeys,target:[],mapCheck:function(n){return Object.keys(t.mapTransfer).map(function(t,a){n[t]=e.data.content[a].isChoice||!1}),n}({})}}},{key:"handleCheckboxChange",value:function(e){var t={};t[e]=!this.state.mapCheck[e],this.setState({mapCheck:this.isMultiSelect?Object.assign({},this.state.mapCheck,t):Object.assign({},this.falseMap,t)})}},{key:"handleTransferChange",value:function(e,t,n){var a=this;this.usersResult[this.state.currentMenu]||(this.usersResult[this.state.currentMenu]=[]),"right"==t?n.forEach(function(e){e.indexOf(a.state.currentMenu)>-1&&a.usersResult[a.state.currentMenu].push(e)}):"left"==t&&n.forEach(function(e){if(e.indexOf(a.state.currentMenu)>-1){var t=a.usersResult[a.state.currentMenu].indexOf(e);a.usersResult[a.state.currentMenu].splice(t,1)}}),this.setState({target:e})}},{key:"handleMenuClick",value:function(e){this.setState({currentMenu:e.key,source:this.mapTransfer[e.key]})}},{key:"confirm",value:function(){var e=this;this.props.data.content.forEach(function(t){t.isChoice=e.state.mapCheck[t.selectpath],t.isAssgin&&(e.usersResult[t.selectpath]||(t.assginUsers=[]),t.assginUsers=t.assginUsers.filter(function(n){return e.usersResult[t.selectpath].includes(t.selectpath+"_"+n.pk)}))}),this.props.getResult(this.props.data,this.state.textValue)}},{key:"cancel",value:function(){this.props.cancel()}},{key:"render",value:function(){var e=this,t=this,n=this.menuData.map(function(n){return o.default.createElement(c.Item,{key:n.id},o.default.createElement(u,{colors:"info",checked:e.state.mapCheck[n.id],onChange:t.handleCheckboxChange.bind(t,n.id)}),n.name)});return o.default.createElement("div",null,o.default.createElement(i,{show:this.state.showModal,size:"lg"},o.default.createElement(i.Header,null,o.default.createElement(i.Title,null,this.props.title)),o.default.createElement(i.Body,null,o.default.createElement("div",{className:"wrap"},1!=this.menuData.length?o.default.createElement("div",{className:"menuBox"},o.default.createElement("div",{className:"menuContent"},o.default.createElement(c,{mode:"inline",selectedKeys:[this.state.currentMenu],defaultOpenKeys:["sub1"],onClick:this.handleMenuClick,style:{width:150}},o.default.createElement(f,{key:"sub1",title:o.default.createElement("span",null,o.default.createElement("span",null,"选择流程"))},n)))):"",o.default.createElement("div",{style:{float:"left"}},o.default.createElement(l,{titles:["用户","已选"],dataSource:this.state.source,targetKeys:this.state.target,listStyle:{height:330,width:200},onChange:this.handleTransferChange,render:function(e){return e.title},lazy:{container:"modal"}}),this.props.hideNote?"":o.default.createElement(d,{value:this.state.textValue,onChange:function(t){e.setState({textValue:t})},className:"textArea"})))),o.default.createElement(i.Footer,null,o.default.createElement(p,{onClick:this.cancel,style:{marginRight:50}},"取消"),o.default.createElement(p,{onClick:this.confirm,colors:"primary"},"确定"))))}}]),t}();t.default=h},236:function(e,t,n){var a=n(237);"string"==typeof a&&(a=[[e.i,a,""]]);var r={transform:void 0};n(6)(a,r);a.locals&&(e.exports=a.locals)},237:function(e,t,n){(e.exports=n(5)(!1)).push([e.i,".wrap {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  height: 400px;\n  padding-bottom: 11px;\n}\n.wrap::-webkit-scrollbar,\n.menuBox::-webkit-scrollbar {\n  /*整个滚动条区域的宽度*/\n  width: 3px;\n  height: 3px;\n}\n.wrap::-webkit-scrollbar-button,\n.menuBox::-webkit-scrollbar-button {\n  /*滚动条上下两边的按钮*/\n  display: none;\n}\n.wrap::-webkit-scrollbar-thumb,\n.menuBox::-webkit-scrollbar-thumb {\n  /*真滚动条样式*/\n  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);\n  background: rgba(0, 0, 0, 0.2);\n  border-radius: 100px ;\n}\n.wrap::-webkit-scrollbar-track,\n.menuBox::-webkit-scrollbar-track {\n  /*滚动条滚动的轨道*/\n  display: none;\n}\n.menuBox {\n  float: left;\n  height: auto;\n  border: 1px solid #ccc;\n  border-radius: 3px;\n  margin-right: 5px;\n  overflow: auto;\n}\n.menuBox .menuContent {\n  margin-top: -13px;\n}\n.menuBox .menuContent .u-menu-item {\n  padding-left: 15px !important;\n}\n.menuBox .menuContent .u-menu-item-selected.u-menu-item {\n  padding-left: 15px !important;\n}\n.menuBox .menuContent .u-checkbox .u-checkbox-label {\n  padding-left: 20px !important;\n}\n.menuBox .menuContent .u-menu.u-menu-root {\n  border: none;\n  box-shadow: none;\n  -webkit-box-shadow: none;\n  border-radius: 0px;\n}\n.textArea {\n  margin-top: 4px;\n}\n.u-transfer-list-content-item span {\n  padding-left: 0px !important;\n}\n",""])},239:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a,r,o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},s=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),i=n(2),l=p(i),c=(p(n(131)),n(1)),u=p(n(233));function p(e){return e&&e.__esModule?e:{default:e}}c.base.NCPopconfirm,c.base.NCIcon,c.base.NCTabs.NCTabPane;var d=c.high.PrintOutput,f=c.high.ApproveDetail,h=c.cardCache.setDefData,b=c.cardCache.getDefData,m="10140CUSTPF_custpflist",v="searcharea",g="customerpf",y="10140CUSTPF",C="pk_customerpf",k="/nccloud/uapbd/customer/CustApplyListQuery.do",w="/nccloud/uapbd/customer/CustApplyDelete.do",S="/nccloud/uapbd/customer/CustApplyPrint.do",x="/nccloud/uapbd/customer/CustApplyCommit.do",T="/nccloud/uapbd/customer/CustApplyCallback.do",j="10140CUSTPF_custpfcard",P="uapbd.customer.custapply.cache",_=(a=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return r.call(n),n.searchId=v,n.tableId=g,n.state={compositedata:null,compositedisplay:!1,approveDetailShow:!1,billid:null,json:{}},n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,i.Component),s(t,[{key:"initTemplate",value:function(e){var t=this;e.createUIDom({pagecode:m},function(n){if(n){if(n.template){var a=n.template;a=t.modifierMeta(e,a),e.meta.setMeta(a,function(){n.context&&n.context.pk_org&&n.context.org_Name&&e.search.setSearchValByField(v,"pk_org",{value:n.context.pk_org?n.context.pk_org:null,display:n.context.org_Name?n.context.org_Name:null})});var r=b("hasSearched",P),o=b("searchParams",P);if(console.log(t.state.json["10140CUSTPF-000035"]),console.log(o),r&&1===r){o&&0!=o&&e.search.setSearchValue(v,o.conditions);var s=e.search.getQueryInfo(v).oid,i={querycondition:{conditions:null==o?null:o.conditions},pageInfo:b("pageInfo",P)?b("pageInfo",P):e.table.getTablePageInfo(g),pagecode:m,queryAreaCode:v,oid:s,querytype:"tree"};(0,c.ajax)({url:k,data:i,success:function(n){n.data?e.table.setAllTableData(g,n.data[g]):(0,c.toast)({content:t.state.json["10140CUSTPF-000036"],color:"warning"})},error:function(e){console.log(e.message)}})}}if(n.button){var l=n.button;e.button.setButtons(l),e.button.setButtonVisible(["Commit","Print"],!1),e.button.setButtonDisabled(["delete","CommitGrp","Callback","PrintGrp","Output"],!0),e.button.setPopContent("delline",t.state.json["10140CUSTPF-000052"])}}})}},{key:"componentDidMount",value:function(){var e=this;this.props.MultiInit.getMultiLang({moduleId:"10140CUSTPF",domainName:"uapbd",callback:function(t,n,a){n&&e.setState({json:t,inlt:a},function(){e.initTemplate(e.props)})}})}},{key:"buttonClick",value:function(e,t){var n=e.table.getAllTableData(g),a=e.table.getCheckedRows(g);switch(t){case"add":e.pushTo("/card",{pagecode:j,appcode:y,status:"add"});var r="";a&&a[0]?r=a[0].data.values[C].value:n&&n.rows[0]&&(r=n.rows[0].values[C].value),h("preid",P,r);break;case"refresh":this.refreshAction(e);break;case"delete":(0,c.promptBox)({color:"warning",title:this.state.json["10140CUSTPF-000022"],content:this.state.json["10140CUSTPF-000039"],beSureBtnClick:this.deleteAction.bind(this)});break;case"CommitGrp":case"Commit":this.pfProcess(x);break;case"Callback":this.pfProcess(T);break;case"PrintGrp":case"Print":this.onPrint();break;case"Output":this.onOutput()}}},{key:"pfProcess",value:function(e,t){var n=this,a=["-1"];e==x?a=["-1"]:e==T&&(a=["1","3"]);var r=[];if(this.props.table.getCheckedRows(g).map(function(e){a.indexOf(e.data.values.approvestate.value)>=0&&r.push(e.data.values[C].value)}),0!=r.length){var o={pks:r,content:t};(0,c.ajax)({url:e,data:o,success:function(t){e==x?!t.data.workflow||"approveflow"!=t.data.workflow&&"workflow"!=t.data.workflow?((0,c.toast)({color:"success",content:n.state.json["10140CUSTPF-000041"]}),n.setState({compositedata:null,compositedisplay:!1}),n.refreshAction(n.props,!1)):n.setState({compositedata:t.data,compositedisplay:!0}):e==T&&((0,c.toast)({content:n.state.json["10140CUSTPF-000021"],color:"success"}),n.refreshAction(n.props,!1))}})}else(0,c.toast)({content:this.state.json["10140CUSTPF-000040"],color:"warning"})}},{key:"render",value:function(){var e=this.props,t=e.table,n=e.button,a=e.search,r=e.modal.createModal,o=t.createSimpleTable,s=a.NCCreateSearch,i=n.createButtonApp;n.getButtons,n.createButton;return l.default.createElement("div",{className:"nc-bill-list"},l.default.createElement("div",{className:"nc-bill-header-area"},l.default.createElement("div",{className:"header-title-search-area"},l.default.createElement("h2",{className:"title-search-detail"},this.state.json["10140CUSTPF-000001"])),l.default.createElement("div",{className:"header-button-area"},i({area:"header-button-area",buttonLimit:3,onButtonClick:this.buttonClick.bind(this),popContainer:document.querySelector(".header-button-area")}))),l.default.createElement("div",{className:"nc-bill-search-area"},s(this.searchId,{clickSearchBtn:this.clickSearchBtn.bind(this)})),l.default.createElement("div",{className:"nc-bill-table-area"},o(this.tableId,{handlePageInfoChange:this.pageInfoClick.bind(this),showIndex:!0,showCheck:!0,onRowDoubleClick:this.doubleClick.bind(this),dataSource:P,pkname:C,onSelected:this.onSelected.bind(this),onSelectedAll:this.onSelected.bind(this)})),r("delete",{title:this.state.json["10140CUSTPF-000016"],content:this.state.json["10140CUSTPF-000017"],beSureBtnClick:this.deleteAction.bind(this)}),l.default.createElement(d,{ref:"printOutput",url:S,data:{funcode:"10140CUSTPF",nodekey:"custpflist",oids:this.state.ids,outputType:"output"}}),this.state.compositedisplay?l.default.createElement(u.default,{title:this.state.json["10140CUSTPF-000034"],data:this.state.compositedata,display:this.state.compositedisplay,getResult:this.getAssginUsedr.bind(this),cancel:this.turnOff.bind(this)}):"",l.default.createElement(f,{show:this.state.approveDetailShow,close:this.closeApprove.bind(this),billtype:"10KH",billid:this.state.billid}))}}]),t}(),r=function(){var e=this;this.modifierMeta=function(t,n){return n[v].items=n[v].items.map(function(e,t){return"pk_org"==e.attrcode?(e.queryCondition={AppCode:y,TreeRefActionExt:"nccloud.web.refer.sqlbuilder.PrimaryOrgSQLBuilder"},e.isShowDisabledData=!0):"customerorg"==e.attrcode?(e.isShowDisabledData=!0,e.isMultiSelectedEnabled=!0):"pk_custclass"==e.attrcode&&(e.isShowDisabledData=!0,e.isMultiSelectedEnabled=!0,e.isShowUnit=!0),e.col="3",e}),n[g].pagination=!0,n[g].items=n[g].items.map(function(e,n){return e.width=150,"billnumber"==e.attrcode&&(e.render=function(e,n,a){return l.default.createElement("span",{style:{color:"#007ace",cursor:"pointer"},onClick:function(){var e=t.search.getAllSearchData(v);h("searchParams",P,e),h("preid",P,n[C].value),h("pageInfo",P,t.table.getTablePageInfo(g)),t.pushTo("/card",{pagecode:j,appcode:y,status:"browse",id:n[C].value})}},n&&n.billnumber&&n.billnumber.value)}),e}),n[g].items.push({itemtype:"customer",attrcode:"opr",label:e.state.json["10140CUSTPF-000019"],width:200,fixed:"right",className:"table-opr",visible:!0,render:function(n,a,r){var o="-1"==a.approvestate.value?["editline","delline"]:["approveinfo"];return t.button.createOprationButton(o,{area:"table-opr-area",buttonLimit:3,onButtonClick:function(t,o){return e.tableButtonClick(t,o,n,a,r)}})}}),n},this.tableButtonClick=function(t,n,a,r,o){switch(n){case"editline":e.valid(t,r,"edit",function(e,n){t.pushTo("/card",{pagecode:j,appcode:y,status:"edit",codeedit:e,vbillnumedit:n,id:r[C].value})});break;case"delline":(0,c.ajax)({url:w,data:{pk_org:b("pk_org",P),deleteinfo:[{pk_org:r.pk_org.value,id:r[C].value,ts:r.ts.value}]},success:function(n){n.success&&((0,c.toast)({color:"success",content:e.state.json["10140CUSTPF-000038"]}),t.table.deleteTableRowsByIndex(g,o))}});break;case"approveinfo":e.setState({approveDetailShow:!0,billid:r[C].value});break;default:console.log(n,o)}},this.valid=function(e,t,n,a){var r={pk:t[C].value,action:n};(0,c.ajax)({url:"/nccloud/uapbd/customer/CustApplyValid.do",data:r,success:function(e){var t=!e||!e.data||e.data.codeedit,n=!e||!e.data||e.data.vbillnumedit;a&&a(t,n)}})},this.getAssginUsedr=function(t){e.pfProcess(x,t)},this.turnOff=function(){e.setState({compositedata:null,compositedisplay:!1})},this.onPrint=function(){var t=e.props.table.getAllTableData(g);if(t&&0!==t.length&&0!==t.rows.length){var n=[];t.rows.forEach(function(e,t){n.push(e.values[C].value)}),(0,c.print)("pdf",S,{funcode:"10140CUSTPF",nodekey:"custpflist",oids:n})}else(0,c.toast)({content:e.state.json["10140CUSTPF-000029"],color:"warning"})},this.onOutput=function(){var t=e.props.table.getAllTableData(g);if(t&&0!==t.length&&0!==t.rows.length){var n=[];t.rows.forEach(function(e,t){n.push(e.values[C].value)}),e.setState({ids:n},e.refs.printOutput.open())}else(0,c.toast)({content:e.state.json["10140CUSTPF-000042"],color:"warning"})},this.doubleClick=function(t,n,a){console.log(e.state.json["10140CUSTPF-000043"]),console.log(e);var r=e.props.search.getAllSearchData(v);h("searchParams",P,r),h("preid",P,t[C].value),e.props.pushTo("/card",{pagecode:j,appcode:y,status:"browse",id:t[C].value})},this.deleteAction=function(){var t=e.props.table.getCheckedRows(g);console.log(t);var n={pk_org:b("pk_org",P),deleteinfo:t.map(function(e){return{pk_org:e.data.values.pk_org.value,id:e.data.values[C].value,ts:e.data.values.ts.value}})};console.log(n),(0,c.ajax)({url:w,data:n,success:function(t){(0,c.toast)({color:"success",content:e.state.json["10140CUSTPF-000038"]}),e.refreshAction(e.props,!1)}})},this.refreshAction=function(t){var n=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],a=t.search.getAllSearchData(v);if(console.log(a),0!=a){var r=t.search.getQueryInfo(v),s=r.oid,i=o({},r,{pageInfo:t.table.getTablePageInfo(g),pagecode:m,queryAreaCode:v,oid:s,querytype:"tree"});(0,c.ajax)({url:k,data:i,success:function(a){console.log(a),a.data?(t.table.setAllTableData(g,a.data[g]),n&&(0,c.toast)({color:"success",title:e.state.json["10140CUSTPF-000026"]})):(t.table.setAllTableData(g,{rows:[]}),n&&(0,c.toast)({content:e.state.json["10140CUSTPF-000036"],color:"warning"})),e.props.button.setButtonDisabled(["delete","CommitGrp","Callback","PrintGrp","Output"],!0)},error:function(e){console.log(e.message)}})}},this.pageInfoClick=function(t,n,a){t.table.getTablePageInfo(e.tableId),t.search.getAllSearchData(v);h("pageInfo",P,t.table.getTablePageInfo(g));var r={pk_org:b("pk_org",P),allpks:a,pageid:m};(0,c.ajax)({url:"/nccloud/uapbd/customer/CustApplyQueryPageGridByPks.do",data:r,success:function(e){var n=e.success,a=e.data;n&&(a?t.table.setAllTableData(g,a[g]):t.table.setAllTableData(g,{rows:[]}))}})},this.clickSearchBtn=function(t,n){h("hasSearched",P,1),h("pageInfo",P,t.table.getTablePageInfo(g));t.meta.getMeta();var a=t.search.getQueryInfo(v),r=a.oid;o({},a).querycondition.conditions=n.conditions,h("searchParams",P,a);var s=o({},a,{pageInfo:t.table.getTablePageInfo(g),pagecode:m,queryAreaCode:v,oid:r,querytype:"tree"});(0,c.ajax)({url:k,data:s,success:function(n){if(console.log(n),n.data){t.table.setAllTableData(e.tableId,n.data[g]);var a=n.data[e.tableId].allpks.length;(0,c.toast)({title:e.state.json["10140CUSTPF-000044"],content:e.state.json["10140CUSTPF-000045"]+a+e.state.json["10140CUSTPF-000046"],color:"success"})}else t.table.setAllTableData(e.tableId,{rows:[]}),(0,c.toast)({content:e.state.json["10140CUSTPF-000047"],color:"warning"})},error:function(e){console.log(e.message)}})},this.onSelected=function(){var t=e.props.table.getCheckedRows(g),n=!0,a=!0;t&&t.length>0?(e.props.button.setButtonDisabled(["delete","PrintGrp","Output"],!1),t.forEach(function(e,t){-1==e.data.values.approvestate.value&&(n=!1),3==e.data.values.approvestate.value&&(a=!1)}),1==t[0].data.values.approvestate.value&&(a=!1),e.props.button.setButtonDisabled(["CommitGrp"],n),e.props.button.setButtonDisabled(["Callback"],a)):e.props.button.setButtonDisabled(["delete","CommitGrp","Callback","PrintGrp","Output"],!0),e.setState(e.state)},this.closeApprove=function(){e.setState({approveDetailShow:!1})}},a);_=(0,c.createPage)({initTemplate:[]})(_),t.default=_},265:function(e,t,n){e.exports=n(266)},266:function(e,t,n){"use strict";var a=n(1);!function(e,t){(0,a.RenderRouter)(e,t)}(function(e){return e&&e.__esModule?e:{default:e}}(n(267)).default,"app")},267:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(1),r=function(e){return e&&e.__esModule?e:{default:e}}(n(239));var o=(0,a.asyncComponent)(function(){return n.e(2).then(n.t.bind(null,252,7))}),s=[{path:"/",component:r.default,exact:!0},{path:"/list",component:r.default},{path:"/card",component:o}];t.default=s},5:function(e,t){e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var n=function(e,t){var n=e[1]||"",a=e[3];if(!a)return n;if(t&&"function"==typeof btoa){var r=function(e){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(e))))+" */"}(a),o=a.sources.map(function(e){return"/*# sourceURL="+a.sourceRoot+e+" */"});return[n].concat(o).concat([r]).join("\n")}return[n].join("\n")}(t,e);return t[2]?"@media "+t[2]+"{"+n+"}":n}).join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var a={},r=0;r<this.length;r++){var o=this[r][0];"number"==typeof o&&(a[o]=!0)}for(r=0;r<e.length;r++){var s=e[r];"number"==typeof s[0]&&a[s[0]]||(n&&!s[2]?s[2]=n:n&&(s[2]="("+s[2]+") and ("+n+")"),t.push(s))}},t}},6:function(e,t,n){var a={},r=function(e){var t;return function(){return void 0===t&&(t=e.apply(this,arguments)),t}}(function(){return window&&document&&document.all&&!window.atob}),o=function(e){var t={};return function(e){return void 0===t[e]&&(t[e]=function(e){return document.querySelector(e)}.call(this,e)),t[e]}}(),s=null,i=0,l=[],c=n(148);function u(e,t){for(var n=0;n<e.length;n++){var r=e[n],o=a[r.id];if(o){o.refs++;for(var s=0;s<o.parts.length;s++)o.parts[s](r.parts[s]);for(;s<r.parts.length;s++)o.parts.push(m(r.parts[s],t))}else{var i=[];for(s=0;s<r.parts.length;s++)i.push(m(r.parts[s],t));a[r.id]={id:r.id,refs:1,parts:i}}}}function p(e,t){for(var n=[],a={},r=0;r<e.length;r++){var o=e[r],s=t.base?o[0]+t.base:o[0],i={css:o[1],media:o[2],sourceMap:o[3]};a[s]?a[s].parts.push(i):n.push(a[s]={id:s,parts:[i]})}return n}function d(e,t){var n=o(e.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var a=l[l.length-1];if("top"===e.insertAt)a?a.nextSibling?n.insertBefore(t,a.nextSibling):n.appendChild(t):n.insertBefore(t,n.firstChild),l.push(t);else{if("bottom"!==e.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");n.appendChild(t)}}function f(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e);var t=l.indexOf(e);t>=0&&l.splice(t,1)}function h(e){var t=document.createElement("style");return e.attrs.type="text/css",b(t,e.attrs),d(e,t),t}function b(e,t){Object.keys(t).forEach(function(n){e.setAttribute(n,t[n])})}function m(e,t){var n,a,r,o;if(t.transform&&e.css){if(!(o=t.transform(e.css)))return function(){};e.css=o}if(t.singleton){var l=i++;n=s||(s=h(t)),a=g.bind(null,n,l,!1),r=g.bind(null,n,l,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=function(e){var t=document.createElement("link");return e.attrs.type="text/css",e.attrs.rel="stylesheet",b(t,e.attrs),d(e,t),t}(t),a=function(e,t,n){var a=n.css,r=n.sourceMap,o=void 0===t.convertToAbsoluteUrls&&r;(t.convertToAbsoluteUrls||o)&&(a=c(a));r&&(a+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */");var s=new Blob([a],{type:"text/css"}),i=e.href;e.href=URL.createObjectURL(s),i&&URL.revokeObjectURL(i)}.bind(null,n,t),r=function(){f(n),n.href&&URL.revokeObjectURL(n.href)}):(n=h(t),a=function(e,t){var n=t.css,a=t.media;a&&e.setAttribute("media",a);if(e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}.bind(null,n),r=function(){f(n)});return a(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;a(e=t)}else r()}}e.exports=function(e,t){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(t=t||{}).attrs="object"==typeof t.attrs?t.attrs:{},t.singleton||(t.singleton=r()),t.insertInto||(t.insertInto="head"),t.insertAt||(t.insertAt="bottom");var n=p(e,t);return u(n,t),function(e){for(var r=[],o=0;o<n.length;o++){var s=n[o];(i=a[s.id]).refs--,r.push(i)}e&&u(p(e,t),t);for(o=0;o<r.length;o++){var i;if(0===(i=r[o]).refs){for(var l=0;l<i.parts.length;l++)i.parts[l]();delete a[i.id]}}}};var v=function(){var e=[];return function(t,n){return e[t]=n,e.filter(Boolean).join("\n")}}();function g(e,t,n,a){var r=n?"":a.css;if(e.styleSheet)e.styleSheet.cssText=v(t,r);else{var o=document.createTextNode(r),s=e.childNodes;s[t]&&e.removeChild(s[t]),s.length?e.insertBefore(o,s[t]):e.appendChild(o)}}}})});
//# sourceMappingURL=index.45568516.js.map