import Immutable from 'immutable';
import getBusinessInfo from '../getBusinessInfo';
import Gzip from '../gzip';
import {encrypt, decrypt, jsonToEncrypt, opaqueEncrypt, opaqueDecrypt} from "../cipher";

const aeskey = '4fa8959db7b4423a99f056e299914128';

function ViewModelInstance() {
	var viewModel = new Map().set('data', new Map()).set('metadata', new Map()).set('cstate', new Map());
	var $$viewModel = Immutable.Map().set('data', Immutable.Map()).set('metadata', Immutable.Map());

	this.setData = (namespace, v, isReturnImmutableData) => {
		viewModel.get('data').set(namespace, v);
		let $$returnV;
		if (!(typeof isReturnImmutableData == 'undefined')) {
			if (isReturnImmutableData) {
				let $$initV = Immutable.fromJS(v);
				let $$newV = Immutable.Map().set(namespace, $$initV);
				$$viewModel = $$viewModel.set('data', $$newV);
				$$returnV = $$initV.toJS();
			}
		}
		return $$returnV;
	};

	this.setComponentState = (cid, namespace, v) => {
		viewModel.get('cstate').set(namespace + cid, v);
	};

	this.getComponentState = (cid, namespace) => viewModel.get('cstate').get(namespace + cid);

	this.getContext = () => {
		let c = viewModel.sys_Context;
		if (!c) {
			c = this.initContext();
		}
		let businessInfo = getBusinessInfo();
		if (businessInfo && businessInfo !== {}) {
			Object.assign(c, businessInfo);
		}
		return c;
	};

	this.initContext = () => {
		let c = (viewModel.sys_Context = {
			environment: {},
			currentOrg: '',
			currentLang: '',
			businessDate: '',
			groupId: '',
			groupName: '',
			userId: '',
			userName: '',
			userCode: '',
			projectCode: ''
		});

		return c;
	};

	this.setGlobalStore = (key, value) => {
		/*******   修改cookie备份    ******/
		// let infosFromCookie = this.getCookie(key);
		// let infosFromLocalStorage = localStorage.getItem(key);
		// if (!infosFromCookie && !infosFromLocalStorage) {
		// 	this.setCookie(key, value);
		// 	if (!this.getCookie(key)) {
		// 		localStorage.setItem(key, JSON.stringify(value));
		// 	}
		// } else if (infosFromCookie) {
		// 	if (value !== this.getCookie(key)) {
		// 		this.setCookie(key, value);
		// 	}
		// } else if (infosFromLocalStorage) {
		// 	if (JSON.stringify(value) !== localStorage.getItem(key)) {
		// 		this.setCookie(key, value);
		// 	}
		// }
		let infosFromLocalStorage = localStorage.getItem(key);
		if (!infosFromLocalStorage) {
			localStorage.setItem(key, JSON.stringify(value));
		} else if (JSON.stringify(value) !== localStorage.getItem(key)) {
			localStorage.setItem(key, JSON.stringify(value));
		}
	};

	this.isJSON = str => {
		if (typeof str == 'string') {
			try {
				JSON.parse(str);
				return true;
			} catch (e) {
				window.console.log(e);
				window.console.log(str + ':  不是JSON字符串');
				return false;
			}
		}
	};

	this.getGlobalStore = key => {
		if (key) {
			// let infosFromCookie = this.getCookie(key);
			// let infosFromLocalStorage = localStorage.getItem(key);
			// if (!infosFromCookie && !infosFromLocalStorage) {
			// 	return null;
			// } else if (infosFromCookie) {
			// 	if(this.isJSON(infosFromCookie)){
			// 		return JSON.parse(infosFromCookie);
			// 	}else{
			// 		return infosFromCookie;
			// 	}
			// } else if (infosFromLocalStorage) {
			// 	if(this.isJSON(infosFromLocalStorage)){
			// 		return JSON.parse(infosFromLocalStorage);
			// 	}else{
			// 		return infosFromLocalStorage;
			// 	}
			// }
			let infosFromLocalStorage = localStorage.getItem(key);
			if (!infosFromLocalStorage) {
				return null;
			} else {
				if (this.isJSON(infosFromLocalStorage)) {
					return JSON.parse(infosFromLocalStorage);
				} else {
					return infosFromLocalStorage;
				}
			}
		}
	};

	this.removeGlobalStore = key => {
		//this.removeCookie(key);
		localStorage.removeItem(key);
	};

	this.clearBrowersStore = () => {
		localStorage.clear();
		//this.removeCookie();
	};

	// -- 处理Storage公共方法
	/**
	 * 设置本地缓存
	 * @param {*string} store
	 * @param {*string} key 
	 * @param {*} value 
	 */
	this.setGlobalStorage = (store, key, value) => {
		if (!store) {
			return;
		}

		let storage = getStorage(store),
			storeCipher = localStorage.getItem('storeCipher') != '0';

		if (storeCipher) {
			value = encrypt(String(value), aeskey);
		}
		storage.setItem(key, value);
	};

	/**
	 * 获取本地缓存
	 * @param {*string} store
	 * @param {*string} key 
	 */
	this.getGlobalStorage = (store, key) => {
		let storage = getStorage(store);
		if (key) {
			if (!store) {
				return;
			}
			let value = storage.getItem(key),
				storeCipher = localStorage.getItem('storeCipher') != '0';
			if (storeCipher && value !== null) {
				value = decrypt(value, aeskey);
			}
			return value;
		}
	};

	/**
	 * 获取解密数据
	 * @param {*string} data
	 */
	this.getDecryptData = (data) => {
		return localStorage.getItem('storeCipher') != '0' && data !== null ? decrypt(data, aeskey) : data;
	};

	/**
	 * 删除本地缓存
	 * @param {*string} store
	 * @param {*string} key 
	 */
	this.removeGlobalStorage = (store, key) => {
		if (!store) {
			return;
		}
		let storage = getStorage(store);
		if (key) {
			storage.removeItem(key);
		}
	};

	this.setCookie = (key, value, path, domain, day) => {
		value = JSON.stringify(value);
		let expires = '',
			setPath,
			setdomain;
		if (day) {
			let d = new Date();
			d.setDate(d.getDate() + day);
			expires = '; expires=' + d.toUTCString();
		}
		if (path) {
			setPath = `; path=${path}`;
		} else {
			setPath = '; path=/nccloud';
		}
		if (domain) {
			setdomain = `; setdomain=${domain}`;
			document.cookie = key + '=' + value + expires + setPath + setdomain;
		} else {
			document.cookie = key + '=' + value + expires + setPath;
		}
	};

	this.getCookie = key => {
		let cookies = document.cookie;
		let allCookies = cookies.split('; ').reduce((o, item) => {
			let arr = item.split('=');
			let firstIndex = item.indexOf('=');
			o[item.substring(0, firstIndex)] = item.substring(firstIndex + 1);
			return o;
		}, {});
		if (key) return allCookies[key];
		return allCookies;
	};

	this.removeCookie = key => {
		let allCookies = this.getCookie();
		if (key) {
			this.setCookie(key, null, null, null, -1);
		} else {
			for (let attr in allCookies) {
				this.setCookie(attr, null, null, null, -1);
			}
		}
	};

	/**
     * 计算字符串的长度
     * fontSize:字体大小  String
     * fontFamily：字体系列  String
     * text：字符串  String
     */
	this.textSize = (
		text,
		fontSize = '12px',
		fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei"'
	) => {
		var span = document.createElement('span');
		var result = {};
		result.width = span.offsetWidth;
		result.height = span.offsetHeight;
		span.style.visibility = 'hidden';
		span.style.fontSize = fontSize;
		span.style.fontFamily = fontFamily;
		span.style.display = 'inline-block';
		document.body.appendChild(span);
		if (typeof span.textContent != 'undefined') {
			span.textContent = text;
		} else {
			span.innerText = text;
		}
		result.width = parseFloat(window.getComputedStyle(span).width) - result.width;
		result.height = parseFloat(window.getComputedStyle(span).height) - result.height;
		return result;
	};

	this.srcriptAlreadyExist = src => {
		let allScript = document.getElementsByTagName('script');
		let srcriptUrl = Array.from(allScript).map(element => {
			return element.getAttribute('src');
		});
		let index = srcriptUrl.findIndex(val => val === src);
		return index !== -1 ? true : false;
	};

	//存 储业务数据
	this.getRenderPageData = {};

	//存 加载二开业务数据加载完成的回调
	this.dataAlreadyLoaded = null;

	//存 模板
	this.getTemplate = {};

	//存 模板请求回来之后二开的回调
	this.templateAlreadyLoaded = null;

	this.getData = namespace => viewModel.get('data').get(namespace);

	this.setMetadata = (namespace, v) => {
		viewModel.get('metadata').set(namespace, v);
	};
	this.getMetadata = namespace => viewModel.get('metadata').get(namespace);

	this.getImmutableDataByNamespace = function getImmutableDataByNamespace(namespace) {
		let v = Immutable.fromJS({});
		let oldV = viewModel.getIn([DATA, namespace]);
		if (oldV) {
			v = Immutable.fromJS(oldV);
			viewModel = viewModel.setIn([DATA, namespace], v);
		} else {
			viewModel = viewModel.set(DATA, '{' + namespace + ':{}}');
		}
		return viewModel.getIn([DATA, namespace]);
	};
}
function getViewModel() {
	if (!window.ViewModel) window.ViewModel = new ViewModelInstance();
	return window.ViewModel;
}
const ViewModel = getViewModel();
export default ViewModel;

function history(initialModel) {
	var history = [Immutable.Map(initialModel)];
	var historyIndex = 0;
	Object.defineProperty(this, 'state', {
		get: function () {
			return new Immutable.Map(history[historyIndex]).toJS();
		},

		set: function (s) {
			var currentState = history[historyIndex];
			if (typeof s === 'function') {
				s = s(history[historyIndex].toJS());
			}

			var newState = currentState.merge(s);
			history = history.slice(0, historyIndex + 1);
			history.push(newState);
			historyIndex++;
			return new Immutable.Map(history[historyIndex]).toJS();
		}
	});

	this.setState = (s, asIterable) => {
		if (typeof s === 'function') {
			if (asIterable === true) {
				s = s(this.getImmutableState());
			} else {
				s = s(this.state);
			}
		}
		var newState = this.getImmutableState().merge(s);
		history = history.slice(0, historyIndex + 1);
		history.push(newState);
		historyIndex++;
		return this.state;
	};

	this.getImmutableState = () => {
		return new Immutable.Map(history[historyIndex]);
	};

	this.getInitialState = () => {
		return new Immutable.Map(history[0]).toJS();
	};

	this.getStateAtVersion = index => {
		return new Immutable.Map(history[index]).toJS();
	};

	this.reset = force => {
		var _initialState = this.getInitialState();
		if (force === true) {
			history = [new Immutable.Map(_initialState)];
			historyIndex = 0;
		} else {
			history.push(new Immutable.Map(_initialState));
			historyIndex++;
		}
		return this.state;
	};

	this.rewind = n => {
		if (n < 0) n = 0;
		var target = historyIndex - n;
		if (target > 0) {
			historyIndex = target;
		} else {
			historyIndex = 0;
		}
		return this.state;
	};

	Object.defineProperty(this, 'canUndo', {
		get: function () {
			return historyIndex > 0;
		}
	});

	Object.defineProperty(this, 'canRedo', {
		get: function () {
			return historyIndex !== history.length - 1;
		}
	});

	this.undo = () => {
		if (this.canUndo) {
			historyIndex = historyIndex - 1;
		}
		return this.state;
	};

	this.redo = () => {
		if (this.canRedo) {
			historyIndex++;
		}
		return this.state;
	};

	this.getIndex = () => {
		return historyIndex;
	};
}

function getStorage(store) {
	let storage = localStorage;
	if (store === 'sessionStorage') {
		storage = sessionStorage;
	}
	//resetStorage(storage);
	return storage;
}

function resetStorage(storage) {
	if (!storage.resetFlag) {
		storage.clear();
		storage.resetFlag = 1;
	}
}