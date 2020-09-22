/**
 * import logObj from './fontnote.js' // 注意修改路径
 * 在成功回调里调用:logObj.setLog({request,success})
 * 在成功回调里调用:logObj.setLog({request,err})
 */
class LogObj {
    /**
     * 获取localStorage数据
     * @param {string} key 
     */
    getStorage(key){
        var v=localStorage.getItem(key);
        if(!v){return null}
        var v4=v.slice(0,4);
        if(v4=='obj-'){
            v=JSON.parse(v.slice(4));
        }else if(v4=='str-'){
            v=v.slice(4);
        }
        return v
    }
    /**
     * 设置localStorage数据
     * @param {string} key 
     * @param {object} value 
     */
    setStorage(key,value){
        try {
            var v=value;
            if(typeof v == "object"){
                v="obj-"+JSON.stringify(v)
            }else{
                if(value === null || value === undefined){
                    v="str-"
                }else{
                    v="str-"+v
                }
            }
            localStorage.setItem(key,v);
        }catch (e) {
            console.log('set storage fail')
        }
    }
    /**
     * 异常回调的特殊判断，如果返回的是html，需要特殊处理
     * @param {object}  err
     */
    errHasHtml({err}){
        let reg = new RegExp(/<\s*html\s*>/,'gi')
        reg.lastIndex = 0;
        let res = false
        if(!!err&&
            (typeof err === 'object') &&
            !!err.response &&
            (typeof err.response === 'object') &&
            !!err.response.data &&
            (typeof err.response.data === "string") &&
            reg.test(err.response.data)
        ){
            res = true
        }
        return res
    }
    /**
     * 写入日志前对数据进行处理
     * @param {object} request    请求数据
     * @param {object} success    成功回调
     * @param {object} err    失败回调
     */
    setLog({request, success, err}){
        let newErr = err
        try{
            if(this.errHasHtml({err})){
                let str = err.response.data
                let newStr = !str? '': str.toString()
                let reg = new RegExp(/\s+|"|'/,'g')
                newStr=newStr.replace(reg, '')
                let response=Object.assign({},err.response,{data: newStr})
                newErr = Object.assign({},err,{response})
            }
        }catch(error){
            console.log(error)
        }
        this._setLog({request, success, err:newErr})
    }
    /**
     * 移动前端日志
     * @param {request, success, err} = data 
     */
    _setLog(data){
        let _localLogNum = this.getStorage('_localLogNum') || 15
        let _localLogData = this.getStorage('_localLogData') || []
        if(!(_localLogData instanceof Array)) {
            _localLogData = []
        }
        _localLogData.unshift(data)
        _localLogData.splice(_localLogNum)
        this.setStorage('_localLogData', _localLogData)
    }
}
const logObj= new LogObj()
export default logObj
