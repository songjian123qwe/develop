


var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

export default {
    isFunction: function(param){
        return Object.prototype.toString.call(param).slice(8, -1) === 'Function';
    },
    id: function(){
        var res = "";
            for(var i = 0; i < 32; i++) {
                var id = Math.ceil(Math.random() * 35);
                res += chars[id];
            }
        return res;
    },
    
    isArray: function(param){
        return Object.prototype.toString.call(param).slice(8, -1) === 'Array';
    },

    isString: function(param) {
        return Object.prototype.toString.call(param).slice(8, -1) === 'String';
    },
    isObject:function(param){
        return Object.prototype.toString.call(param).slice(8, -1) === 'Object';
    },
    /******************************
     * 判断数组是空的
     * @param param
     * @returns {boolean}
     ******************************/
    arrayIsEmpty:function(param){
        if(this.isArray(param) && param.length>0){
            return false;
        }
        return true;
    }

};


       
      