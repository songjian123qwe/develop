import {promptBox, toast} from 'nc-lightapp-front';

export default class{
   constructor(child, c){
       this.c = c;
       this.store = c.props.store;
       this.models = this.store.models;


       this.handleMap = {
        'refresh': this.refreshTable,
        'edit': this.editForm,
        'save': this.saveForm,
        'accept': this.commit,
    };
   }
   setButtonStatus = () =>{
    const reBtn = this.store.getData('reBtn').value;
    const {button} = this.c.props;

    button.setButtonVisible(reBtn.visible);
    button.setButtonDisabled(reBtn.disabled);
   }
// 头部按钮点击回调
    headerBtnClick = (pf, type) => {
        console.log(type);
        if(type === 'edit') {
            this.store.setData('reception.formStatus', type);
        }else if(type === 'save' || type === 'accept'){
            this.store.setData('reception.formStatus', 'browse');
        }
        typeof this.handleMap[type] === 'function' && this.handleMap[type]();
    }
    // 刷新
    refreshTable = () => {
        // const {button} = this.c.props;
        this.c.action.ma.getMainData();
    }

    // 启动编辑模式
    editForm = () =>{
        const {button} = this.c.props
        // this.store.setData('reBtn.visible',{
        //     edit: false,
        //     refresh: false,
        //     save: true,
        //     accept:false
        // })
        button.setButtonsVisible({
            edit: false,
            refresh: false,
            save: true,
            accept:false
        })
        this.store.setData('reception.isEdit',true)
    }

    // 保存
    saveForm = () =>{
        const {reception,button} = this.c.props 
        let index = reception.transItems.findIndex(item => !item.remark || !item.item || !item.handoverdate);
            if (index > -1) {
                toast({color: 'error', content: reception.language['hrzzpc-000163']||"请完善单据"});
                return;
            }
        let postData = { billid:reception.billid,formData:reception.transItems, pk_org: '' }
        console.log(postData);
        
        this.models.reception.saveForm(postData)
        button.setButtonsVisible({
            edit: true,
            refresh: false,
            save: false,
            accept:true
        })
        this.store.setData('reception.isEdit',false)
       
    }

    //提交
    commit = () =>{
        const {action} = this.c 
        const {reception} = this.c.props 
        let index = reception.transItems.findIndex(item => !item.remark || !item.item || !item.handoverdate);
            if (index > -1) {
                toast({color: 'error', content: reception.language['hrzzpc-000163']||"请完善单据"});
                return;
            }
        let postData = { billid:reception.billid,formData:reception.transItems, pk_org: '' }
        this.models.reception.commitForm(postData)
            .then(res=>{
                if (res.success) {
                    toast({color: 'success', content: reception.language['hrzzpc-000164']||"成功"});
                    action.ma.goToBackMainPage()
                }
            })
        // button.setButtonsVisible({
        //     edit: true,
        //     refresh: false,
        //     save: false,
        //     accept:true
        // })
        // this.store.setData('reception.isEdit',false)
    }
}
