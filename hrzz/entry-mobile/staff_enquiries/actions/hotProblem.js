import {hrRouter} from '../../../public/mobile/utils/index.js';
export default class HotProblem {
    constructor(comp) {
        this.comp = comp;
    }

    didMount = () => {
        hrRouter.setRoot()
    }
    // 右侧省略号点击
    rightClick = () => {
        const {props} = this.comp
        const {dispatch,exam} = props
        
        dispatch({
            type: 'exam/update',
            payload: {
                showHotProblem: true,
                showIndex: false
            }
        });
    }

    // 跳转到详情页
    toDetail = (id,type) => {
        const {props} = this.comp
        const {dispatch,exam} = props
        return (ids) => {
            let detailId = id||ids
            let typeId = type===1?1:2

            if(window.location.href.indexOf('localhost')>0){
                var url = `/hrzz/entry-mobile/staff_enquiries_detail/main/indexMb.html#?&c=60652070&detailId=${detailId}&type=${typeId}`
            } else {
                var url = `/hrzz/entry-mobile/staff_enquiries_detail/main/index.html#?&c=60652070&detailId=${detailId}&type=${typeId}`
            }
                
           
            hrRouter.push(url)
            return
            dispatch({
                type: 'exam/KnowledgePreviewOneAction',
                payload: {
                    postData: {
                        billid:id||ids
                    }
                }
            }).then((res) => {
                if(res.success) {
                    if(res.data.answer_type==='2') {
                        window.location.href = res.data.link_url
                        return
                    }
                    dispatch({
                        type: 'exam/update',
                        payload: {
                            showDetails: true,
                            oneQuestionDetail:res.data
                        }
                    });
                    
                }
            })
            
        }
        
    }

    // 跳转到问题分类页面
    toClassifi = (data) => {
        const {props} = this.comp
        const {dispatch,exam} = props
       
        return (datas,flag) => {
            dispatch({
                type: 'exam/knowledgePreviewTypeByPIDAction',
                payload: {
                    postData: {
                        pid:data&&data.pk_defdoc||datas.pk_defdoc
                    },
                    info:{
                        appcode:'60652070'
                    }
                }
            }).then(async (res)  => {
                if(res.success) {
                    if(!flag) {
                        let crumbsList = exam.crumbsList
                        crumbsList.push(data||datas)
                        dispatch({
                            type: 'exam/update',
                            payload: {
                                crumbsList:crumbsList
                            }
                        })
                    }
                   let infoData = await dispatch({
                        type: 'exam/update',
                        payload: {
                            classfiPageList:res.data,
                            showClassifi: true,
                            showIndex:false,
                            pageFlag:false,
                        }
                    })

                    if(infoData) {
                        // 计算面包屑长度
                        this.crumbsWidth()
                        if(res.data.list.length===0&&res.data.isExistQuestion) {
                            // 当进入页面没有分类只有问题时直接请求该项下面的所有问题
                            this.searchAllQuestion()(exam.crumbsList[exam.crumbsList.length-1])
                    }
                    }
                    
                }
            })
            
        }
    }

    // 分类页面查询所有问题
    searchAllQuestion = (data) => {
        const {props} = this.comp
        const {dispatch,exam} = props
        return (datas) => {
            dispatch({
                type: 'exam/knowledgePreviewByTypeAction',
                payload: {
                    postData: {
                        type:data&&data.pk_defdoc||datas.pk_defdoc
                    },
                    info:{
                        appcode:'60652070'
                    }
                }
            }).then(async (res)  => {
                if(res.success) {
                 
                   let infoData = await dispatch({
                        type: 'exam/update',
                        payload: {
                            classfiPageList:{
                                list:res.data
                            },
                            pageFlag:true
                            
                        }
                    })
                    
                }
            })
            
        }
    }
    // 判断去问题页还是分类页
    toClassOrDetail = (data) => {
        const {props} = this.comp
        const {dispatch,exam} = props
        return () => {
            if(exam.pageFlag === true) {
                this.toDetail()(data.pk_knowledge_base)
            } else {
                this.toClassifi()(data)
            }
        }
    }


    // 查询热点问题
    searchHotQuestion = async () => {

        const {props} = this.comp
        const {dispatch,exam} = props
        try {
            let res = await dispatch({
                type: 'exam/knowledgePreviewHotAction',
                payload: {
                    postData: {
                    },
                     info:{
                        appcode:'60652070'
                    }
                }
            });
            if(res.success) {
                dispatch({
                    type: 'exam/update',
                    payload: {
                        hotProblemList: res.data.list
                    }
                });
            }
        }
        catch(e) {
            throw(e)
        }
    }
   

    // 计算面包屑容器宽度
    crumbsWidth = (arr) => {
        let a = 0;
        let dom = document.querySelectorAll('.crumbs-list')
        dom.forEach((item)=> {
            a+=item.clientWidth
        })
        a+=dom.length*23
        document.querySelector('.width-w').style.width = `${a}px`
    }


    // 搜索
    changeSearch = async (value) => {
        const {props} = this.comp
        const {dispatch,exam} = props
        try {
            let res = await dispatch({
                type: 'exam/knowledgePreviewSearchByKeyAction',
                payload: {
                    postData: {
                        keywords:value
                    },
                     info:{
                        appcode:'60652070'
                    }
                }
            });
            if(res.success) {
                dispatch({
                    type: 'exam/update',
                    payload: {
                        searchData: res.data.list
                    }
                });
            }
        }
        catch(e) {
            throw(e)
        }
    }
}