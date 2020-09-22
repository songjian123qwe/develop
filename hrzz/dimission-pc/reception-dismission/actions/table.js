import {promptBox} from 'nc-lightapp-front'

export default class{
   constructor(child, c){
       this.c = c;
       this.store = c.props.store;
       this.models = this.store.models;
   }
   
// 双击事件
    doubleClick = (data,index) => {
        const {reception,from} = this.c.props
        this.store.setData('reception.status','detail');
        this.store.setData('reception.isEdit',false)
        console.log(data.values.pk_hi_stapply);
        let postData = {
            billid:data.values.pk_hi_stapply.value
        }
        this.c.action.ma.getFormData(postData)
        // .then(()=>{

        // })
    }
    // 部门工作接收点击事件
    receptionClick = (data,index) =>{
        const {action} = this.c
        const {reception} = this.c.props
        this.store.setData('reception.status','detail');
        console.log(data.values.pk_hi_stapply);
        let postData = {
            billid:data.values.pk_hi_stapply.value
        }
        this.c.action.ma.getFormData(postData)
        action.ma.editForm()
        // form.setFormStatus('card','edit')
    }
    // 获取主表单事件
    getMainData = async()=>{
        const {reception,editTable} = this.c.props
       await this.models.reception.getTableData()
            .then((res) => {
                let list  = {}
                console.log(res.data);
                if(res.data){
                    list ={...res.data.list}
                }
                let empty = {
                    areacode: "list",
                    rows: [],
                }
                if(list.rows){
                    // list.rows.map((item)=>{
                    //     item.status = "0"
                    //     for (let i in item.values){
                    //         if(i == "executeRate"){
                    //             item.values[i].display = item.values[i].value
                    //         }else if(i == "selfV" || i == "executeV"){
                    //             if(item.values[i].value > 0){
                    //                 item.values[i].value =item.values[i].value.toFixed(2);
                    //             }
                    //             item.values[i].display = item.values[i].value
                    //         }
                    //     }
                    // })
                    editTable.setTableData('list',list, false); 
                    // this.store.setData('reception.totalData',list)
                }else{
                    editTable.setTableData('list',empty, false);
                }
                
            });
    }

}