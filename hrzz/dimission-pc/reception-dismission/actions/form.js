
export default class{
   constructor(child, c){
       this.c = c;
       this.store = c.props.store;
       this.models = this.store.models;
   }
    // 获取表格数据
    getFormData = (postData)=>{
        // const {} =this.c
        const {reception,button} = this.c.props
        this.models.reception.formDetail(postData)
        .then((res)=>{
            console.log(res.data)
            this.store.setData("reception.transItems",res.data.list)
            this.store.setData("reception.billid",res.data.billid)
        })
        button.setButtonsVisible({
            edit: true,
            refresh: false,
            save: false,
            accept:true
        })
    }

    onItemChange = (key, index, value) => {
                const {props} = this.c;
                const {reception} = props;
                let {transItems} = reception;
                transItems[index][key] = value;
                this.store.setData('reception.transItems',transItems);
            };
    // 返回主表页面
    goToBackMainPage = () => {
        const { props, action } = this.c;
        const { reception, button} = props;
        this.store.setData('reception.status','main');
        this.store.setData('reception.isEdit','false');
        this.store.setData('reception.transItems',[]);
        this.store.setData('reception.billid','')
        // this.store.setData("reception.back",true)
        action.ma.getMainData()
        button.setButtonsVisible({
            edit: false,
            refresh: true,
            save: false,
            accept:false
        })
    }

}