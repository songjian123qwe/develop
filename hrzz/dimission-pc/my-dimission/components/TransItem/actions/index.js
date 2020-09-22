import {formatDate} from "src/hrpub/common/utils/utils";
import {toast} from 'nc-lightapp-front';

export default class TransAction {
    constructor(comp) {
        this.comp = comp;
        this.dispatch = this.comp.props.dispatch;
    }

    handleDeptTrans = async () => {
        const {props, action} = this.comp;
        const {dispatch, main,button} = props;
        const {page} = main;
        let res = await dispatch({
            type: 'main/checkDeptTrans',
            payload: {func_type: 1} // func_type 我的离职为1 部门经理自助为2
        });
        if (res.success) {
            if (res.data && !res.data.auth) {
                toast({color: 'error', content: res.data.authMsg});
                return;
            }
            await dispatch({
                type: 'main/update',
                payload: {
                    page: 'transItem',
                    lastPage: page,
                    transItems: res.data && res.data.list || [],
                    billid: res.data.billid,
                    isEditable:res.data.isEditable,
                    transSearched: true
                }
            });
            action.btnAct.updateBtnStatus();
        }
    };

    getTransItems = async () => {
        const {props, action} = this.comp;
        const {dispatch, main} = props;
        const {billid} = main;
        if (!billid) {
            dispatch({
                type: 'main/update',
                payload: {
                    transItems: [],
                    transSearched: true
                }
            });
            return;
        }
        let res = await dispatch({
            type: 'main/getTransItems',
            payload: {billid, func_type: 1} // func_type 我的离职为1 部门经理自助为2
        });
        if (res.success) {
            dispatch({
                type: 'main/update',
                payload: {
                    transItems: res.data && res.data.list ? res.data.list.map(item => {
                        const itemValue = item.depthandoverform.rows[0].values;
                        return {
                            handoverman: itemValue.handoverman.value,
                            item: itemValue.item.value,
                            handoverdate: itemValue.handoverdate.value
                        }
                    }) : [],
                    transSearched: true
                }
            });
        }
    };

    onItemChange = (key, index, value) => {
        const {props} = this.comp;
        const {dispatch, main} = props;
        const {transItems} = main;
        transItems[index][key] = value;
        dispatch({
            type: 'main/update',
            payload: {
                transItems
            }
        });
    };

    addItem = () => {
        const {props} = this.comp;
        const {dispatch, main} = props;
        const {transItems} = main;
        transItems.push({
            handoverman: '',
            item: '',
            handoverdate: formatDate(new Date())
        });
        dispatch({
            type: 'main/update',
            payload: {
                transItems
            }
        });
    };

    insertItem = (index) => {
        const {props} = this.comp;
        const {dispatch, main} = props;
        const {transItems} = main;
        transItems.splice(index, 0, {
            handoverman: '',
            item: '',
            handoverdate: formatDate(new Date())
        });
        dispatch({
            type: 'main/update',
            payload: {
                transItems
            }
        });
    };
    openModels = async(index) =>{
        const {props} = this.comp;
        const {dispatch, main} = props;
        const {billid,language} = main;
        let res = await dispatch({
            type: 'main/getTranslateData',
            payload: { billid:billid,isAssgin:false } // 
        })
        console.log(res);
        if (res.success) {
            if (res.data) {
                console.log(res.data.content);
                let transData = res.data.content[0].assginUsers.map((item,index)=>{
                    return{
                        code:item.pk,
                        key:item.name,
                        display:item.name
                    }
                })
                console.log(transData);
                console.log(index);
                await dispatch({
                        type: 'main/update',
                        payload: {
                            content:res.data.content,
                            transData:transData,
                            transDisplay:true,
                            transIndex:index
                        }
                    });
            }else{
                toast({color: 'error', content:language["hrzzpc-000166"] || "未能找到指派人员,请检测工作流设置"});
            }
            // await dispatch({
            //     type: 'main/update',
            //     payload: {
            //         page: 'transItem',
            //         lastPage: page,
            //         transItems: res.data && res.data.list || [],
            //         billid: res.data.billid,
            //         transSearched: true
            //     }
            // });
        }
        console.log("打开弹窗显示穿梭框");
        
        
    }
    //穿梭框的左右移动点击事件
    transferChange = (leftData, rightData) => {
        const {props} = this.comp;
        const {dispatch, main} = props;
        // const {transItems} = main;
        // transItems.splice(index, 1);
        if(main.targetData.length>0){
            console.log("将要成为单人模式");
            
        }else{
            dispatch({
                type: 'main/update',
                payload: {
                    transData:leftData,//原始树的值
                    targetData:rightData,//右树的值
                }
            });
        }
        
    }
    // 关闭弹窗
    turnOff = () =>{
        const {props} = this.comp;
        const {dispatch, main} = props;
        // const {transItems} = main;
        // transItems.splice(index, 1);
        dispatch({
            type: 'main/update',
            payload: {
                transData:[],//原始树的值
                targetData:[],//右树的值
                transDisplay:false,
                transIndex:-1
            }
        });
    }
    tranSure = ()=>{
        const {props} = this.comp;
        const {dispatch, main} = props;
        let targetIten = main.transItems
        targetIten[main.transIndex].handoverman_id = main.targetData[0].code;
        targetIten[main.transIndex].handoverman = main.targetData[0].key;
        dispatch({
            type: 'main/update',
            payload: {
                transItems:targetIten
            }
        })
        console.log(targetIten)
        this.turnOff()
    }
    removeItem = (index) => {
        const {props} = this.comp;
        const {dispatch, main} = props;
        const {transItems} = main;
        transItems.splice(index, 1);
        dispatch({
            type: 'main/update',
            payload: {
                transItems
            }
        });
    };
}