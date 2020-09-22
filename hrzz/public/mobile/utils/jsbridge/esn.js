; (function() {
    var instance;
    var initialized = false;
    var util = {
        isObject: function(o) {
            return Object.prototype.toString.call(o) === '[object Object]'
        }
    };
    function initWebViewJavascriptBridge(callback) {
        if (initialized) {
            console.log("init has been called.")
        } else {
            window.WebViewJavascriptBridge.init(function(message, responseCallback) {})
        }
        initialized = true;
        typeof callback === 'function' && callback()
    };
    function YYEsnBridge() {
        this.version = '1.0.2'
    };
    YYEsnBridge.prototype.ready = function(callback) {
        if (window.WebViewJavascriptBridge) {
            initWebViewJavascriptBridge(callback)
        } else {
            document.addEventListener('WebViewJavascriptBridgeReady',
                function() {
                    initWebViewJavascriptBridge(callback)
                },
                false)
        }
    };
    YYEsnBridge.prototype.config = function(parameters) {
        if (!util.isObject(parameters)) {
            throw new Error('参数格式不正确')
        }
        if (!parameters.signature || !parameters.agentId || !parameters.timeStamp) {
            throw new Error('必要参数不存在')
        }
        this.do('config', parameters)
    };
    YYEsnBridge.prototype.registerLifeCycle = function(parameters) {
        if (!util.isObject(parameters)) {
            throw new Error('参数格式不正确')
        }
        if (!parameters.onShow || !parameters.onHide || typeof parameters.onShow !== 'function' || typeof parameters.onHide !== 'function') {
            throw new Error('必要参数不存在或类型错误')
        }
        this.registerHandler({
            'lifeCycle$onShow': parameters.onShow
        });
        this.registerHandler({
            'lifeCycle$onHide': parameters.onHide
        });
        parsedParameters = {
            'onShow': 'lifeCycle$onShow',
            'onHide': 'lifeCycle$onHide'
        };
        this.do('registerLifeCycle', parsedParameters)
    };
    YYEsnBridge.prototype.registerHandler = function(parameters) {
        if (!util.isObject(parameters)) {
            throw new Error('参数格式不正确')
        }
        for (var key in parameters) {
            if (Object.prototype.hasOwnProperty.call(parameters, key)) {
                window.WebViewJavascriptBridge.registerHandler(key, parameters[key])
            }
        }
    };
    YYEsnBridge.prototype.do = function(action, parameters) {
        if (action === '' || typeof action !== 'string') {
            throw new Error('参数格式不正确')
        }
        if (!util.isObject(parameters)) {
            parameters = {}
        }
        try {
            window.WebViewJavascriptBridge.callHandler(action, parameters,
                function(res) {
                    var resultData = {};
                    try {
                        if (!util.isObject(res)) {
                            res = JSON.parse(res)
                        }
                        if (res.error_code === '0') {
                            resultData = res.data;
                            try {
                                typeof parameters.success === 'function' && parameters.success(resultData)
                            } catch(e) {
                                console.log('error in success function')
                            }
                        } else {
                            resultData.errCode = res.error_code;
                            resultData.data = res.data;
                            resultData.errDescription = res.error_description;
                            typeof parameters.fail === 'function' && parameters.fail(resultData)
                        }
                    } catch(e) {
                        resultData.errCode = '1002';
                        resultData.errDescription = 'data parse error';
                        typeof parameters.fail === 'function' && parameters.fail(resultData)
                    }
                    typeof parameters.complete === 'function' && parameters.complete()
                })
        } catch(e) {
            throw new Error('参数格式不正确')
        }
    };
    if (!instance) {
        instance = new YYEsnBridge()
    }
    if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
        define(function() {
            return instance
        })
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports.YYEsnBridge = instance
    } else {
        window.YYEsnBridge = instance
    }
})();