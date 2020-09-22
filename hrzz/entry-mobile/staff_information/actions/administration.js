import {hrRouter} from '../../../public/mobile/utils/index.js';
import { Container, CreateMeta } from 'src/hrzz/public/hr-mobile-card/index';
export default class HotProblem {
    constructor(comp) {
        this.comp = comp;
    }

    didMount = () => {
        hrRouter.setRoot()
    }
   

    // 跳转到详情页
    toDetail = (data) => {
        const {props} = this.comp
        const {dispatch,exam} = props
        return () => {
            dispatch({
                type: 'exam/psnDocSearchPsnInfoAction',
                payload: {
                    postData: {
                        pk_psnjob:data.pk_psnjob
                    }
                }
            }).then((res) => {
                if(res.success) {
                    
                    dispatch({
                        type: 'exam/update',
                        payload: {
                            detailFormData:res.data,
                            showClassifi:false,
                            showSearch:false,
                            isDetail:true,
                            infoData:data,

                            name:res.data.psndocForm.bd_psndoc.rows[0].values.name.value
                            // showDetails: true,
                            // oneQuestionDetail:res.data
                        }
                    });
                    this.container()
                    
                }
            })
            
        }
        
    }
     // 渲染所有模板
    container = () => {
        const { props } = this.comp
        const { dispatch,exam } = props
        let arr = []
        let temp = JSON.parse(JSON.stringify(exam.detailFormData))
        let meta = temp.allArea
        let getmeta = CreateMeta(meta, {
            // iconClick: this.onExpandHandle
        })
        
       
        let count = 0;
        exam.detailFormData.areaCodeList.forEach((item) => {
            
            let store = null;
            
            if(item === 'bd_psndoc'||item === 'hi_psnjob_h'||item === 'hi_psnorg_h') {
                item === 'bd_psndoc'&&(store = temp.psndocForm.bd_psndoc)
                item === 'hi_psnjob_h'&&(store = temp.psnjobForm.hi_psnjob_h)
                item === 'hi_psnorg_h'&&(store = temp.psnorgForm.hi_psnorg_h)
                count ++;
               arr.push(
                        <Container
                            store={getmeta}
                            cardName={item}
                            collapsed={item !== temp.areaCodeList[0]}
                            showArrow={false}
                            data={store}
                            hideHeader={false}
                            isEdit={false}
                        />
                    )
                dispatch({
                    type: 'exam/update',
                    payload: {
                        storeAll:arr,
                        countBar:count
                    }
                });
            } else {
               
                dispatch({
                    type: 'exam/psnDocSearchLoadSubDataAction',
                    payload: {
                        postData: {
                            pk_psnjob:exam.infoData.pk_psnjob,
                            areaCode:item
                        }
                    }
                }).then((res) => {
                    if(res.success) {
                        if(res.data) {
                            store = res.data[item]
                            count ++;
                            arr.push(
                                <Container
                                    store={getmeta}
                                    cardName={item}
                                    collapsed={item !== temp.areaCodeList[0]}
                                    showArrow={false}
                                    data={store}
                                    hideHeader={false}
                                    isEdit={false}
                                />
                            )
                        } else {
                            arr.push(
                                <Container
                                    store={getmeta}
                                    cardName={item}
                                    collapsed={item !== temp.areaCodeList[0]}
                                    showArrow={false}
                                    data={store}
                                    hideHeader={false}
                                    isEdit={false}
                                />
                            )
                        }
                        dispatch({
                            type: 'exam/update',
                            payload: {
                                storeAll:arr,
                                countBar:(100*count/exam.detailFormData.areaCodeList.length).toFixed(2)
                            }
                        });
                    }
                   
                })
            }
           
        })
         
    }
 

    // 跳转到组织子级
    toClassifi = (firstData,curData,flag) => {
        const {props} = this.comp
        const {dispatch,exam} = props
        return () => {
            const {showSearch} = exam
            if (showSearch) {
                document.querySelectorAll('#crumbs')[0].scrollLeft = 0
            }
             if(firstData) {
                    dispatch({
                        type: 'exam/update',
                        payload: {
                            firstId:firstData.pk_org
                        }
                    })
            }
            dispatch({
                type: 'exam/psnDocSearchOrgAndDeptAction',
                payload: {
                    postData: {
                        cur_node_id:curData?curData.id?curData.id:curData.pk_org:firstData.pk_org,
                        first_node_id:firstData?firstData.pk_org:exam.firstId
                    },
                    info:{
                        appcode:'60652005'
                    }
                }
            }).then(async (res)  => {
                if(res.success) {
                    if(!flag) {
                        let crumbsList = exam.crumbsList
                        crumbsList.push(firstData||curData)
                        dispatch({
                            type: 'exam/update',
                            payload: {
                                crumbsList:crumbsList
                            }
                        })
                    }
                        
                    let organizationSubset = [] //子集下的组织信息
                    let organizationInfo = [] //子集下的组织信息
                    let organizationPer = [] // 子集下的人员信息
                    res.data.forEach((item) => {
                        switch (item.type) {
                            case 'dept':
                                organizationSubset.push(item)
                                break;
                            case 'org':
                                organizationInfo.push(item)
                                break;
                            case 'psndoc':
                                organizationPer.push(item)
                                break;
                            default:break;
                        }
                    })
                    let infoData = await dispatch({
                        type: 'exam/update',
                        payload: {
                            organizationSubset,
                            searchData:organizationInfo,
                            showClassifi: true,
                            showSearch:false,
                            organizationPer
                        }
                    })
                }
            })
            
        }
    }

    // 搜索
    changeSearch = async (value) => {
        const {props} = this.comp
        const {dispatch,exam} = props
         dispatch({
                    type: 'exam/update',
                    payload: {
                        searchValue: value
                    }
                });
        if(!value) {
            dispatch({
                    type: 'exam/update',
                    payload: {
                        searchData: []
                    }
                });
            return
        }
        try {
            let res = await dispatch({
                type: 'exam/psnDocSearchPsnInfoByKeyAction',
                payload: {
                    postData: {
                        keyword:value
                    },
                     info:{
                        appcode:'60652005'
                    }
                }
            });
            if(res.success) {
                dispatch({
                    type: 'exam/update',
                    payload: {
                        searchData: res.data,
                        isSearchData:true
                    }
                });
            }
        }
        catch(e) {
            throw(e)
        }
    }
    // 分类下的组织展示
    orgInClassifyShow = () => {
        const { props } = this.comp;
        const { exam} = props
        let search = exam.searchData.map((item,index)=>{
            return (
                <li className="clearfix" key = {index} onClick={this.toClassifi(false, item)} >
                    {item.photo?(<img className="photo" src={item.photo} />):(
                        <span className="photo"
                            style={{backgroundColor:exam.colors[index%10]}}
                        >
                            {item.name.substr(item.name.length - 2,2)}
                        </span>
                    )}
                    <div className="peopleInformation">
                        <div>
                            <p>{item.name}</p>
                            <p>{item.orgname}</p>
                            <p>{item.deptname}</p>
                        </div>
                    </div>
                </li>
            )
        })
        return (
            <ul className="peopleList">
                {search}
            </ul>
        )
    }
    // 公共人员列表
    searchPeopleHtml = (dataType) => {
        let mode = dataType
        if (dataType === undefined) {
            mode = 'searchData'
        }
        const { props } = this.comp;
        const { exam} = props
        let search = exam[mode].map((item,index)=>{
            return (
                <li className="clearfix" key = {index} onClick={this.toDetail(item)} >
                    {item.photo?(<img className="photo" src={item.photo} />):(
                        <span className="photo"
                            style={{backgroundColor:exam.colors[index%10]}}
                        >
                            {item.name.substr(item.name.length - 2,2)}
                        </span>
                    )}
                    <div className="peopleInformation">
                        <div>
                            <p>{item.name}</p>
                            <p>{item.orgname}</p>
                            <p>{item.deptname}</p>
                        </div>
                    </div>
                </li>
            )
        })
        return (
            <ul className="peopleList">
                {search}
            </ul>
        )
    }
}