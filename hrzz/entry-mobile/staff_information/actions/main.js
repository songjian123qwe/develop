
import NativeObj from 'src/hrzz/public/mobile/utils/jsbridge/index.js'
import { hrRouter,compatibleNavImg } from 'src/hrzz/public/mobile/utils/index.js'
import { getMultiLang } from 'src/hrzz/public/mobile/utils/getMultiLang'
export default class Main{

    constructor(comp) {
        this.comp = comp;
    }

    // appConfig = {
    //     appcode:'60092040',
    //     pagecode:'60092040nccloud'
    // }
    

    didMount = () => {
        window.location.hash ="?&c=60652005&p=606520I0p&ar=0001Z510000000065KV7&id=0";
        this.getLanguage()
            
    }
    
    getLanguage = () => {
        const {props} = this.comp
        const {dispatch,exam} = props
        getMultiLang({
            domainName: 'hrzz',
            moduleId: 'hrzzmb',
            callback: (json, status, init) => {
                
                dispatch({
                    type: 'exam/update',
                    payload: {
                        json:json
                    }
                });
                this.indexEntry()
            }
        })
    };
    // 首页加载项
    indexEntry = () => {
        const {props, action} = this.comp;
        const {dispatch,exam} = props;
        this.editNav(exam.json['hrzzmb-000281'])
        // 员工信息
        this.searchClassfi()
    }

     // 卸载
    willUnMount = () => {
      
    }

    didUpdate = () => {
        
    }
  
    leftClick = () => {
        const {props} = this.comp;
        const {dispatch,exam} = props;
        const {showSearch, showClassifi, isDetail, isSearchData, organizationData} = exam
        let dispatchObj = {
            type: 'exam/update',
            payload: {

            }
        }
        if (showSearch) {
            NativeObj.closePage()
            return false
        } else if (showClassifi) {
            dispatchObj.payload = {
                showSearch: true,
                showClassifi: false,
                isDetail: false,
                crumbsList: []
            }
        } else if(isDetail) {
            if (!isSearchData&&organizationData.length>0) {
                dispatchObj.payload = {
                    showSearch: false,
                    showClassifi: true,
                    isDetail: false
                }
                document.querySelectorAll('#crumbs')[0].scrollLeft = 0
            } else {
                dispatchObj.payload = {
                    showSearch: true,
                    showClassifi: false,
                    isDetail: false
                }
            }
        }
        dispatch(dispatchObj)
    }
    editNav(title){
    
        let parameters={}
		let cbs={
            goBack: this.leftClick
		}
		parameters={
			leftItems: [
				{
					callback: 'goBack',                 
					icon:compatibleNavImg(location.origin+'/nccloud/resources/hrzz/public/mobile/static/icon/zuo.png')
				}
            ],
            centerItems: [
				{
					title: title,
				}
            ]
		}
		let data = { 
			'function': 'configNavBar', 
			'parameters': parameters
		}
		NativeObj.configNavBar(data, cbs)
    }
    


    // 打开搜索页面
    searchFun = () => {
        const {props} = this.comp;
        const {dispatch,exam} = props;
        dispatch({
            type: 'exam/update',
            payload: {
                showSearch: true
            }
        });
    }


    // 通用关闭弹窗
    closeModal = (field) => {
        return () => {
            const {props} = this.comp;
            const {dispatch,exam} = props;

            dispatch({
                type: 'exam/update',
                payload: {
                    [field]: false
                }
            });
        }
    }

   
    // 查首页人力资源分类
    searchClassfi = async () => {
        const {props} = this.comp
        const {dispatch,exam} = props
        try {
            let res = await dispatch({
                type: 'exam/psnDocSearchPermOrgBaseAction',
                payload: {
                    info:{
                        appcode:'60652005'
                    }
                }
            });
            if(res.success) {
                dispatch({
                    type: 'exam/update',
                    payload: {
                        organizationData: res.data
                    }
                });
            }
        }
        catch(e) {
            throw(e)
        }
    }

}