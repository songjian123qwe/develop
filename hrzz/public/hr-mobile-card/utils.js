/**
 * 判断是否是对象
 * @param {object} obj
 */
export const isObject = (obj) => {
    let toSting = Object.prototype.toString
    return toSting.call(obj) === '[object Object]'
}
/**
 * 判断指定类型
 * @param {any} obj
 * @param {string} T
 */
export const isT = (obj, T) => {
    let toSting = Object.prototype.toString
    return toSting.call(obj) === `[object ${T}]`
}

/**
 * 链式取值
 */
export class Maybe {
    constructor(val) {
        this.__value = val
        this.cacheValue = null
    }

    static of(val) {
        return new Maybe(val)
    }

    setValue(val) {
        let cache = !this.cacheValue ? this.__value : this.cacheValue
        if (new RegExp(/\[\d+\]/g).test(val)) {
            let num = val.match(new RegExp(/(?!\[)(\d+)(?=\])/g))[0]
            let name = val.match(new RegExp(/^\w*(?=\[)/g))[0]
            this.cacheValue = cache[name][num]
            return
        }
        this.cacheValue = cache[val]
    }

    getValue(args) {
        args.map(obj => {
            this.setValue(obj)
        })
        return this.cacheValue
    }
}

/**
 * 是否是关联表
 * @param {object} meta
 */
export const isFormRelation = (meta) => {
    return !!(getRelationArr(meta).length)
}
/**
 * 是否是meta
 * @param {object} obj
 */
export const isMeta = (obj) => {
    return Maybe.of(obj).getValue(['moduletype'])
}
/**
 * 获取关联对应关系
 * @param {object} meta
 */
export const getRelationArr = meta => {
    let formrelation = Maybe.of(meta).getValue(['formrelation'])
    return formrelation ? Object.keys(formrelation) : Object.keys({})
}

/**
 * 获取模板参照信息
 * @param {object} options
 */
export function getReferConf(options) {
    // JSONP
    function createJsonp() {
        var script = document.createElement('script'),
            timeName = new Date().getTime() + Math.round(Math.random() * 1000),
            callback = 'JSONP_' + timeName;

        window[callback] = function (data) {
            clearTimeout(timeout_flag);
            document.body.removeChild(script);
            success(data);
        };
        script.src = url + (url.indexOf('?') > -1 ? '&' : '?') + 'callback=' + callback;
        script.type = 'text/javascript';
        document.body.appendChild(script);
        setTime(callback, script);
    }

    //设置请求超时
    function setTime(callback, script) {
        if (timeOut !== undefined) {
            timeout_flag = setTimeout(function () {
                if (dataType === 'jsonp') {
                    delete window[callback];
                    document.body.removeChild(script);
                } else {
                    timeout_bool = true;
                    xhr && xhr.abort();
                }
                console.log('timeout');
            }, timeOut);
        }
    }

    //
    function getReferConfByStr(str) {
        let trimStr = str.replace(/[\r\n\s]/g, '')
        const fieldArr = [
            'queryTreeUrl', 'queryGridUrl', 'domainName', 'refType', 'moduleId', 'currentLocale', 'columnConfig'
        ]
        let obj = {}
        fieldArr.map(field => {
            let regexp = `(?=${field}:['"])([^,]*)(["'])`
            console.log(field)
            if (field === 'columnConfig') {
                regexp = `columnConfig:(\\[{.*}\\])`
            }
            let result = trimStr.match(new RegExp(regexp, 'g'))
            if (result) {
                const index = options.urlIndex !== undefined ? options.urlIndex : result.length - 1;
                if (field === 'columnConfig') {
                    obj[field] = result[index].match(/(\w:)(.*)/)[2]
                } else {
                    obj[field] = result[index].match(/(\w:['"])([^'"]*)/)[2]
                }
            }
        })
        return obj
    }

    // XHR
    function createXHR() {
        //由于IE6的XMLHttpRequest对象是通过MSXML库中的一个ActiveX对象实现的。
        //所以创建XHR对象，需要在这里做兼容处理。
        function getXHR() {
            if (window.XMLHttpRequest) {
                return new XMLHttpRequest();
            } else {
                //遍历IE中不同版本的ActiveX对象
                var versions = ['Microsoft', 'msxm3', 'msxml2', 'msxml1'];
                for (var i = 0; i < versions.length; i++) {
                    try {
                        var version = versions[i] + '.XMLHTTP';
                        return new ActiveXObject(version);
                    } catch (e) {
                    }
                }
            }
        }

        //创建对象。
        xhr = getXHR();
        xhr.open(type, url, async);
        //设置请求头
        if (type === 'post' && !contentType) {
            //若是post提交，则设置content-Type 为application/x-www-four-urlencoded
            xhr.setRequestHeader('Content-Type', 'application/x-www-four-urlencoded;charset=UTF-8');
        } else if (contentType) {
            xhr.setRequestHeader('Content-Type', contentType);
        }
        xhr.withCredentials = true;
        //添加监听
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (timeOut !== undefined) {
                    //由于执行abort()方法后，有可能触发onreadystatechange事件，
                    //所以设置一个timeout_bool标识，来忽略中止触发的事件。
                    if (timeout_bool) {
                        return;
                    }
                    clearTimeout(timeout_flag);
                }
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                    success(getReferConfByStr(xhr.responseText));
                } else {
                    error(xhr.status, xhr.statusText);
                }
            }
        };
        //发送请求
        xhr.send(type === 'get' ? null : getReferConfByStr(data));
        setTime(); //请求超时
    }

    var url = options.url || '', //请求的链接
        type = (options.type || 'get').toLowerCase(), //请求的方法,默认为get
        data = options.data, //|| JSON.stringify({}), //请求的数据
        contentType = options.contentType || '', //请求头
        dataType = options.dataType || '', //请求的类型
        async = options.async === undefined ? true : options.async, //是否异步，默认为true.
        timeOut = options.timeOut, //超时时间。
        before = options.before || function () {
        }, //发送之前执行的函数
        error = options.error || function () {
        }, //错误执行的函数
        success = options.success || function () {
        }; //请求成功的回调函数
    var timeout_bool = false, //是否请求超时
        timeout_flag = null, //超时标识
        xhr = null; //xhr对角
    //setData();
    before();
    if (dataType === 'jsonp') {
        createJsonp();
    } else {
        createXHR();
    }
}

export const formatDate = (time, separator = '-', type = 'yyyy-MM-dd') => {
    if (!time && typeof (time) !== 'number') {
        return ''
    }
    // 后台返回的时间戳可能是字符串类型的可能是几个时间戳
    let ary = []
    let date
    if (time instanceof Date) {
    } else {
        time = time && parseInt(time)
    }
    date = new Date(time)
    let year = date.getFullYear()
    let month = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
    let hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
    let min = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
    let sec = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()
    switch (type) {
        case 'YY-MM':
            ary = [year, month]
            break
        case 'YY-MM-DD':
            ary = [year, month, day]
            break
        case 'YYYY-MM-DD HH:mm':
            ary = [[[year, month, day].join('-'),
                [hour, min].join(':')].join(' ')];
            break;
        case 'hh-mm':
            ary = [hour, min]
            break
        case 'hh-mm-ss':
            ary = [hour, min, sec]
            break
        case 'MM-dd':
            ary = [month, day]
            break
        // 假勤单据只显示到分
        case 'Y-M-d-h-m-0':
            let str5 = [year, month, day].join('-')
            let str6 = [hour, min, '00'].join(':')
            ary = [str5, str6]
            break
        case 'Y-M-d-h-m-s':
            let str1 = [year, month, day].join('-')
            let str2 = [hour, min, sec].join(':')
            ary = [str1, str2]
            break
        // 配合导出表格的文件名。。。
        case 'y-m-d-h-m-s':
            let str3 = [year, month, day].join('-')
            let str4 = [hour, min, sec].join('-')
            ary = [str3, str4]
            break
        // 显示到分
        case 'y-m-d-h-m':
            let str7 = [year, month, day].join('/')
            let str8 = [hour, min].join(':')
            ary = [str7, str8]
            break
        // mm-dd hh:mm
        case 'm-d-h-m':
            let str9 = [month, day].join('/')
            let str10 = [hour, min].join(':')
            ary = [str9, str10]
            break
        case 'Y-M-d h-m-s':
            let str11 = [year, month, day].join('-')
            let str12 = ' ' + [hour, min, sec].join(':')
            ary = [str11, str12]
            break
        default:
            ary = [year, month, day]
    }
    return ary.join(separator)
}
const extend = Object.assign
export const reactComposition = (userSettings) => {
    let returnProps = {}
    let defaultSettings = {
        onChange: null,
    }
    let settings = extend(defaultSettings, userSettings)
    let defaultReactCompositionStatus = function () {
        return {
            composition: false
        }
    }
    let data = {
        get: function (event) {
            return event.target.__REACT_COMPOSITION_SECRET_DATA || defaultReactCompositionStatus()
        },
        set: function (event, obj) {
            event.target.__REACT_COMPOSITION_SECRET_DATA = obj
        },
        extend: function (event, obj) {
            event.target.__REACT_COMPOSITION_SECRET_DATA = extend(event.target.__REACT_COMPOSITION_SECRET_DATA || defaultReactCompositionStatus(), obj)
        }
    }
    returnProps.onChange = function (event) {
        event.reactComposition = data.get(event)
        if (settings.onChange) {
            settings.onChange(event)
        }
    }
    returnProps.onCompositionStart = function (event) {
        if (settings.onCompositionStart) {
            settings.onCompositionStart(event)
        }
        data.extend(
            event,
            {
                composition: true
            }
        )
    }
    returnProps.onCompositionUpdate = function (event) {
        if (settings.onCompositionUpdate) {
            settings.onCompositionUpdate(event)
        }
    }
    returnProps.onCompositionEnd = function (event) {
        if (settings.onCompositionEnd) {
            settings.onCompositionEnd(event)
        }
        data.extend(
            event,
            {
                composition: false
            }
        )
        // chrome 某些版本 onCompositionEnd 执行时间在 onChange 之后
        // 大部分浏览器执行实际是 onCompositionEnd 在 onChange 之前
        event.reactComposition = data.get(event)
        settings.onChange(event)
    }
    return returnProps
}
/**
 * 计算字符串的字节长度
 * @param str
 * @param charset
 * @returns {number}
 */
export const sizeof = (str, charset = '') => {
    let total = 0,
        charCode,
        i,
        len;
    charset = charset ? charset.toLowerCase() : '';
    if (charset === 'utf-16' || charset === 'utf16') {
        for (i = 0, len = str.length; i < len; i++) {
            charCode = str.charCodeAt(i);
            if (charCode <= 0xffff) {
                total += 2;
            } else {
                total += 4;
            }
        }
    } else {
        for (i = 0, len = str.length; i < len; i++) {
            charCode = str.charCodeAt(i);
            if (charCode <= 0x007f) {
                total += 1;
            } else if (charCode <= 0x07ff) {
                total += 2;
            } else if (charCode <= 0xffff) {
                total += 3;
            } else {
                total += 4;
            }
        }
    }
    return total;
};

/**
 * @param meta 当前字段配置数据
 * @param value 修改前的数据
 * @returns {{display: *, value: boolean}|{display: *, value: string}|{display: string, value: boolean}}
 * 三种格式数据
 * 1.[{display:'是',value: true}]
 * 2.[{display:'是',value: 'Y'}]
 * 3.没有options,value只有true和false
 *
 * 注意，判断value的时候最好加上Y和N的判断，以防有些数据有问题
 */
export const formatSwitch = (meta, value) => {
    if (meta.options && meta.options.length) {
        if (isT(meta.options[0].value, 'String')) {
            return {
                value: !value || value === 'N' ? 'Y' : 'N',
                display: !value || value === 'N' ?
                    meta.options.find(option => option.value === 'Y').display :
                    meta.options.find(option => option.value === 'N').display
            }
        } else {
            return {
                value: !value || value === 'N',
                display: !value || value === 'N' ?
                    meta.options.find(option => option.value).display :
                    meta.options.find(option => !option.value).display
            }
        }
    }
    return {
        value: !value || value === 'N',
        display: !value || value === 'N' ? '是' : '否'
    }
};

//Number根据精度截断
export const ncSplit = (value, scale) => {
    // 如果没有精度，不需要处理
    if (!scale) return value;
    let [_value, _scale] = [value, scale];
    if (
        !Object.prototype.toString.call(scale) !== "[object Number]" &&
        !isNaN(Number(scale))
    )
        _scale = Number(scale);

    // 校验参数
    if (Object.prototype.toString.call(value) !== "[object String]")
        _value = String(value);
    const re = /^([-+])?(\d+)?\.?(\d+)?$/;
    if (!re.test(_value)) {
        return value;
    }
    // 分割value
    let [beforePoint, afterPoint] = _value.split(".");
    // 有小数位数
    if (afterPoint && afterPoint !== "") {
        // 判断小数位数与精度的关系
        if (afterPoint.length > _scale) {
            _value = Number(_value);
            // 进行四舍五入操作
            _value = Number(_value.toFixed(_scale + 1));
            _value = _value * Math.pow(10, _scale);
            //_value = Math.round(_value); 四舍五入处理
            _value = Math.floor(_value);
            _value = _value / Math.pow(10, _scale);
        }
    }
    return _value;
};