//数据记录模型
import Utils, {BaseUtils} from '../utils'
var Record = function(data0, status0 = 'common', id){
    var status = status0 === 'add' || status0 === 'common' ? status0 : 'common',       // add, edit , del, common,
        rid = id || BaseUtils.id(),
        data = data0;

    this.getData = () => {
       return Utils.clone(data);
    };
    this.setData = (data0) =>{
       data = Utils.clone(data0);
    };

    this.getId = () =>{
        return rid;
    };

    this.getStatus = () => {
        return status;
    };

    //定义一些内部方法,写成监听工作量太大
    this._setStatus = (status0) => {
        if(status0 === 'add' || status0 === 'edit' || status0 === 'del' || status0 === 'common')
            status = status0;
    };

    this._copySelf = () => {
        return  new Record(this.getData(), this.getStatus(), this.getId());
    };
};

Record.prototype = {  
    toString : function() {
        return this.getId();
    }  
}

//静态方法,提供一些辅助
Record.filterByStatus = (records, ...status) => {
    var recds = records || [];
    return recds.filter( recd => {
        console.log(recd.getStatus());
       return  status.indexOf( recd.getStatus()) !== -1
    } ) || [];
};

Record.copyRecords = (records) => {
    return records.map( (r) => { return r._copySelf() } );
};

Record.platDataToTinperData = (datas) => {

};

Record.converToVOData = (records) => {
    var datas = records.map( (element, index) => {
        var  data = element.getData(),
            status = element.getStatus(),
            statusVal = 0;
        debugger;
        if(status == 'add')
            statusVal = 2;
        if(status == 'edit')
            statusVal = 1;
        if(status == 'del')
            statusVal = 3;
        
        var values = {};
        for (let [key, val] of Object.entries(data)) {
            values[key] ={
                value: val
            };
        }
        return {
            values: values,
            rowid: 0,
            status: statusVal
        };
    });
    return datas;
};


export default Record;