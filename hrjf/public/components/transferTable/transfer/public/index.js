import warning from 'warning';
import CONFIG from './config';
import moment from 'moment';
import { DongbaToLocalTime, LocalToDongbaTime } from './timer.js';

/*
 * @method   Object的深克隆（包括数组）
 * @author   add by yangguoqiang @18/03/01
 * @params 
 *     origin        {Object/Array}    生效条件，条件为false才执行
 * @return    {Object/Array}           返回同类型同值，指针地址改变，开辟新内存
 * @demo     deepClone([])
 */
export { default as deepClone } from './deepClone';

/*
 * @method   错误警告，只警告一次
 * @author   add by yangguoqiang @18/03/01
 * @params 
 *     condition     {Boolean.false}    生效条件，条件为false才执行
 *     format        {String}           提示语句
 *     arg           {[any]}            可选
 * @return   {undefined}       执行语句，无返回
 * @demo     warningOnce(false, '此处错误')
 */
const warned = {};
export function warningOnce(condition, format, arg) {
	if (!warned[format]) {
		warning(condition, format, arg);
		warned[format] = true;
	}
}

/*
 * @method   检测是否是常规的 Object  {} 这种形式
 * @author   add by yangguoqiang @18/03/05
 * @params 
 *     condition     {any}         
 * @return   {boolean}       返回ture/false
 * @demo     isObj()
 */
export function isObj(param) {
	return Object.prototype.toString.call(param).slice(8, -1) === 'Object';
}

/*
 * @method   if条件下为false   除去NaN、0、-0、false   剩余undefined、null、""
 * @author   add by yangguoqiang @18/03/19
 * @params 
 *     condition     {any}         
 * @return   {boolean}       返回ture/false
 * @demo     isWrong('')    因为后台返回数据不规范
 */
export function isWrong(param) {
	return typeof param === 'undefined' || param === null || param === '';
}

export function isNullOrVoid(param) {
	return typeof param === 'undefined' || param === null;
}

/*
 * @method   if条件下为false   除去NaN、0、-0、false   剩余undefined、null、""
 * @author   add by yangguoqiang @18/03/19
 * @params 
 *     condition     {any}         
 * @return   {boolean}       返回ture/false
 * @demo     isWrong('')    因为后台返回数据不规范
 */
export function isWrongFalse(param) {
	return typeof param === 'undefined' || param === null || param === '' || param === false;
}

/*
 * @method   检测是否是需要显示display的itemtype类型
 * @author   add by yangguoqiang @18/03/19
 * @params 
 *     condition     {any}         
 * @return   {boolean}       返回ture/false
 * @demo     isWrong('')    因为后台返回数据不规范
 */
export function isDisplay(param) {
	return CONFIG.displayTypes.includes(param);
}

/*
 * @method   检测是否是需要显示isValue的itemtype类型
 */

export function isValue(param) {
	return CONFIG.valueTypes.includes(param);
}

/*
 * @method   检测是否是是除了number的value类型
 */
export function isValueExceptNumber(param) {
	return CONFIG.valueTypesExceptNumber.includes(param);
}

/*
 * @method   转化东八区的时间值到具体的地区 
 * @author   add by sunlei @18/05/5
 */
// 转换东八区为当地时间
export function changeTime(time, format = 'YYYY-MM-DD') {
	if (time) {
		let newTime = DongbaToLocalTime(moment(time));
		return newTime.format(format);
	}

	// let BeijinVal = time && moment(time).toDate();
	// let beijingZoneHours = time && moment(time).toDate().getHours();
	// let offsetZone = new Date().getTimezoneOffset() / 60;
	// offsetZone += 8;
	// BeijinVal && BeijinVal.setHours(beijingZoneHours - offsetZone);
	//return time && moment(BeijinVal).format('YYYY-MM-DD');
}

/*
 * @method   检测转换时区类型的控件
 * @author   add by sunlei @18/05/5
 */

export function isTimeType(param) {
	return CONFIG.timeTypes.includes(param);
}

/*
 * @method   检测是否是需要是boolean类型
 * @author   add by yangguoqiang @18/04/11
 * @params 
 *     condition     {any}         
 * @return   {boolean}       返回ture/false
 * @demo     isWrong('')    因为后台返回数据不规范
 */
export function isBoolean(param) {
	return CONFIG.boolean.includes(param);
}

/*
 * @method   检测是否是boolean类型
 * @author   add by zhanghengh @18/06/22
 * @params 
 *     condition     {any}         
 * @return   {boolean}       返回ture/false
 */
export function isBooleanType(param) {
	return param === true || param === false;
}

/*
 * @method   测试不存在或者值为true 同等效力
 * @author   add by yangguoqiang @18/03/19
 * @params 
 *     one     {any}
 * @return   {boolean}       返回ture/false
 * @demo     undefinedOrTrue('')    
 */
export function undefinedOrTrue(one) {
	return typeof one === 'undefined' || one === true;
}

/*
 * @method   测试 不存在或者值为false 同等效力
 * @author   add by yangguoqiang @18/03/19
 * @params 
 *     one     {any}
 * @return   {boolean}       返回ture/false
 * @demo     undefinedOrfalse('')
 */
export function undefinedOrfalse(one) {
	return typeof one === 'undefined' || one === false;
}

/*
 * @method   根据不同类型初始化 null 输出后台可用的数据格式。
 * @author   add by yangguoqiang @18/03/19
 * @params 
 *     origin    {any}      数据来源
 *     type      {string}   数据类型
 * @return   {any}          返回
 * @demo     typeFormat('', 'string')
 */
export function typeFormat(origin, type) {
	let isVoid = isWrong.call(null, origin);
	switch (true) {
		// 'input', 'textarea', 'datepicker', 'select', 'checkbox', 'radio', 'refer', 'label' 和 number的空value处理
		case [ ...CONFIG.string, ...CONFIG.number ].includes(type) && isVoid:
			return '';
		// switch 的空value处理为boolean值
		case CONFIG.boolean.includes(type) && isVoid:
			return !!origin;
		default:
			return origin;
	}
}

/*
 * @method   检测是否是个数字(包括数字字符串  但是不包括 344. 这种)
 * @author   add by yangguoqiang @18/05/31
 * @params 
 *     val        {Any}      元数据
 * @return   {Boolean}       true/false
 * @demo     isRealNum(234533)
 */
export function isRealNum(val) {
	var patrn = /^(-)?\d+(\.\d+)?$/;
	if (patrn.exec(val) == null || val === '') {
		return false;
	} else {
		return true;
	}
}

/*
 * @method   把B字节的size转化为特定容量
 * @author   add by yangguoqiang @18/05/31
 * @params 
 *     bytes      {Number}      元数据
 *     fixed      {Number}      小数位数  默认为2位
 * @return   {String}           返回相应的数量
 * @demo     bytesToSize(234533, 2)
 */
export function bytesToSize(bytes, fixed, unit) {
	fixed = fixed || 2;
	if (bytes == 0 || typeof bytes === 'undefined' || !isRealNum(bytes))
		return fixed > 0 ? `0.${Array(fixed + 1).join('0')}B` : '0B';
	var k = 1024,
		sizes = [ 'B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB' ],
		i = isWrong(unit) ? Math.floor(Math.log(bytes) / Math.log(k)) : unit;
	return (bytes / Math.pow(k, i)).toFixed(fixed) + sizes[i];
}

/*
 * @method   是否是undefined
 * @author   add by yangguoqiang @18/05/31
 * @params 
 *     origin     {Any}      元数据
 * @return   {Boolean}          true/false
 * @demo     isUndefined(any)
 */
export function isUndefined(origin) {
	return typeof origin === 'undefined' || origin === void 0;
}

// 补0
export const addZero = (num, scale) => {
	if (num === '' || num === undefined || num === null) {
		return '';
	}

	if (scale > 0) {
		let start = String(num).split('.')[0];
		let end = String(num).split('.')[1];
		if (!end) {
			end = '';
		}
		let len = end.length;
		if (len < scale) {
			end = end.padEnd(scale, '0');
		}
		return start + '.' + end;
	} else {
		return num;
	}
};

//精度 + 补0 + 千分位综合处理
export function formatAcuracy(value, len = 0) {
	if (value === null || value === undefined || String(value).endsWith(this.state.json['jf6005-000007'])) {/* 国际化处理： 必输项*/
		return value;
	}
	return commafy(addZero(formatDot(value, len), len));
}

//移除千分位
export function removeThousands(val) {
	// 这里要区分 0 ‘’ null
	return val ? val.toString().replace(/\,/gi, '') : val;
}

//数字转换成千分位 格式
export function commafy(num) {
	let pointIndex, intPart, pointPart;
	if (num === '-') {
		return '-';
	}

	if (Number.isNaN(+(num + '').split(',').join(''))) {
		//这里暂时就处理一下千分位的逗号
		return '';
	}

	num = num + '';
	if (/^.*\..*$/.test(num)) {
		pointIndex = num.lastIndexOf('.');
		intPart = num.substring(0, pointIndex);
		pointPart = num.substring(pointIndex + 1, num.length);
		intPart = intPart + '';
		let re = /(-?\d+)(\d{3})/;
		while (re.test(intPart)) {
			intPart = intPart.replace(re, '$1,$2');
		}
		num = intPart + '.' + pointPart;
	} else {
		num = num + '';
		let re = /(-?\d+)(\d{3})/;
		while (re.test(num)) {
			num = num.replace(re, '$1,$2');
		}
	}
	return num;
}

// 精度处理
export function formatDot(value, len = 8) {
	let formatVal, dotSplit, val;

	val = (value || 0).toString();

	dotSplit = val.split('.');

	if (dotSplit.length > 2 || !value) {
		return value;
	}

	if (val.indexOf('.') > -1) {
		if (len == 0) {
			formatVal = dotSplit[0];
		} else {
			formatVal = val.substring(0, val.indexOf('.') + len + 1);
		}
	} else {
		formatVal = val;
	}

	return formatVal;
}

export function formatNumberByScale(value, len = 8) {
	return formatDot(removeThousands(value), len);
}
export function isEmpty(param) {
	let result = false;

	if (typeof param === 'object') {
		let hasvalue = false;
		for (var pro in param) {
			hasvalue = true;
			break;
		}
		result = !hasvalue;
	} else if (typeof param === 'string') {
		if (param === '') result = true;
	} else if (param === undefined) {
		result = true;
	}
	return result;
}

/* 检测类型是否为数组 */
export function isArray(param) {
	return Object.prototype.toString.call(param).slice(8, -1) === 'Array';
}

/* 检测类型是否为数组 */
export function isString(param) {
	return Object.prototype.toString.call(param).slice(8, -1) === 'String';
}

/* 检测类型是否为数组 */
export function isFunction(param) {
	return Object.prototype.toString.call(param).slice(8, -1) === 'Function';
}

/* 参照用 */
export function handleLoad(moduletype, moduleId, attrcode, refcode) {
	try {
		let Item = window[refcode].default;
		this.renderItem(moduletype, moduleId, attrcode, typeof Item === 'function' ? Item() : <Item />);
	} catch (e) {
		console.error(e.message);
		console.error(`${this.state.json['jf6005-000008']}${refcode}${this.state.json['jf6005-000009']}。${this.state.json['jf6005-000010']}config.json/buildEntryPath${this.state.json['jf6005-000011']}，${this.state.json['jf6005-000012']}`);/* 国际化处理： 请检查引用的,这个文件是源码还是编译好的,源码需要在,配相应的路径,编译好的则不用*/
	}
}

/* refcode */
export function createScript(moduletype, moduleId, attrcode, src) {
	var that = this,
		scripts = Array.from(document.getElementsByTagName('script')),
		s = src.split('/'),
		flag,
		refKey;
	refKey = s.slice(s.length - 5).join('/');
	refKey.includes('.js') && (refKey = refKey.substring(0, refKey.length - 3));
	flag = scripts.find((e) => {
		return e.src.includes(refKey);
	});
	if (window[refKey]) {
		// 已经加载过script标签
		handleLoad.call(that, moduletype, moduleId, attrcode, refKey);
	} else {
		let script;
		if (flag) {
			script = flag;
		} else {
			script = document.createElement('script');
			script.src = '../../../../' + refKey + '.js';
			script.type = 'text/javascript';
			document.body.appendChild(script);
		}

		script.onload = script.onload || handleLoad.bind(that, moduletype, moduleId, attrcode, refKey);
		script.onerror =
			script.onerror ||
			function() {
				console.error(`${this.state.json['jf6005-000013']}${src}${this.state.json['jf6005-000014']}，${this.state.json['jf6005-000015']}`);/* 国际化处理： 找不到,这个文件,请检查引用路径*/
			};
	}
}

export function createScripts(moduletype, moduleId, scriptList) {
	let that = this,
		finishFlag = true;
	// 多个script都加载完之后，再setState
	let scripts = Array.from(document.getElementsByTagName('script'));

	if (!Array.isArray(scriptList)) {
		return;
	}

	let refKeyList = scriptList.filter((e) => e.refcode).map((e) => {
		// window下全局变量的key的列表
		let refKey = e.refcode.split('/'),
			{ attrcode } = e;
		refKey = refKey.slice(refKey.length - 5).join('/');
		refKey.includes('.js') && (refKey = refKey.substring(0, refKey.length - 3));

		return { refKey, attrcode };
	});

	refKeyList.forEach(({ refKey, attrcode }, i) => {
		// 检查是否已加载过script
		let flag = scripts.find((e) => e.src.includes(refKey));
		if (flag) {
			// script loaded，说明加载js成功(包含失败，如404)
			if (window[refKey] === null) {
				refKeyList[i].success = false;
			} else if (window[refKey]) {
				refKeyList[i].success = true;
				try {
					// 尝试从randerItem里找到参照，找不到的话说明没有finish
					if (!that.state.renderItem[moduletype][moduleId].hasOwnProperty(attrcode)) {
						finishFlag = false;
					} else if (that.state.renderItem[moduletype][moduleId][attrcode] === null) {
						finishFlag = false;
					}
				} catch (e) {
					finishFlag = false;
				}
			}
		} else {
			let script = document.createElement('script');
			script.src = '../../../../' + refKey + '.js';
			script.type = 'text/javascript';
			document.body.appendChild(script);
			script.onload = function() {
				// 如果所有传进来的script都加载完（window里有对应的变量）
				if (window[refKey]) {
					refKeyList[i].success = true;
				} else {
					refKeyList[i].success = false;
					console.error(`${this.state.json['jf6005-000008']}${refKey}${this.state.json['jf6005-000009']}。${this.state.json['jf6005-000010']}config.json/buildEntryPath${this.state.json['jf6005-000011']}，${this.state.json['jf6005-000012']}`);/* 国际化处理： 请检查引用的,这个文件是源码还是编译好的,源码需要在,配相应的路径,编译好的则不用*/
				}
				finish.call(that);
			};
			script.onerror = function() {
				refKeyList[i].success = false;
				finish.call(that);
				console.error(`${this.state.json['jf6005-000013']}${refKey}${this.state.json['jf6005-000014']}，${this.state.json['jf6005-000015']}`);/* 国际化处理： 找不到,这个文件,请检查引用路径*/
			};
		}
	});
	if (!finishFlag) {
		finish.call(that);
	}
	function finish() {
		// 如果所有参照都加载完毕，则setState
		if (refKeyList.every((e) => e.hasOwnProperty('success'))) {
			let { renderItem } = this.state;
			refKeyList.forEach(({ refKey, attrcode, success }) => {
				renderItem = renderItem || {};
				renderItem[moduletype] = renderItem[moduletype] || {};
				renderItem[moduletype][moduleId] = renderItem[moduletype][moduleId] || {};
				if (success) {
					try {
						// 加载js成功
						let Item = window[refKey].default;
						renderItem[moduletype][moduleId][attrcode] = Item();
					} catch (e) {
						window[refKey] = null;
						renderItem[moduletype][moduleId][attrcode] =
							renderItem[moduletype][moduleId][attrcode] || undefined;
						console.error(`${refKey}${this.state.json['jf6005-000016']}，${this.state.json['jf6005-000017']}`);/* 国际化处理： 这个组件导出方式不对,请检查*/
					}
				} else if (success === false) {
					// 加载js失败，如404
					window[refKey] = null;
					renderItem[moduletype][moduleId][attrcode] =
						renderItem[moduletype][moduleId][attrcode] || undefined;
				}
			});
			this.setState({
				renderItem
			});
		}
	}
}

//判断数组A是否包含数组b
export function isContained(a, b) {
	if (!(a instanceof Array) || !(b instanceof Array)) return false;
	if (a.length < b.length) return false;
	var aStr = a.toString();
	for (var i = 0, len = b.length; i < len; i++) {
		if (aStr.indexOf(b[i]) == -1) return false;
	}
	return true;
}

export function getItem(moduleType, moduleId, item, props = {}) {
	let editItem = null,
		baseProps = {},
		value = {},
		{ renderItem } = this.state;
	// if (item.render) {
	// 	editItem = item.render.call(null, value.display || value.value, record, index);
	// } else
	if (renderItem[moduleType] && renderItem[moduleType][moduleId] && renderItem[moduleType][moduleId][item.attrcode]) {
		editItem = renderItem[moduleType][moduleId][item.attrcode];
	} else if (item.refcode) {
		createScript.call(this, moduleType, moduleId, item.attrcode, item.refcode);
	} else {
		switch (item.itemtype) {
			case 'input':
				editItem = <FormControl autoFocus={true} />;
				break;
			case 'label':
				editItem = <FormControl autoFocus={true} isViewMode />;
				break;
			case 'number':
				editItem = <Number autoFocus={true} scale={scale || item.scale || 0} />;
				break;
			case 'textarea':
				editItem = <textarea autoFocus={true} />;
				break;
			case 'datepicker':
				//	value = String(value);
				editItem = <NCTZDatePickClientHourTime autofocus={true} format="YYYY-MM-DD" locale={zhCN} />;
				break;
			case 'select':
				let fixed = model == 'open' ? { getPopupContainer: () => document.querySelector('#tableModal') } : {};
				editItem = (
					<Select {...fixed} autofocus>
						{item.options.length &&
							item.options.map((one, i) => (
								<Option key={i} value={String(one.value)}>
									{` ${one.display} `}
								</Option>
							))}
					</Select>
				);
				break;
			case 'radio':
				// 需要value
				editItem = (
					<RadioGroup selectedValue={String(value)}>
						{item.options.map((e, i) => {
							return (
								<Radio key={i} value={String(e.value)}>
									{e.display}
								</Radio>
							);
						})}
					</RadioGroup>
				);
				break;
			case 'switch':
				// status为true  代表是编辑态 不可编辑 disabled == true
				disabled = status ? 'on' : 'false';
				editItem = <Switch checked={!!value} />;
				break;
			default:
				editItem = null;
				break;
		}
	}

	switch (item.itemtype) {
		case 'select':
			value = String(value);
			break;
		case 'refer':
			value = {
				refname: isObj(record.values[item.attrcode]) ? record.values[item.attrcode].display || '' : '',
				refpk: isObj(record.values[item.attrcode]) ? record.values[item.attrcode].value || '' : ''
			};
			if (editItem && editItem.props.isMultiSelectedEnabled) {
				// 多选
				let names = value.refname ? value.refname.split(',') : [],
					pks = value.refpk ? value.refpk.split(',') : [];
				value = pks.map((e, i) => {
					return {
						refpk: e,
						refname: names[i]
					};
				});
			}
			break;
		default:
			break;
	}

	return {
		editItem,
		value,
		isdisabled: disabled
	};
}

/* 简单克隆对象 */
export function cloneObj(data) {
	let res = {};
	let clone = (data) => {
		for (let key in data) {
			if (isObj(data[key])) {
				res[key] = { ...data[key] };
				clone(data[key]);
			} else if (isArray(data[key])) {
				res[key] = data[key].concat();
			} else {
				res[key] = { ...data[key] };
			}
		}
	};
	clone(data);
	return res;
}

/**
 * 判断两个对象是否内容相等
 */
export function isObjContEqual(a, b) {
	let aProps = Object.keys(a);
	let bProps = Object.keys(b);

	if (aProps.length !== bProps.length) {
		return false;
	}

	for (let i = 0; i < aProps.length; i++) {
		let propName = aProps[i];
		if (a[propName] !== b[propName]) {
			return false;
		}
	}
	return true;
}

/* 检测类型是否为数字 */
export function isNumber(param) {
	return Object.prototype.toString.call(param).slice(8, -1) === 'Number' && !Number.isNaN(param);
}

/* 获取参数 */
export function getParamByLocation(queryString, pop) {
	let result = '';
	queryString = queryString.substring(1);
	if (queryString) {
		let paramsArr = queryString.split('&');
		if (paramsArr && paramsArr instanceof Array) {
			paramsArr.forEach((item) => {
				if (item.indexOf('=') != -1 && item.split('=') && item.split('=') instanceof Array) {
					if (item.split('=')[0] === pop) {
						if (item.split('=')[1]) {
							result = decodeURIComponent(item.split('=')[1]);
						}
					}
				}
			});
		}
	}
	return result;
}
