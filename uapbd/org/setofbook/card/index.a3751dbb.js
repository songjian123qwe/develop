!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("nc-lightapp-front"),require("react")):"function"==typeof define&&define.amd?define(["nc-lightapp-front","react"],t):"object"==typeof exports?exports["uapbd/org/setofbook/card/index"]=t(require("nc-lightapp-front"),require("react")):e["uapbd/org/setofbook/card/index"]=t(e["nc-lightapp-front"],e.React)}(window,function(e,t){return function(e){var t={};function o(r){if(t[r])return t[r].exports;var n=t[r]={i:r,l:!1,exports:{}};return e[r].call(n.exports,n,n.exports,o),n.l=!0,n.exports}return o.m=e,o.c=t,o.d=function(e,t,r){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(o.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)o.d(r,n,function(t){return e[t]}.bind(null,n));return r},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="../../../../",o(o.s=400)}({1:function(t,o){t.exports=e},2:function(e,o){e.exports=t},278:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var o=0;o<t.length;o++){var r=t[o];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,o,r){return o&&e(t.prototype,o),r&&e(t,r),t}}(),n=o(2),a=function(e){return e&&e.__esModule?e:{default:e}}(n),i=o(1);i.base.NCMessage,i.base.NCCol,i.base.NCRow,i.base.NCDropdown;var u=i.base.NCMenu,c=(i.base.NCButton,i.base.NCCheckbox,i.base.NCTooltip,i.base.NCMenu),s=(i.base.NCDropdown,i.base.NCCheckbox,i.base.NCPopconfirm,c.NCMenuGroup,u.Item,"setofbook"),f=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var o=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return o.loadMeta(function(){var e={areaType:"form",areacode:s,rows:{0:{values:o.props.config.selectData}}};"add"!=o.props.config.toFormStatus?(o.props.form.setAllFormValue(function(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}({},s,e)),o.props.form.setFormItemsDisabled(s,{pk_accsystem:!1})):o.props.form.setFormItemsDisabled(s,{pk_accsystem:!0})}),o}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,n.Component),r(t,[{key:"loadMeta",value:function(e){var t=this.props;t.createUIDom({pagecode:"10100SOB_sobcard"},function(o){if(o&&o.template){var r=o.template;t.modifierFormMeta(r,t.config.selectData,t.config.toFormStatus),r[s].items.find(function(e){return"isaccountbook"===e.attrcode}).required=!0,t.meta.setMeta(r,function(){t.form.setFormStatus(s,t.config.toFormStatus)}),e()}})}},{key:"componentDidUpdate",value:function(){"edit"===this.props.formCurrState||"add"===this.props.formCurrState?window.onbeforeunload=function(){return""}:window.onbeforeunload=null}},{key:"onAfterFormEvent",value:function(e,t,o,r,n){var a=this;if("isaccountbook"==o||"pk_accperiodscheme"==o){var i=this.props.meta.getMeta(),u=this.props.form.getFormItemsValue(t,"isaccountbook"),c=this.props.form.getFormItemsValue(t,"pk_accperiodscheme");u&&u.value&&c&&c.value?i[s].items.map(function(e){"pk_accsystem"==e.attrcode&&(e.required=!0,a.props.form.setFormItemsDisabled(t,{pk_accsystem:!1}),a.props.form.setFormItemsValue(t,e))}):i[s].items.map(function(e){"pk_accsystem"==e.attrcode&&(e.required=!1,a.props.form.setFormItemsDisabled(t,{pk_accsystem:!0}),a.props.form.setFormItemsValue(t,{pk_accsystem:{}}))})}}},{key:"render",value:function(){var e=this.props,t=e.form,o=e.button,r=t.createForm;o.createButton;return a.default.createElement("div",null,a.default.createElement("div",{className:"card-area"},r(s,{onAfterEvent:this.onAfterFormEvent.bind(this)})))}}]),t}();t.default=f=(0,i.createPage)({billinfo:{billtype:"form",pagecode:"10100SOB_sobcard",headcode:s},initTemplate:function(){}})(f)},400:function(e,t,o){e.exports=o(278)}})});
//# sourceMappingURL=index.a3751dbb.js.map