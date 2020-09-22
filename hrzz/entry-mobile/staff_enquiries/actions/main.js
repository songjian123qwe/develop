import NativeObj from 'src/hrzz/public/mobile/utils/jsbridge/index.js'
import {compatibleNavImg} from 'src/hrzz/public/mobile/utils/index.js'
import {hrRouter} from '../../../public/mobile/utils/index.js';
import {getMultiLang} from 'src/hrzz/public/mobile/utils/getMultiLang'

export default class Main {

    constructor(comp) {
        this.comp = comp;
    }

    // appConfig = {
    //     appcode:'60092040',
    //     pagecode:'60092040nccloud'
    // }


    didMount = () => {
        window.location.hash =
            "?&c=60652070&p=60652070nccloud&ar=0001Z510000000065KV7&id=0";

        this.getLanguage()


    }

    // 首页加载项
    indexEntry = () => {
        const {props, action} = this.comp;
        const {dispatch, exam} = props;
        // 查询热点问题
        // hrRouter.setRoot()
        this.editNav(exam.json['hrzzmb-000268'])
        action.hotProblem.searchHotQuestion()
        this.searchNewQuestion()
        this.searchClassfi()
        this.myQuestions()
    }

    getLanguage = () => {
        const {props} = this.comp
        const {dispatch, exam} = props
        getMultiLang({
            domainName: 'hrzz',
            moduleId: 'hrzzmb',
            callback: (json, status, init) => {
                // 变动类型
                dispatch({
                    type: 'exam/update',
                    payload: {
                        json: json,
                        tabs: [
                            {title: json['hrzzmb-000282']},//常见问题
                            {title: json['hrzzmb-000283']} //我的提问
                        ]
                    }
                });
                this.indexEntry()
                // 员工问询

            }
        })
    };
    // 卸载
    willUnMount = () => {

    }

    didUpdate = () => {

    }

    leftClick = () => {
        const {props} = this.comp;
        const {dispatch, exam} = props;
        if (exam.showSearch === true || exam.showClassifi === true || exam.showHotProblem === true) {
            exam.showSearch === true && this.closePage('showSearch')
            exam.showClassifi === true && this.closePage('showClassifi', 'crumbsList')
            exam.showHotProblem === true && this.closePage('showHotProblem')
            // 员工问询
            this.editNav(exam.json['hrzzmb-000268'])
        } else {
            NativeObj.closePage()
        }

    }


    // 关闭弹窗公共方法
    closePage = (file, name) => {
        const {props} = this.comp;
        const {dispatch, exam} = props;
        dispatch({
            type: 'exam/update',
            payload: {
                showIndex: true,
                [file]: false,
                [name]: [] //清空面包屑信息
            }
        });
    }

    editNav(title) {

        let parameters = {}
        let cbs = {
            goBack: this.leftClick,
            search: this.searchFun
        }
        parameters = {
            leftItems: [
                {
                    callback: 'goBack',
                    icon: compatibleNavImg(location.origin + '/nccloud/resources/hrzz/public/mobile/static/icon/zuo.png')
                }
            ],
            centerItems: [
                {
                    title: title,
                }
            ],
            rightItems: [
                {
                    callback: 'search',
                    icon: compatibleNavImg(location.origin + '/nccloud/resources/hrzz/public/mobile/static/icon/hr-sousuo.png')
                }
            ]
        }
        let data = {
            'function': 'configNavBar',
            'parameters': parameters
        }
        NativeObj.configNavBar(data, cbs)
    }

    setSearchHead = (title) => {
        let cbs = {
            goBack: this.closeSearchPage
        };
        let parameters = {
            leftItems: [
                {
                    callback: 'goBack',
                    icon: compatibleNavImg(location.origin + '/nccloud/resources/hrzz/public/mobile/static/icon/zuo.png')
                }
            ],
            centerItems: [
                {
                    title: title,
                }
            ],
            rightItems: []
        };
        let data = {
            'function': 'configNavBar',
            'parameters': parameters
        };
        NativeObj.configNavBar(data, cbs)
    };

    closeSearchPage = () => {
        const {props} = this.comp;
        const {dispatch, exam} = props;
        dispatch({
            type: 'exam/update',
            payload: {
                //showIndex: true,
                showSearch: false
            }
        });
        this.editNav(exam.json['hrzzmb-000268']);
    };

    // 打开搜索页面
    searchFun = () => {
        const {props} = this.comp;
        const {dispatch, exam} = props;
        dispatch({
            type: 'exam/update',
            payload: {
                showSearch: true
            }
        });
        // 查询热点问题
        // hrRouter.setRoot()
        this.setSearchHead(exam.json['hrzzmb-000268']);
    }

    // 我要提问跳转
    question = () => {
        if (window.location.href.indexOf('localhost') > 0) {
            var url = '/hrzz/entry-mobile/my_questions/main/indexMb.html'
        } else {
            var url = '/hrzz/entry-mobile/my_questions/main/index.html'
        }

        hrRouter.push(url)
    }
    // 通用关闭弹窗
    closeModal = (field) => {
        return () => {
            const {props} = this.comp;
            const {dispatch, exam} = props;

            dispatch({
                type: 'exam/update',
                payload: {
                    [field]: false
                }
            });
        }
    }

    // 我的提问
    myQuestions = async () => {

        const {props} = this.comp
        const {dispatch, exam} = props
        try {
            let res = await dispatch({
                type: 'exam/questionMyQuestionsAction',
                payload: {
                    postData: {},
                    info: {
                        appcode: '60652070'
                    }
                }
            });
            if (res.success) {
                dispatch({
                    type: 'exam/update',
                    payload: {
                        myQuestions: res.data
                    }
                });
            }
        } catch (e) {
            throw(e)
        }
    }

    // 查询最新问题
    searchNewQuestion = async () => {

        const {props} = this.comp
        const {dispatch, exam} = props
        try {
            let res = await dispatch({
                type: 'exam/knowledgePreviewRecentUpdateAction',
                payload: {
                    info: {
                        appcode: '60652070'
                    }
                },

            });
            if (res.success) {
                dispatch({
                    type: 'exam/update',
                    payload: {
                        newProblemList: res.data.list
                    }

                });
            }
        } catch (e) {
            throw(e)
        }
    }

    // 查首页大分类
    searchClassfi = async () => {
        const {props} = this.comp
        const {dispatch, exam} = props
        try {
            let res = await dispatch({
                type: 'exam/knowledgePreviewTypeByPIDAction',
                payload: {
                    info: {
                        appcode: '60652070'
                    }
                }
            });
            if (res.success) {
                dispatch({
                    type: 'exam/update',
                    payload: {
                        classfiList: res.data.list
                    }
                });
            }
        } catch (e) {
            throw(e)
        }
    }

}